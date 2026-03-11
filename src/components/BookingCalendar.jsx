import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowRight, ArrowLeft, Send, ClipboardType, ChevronLeft, ChevronRight, CheckSquare, Square, Info } from 'lucide-react';

const WEBHOOK_URL = "https://hook.us1.make.com/sua-url-aqui-gerada-depois";

export default function BookingCalendar() {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [customTime, setCustomTime] = useState('');
  const [blockedTimes, setBlockedTimes] = useState([]);
  const [isLoadingTimes, setIsLoadingTimes] = useState(false);

  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    alergias: '',
    historicoCabelo: '',
    historicoPele: '',
    historicoUnhas: '',
    autorizaImagem: 'Não informado'
  });

  useEffect(() => {
    if (!selectedDate) {
      setBlockedTimes([]);
      return;
    }

    const yyyy = selectedDate.getFullYear();
    const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const dd = String(selectedDate.getDate()).padStart(2, '0');
    const dateParam = `${yyyy}-${mm}-${dd}`;

    const fetchBlockedTimes = async () => {
      setIsLoadingTimes(true);
      try {
        const response = await fetch(`${WEBHOOK_URL}?date=${dateParam}`);
        const data = await response.json();
        setBlockedTimes(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Erro ao sincronizar horários com o Google Calendar:', error);
        setBlockedTimes([]);
      } finally {
        setIsLoadingTimes(false);
      }
    };

    fetchBlockedTimes();
  }, [selectedDate]);

  const availableServices = [
    { id: 'corte', label: 'Corte & Visagismo', category: 'cabelo' },
    { id: 'drycut', label: 'Crespos & Cacheados (Dry Cut)', category: 'cabelo' },
    { id: 'colorimetria', label: 'Mechas & Colorimetria', category: 'cabelo' },
    { id: 'tratamento', label: 'Tratamentos & Cronograma', category: 'cabelo' },
    { id: 'penteado', label: 'Penteado', category: 'cabelo' },
    { id: 'sobrancelha', label: 'Design de Sobrancelhas', category: 'rosto' },
    { id: 'barba', label: 'Barbearia Clássica', category: 'rosto' },
    { id: 'unhas', label: 'Manicure Premium', category: 'unhas' }
  ];

  const availableTimes = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', 'Outro'];
  const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  // Lógica de Categorias Dinâmicas
  const hasCabelo = selectedServices.some(id => availableServices.find(s => s.id === id)?.category === 'cabelo');
  const hasRosto = selectedServices.some(id => availableServices.find(s => s.id === id)?.category === 'rosto');
  const hasUnhas = selectedServices.some(id => availableServices.find(s => s.id === id)?.category === 'unhas');

  const toggleService = (id) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const prevMonth = () => { setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)); setSelectedDate(null); setSelectedTime(''); setCustomTime(''); };
  const nextMonth = () => { setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)); setSelectedDate(null); setSelectedTime(''); setCustomTime(''); };

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

  const formatTimeLabel = (time) => {
    if (time === 'Outro') return 'Sugerir Outro';
    const hour = parseInt(time.split(':')[0], 10);
    return `A partir das ${hour}h`;
  };

  const handleDayClick = (day) => {
    setSelectedDate(new Date(year, month, day));
    setSelectedTime('');
    setCustomTime('');
  };

  const handleNextStep = () => setStep(prev => prev + 1);
  const handlePrevStep = () => setStep(prev => prev - 1);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const dataFormatada = formatDate(selectedDate);
    const horarioFinal = selectedTime === 'Outro' ? customTime : selectedTime;
    
    // Pega os nomes bonitos dos serviços escolhidos
    const servicosEscolhidos = selectedServices.map(id => availableServices.find(s => s.id === id).label).join(', ');

    // Usamos \n (quebra de linha real) em vez de %0A para o encode processar tudo certinho
    let fichaDinamica = `*Nome:* ${formData.nome}\n*Idade:* ${formData.idade}\n*Alergias:* ${formData.alergias}`;
    
    if (hasCabelo) fichaDinamica += `\n*Histórico Capilar (2 anos):* ${formData.historicoCabelo}`;
    if (hasRosto) fichaDinamica += `\n*Uso de Ácidos/Micropigmentação:* ${formData.historicoPele}`;
    if (hasUnhas) fichaDinamica += `\n*Sensibilidade/Micose:* ${formData.historicoUnhas}`;

    fichaDinamica += `\n*Autoriza uso de imagem:* ${formData.autorizaImagem}`;

    const textoBase = `*Solicitação de Agendamento - Drika Studio*\n\n*Serviço(s):* ${servicosEscolhidos}\n*Data desejada:* ${dataFormatada} (A partir das ${horarioFinal})\n\n*-- Ficha de Anamnese --*\n${fichaDinamica}\n\n_Estou ciente sobre a política do sinal para reserva do horário._\n\nOlá Drika, podemos acertar os detalhes do procedimento e do sinal para você marcar na agenda?`;
    
    // O escudo protetor que traduz tudo para o WhatsApp não cortar nada
    const textoCodificado = encodeURIComponent(textoBase);
    
    window.open(`https://wa.me/5511978466027?text=${textoCodificado}`, '_blank');
  };
  return (
    <section id="agendamento" className="py-24 bg-zinc-950 px-6 md:px-12 border-t border-zinc-900">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif text-slate-50 mb-4">
            Inicie seu <span className="text-yellow-500 italic">Projeto de Imagem</span>
          </h2>
          <p className="text-slate-400">Atendimento exclusivo mediante agendamento e avaliação diagnóstica.</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden min-h-[500px]">
          
          {/* Barra de Progresso com 3 Passos */}
          <div className="flex items-center justify-center gap-4 mb-8 max-w-lg mx-auto">
            <div className={`h-2 flex-1 rounded-full ${step >= 1 ? 'bg-yellow-500' : 'bg-zinc-800'} transition-colors duration-500`}></div>
            <div className={`h-2 flex-1 rounded-full ${step >= 2 ? 'bg-yellow-500' : 'bg-zinc-800'} transition-colors duration-500`}></div>
            <div className={`h-2 flex-1 rounded-full ${step >= 3 ? 'bg-yellow-500' : 'bg-zinc-800'} transition-colors duration-500`}></div>
          </div>

          <AnimatePresence mode="wait">
            
            {/* PASSO 1: ESCOLHA DE SERVIÇOS */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <h3 className="text-2xl font-serif text-slate-50 mb-6 text-center">1. O que vamos transformar hoje?</h3>
                <p className="text-zinc-400 text-center text-sm mb-8">Selecione um ou mais serviços abaixo.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 max-w-4xl mx-auto">
                  {availableServices.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                        selectedServices.includes(service.id) 
                          ? 'bg-yellow-500/10 border-yellow-500 text-yellow-500' 
                          : 'bg-zinc-950 border-zinc-800 text-slate-300 hover:border-zinc-600'
                      }`}
                    >
                      {selectedServices.includes(service.id) ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5 text-zinc-600" />}
                      <span className="text-sm font-medium">{service.label}</span>
                    </button>
                  ))}
                </div>

                <div className="flex justify-center">
                  <button onClick={handleNextStep} disabled={selectedServices.length === 0} className="bg-yellow-500 hover:bg-yellow-400 disabled:bg-zinc-800 disabled:text-zinc-600 text-zinc-950 font-bold uppercase tracking-wider py-3 px-8 rounded-lg flex items-center gap-3 transition-colors">
                    Próximo Passo <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* PASSO 2: CALENDÁRIO */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-serif text-slate-50 capitalize">{meses[month]} {year}</h3>
                    <div className="flex gap-2">
                      <button onClick={prevMonth} className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 text-slate-400 hover:text-yellow-500"><ChevronLeft className="w-5 h-5" /></button>
                      <button onClick={nextMonth} className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 text-slate-400 hover:text-yellow-500"><ChevronRight className="w-5 h-5" /></button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-2 text-center mb-2">
                    {diasSemana.map(dia => <div key={dia} className="text-xs font-bold text-zinc-500 uppercase">{dia}</div>)}
                  </div>
                  <div className="grid grid-cols-7 gap-2 text-center">
                    {blanks.map((_, i) => <div key={`blank-${i}`} className="p-3"></div>)}
                    {days.map(day => {
                      const dateObj = new Date(year, month, day);
                      const isPast = dateObj < today;
                      const isClosed = dateObj.getDay() === 0; 
                      const isDisabled = isPast || isClosed;
                      const isSelected = selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;

                      return (
                        <button key={day} onClick={() => !isDisabled && handleDayClick(day)} disabled={isDisabled} className={`p-2 rounded-lg text-sm font-medium w-full ${isDisabled ? 'text-zinc-700 cursor-not-allowed' : 'hover:border-yellow-500/50'} ${isSelected ? 'bg-yellow-500 text-zinc-950 font-bold' : (!isDisabled ? 'bg-zinc-950 border border-zinc-800 text-slate-300' : 'bg-transparent')}`}>
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <Clock className="w-6 h-6 text-yellow-500" />
                    <h3 className="text-xl font-serif text-slate-50">Horários Disponíveis</h3>
                  </div>
                  {!selectedDate ? (
                    <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-xl p-8 text-center text-zinc-500"><p>Selecione uma data ao lado.</p></div>
                  ) : isLoadingTimes ? (
                    <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-xl p-8 text-center">
                      <motion.p
                        className="text-yellow-500 text-sm font-medium"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        A sincronizar com a agenda de Drika...
                      </motion.p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-3">
                        {availableTimes.map((time) => {
                          const isBlocked = blockedTimes.includes(time);
                          const isSelected = selectedTime === time;
                          return (
                            <button
                              key={time}
                              onClick={() => !isBlocked && setSelectedTime(time)}
                              disabled={isBlocked}
                              className={`p-3 rounded-lg border text-sm transition-all leading-tight flex flex-col items-center justify-center gap-0.5 ${
                                isBlocked
                                  ? 'bg-zinc-900 border-zinc-800 text-zinc-600 opacity-50 cursor-not-allowed'
                                  : isSelected
                                    ? 'bg-yellow-500 border-yellow-500 text-zinc-950 font-bold'
                                    : 'bg-zinc-950 border-zinc-800 text-slate-300 hover:border-yellow-500/50'
                              }`}
                            >
                              {isBlocked ? (
                                <>
                                  <span className="line-through text-xs">{formatTimeLabel(time)}</span>
                                  <span className="text-xs font-bold text-zinc-500 not-italic">Ocupado</span>
                                </>
                              ) : (
                                <span>{formatTimeLabel(time)}</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                      {selectedTime === 'Outro' && (
                        <div className="bg-zinc-950 border border-yellow-500/30 p-4 rounded-lg mt-2">
                          <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Qual horário prefere?</label>
                          <input type="time" value={customTime} onChange={(e) => setCustomTime(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-slate-50 focus:border-yellow-500 color-scheme-dark" />
                        </div>
                      )}
                    </div>
                  )}
                  <div className="mt-auto pt-8 flex justify-between">
                    <button onClick={handlePrevStep} className="text-slate-400 hover:text-slate-50 flex items-center gap-2"><ArrowLeft className="w-4 h-4" /> Voltar</button>
                    <button onClick={handleNextStep} disabled={!selectedDate || !selectedTime || (selectedTime === 'Outro' && !customTime)} className="bg-yellow-500 hover:bg-yellow-400 disabled:bg-zinc-800 disabled:text-zinc-600 text-zinc-950 font-bold py-3 px-6 rounded-lg flex items-center gap-2">Próximo Passo <ArrowRight className="w-5 h-5" /></button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PASSO 3: FICHA DE ANAMNESE DINÂMICA */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6 flex items-start gap-4">
                  <Info className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-yellow-500 font-bold mb-1">Garantia de Agendamento</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Para confirmar a sua reserva na agenda, solicitamos um pequeno **sinal financeiro** no momento do contato. Este valor será **integralmente abatido** do total no dia do seu procedimento.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-serif text-slate-50 border-b border-zinc-800 pb-2 mb-4">Dados Principais</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input type="text" name="nome" required onChange={handleChange} placeholder="Seu Nome Completo" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-slate-50 focus:border-yellow-500" />
                    <input type="number" name="idade" required onChange={handleChange} placeholder="Sua Idade" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-slate-50 focus:border-yellow-500" />
                  </div>
                  <input type="text" name="alergias" required onChange={handleChange} placeholder="Possui alguma alergia? (Cosméticos, amônia, esmaltes...)" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-slate-50 focus:border-yellow-500" />

                  {/* CAMPOS DINÂMICOS */}
                  {(hasCabelo || hasRosto || hasUnhas) && (
                    <h3 className="text-xl font-serif text-slate-50 border-b border-zinc-800 pb-2 mt-8 mb-4">Ficha Clínica Específica</h3>
                  )}
                  
                  {hasCabelo && (
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Histórico Capilar</label>
                      <textarea name="historicoCabelo" rows="2" required onChange={handleChange} placeholder="Químicas feitas nos últimos 2 anos (Progressiva, tintura, relaxamento...)" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-slate-50 focus:border-yellow-500"></textarea>
                    </div>
                  )}

                  {hasRosto && (
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Pele & Rosto</label>
                      <input type="text" name="historicoPele" required onChange={handleChange} placeholder="Usa ácidos no rosto ou possui micropigmentação?" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-slate-50 focus:border-yellow-500" />
                    </div>
                  )}

                  {hasUnhas && (
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Saúde das Unhas</label>
                      <input type="text" name="historicoUnhas" required onChange={handleChange} placeholder="Alguma sensibilidade ou histórico de micose?" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-slate-50 focus:border-yellow-500" />
                    </div>
                  )}

                  <div className="mt-6 pt-6 border-t border-zinc-800">
                    <label className="block text-sm font-bold text-slate-300 mb-3">Você autoriza o uso da sua imagem para nosso portfólio no Instagram?</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-200">
                        <input type="radio" name="autorizaImagem" value="Sim" onChange={handleChange} className="accent-yellow-500" required /> Sim
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-200">
                        <input type="radio" name="autorizaImagem" value="Não" onChange={handleChange} className="accent-yellow-500" required /> Não
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between pt-6 gap-4">
                    <button type="button" onClick={handlePrevStep} className="text-slate-400 hover:text-slate-50 flex items-center gap-2"><ArrowLeft className="w-4 h-4" /> Voltar</button>
                    <button type="submit" className="bg-yellow-500 hover:bg-yellow-400 text-zinc-950 font-bold uppercase py-3 px-8 rounded-lg flex items-center justify-center gap-3 w-full sm:w-auto">
                      Enviar Ficha e Agendar <Send className="w-5 h-5" />
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