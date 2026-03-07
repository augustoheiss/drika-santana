import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, Mic, ChevronDown } from 'lucide-react';

const mediaContent = [
  {
    type: 'aula',
    title: 'O Fim do Padrão Único: Beleza Sob Medida',
    description: 'A era de tentar se encaixar acabou. Descubra a profunda transformação do mercado de beleza em Itaquera, unindo rigor técnico (Dry Cut), biologia molecular e coloração de baixa manutenção.',
    videoId: 'u30k-G-tlOI',
    icon: <PlayCircle className="w-5 h-5 text-yellow-500" />
  },
  {
    type: 'podcast',
    title: 'A Engenharia da Autoestima: Revolução Premium',
    description: 'A estética de "linha de montagem" morreu. Um mergulho na abordagem preservacionista, entendendo como a ciência por trás de um fio de cabelo se tornou um ato de afirmação e saúde biômica.',
    videoId: 'kaU7PpA0M_8',
    icon: <Mic className="w-5 h-5 text-yellow-500" />
  },
  {
    type: 'aula',
    title: 'A Biologia do Fio e a Alquimia da Cor',
    description: 'A ciência por trás do seu cabelo. Entenda o papel da cutícula e do córtex, e os segredos matemáticos da colorimetria para resgatar sua autoestima e celebrar a sua identidade.',
    videoId: '8IfKr1ZifuU',
    icon: <PlayCircle className="w-5 h-5 text-yellow-500" />
  },
  {
    type: 'podcast',
    title: 'Visagismo Analítico e Biotecnologia',
    description: 'O que o seu rosto projeta antes de você falar? Desconstruímos o mercado através de dossiês da WGSN. Entenda como o estresse oxidativo afeta os fios e o fim dos tratamentos agressivos.',
    videoId: 'UeJmN1C9i_c',
    icon: <Mic className="w-5 h-5 text-yellow-500" />
  }
];

export default function Media() {
  // Guarda qual vídeo está aberto no momento. Começa como 'null' (todos fechados).
  const [activeVideo, setActiveVideo] = useState(null);

  const toggleVideo = (index) => {
    // Se clicar no que já está aberto, ele fecha. Se clicar em outro, ele abre o novo.
    if (activeVideo === index) {
      setActiveVideo(null);
    } else {
      setActiveVideo(index);
    }
  };

  return (
    <section className="py-24 bg-zinc-950 border-t border-zinc-900 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif text-slate-50 mb-4">
            Masterclasses & <span className="text-yellow-500 italic">Podcasts</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Aprofunde-se na ciência da beleza. Selecione um conteúdo abaixo para expandir e assistir.
          </p>
        </motion.div>

        <div className="space-y-4">
          {mediaContent.map((item, index) => {
            const isActive = activeVideo === index;

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-zinc-900 border transition-all duration-300 rounded-xl overflow-hidden cursor-pointer ${
                  isActive ? 'border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.1)]' : 'border-zinc-800 hover:border-zinc-600'
                }`}
              >
                {/* Cabeçalho Clicável */}
                <div 
                  className="p-6 flex items-center justify-between"
                  onClick={() => toggleVideo(index)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${isActive ? 'bg-yellow-500/10' : 'bg-zinc-950'}`}>
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-yellow-500 text-xs font-bold uppercase tracking-wider">
                        {item.type === 'aula' ? 'Masterclass' : 'Podcast Exclusivo'}
                      </span>
                      <h3 className="text-lg md:text-xl font-serif text-slate-50 mt-1">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <ChevronDown 
                    className={`w-6 h-6 text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                      isActive ? 'rotate-180 text-yellow-500' : ''
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
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden bg-zinc-950 border-t border-zinc-800/50"
                    >
                      <div className="p-6 pt-4">
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                          {item.description}
                        </p>
                        <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden shadow-lg border border-zinc-800">
                          <iframe 
                            className="absolute inset-0 w-full h-full"
                            src={`https://www.youtube.com/embed/${item.videoId}?rel=0`} 
                            title={item.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}