import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Scissors,
  Droplets,
  Palette,
  Sparkles,
  User,
  Zap,
  Star,
  Feather,
  ArrowRight,
  Wand2,
  Volume2,
  VolumeX,
} from 'lucide-react'
import Media from '../components/Media'
import VisagismImpact from '../components/VisagismImpact'

const categories = [
  {
    id: 'cabelo',
    label: 'Cabelo',
    headline: 'Cortes, Color & Tratamentos',
    description: 'Arte e ciência aplicadas ao seu fio — do diagnóstico ao resultado final.',
    services: [
      {
        icon: <Scissors className="w-5 h-5 text-[#D4AF37]" />,
        title: 'Visagismo Prático & Cortes',
        description:
          'Cortes unissex projetados para o seu formato de rosto e rotina. O fim do "achismo" na cadeira do salão.',
      },
      {
        icon: <User className="w-5 h-5 text-[#D4AF37]" />,
        title: 'Crespos & Cacheados (Dry Cut)',
        description:
          'Respeito à estrutura espiralada e ao fator de encolhimento. Lavamos e secamos para avaliar o caimento natural, esculpindo o corte a seco.',
      },
      {
        icon: <Wand2 className="w-5 h-5 text-[#D4AF37]" />,
        title: 'Design de Cortes — Chanel e Long Bob',
        description:
          'Especialidade em Chanel de bico e Long Bob com precisão editorial e baixa manutenção para o dia a dia.',
      },
      {
        icon: <Palette className="w-5 h-5 text-[#D4AF37]" />,
        title: 'Alquimia da Colorimetria',
        description:
          'Mechas, iluminação e coloração global com foco em saúde capilar e resultados de baixa manutenção.',
      },
      {
        icon: <Droplets className="w-5 h-5 text-[#D4AF37]" />,
        title: 'Tratamentos de Alta Performance',
        description:
          'Cronogramas capilares avançados, reconstrução e hidratação profunda para resgatar a vitalidade do fio.',
      },
      {
        icon: <Sparkles className="w-5 h-5 text-[#D4AF37]" />,
        title: 'Penteados e Estilização',
        description:
          'Design de penteados para eventos, unindo fixação, elegância e respeito à estrutura do seu cabelo.',
      },
    ],
  },
  {
    id: 'barba',
    label: 'Barba',
    headline: 'Barbearia Clássica',
    description: 'Tradição e precisão para uma imagem impecável e atemporal.',
    services: [
      {
        icon: <Zap className="w-5 h-5 text-[#D4AF37]" />,
        title: 'Barbearia Clássica',
        description:
          'Design de barba e cortes masculinos alinhados à sua identidade visual e imagem profissional.',
      },
    ],
  },
  {
    id: 'rosto',
    label: 'Rosto',
    headline: 'Design de Sobrancelhas',
    description: 'Emolduramento do olhar que respeita a anatomia e a simetria natural do seu rosto.',
    services: [
      {
        icon: <Feather className="w-5 h-5 text-[#D4AF37]" />,
        title: 'Design de Sobrancelhas',
        description:
          'Técnicas que respeitam a simetria e a naturalidade do seu rosto, sem exageros — apenas valorização.',
      },
    ],
  },
  {
    id: 'unhas',
    label: 'Unhas',
    headline: 'Nail Care Premium',
    description: 'Cuidado rigoroso com biossegurança e acabamento impecável para mãos e pés.',
    services: [
      {
        icon: <Star className="w-5 h-5 text-[#D4AF37]" />,
        title: 'Manicure Premium',
        description:
          'Arte e saúde biômica para suas mãos e pés. Biossegurança rigorosa e acabamento de nível editorial.',
      },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
}

function ServiceCard({ service }) {
  return (
    <motion.div
      variants={itemVariants}
      className="group relative p-7 border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/80 hover:border-[#D4AF37]/40 transition-all duration-300 flex flex-col"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/0 to-transparent group-hover:via-[#D4AF37]/20 transition-all duration-500" />
      <div className="mb-5 p-3.5 bg-zinc-950 inline-block border border-zinc-800 group-hover:border-[#D4AF37]/30 transition-colors">
        {service.icon}
      </div>
      <h4 className="font-serif text-lg text-zinc-100 mb-2 leading-snug">{service.title}</h4>
      <p className="text-zinc-500 text-sm leading-relaxed font-light flex-1">{service.description}</p>
      <Link
        to="/contato"
        className="mt-5 inline-flex items-center gap-1.5 text-[#D4AF37] text-xs tracking-widest uppercase font-semibold hover:gap-2.5 transition-all duration-200"
      >
        Agendar este serviço
        <ArrowRight size={13} />
      </Link>
    </motion.div>
  )
}

// ── Video Gallery ──────────────────────────────────────────────────────────

const videos = [
  'drika-bio.mp4',
  'Corte moderno - A transição capilar traz leveza e novo estilo. Este é o segundo corte que fizemo.mp4',
  'Progressiva + Corte com Franja = O combo da perfeição!Dá para ver a felicidade no olhar, né Cabe.mp4',
  'Muita gente pergunta como é o Drika Hair, e hoje abro as portas para vocês conhecerem cada detal.mp4',
  'snapinsta.com.br-69d3fa08c5a47.mp4',
  'snapinsta.com.br-69d3fa9e36272.mp4',
  'snapinsta.com.br-69d3fac3d2e73.mp4',
  'snapinsta.com.br-69d3fad50f349.mp4',
  'snapinsta.com.br-69d3faea5541f.mp4',
  'snapinsta.com.br-69d3faf6ccc95.mp4',
  'snapinsta.com.br-69d3fb1857324.mp4',
  'snapinsta.com.br-69d3fb4948347.mp4',
  'snapinsta.com.br-69d3fbb13656c.mp4',
]

// Detect touch/hover-incapable devices once (outside component = stable ref)
const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: none)').matches

function VideoCard({ src, index }) {
  const videoRef = useRef(null)
  const cardRef  = useRef(null)
  const isTouch  = useRef(isTouchDevice())   // stable across re-renders

  const [isMuted,   setIsMuted]   = useState(true)
  const [isActive,  setIsActive]  = useState(false)

  // ── 1. Desktop hover (mouse only) ────────────────────────────────────────
  const handleMouseEnter = () => {
    if (isTouch.current) return          // skip on touch devices
    setIsActive(true)
    videoRef.current?.play().catch(() => {})
  }

  const handleMouseLeave = () => {
    if (isTouch.current) return
    setIsActive(false)
    videoRef.current?.pause()
  }

  // ── 2. Mobile: IntersectionObserver auto-play ─────────────────────────────
  useEffect(() => {
    // Only attach observer on touch devices — desktop uses hover
    if (!isTouch.current) return

    const el = cardRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true)
          videoRef.current?.play().catch(() => {})
        } else {
          setIsActive(false)
          videoRef.current?.pause()
        }
      },
      { threshold: 0.5 }  // 50% visible triggers play (Instagram-style)
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // ── 3. Keep video.muted DOM attr in sync (React prop is not reactive) ─────
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = isMuted
  }, [isMuted])

  const handleVolumeToggle = (e) => {
    e.stopPropagation()
    setIsMuted((prev) => !prev)
  }

  // ── Derived visual classes (state-driven, works on both desktop + mobile) ─
  const videoClass = `
    absolute inset-0 w-full h-full object-cover
    transition-all duration-500
    ${isActive ? 'grayscale-0 brightness-100' : 'grayscale brightness-50'}
  `
  const playOverlayClass = `
    absolute inset-0 flex items-center justify-center
    transition-opacity duration-300 z-10 pointer-events-none
    ${isActive ? 'opacity-0' : 'opacity-60'}
  `
  const goldLineClass = `
    absolute inset-x-0 top-0 h-[2px]
    bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent
    transition-opacity duration-500 z-10
    ${isActive ? 'opacity-100' : 'opacity-0'}
  `
  const labelClass = `
    absolute bottom-0 inset-x-0 py-2.5 px-3
    bg-gradient-to-t from-zinc-950/90 to-transparent
    text-[10px] tracking-[0.18em] uppercase
    transition-colors duration-300 z-10
    ${isActive ? 'text-[#D4AF37]' : 'text-[#D4AF37]/70'}
  `
  const volumeBtnClass = `
    absolute bottom-10 right-2 z-20
    flex items-center justify-center
    w-8 h-8 rounded-full
    bg-zinc-950/70 backdrop-blur-sm
    border border-zinc-700/60 text-zinc-100
    transition-all duration-200
    hover:bg-zinc-800/90 hover:border-[#D4AF37]/50 hover:text-[#D4AF37]
    active:scale-90
    ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}
  `

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-sm border border-zinc-800 bg-zinc-900 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Gold accent line — state-driven (works on desktop + mobile) */}
      <div className={goldLineClass} />

      {/* Scale wrapper — Framer Motion handles desktop scale; on mobile we
          use a CSS class so the effect is also visible without hover */}
      <motion.div
        className="relative w-full aspect-[9/16] overflow-hidden"
        animate={{ scale: isActive ? 1.03 : 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <video
          ref={videoRef}
          src={`/videos/${src}`}
          muted
          loop
          playsInline
          preload="metadata"
          className={videoClass}
        />

        {/* Play icon overlay — hides when active */}
        <div className={playOverlayClass}>
          <div className="w-12 h-12 rounded-full border border-[#D4AF37]/60 bg-zinc-950/60 flex items-center justify-center">
            <svg className="w-5 h-5 text-[#D4AF37] translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Mute/Unmute button — appears when isActive */}
        <button
          onClick={handleVolumeToggle}
          aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
          className={volumeBtnClass}
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
      </motion.div>

      {/* Bottom label */}
      <div className={labelClass}>
        Transformação #{index + 1}
      </div>
    </motion.div>
  )
}

