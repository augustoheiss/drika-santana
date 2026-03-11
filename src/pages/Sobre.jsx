import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Eye,
  Scissors,
  Wand2,
  Zap,
  Sparkles,
  Globe,
  Heart,
  Award,
  ArrowRight,
  Plus,
} from 'lucide-react'
import fotoDrika from '../assets/drikahair-02.jpg'

const especialidades = [
  {
    icon: <Eye className="w-6 h-6 text-[#D4AF37]" />,
    title: 'Visagismo & Colorimetria',
    description: 'Análise científica do formato de rosto aliada à teoria das cores para criar resultados únicos e duradouros.',
  },
  {
    icon: <Scissors className="w-6 h-6 text-[#D4AF37]" />,
    title: 'Especialista em Crespos e Cacheados',
    description: 'Dry Cut com respeito ao fator de encolhimento, preservando a estrutura espiralada e o volume natural.',
  },
  {
    icon: <Wand2 className="w-6 h-6 text-[#D4AF37]" />,
    title: 'Design de Cortes',
    description: 'Especialista em Chanel de bico e Long Bob — cortes de precisão com acabamento editorial e baixa manutenção.',
  },
  {
    icon: <Zap className="w-6 h-6 text-[#D4AF37]" />,
    title: 'Barbearia Clássica',
    description: 'Cortes masculinos e design de barba com técnica tradicional para uma imagem impecável e atemporal.',
  },
  {
    icon: <Sparkles className="w-6 h-6 text-[#D4AF37]" />,
    title: 'Design de Sobrancelhas',
    description: 'Emolduramento do olhar que respeita a simetria natural e a anatomia do rosto, sem exageros.',
  },
]

