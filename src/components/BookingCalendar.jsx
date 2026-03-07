import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowRight, ArrowLeft, Send, ClipboardType, ChevronLeft, ChevronRight } from 'lucide-react';

export default function BookingCalendar() {
  const [step, setStep] = useState(1);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [customTime, setCustomTime] = useState(''); // Novo estado para o horário personalizado
  
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    historico: '',
    alergias: '',
    objetivo: ''
  });

  // Horários com a opção "Outro" no final
  const availableTimes = [
    '08:00', '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00', 'Outro'
  ];

  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    setSelectedDate(null);
    setSelectedTime('');
    setCustomTime('');
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    setSelectedDate(null);
    setSelectedTime('');
    setCustomTime('');
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const blanks = Array.from({ length: firstDayOfMonth });
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const formatDate = (dateObj) => {
    if (!dateObj) return '';
    return dateObj.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const handleDayClick = (day) => {
    const clickedDate = new Date(year, month, day);
    setSelectedDate(clickedDate);
    setSelectedTime('');
    setCustomTime('');
  };

  const handleNextStep = () => {
    // Só avança se escolheu um horário fixo OU se escolheu 'Outro' e digitou qual é
    if (selectedDate && (selectedTime !== 'Outro' || (selectedTime === 'Outro' && customTime))) {
      setStep(2);
    }
  };

  const handlePrevStep = () => setStep(1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const dataFormatada = formatDate(selectedDate);
    const horarioFinal = selectedTime === 'Outro' ? customTime : selectedTime;

    const texto = `*Solicitação de Agendamento - Drika Studio*%0A%0A*Data desejada:* ${dataFormatada} às ${horarioFinal}%0A%0A*-- Ficha de Avaliação Prévia --*%0A*Nome:* ${formData.nome}%0A*Idade:* ${formData.idade}%0A*Histórico Químico:* ${formData.historico}%0A*Alergias:* ${formData.alergias}%0A*Objetivo:* ${formData.objetivo}%0A%0AOlá Drika, podemos confirmar este horário?`;
    
    const url = `https://wa.me/5511978466027?text=${texto}`;
    window.open(url, '_blank');
  };

  return (
    <section className="py-24 bg-zinc-950 px-6 md:px-12 border-t border-zinc-900">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif text-slate-50 mb-4">
            Inicie seu <span className="text-yellow-500 italic">Projeto de Imagem</span>
          </h2>
          <p className="text-slate-400">Atendimento exclusivo mediante agendamento e avaliação diagnóstica.</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden min-h-[500px]">
          
          <div className="flex items-center justify-center gap-4 mb-8 max-w-md mx-auto">
            <div className={`h-2 flex-1 rounded-full ${step >= 1 ? 'bg-yellow-500' : 'bg-zinc-800'} transition-colors duration-500`}></div>
            <div className={`h-2 flex-1 rounded-full ${step >= 2 ? 'bg-yellow-500' : 'bg-zinc-800'} transition-colors duration-500`}></div>
          </div>

          <AnimatePresence mode="wait">
            
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-serif text-slate-50 capitalize">
                      {meses[month]} {year}
                    </h3>
                    <div className="flex gap-2">
                      <button onClick={prevMonth} className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 text-slate-400 hover:text-yellow-500 hover:border-yellow-500 transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button onClick={nextMonth} className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 text-slate-400 hover:text-yellow-500 hover:border-yellow-500 transition-colors">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-2 text-center mb-2">
                    {diasSemana.map(dia => (
                      <div key={dia} className="text-xs font-bold text-zinc-500 uppercase">{dia}</div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-2 text-center">
                    {blanks.map((_, i) => (
                      <div key={`blank-${i}`} className="p-3"></div>
                    ))}
                    
                    {days.map(day => {
                      const dateObj = new Date(year, month, day);
                      const isPast = dateObj < today;
                      const isClosed = dateObj.getDay() === 0; 
                      const isDisabled = isPast || isClosed;
                      
                      const isSelected = selectedDate && 
                        selectedDate.getDate() === day && 
                        selectedDate.getMonth() === month && 
                        selectedDate.getFullYear() === year;

                      return (
                        <button
                          key={day}
                          onClick={() => !isDisabled && handleDayClick(day)}
                          disabled={isDisabled}
                          className={`
                            p-2 rounded-lg text-sm font-medium transition-all w-full
                            ${isDisabled ? 'text-zinc-700 cursor-not-allowed' : 'hover:border-yellow-500/50 cursor-pointer'}
                            ${isSelected ? 'bg-yellow-500 text-zinc-950 font-bold shadow-lg shadow-yellow-500/20' : (!isDisabled ? 'bg-zinc-950 border border-zinc-800 text-slate-300' : 'bg-transparent')}
                          `}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-zinc-500 mt-4 text-center">* Dias indisponíveis aparecem apagados. Fechado aos domingos.</p>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <Clock className="w-6 h-6 text-yellow-500" />
                    <h3 className="text-xl font-serif text-slate-50">Horários Disponíveis</h3>
                  </div>

                  {!selectedDate ? (
                    <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-xl p-8 text-center text-zinc-500">
                      <p>Por favor, selecione uma data no calendário ao lado para ver os horários.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-3">
                        {availableTimes.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`p-3 rounded-lg border text-sm transition-all ${
                              selectedTime === time 
                                ? 'bg-yellow-500 border-yellow-500 text-zinc-950 font-bold shadow-lg shadow-yellow-500/20' 
                                : 'bg-zinc-950 border-zinc-800 text-slate-300 hover:border-yellow-500/50 hover:bg-zinc-900'
                            }`}
                          >
                            {time === 'Outro' ? 'Outro' : time}
                          </button>
                        ))}
                      </div>

                      <AnimatePresence>
                        {selectedTime === 'Outro' && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="bg-zinc-950 border border-yellow-500/30 p-4 rounded-lg mt-2">
                              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Qual horário você prefere?</label>
                              <input 
                                type="time" 
                                value={customTime}
                                onChange={(e) => setCustomTime(e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-slate-50 focus:outline-none focus:border-yellow-500 transition-colors color-scheme-dark"
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  <div className="mt-auto pt-8 flex justify-end">
                    <button 
                      onClick={handleNextStep}
                      disabled={!selectedDate || !selectedTime || (selectedTime === 'Outro' && !customTime)}
                      className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-400 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed text-zinc-950 font-bold uppercase tracking-wider py-3 px-8 rounded-lg flex items-center justify-center gap-3 transition-colors"
                    >
                      Próximo Passo
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 border-b border-zinc-800 pb-4 gap-4">
                  <div className="flex items-center gap-3">
                    <ClipboardType className="w-6 h-6 text-yellow-500" />
                    <h3 className="text-xl font-serif text-slate-50">2. Ficha de Avaliação Prévia</h3>
                  </div>
                  <div className="text-xs text-yellow-500 font-bold bg-yellow-500/10 px-4 py-2 rounded-full border border-yellow-500/20">
                    {formatDate(selectedDate)} às {selectedTime === 'Outro' ? customTime : selectedTime}
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

                  <div className="flex flex-col sm:flex-row items-center justify-between pt-6 gap-4">
                    <button type="button" onClick={handlePrevStep} className="text-slate-400 hover:text-slate-50 flex items-center gap-2 transition-colors w-full sm:w-auto justify-center">
                      <ArrowLeft className="w-4 h-4" /> Voltar ao Calendário
                    </button>
                    
                    <button type="submit" className="bg-yellow-500 hover:bg-yellow-400 text-zinc-950 font-bold uppercase tracking-wider py-3 px-8 rounded-lg flex items-center justify-center gap-3 transition-colors w-full sm:w-auto shadow-lg shadow-yellow-500/20">
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