import React from 'react';
import { Instagram, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        
        {/* Coluna 1: Marca */}
        <div>
          <h3 className="font-serif text-2xl text-yellow-500 mb-4">Drika Santana</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
            Studio Premium de Embelezamento. Ciência, visagismo e saúde biômica dedicados à sua identidade. Décadas de experiência, formações constantes e cuidados personalizados para cada momento da sua vida.
          </p>
          <div className="flex gap-4">
            <a href="https://instagram.com/drika_hair_santana" target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-900 rounded-full text-slate-400 hover:text-yellow-500 hover:bg-zinc-800 transition-all">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Coluna 2: Contatos (Com o novo endereço) */}
        <div>
          <h4 className="text-slate-50 font-medium mb-6 uppercase tracking-wider text-sm">Agendamentos & Local</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-yellow-500 flex-shrink-0" />
              <span>(11) 98746-6027</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-500 flex-shrink-0" />
              <div>
                <span className="text-slate-200">Rua dos Artistas</span><br/>
                <span>Parada XV de Novembro</span><br/>
                <span>São Paulo - SP, 08247-040</span><br/>
                <span className="text-xs text-zinc-500 mt-2 block border-l-2 border-yellow-500 pl-2">
                  * O número exato do Studio será enviado de forma privada após a confirmação do seu agendamento.
                </span>
              </div>
            </li>
          </ul>
        </div>

        {/* Coluna 3: Horários */}
        <div>
          <h4 className="text-slate-50 font-medium mb-6 uppercase tracking-wider text-sm">Funcionamento</h4>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li className="flex justify-between border-b border-zinc-800 pb-2">
              <span>Terça a Sábado</span>
              <span className="text-slate-300">Apenas Agendado</span>
            </li>
            <li className="flex justify-between pt-2">
              <span>Domingos</span>
              <span className="text-yellow-500/70 italic">Fechado</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500">
        <p>&copy; {new Date().getFullYear()} Drika Santana Studio. Todos os direitos reservados.</p>
        <p className="mt-2 md:mt-0">Design & Arquitetura Web por Augusto Heiss</p>
      </div>
    </footer>
  );
}