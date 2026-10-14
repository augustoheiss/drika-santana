import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlayCircle, Mic, ChevronDown, Coffee } from 'lucide-react'

const mediaContent = [
  {
    type: 'aula',
    title: 'O Fim do Padrão Único: Beleza Sob Medida',
    description:
      'A era de tentar se encaixar num molde pronto acabou. Veja como unimos o corte a seco (Dry Cut), o respeito à curvatura natural e a coloração de baixa manutenção aqui em Itaquera.',
    videoId: 'u30k-G-tlOI',
    icon: <PlayCircle className="w-5 h-5 text-[#D4AF37]" />,
  },
  {
    type: 'podcast',
    title: 'Autoestima Real: Cuidado que Respeita o Seu Fio',
    description:
      'Chega de procedimentos de "linha de montagem" que deixam todo mundo igual. Um bate-papo sincero sobre como preservar a saúde da fibra capilar enquanto valorizamos sua identidade.',
    videoId: 'kaU7PpA0M_8',
    icon: <Mic className="w-5 h-5 text-[#D4AF37]" />,
  },
  {
    type: 'aula',
    title: 'A Vida Secreta do Fio e a Alquimia da Cor',
    description:
      'Entenda de um jeito simples o que é cutícula e córtex, e como a matemática das cores (colorimetria) permite iluminar ou colorir o cabelo mantendo o brilho e a maciez.',
    videoId: '8IfKr1ZifuU',
    icon: <PlayCircle className="w-5 h-5 text-[#D4AF37]" />,
  },
  {
    type: 'podcast',
    title: 'Visagismo Prático & Saúde do Couro Cabeludo',
    description:
      'O que o seu corte comunica antes mesmo de você dizer "bom dia"? Conversamos sobre harmonia facial, rotina prática e por que aposentamos tratamentos agressivos.',
    videoId: 'UeJmN1C9i_c',
    icon: <Mic className="w-5 h-5 text-[#D4AF37]" />,
  },
]

export default function Media() {
  const [activeVideo, setActiveVideo] = useState(null)

  const toggleVideo = (index) => {
    setActiveVideo((prev) => (prev === index ? null : index))
  }

  return (
    <section className="py-24 bg-zinc-950 border-t border-zinc-900 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-xs tracking-[0.22em] uppercase text-[#D4AF37] font-semibold mb-4">
            <Coffee size={13} />
            Para Ouvir Tomando um Café
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-zinc-50 mb-4">
            Masterclasses & <span className="text-[#D4AF37] italic">Podcasts</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto font-light">
            Quer mergulhar ainda mais fundo na ciência do seu cabelo sem complicação? Escolha um
            episódio abaixo, dê o play e aprenda com a gente.
          </p>
        </motion.div>

        <div className="space-y-4">
          {mediaContent.map((item, index) => {
            const isActive = activeVideo === index

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-zinc-900/60 border transition-all duration-300 rounded-xl overflow-hidden cursor-pointer ${
                  isActive
                    ? 'border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.12)]'
                    : 'border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {/* Cabeçalho Clicável */}
                <div
                  className="p-6 flex items-center justify-between"
                  onClick={() => toggleVideo(index)}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-full border ${
                        isActive
                          ? 'bg-[#D4AF37]/10 border-[#D4AF37]/40'
                          : 'bg-zinc-950 border-zinc-800'
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
                        {item.type === 'aula' ? 'Masterclass em Vídeo' : 'Episódio de Podcast'}
                      </span>
                      <h3 className="text-lg md:text-xl font-serif text-zinc-100 mt-1">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 text-zinc-400 transition-transform duration-300 flex-shrink-0 ${
                      isActive ? 'rotate-180 text-[#D4AF37]' : ''
                    }`}
                  />
                </div>

                {/* Área do Vídeo que Expande */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden bg-zinc-950 border-t border-zinc-800/60"
                    >
                      <div className="p-6 pt-4">
                        <p className="text-zinc-400 text-sm font-light leading-relaxed mb-6">
                          {item.description}
                        </p>
                        <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden shadow-lg border border-zinc-800">
                          <iframe
                            className="absolute inset-0 w-full h-full"
                            src={`https://www.youtube.com/embed/${item.videoId}?rel=0`}
                            title={item.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}