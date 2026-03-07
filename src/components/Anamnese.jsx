import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, ClipboardType } from 'lucide-react';

export default function Anamnese() {
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    historico: '',
    alergias: '',
    objetivo: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Formata a mensagem para o WhatsApp
    const texto = `*Ficha de Avaliação Prévia - Drika Studio*%0A%0A*Nome:* ${formData.nome}%0A*Idade:* ${formData.idade}%0A*Histórico Químico:* ${formData.historico}%0A*Alergias:* ${formData.alergias}%0A*Objetivo:* ${formData.objetivo}%0A%0AOlá Drika, gostaria de agendar uma avaliação!`;
    
    // O número exato da Drika: 5511978466027
    const url = `https://wa.me/5511978466027?text=${texto}`;
    
    window.open(url, '_blank');
  };

  return (
    <section className="py-24 bg-zinc-900 px-6 md:px-12 border-t border-zinc-800">
      <div className="max-w-4xl mx-auto bg-zinc-950 border border-zinc-800 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        
        {/* Efeito de luz de fundo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50"></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center p-3 bg-zinc-900 rounded-full mb-4 border border-zinc-800">
            <ClipboardType className="w-8 h-8 text-yellow-500" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-slate-50 mb-3">
            Ficha de <span className="text-yellow-500 italic">Avaliação Prévia</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Para garantirmos a saúde dos seus fios e um atendimento de excelência, preencha rapidamente os dados abaixo antes de iniciarmos o nosso contato.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Seu Nome</label>
              <input 
                type="text" name="nome" required
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-slate-50 focus:outline-none focus:border-yellow-500 transition-colors"
                placeholder="Ex: Maria Silva"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Idade</label>
              <input 
                type="number" name="idade" required
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-slate-50 focus:outline-none focus:border-yellow-500 transition-colors"
                placeholder="Ex: 35"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Histórico Químico (Últimos 2 anos)</label>
            <textarea 
              name="historico" rows="2" required
              onChange={handleChange}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-slate-50 focus:outline-none focus:border-yellow-500 transition-colors"
              placeholder="Ex: Progressiva há 6 meses, tintura de farmácia..."
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Possui Alergias?</label>
              <input 
                type="text" name="alergias" required
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-slate-50 focus:outline-none focus:border-yellow-500 transition-colors"
                placeholder="Ex: Não, ou Alergia a amônia"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Objetivo Principal</label>
              <input 
                type="text" name="objetivo" required
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-slate-50 focus:outline-none focus:border-yellow-500 transition-colors"
                placeholder="Ex: Corte para dar volume, Cobrir brancos..."
              />
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-zinc-950 font-bold uppercase tracking-wider py-4 rounded-lg flex items-center justify-center gap-3 transition-colors mt-4"
          >
            Enviar para o WhatsApp
            <Send className="w-5 h-5" />
          </motion.button>
        </form>

      </div>
    </section>
  );
}