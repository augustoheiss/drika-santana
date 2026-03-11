import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function Hero() {
  const navigate = useNavigate()
  const scrollToBooking = () => navigate('/contato')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-zinc-950">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#4A3B6B] opacity-10 blur-[120px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-[#D4AF37] opacity-5 blur-[80px]" />
      </div>

      {/* Decorative thin lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <motion.div variants={itemVariants} className="mb-10">
          <img
            src={logo}
            alt="Drika Santana Studio de Embelezamento"
            className="w-40 h-40 md:w-52 md:h-52 object-contain drop-shadow-[0_0_30px_rgba(212,175,55,0.25)]"
          />
        </motion.div>

        {/* Eyebrow tag */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-xs tracking-[0.25em] uppercase text-[#D4AF37] font-medium">
            Studio de Embelezamento · Itaquera
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={itemVariants}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight text-zinc-50 mb-6"
          style={{ textShadow: '0 0 60px rgba(212,175,55,0.12)' }}
        >
          A Arquitetura
          <br />
          <span className="text-[#D4AF37] italic">da Sua Identidade</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-zinc-400 font-light max-w-xl mb-10 leading-relaxed"
        >
          Ciência, Arte e Visagismo no coração de Itaquera.
        </motion.p>

        {/* Divider ornament */}
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-10">
          <div className="w-16 h-px bg-[#D4AF37]/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/60" />
          <div className="w-16 h-px bg-[#D4AF37]/40" />
        </motion.div>

        {/* CTA Button */}
        <motion.div variants={itemVariants}>
          <button
            onClick={scrollToBooking}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#D4AF37] text-zinc-950 font-semibold rounded-sm text-sm tracking-widest uppercase transition-all duration-300 hover:bg-[#E8C95D] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] active:scale-95"
          >
            <span>Agende sua Consultoria</span>
            <ChevronDown
              size={16}
              className="transition-transform duration-300 group-hover:translate-y-1"
            />
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-[#D4AF37]/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}
