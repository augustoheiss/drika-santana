# Drika Santana — Studio de Embelezamento

Aplicação web moderna, acolhedora e de alta conversão para o Studio de Embelezamento e Visagismo Drika Santana (Itaquera, São Paulo).

**Stack:** React 19 · Vite 7 · Tailwind CSS 4 · Framer Motion 12 · Lucide React

**Hospedagem:** Vercel — [drikasantana.vercel.app](https://drikasantana.vercel.app)

---

## Horário de Atendimento

Configurado de forma centralizada em `src/config/businessHours.js`:
- **Quarta a Sábado:** 09:00 às 18:00
- **Domingo a Terça:** Fechado

---

## Instalação e execução local

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em desenvolvimento
npm run dev

# 3. Build para produção
npm run build
```

---

## Estrutura do Projeto

```
src/
├── assets/             # Imagens e logotipos oficiais
├── config/
│   └── businessHours.js # Fonte única de verdade de horários de funcionamento
├── components/
│   ├── BookingCalendar.jsx # Calendário de agendamento em 3 etapas com anamnese
│   ├── FAQ.jsx             # Dúvidas frequentes acolhedoras e acessíveis
│   ├── Footer.jsx          # Rodapé com horários, mapa e contatos
│   ├── Navbar.jsx          # Navegação responsiva com link de agendamento
│   ├── WhatsAppFloat.jsx   # Botão flutuante de atendimento rápido
│   └── VisagismImpact.jsx  # Seção de impacto do visagismo
├── pages/
│   ├── Home.jsx            # Página inicial com método, acolhimento e depoimentos
│   ├── Sobre.jsx           # Trajetória, formação técnica e lado pessoal
│   ├── Servicos.jsx        # Menu de serviços detalhados e galeria em movimento
│   ├── Aprenda.jsx         # Hub de aprendizado e dicas de cuidados em casa
│   ├── Avaliacoes.jsx      # Depoimentos reais verificados do Google
│   ├── Contato.jsx         # Agendamento e localização
│   └── Termos.jsx          # Termos de Uso e Política de Privacidade (LGPD)
├── App.jsx
├── main.jsx
└── index.css
```

---

## WhatsApp Oficial

Número de atendimento: `+55 (11) 97846-6027`
