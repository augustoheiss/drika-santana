import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import logo from '../assets/logo.png'

const navLinks = [
  { to: '/', label: 'Início', end: true },
  { to: '/sobre', label: 'Sobre Mim' },
  { to: '/servicos', label: 'Serviços' },
  { to: '/avaliacoes', label: 'Avaliações' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/60 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="Drika Santana"
            className="w-9 h-9 object-contain drop-shadow-[0_0_10px_rgba(212,175,55,0.2)] group-hover:drop-shadow-[0_0_18px_rgba(212,175,55,0.45)] transition-all duration-300"
          />
          <div className="hidden sm:block leading-none">
            <p className="font-serif text-zinc-100 text-sm">Drika Santana</p>
            <p className="text-[#D4AF37] text-[10px] tracking-[0.2em] uppercase mt-0.5">Studio de Embelezamento</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `text-sm tracking-wide transition-colors duration-200 ${
                  isActive
                    ? 'text-[#D4AF37] font-medium'
                    : 'text-zinc-400 hover:text-zinc-100'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-4">
          <Link
            to="/contato"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2 bg-[#D4AF37] text-zinc-950 font-semibold text-xs tracking-widest uppercase rounded-sm transition-all duration-300 hover:bg-[#E8C95D] hover:shadow-[0_0_25px_rgba(212,175,55,0.35)] active:scale-95"
          >
            Agendar Consultoria
          </Link>
          <button
            className="md:hidden p-2 text-zinc-400 hover:text-zinc-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-zinc-950/98 backdrop-blur-md border-t border-zinc-800/60 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map(({ to, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-base tracking-wide transition-colors ${
                      isActive ? 'text-[#D4AF37] font-medium' : 'text-zinc-300 hover:text-zinc-100'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <Link
                to="/contato"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center px-6 py-3 bg-[#D4AF37] text-zinc-950 font-semibold text-sm tracking-widest uppercase rounded-sm transition-all duration-300 hover:bg-[#E8C95D]"
              >
                Agendar Consultoria
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
