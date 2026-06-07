'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Check, X } from 'lucide-react'

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function getPasswordStrength(pw: string) {
  if (!pw) return 0
  let s = 0
  if (pw.length >= 8) s++
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++
  if (/\d/.test(pw)) s++
  if (/[^a-zA-Z0-9]/.test(pw)) s++
  return s
}

export function LoginForm() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const j = await res.json()
      if (j.ok) { setStatus('✓ เข้าสู่ระบบสำเร็จ'); setTimeout(() => location.href = '/admin', 600) } else setStatus('✗ ' + (j.error || 'ไม่สำเร็จ'))
    } catch (err) { setStatus('✗ เกิดข้อผิดพลาด') }
    setLoading(false)
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">ยินดีต้อนรับกลับ</h1>
        <p className="text-sm text-gray-200">เข้าถึงข้อมูลคดี นัดหมาย และเอกสารของคุณอย่างปลอดภัย</p>
      </div>

      <div>
        <label className="text-sm text-gray-200">อีเมล / ชื่อผู้ใช้</label>
        <input required value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="auth-input" />
      </div>

      <div>
        <label className="text-sm text-gray-200">รหัสผ่าน</label>
        <div className="relative">
          <input required type={show ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="auth-input pr-10" />
          <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300">{show ? <EyeOff size={18} /> : <Eye size={18} />}</button>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-200">
        <label className="flex items-center gap-2"><input type="checkbox" /> จำฉันไว้</label>
        <Link href="#" className="text-gold">ลืมรหัสผ่าน?</Link>
      </div>

      {status && <div className={`text-center ${status.startsWith('✓') ? 'text-green-400' : 'text-red-400'}`}>{status}</div>}

      <button className="auth-button" type="submit">{loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}</button>

      <div className="text-center text-sm text-gray-200">ยังไม่มีบัญชี? <Link href="/register/customer" className="text-gold">สมัครสมาชิก</Link></div>
    </form>
  )
}

export function RegisterForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '', accept: false })
  const [show, setShow] = useState(false)
  const [showC, setShowC] = useState(false)
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const emailValid = form.email ? validateEmail(form.email) : null
  const pwStrength = getPasswordStrength(form.password)

  function canSubmit() {
    return form.name && form.email && form.password && form.confirm && form.accept && form.password === form.confirm
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.accept) { setStatus('✗ กรุณายอมรับเงื่อนไข'); return }
    if (form.password !== form.confirm) { setStatus('✗ รหัสผ่านไม่ตรงกัน'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, password: form.password, role: 'customer' }) })
      const j = await res.json()
      if (j.ok) { setStatus('✓ สมัครสมาชิกสำเร็จ'); setTimeout(() => location.href = '/login', 900) } else setStatus('✗ ' + (j.error || 'ไม่สำเร็จ'))
    } catch (err) { setStatus('✗ เกิดข้อผิดพลาด') }
    setLoading(false)
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">สร้างบัญชี</h1>
        <p className="text-sm text-gray-200">เริ่มใช้งานระบบ ติดตามคดี เอกสาร และการนัดหมาย</p>
      </div>

      <div>
        <label className="text-sm text-gray-200">ชื่อ–นามสกุล</label>
        <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="auth-input" />
      </div>

      <div>
        <label className="text-sm text-gray-200">อีเมล</label>
        <div className="flex items-center gap-2">
          <input required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="auth-input flex-1" />
          {emailValid === true && <Check className="text-green-400" />}
          {emailValid === false && <X className="text-red-400" />}
        </div>
        {emailValid === false && <p className="text-xs text-red-400">อีเมลไม่ถูกต้อง</p>}
      </div>

      <div>
        <label className="text-sm text-gray-200">เบอร์โทร</label>
        <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="auth-input" />
      </div>

      <div>
        <label className="text-sm text-gray-200">รหัสผ่าน</label>
        <div className="relative">
          <input required type={show ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="auth-input pr-10" />
          <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300">{show ? <EyeOff size={18} /> : <Eye size={18} />}</button>
        </div>
        {form.password && (
          <div className="flex items-center gap-2 text-sm">
            <div className="flex gap-1">
              {[0,1,2,3].map(i => (
                <div key={i} className="h-2 w-4 rounded-full" style={{ backgroundColor: i < Math.min(pwStrength,3) ? '#D4AF37' : '#e5e7eb' }} />
              ))}
            </div>
            <span className="text-xs text-gray-200">{pwStrength <= 1 ? 'อ่อน' : pwStrength === 2 ? 'ปานกลาง' : 'แข็งแรง'}</span>
          </div>
        )}
      </div>

      <div>
        <label className="text-sm text-gray-200">ยืนยันรหัสผ่าน</label>
        <div className="relative">
          <input required type={showC ? 'text' : 'password'} value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} className="auth-input pr-10" />
          <button type="button" onClick={() => setShowC(!showC)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300">{showC ? <EyeOff size={18} /> : <Eye size={18} />}</button>
        </div>
      </div>

      <label className="flex items-start gap-2 text-sm text-gray-200"><input type="checkbox" checked={form.accept} onChange={(e) => setForm({ ...form, accept: e.target.checked })} /> ยอมรับ <a href="#" className="text-gold">ข้อกำหนด</a> และ <a href="#" className="text-gold">นโยบายความเป็นส่วนตัว</a></label>

      {status && <div className={`text-center ${status.startsWith('✓') ? 'text-green-400' : 'text-red-400'}`}>{status}</div>}

      <button className="auth-button" type="submit" disabled={!canSubmit()}>{loading ? 'กำลังสมัครสมาชิก...' : 'สมัครสมาชิก'}</button>

      <div className="text-center text-sm text-gray-200">มีบัญชีแล้ว? <Link href="/login" className="text-gold">เข้าสู่ระบบ</Link></div>
    </form>
  )
}
