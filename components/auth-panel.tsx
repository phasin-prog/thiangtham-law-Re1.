'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

function buildBEYears(range = 80) {
  const now = new Date().getFullYear()
  const years = []
  for (let i = 0; i < range; i++) {
    const gy = now - i
    years.push({ gy, be: gy + 543 })
  }
  return years
}

export default function AuthPanel() {
  const [user, setUser] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<'login' | 'register'>('login')
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [regForm, setRegForm] = useState({ username: '', password: '', name: '', phone: '', email: '', role: 'customer', birthday: '' })
  const [status, setStatus] = useState('')
  const years = buildBEYears(120)

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((j) => setUser(j.user || null))
      .finally(() => setLoading(false))
  }, [])

  async function submitLogin(e: React.FormEvent) {
    e.preventDefault()
    setStatus('กำลังเข้าสู่ระบบ...')
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginForm),
    })
    const j = await res.json()
    if (j.ok) {
      setStatus('เรียบร้อย')
      setUser(j.user)
      location.reload()
    } else setStatus('ข้อผิดพลาด: ' + (j.error || 'ไม่ทราบสาเหตุ'))
  }

  async function submitRegister(e: React.FormEvent) {
    e.preventDefault()
    setStatus('สมัครสมาชิก...')
    const payload = { ...regForm }
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const j = await res.json()
    if (j.ok) {
      setStatus('สมัครสำเร็จ')
      setUser(j.user)
      location.reload()
    } else setStatus('ข้อผิดพลาด: ' + (j.error || 'ไม่ทราบสาเหตุ'))
  }

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
    location.reload()
  }

  if (loading) return null

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setView('login')} className={`px-3 py-1 ${view === 'login' ? 'bg-primary text-white rounded' : 'text-muted-foreground'}`}>เข้าสู่ระบบ</button>
            <button onClick={() => setView('register')} className={`px-3 py-1 ${view === 'register' ? 'bg-primary text-white rounded' : 'text-muted-foreground'}`}>สมัครสมาชิก</button>
          </div>
          {user && (
            <div className="flex items-center gap-2">
              <span className="text-sm">{user.name}</span>
              <button onClick={logout} className="rounded border px-3 py-1 text-sm">ออกจากระบบ</button>
            </div>
          )}
        </div>

        {!user && view === 'login' && (
          <form onSubmit={submitLogin} className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Username</label>
              <input required value={loginForm.username} onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })} className="w-full rounded border px-2 py-2" />
              <label className="text-sm text-muted-foreground">Password</label>
              <input required type="password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} className="w-full rounded border px-2 py-2" />
              <div className="flex items-center gap-2">
                <button className="rounded bg-primary px-3 py-1 text-sm text-white">เข้าสู่ระบบ</button>
                <div className="text-sm">{status}</div>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-3">
              <p className="text-sm text-muted-foreground">หรือสมัครสมาชิกใหม่</p>
              <button type="button" onClick={() => setView('register')} className="rounded border px-3 py-2 text-sm">สร้างบัญชีใหม่</button>
              <Link href="/register/staff" className="text-sm underline">สมัครเป็นทีมงาน (หน้าเต็ม)</Link>
            </div>
          </form>
        )}

        {!user && view === 'register' && (
          <form onSubmit={submitRegister} className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">ชื่อ-นามสกุล</label>
              <input required value={regForm.name} onChange={(e) => setRegForm({ ...regForm, name: e.target.value })} className="w-full rounded border px-2 py-2" />

              <label className="text-sm text-muted-foreground">Username</label>
              <input required value={regForm.username} onChange={(e) => setRegForm({ ...regForm, username: e.target.value })} className="w-full rounded border px-2 py-2" />

              <label className="text-sm text-muted-foreground">Password</label>
              <input required type="password" value={regForm.password} onChange={(e) => setRegForm({ ...regForm, password: e.target.value })} className="w-full rounded border px-2 py-2" />

              <label className="text-sm text-muted-foreground">อีเมล</label>
              <input value={regForm.email} onChange={(e) => setRegForm({ ...regForm, email: e.target.value })} className="w-full rounded border px-2 py-2" />

              <label className="text-sm text-muted-foreground">เบอร์โทร</label>
              <input value={regForm.phone} onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })} className="w-full rounded border px-2 py-2" />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">บทบาท</label>
              <div className="flex gap-2">
                <button type="button" onClick={() => setRegForm({ ...regForm, role: 'customer' })} className={`px-3 py-1 ${regForm.role === 'customer' ? 'bg-primary text-white rounded' : 'border rounded'}`}>ลูกค้า</button>
                <button type="button" onClick={() => setRegForm({ ...regForm, role: 'staff' })} className={`px-3 py-1 ${regForm.role === 'staff' ? 'bg-primary text-white rounded' : 'border rounded'}`}>ทีมงาน</button>
              </div>

              <label className="text-sm text-muted-foreground">วันเกิด</label>
              <div className="grid grid-cols-3 gap-2">
                <input placeholder="วัน" type="number" min={1} max={31} value={regForm.birthday ? new Date(regForm.birthday).getDate() : ''} onChange={(e) => {
                  const d = Number(e.target.value)
                  const prev = regForm.birthday ? new Date(regForm.birthday) : new Date()
                  prev.setDate(d || 1)
                  setRegForm({ ...regForm, birthday: prev.toISOString().slice(0,10) })
                }} className="w-full rounded border px-2 py-2" />

                <select value={regForm.birthday ? new Date(regForm.birthday).getMonth().toString() : ''} onChange={(e) => {
                  const m = Number(e.target.value)
                  const prev = regForm.birthday ? new Date(regForm.birthday) : new Date()
                  prev.setMonth(m)
                  setRegForm({ ...regForm, birthday: prev.toISOString().slice(0,10) })
                }} className="w-full rounded border px-2 py-2">
                  <option value="">เดือน</option>
                  {['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'].map((label, i) => (
                    <option key={i} value={i}>{label}</option>
                  ))}
                </select>

                <input list="be-years" placeholder="พ.ศ." value={regForm.birthday ? String(new Date(regForm.birthday).getFullYear() + 543) : ''} onChange={(e) => {
                  const be = Number(e.target.value)
                  if (!be) return
                  const gy = be - 543
                  const prev = regForm.birthday ? new Date(regForm.birthday) : new Date()
                  prev.setFullYear(gy)
                  setRegForm({ ...regForm, birthday: prev.toISOString().slice(0,10) })
                }} className="w-full rounded border px-2 py-2" />
                <datalist id="be-years">
                  {years.map((y) => (
                    <option key={y.gy} value={y.be} />
                  ))}
                </datalist>

              </div>

              <div className="mt-3 flex items-center gap-2">
                <button className="rounded bg-primary px-3 py-1 text-sm text-white">สมัครสมาชิก</button>
                <div className="text-sm">{status}</div>
              </div>
            </div>
          </form>
        )}

        {user && (
          <div className="mt-4 text-sm text-muted-foreground">คุณล็อกอินอยู่ในระบบแล้ว</div>
        )}
      </div>
    </div>
  )
}
