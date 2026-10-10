import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  BookOpen,
  Search,
  Sparkles,
  ChevronDown,
  Clock,
  Lightbulb,
  ArrowRight,
  Bookmark,
  HelpCircle,
  Scissors,
  Droplets,
  Shield,
  Moon,
} from 'lucide-react'
import { categoriasGuia, guias, glossarioCapilar, dicasRapidas } from '../content/guias'
import Media from '../components/Media'
import Seo from '../components/Seo'

const iconMap = {
  Moon: <Moon size={20} className="text-[#D4AF37]" />,
  Droplets: <Droplets size={20} className="text-[#D4AF37]" />,
  Scissors: <Scissors size={20} className="text-[#D4AF37]" />,
  Shield: <Shield size={20} className="text-[#D4AF37]" />,
}

export default function Aprenda() {
  const [selectedCategory, setSelectedCategory] = useState('todos')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedGuideId, setExpandedGuideId] = useState(null)

  // Filter guides based on category and search query
  const filteredGuias = useMemo(() => {
    return guias.filter((guia) => {
      const matchesCategory =
        selectedCategory === 'todos' || guia.categoria === selectedCategory
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !query ||
        guia.titulo.toLowerCase().includes(query) ||
        guia.resumo.toLowerCase().includes(query) ||
        guia.passos.some(
          (p) =>
            p.titulo.toLowerCase().includes(query) ||
            p.descricao.toLowerCase().includes(query)
        )
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  // Filter glossary based on search query
  const filteredGlossario = useMemo(() => {
    if (!searchQuery.trim()) return glossarioCapilar
    const query = searchQuery.toLowerCase().trim()
    return glossarioCapilar.filter(
      (item) =>
        item.termo.toLowerCase().includes(query) ||
        item.definicao.toLowerCase().includes(query)
    )
  }, [searchQuery])

  const toggleGuide = (id) => {
    setExpandedGuideId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="bg-zinc-950 min-h-screen pt-20">
      <Seo
        title="Aprenda com a Drika — Guias e Autocuidado Capilar"
        description="Aprenda a cuidar do seu cabelo com autonomia: guias para crespos e cacheados, cortes geométricos, rotina de day after, teste de mecha e glossário capilar."
        canonicalUrl="https://drikasantana.vercel.app/aprenda"
      />
      {/* ── Page Header ── */}
      <section className="relative py-20 px-6 border-b border-zinc-900 overflow-hidden text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-[#4A3B6B] opacity-[0.09] blur-[120px]" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] h-[250px] rounded-full bg-[#D4AF37] opacity-[0.05] blur-[90px]" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-xs tracking-[0.25em] uppercase text-[#D4AF37] font-semibold mb-6">
            <BookOpen size={13} className="text-[#D4AF37]" />
            Hub de Aprendizado & Autonomia
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-zinc-50 leading-tight mb-6">
            Aprenda com a{' '}
            <span className="text-[#D4AF37] italic">Drika.</span>
          </h1>

          <p className="text-zinc-300 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Acreditamos que o conhecimento liberta. Aqui você encontra guias práticos,
            explicações técnicas sem complicação e o passo a passo para cuidar do seu
            cabelo com carinho e independência em casa.
          </p>
        </motion.div>
      </section>

      {/* ── Quick Tips Bar ── */}
      <section className="py-10 px-6 border-b border-zinc-900 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dicasRapidas.map((dica) => (
              <div
                key={dica.titulo}
                className="flex items-start gap-3.5 p-4 rounded-sm bg-zinc-950/70 border border-zinc-800/80"
              >
                <div className="p-2 bg-zinc-900 border border-zinc-800 rounded shrink-0">
                  {iconMap[dica.icone]}
                </div>
                <div>
                  <h4 className="font-serif text-zinc-100 text-sm font-medium mb-1">
                    {dica.titulo}
                  </h4>
                  <p className="text-zinc-400 text-xs font-light leading-relaxed">
                    {dica.texto}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Content Area ── */}
      <section className="py-16 px-6 md:px-12 max-w-6xl mx-auto">
        {/* Search & Categories Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categoriasGuia.map((cat) => {
              const active = selectedCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs tracking-wider uppercase transition-all duration-300 font-medium ${
                    active
                      ? 'bg-[#D4AF37] text-zinc-950 shadow-[0_0_20px_rgba(212,175,55,0.3)] font-semibold'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700'
                  }`}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar guia ou termo..."
              className="w-full pl-10 pr-4 py-2 bg-zinc-900/90 border border-zinc-800 rounded-full text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]/60 transition-colors"
            />
          </div>
        </div>

        {/* ── Guides Section ── */}
        {selectedCategory !== 'glossario' && (
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles size={18} className="text-[#D4AF37]" />
              <h2 className="font-serif text-2xl text-zinc-100">
                Guias Práticos & Rotinas de Cuidado
              </h2>
            </div>

            {filteredGuias.length === 0 ? (
              <div className="p-10 text-center bg-zinc-900/30 border border-zinc-800/80 rounded-sm">
                <HelpCircle size={32} className="mx-auto text-zinc-500 mb-3" />
                <p className="text-zinc-300 text-sm font-light">
                  Nenhum guia encontrado para a busca "{searchQuery}".
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('todos')
                  }}
                  className="mt-4 text-xs text-[#D4AF37] hover:underline"
                >
                  Limpar filtros de busca
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                {filteredGuias.map((guia) => {
                  const isExpanded = expandedGuideId === guia.id

                  return (
                    <motion.article
                      key={guia.id}
                      layout
                      className="border border-zinc-800 bg-zinc-900/40 rounded-sm overflow-hidden hover:border-zinc-700 transition-colors"
                    >
                      <button
                        onClick={() => toggleGuide(guia.id)}
                        className="w-full text-left p-6 md:p-8 flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                      >
                        <div className="flex-1 pr-4">
                          <div className="flex flex-wrap items-center gap-3 mb-2.5">
                            <span className="px-2.5 py-0.5 rounded text-[10px] tracking-wider uppercase bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 font-medium">
                              {categoriasGuia.find((c) => c.id === guia.categoria)?.label}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[11px] text-zinc-500">
                              <Clock size={11} />
                              {guia.tempoLeitura}
                            </span>
                            {guia.destaque && (
                              <span className="px-2 py-0.5 rounded text-[10px] uppercase bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                                Destaque
                              </span>
                            )}
                          </div>

                          <h3 className="font-serif text-lg md:text-xl text-zinc-100 mb-2 leading-snug">
                            {guia.titulo}
                          </h3>

                          <p className="text-zinc-400 text-xs md:text-sm font-light leading-relaxed">
                            {guia.resumo}
                          </p>
                        </div>

                        <div
                          className={`p-2 rounded-full border border-zinc-800 bg-zinc-950 text-zinc-400 shrink-0 transition-transform duration-300 mt-1 ${
                            isExpanded ? 'rotate-180 text-[#D4AF37] border-[#D4AF37]/40' : ''
                          }`}
                        >
                          <ChevronDown size={18} />
                        </div>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35 }}
                            className="border-t border-zinc-800/80 bg-zinc-950/60 p-6 md:p-8"
                          >
                            {/* Step by Step */}
                            <div className="space-y-6 mb-8">
                              {guia.passos.map((passo, idx) => (
                                <div key={idx} className="flex items-start gap-4">
                                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] text-xs font-bold shrink-0 mt-0.5">
                                    {idx + 1}
                                  </span>
                                  <div>
                                    <h4 className="font-serif text-zinc-200 text-sm md:text-base mb-1 font-medium">
                                      {passo.titulo}
                                    </h4>
                                    <p className="text-zinc-400 text-xs md:text-sm font-light leading-relaxed">
                                      {passo.descricao}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Dica de Ouro da Drika */}
                            {guia.dicaDrika && (
                              <div className="p-4 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-start gap-3">
                                <Lightbulb size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                                    Dica de Ouro da Drika
                                  </p>
                                  <p className="text-xs md:text-sm text-zinc-200 font-light leading-relaxed">
                                    {guia.dicaDrika}
                                  </p>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.article>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* ── Glossary Section ── */}
        {(selectedCategory === 'todos' || selectedCategory === 'glossario') && (
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Bookmark size={18} className="text-[#D4AF37]" />
              <h2 className="font-serif text-2xl text-zinc-100">
                Glossário Capilar da Drika
              </h2>
            </div>
            <p className="text-zinc-400 text-sm font-light mb-8 max-w-2xl">
              Os termos técnicos que os profissionais usam, explicados de forma simples e
              acolhedora para você entender a estrutura do seu cabelo.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredGlossario.map((item) => (
                <div
                  key={item.termo}
                  className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-sm hover:border-[#D4AF37]/30 transition-all duration-300"
                >
                  <h3 className="font-serif text-lg text-[#D4AF37] mb-2 font-medium">
                    {item.termo}
                  </h3>
                  <p className="text-zinc-300 text-xs sm:text-sm font-light leading-relaxed">
                    {item.definicao}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Consultation CTA Box ── */}
        <div className="p-8 md:p-12 rounded-sm border border-[#D4AF37]/30 bg-gradient-to-br from-[#D4AF37]/10 via-zinc-950 to-zinc-950 text-center relative overflow-hidden mb-20">
          <div className="max-w-xl mx-auto">
            <span className="text-[#D4AF37] text-xs uppercase tracking-widest font-semibold block mb-2">
              Dúvidas Sobre o Seu Caso Específico?
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-zinc-50 mb-4">
              Cada cabelo tem uma história única.
            </h3>
            <p className="text-zinc-400 text-sm font-light leading-relaxed mb-8">
              Venha tomar um café com a Drika em Itaquera. Faremos o diagnóstico visagista
              presencial e você entenderá com exatidão do que o seu fio precisa.
            </p>
            <Link
              to="/contato"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#D4AF37] text-zinc-950 font-semibold text-xs tracking-widest uppercase rounded-sm hover:bg-[#E8C95D] transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
              Agendar Diagnóstico Presencial
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Video Masterclasses & Podcasts ── */}
      <Media />
    </div>
  )
}
