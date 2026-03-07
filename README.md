# Drika Santana — Studio de Embelezamento

Landing page moderna, responsiva e de alta conversão.

**Stack:** Vite · React 18 · Tailwind CSS · Framer Motion · Lucide React

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

## Deploy no GitHub Pages

```bash
# 1. Build do projeto
npm run build

# 2. Publique a pasta `dist/` na branch `gh-pages`
#    (use gh-pages package ou GitHub Actions)
npm install -D gh-pages

# Adicione no package.json > scripts:
# "deploy": "gh-pages -d dist"

npm run build
npm run deploy
```

> **Atenção:** O `vite.config.js` já está configurado com `base: '/drika-santana/'` para o GitHub Pages. Ajuste o nome do repositório se necessário.

## Estrutura de componentes

```
src/
├── assets/
│   └── logo.png
├── components/
│   ├── Hero.jsx            # Primeira dobra com CTA
│   ├── Manifesto.jsx       # Filosofia da marca + bio da Drika
│   ├── Services.jsx        # Grid de 8 serviços
│   ├── BookingCalendar.jsx # Calendário interativo → WhatsApp
│   └── Footer.jsx          # Rodapé com localização e contatos
├── App.jsx
├── main.jsx
└── index.css
```

## WhatsApp

Número configurado: `+55 11 98746-6027`

Para alterar, edite a constante `WHATSAPP_NUMBER` em `BookingCalendar.jsx`.
