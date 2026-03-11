import { motion } from 'framer-motion'
import { CalendarCheck, Star } from 'lucide-react'
import BookingCalendar from '../components/BookingCalendar'

export default function Contato() {
  return (
    <div className="bg-zinc-950 min-h-screen pt-16">

      {/* ── Elegant header ── */}
      <section className="relative py-20 px-6 border-b border-zinc-900 overflow-hidden text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-[#4A3B6B] opacity-[0.08] blur-[120px]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] rounded-full bg-[#D4AF37] opacity-[0.04] blur-[80px]" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative z-10 max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-px bg-[#D4AF37]/40" />
            <Star size={13} className="text-[#D4AF37]/60" />
            <div className="w-12 h-px bg-[#D4AF37]/40" />
          </div>

          <div className="inline-flex items-center gap-2.5 mb-6">
            <CalendarCheck size={16} className="text-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium">Agendamento</span>
          </div>

          <h1 className="font-serif text-4xl md:text-6xl text-zinc-50 leading-tight mb-6">
            Reserve seu <span className="text-[#D4AF37] italic">momento.</span>
          </h1>

          <p className="text-zinc-400 text-lg font-light leading-relaxed">
            O atendimento é <strong className="text-zinc-200 font-medium">exclusivo</strong> e mediante{' '}
            <strong className="text-zinc-200 font-medium">avaliação diagnóstica</strong>.
          </p>
        </motion.div>
      </section>

      {/* ── BookingCalendar ── */}
      <BookingCalendar />
    </div>
  )
}
