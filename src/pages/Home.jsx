import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  Scissors,
  Palette,
  HeartHandshake,
  ShieldCheck,
  Lightbulb,
  Gem,
  ArrowRight,
  CheckCircle2,
  Star,
  Quote,
  Coffee,
  Heart,
  Smile,
  Compass,
} from 'lucide-react'
import drikaPhoto from '../assets/drikahair-02.jpg'
import FAQ from '../components/FAQ'
import Seo from '../components/Seo'

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
      text: 'Especialista em cabelos crespos, cacheados (Dry Cut) e ondulados.',
    },
    {
      icon: <Scissors size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />,
      text: 'Cortes de precisão geométrica (Chanel de bico, Long Bob) e barbearia clássica.',
    },
    {
      icon: <Palette size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />,
      text: 'Colorimetria segura com teste de mecha e diagnóstico visagista exclusivo.',
    },
  ]

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-zinc-950 px-6 text-center pt-20 pb-16">
      {/* Ambient glows */}
      <AmbientGlow className="top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#4A3B6B] opacity-10" />
      <AmbientGlow className="top-1/3 left-1/2 -translate-x-1/2 w-[320px] h-[320px] bg-[#D4AF37] opacity-[0.06]" />

      {/* Top and bottom decorative lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent" />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={cardVariant} className="mb-4">
          <GoldBadge>Studio de Embelezamento · Itaquera, Zona Leste</GoldBadge>
        </motion.div>

        {/* H1 */}
        <motion.h1
          variants={cardVariant}
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-zinc-50 mb-6"
          style={{ textShadow: '0 0 60px rgba(212,175,55,0.12)' }}
        >
          Realce a sua essência com{' '}
          <span className="text-[#D4AF37] italic">acolhimento, técnica</span>
          <br />e a ciência do{' '}
          <span className="text-[#D4AF37] italic">visagismo.</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={cardVariant}
          className="text-zinc-300 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-10"
        >
          Um espaço pensado para você se sentir ouvida e segura.{' '}
          Do corte à cor, criamos um visual que valoriza a sua identidade e{' '}
          <span className="text-zinc-100 font-medium">
            funciona de verdade na sua rotina do dia a dia.
          </span>
        </motion.p>

        {/* Bullets */}
        <motion.ul
          variants={stagger}
          className="inline-flex flex-col items-start gap-3.5 mb-12 text-left max-w-xl mx-auto"
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

        {/* CTAs */}
        <motion.div variants={cardVariant} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contato"
            id="hero-cta"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 bg-[#D4AF37] text-zinc-950 font-bold text-sm tracking-widest uppercase rounded-sm transition-all duration-300 hover:bg-[#E8C95D] hover:shadow-[0_0_50px_rgba(212,175,55,0.45)] active:scale-95"
          >
            Agendar Atendimento
            <ArrowRight size={16} />
          </Link>
          <Link
            to="/servicos"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-zinc-700 hover:border-[#D4AF37]/50 text-zinc-300 hover:text-zinc-100 font-medium text-sm tracking-wide rounded-sm transition-all duration-300"
          >
            Conhecer Serviços
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-[#D4AF37]/60 to-transparent mx-auto"
        />
      </motion.div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════════════ */
/*  2.  CURRENT PAIN (Empatia com as Dificuldades Diárias)                    */
/* ══════════════════════════════════════════════════════════════════════════ */

const empatheticPoints = [
  {
    icon: <HeartHandshake size={24} className="text-[#D4AF37]" />,
    title: 'A Falta de Escuta nos Salões',
    description:
      'A sensação frustrante de sentar na cadeira e sentir que o profissional cortou sem entender seu estilo de vida ou o que você realmente desejava.',
  },
  {
    icon: <Smile size={24} className="text-[#D4AF37]" />,
    title: 'A Batalha Diária em Casa',
    description:
      'Cabelos que ficam perfeitos na saída do salão, mas viram um desafio no dia seguinte porque o corte não respeitou a textura e o caimento natural.',
  },
  {
    icon: <ShieldCheck size={24} className="text-[#D4AF37]" />,
    title: 'O Receio da Tesoura e da Química',
    description:
      'Traumas de cortes que encolheram além do esperado ou procedimentos agressivos sem teste de mecha prévio que fragilizaram a saúde dos fios.',
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
          <GoldBadge>Acolhimento · Entendemos Você</GoldBadge>
          <h2 className="font-serif text-3xl md:text-5xl text-zinc-50 leading-tight">
            Você não precisa lutar contra o seu cabelo{' '}
            <span className="text-[#D4AF37] italic">todos os dias.</span>
          </h2>
        </motion.div>

        {/* Empathy cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14"
        >
          {empatheticPoints.map(({ icon, title, description }) => (
            <motion.div
              key={title}
              variants={cardVariant}
              className="group p-7 bg-zinc-900/50 border border-zinc-800 hover:border-[#D4AF37]/30 transition-all duration-300 flex flex-col gap-4 rounded-sm"
            >
              <div className="p-3 bg-zinc-950 border border-zinc-800 group-hover:border-[#D4AF37]/25 transition-colors inline-block w-fit">
                {icon}
              </div>
              <h3 className="font-serif text-lg text-zinc-100">{title}</h3>
              <p className="text-zinc-400 text-sm font-light leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Reassurance quote */}
        <motion.blockquote
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.2}
          className="relative border-l-2 border-[#D4AF37]/60 pl-8 py-4 max-w-3xl mx-auto bg-zinc-900/20"
        >
          <div className="absolute -left-px top-0 h-full w-px bg-gradient-to-b from-[#D4AF37]/60 via-[#D4AF37]/20 to-transparent" />
          <p className="text-zinc-300 text-base md:text-lg font-light leading-relaxed italic">
            "Cuidar do seu cabelo deve ser um momento de carinho e bem-estar, nunca de insegurança.{' '}
            <span className="text-zinc-100 not-italic font-medium">
              Quando unimos escuta genuína, técnica sólida e diagnóstico sincero,
            </span>{' '}
            o resultado harmoniza com o seu rosto e fica fácil de cuidar na sua rotina."
          </p>
        </motion.blockquote>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent" />
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════════════ */
/*  3.  FIRST VISIT JOURNEY (Sua Primeira Visita — O que esperar)             */
/* ══════════════════════════════════════════════════════════════════════════ */

const firstVisitSteps = [
  {
    step: '1',
    title: 'Boas-Vindas & Escuta Ativa',
    icon: <Coffee size={22} className="text-[#D4AF37]" />,
    description:
      'Uma recepção tranquila com um café ou água. Antes de pegar na tesoura, conversamos com calma sobre o seu dia a dia, histórico capilar e o que você deseja expressar.',
  },
  {
    step: '2',
    title: 'Diagnóstico & Teste de Mecha',
    icon: <Compass size={22} className="text-[#D4AF37]" />,
    description:
      'Avaliamos formato de rosto, curvatura natural, densidade e saúde dos fios. Para procedimentos de cor ou química, o teste de mecha prévio é inegociável.',
  },
  {
    step: '3',
    title: 'Execução Técnica & Biossegurança',
    icon: <ShieldCheck size={22} className="text-[#D4AF37]" />,
    description:
      'Técnicas especializadas — como Dry Cut a seco para cacheados e linhas precisas no Chanel ou barbearia — em um ambiente limpo com materiais esterilizados.',
  },
  {
    step: '4',
    title: 'Orientação Prática para Casa',
    icon: <Heart size={22} className="text-[#D4AF37]" />,
    description:
      'Você não sai cheia de dúvidas: mostramos na prática como lavar, secar e finalizar o seu cabelo para ter facilidade e autonomia na rotina diária.',
  },
]

function FirstVisitSection() {
  return (
    <section className="relative py-28 bg-zinc-900/20 border-t border-zinc-900 px-6 md:px-12 overflow-hidden">
      <AmbientGlow className="top-1/2 right-1/4 w-[450px] h-[350px] bg-[#D4AF37] opacity-[0.03]" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="text-center mb-16"
        >
          <GoldBadge>Transparência & Tranquilidade</GoldBadge>
          <h2 className="font-serif text-3xl md:text-5xl text-zinc-50 leading-tight">
            Sua primeira visita:{' '}
            <span className="text-[#D4AF37] italic">do acolhimento ao resultado.</span>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base font-light mt-4 max-w-2xl mx-auto">
            Sem surpresas ou ansiedade. Veja exatamente como cuidamos de você desde a sua chegada.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {firstVisitSteps.map(({ step, title, icon, description }) => (
            <motion.div
              key={step}
              variants={cardVariant}
              className="relative p-6 bg-zinc-950 border border-zinc-800/80 hover:border-[#D4AF37]/40 transition-all duration-300 rounded-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded">
                    {icon}
                  </div>
                  <span className="font-serif text-2xl font-bold text-[#D4AF37]/40">
                    0{step}
                  </span>
                </div>
                <h3 className="font-serif text-lg text-zinc-100 mb-2 leading-snug">{title}</h3>
                <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════════════ */
/*  4.  DESIRED OUTCOME (O Resultado Esperado)                                 */
/* ══════════════════════════════════════════════════════════════════════════ */

const outcomes = [
  {
    icon: <ShieldCheck size={28} className="text-zinc-950" />,
    title: 'Segurança & Autonomia',
    description:
      'Você sai com a certeza do que fica bem em você e sabendo exatamente como manter o visual impecável no dia a dia.',
  },
  {
    icon: <Lightbulb size={28} className="text-zinc-950" />,
    title: 'Praticidade Inteligente',
    description:
      'Um corte pensado para a sua rotina real, que tem caimento perfeito com o mínimo de esforço em casa.',
  },
  {
    icon: <Gem size={28} className="text-zinc-950" />,
    title: 'Identidade Revelada',
    description:
      'Seus traços naturais são valorizados com harmonia, comunicando a sua essência com leveza e elegância.',
  },
]

function OutcomeSection() {
  return (
    <section className="relative py-28 bg-zinc-950 border-t border-zinc-900 px-6 md:px-12 overflow-hidden">
      <AmbientGlow className="top-0 right-0 w-[500px] h-[400px] bg-[#D4AF37] opacity-[0.04]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="text-center mb-16"
        >
          <GoldBadge>A Transformação</GoldBadge>
          <h2 className="font-serif text-3xl md:text-5xl text-zinc-50 leading-tight">
            Sua imagem trabalhando{' '}
            <span className="text-[#D4AF37] italic">a favor do seu bem-estar.</span>
          </h2>
        </motion.div>

        {/* Outcome cards */}
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
              className="group relative p-7 bg-[#D4AF37]/5 border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 transition-all duration-400 flex flex-col gap-5 overflow-hidden rounded-sm"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
              <div className="p-3 bg-[#D4AF37] inline-block w-fit shadow-[0_0_20px_rgba(212,175,55,0.3)] rounded-sm">
                {icon}
              </div>
              <div>
                <h3 className="font-serif text-lg text-zinc-100 mb-2">{title}</h3>
                <p className="text-zinc-400 text-sm font-light leading-relaxed">{description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent" />
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════════════ */
/*  5.  THE METHOD & FOUNDER                                                  */
/* ══════════════════════════════════════════════════════════════════════════ */

const steps = [
  {
    number: '01',
    phase: 'Escuta',
    title: 'Acolhimento Sincero',
    description:
      'Entendemos sua rotina, personalidade e os traços que precisam ser valorizados. Sem pressa, sem julgamentos.',
  },
  {
    number: '02',
    phase: 'Técnica',
    title: 'Visagismo & Geometria',
    description:
      'Aplicação técnica de visagismo, geometria de corte e colorimetria — cada detalhe planejado para o seu rosto e fio.',
  },
  {
    number: '03',
    phase: 'Autonomia',
    title: 'Liberdade no Dia a Dia',
    description:
      'Você sai com a autoestima renovada e sabendo exatamente como cuidar e finalizar seu cabelo em casa.',
  },
]

function MethodSection() {
  return (
    <section className="relative py-28 bg-zinc-900/30 border-t border-zinc-800/50 px-6 md:px-12 overflow-hidden">
      <AmbientGlow className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#4A3B6B] opacity-[0.06]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="text-center mb-20"
        >
          <GoldBadge>O Método Drika</GoldBadge>
          <h2 className="font-serif text-3xl md:text-5xl text-zinc-50 leading-tight">
            Ciência capilar e{' '}
            <span className="text-[#D4AF37] italic">cuidado humano</span>
            {' '}em cada detalhe.
          </h2>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-24 relative"
        >
          <div className="absolute top-10 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-[#D4AF37]/30 via-[#D4AF37]/60 to-[#D4AF37]/30 hidden md:block" />

          {steps.map(({ number, phase, title, description }, i) => (
            <motion.div
              key={number}
              variants={cardVariant}
              className="flex flex-col items-center text-center px-6 py-4 relative"
            >
              <div className="relative mb-6 flex items-center justify-center w-20 h-20 rounded-full border-2 border-[#D4AF37]/50 bg-zinc-950 z-10 shadow-[0_0_30px_rgba(212,175,55,0.15)]">
                <span className="font-serif text-2xl font-bold text-[#D4AF37]">{number}</span>
              </div>

              <span className="text-[#D4AF37]/80 text-xs tracking-[0.25em] uppercase font-semibold mb-2">
                {phase}
              </span>
              <h3 className="font-serif text-xl text-zinc-100 mb-3">{title}</h3>
              <p className="text-zinc-400 text-sm font-light leading-relaxed">{description}</p>

              {i < steps.length - 1 && (
                <div className="md:hidden w-px h-10 bg-gradient-to-b from-[#D4AF37]/40 to-transparent mt-6" />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Founder Bio Block */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="relative p-8 md:p-12 border border-[#D4AF37]/20 bg-[#D4AF37]/5 overflow-hidden rounded-sm"
        >
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#D4AF37]/50" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#D4AF37]/50" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14 relative z-10">
            <div className="shrink-0 relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#D4AF37]/60 to-[#D4AF37]/10 blur-md" />
              <img
                src={drikaPhoto}
                alt="Adriana Santana — Drika, especialista em Visagismo e cortes"
                className="relative w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-2 border-[#D4AF37]/50 shadow-[0_0_40px_rgba(212,175,55,0.2)]"
              />
            </div>

            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                <div className="w-6 h-px bg-[#D4AF37]/60" />
                <span className="text-[#D4AF37] text-xs tracking-[0.25em] uppercase font-semibold">
                  Adriana Santana · Fundadora & Especialista
                </span>
              </div>
              <p className="text-zinc-200 text-base md:text-lg font-light leading-relaxed italic mb-4">
                "Prazer, eu sou a Drika! Meu trabalho é pautado no carinho de ouvir com calma o que você deseja e na precisão técnica para garantir o resultado que você merece. Aqui você é acolhida com respeito à sua história e ao seu tempo."
              </p>
              <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
                {[
                  '10+ Anos de Dedicação',
                  'Visagismo & Dry Cut',
                  'Biossegurança Esterilizada',
                  'Atención en español',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 text-xs text-zinc-300 font-light"
                  >
                    <CheckCircle2 size={13} className="text-[#D4AF37]" />
                    {tag}
                  </span>
                ))}
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
/*  6.  FEATURED REVIEWS / SOCIAL PROOF                                       */
/* ══════════════════════════════════════════════════════════════════════════ */

const featuredReviews = [
  {
    name: 'Vitoria Velozo',
    service: 'Transição Capilar & Cachos',
    text: 'Tive uma excelente experiência com a Drika! Muito atenciosa, fui fazer um corte para sair da transição capilar e voltar aos meus cachinhos. Ela escutou tudo o que eu precisava e fez o melhor corte para esse momento. Me fez sentir muito mais linda.',
  },
  {
    name: 'Luciana Nunes',
    service: 'Recuperação & Corte Visagista',
    text: 'Tive um problema de saúde e precisei me desfazer do cabelo longo. A Drika me acolheu, fez um corte moderno dentro do possível e hoje meu cabelo está forte e cheio de vida. Amei e indico o trabalho dela, muito habilidosa.',
  },
  {
    name: 'Bruna Nicácio',
    service: 'Corte & Tratamento',
    text: 'Profissional atenciosa, cuidadosa e muito dedicada. Sempre entende o que eu quero e deixa meu cabelo impecável, saudável e com acabamento perfeito. O atendimento é incrível, me sinto super acolhida.',
  },
]

function FeaturedReviewsSection() {
  return (
    <section className="relative py-28 bg-zinc-950 border-t border-zinc-900 px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="text-center mb-16"
        >
          <GoldBadge>Google 5.0 ★ · Clientes Reais</GoldBadge>
          <h2 className="font-serif text-3xl md:text-5xl text-zinc-50 leading-tight">
            Histórias de quem encontrou{' '}
            <span className="text-[#D4AF37] italic">acolhimento e autoestima.</span>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base font-light mt-3 max-w-xl mx-auto">
            Avaliações 100% autênticas registradas por quem senta na cadeira da Drika.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {featuredReviews.map((rev) => (
            <motion.div
              key={rev.name}
              variants={cardVariant}
              className="p-7 bg-zinc-900/60 border border-zinc-800 hover:border-[#D4AF37]/40 transition-all duration-300 rounded-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#D4AF37]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={15} className="fill-[#D4AF37]" />
                    ))}
                  </div>
                  <Quote size={20} className="text-[#D4AF37]/20" />
                </div>
                <p className="text-zinc-300 text-sm italic font-light leading-relaxed mb-6">
                  "{rev.text}"
                </p>
              </div>

              <div className="border-t border-zinc-800/80 pt-4">
                <p className="font-serif text-zinc-100 font-medium text-sm">{rev.name}</p>
                <p className="text-zinc-500 text-xs font-light mt-0.5">{rev.service}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center">
          <Link
            to="/avaliacoes"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#D4AF37] hover:text-[#E8C95D] font-semibold transition-colors"
          >
            Ver todas as avaliações no Google
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════════════ */
/*  7.  FINAL CTA BLOCK                                                       */
/* ══════════════════════════════════════════════════════════════════════════ */

function FinalCTASection() {
  return (
    <section className="relative py-32 bg-zinc-950 overflow-hidden px-6 text-center border-t border-zinc-900">
      <AmbientGlow className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#4A3B6B] opacity-[0.09]" />
      <AmbientGlow className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] bg-[#D4AF37] opacity-[0.05]" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={0}
        className="relative z-10 max-w-2xl mx-auto"
      >
        <SectionDivider />

        <h2 className="font-serif text-3xl md:text-5xl text-zinc-50 mt-8 mb-5 leading-tight">
          Pronta(o) para viver essa{' '}
          <span className="text-[#D4AF37] italic">transformação com acolhimento?</span>
        </h2>

        <p className="text-zinc-300 font-light leading-relaxed mb-10 text-base md:text-lg max-w-lg mx-auto">
          Reserve o seu horário e venha conversar com a Drika. Sem pressa, com diagnóstico personalizado e respeito ao seu cabelo.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contato"
            id="final-cta-primary"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 bg-[#D4AF37] text-zinc-950 font-bold text-sm tracking-widest uppercase rounded-sm transition-all duration-300 hover:bg-[#E8C95D] hover:shadow-[0_0_50px_rgba(212,175,55,0.45)] active:scale-95"
          >
            Agendar Atendimento Agora
            <ArrowRight size={16} />
          </Link>
          <Link
            to="/servicos"
            id="final-cta-secondary"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 border border-zinc-700 text-zinc-300 font-medium text-sm tracking-wide rounded-sm transition-all duration-300 hover:border-[#D4AF37]/50 hover:text-zinc-100"
          >
            Ver Tabela de Serviços
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
      <Seo
        title="Drika Santana — Studio de Embelezamento em Itaquera"
        description="Studio de Embelezamento em Itaquera. Visagismo, acolhimento, especialista em crespos e cacheados (Dry Cut), cortes geométricos, barbearia e colorimetria avançada."
        canonicalUrl="https://drikasantana.vercel.app/"
      />
      <HeroSection />
      <PainSection />
      <FirstVisitSection />
      <OutcomeSection />
      <MethodSection />
      <FeaturedReviewsSection />
      <FAQ className="bg-zinc-900/20 border-t border-zinc-900" />
      <FinalCTASection />
    </>
  )
}
