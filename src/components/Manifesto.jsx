import React from 'react';
import { motion } from 'framer-motion';
import fotoDrika from '../assets/drikahair-02.jpg';

export default function Manifesto() {
  return (
    <section className="py-24 bg-zinc-950 px-6 md:px-12 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Lado Esquerdo: A Foto e Autoridade */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 relative"
        >
          <div className="absolute inset-0 bg-yellow-500/10 transform translate-x-4 translate-y-4 border border-yellow-500/30"></div>
          <img 
            src={fotoDrika} 
            alt="Adriana Santana - Especialista em Visagismo" 
            className="relative z-10 w-full h-auto object-cover grayscale-0 md:grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl border border-zinc-800"
          />
          <div className="absolute -bottom-6 -right-6 bg-zinc-900 border border-yellow-500/30 p-4 z-20 shadow-xl">
            <p className="font-serif text-yellow-500 text-sm tracking-widest uppercase">Adriana Santana</p>
            <p className="text-slate-400 text-xs">Arquiteta de Imagem</p>
          </div>
        </motion.div>

        {/* Lado Direito: O Texto dos PDFs */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2"
        >
          <h2 className="text-3xl md:text-5xl font-serif text-slate-50 mb-6 leading-tight">
            O fim da estética da correção. <br />
            <span className="text-yellow-500 italic">Bem-vindo à era da preservação.</span>
          </h2>
          
          <div className="space-y-6 text-slate-300 font-light leading-relaxed">
            <p>
              A beleza não é mais uma linha de montagem para mascarar imperfeições. O mercado de alto padrão exige o fim do "achismo" e do empirismo. O verdadeiro luxo contemporâneo exige <strong>hiper-personalização, saúde biômica e liberdade estética</strong>.
            </p>
            <p>
              A sua imagem está sendo construída com base em biologia molecular e geometria facial, ou está apenas sendo copiada? Como <strong>Engenheira Visual e Consultora de Imagem</strong>, minha missão é unir o rigor técnico das academias globais à proporção áurea do seu rosto.
            </p>
            <p className="border-l-2 border-yellow-500 pl-4 italic text-slate-400">
              "Um santuário de luxo e acolhimento na Zona Leste de São Paulo. Você não entrega sua imagem ao acaso, entrega à ciência e à arte."
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}