const certificados = Array.from({ length: 6 }, (_, i) => i + 1)

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function Sobre() {
  return (
    <div className="bg-zinc-950 min-h-screen pt-16">

      {/* ── Page header ── */}
      <section className="relative py-20 px-6 border-b border-zinc-900 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#4A3B6B] opacity-[0.08] blur-[100px]" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl mx-auto text-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-xs tracking-[0.25em] uppercase text-[#D4AF37] font-medium mb-6">
            A Profissional
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-zinc-50 leading-tight">
            Muito além de<br />
            <span className="text-[#D4AF37] italic">uma cabeleireira.</span>
          </h1>
        </motion.div>
      </section>

      {/* ── Editorial bio ── */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-16">

          {/* Photo column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="w-full lg:w-[45%] relative flex-shrink-0"
          >
            <div className="absolute inset-0 bg-[#D4AF37]/10 transform translate-x-5 translate-y-5 border border-[#D4AF37]/25 pointer-events-none" />
            <img
              src={fotoDrika}
              alt="Adriana Santana — Drika"
              className="relative z-10 w-full h-auto object-cover shadow-2xl border border-zinc-800 grayscale-0 md:grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute -bottom-5 -right-5 bg-zinc-900 border border-[#D4AF37]/30 px-5 py-4 z-20 shadow-xl">
              <p className="font-serif text-[#D4AF37] text-sm tracking-widest uppercase">Adriana Santana</p>
              <p className="text-zinc-500 text-xs font-light mt-0.5">Studio de Embelezamento · Itaquera</p>
            </div>
          </motion.div>

          {/* Bio column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="w-full lg:w-[55%]"
          >
            <p className="text-zinc-500 text-xs tracking-[0.3em] uppercase font-medium mb-4">Prazer, eu sou a Drika</p>
            <div className="space-y-5 text-zinc-300 font-light leading-relaxed text-lg">
              <p>
                Prazer, eu sou a <strong className="text-zinc-100 font-medium">Adriana Santana</strong>, mas todos me conhecem como <strong className="text-[#D4AF37]">Drika</strong>!
              </p>
              <p>
                Não sou apenas uma cabeleireira; sou uma profissional em <strong className="text-zinc-100 font-medium">constante evolução técnica</strong> para garantir o resultado impecável que você merece.
              </p>
              <p>
                Meu trabalho é pautado na <strong className="text-zinc-100 font-medium">escuta ativa</strong> e no conhecimento profundo para ajudar você a se sentir na sua melhor versão.
              </p>
              <blockquote className="border-l-2 border-[#D4AF37] pl-5 italic text-zinc-400 text-base">
                "Não entrego resultados baseados em tendências vazias. Entrego o que realmente funciona para a sua rotina, seu rosto e seu estilo de vida."
              </blockquote>
            </div>

            {/* Side personal section */}
            <div className="mt-10 p-6 border border-zinc-800 bg-zinc-900/40 rounded-sm">
              <div className="flex items-center gap-3 mb-4">
                <Heart size={16} className="text-[#D4AF37]" />
                <h3 className="font-serif text-zinc-200 text-lg">Lado Pessoal</h3>
              </div>
              <div className="space-y-3 text-zinc-400 text-sm font-light leading-relaxed">
                <p>
                  Apaixonada pela área da beleza e autoestima, amo viajar, aprender coisas novas e <span className="text-zinc-200 italic">hablo español!</span>
                </p>
                <p className="flex items-start gap-2">
                  <Globe size={14} className="text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  Em toda a minha trajetória, coloco <strong className="text-zinc-200 font-medium">Jeová Deus em primeiro lugar</strong>{' '}
                  <a
                    href="https://www.jw.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D4AF37] hover:text-[#E8C95D] transition-colors"
                  >
                    (JW.ORG)
                  </a>.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <Link
                to="/contato"
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#D4AF37] text-zinc-950 font-semibold text-xs tracking-widest uppercase rounded-sm transition-all duration-300 hover:bg-[#E8C95D] hover:shadow-[0_0_30px_rgba(212,175,55,0.35)] active:scale-95"
              >
                Agendar com a Drika
                <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Specialties grid ── */}
      <section className="py-24 bg-zinc-900/20 border-t border-zinc-900 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-14"
          >
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium">Expertise</span>
            <h2 className="font-serif text-3xl md:text-5xl text-zinc-50 mt-3 leading-tight">
              Minhas <span className="text-[#D4AF37] italic">Especialidades</span>
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {especialidades.map((esp) => (
              <motion.div
                key={esp.title}
                variants={itemVariants}
                className="group p-7 border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/70 hover:border-[#D4AF37]/40 transition-all duration-300"
              >
                <div className="mb-5 p-3.5 bg-zinc-950 inline-block border border-zinc-800 group-hover:border-[#D4AF37]/30 transition-colors">
                  {esp.icon}
                </div>
                <h3 className="font-serif text-lg text-zinc-100 mb-2">{esp.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-light">{esp.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Certificates section ── */}
      <section className="py-24 px-6 md:px-12 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-14"
          >
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium">Formação</span>
            <h2 className="font-serif text-3xl md:text-5xl text-zinc-50 mt-3 leading-tight">
              Minhas Qualificações<br />
              <span className="text-[#D4AF37] italic">e Certificados</span>
            </h2>
            <p className="text-zinc-500 text-sm font-light mt-4 max-w-xl leading-relaxed">
              Cada diploma representa horas de dedicação e atualização constante. Em breve, os certificados completos estarão disponíveis aqui.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-5"
          >
            {certificados.map((n) => (
              <motion.div
                key={n}
                variants={itemVariants}
                className="group relative aspect-[4/3] border border-dashed border-zinc-700 bg-zinc-900/20 hover:border-[#D4AF37]/40 hover:bg-zinc-900/50 transition-all duration-300 flex flex-col items-center justify-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Award
                  size={32}
                  className="text-zinc-700 group-hover:text-[#D4AF37]/50 transition-colors duration-300"
                />
                <div className="text-center">
                  <p className="text-zinc-600 text-xs tracking-[0.2em] uppercase font-medium group-hover:text-zinc-500 transition-colors">
                    Certificado
                  </p>
                  <p className="text-zinc-700 text-[11px] mt-0.5 font-light">Em breve</p>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Plus size={14} className="text-[#D4AF37]/40" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-20 px-6 border-t border-zinc-900 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-xl mx-auto"
        >
          <h2 className="font-serif text-2xl md:text-4xl text-zinc-50 mb-4 leading-tight">
            Pronta para se sentir na<br />
            <span className="text-[#D4AF37] italic">sua melhor versão?</span>
          </h2>
          <p className="text-zinc-500 text-sm font-light mb-8 leading-relaxed">
            Conheça os serviços ou agende sua consultoria agora.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contato"
              className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#D4AF37] text-zinc-950 font-semibold text-xs tracking-widest uppercase rounded-sm transition-all duration-300 hover:bg-[#E8C95D] hover:shadow-[0_0_30px_rgba(212,175,55,0.35)] active:scale-95"
            >
              Agendar Consultoria
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/servicos"
              className="inline-flex items-center gap-3 px-7 py-3.5 border border-zinc-700 text-zinc-400 text-xs tracking-widest uppercase font-medium rounded-sm transition-all duration-300 hover:border-[#D4AF37]/50 hover:text-zinc-200"
            >
              Ver Serviços
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
