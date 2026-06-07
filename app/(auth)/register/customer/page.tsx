'use client'

import { useState, useRef, useEffect } from 'react'
import { AuthLayout } from '@/components/auth-layout'
import { RegisterForm } from '@/components/auth-form'

export default function RegisterCustomer() {
  const [revealed, setRevealed] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setRevealed(true)
            obs.disconnect()
          }
        })
      },
      { root: null, threshold: 0.2 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <AuthLayout>
      <div ref={ref}>
        {!revealed ? (
          <div className="py-8 text-center">
            <h2 className="mb-3 text-2xl font-bold text-gold">สร้างบัญชี</h2>
            <p className="mb-6 text-sm text-gray-100">เริ่มใช้งานระบบ ติดตามคดี เอกสาร และการนัดหมาย</p>
            <div className="flex justify-center">
              <button onClick={() => setRevealed(true)} className="auth-button w-auto px-8">
                เริ่มสมัครสมาชิก
              </button>
            </div>
          </div>
        ) : (
          <RegisterForm />
        )}
      </div>
    </AuthLayout>
  )
}
