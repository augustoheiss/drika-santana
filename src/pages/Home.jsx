import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  Scissors,
  Palette,
  AlertTriangle,
  EyeOff,
  Repeat2,
  ShieldCheck,
  Lightbulb,
  Gem,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import drikaPhoto from '../assets/drikahair-02.jpg'

/* ─── Animation Variants ─────────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: 'easeOut', delay },
  }),
}

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

/* ─── Shared primitives ───────────────────────────────────────────────────── */

function GoldBadge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-xs tracking-[0.25em] uppercase text-[#D4AF37] font-semibold mb-6">
      {children}
    </span>
  )
}

function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-2">
      <div className="w-16 h-px bg-[#D4AF37]/30" />
      <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/50" />
      <div className="w-16 h-px bg-[#D4AF37]/30" />
    </div>
  )
}

function AmbientGlow({ className }) {
  return (
    <div className={`absolute rounded-full pointer-events-none blur-[120px] ${className}`} />
  )
}

/* ══════════════════════════════════════════════════════════════════════════ */
/*  1.  HERO / ABOVE THE FOLD                                                 */
/* ══════════════════════════════════════════════════════════════════════════ */

function HeroSection() {
  const bullets = [
    {
      icon: <Sparkles size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />,
      text: 'Visagismo e design de imagem personalizado.',
    },
    {
      icon: <Scissors size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />,
      text: 'Especialista em cabelos crespos, cacheados e cortes geométricos (Chanel de bico).',
    },
    {
      icon: <Palette size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />,
      text: 'Colorimetria capilar avançada para o tom exato.',
    },
  ]

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-zinc-950 px-6 text-center">
      {/* Ambient glows */}
      <AmbientGlow className="top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#4A3B6B] opacity-10" />
      <AmbientGlow className="top-1/3 left-1/2 -translate-x-1/2 w-[320px] h-[320px] bg-[#D4AF37] opacity-[0.06]" />

      {/* Top decorative line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent" />
      {/* Bottom decorative line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent" />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={cardVariant} className="mb-4">
          <GoldBadge>Studio de Embelezamento · Itaquera</GoldBadge>
        </motion.div>

        {/* H1 */}
        <motion.h1
          variants={cardVariant}
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-zinc-50 mb-6"
          style={{ textShadow: '0 0 60px rgba(212,175,55,0.1)' }}
        >
          Pare tudo e me deixe{' '}
          <span className="text-[#D4AF37] italic">transformar</span>
          <br />o seu cabelo na sua{' '}
          <span className="text-[#D4AF37] italic">melhor versão.</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={cardVariant}
          className="text-zinc-400 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-10"
        >
          Para mulheres que buscam alinhar sua imagem externa com sua essência.{' '}
          O Visagismo não é apenas um corte —{' '}
          <span className="text-zinc-200 font-medium">
            é a engenharia da sua autoridade pessoal e autoestima.
          </span>
        </motion.p>

        {/* Bullets */}
        <motion.ul
          variants={stagger}
          className="inline-flex flex-col items-start gap-3 mb-12 text-left"
        >
          {bullets.map(({ icon, text }, i) => (
            <motion.li
              key={i}
              variants={cardVariant}
              className="flex items-start gap-3 text-zinc-300 text-sm md:text-base font-light"
            >
              {icon}
              <span>{text}</span>
            </motion.li>
          ))}
        </motion.ul>

        {/* CTA */}
        <motion.div variants={cardVariant}>
          <Link
            to="/contato"
            id="hero-cta"
            className="inline-flex items-center gap-3 px-9 py-4 bg-[#D4AF37] text-zinc-950 font-bold text-sm tracking-widest uppercase rounded-sm transition-all duration-300 hover:bg-[#E8C95D] hover:shadow-[0_0_50px_rgba(212,175,55,0.45)] active:scale-95"
          >
            Agendar Meu Diagnóstico
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-[#D4AF37]/60 to-transparent mx-auto"
        />
      </motion.div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════════════ */
/*  2.  CURRENT PAIN  (O "Antes")                                             */
/* ══════════════════════════════════════════════════════════════════════════ */

const painPoints = [
  {
    icon: <AlertTriangle size={24} className="text-[#D4AF37]" />,
    title: 'A Frustração do Padrão',
    description:
      'Cortes genéricos que não respeitam o formato único do seu rosto ou a textura natural do seu fio.',
  },
  {
    icon: <EyeOff size={24} className="text-[#D4AF37]" />,
    title: 'O Peso da Desordem',
    description:
      'O sentimento de invisibilidade profissional quando a sua imagem transmite desorganização em vez de autoridade.',
  },
  {
    icon: <Repeat2 size={24} className="text-[#D4AF37]" />,
    title: 'A Luta Diária',
    description:
      'O ciclo exaustivo de tentar domar o cabelo todos os dias porque a estrutura do corte foi mal executada.',
  },
]

function PainSection() {
  return (
    <section className="relative py-28 bg-zinc-950 border-t border-zinc-900/60 px-6 md:px-12 overflow-hidden">
      <AmbientGlow className="bottom-0 left-0 w-[400px] h-[300px] bg-[#4A3B6B] opacity-[0.07]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="text-center mb-16"
        >
          <GoldBadge>O Antes · A Dor</GoldBadge>
          <h2 className="font-serif text-3xl md:text-5xl text-zinc-50 leading-tight">
            Quando o espelho não reflete{' '}
            <span className="text-[#D4AF37] italic">quem você realmente é.</span>
          </h2>
        </motion.div>

        {/* Pain cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14"
        >
          {painPoints.map(({ icon, title, description }) => (
            <motion.div
              key={title}
              variants={cardVariant}
              className="group p-7 bg-zinc-900/50 border border-zinc-800 hover:border-[#D4AF37]/25 transition-all duration-400 flex flex-col gap-4"
            >
              <div className="p-3 bg-zinc-950 border border-zinc-800 group-hover:border-[#D4AF37]/20 transition-colors inline-block w-fit">
                {icon}
              </div>
              <h3 className="font-serif text-lg text-zinc-100">{title}</h3>
              <p className="text-zinc-500 text-sm font-light leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Belief Deconstruction */}
        <motion.blockquote
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.2}
          className="relative border-l-2 border-[#D4AF37]/60 pl-8 py-4 max-w-3xl mx-auto"
        >
          <div className="absolute -left-px top-0 h-full w-px bg-gradient-to-b from-[#D4AF37]/60 via-[#D4AF37]/20 to-transparent" />
          <p className="text-zinc-400 text-base md:text-lg font-light leading-relaxed italic">
            "Muitas mulheres acreditam que um visual de luxo exige horas no salão toda semana.{' '}
            <span className="text-zinc-200 not-italic font-medium">
              A verdade é que a dificuldade diária é apenas o sintoma de um corte sem técnica.
            </span>{' '}
            Quando há engenharia por trás do design, o luxo se torna prático."
          </p>
        </motion.blockquote>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent" />
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════════════ */
/*  3.  DESIRED OUTCOME  (O "Depois")                                         */
/* ══════════════════════════════════════════════════════════════════════════ */

const outcomes = [
  {
    icon: <ShieldCheck size={28} className="text-zinc-950" />,
    title: 'Segurança Inabalável',
    description:
      'Você entra em qualquer ambiente com a confiança absoluta de quem sabe que está impecável.',
  },
  {
    icon: <Lightbulb size={28} className="text-zinc-950" />,
    title: 'Praticidade Inteligente',
    description:
      'Um corte pensado para a sua rotina, que tem caimento perfeito com o mínimo de esforço em casa.',
  },
  {
    icon: <Gem size={28} className="text-zinc-950" />,
    title: 'Identidade Revelada',
    description:
      'Seus traços fortes são valorizados, comunicando ao mundo a sua verdadeira essência.',
  },
]

function OutcomeSection() {
  return (
    <section className="relative py-28 bg-zinc-950 px-6 md:px-12 overflow-hidden">
      <AmbientGlow className="top-0 right-0 w-[500px] h-[400px] bg-[#D4AF37] opacity-[0.04]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="text-center mb-16"
        >
          <GoldBadge>O Depois · A Transformação</GoldBadge>
          <h2 className="font-serif text-3xl md:text-5xl text-zinc-50 leading-tight">
            Imagine a sua imagem trabalhando{' '}
            <span className="text-[#D4AF37] italic">a favor do seu sucesso.</span>
          </h2>
        </motion.div>

        {/* Outcome cards — gold accent */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14"
        >
          {outcomes.map(({ icon, title, description }) => (
            <motion.div
              key={title}
              variants={cardVariant}
              className="group relative p-7 bg-[#D4AF37]/5 border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 transition-all duration-400 flex flex-col gap-5 overflow-hidden"
            >
              {/* Top glow accent */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

              <div className="p-3 bg-[#D4AF37] inline-block w-fit shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                {icon}
              </div>
              <div>
                <h3 className="font-serif text-lg text-zinc-100 mb-2">{title}</h3>
                <p className="text-zinc-500 text-sm font-light leading-relaxed">{description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* New Paradigm */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.2}
          className="text-center max-w-2xl mx-auto"
        >
          <SectionDivider />
          <p className="mt-8 text-zinc-300 text-base md:text-lg font-light leading-relaxed">
            "E se o seu cabelo deixasse de ser uma preocupação e passasse a ser{' '}
            <span className="text-[#D4AF37] font-medium">a sua maior ferramenta de poder?</span>{' '}
            Com a aplicação correta das proporções do Visagismo e da Natureza,{' '}
            <span className="text-zinc-100 font-semibold">isso é matemática, não mágica.</span>"
          </p>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent" />
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════════════ */
/*  4.  THE METHOD (A Solução)                                                */
/* ══════════════════════════════════════════════════════════════════════════ */

const steps = [
  {
    number: '01',
    phase: 'Preparação',
    title: 'A Escuta Ativa',
    description:
      'Entendemos sua rotina, personalidade e os traços que precisam ser valorizados. Sem pressa, sem suposições.',
  },
  {
    number: '02',
    phase: 'Transformação',
    title: 'A Engenharia',
    description:
      'Aplicação técnica de visagismo, geometria de corte e colorimetria — cada decisão é calculada para o seu rosto.',
  },
  {
    number: '03',
    phase: 'Manutenção',
    title: 'A Liberdade',
    description:
      'Você sai com a autoestima renovada e sabendo exatamente como cuidar da sua imagem todos os dias.',
  },
]

function MethodSection() {
  return (
    <section className="relative py-28 bg-zinc-900/30 border-t border-zinc-800/50 px-6 md:px-12 overflow-hidden">
      <AmbientGlow className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#4A3B6B] opacity-[0.06]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="text-center mb-20"
        >
          <GoldBadge>A Solução · O Método</GoldBadge>
          <h2 className="font-serif text-3xl md:text-5xl text-zinc-50 leading-tight">
            Conheça o{' '}
            <span className="text-[#D4AF37] italic">Método Drika</span>
            {' '}de Transformação.
          </h2>
        </motion.div>

        {/* Timeline / Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0 mb-24 relative"
        >
          {/* Connecting line (desktop) */}
          <div className="absolute top-10 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-[#D4AF37]/30 via-[#D4AF37]/60 to-[#D4AF37]/30 hidden md:block" />

          {steps.map(({ number, phase, title, description }, i) => (
            <motion.div
              key={number}
              variants={cardVariant}
              className="flex flex-col items-center text-center px-6 py-4 relative"
            >
              {/* Step number circle */}
              <div className="relative mb-6 flex items-center justify-center w-20 h-20 rounded-full border-2 border-[#D4AF37]/50 bg-zinc-950 z-10 shadow-[0_0_30px_rgba(212,175,55,0.15)]">
                <span className="font-serif text-2xl font-bold text-[#D4AF37]">{number}</span>
              </div>

              <span className="text-[#D4AF37]/70 text-xs tracking-[0.25em] uppercase font-semibold mb-2">
                {phase}
              </span>
              <h3 className="font-serif text-xl text-zinc-100 mb-3">{title}</h3>
              <p className="text-zinc-500 text-sm font-light leading-relaxed">{description}</p>

              {/* Mobile connector */}
              {i < steps.length - 1 && (
                <div className="md:hidden w-px h-10 bg-gradient-to-b from-[#D4AF37]/40 to-transparent mt-6" />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Founder Block */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="relative p-8 md:p-12 border border-[#D4AF37]/20 bg-[#D4AF37]/5 overflow-hidden"
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#D4AF37]/50" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#D4AF37]/50" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14 relative z-10">
            {/* Photo */}
            <div className="shrink-0 relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#D4AF37]/60 to-[#D4AF37]/10 blur-md" />
              <img
                src={drikaPhoto}
                alt="Adriana Santana — Drika, especialista em Visagismo"
                className="relative w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-2 border-[#D4AF37]/50 shadow-[0_0_40px_rgba(212,175,55,0.2)]"
              />
            </div>

            {/* Text */}
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                <div className="w-6 h-px bg-[#D4AF37]/60" />
                <span className="text-[#D4AF37] text-xs tracking-[0.25em] uppercase font-semibold">
                  Fundadora · Adriana Santana
                </span>
              </div>
              <p className="text-zinc-300 text-base md:text-lg font-light leading-relaxed italic mb-4">
                "Prazer, eu sou a Drika! Não sou apenas uma cabeleireira; meu trabalho é pautado
                no conhecimento técnico para garantir o resultado impecável que você merece.
                Se você busca uma profissional{' '}
                <span className="text-zinc-100 not-italic font-medium">
                  talentosa, dedicada e que realmente ouve o que você deseja
                </span>
                , você chegou ao lugar certo."
              </p>
              <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
                {['10+ Anos de Experiência', 'Visagismo Certificado', 'Atendimento Personalizado'].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 text-xs text-zinc-400 font-light"
                    >
                      <CheckCircle2 size={12} className="text-[#D4AF37]" />
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent" />
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════════════ */
/*  5.  FINAL CTA BLOCK                                                       */
/* ══════════════════════════════════════════════════════════════════════════ */

function FinalCTASection() {
  return (
    <section className="relative py-36 bg-zinc-950 overflow-hidden px-6 text-center">
      {/* Glows */}
      <AmbientGlow className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#4A3B6B] opacity-[0.09]" />
      <AmbientGlow className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] bg-[#D4AF37] opacity-[0.05]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={0}
        className="relative z-10 max-w-2xl mx-auto"
      >
        <SectionDivider />

        <h2 className="font-serif text-4xl md:text-6xl text-zinc-50 mt-10 mb-6 leading-tight">
          Pronta para encontrar{' '}
          <span className="text-[#D4AF37] italic">a sua melhor versão?</span>
        </h2>

        <p className="text-zinc-400 font-light leading-relaxed mb-12 text-base md:text-lg max-w-lg mx-auto">
          Dê o primeiro passo para alinhar{' '}
          <span className="text-zinc-200">quem você é por dentro</span> com o que você projeta
          por fora.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contato"
            id="final-cta-primary"
            className="inline-flex items-center gap-3 px-9 py-4 bg-[#D4AF37] text-zinc-950 font-bold text-sm tracking-widest uppercase rounded-sm transition-all duration-300 hover:bg-[#E8C95D] hover:shadow-[0_0_50px_rgba(212,175,55,0.45)] active:scale-95"
          >
            Agendar minha transformação agora
            <ArrowRight size={16} />
          </Link>
          <Link
            to="/servicos"
            id="final-cta-secondary"
            className="inline-flex items-center gap-3 px-8 py-4 border border-zinc-700 text-zinc-300 font-medium text-sm tracking-wide rounded-sm transition-all duration-300 hover:border-[#D4AF37]/50 hover:text-zinc-100"
          >
            Conhecer meus serviços em detalhe
          </Link>
        </div>
      </motion.div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════════════ */
/*  ROOT EXPORT                                                               */
/* ══════════════════════════════════════════════════════════════════════════ */

export default function Home() {
  return (
    <>
      <HeroSection />
      <PainSection />
      <OutcomeSection />
      <MethodSection />
      <FinalCTASection />
    </>
  )
}
