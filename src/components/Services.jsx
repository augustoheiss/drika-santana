import React from 'react';
import { motion } from 'framer-motion';
import { 
  ScanFace, 
  FlaskConical, 
  Sparkles, 
  Palette, 
  Infinity, 
  Scissors, 
  Hand, 
  Eye 
} from 'lucide-react';

const services = [
  {
    title: "Engenharia Facial e Visagismo",
    description: "Mapeamento de estrutura óssea e proporção áurea. Não é um corte, é uma Consultoria de Imagem.",
    icon: <ScanFace className="w-8 h-8 text-yellow-500" />
  },
  {
    title: "Terapia Capilar Avançada",
    description: "Restauração biomolecular focada na saúde e elasticidade do Córtex e Cutícula do fio.",
    icon: <FlaskConical className="w-8 h-8 text-yellow-500" />
  },
  {
    title: "Resgate Ancestral (Dry Cut)",
    description: "Corte a seco que respeita a estrutura espiralada e o fator de encolhimento de crespos e cacheados.",
    icon: <Sparkles className="w-8 h-8 text-yellow-500" />
  },
  {
    title: "Alquimia da Colorimetria",
    description: "Física e matemática na alteração de cor. Loiros e Morenas Iluminadas com fusão perfeita de raiz.",
    icon: <Palette className="w-8 h-8 text-yellow-500" />
  },
  {
    title: "Beleza Intergeracional",
    description: "O fim do etarismo. Transição elegante para o grisalho (Grey Blending) e cortes arquitetônicos.",
    icon: <Infinity className="w-8 h-8 text-yellow-500" />
  },
  {
    title: "Barbearia Clássica",
    description: "Visagismo masculino esculpindo a força, a autoridade e a identidade em rostos losangos e ovais.",
    icon: <Scissors className="w-8 h-8 text-yellow-500" />
  },
  {
    title: "Manicure Premium",
    description: "Combinação de biossegurança rigorosa com uma expressão artística formidável para suas mãos.",
    icon: <Hand className="w-8 h-8 text-yellow-500" />
  },
  {
    title: "Design de Sobrancelhas",
    description: "Microajustes geométricos que erguem o olhar, apagam o cansaço e renovam sua expressão.",
    icon: <Eye className="w-8 h-8 text-yellow-500" />
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
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif text-slate-50 mb-4">
            Nossos <span className="text-yellow-500 italic">Pilares</span>
          </h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto opacity-50"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-zinc-900 border border-zinc-800 p-8 hover:border-yellow-500/50 transition-colors duration-300 group"
            >
              <div className="mb-6 p-4 bg-zinc-950 inline-block rounded-full group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-serif text-slate-50 mb-3 group-hover:text-yellow-500 transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}