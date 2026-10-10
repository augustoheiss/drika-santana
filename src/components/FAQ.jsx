import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react'

const faqItems = [
  {
    question: 'Como funciona o agendamento e o sinal de reserva?',
    answer:
      'Para garantir um atendimento com tempo 100% exclusivo para você e sem filas, solicitamos um pequeno sinal no momento da reserva pelo WhatsApp. Esse valor é integralmente abatido do valor final no dia do seu procedimento. É a garantia de que a cadeira e a atenção da Drika estarão reservadas para o seu momento.',
  },
  {
    question: 'Qual é o horário e os dias de funcionamento?',
    answer:
      'Nosso atendimento é de quarta a sábado, das 9h às 18h, sempre com horário marcado para assegurar calma, escuta e qualidade impecável. De domingo a terça o Studio permanece fechado para estudos, planejamento e descanso.',
  },
  {
    question: 'O Studio atende cortes masculinos e infantis?',
    answer:
      'Sim! Além da expertise em visagismo feminino e cabelos crespos/cacheados, a Drika possui formação em Barbearia Clássica e realiza cortes masculinos e atendimento a crianças com toda a paciência, acolhimento e carinho.',
  },
  {
    question: 'O que é o Visagismo Prático e como ele me ajuda no dia a dia?',
    answer:
      'O visagismo é a ciência de harmonizar o corte, o caimento e as cores com a geometria do seu rosto, seu tom de pele e seu estilo de vida. O objetivo principal é a autonomia: você sai do salão com um cabelo que fica incrível não apenas na cadeira, mas que você consegue arrumar em casa em poucos minutos.',
  },
  {
    question: 'Qual a política para atrasos ou necessidade de remarcação?',
    answer:
      'Entendemos que imprevistos acontecem no trânsito de São Paulo! Temos uma tolerância cordial de até 15 minutos. Caso precise remarcar, pedimos que nos avise com pelo menos 24 horas de antecedência pelo WhatsApp para remanejarmos sua data com carinho.',
  },
  {
    question: '¿Atienden a personas que hablan español?',
    answer:
      '¡Sí, con mucho gusto! Drika habla español y recibe con gran cariño a la comunidad hispanohablante de São Paulo y región. Puedes escribirnos o coordinar tu cita en español sin ningún inconveniente.',
  },
  {
    question: 'Onde o Studio está localizado e como chegar?',
    answer:
      'Estamos localizados no bairro Parada XV de Novembro, em Itaquera, São Paulo (CEP 08247-040). O endereço completo com pontos de referência e orientações de rota é compartilhado diretamente pelo WhatsApp na confirmação do seu horário.',
  },
]

export default function FAQ({ className = '' }) {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section className={`py-20 px-6 md:px-12 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-xs tracking-[0.25em] uppercase text-[#D4AF37] font-semibold mb-4">
            <HelpCircle size={13} className="text-[#D4AF37]" />
            Dúvidas Frequentes
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-zinc-50 leading-tight">
            Tudo o que você precisa saber{' '}
            <span className="text-[#D4AF37] italic">antes da sua visita.</span>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base font-light mt-3 max-w-xl mx-auto">
            Transparência, acolhimento e clareza para que você se sinta completamente segura(o) e em casa.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className="border border-zinc-800/80 bg-zinc-900/40 rounded-lg overflow-hidden transition-all duration-300 hover:border-[#D4AF37]/30"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 text-zinc-100 font-medium text-base hover:text-[#D4AF37] transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3">
                    <Sparkles size={14} className="text-[#D4AF37]/70 shrink-0" />
                    <span>{item.question}</span>
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 text-zinc-400"
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-zinc-400 text-sm leading-relaxed font-light border-t border-zinc-800/40">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
