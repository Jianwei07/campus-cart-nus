import { useNavigate } from 'react-router-dom'
import { ShieldCheck, ArrowRight } from 'lucide-react'
import FloatingShapes from '../components/FloatingShapes'

export default function LoginPage() {
  const navigate = useNavigate()

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#EEF2F7] to-[#DDE6F0] px-4 py-12">
      <FloatingShapes />
      <div className="relative z-10 w-full max-w-lg rounded-3xl bg-white/95 p-10 text-center shadow-2xl shadow-[#003D7C]/10 backdrop-blur-sm">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-700">
          <ShieldCheck className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-gray-900">Portfolio Demo Mode</h1>
        <p className="mt-4 text-sm leading-6 text-gray-500">
          Public authentication is bypassed for this hosted showcase. The app uses a fake demo
          session and local mock data only, so there are no accounts, passwords, backend writes, or
          student records exposed.
        </p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-nus-blue px-6 py-3 text-sm font-black text-white shadow-lg shadow-nus-blue/20 transition-all hover:bg-nus-blue-hover active:scale-95"
        >
          Enter UI Showcase
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
