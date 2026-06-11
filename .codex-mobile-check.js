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
  const pages = await getJson('http://127.0.0.1:9226/json')
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
    const hamburger = document.querySelector('button[aria-controls="mobile-navigation"]')
    hamburger.click()
    await new Promise((resolve) => setTimeout(resolve, 200))

    const servicesButton = document.querySelector('button[aria-controls="mobile-services-menu"]')
    const knowledgeButton = document.querySelector('button[aria-controls="mobile-knowledge-menu"]')
    servicesButton.click()
    knowledgeButton.click()
    await new Promise((resolve) => setTimeout(resolve, 200))

    const mobileNavigation = document.querySelector('#mobile-navigation')
    const labels = [...mobileNavigation.querySelectorAll(':scope nav > a, :scope nav > div > button')]
      .map((element) => element.textContent.trim())
      .filter(Boolean)

    return JSON.stringify({
      viewport: [innerWidth, innerHeight],
      hamburgerExpanded: hamburger.getAttribute('aria-expanded') === 'true',
      labels,
      servicesAccordion: {
        open: servicesButton.getAttribute('aria-expanded') === 'true',
        groups: document.querySelectorAll('#mobile-services-menu section').length,
        links: document.querySelectorAll('#mobile-services-menu section a').length,
      },
      knowledgeAccordion: {
        open: knowledgeButton.getAttribute('aria-expanded') === 'true',
        groups: document.querySelectorAll('#mobile-knowledge-menu section').length,
        links: document.querySelectorAll('#mobile-knowledge-menu section a').length,
      },
      contactBar: [...document.querySelectorAll('nav[aria-label="ติดต่อด่วนบนมือถือ"] a')].map((link) => link.textContent.trim()),
      desktopNavigationVisible: getComputedStyle(document.querySelector('nav[aria-label="เมนูหลัก"]').parentElement).display !== 'none',
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
