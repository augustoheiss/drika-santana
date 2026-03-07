import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ArrowRight, ArrowLeft, Send, ClipboardType } from 'lucide-react';

export default function BookingCalendar() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    historico: '',
    alergias: '',
    objetivo: ''
  });

  // Horários de exemplo (Terça a Sábado)
  const availableTimes = ['09:00', '10:30', '13:00', '14:30', '16:00', '17:30'];

  const handleNextStep = () => {
    if (selectedDate && selectedTime) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Formata a data para o padrão brasileiro (DD/MM/YYYY)
    const dataFormatada = selectedDate.split('-').reverse().join('/');

    // Monta a super mensagem pro WhatsApp
    const texto = `*Solicitação de Agendamento - Drika Studio*%0A%0A*Data desejada:* ${dataFormatada} às ${selectedTime}%0A%0A*-- Ficha de Avaliação Prévia --*%0A*Nome:* ${formData.nome}%0A*Idade:* ${formData.idade}%0A*Histórico Químico:* ${formData.historico}%0A*Alergias:* ${formData.alergias}%0A*Objetivo:* ${formData.objetivo}%0A%0AOlá Drika, podemos confirmar este horário?`;
    
    const url = `https://wa.me/5511978466027?text=${texto}`;
    window.open(url, '_blank');
  };

  // Impede que a cliente selecione domingos (0) e segundas (1) no calendário do navegador
  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    const day = date.getUTCDay();
    if (day === 0 || day === 1) {
      alert('O Studio é fechado aos Domingos e Segundas para estudos. Por favor, escolha outro dia.');
      setSelectedDate('');
    } else {
      setSelectedDate(e.target.value);
    }
  };

  return (
    <section className="py-24 bg-zinc-950 px-6 md:px-12 border-t border-zinc-900">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif text-slate-50 mb-4">
            Inicie seu <span className="text-yellow-500 italic">Projeto de Imagem</span>
          </h2>
          <p className="text-slate-400">Atendimento exclusivo mediante agendamento e avaliação diagnóstica.</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Barra de Progresso */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className={`h-2 flex-1 rounded-full ${step >= 1 ? 'bg-yellow-500' : 'bg-zinc-800'} transition-colors duration-500`}></div>
            <div className={`h-2 flex-1 rounded-full ${step >= 2 ? 'bg-yellow-500' : 'bg-zinc-800'} transition-colors duration-500`}></div>
          </div>

          <AnimatePresence mode="wait">
            {/* PASSO 1: DATA E HORÁRIO */}
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
                  <Calendar className="w-6 h-6 text-yellow-500" />
                  <h3 className="text-xl font-serif text-slate-50">1. Escolha a Data e Horário</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Data Desejada</label>
                    <input 
                      type="date" 
                      value={selectedDate}
                      onChange={handleDateChange}
                      min={new Date().toISOString().split('T')[0]} // Não deixa escolher dias no passado
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-slate-50 focus:outline-none focus:border-yellow-500 color-scheme-dark"
                    />
                    <p className="text-xs text-zinc-500 mt-2">* Fechado aos domingos e segundas.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Horários Disponíveis</label>
                    <div className="grid grid-cols-3 gap-3">
                      {availableTimes.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 rounded-lg border text-sm transition-all ${
                            selectedTime === time 
                              ? 'bg-yellow-500 border-yellow-500 text-zinc-950 font-bold' 
                              : 'bg-zinc-950 border-zinc-800 text-slate-300 hover:border-yellow-500/50'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button 
                    onClick={handleNextStep}
                    disabled={!selectedDate || !selectedTime}
                    className="bg-yellow-500 hover:bg-yellow-400 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed text-zinc-950 font-bold uppercase tracking-wider py-3 px-8 rounded-lg flex items-center gap-3 transition-colors"
                  >
                    Próximo Passo
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* PASSO 2: FICHA DE ANAMNESE */}
            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-6 border-b border-zinc-800 pb-4">
                  <div className="flex items-center gap-3">
                    <ClipboardType className="w-6 h-6 text-yellow-500" />
                    <h3 className="text-xl font-serif text-slate-50">2. Ficha de Avaliação Prévia</h3>
                  </div>
                  <div className="text-xs text-yellow-500 font-bold bg-yellow-500/10 px-3 py-1 rounded-full">
                    {selectedDate.split('-').reverse().join('/')} às {selectedTime}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <input type="text" name="nome" required onChange={handleChange} placeholder="Seu Nome Completo" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-slate-50 focus:border-yellow-500 focus:outline-none" />
                    </div>
                    <div>
                      <input type="number" name="idade" required onChange={handleChange} placeholder="Sua Idade" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-slate-50 focus:border-yellow-500 focus:outline-none" />
                    </div>
                  </div>

                  <div>
                    <textarea name="historico" rows="2" required onChange={handleChange} placeholder="Histórico Químico (Últimos 2 anos. Ex: Progressiva, tintura...)" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-slate-50 focus:border-yellow-500 focus:outline-none"></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <input type="text" name="alergias" required onChange={handleChange} placeholder="Possui alergias? Quais?" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-slate-50 focus:border-yellow-500 focus:outline-none" />
                    </div>
                    <div>
                      <input type="text" name="objetivo" required onChange={handleChange} placeholder="Qual o seu objetivo com o cabelo?" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-slate-50 focus:border-yellow-500 focus:outline-none" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <button type="button" onClick={handlePrevStep} className="text-slate-400 hover:text-slate-50 flex items-center gap-2 transition-colors">
                      <ArrowLeft className="w-4 h-4" /> Voltar
                    </button>
                    
                    <button type="submit" className="bg-yellow-500 hover:bg-yellow-400 text-zinc-950 font-bold uppercase tracking-wider py-3 px-8 rounded-lg flex items-center gap-3 transition-colors">
                      Enviar Ficha e Agendar
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}