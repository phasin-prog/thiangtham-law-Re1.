import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const usersFile = path.join(process.cwd(), 'lib', 'data', 'users.json')

function readUsers() {
  try {
    if (!fs.existsSync(usersFile)) return []
    const raw = fs.readFileSync(usersFile, 'utf8')
    return JSON.parse(raw)
  } catch (e) {
    return []
  }
}

function writeUsers(users: any[]) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf8')
}

export function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString('hex')
  const key = crypto.scryptSync(password, salt, 64).toString('hex')
  return { salt, key }
}

export function verifyPassword(password: string, salt: string, key: string) {
  try {
    const derived = crypto.scryptSync(password, salt, 64).toString('hex')
    return derived === key
  } catch (e) {
    return false
  }
}

const SECRET = process.env.AUTH_SECRET || 'dev_secret_change_me'

function sign(payload: object) {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64')
  const sig = crypto.createHmac('sha256', SECRET).update(data).digest('base64')
  return `${data}.${sig}`
}

function verify(token: string) {
  try {
    const [data, sig] = token.split('.')
    const expected = crypto.createHmac('sha256', SECRET).update(data).digest('base64')
    if (!sig || sig !== expected) return null
    const payload = JSON.parse(Buffer.from(data, 'base64').toString('utf8'))
    return payload
  } catch (e) {
    return null
  }
}

export function createUser({ username, password, name, phone, email, role }: any) {
  const users = readUsers()
  if (users.find((u: any) => u.username === username)) {
    throw new Error('username_taken')
  }
  const { salt, key } = hashPassword(password)
  const id = Date.now().toString()
  const user = { id, username, salt, key, name, phone, email, role }
  users.push(user)
  writeUsers(users)
  return user
}

export function authenticate(username: string, password: string) {
  const users = readUsers()
  const user = users.find((u: any) => u.username === username)
  if (!user) return null
  if (!verifyPassword(password, user.salt, user.key)) return null
  return user
}

export function createTokenForUser(user: any) {
  const payload = { id: user.id, username: user.username, role: user.role }
  return sign(payload)
}

export function verifyToken(token: string) {
  return verify(token)
}

export function listUsers() {
  return readUsers()
}
