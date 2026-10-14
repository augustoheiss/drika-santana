import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import {
  MessageCircle,
  X,
  Coffee,
  Scissors,
  Sparkles,
  Palette,
  CalendarCheck,
  ArrowUpRight,
} from 'lucide-react'
import { buildWhatsAppUrl } from '../config/servicesCatalog'

const quickStarters = [
  {
    id: 'visagismo',
    icon: <Scissors size={14} className="text-[#D4AF37] shrink-0" />,
    label: 'Quero um corte prático pro meu rosto (Visagismo)',
    message:
      'Oi Drika! ☕ Estava navegando no seu site e queria bater um papo sincero: quero descobrir um corte que valorize meu rosto e seja prático na minha rotina!',
  },
  {
    id: 'cachos',
    icon: <Sparkles size={14} className="text-[#D4AF37] shrink-0" />,
    label: 'Tenho cachos/crespo e quero conhecer o Dry Cut',
    message:
      'Oi Drika! ☕ Tenho cabelo cacheado/crespo, vi no site sobre o seu Dry Cut (corte a seco) e queria conversar sobre o meu cabelo!',
  },
  {
    id: 'cor',
    icon: <Palette size={14} className="text-[#D4AF37] shrink-0" />,
    label: 'Quero iluminar/colorir com segurança (Teste de Mecha)',
    message:
      'Oi Drika! ☕ Quero conversar sobre Colorimetria / Mechas com segurança e saber como funciona a avaliação com Teste de Mecha!',
  },
  {
    id: 'duvida',
    icon: <Coffee size={14} className="text-[#D4AF37] shrink-0" />,
    label: 'Só quero tirar uma dúvida rápida / bater um papo',
    message:
      'Oi Drika! ☕ Tudo bem? Vim pelo site do Studio e gostaria de tirar uma dúvida rápida com você!',
  },
]

export default function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  return (
    <aside
      aria-label="Concierge de atendimento via WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto"
    >
      {/* Conversational Coffee-Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: 0.22 }}
            className="relative bg-zinc-900 border border-[#D4AF37]/45 shadow-[0_15px_50px_rgba(0,0,0,0.75)] rounded-2xl p-5 w-[320px] sm:w-[350px] text-left"
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-100 p-1.5 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Fechar menu do WhatsApp"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-2 text-[#D4AF37] font-semibold text-xs tracking-wider uppercase mb-1.5 pr-6">
              <Coffee size={14} />
              <span>Café Virtual com a Drika</span>
            </div>

            <p className="text-zinc-300 text-xs leading-relaxed font-light mb-4">
              Puxa uma cadeira! Escolha abaixo sobre o que você quer conversar e já abrimos o
              WhatsApp direto no assunto:
            </p>

            <div className="space-y-2 mb-4">
              {quickStarters.map((item) => (
                <a
                  key={item.id}
                  href={buildWhatsAppUrl(item.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center justify-between gap-2.5 p-3 rounded-xl bg-zinc-950/90 border border-zinc-800 hover:border-[#D4AF37]/50 hover:bg-zinc-950 text-xs text-zinc-200 hover:text-[#D4AF37] transition-all"
                >
                  <span className="flex items-center gap-2.5 leading-snug">
                    {item.icon}
                    <span>{item.label}</span>
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="text-zinc-500 group-hover:text-[#D4AF37] shrink-0 transition-colors"
                  />
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
              <span>Prefere já escolher o dia?</span>
              <Link
                to="/contato"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-1 text-[#D4AF37] hover:underline font-semibold"
              >
                <CalendarCheck size={12} />
                Ver Agenda Online
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Fechar menu do WhatsApp' : 'Falar com a Drika no WhatsApp'}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="relative group flex items-center gap-2.5 px-4 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_4px_25px_rgba(16,185,129,0.4)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] cursor-pointer"
      >
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-25 animate-ping pointer-events-none" />
        )}

        {isOpen ? (
          <X size={24} className="relative z-10 text-white" />
        ) : (
          <>
            <MessageCircle size={24} className="relative z-10 text-white drop-shadow-md" />
            <span className="relative z-10 text-xs font-semibold tracking-wide pr-1 hidden sm:inline">
              Falar com a Drika
            </span>
          </>
        )}

        {/* Small gold dot indicator */}
        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#D4AF37] border-2 border-zinc-950 rounded-full" />
      </motion.button>
    </aside>
  )
}
