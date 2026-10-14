import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Clock,
  ArrowRight,
  ArrowLeft,
  Send,
  ChevronLeft,
  ChevronRight,
  CheckSquare,
  Square,
  Info,
  Sparkles,
  Coffee,
  Copy,
  Check,
  BookOpen,
  MessageCircle,
  AlertCircle,
} from 'lucide-react'
import {
  BOOKING_SLOTS,
  OPENING_TIME,
  CLOSING_TIME,
  HOURS_SUMMARY,
  isOpenDay,
  isWithinOpeningHours,
} from '../config/businessHours'
import { SERVICES_CATALOG, buildWhatsAppUrl } from '../config/servicesCatalog'

const WEBHOOK_URL = 'https://hook.us1.make.com/sua-url-aqui-gerada-depois'
const STORAGE_KEY = 'drika_booking_anamnese_draft_v1'

const initialFormState = {
  nome: '',
  idade: '',
  alergias: '',
  historicoCabelo: '',
  historicoPele: '',
  historicoUnhas: '',
  autorizaImagem: 'Não informado',
}

function loadDraftForm() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return initialFormState
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return initialFormState
    return {
      nome: typeof parsed.nome === 'string' ? parsed.nome : '',
      idade: typeof parsed.idade === 'string' ? parsed.idade : '',
      alergias: typeof parsed.alergias === 'string' ? parsed.alergias : '',
      historicoCabelo: typeof parsed.historicoCabelo === 'string' ? parsed.historicoCabelo : '',
      historicoPele: typeof parsed.historicoPele === 'string' ? parsed.historicoPele : '',
      historicoUnhas: typeof parsed.historicoUnhas === 'string' ? parsed.historicoUnhas : '',
      autorizaImagem:
        parsed.autorizaImagem === 'Sim' || parsed.autorizaImagem === 'Não'
          ? parsed.autorizaImagem
          : 'Não informado',
    }
  } catch {
    return initialFormState
  }
}

function formatTotalMinutes(minutes) {
  if (!minutes || minutes <= 0) return ''
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `~${m} min`
  if (m === 0) return `~${h}h`
  return `~${h}h${String(m).padStart(2, '0')}`
}

