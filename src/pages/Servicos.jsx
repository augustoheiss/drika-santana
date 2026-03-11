import { motion } from 'framer-motion'
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
