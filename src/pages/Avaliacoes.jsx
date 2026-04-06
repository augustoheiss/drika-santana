import { motion } from 'framer-motion'
import { Star, ExternalLink, Quote } from 'lucide-react'

// ── Data ──────────────────────────────────────────────────────────────────────

const reviews = [
  {
    id: 1,
    name: 'Vitoria Velozo',
    text: 'Tive uma excelente experiência com a Drika, muito atenciosa, fui fazer um corte para sair da transição capilar e voltar aos meus cachinhos e a Drika foi muito atenciosa em me escutar e fazer o melhor corte pra esse momento! Me fez sentir muito mais linda.',
  },
  {
    id: 2,
    name: 'Luciana Nunes',
    text: 'Eu tive um problema de saúde e fui obrigada a desfazer do meu cabelo longo, a Drica me ajudou a fazer um corte dentro do possível, estava fraco sem vida e ela fez um corte moderno e ficou lindo, hoje mais forte. Amei e indico o trabalho dela, muito habilidosa.',
  },
  {
    id: 3,
    name: 'Bruna Nicácio',
    text: 'Minha cabeleireira é maravilhosa! Profissional atenciosa, cuidadosa e muito dedicada. Sempre entende o que eu quero e deixa meu cabelo impecável, saudável e com acabamento perfeito. O atendimento é incrível, me sinto super acolhida.',
  },
  {
    id: 4,
    name: 'Hernani Rocha',
    text: 'Recomendo demais a Adriana! Ela é uma profissional de primeira linha, super competente e com uma flexibilidade que faz toda a diferença. O atendimento que recebi foi impecável, realmente nota 1000.',
  },
  {
    id: 5,
    name: 'Rachel Neres',
    text: 'Muito satisfeita. Gostei porque transmite confiança através do vasto conhecimento e dedicação quanto ao que faz. Amei o resultado.',
  },
  {
    id: 6,
    name: 'Josiane Oliveira',
    text: 'O corte ficou ótimo, deu mais leveza no meu cabelo, e a finalização ficou excelente e sem contar que durou mais dias do que o normal. O resultado final ficou exatamente como eu queria.',
  },
  {
    id: 7,
    name: 'Fernanda Santana',
    text: 'Excelente profissional, é a única que deixa minha sobrancelha impecável e do jeito que eu gosto.',
  },
  {
    id: 8,
    name: 'Liliane Azevedo',
    text: 'Excelente profissional. Muito caprichosa e domina muito bem as técnicas.',
  },
  {
    id: 9,
    name: 'Genilza Fernandes',
    text: 'Uma experiência maravilhosa, sair com o meu cabelo maravilhoso. Durmo e acordo bonita. Quando voltar da Bahia irei voltar a este salão com certeza.',
  },
  {
    id: 10,
    name: 'Vagner Carvalho',
    text: 'Atendimento gentil e pontual, tudo muito limpo, organizado e esterilizado.',
  },
]

// ── Sub-components ────────────────────────────────────────────────────────────

function StarRating() {
  return (
    <div className="flex items-center gap-1 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={15}
          className="text-yellow-500 fill-yellow-500"
        />
      ))}
    </div>
  )
}

function ReviewCard({ review, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: 'easeOut' }}
      className="group relative flex flex-col p-7 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-[#D4AF37]/35 hover:bg-zinc-900/90 transition-all duration-400 break-inside-avoid"
    >
      {/* Gold top accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/0 to-transparent group-hover:via-[#D4AF37]/40 transition-all duration-500 rounded-t-lg" />

      {/* Quote icon */}
      <Quote
        size={28}
        className="text-[#D4AF37]/20 group-hover:text-[#D4AF37]/40 transition-colors duration-300 mb-3 -scale-x-100"
      />

      {/* Stars */}
      <StarRating />

      {/* Review text */}
      <p className="text-zinc-300 text-sm leading-relaxed italic font-light flex-1 mb-6">
        "{review.text}"
      </p>

      {/* Footer: name + Google badge */}
      <div className="flex items-center justify-between gap-3 pt-4 border-t border-zinc-800">
        <div>
          <p className="text-zinc-100 text-sm font-semibold leading-none mb-1">
            {review.name}
          </p>
        </div>
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-[10px] tracking-wider uppercase text-zinc-400 font-medium whitespace-nowrap">
          {/* Google "G" SVG */}
          <svg viewBox="0 0 24 24" className="w-3 h-3 shrink-0" fill="none">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google Review
        </span>
      </div>
    </motion.article>
  )
}

// ── Stats bar ─────────────────────────────────────────────────────────────────

function StatsBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12"
    >
      {[
        { value: '10+', label: 'Avaliações verificadas' },
        { value: '5.0', label: 'Média no Google' },
        { value: '100%', label: 'Satisfação dos clientes' },
      ].map(({ value, label }) => (
        <div key={label} className="text-center">
          <p className="font-serif text-3xl md:text-4xl text-[#D4AF37] leading-none mb-1">
            {value}
          </p>
          <p className="text-zinc-500 text-xs tracking-widest uppercase">{label}</p>
        </div>
      ))}
    </motion.div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function Avaliacoes() {
  return (
    <div className="bg-zinc-950 min-h-screen pt-16">

      {/* ── Hero ── */}
      <section className="relative py-24 px-6 border-b border-zinc-900 overflow-hidden text-center">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-yellow-500 opacity-[0.04] blur-[120px]" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-xs tracking-[0.25em] uppercase text-[#D4AF37] font-medium mb-7">
            <Star size={11} className="fill-[#D4AF37] text-[#D4AF37]" />
            Avaliações Reais · Google
          </span>

          <h1 className="font-serif text-4xl md:text-6xl text-zinc-50 leading-tight mb-5">
            A Prova Real da{' '}
            <span className="text-[#D4AF37] italic">Nossa Excelência.</span>
          </h1>

          <p className="text-zinc-400 text-lg font-light leading-relaxed max-w-xl mx-auto">
            O que dizem sobre a experiência Drika — palavras genuínas de quem viveu a transformação.
          </p>

          <StatsBar />
        </motion.div>
      </section>

      {/* ── Reviews Grid ── */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Masonry-style: CSS columns */}
          <div
            className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5"
          >
            {reviews.map((review, i) => (
              <ReviewCard key={review.id} review={review} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 bg-zinc-900/30 border-t border-zinc-900 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-xl mx-auto"
        >
          {/* Stars decoration */}
          <div className="flex justify-center gap-1.5 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={20} className="text-yellow-500 fill-yellow-500" />
            ))}
          </div>

          <h2 className="font-serif text-2xl md:text-4xl text-zinc-50 mb-4 leading-tight">
            Já transformou o seu visual{' '}
            <span className="text-[#D4AF37] italic">comigo?</span>
          </h2>

          <p className="text-zinc-500 text-sm font-light mb-8 leading-relaxed">
            Sua opinião é fundamental para continuarmos entregando o mais alto padrão de excelência.
          </p>

          <a
            href="https://share.google/mA1VbRcijlJyQr5f7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#D4AF37] text-zinc-950 font-semibold text-sm tracking-widest uppercase rounded-sm transition-all duration-300 hover:bg-[#E8C95D] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] active:scale-95"
          >
            Fazer uma avaliação no Google
            <ExternalLink size={15} />
          </a>
        </motion.div>
      </section>

    </div>
  )
}