export default function BookingCalendar() {
  const [searchParams] = useSearchParams()
  const servicoParam = searchParams.get('servico')

  // Parse valid service IDs from URL query param (?servico=drycut or ?servico=drycut,tratamento)
  const preselectedFromUrl = useMemo(() => {
    if (!servicoParam) return []
    return servicoParam
      .split(',')
      .map((s) => s.trim())
      .filter((id) => SERVICES_CATALOG.some((srv) => srv.id === id))
  }, [servicoParam])

  const [step, setStep] = useState(1)
  const [selectedServices, setSelectedServices] = useState(() => preselectedFromUrl)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [customTime, setCustomTime] = useState('')
  const [blockedTimes, setBlockedTimes] = useState([])
  const [isLoadingTimes, setIsLoadingTimes] = useState(false)

  const [formData, setFormData] = useState(loadDraftForm)
  const [lastSubmittedMessage, setLastSubmittedMessage] = useState('')
  const [copied, setCopied] = useState(false)

  // Sync URL preselection if searchParams change
  useEffect(() => {
    if (preselectedFromUrl.length > 0) {
      setSelectedServices(preselectedFromUrl)
    }
  }, [preselectedFromUrl])

  // Persist form draft to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
    } catch {
      // Ignore storage errors in restricted private webviews
    }
  }, [formData])

  useEffect(() => {
    if (!selectedDate || WEBHOOK_URL.includes('sua-url-aqui')) {
      setBlockedTimes([])
      return
    }

    const yyyy = selectedDate.getFullYear()
    const mm = String(selectedDate.getMonth() + 1).padStart(2, '0')
    const dd = String(selectedDate.getDate()).padStart(2, '0')
    const dateParam = `${yyyy}-${mm}-${dd}`

    const fetchBlockedTimes = async () => {
      setIsLoadingTimes(true)
      try {
        const response = await fetch(`${WEBHOOK_URL}?date=${dateParam}`)
        const data = await response.json()
        setBlockedTimes(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Erro ao sincronizar horários com o Google Calendar:', error)
        setBlockedTimes([])
      } finally {
        setIsLoadingTimes(false)
      }
    }

    fetchBlockedTimes()
  }, [selectedDate])

  const availableTimes = [...BOOKING_SLOTS, 'Outro']
  const meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]
  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

  const selectedServiceObjects = useMemo(
    () =>
      selectedServices
        .map((id) => SERVICES_CATALOG.find((s) => s.id === id))
        .filter(Boolean),
    [selectedServices]
  )

  const totalEstimatedMinutes = useMemo(
    () => selectedServiceObjects.reduce((acc, s) => acc + (s.estimatedMinutes || 60), 0),
    [selectedServiceObjects]
  )

  const needsEarlySlot = useMemo(
    () =>
      selectedServiceObjects.some((s) => s.requiresEarlySlot) ||
      totalEstimatedMinutes >= 150,
    [selectedServiceObjects, totalEstimatedMinutes]
  )

  const effectiveTime = selectedTime === 'Outro' ? customTime : selectedTime
  const isLateSlotForLongService =
    needsEarlySlot && Boolean(effectiveTime) && effectiveTime >= '16:00'

  // Lógica de Categorias Dinâmicas para Anamnese
  const hasCabelo = selectedServiceObjects.some((s) => s.anamneseGroup === 'cabelo')
  const hasRosto = selectedServiceObjects.some((s) => s.anamneseGroup === 'rosto')
  const hasUnhas = selectedServiceObjects.some((s) => s.anamneseGroup === 'unhas')

  const toggleService = (id) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
    setSelectedDate(null)
    setSelectedTime('')
    setCustomTime('')
  }
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
    setSelectedDate(null)
    setSelectedTime('')
    setCustomTime('')
  }

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfMonth = new Date(year, month, 1).getDay()

  const blanks = Array.from({ length: firstDayOfMonth })
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const formatDate = (dateObj) => {
    if (!dateObj) return ''
    return dateObj.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const formatTimeLabel = (time) => {
    if (time === 'Outro') return 'Sugerir Outro'
    const hour = parseInt(time.split(':')[0], 10)
    return `A partir das ${hour}h`
  }

  const handleDayClick = (day) => {
    setSelectedDate(new Date(year, month, day))
    setSelectedTime('')
    setCustomTime('')
  }

  const handleNextStep = () => setStep((prev) => prev + 1)
  const handlePrevStep = () => setStep((prev) => prev - 1)

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()

    const dataFormatada = formatDate(selectedDate)
    const horarioFinal = selectedTime === 'Outro' ? customTime : selectedTime
    const servicosEscolhidos = selectedServiceObjects
      .map((s) => s.shortLabel)
      .join(', ')

    let fichaDinamica = `*Nome:* ${formData.nome}\n*Idade:* ${formData.idade}\n*Alergias:* ${formData.alergias}`

    if (hasCabelo)
      fichaDinamica += `\n*Histórico Capilar (2 anos):* ${formData.historicoCabelo}`
    if (hasRosto)
      fichaDinamica += `\n*Uso de Ácidos/Micropigmentação:* ${formData.historicoPele}`
    if (hasUnhas)
      fichaDinamica += `\n*Sensibilidade/Micose:* ${formData.historicoUnhas}`

    fichaDinamica += `\n*Autoriza uso de imagem:* ${formData.autorizaImagem}`

    const textoBase = `*Solicitação de Agendamento - Drika Studio*\n\n*Serviço(s):* ${servicosEscolhidos} (${formatTotalMinutes(totalEstimatedMinutes)})\n*Data desejada:* ${dataFormatada} (A partir das ${horarioFinal})\n\n*-- Ficha de Anamnese --*\n${fichaDinamica}\n\n_Estou ciente sobre a política do sinal para reserva do horário e de acordo com os Termos e Privacidade (LGPD)._\n\nOlá Drika! ☕ Podemos acertar os detalhes do procedimento e do sinal para você marcar na agenda?`

    setLastSubmittedMessage(textoBase)
    setStep(4)

    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      // Ignore storage errors
    }

    window.open(buildWhatsAppUrl(textoBase), '_blank', 'noopener,noreferrer')
  }

  const handleCopyMessage = async () => {
    if (!lastSubmittedMessage) return
    try {
      await navigator.clipboard.writeText(lastSubmittedMessage)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch {
      // Fallback ignored if clipboard blocked
    }
  }

  return (
    <section
      id="agendamento"
      className="py-24 bg-zinc-950 px-6 md:px-12 border-t border-zinc-900"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif text-zinc-100 mb-4">
            Inicie seu <span className="text-[#D4AF37] italic">Projeto de Imagem</span>
          </h2>
          <p className="text-zinc-400">
            Atendimento exclusivo mediante agendamento e avaliação diagnóstica sincera.
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden min-h-[500px]">
          {/* Barra de Progresso */}
          <div className="flex items-center justify-center gap-4 mb-8 max-w-lg mx-auto">
            <div
              className={`h-2 flex-1 rounded-full ${
                step >= 1 ? 'bg-[#D4AF37]' : 'bg-zinc-800'
              } transition-colors duration-500`}
            />
            <div
              className={`h-2 flex-1 rounded-full ${
                step >= 2 ? 'bg-[#D4AF37]' : 'bg-zinc-800'
              } transition-colors duration-500`}
            />
            <div
              className={`h-2 flex-1 rounded-full ${
                step >= 3 ? 'bg-[#D4AF37]' : 'bg-zinc-800'
              } transition-colors duration-500`}
            />
          </div>

          <AnimatePresence mode="wait">
            {/* PASSO 1: ESCOLHA DE SERVIÇOS */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-serif text-zinc-100 mb-3 text-center">
                  1. O que vamos transformar hoje?
                </h3>
                <p className="text-zinc-400 text-center text-sm mb-6">
                  Selecione um ou mais serviços abaixo. Você verá o tempo médio reservado para o
                  seu momento.
                </p>

                {/* Banner de Pré-Seleção Inteligente via URL */}
                {preselectedFromUrl.length > 0 && selectedServices.length > 0 && (
                  <div className="max-w-3xl mx-auto mb-6 p-3.5 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/35 flex items-center justify-between gap-3 text-xs text-zinc-200">
                    <span className="flex items-center gap-2">
                      <Sparkles size={15} className="text-[#D4AF37] shrink-0" />
                      <span>
                        Já deixamos{' '}
                        <strong className="text-[#D4AF37]">
                          {selectedServiceObjects.map((s) => s.shortLabel).join(', ')}
                        </strong>{' '}
                        marcado para você! Pode adicionar mais cuidados ou avançar direto para a
                        data.
                      </span>
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-8 max-w-4xl mx-auto">
                  {SERVICES_CATALOG.map((service) => {
                    const isSelected = selectedServices.includes(service.id)
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => toggleService(service.id)}
                        className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.12)]'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-600'
                        }`}
                      >
                        {isSelected ? (
                          <CheckSquare className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                        ) : (
                          <Square className="w-5 h-5 text-zinc-600 shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1 min-w-0">
                          <span className="block text-sm font-medium leading-snug">
                            {service.shortLabel}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] text-zinc-500 mt-1">
                            <Clock size={10} className="text-[#D4AF37]/80" />
                            {service.duration}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Barra Resumo de Tempo Estimado */}
                {selectedServiceObjects.length > 0 && (
                  <div className="max-w-xl mx-auto mb-8 p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <span className="text-zinc-300 flex items-center gap-2">
                      <Clock size={15} className="text-[#D4AF37]" />
                      <span>
                        Tempo estimado na cadeira:{' '}
                        <strong className="text-[#D4AF37] font-semibold">
                          {formatTotalMinutes(totalEstimatedMinutes)}
                        </strong>
                      </span>
                    </span>
                    <span className="text-zinc-500">
                      {selectedServiceObjects.length}{' '}
                      {selectedServiceObjects.length === 1
                        ? 'serviço selecionado'
                        : 'serviços selecionados'}
                    </span>
                  </div>
                )}

                <div className="flex flex-col items-center gap-4">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={selectedServices.length === 0}
                    className="bg-[#D4AF37] hover:bg-[#E8C95D] disabled:bg-zinc-800 disabled:text-zinc-600 text-zinc-950 font-bold uppercase tracking-wider py-3.5 px-8 rounded-lg flex items-center gap-3 transition-colors shadow-[0_0_20px_rgba(212,175,55,0.2)] cursor-pointer disabled:cursor-not-allowed"
                  >
                    Escolher Data e Horário <ArrowRight className="w-5 h-5" />
                  </button>

                  <p className="text-xs text-zinc-400 text-center">
                    Ainda em dúvida sobre qual serviço marcar?{' '}
                    <a
                      href={buildWhatsAppUrl(
                        'Oi Drika! ☕ Estou na página de agendamento do site, mas fiquei em dúvida sobre qual procedimento escolher pro meu cabelo. Pode me ajudar?'
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#D4AF37] hover:underline font-medium inline-flex items-center gap-1"
                    >
                      <MessageCircle size={12} />
                      Bater um papo rápido com a Drika no WhatsApp
                    </a>
                  </p>
                </div>
              </motion.div>
            )}

            {/* PASSO 2: CALENDÁRIO */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-serif text-zinc-100 capitalize">
                        {meses[month]} {year}
                      </h3>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={prevMonth}
                          className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-[#D4AF37]"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          onClick={nextMonth}
                          className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-[#D4AF37]"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <p
                      id="calendar-hours-note"
                      className="flex items-center gap-2 text-xs text-zinc-400 mb-4"
                    >
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> Atendimento:{' '}
                      {HOURS_SUMMARY.toLowerCase()}.
                    </p>
                    <div className="grid grid-cols-7 gap-2 text-center mb-2">
                      {diasSemana.map((dia) => (
                        <div key={dia} className="text-xs font-bold text-zinc-500 uppercase">
                          {dia}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-center">
                      {blanks.map((_, i) => (
                        <div key={`blank-${i}`} className="p-3" />
                      ))}
                      {days.map((day) => {
                        const dateObj = new Date(year, month, day)
                        const isPast = dateObj < today
                        const isClosed = !isOpenDay(dateObj)
                        const isDisabled = isPast || isClosed
                        const isSelected =
                          selectedDate &&
                          selectedDate.getDate() === day &&
                          selectedDate.getMonth() === month &&
                          selectedDate.getFullYear() === year

                        return (
                          <button
                            key={day}
                            type="button"
                            onClick={() => !isDisabled && handleDayClick(day)}
                            disabled={isDisabled}
                            className={`p-2 rounded-lg text-sm font-medium w-full ${
                              isDisabled
                                ? 'text-zinc-700 cursor-not-allowed'
                                : 'hover:border-[#D4AF37]/50 cursor-pointer'
                            } ${
                              isSelected
                                ? 'bg-[#D4AF37] text-zinc-950 font-bold'
                                : !isDisabled
                                  ? 'bg-zinc-950 border border-zinc-800 text-zinc-300'
                                  : 'bg-transparent'
                            }`}
                          >
                            {day}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <div className="flex items-center gap-3">
                        <Clock className="w-6 h-6 text-[#D4AF37]" />
                        <h3 className="text-xl font-serif text-zinc-100">
                          Horários Disponíveis
                        </h3>
                      </div>
                      <span className="text-xs text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-2.5 py-1 rounded-full">
                        Duração: {formatTotalMinutes(totalEstimatedMinutes)}
                      </span>
                    </div>

                    {!selectedDate ? (
                      <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-xl p-8 text-center text-zinc-500">
                        <p>Selecione uma data disponível (quarta a sábado) ao lado.</p>
                      </div>
                    ) : isLoadingTimes ? (
                      <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-xl p-8 text-center">
                        <motion.p
                          className="text-[#D4AF37] text-sm font-medium"
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{
                            duration: 1.6,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          A sincronizar com a agenda de Drika...
                        </motion.p>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-3">
                          {availableTimes.map((time) => {
                            const isBlocked = blockedTimes.includes(time)
                            const isSelected = selectedTime === time
                            return (
                              <button
                                key={time}
                                type="button"
                                onClick={() => !isBlocked && setSelectedTime(time)}
                                disabled={isBlocked}
                                className={`p-3 rounded-lg border text-sm transition-all leading-tight flex flex-col items-center justify-center gap-0.5 ${
                                  isBlocked
                                    ? 'bg-zinc-900 border-zinc-800 text-zinc-600 opacity-50 cursor-not-allowed'
                                    : isSelected
                                      ? 'bg-[#D4AF37] border-[#D4AF37] text-zinc-950 font-bold cursor-pointer'
                                      : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-[#D4AF37]/50 cursor-pointer'
                                }`}
                              >
                                {isBlocked ? (
                                  <>
                                    <span className="line-through text-xs">
                                      {formatTimeLabel(time)}
                                    </span>
                                    <span className="text-xs font-bold text-zinc-500 not-italic">
                                      Ocupado
                                    </span>
                                  </>
                                ) : (
                                  <span>{formatTimeLabel(time)}</span>
                                )}
                              </button>
                            )
                          })}
                        </div>

                        {selectedTime === 'Outro' && (
                          <div className="bg-zinc-950 border border-[#D4AF37]/30 p-4 rounded-lg mt-2">
                            <label className="block text-xs font-bold text-zinc-400 uppercase mb-2">
                              Qual horário prefere?
                            </label>
                            <input
                              type="time"
                              value={customTime}
                              min={OPENING_TIME}
                              max={CLOSING_TIME}
                              onChange={(e) => setCustomTime(e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-zinc-100 focus:border-[#D4AF37] color-scheme-dark"
                            />
                            {customTime && !isWithinOpeningHours(customTime) && (
                              <p className="text-xs text-red-400 mt-2">
                                Escolha um horário de início a partir das {OPENING_TIME} e
                                antes das {CLOSING_TIME}.
                              </p>
                            )}
                          </div>
                        )}

                        {/* Alerta Amigável de Duração para Fim de Expediente */}
                        {isLateSlotForLongService && (
                          <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/35 flex items-start gap-3 text-xs text-amber-200 leading-relaxed">
                            <AlertCircle
                              size={16}
                              className="text-amber-400 shrink-0 mt-0.5"
                            />
                            <div>
                              <strong className="text-amber-300 font-semibold block mb-0.5">
                                ☕ Dica sincera da Drika sobre o horário:
                              </strong>
                              Os serviços escolhidos levam cerca de{' '}
                              <strong>{formatTotalMinutes(totalEstimatedMinutes)}</strong>.
                              Como fechamos às {CLOSING_TIME}, procedimentos mais longos
                              (como mechas/cor ou combos) costumam fluir melhor começando{' '}
                              <strong>entre 09h e 14h</strong>. Se preferir manter este
                              horário, fique tranquila: ajustamos os detalhes pelo WhatsApp!
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="mt-auto pt-8 flex justify-between">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="text-zinc-400 hover:text-zinc-100 flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" /> Voltar
                      </button>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        disabled={
                          !selectedDate ||
                          !selectedTime ||
                          (selectedTime === 'Outro' && !isWithinOpeningHours(customTime))
                        }
                        className="bg-[#D4AF37] hover:bg-[#E8C95D] disabled:bg-zinc-800 disabled:text-zinc-600 text-zinc-950 font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition-colors shadow-[0_0_20px_rgba(212,175,55,0.2)] cursor-pointer disabled:cursor-not-allowed"
                      >
                        Próximo Passo <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PASSO 3: FICHA DE ANAMNESE DINÂMICA */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl p-4 mb-6 flex items-start gap-4">
                  <Info className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[#D4AF37] font-semibold text-sm mb-1">
                      Garantia de Agendamento & Compromisso
                    </h4>
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      Para confirmar a sua reserva na agenda e dedicarmos o tempo exclusivo
                      para o seu atendimento, solicitamos um pequeno{' '}
                      <strong className="text-[#D4AF37] font-semibold">
                        sinal financeiro
                      </strong>{' '}
                      no momento do contato pelo WhatsApp. Este valor é{' '}
                      <strong className="text-[#D4AF37] font-semibold">
                        integralmente abatido
                      </strong>{' '}
                      do total no dia do seu procedimento.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-serif text-zinc-100 border-b border-zinc-800 pb-2 mb-4">
                    Dados Principais
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="booking-nome"
                        className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
                      >
                        Nome Completo
                      </label>
                      <input
                        id="booking-nome"
                        type="text"
                        name="nome"
                        value={formData.nome}
                        required
                        onChange={handleChange}
                        placeholder="Como prefere ser chamada(o)?"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-zinc-100 focus:border-[#D4AF37] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="booking-idade"
                        className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
                      >
                        Idade
                      </label>
                      <input
                        id="booking-idade"
                        type="number"
                        name="idade"
                        value={formData.idade}
                        required
                        onChange={handleChange}
                        placeholder="Sua idade"
                        min="1"
                        max="120"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-zinc-100 focus:border-[#D4AF37] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="booking-alergias"
                      className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
                    >
                      Alergias ou Sensibilidades
                    </label>
                    <input
                      id="booking-alergias"
                      type="text"
                      name="alergias"
                      value={formData.alergias}
                      required
                      onChange={handleChange}
                      placeholder="Cosméticos, amônia, esmaltes, látex... (ou digite 'Nenhuma')"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-zinc-100 focus:border-[#D4AF37] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* CAMPOS DINÂMICOS */}
                  {(hasCabelo || hasRosto || hasUnhas) && (
                    <h3 className="text-xl font-serif text-zinc-100 border-b border-zinc-800 pb-2 mt-8 mb-4">
                      Ficha Diagnóstica Personalizada
                    </h3>
                  )}

                  {hasCabelo && (
                    <div>
                      <label
                        htmlFor="booking-cabelo"
                        className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
                      >
                        Histórico Capilar (últimos 2 anos)
                      </label>
                      <textarea
                        id="booking-cabelo"
                        name="historicoCabelo"
                        value={formData.historicoCabelo}
                        rows="2"
                        required
                        onChange={handleChange}
                        placeholder="Descoloração, progressiva, botox, relaxamento, colorações ou transição capilar..."
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-zinc-100 focus:border-[#D4AF37] focus:outline-none transition-colors"
                      />
                    </div>
                  )}

                  {hasRosto && (
                    <div>
                      <label
                        htmlFor="booking-pele"
                        className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
                      >
                        Pele & Rosto
                      </label>
                      <input
                        id="booking-pele"
                        type="text"
                        name="historicoPele"
                        value={formData.historicoPele}
                        required
                        onChange={handleChange}
                        placeholder="Uso recente de ácidos, micropigmentação ou procedimentos faciais?"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-zinc-100 focus:border-[#D4AF37] focus:outline-none transition-colors"
                      />
                    </div>
                  )}

                  {hasUnhas && (
                    <div>
                      <label
                        htmlFor="booking-unhas"
                        className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
                      >
                        Saúde das Unhas
                      </label>
                      <input
                        id="booking-unhas"
                        type="text"
                        name="historicoUnhas"
                        value={formData.historicoUnhas}
                        required
                        onChange={handleChange}
                        placeholder="Sensibilidade, micose, unhas frágeis ou alergias específicas?"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-zinc-100 focus:border-[#D4AF37] focus:outline-none transition-colors"
                      />
                    </div>
                  )}

                  <div className="mt-6 pt-6 border-t border-zinc-800">
                    <label className="block text-sm font-semibold text-zinc-300 mb-3">
                      Você autoriza o registro fotográfico antes/depois para nosso portfólio
                      no Instagram?
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer text-zinc-400 hover:text-zinc-200">
                        <input
                          type="radio"
                          name="autorizaImagem"
                          value="Sim"
                          checked={formData.autorizaImagem === 'Sim'}
                          onChange={handleChange}
                          className="accent-[#D4AF37]"
                          required
                        />{' '}
                        Sim, com prazer
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-zinc-400 hover:text-zinc-200">
                        <input
                          type="radio"
                          name="autorizaImagem"
                          value="Não"
                          checked={formData.autorizaImagem === 'Não'}
                          onChange={handleChange}
                          className="accent-[#D4AF37]"
                          required
                        />{' '}
                        Prefiro não divulgar
                      </label>
                    </div>
                  </div>

                  {/* LGPD Consent */}
                  <div className="p-4 rounded-lg bg-zinc-950/70 border border-zinc-800">
                    <label className="flex items-start gap-3 cursor-pointer text-xs text-zinc-400 leading-relaxed">
                      <input
                        type="checkbox"
                        required
                        name="concordaTermos"
                        className="mt-0.5 accent-[#D4AF37] rounded"
                      />
                      <span>
                        Concordo com o envio das minhas informações diagnósticas via WhatsApp
                        para planejamento do atendimento no Studio Drika Santana, em
                        conformidade com a LGPD e os{' '}
                        <Link
                          to="/termos"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#D4AF37] underline hover:text-[#E8C95D]"
                        >
                          Termos de Uso e Política de Privacidade
                        </Link>
                        .
                      </span>
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between pt-6 gap-4">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="text-zinc-400 hover:text-zinc-100 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" /> Voltar
                    </button>
                    <button
                      type="submit"
                      className="bg-[#D4AF37] hover:bg-[#E8C95D] text-zinc-950 font-bold uppercase tracking-wider py-3.5 px-8 rounded-lg flex items-center justify-center gap-3 w-full sm:w-auto shadow-[0_0_25px_rgba(212,175,55,0.25)] transition-all cursor-pointer"
                    >
                      Enviar Ficha e Agendar <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* PASSO 4 (NOVO): CONFIRMAÇÃO, CONTINGÊNCIA DO WHATSAPP & PREPARO ("CAFÉ NO FOGO") */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="space-y-8"
              >
                <div className="text-center max-w-2xl mx-auto">
                  <div className="w-14 h-14 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center mx-auto mb-4">
                    <Coffee className="w-7 h-7 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif text-zinc-50 mb-2">
                    Café no fogo,{' '}
                    <span className="text-[#D4AF37] italic">
                      {formData.nome || 'linda(o)'}!
                    </span>
                  </h3>
                  <p className="text-zinc-300 text-sm md:text-base font-light leading-relaxed">
                    Abrimos o seu WhatsApp com a ficha prontinha para enviar à Drika. Caso a
                    janela não tenha aberto automaticamente no seu celular, use os botões abaixo:
                  </p>
                </div>

                {/* Botões de Segurança Anti-Pop-up Blocker */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
                  <a
                    href={buildWhatsAppUrl(lastSubmittedMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wider uppercase rounded-lg shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all"
                  >
                    <MessageCircle size={16} />
                    Abrir Conversa no WhatsApp
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check size={15} className="text-emerald-400" />
                        <span className="text-emerald-400">Ficha Copiada!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={15} className="text-[#D4AF37]" />
                        <span>Copiar Texto da Ficha</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Dicas de Preparo & Aprendizado para o Dia do Atendimento */}
                <div className="max-w-3xl mx-auto p-6 md:p-8 rounded-2xl bg-zinc-950 border border-[#D4AF37]/30 space-y-5">
                  <div className="flex items-center gap-2.5 text-[#D4AF37] text-xs uppercase tracking-[0.2em] font-bold">
                    <Sparkles size={15} />
                    <span>Enquanto a Drika responde: Como se preparar para o seu dia</span>
                  </div>

                  <div className="space-y-4">
                    {selectedServiceObjects.map((srv) => (
                      <div
                        key={srv.id}
                        className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-serif text-base text-zinc-100 font-medium">
                            {srv.title}
                          </h4>
                          <span className="text-[11px] text-zinc-400">{srv.duration}</span>
                        </div>
                        {srv.prepTip && (
                          <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                            <strong className="text-[#D4AF37] font-semibold">
                              Dica de preparo:{' '}
                            </strong>
                            {srv.prepTip}
                          </p>
                        )}
                        {srv.relatedGuideId && (
                          <Link
                            to={`/aprenda?guia=${srv.relatedGuideId}`}
                            className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] hover:text-[#E8C95D] font-medium underline underline-offset-4"
                          >
                            <BookOpen size={13} />
                            {srv.relatedGuideLabel || 'Ler guia completo sobre este cuidado'}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="text-xs text-zinc-400 hover:text-zinc-200 inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft size={13} />
                    Voltar e editar alguma informação da ficha
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}