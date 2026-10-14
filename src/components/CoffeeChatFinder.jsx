import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Coffee,
  Sparkles,
  BookOpen,
  ArrowRight,
  MessageCircle,
  Clock,
  Lightbulb,
} from 'lucide-react'
import {
  COFFEE_CHAT_SCENARIOS,
  SERVICES_CATALOG,
  buildWhatsAppUrl,
} from '../config/servicesCatalog'

export default function CoffeeChatFinder() {
  const [activeScenarioId, setActiveScenarioId] = useState(COFFEE_CHAT_SCENARIOS[0].id)

  const activeScenario =
    COFFEE_CHAT_SCENARIOS.find((s) => s.id === activeScenarioId) || COFFEE_CHAT_SCENARIOS[0]

  const recommendedServices = activeScenario.recommendedServiceIds
    .map((id) => SERVICES_CATALOG.find((s) => s.id === id))
    .filter(Boolean)

  const primaryBookingQuery = activeScenario.recommendedServiceIds.join(',')

  return (
    <section
      id="mesa-de-cafe"
      className="py-16 px-6 md:px-12 border-b border-zinc-900 bg-gradient-to-b from-zinc-950 via-zinc-900/30 to-zinc-950"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-xs tracking-[0.22em] uppercase text-[#D4AF37] font-semibold mb-4">
            <Coffee size={14} className="text-[#D4AF37]" />
            Papo de Café · Descubra Seu Caminho
          </span>

          <h2 className="font-serif text-2xl sm:text-4xl text-zinc-50 leading-tight mb-4">
            Senta aqui, pega um café e me conta:{' '}
            <span className="text-[#D4AF37] italic">
              qual é a sua relação com o espelho hoje?
            </span>
          </h2>

          <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed">
            Sem termos difíceis e sem empurrar procedimento que você não precisa. Escolha a frase
            que mais parece com o seu momento e veja o papo reto da Drika:
          </p>
        </motion.div>

        {/* 4 Conversational Scenario Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8">
          {COFFEE_CHAT_SCENARIOS.map((scenario) => {
            const isSelected = scenario.id === activeScenarioId
            return (
              <button
                key={scenario.id}
                type="button"
                onClick={() => setActiveScenarioId(scenario.id)}
                className={`text-left p-5 rounded-xl border transition-all duration-300 flex flex-col justify-between gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-[#D4AF37]/12 border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.15)]'
                    : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/80'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xl" role="img" aria-hidden="true">
                    {scenario.emoji}
                  </span>
                  <span
                    className={`text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full font-semibold ${
                      isSelected
                        ? 'bg-[#D4AF37] text-zinc-950'
                        : 'bg-zinc-950 text-zinc-400 border border-zinc-800'
                    }`}
                  >
                    {scenario.shortTag}
                  </span>
                </div>

                <p
                  className={`text-sm leading-snug font-serif ${
                    isSelected ? 'text-zinc-50 font-medium' : 'text-zinc-300'
                  }`}
                >
                  "{scenario.clientQuote}"
                </p>
              </button>
            )
          })}
        </div>

        {/* Dynamic Coffee-Table Answer Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScenario.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-[#D4AF37]/35 bg-zinc-900/80 p-6 md:p-9 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left column: Drika's sincere coffee response + learning pill */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-2.5 text-[#D4AF37] text-xs uppercase tracking-[0.2em] font-semibold">
                  <Sparkles size={14} />
                  <span>O Papo Sincero da Drika</span>
                </div>

                <blockquote className="text-zinc-100 text-base md:text-lg font-light leading-relaxed border-l-2 border-[#D4AF37] pl-4 italic">
                  "{activeScenario.drikaCoffeeReply}"
                </blockquote>

                {/* Science / Agonist of learning pill */}
                <div className="p-4 rounded-xl bg-zinc-950/90 border border-zinc-800 flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 shrink-0 mt-0.5">
                    <Lightbulb size={16} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-[#D4AF37] font-bold mb-1">
                      Ciência sem enrolação (Aprenda o porquê)
                    </p>
                    <p className="text-zinc-300 text-xs sm:text-sm font-light leading-relaxed">
                      {activeScenario.sciencePill}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right column: Recommended Services + 3 Action Paths */}
              <div className="lg:col-span-5 flex flex-col justify-between bg-zinc-950/80 border border-zinc-800/90 rounded-xl p-5 md:p-6 space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-3">
                    Serviços indicados para esse momento:
                  </p>
                  <div className="space-y-2.5">
                    {recommendedServices.map((srv) => (
                      <div
                        key={srv.id}
                        className="flex items-center justify-between gap-3 p-3 rounded-lg bg-zinc-900/90 border border-zinc-800/80"
                      >
                        <span className="font-serif text-sm text-zinc-100 font-medium">
                          {srv.title}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] text-zinc-400 shrink-0">
                          <Clock size={11} className="text-[#D4AF37]" />
                          {srv.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTAs: Book with pre-selection, Chat on WhatsApp, or Learn more */}
                <div className="space-y-2.5 pt-2 border-t border-zinc-800/80">
                  <Link
                    to={`/contato?servico=${primaryBookingQuery}`}
                    className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 bg-[#D4AF37] hover:bg-[#E8C95D] text-zinc-950 font-bold text-xs tracking-widest uppercase rounded-lg transition-all shadow-[0_0_25px_rgba(212,175,55,0.25)]"
                  >
                    Agendar com esse cuidado pré-marcado
                    <ArrowRight size={15} />
                  </Link>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <a
                      href={buildWhatsAppUrl(activeScenario.whatsappPrefill)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-emerald-500/40 bg-emerald-950/30 hover:bg-emerald-900/40 text-emerald-300 text-xs font-medium transition-colors"
                    >
                      <MessageCircle size={14} />
                      Conversar no Whats
                    </a>

                    <Link
                      to={`/aprenda?guia=${activeScenario.recommendedGuideId}`}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-700 hover:border-[#D4AF37]/50 text-zinc-300 hover:text-[#D4AF37] text-xs font-medium transition-colors"
                    >
                      <BookOpen size={14} />
                      Ler Guia (3 min)
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
