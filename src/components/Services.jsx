import React from 'react';
import { motion } from 'framer-motion';
import { Scissors, Droplets, Palette, Sparkles, User, Star, Feather, Coffee } from 'lucide-react';

const servicesList = [
  {
    title: 'Visagismo Prático & Cortes',
    description: 'Cortes unissex projetados para o seu formato de rosto e rotina. O fim do "achismo" na cadeira do salão.',
    icon: <Scissors className="w-6 h-6 text-yellow-500" />
  },
  {
    title: 'Resgate Ancestral (Dry Cut)',
    description: 'Especialidade em crespos e cacheados. Corte a seco para respeitar a curvatura natural e o caimento real dos fios.',
    icon: <User className="w-6 h-6 text-yellow-500" />
  },
  {
    title: 'Alquimia da Colorimetria',
    description: 'Mechas, iluminação e coloração global com foco em saúde capilar e baixa manutenção para o dia a dia.',
    icon: <Palette className="w-6 h-6 text-yellow-500" />
  },
  {
    title: 'Tratamentos de Alta Performance',
    description: 'Cronogramas capilares avançados, reconstrução e hidratação profunda para resgatar a vitalidade do fio.',
    icon: <Droplets className="w-6 h-6 text-yellow-500" />
  },
  {
    title: 'Penteados e Estilização',
    description: 'Design de penteados para eventos, unindo fixação, elegância e respeito à estrutura do seu cabelo.',
    icon: <Sparkles className="w-6 h-6 text-yellow-500" />
  },
  {
    title: 'Barbearia Clássica',
    description: 'Design de barba e cortes masculinos alinhados à sua identidade visual e imagem profissional.',
    icon: <Coffee className="w-6 h-6 text-yellow-500" />
  },
  {
    title: 'Manicure Premium',
    description: 'Arte e saúde biômica para suas mãos e pés. Cuidado rigoroso com biossegurança e acabamento impecável.',
    icon: <Star className="w-6 h-6 text-yellow-500" />
  },
  {
    title: 'Design de Sobrancelhas',
    description: 'Emolduramento do olhar através de técnicas que respeitam a simetria e a naturalidade do seu rosto.',
    icon: <Feather className="w-6 h-6 text-yellow-500" />
  }
];

export default function Services() {
  return (
    <section className="py-24 bg-zinc-950 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif text-slate-50 mb-4">
            Nosso <span className="text-yellow-500 italic">Menu de Serviços</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Tratamentos e execuções baseados na realidade do seu dia a dia, entregando durabilidade, saúde e estética de excelência.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 hover:border-yellow-500/50 transition-all duration-300 group"
            >
              <div className="mb-6 p-4 bg-zinc-950 inline-block rounded-full border border-zinc-800 group-hover:border-yellow-500/30 transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-serif text-slate-50 mb-3">{service.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}