function VideoGallery() {
  return (
    <section className="py-24 px-6 md:px-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#D4AF37]/60" />
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-semibold">
              Galeria em Movimento
            </span>
          </div>

          <h2 className="font-serif text-3xl md:text-5xl text-zinc-50 leading-tight mb-6">
            A Engenharia em Movimento:{' '}
            <span className="text-[#D4AF37] italic">
              Onde a Técnica Encontra a Identidade.
            </span>
          </h2>

          <p className="text-zinc-400 text-base md:text-lg font-light leading-relaxed max-w-2xl">
            O visagismo e a beleza não são estáticos; eles ganham vida no movimento, na textura,
            no caimento e na luz. O que você vê abaixo não são apenas resultados capilares, são{' '}
            <span className="text-zinc-200 font-normal">resgates de identidade</span>. Cada frame
            é a prova visual de que, com a técnica correta, a sua imagem se torna a sua maior aliada.{' '}
            <span className="text-[#D4AF37]/80">Passe o mouse para testemunhar a transformação.</span>
          </p>
        </motion.div>

        {/* Video grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
          {videos.map((src, i) => (
            <VideoCard key={src} src={src} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Servicos() {
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
            Menu de Serviços
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-zinc-50 leading-tight">
            Nosso <span className="text-[#D4AF37] italic">Menu de Serviços</span>
          </h1>
          <p className="text-zinc-400 text-lg font-light mt-5 leading-relaxed max-w-xl mx-auto">
            Tratamentos e execuções baseados na realidade do seu dia a dia — durabilidade, saúde e estética de excelência.
          </p>
        </motion.div>
      </section>

      {/* ── Categories ── */}
      {categories.map((cat, catIndex) => (
        <section
          key={cat.id}
          className={`py-20 px-6 md:px-12 ${catIndex > 0 ? 'border-t border-zinc-900' : ''}`}
        >
          <div className="max-w-7xl mx-auto">

            {/* Category header */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-px bg-[#D4AF37]/60" />
                  <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-semibold">{cat.label}</span>
                </div>
                <h2 className="font-serif text-2xl md:text-4xl text-zinc-50 leading-tight">{cat.headline}</h2>
                <p className="text-zinc-500 text-sm font-light mt-2 max-w-lg">{cat.description}</p>
              </div>
            </motion.div>

            {/* Service cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`grid gap-5 ${
                cat.services.length === 1
                  ? 'grid-cols-1 md:grid-cols-2 lg:w-2/3'
                  : cat.services.length === 2
                  ? 'grid-cols-1 md:grid-cols-2'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {cat.services.map((service) => (
                <ServiceCard key={service.title} service={service} />
              ))}
            </motion.div>
          </div>
        </section>
      ))}

      {/* ── Video Gallery ── */}
      <VideoGallery />

      {/* ── Visagism Impact ── */}
      <VisagismImpact />

      {/* ── Booking CTA ── */}
      <section className="py-20 px-6 bg-zinc-900/30 border-t border-zinc-900 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-xl mx-auto"
        >
          <h2 className="font-serif text-2xl md:text-4xl text-zinc-50 mb-4 leading-tight">
            Encontrou o serviço<br />
            <span className="text-[#D4AF37] italic">ideal para você?</span>
          </h2>
          <p className="text-zinc-500 text-sm font-light mb-8">
            Reserve seu atendimento agora. O diagnóstico é exclusivo e personalizado.
          </p>
          <Link
            to="/contato"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#D4AF37] text-zinc-950 font-semibold text-sm tracking-widest uppercase rounded-sm transition-all duration-300 hover:bg-[#E8C95D] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] active:scale-95"
          >
            Agendar Agora
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>

      {/* ── Masterclasses & Podcasts ── */}
      <Media />
    </div>
  )
}
