import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { User, Scissors, CalendarCheck, ArrowRight, Star } from 'lucide-react'
import Hero from '../components/Hero'

const features = [
  {
    icon: <User className="w-6 h-6 text-[#D4AF37]" />,
    title: 'Uma profissional, uma missão',
    description: 'Adriana Santana (Drika) combina escuta ativa, técnica apurada e visagismo prático para entregar o resultado que você realmente merece.',
    cta: 'Conheça a Drika',
    to: '/sobre',
  },
  {
    icon: <Scissors className="w-6 h-6 text-[#D4AF37]" />,
    title: 'Menu completo de serviços',
    description: 'De cortes e colorimetria a barbearia clássica, design de sobrancelhas e nail care. Tudo sob o mesmo teto, com excelência e biossegurança.',
    cta: 'Ver todos os serviços',
    to: '/servicos',
  },
  {
    icon: <CalendarCheck className="w-6 h-6 text-[#D4AF37]" />,
    title: 'Agendamento exclusivo',
    description: 'O atendimento é personalizado e mediante avaliação diagnóstica. Reserve o seu momento de forma rápida e segura diretamente aqui.',
    cta: 'Reservar agora',
    to: '/contato',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function Home() {
  return (
    <>
      <Hero />

      {/* ── Features ── */}
      <section className="py-24 bg-zinc-950 border-t border-zinc-900 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-xs tracking-[0.25em] uppercase text-[#D4AF37] font-medium mb-6">
              Studio de Embelezamento · Itaquera
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-zinc-50 leading-tight">
              Beleza que respeita<br />
              <span className="text-[#D4AF37] italic">quem você é.</span>
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={itemVariants}
                className="group relative p-8 border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-[#D4AF37]/40 transition-all duration-400 flex flex-col"
              >
                {/* Icon */}
                <div className="mb-6 p-4 bg-zinc-950 inline-block border border-zinc-800 group-hover:border-[#D4AF37]/30 transition-colors">
                  {f.icon}
                </div>
                <h3 className="font-serif text-xl text-zinc-100 mb-3">{f.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed font-light flex-1">{f.description}</p>
                <Link
                  to={f.to}
                  className="mt-6 inline-flex items-center gap-2 text-[#D4AF37] text-xs tracking-widest uppercase font-semibold hover:gap-3 transition-all duration-200"
                >
                  {f.cta}
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Social proof strip ── */}
      <section className="py-16 bg-zinc-900/30 border-y border-zinc-800/50 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          {[
            { value: '10+', label: 'Anos de Experiência' },
            { value: '5', label: 'Áreas de Especialidade' },
            { value: '100%', label: 'Diagnóstico Personalizado' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <p className="font-serif text-4xl text-[#D4AF37] font-bold">{stat.value}</p>
              <p className="text-zinc-500 text-sm tracking-widest uppercase mt-1 font-light">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Visagismo Science / Diptych ── */}
      <section className="relative py-24 bg-zinc-950 border-t border-zinc-900 overflow-hidden px-6 md:px-12">

        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[700px] h-[400px] rounded-full bg-[#4A3B6B] opacity-[0.07] blur-[130px]" />
          <div className="absolute right-0 bottom-0 w-[400px] h-[400px] rounded-full bg-[#D4AF37] opacity-[0.04] blur-[100px]" />
        </div>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-xs tracking-[0.25em] uppercase text-[#D4AF37] font-medium mb-6">
              Visagismo & Ciência
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-slate-50 leading-tight">
              A Engenharia por trás da<br />
              <span className="text-[#D4AF37] italic">Sua Beleza.</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto mt-6 font-light leading-relaxed text-base md:text-lg">
              O Visagismo não é achismo. É a aplicação das proporções áureas encontradas em todo
              o Universo — da casca de uma concha à formação de galáxias — impressas no seu rosto
              para revelar sua verdadeira identidade e equilíbrio.
            </p>
          </motion.div>

          {/* Diptych grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-14">

            {/* Card 1 — ciencia-01 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="group relative bg-zinc-900 border border-zinc-800 hover:border-[#D4AF37]/40 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative overflow-hidden">
                <img
                  src="/images/ciencia-01.jpg"
                  alt="Padrões de proporção áurea no Visagismo"
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />
              </div>

              <div className="p-7">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-px bg-[#D4AF37]/60" />
                  <span className="text-[#D4AF37] text-xs tracking-[0.25em] uppercase font-semibold">Conexão Universal</span>
                </div>
                <p className="text-zinc-400 text-sm font-light leading-relaxed">
                  Padrões de crescimento sagrados impressos na sua estrutura.
                </p>
              </div>
            </motion.div>

            {/* Card 2 — ciencia-02 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
              className="group relative bg-zinc-900 border border-zinc-800 hover:border-[#D4AF37]/40 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative overflow-hidden">
                <img
                  src="/images/ciencia-02.jpg"
                  alt="Engenharia moderna e matemática do equilíbrio"
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />
              </div>

              <div className="p-7">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-px bg-[#D4AF37]/60" />
                  <span className="text-[#D4AF37] text-xs tracking-[0.25em] uppercase font-semibold">Aplicação de Autoridade</span>
                </div>
                <p className="text-zinc-400 text-sm font-light leading-relaxed">
                  A engenharia moderna traduzindo a matemática do equilíbrio.
                </p>
              </div>
            </motion.div>

          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/sobre"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-zinc-700 text-zinc-300 font-medium text-xs tracking-widest uppercase rounded-sm transition-all duration-300 hover:border-[#D4AF37]/50 hover:text-zinc-100"
            >
              Entenda minha Filosofia
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/contato"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#D4AF37] text-zinc-950 font-semibold text-xs tracking-widest uppercase rounded-sm transition-all duration-300 hover:bg-[#E8C95D] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] active:scale-95"
            >
              Agendar com quem entende a Ciência
              <ArrowRight size={14} />
            </Link>
          </motion.div>

        </div>

        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
      </section>

      {/* ── Final CTA ── */}
      <section className="relative py-32 bg-zinc-950 overflow-hidden px-6 text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full bg-[#4A3B6B] opacity-[0.08] blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] rounded-full bg-[#D4AF37] opacity-[0.04] blur-[80px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-16 h-px bg-[#D4AF37]/40" />
            <Star size={14} className="text-[#D4AF37]/60" />
            <div className="w-16 h-px bg-[#D4AF37]/40" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-zinc-50 mb-6 leading-tight">
            Pronto para a sua<br />
            <span className="text-[#D4AF37] italic">melhor versão?</span>
          </h2>
          <p className="text-zinc-400 font-light leading-relaxed mb-10 max-w-lg mx-auto">
            O atendimento é exclusivo, diagnóstico e personalizado. Cada detalhe pensado para você.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contato"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#D4AF37] text-zinc-950 font-semibold text-sm tracking-widest uppercase rounded-sm transition-all duration-300 hover:bg-[#E8C95D] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] active:scale-95"
            >
              Reservar meu momento
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/servicos"
              className="inline-flex items-center gap-3 px-8 py-4 border border-zinc-700 text-zinc-300 font-medium text-sm tracking-wide rounded-sm transition-all duration-300 hover:border-[#D4AF37]/50 hover:text-zinc-100"
            >
              Explorar serviços
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  )
}
