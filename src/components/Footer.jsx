import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MapPin, Phone, Instagram, Clock, Heart } from 'lucide-react'
import logo from '../assets/logo.png'

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const currentYear = new Date().getFullYear()

  return (
    <footer ref={ref} className="relative bg-zinc-950 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#4A3B6B] opacity-[0.07] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16"
        >
          {/* Brand column */}
          <div className="flex flex-col items-center md:items-start">
            <img
              src={logo}
              alt="Drika Santana"
              className="w-24 h-24 object-contain mb-5 opacity-90 drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]"
            />
            <h3 className="font-serif text-xl text-zinc-100 mb-1">Drika Santana</h3>
            <p className="text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
              Studio de Embelezamento
            </p>
            <p className="text-zinc-600 text-sm font-light leading-relaxed text-center md:text-left">
              Studio de Embelezamento. Décadas de experiência, formações constantes e cuidados personalizados para cada momento da sua vida.<br />
              
            </p>

            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://www.instagram.com/drika_hair_santana/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da Drika Santana"
                className="w-9 h-9 flex items-center justify-center border border-zinc-800 rounded-sm text-zinc-500 hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-all duration-300 hover:bg-[#D4AF37]/5"
              >
                <Instagram size={15} />
              </a>
              <a
                href="https://wa.me/5511987466027"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp da Drika Santana"
                className="w-9 h-9 flex items-center justify-center border border-zinc-800 rounded-sm text-zinc-500 hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-all duration-300 hover:bg-[#D4AF37]/5"
              >
                <Phone size={15} />
              </a>
            </div>
          </div>

          {/* Contact & Location column */}
          <div>
            <h4 className="font-serif text-zinc-300 mb-6 text-lg">Localização</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={15} className="text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-zinc-400 text-sm font-light leading-relaxed">
                    Parada XV de Novembro, São Paulo - SP, 08247-040
                  </p>
                  <p className="text-zinc-600 text-xs mt-1 font-light">
                    Endereço completo via WhatsApp
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={15} className="text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <a
                    href="https://wa.me/5511987466027"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 text-sm font-light hover:text-[#D4AF37] transition-colors"
                  >
                    (11) 98746-6027
                  </a>
                  <p className="text-zinc-600 text-xs mt-0.5 font-light">WhatsApp</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Instagram size={15} className="text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <a
                    href="https://www.instagram.com/drika_hair_santana/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 text-sm font-light hover:text-[#D4AF37] transition-colors"
                  >
                    @drika_hair_santana
                  </a>
                  <p className="text-zinc-600 text-xs mt-0.5 font-light">Instagram</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hours column */}
          <div>
            <h4 className="font-serif text-zinc-300 mb-6 text-lg">Horário de Atendimento</h4>
            <div className="space-y-3">
              {[
                { days: 'Segunda a Sexta', hours: '08:00 – 18:00' },
                { days: 'Sábado', hours: '08:00 – 17:00' },
                { days: 'Domingo', hours: 'Fechado' },
              ].map((item) => (
                <div key={item.days} className="flex items-center justify-between gap-4 py-2 border-b border-zinc-800/60">
                  <div className="flex items-center gap-2">
                    <Clock size={12} className="text-[#D4AF37]/60 flex-shrink-0" />
                    <span className="text-zinc-500 text-sm font-light">{item.days}</span>
                  </div>
                  <span
                    className={`text-sm font-medium tabular-nums ${
                      item.hours === 'Fechado' ? 'text-zinc-700' : 'text-zinc-300'
                    }`}
                  >
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>

            {/* Map embed placeholder */}
            <div className="mt-6 rounded-sm border border-zinc-800 overflow-hidden aspect-video bg-zinc-900 flex items-center justify-center">
              <a
                href="https://maps.app.goo.gl/WebmxAJGxbsLZ4FQ7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 text-zinc-600 hover:text-[#D4AF37] transition-colors group"
              >
                <MapPin size={22} className="group-hover:scale-110 transition-transform" />
                <span className="text-xs tracking-wider">Ver no Google Maps</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-700 text-xs font-light"
        >
          <p>© {currentYear} Drika Santana Studio de Embelezamento. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1.5">
            Desenvolvido com <Heart size={11} className="text-[#D4AF37]/60" /> por Augusto Heiss
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
