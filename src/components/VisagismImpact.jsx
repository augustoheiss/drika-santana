import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Coffee } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

export default function VisagismImpact() {
  return (
    <section className="relative py-24 px-6 md:px-12 bg-zinc-950 overflow-hidden border-t border-zinc-900">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full bg-[#4A3B6B] opacity-[0.08] blur-[120px]" />
        <div className="absolute right-0 bottom-0 w-[420px] h-[420px] rounded-full bg-[#D4AF37] opacity-[0.05] blur-[100px]" />
      </div>

      {/* Decorative top line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* ── Text column ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#D4AF37]/60" />
              <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-semibold inline-flex items-center gap-2">
                <Coffee size={13} />
                Visagismo para a Vida Real
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-serif text-3xl md:text-5xl text-zinc-50 leading-tight mb-6"
            >
              Quando o espelho finalmente{' '}
              <span className="text-[#D4AF37] italic">sorri de volta pra você.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-zinc-300 text-base md:text-lg font-light leading-relaxed mb-6"
            >
              Visagismo não é um nome chique para te colocar numa caixinha — é justamente o
              contrário! É sentar comigo, tomar um café e descobrir quais linhas, volumes e cores
              conversam com o formato do seu rosto e com o{' '}
              <strong className="text-zinc-100 font-semibold">
                tempo real que você tem de manhã
              </strong>
              .
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-zinc-400 text-sm md:text-base font-light leading-relaxed mb-10"
            >
              O resultado? Você para de brigar com o secador, ganha leveza no olhar e sente que a
              sua imagem finalmente conta a sua própria história.
            </motion.p>

            <motion.div variants={fadeUp}>
              <Link
                to="/contato?servico=corte"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#D4AF37] text-zinc-950 font-semibold text-sm tracking-widest uppercase rounded-sm transition-all duration-300 hover:bg-[#E8C95D] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] active:scale-95"
              >
                Agendar Diagnóstico de Visagismo
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>

          {/* ── Image column ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-2xl bg-[#D4AF37]/10 blur-xl scale-95 translate-y-4" />
            <img
              src="/images/visagismo-impact-01.jpg"
              alt="Antes e depois — transformação pelo Visagismo com Drika Santana"
              loading="lazy"
              className="relative z-10 w-full rounded-2xl border border-zinc-800 shadow-2xl object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Decorative bottom line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
    </section>
  )
}
