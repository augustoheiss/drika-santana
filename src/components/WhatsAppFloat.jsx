import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'

export default function WhatsAppFloat() {
  const [showTooltip, setShowTooltip] = useState(false)

  const defaultMessage = encodeURIComponent(
    'Olá Drika! Gostaria de tirar uma dúvida e saber mais sobre os serviços do Studio.'
  )
  const whatsappUrl = `https://wa.me/5511978466027?text=${defaultMessage}`

  return (
    <aside aria-label="Atendimento rápido via WhatsApp" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Tooltip dialog */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative bg-zinc-900 border border-[#D4AF37]/40 shadow-2xl rounded-xl p-4 max-w-xs text-left"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 text-zinc-400 hover:text-zinc-100 p-1"
              aria-label="Fechar mensagem"
            >
              <X size={14} />
            </button>
            <p className="text-[#D4AF37] font-semibold text-xs tracking-wider uppercase mb-1">
              Drika Santana Studio
            </p>
            <p className="text-zinc-300 text-xs leading-relaxed font-light">
              Olá! Tem alguma dúvida sobre corte, colorimetria ou agendamento? Fale diretamente comigo no WhatsApp!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com a Drika no WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_4px_25px_rgba(16,185,129,0.4)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
      >
        {/* Animated pulse ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-30 animate-ping pointer-events-none" />

        <MessageCircle size={28} className="relative z-10 text-white drop-shadow-md" />

        {/* Small gold dot indicator */}
        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#D4AF37] border-2 border-zinc-950 rounded-full" />
      </motion.a>
    </aside>
  )
}
