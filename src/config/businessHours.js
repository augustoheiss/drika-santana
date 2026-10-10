// ─────────────────────────────────────────────────────────────────────────────
// FONTE ÚNICA DOS HORÁRIOS DE ATENDIMENTO DO STUDIO
// Para alterar a agenda, edite APENAS este arquivo.
// Rodapé (Footer), página de Contato e Calendário de Agendamento leem daqui.
// ─────────────────────────────────────────────────────────────────────────────

// Dias abertos — padrão JavaScript: 0 = Domingo, 1 = Segunda ... 6 = Sábado
export const OPEN_WEEKDAYS = [3, 4, 5, 6] // Quarta a Sábado

export const OPENING_TIME = '09:00'
export const CLOSING_TIME = '18:00'

// Horários de início oferecidos no calendário (o último início é 1h antes do fechamento)
export const BOOKING_SLOTS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']

// Textos exibidos ao cliente
export const HOURS_SUMMARY = 'Quarta a sábado, das 9h às 18h'

export const HOURS_TABLE = [
  { days: 'Quarta a Sábado', hours: '09:00 – 18:00' },
  { days: 'Domingo a Terça', hours: 'Fechado' },
]

export const isOpenDay = (date) => OPEN_WEEKDAYS.includes(date.getDay())

// Comparação segura de strings "HH:MM" (mesmo comprimento → ordem lexicográfica = ordem temporal)
export const isWithinOpeningHours = (time) => Boolean(time) && time >= OPENING_TIME && time < CLOSING_TIME
