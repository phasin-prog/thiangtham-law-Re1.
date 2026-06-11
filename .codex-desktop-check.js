const http = require('http')

function getJson(url) {
  return new Promise((resolve, reject) => {
    http
      .get(url, (response) => {
        let body = ''
        response.on('data', (chunk) => {
          body += chunk
        })
        response.on('end', () => resolve(JSON.parse(body)))
      })
      .on('error', reject)
  })
}

async function run() {
  const pages = await getJson('http://127.0.0.1:9227/json')
  const page = pages.find(
    (entry) => entry.type === 'page' && entry.url.includes('127.0.0.1:3000'),
  )
  const socket = new WebSocket(page.webSocketDebuggerUrl)
  let requestId = 0
  const pending = new Map()

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data)
    if (!message.id || !pending.has(message.id)) return
    pending.get(message.id)(message)
    pending.delete(message.id)
  }

  await new Promise((resolve) => {
    socket.onopen = resolve
  })

  function evaluate(expression) {
    return new Promise((resolve) => {
      const id = ++requestId
      pending.set(id, (message) => resolve(message.result.result.value))
      socket.send(
        JSON.stringify({
          id,
          method: 'Runtime.evaluate',
          params: { expression, returnByValue: true, awaitPromise: true },
        }),
      )
    })
  }

  const result = await evaluate(`(async () => {
    const visible = (element) => element && getComputedStyle(element).display !== 'none'
    const buttons = [...document.querySelectorAll('header nav button')]
    const servicesButton = buttons.find((button) => button.textContent.includes('บริการของเรา'))
    const knowledgeButton = buttons.find((button) => button.textContent.includes('กฎหมายน่ารู้'))

    servicesButton.click()
    await new Promise((resolve) => setTimeout(resolve, 250))
    const servicesMenu = document.querySelector('#services-mega-menu')
    const servicesResult = {
      open: servicesButton.getAttribute('aria-expanded') === 'true',
      columns: servicesMenu.querySelectorAll(':scope > div > div:first-child > section').length,
      links: servicesMenu.querySelectorAll('section a').length,
    }

    knowledgeButton.click()
    await new Promise((resolve) => setTimeout(resolve, 250))
    const knowledgeMenu = document.querySelector('#legal-knowledge-menu')

    const navLabels = [...document.querySelectorAll('header nav[aria-label="เมนูหลัก"] > a, header nav[aria-label="เมนูหลัก"] > div > button')]
      .map((element) => element.textContent.trim())
      .filter(Boolean)

    return JSON.stringify({
      viewport: [innerWidth, innerHeight],
      headerLayers: [...document.querySelector('header').children].filter(visible).length,
      navLabels,
      services: servicesResult,
      knowledge: {
        open: knowledgeButton.getAttribute('aria-expanded') === 'true',
        groups: knowledgeMenu.querySelectorAll('section').length,
        links: knowledgeMenu.querySelectorAll('section a').length,
      },
      floatingContacts: [...document.querySelectorAll('aside[aria-label] a')].map((link) => link.textContent.trim()),
      horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
    })
  })()`)

  console.log(JSON.stringify(JSON.parse(result), null, 2))
  socket.close()
}

run().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
