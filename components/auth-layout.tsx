import { ReactNode } from 'react'
import { Gavel } from 'lucide-react'
import Link from 'next/link'

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-primary-dark to-gray-900 flex items-center justify-center px-4 py-8 overflow-y-auto">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-6xl relative z-10 my-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <Link href="/" className="inline-flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center">
              <Gavel size={24} className="text-primary-dark" />
            </div>
            <span className="text-2xl font-bold text-white">เที่ยงธรรมทนายความ</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Branding */}
          <div className="hidden lg:flex flex-col justify-center items-center text-center text-white">
            <div className="mb-8 p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <Gavel size={64} className="mx-auto text-gold mb-4" />
              <p className="text-2xl font-serif text-white mb-4">
                ความลับของคุณ
              </p>
              <p className="text-2xl font-serif text-gold">
                คือหน้าที่ของเรา
              </p>
            </div>
            <div className="text-gray-300 text-sm max-w-sm">
              <p className="mb-3">✓ ติดตามคดีของคุณแบบเรียลไทม์</p>
              <p className="mb-3">✓ เข้าถึงเอกสารสำคัญได้ตลอดเวลา</p>
              <p>✓ ส่วนตัว ปลอดภัย และเป็นมืออาชีพ</p>
            </div>
          </div>

          {/* Right side - Form Card */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="auth-card">
              {children}
            </div>
          </div>
        </div>

        {/* Mobile branding */}
        <div className="lg:hidden text-center text-white mt-8 text-xs text-gray-400">
          <p>ทนายความ • ที่ไว้วางใจ • มืออาชีพ</p>
        </div>
      </div>
    </div>
  )
}
