import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, MessageCircle, ChevronLeft } from 'lucide-react';

const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];
const AVAILABLE_TIMES = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
const PHONE_NUMBER = "5511987466027"; // Número da Drika

export default function BookingCalendar() {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  // --- Funções do WhatsApp ---
  const handleTimeClick = (time) => {
    const text = `Olá Drika! Gostaria de agendar uma consultoria no dia ${selectedDay} de ${MONTHS[selectedMonth]} às ${time}. Podemos confirmar?`;
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleOtherTimeClick = () => {
    const text = `Olá Drika! Gostaria de agendar uma consultoria no dia ${selectedDay} de ${MONTHS[selectedMonth]}, mas em um horário diferente dos listados. Podemos verificar a disponibilidade?`;
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // --- Geração do Calendário Seguro ---
  const getDaysInMonth = (month) => new Date(currentYear, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month) => new Date(currentYear, month, 1).getDay();

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(selectedMonth);
    const firstDay = getFirstDayOfMonth(selectedMonth);
    const days = [];

    // Espaços vazios para alinhar o primeiro dia do mês
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const isPast = selectedMonth === currentMonth && day < currentDay;
      const isSelected = selectedDay === day;

      days.push(
        <button
          key={day}
          disabled={isPast}
          onClick={() => setSelectedDay(day)}
          className={`h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center text-sm transition-all duration-300 ${
            isPast 
              ? 'text-zinc-700 cursor-not-allowed opacity-50' 
              : isSelected 
                ? 'bg-yellow-500 text-zinc-950 font-bold scale-110 shadow-[0_0_15px_rgba(234,179,8,0.3)]' 
                : 'text-slate-300 hover:bg-zinc-800 hover:text-yellow-500'
          }`}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  return (
    <section id="agendamento" className="py-24 bg-zinc-900 border-t border-zinc-800 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-serif text-slate-50 mb-4">
            Reserve o seu <span className="text-yellow-500 italic">Espaço de Embelezamento</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Selecione uma data para iniciar a sua consultoria diagnóstica. Nossa equipe confirmará os detalhes via WhatsApp.
          </p>
        </motion.div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 md:p-10 shadow-2xl">
          
          {/* PASSO 1: Escolher o Mês */}
          {selectedMonth === null && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center gap-3 mb-6 justify-center">
                <CalendarIcon className="text-yellow-500 w-6 h-6" />
                <h3 className="text-xl text-slate-50 font-serif">Selecione o Mês ({currentYear})</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {MONTHS.map((month, index) => {
                  const isPastMonth = index < currentMonth;
                  return (
                    <button
                      key={month}
                      disabled={isPastMonth}
                      onClick={() => setSelectedMonth(index)}
                      className={`p-4 rounded-xl border transition-all duration-300 ${
                        isPastMonth 
                          ? 'border-zinc-800 text-zinc-600 bg-zinc-950 cursor-not-allowed' 
                          : 'border-zinc-700 text-slate-300 hover:border-yellow-500 hover:text-yellow-500 hover:bg-zinc-900'
                      }`}
                    >
                      {month}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* PASSO 2: Escolher o Dia */}
          {selectedMonth !== null && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <button 
                onClick={() => { setSelectedMonth(null); setSelectedDay(null); }}
                className="flex items-center text-slate-400 hover:text-yellow-500 transition-colors mb-6 text-sm"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Voltar aos meses
              </button>
              
              <div className="flex items-center gap-3 mb-6 justify-center">
                <CalendarIcon className="text-yellow-500 w-6 h-6" />
                <h3 className="text-xl text-slate-50 font-serif">{MONTHS[selectedMonth]} {currentYear}</h3>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-2 text-center">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                  <div key={day} className="text-xs text-yellow-500/70 font-medium">{day}</div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-2 place-items-center mb-10">
                {renderDays()}
              </div>

              {/* PASSO 3: Escolher o Horário (Aparece após escolher o dia) */}
              {selectedDay !== null && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-8 border-t border-zinc-800"
                >
                  <div className="flex items-center gap-3 mb-6 justify-center">
                    <Clock className="text-yellow-500 w-6 h-6" />
                    <h3 className="text-xl text-slate-50 font-serif">Horários Disponíveis</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {AVAILABLE_TIMES.map(time => (
                      <button
                        key={time}
                        onClick={() => handleTimeClick(time)}
                        className="flex items-center justify-center gap-2 p-3 rounded-lg border border-zinc-700 text-slate-300 hover:bg-yellow-500 hover:text-zinc-950 hover:border-yellow-500 transition-all font-medium"
                      >
                        {time}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleOtherTimeClick}
                    className="w-full mt-4 flex items-center justify-center gap-2 p-4 rounded-lg bg-zinc-900 border border-zinc-700 text-slate-300 hover:bg-zinc-800 transition-all"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Solicitar outro horário via WhatsApp
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
}