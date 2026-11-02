import React, { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import {
  Sparkles,
  Scissors,
  Clock,
  ArrowRight,
  BookOpen,
  Coffee,
  Film,
  GraduationCap,
  HelpCircle,
  Pin,
  FileText,
  MapPin,
  MessageCircle,
  Calendar,
  PlayCircle,
  Mic,
  Eye,
  CheckCircle2,
  FlaskConical,
  Lightbulb,
} from 'lucide-react'
import Seo from '../components/Seo'
import {
  SERVICE_CATEGORIES,
  SERVICES_CATALOG,
  COFFEE_CHAT_SCENARIOS,
  buildWhatsAppUrl,
} from '../config/servicesCatalog'
import {
  DRIKA_INSTAGRAM_PROFILE,
  DRIKA_INSTAGRAM_POSTS,
} from '../data/instagramDrikaArchive'
import DrikaActionGate, {
  useDrikaActionGate,
  DrikaDirectModeToggle,
  DrikaCadIconButton,
} from '../components/ui/DrikaActionGate'
import AcervoInstagramDrikaSection, {
  MediaInspectorModal,
  StoryHighlightModal,
  ProvasReaisServico,
} from '../components/servicos/AcervoInstagramDrikaSection'

const MASTERCLASSES = [
  {
    id: 'mc-01',
    type: 'Masterclass em Vídeo',
    title: 'O Fim do Padrão Único: Beleza Sob Medida',
    description:
      'A era de tentar se encaixar num molde pronto acabou. Veja como unimos o corte a seco (Dry Cut), o respeito à curvatura natural e a coloração de baixa manutenção aqui em Itaquera.',
    videoId: 'u30k-G-tlOI',
  },
  {
    id: 'mc-02',
    type: 'Episódio de Podcast',
    title: 'Autoestima Real: Cuidado que Respeita o Seu Fio',
    description:
      'Chega de procedimentos de "linha de montagem" que deixam todo mundo igual. Um bate-papo sincero sobre como preservar a saúde da fibra capilar enquanto valorizamos sua identidade.',
    videoId: 'kaU7PpA0M_8',
  },
  {
    id: 'mc-03',
    type: 'Masterclass em Vídeo',
    title: 'A Vida Secreta do Fio e a Alquimia da Cor',
    description:
      'Entenda de um jeito simples o que é cutícula e córtex, e como a matemática das cores (colorimetria) permite iluminar ou colorir o cabelo mantendo o brilho e a maciez.',
    videoId: '8IfKr1ZifuU',
  },
  {
    id: 'mc-04',
    type: 'Episódio de Podcast',
    title: 'Visagismo Prático & Saúde do Couro Cabeludo',
    description:
      'O que o seu corte comunica antes mesmo de você dizer "bom dia"? Conversamos sobre harmonia facial, rotina prática e por que aposentamos tratamentos agressivos.',
    videoId: 'UeJmN1C9i_c',
  },
]

const FAQ_LIST = [
  {
    q: 'Como funciona o agendamento e o sinal de reserva?',
    a: 'Para garantir um atendimento com tempo 100% exclusivo para você e sem filas, solicitamos um pequeno sinal no momento da reserva pelo WhatsApp. Esse valor é integralmente abatido do valor final no dia do seu procedimento.',
  },
  {
    q: 'Qual é o horário e os dias de funcionamento?',
    a: 'Nosso atendimento em São Paulo (Itaquera) é de quarta a sábado, das 9h às 18h, sempre com horário marcado. Também realizamos temporadas especiais com agenda aberta no Paraná (Itambé, Floresta e Maringá).',
  },
  {
    q: 'O que é o Visagismo Prático e como ele me ajuda no dia a dia?',
    a: 'O visagismo harmoniza o corte, o caimento e as cores com a geometria do seu rosto e o tempo real que você tem de manhã. Você sai com um cabelo que consegue arrumar em casa em poucos minutos.',
  },
  {
    q: 'O Studio atende cortes masculinos, barbearia e público infantil?',
    a: 'Sim! Além da especialização em visagismo feminino, Chanel/Pixie e cachos (Dry Cut), a Drika possui formação em Barbearia Clássica e realiza cortes masculinos e infantis com total acolhimento.',
  },
  {
    q: '¿Atienden a personas que hablan español?',
    a: '¡Sí, con mucho gusto! Drika habla español y recibe con gran cariño a la comunidad hispanohablante de São Paulo y região.',
  },
]

const STATIONS = [
  {
    id: 'servicos',
    code: 'EST-01',
    shortTitle: 'Bancada de Serviços',
    fullTitle: 'Bancada de Serviços & Visagismo (9 Procedimentos)',
    description:
      'Explore as 4 categorias do Studio (Cabelo, Barba, Rosto e Unhas), inspecione a ficha técnica de cada procedimento e veja as provas reais extraídas do Instagram da Drika.',
    drikaTip: 'Cada serviço exibe o Papo de Café da Drika, a Ciência sem Enrolação e os Reels reais daquele procedimento.',
    icon: Scissors,
    badge: '9',
  },
  {
    id: 'acervo',
    code: 'EST-02',
    shortTitle: 'Transformações Instagram',
    fullTitle: 'Acervo Nativo @drika_hair_santana (63 Posts & 36 Reels MP4)',
    description:
      'Galeria 100% nativa (zero iframes lentos) com os Reels em vídeo MP4, antes e depois, Butterfly Cut, Pixie, Chanel de Bico, Cachos e Grisalhos.',
    drikaTip: 'Use os filtros rápidos por técnica capilar ou ative o filtro exclusivo de vídeos MP4.',
    icon: Film,
    badge: '63',
  },
  {
    id: 'stories',
    code: 'EST-03',
    shortTitle: 'Stories & Destaques',
    fullTitle: 'Stories, Destaques & Bastidores (@drika_hair_santana)',
    description:
      'Assista aos 17 Destaques de Stories oficiais da Drika (Feedback, Cabelo Feminino, Mechas, Cursos, Paraná PR, Unhas, Sobrancelha e mais) em player nativo.',
    drikaTip: 'Clique nos anéis de ícone para inspecionar o tema do destaque ou nos cartões com título para abrir direto.',
    icon: Sparkles,
    badge: '17',
  },
  {
    id: 'bussola',
    code: 'EST-04',
    shortTitle: 'Bússola Papo de Café',
    fullTitle: 'Bússola "Papo de Café" — Diagnóstico de Visagismo em 4 Cenários',
    description:
      'Ainda não sabe o nome técnico do que procura? Escolha como você se sente hoje ao olhar no espelho e veja a resposta sincera da Drika.',
    drikaTip: 'Ideal para quem quer mudar o visual com segurança e praticidade na rotina.',
    icon: Coffee,
    badge: '4',
  },
  {
    id: 'ciencia',
    code: 'EST-05',
    shortTitle: 'Ciência, Aulas & FAQ',
    fullTitle: 'Masterclasses, Podcasts & Dúvidas Frequentes',
    description:
      'Assista às videoaulas e podcasts da Drika sobre Ciência do Fio e tire todas as suas dúvidas sobre agendamento, sinal de reserva e horários.',
    drikaTip: 'Conhecimento técnico compartilhado de forma leve, como uma conversa tomando café.',
    icon: GraduationCap,
    badge: '9',
  },
]

export default function Servicos() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const {
    pendingAction,
    directMode,
    toggleDirectMode,
    requestIconAction,
    confirmAction,
    cancelAction,
  } = useDrikaActionGate()

  // Estado da Estação Ativa (Default: 'servicos' ou via query ?estacao=...)
  const [activeStation, setActiveStation] = useState(() => {
    const param = searchParams.get('estacao')
    return STATIONS.some((s) => s.id === param) ? param : 'servicos'
  })

  // Estado da Estação 01 (Bancada de Serviços)
  const [activeCategoryId, setActiveCategoryId] = useState('cabelo')
  const [activeServiceId, setActiveServiceId] = useState(() => {
    const srvParam = searchParams.get('servico')
    return SERVICES_CATALOG.some((s) => s.id === srvParam) ? srvParam : 'corte'
  })

  // Estado da Estação 04 (Bússola Papo de Café)
  const [activeScenarioId, setActiveScenarioId] = useState(COFFEE_CHAT_SCENARIOS[0].id)
  const [activeScenarioServiceIdx, setActiveScenarioServiceIdx] = useState(0)

  // Estado da Estação 05 (Masterclasses & FAQ)
  const [activeMasterclassId, setActiveMasterclassId] = useState(MASTERCLASSES[0].id)
  const [activeFaqIndex, setActiveFaqIndex] = useState(0)

  // Modais Nativos do Instagram
  const [inspectedPost, setInspectedPost] = useState(null)
  const [inspectedHighlight, setInspectedHighlight] = useState(null)

  // Sincroniza query params se mudarem
  useEffect(() => {
    const srv = searchParams.get('servico')
    if (srv && SERVICES_CATALOG.some((s) => s.id === srv)) {
      const found = SERVICES_CATALOG.find((s) => s.id === srv)
      setActiveCategoryId(found.categoryId)
      setActiveServiceId(found.id)
      setActiveStation('servicos')
    }
    const est = searchParams.get('estacao')
    if (est && STATIONS.some((s) => s.id === est)) {
      setActiveStation(est)
    }
  }, [searchParams])

  const servicesInActiveCategory = useMemo(
    () => SERVICES_CATALOG.filter((s) => s.categoryId === activeCategoryId),
    [activeCategoryId]
  )

  const selectedService = useMemo(
    () =>
      SERVICES_CATALOG.find((s) => s.id === activeServiceId) ||
      servicesInActiveCategory[0] ||
      SERVICES_CATALOG[0],
    [activeServiceId, servicesInActiveCategory]
  )

  const selectedCategoryObj = useMemo(
    () =>
      SERVICE_CATEGORIES.find((c) => c.id === selectedService.categoryId) ||
      SERVICE_CATEGORIES[0],
    [selectedService]
  )

  const selectedScenario = useMemo(
    () =>
      COFFEE_CHAT_SCENARIOS.find((c) => c.id === activeScenarioId) || COFFEE_CHAT_SCENARIOS[0],
    [activeScenarioId]
  )

  const scenarioRecommendedServices = useMemo(() => {
    const ids = selectedScenario.recommendedServiceIds || ['corte']
    return ids
      .map((id) => SERVICES_CATALOG.find((s) => s.id === id))
      .filter(Boolean)
  }, [selectedScenario])

  const scenarioPrimaryService = useMemo(
    () =>
      scenarioRecommendedServices[activeScenarioServiceIdx] ||
      scenarioRecommendedServices[0] ||
      SERVICES_CATALOG[0],
    [scenarioRecommendedServices, activeScenarioServiceIdx]
  )

  const selectedMasterclass = useMemo(
    () => MASTERCLASSES.find((m) => m.id === activeMasterclassId) || MASTERCLASSES[0],
    [activeMasterclassId]
  )

  const handleCategorySelect = (catId) => {
    setActiveCategoryId(catId)
    const firstSrv = SERVICES_CATALOG.find((s) => s.categoryId === catId)
    if (firstSrv) setActiveServiceId(firstSrv.id)
  }

  const handleScenarioSelect = (scenarioId) => {
    setActiveScenarioId(scenarioId)
    setActiveScenarioServiceIdx(0)
  }

  return (
    <div className="h-full w-full pt-16 bg-zinc-950 text-zinc-100 flex flex-col overflow-hidden select-none">
      <Seo
        title="Bancada Interativa de Serviços & Instagram Nativo — Drika Santana"
        description="Explore os serviços de visagismo, cortes, cachos (Dry Cut), colorimetria e o acervo nativo de Reels e Stories de @drika_hair_santana em uma bancada interativa sem rolagem."
        canonicalUrl="https://drikasantana.vercel.app/servicos"
      />

      {/* ── BARRA DE COMANDO SUPERIOR CAD (Botões COM Título = 1 Clique Direto) ── */}
      <header className="shrink-0 bg-zinc-900/90 border-b border-zinc-800 px-3 md:px-5 py-2 flex flex-wrap items-center justify-between gap-2 z-20">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]" />
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold block">
              DRK-CAD · STUDIO WORKSTATION
            </span>
            <h1 className="font-serif text-sm md:text-base text-zinc-50 leading-none">
              Menu Interativo & Acervo <span className="text-[#D4AF37] italic">@drika_hair_santana</span>
            </h1>
          </div>
        </div>

        {/* Abas das 5 Estações COM Título Visível -> Mudam em 1 Clique Direto! */}
        <nav
          aria-label="Estações da Bancada"
          className="flex items-center gap-1.5 overflow-x-auto max-w-full py-0.5"
        >
          {STATIONS.map((st) => {
            const Icon = st.icon
            const isActive = activeStation === st.id
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => setActiveStation(st.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 shrink-0 cursor-pointer border ${
                  isActive
                    ? 'bg-[#D4AF37] text-zinc-950 border-[#D4AF37] font-semibold shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                    : 'bg-zinc-950/90 text-zinc-300 border-zinc-800 hover:border-[#D4AF37]/50 hover:text-zinc-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{st.shortTitle}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 rounded-full ${
                    isActive ? 'bg-zinc-950/20 text-zinc-950' : 'bg-zinc-900 text-[#D4AF37]'
                  }`}
                >
                  {st.badge}
                </span>
              </button>
            )
          })}
        </nav>

        {/* Controles de Governança à Direita */}
        <div className="hidden xl:flex items-center gap-2">
          <DrikaDirectModeToggle directMode={directMode} onToggle={toggleDirectMode} />
          <Link
            to={`/contato?servico=${selectedService.id}`}
            className="px-3.5 py-1.5 rounded-xl bg-[#D4AF37] hover:bg-[#E8C95D] text-zinc-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Agendar</span>
          </Link>
        </div>
      </header>

      {/* ── CORPO CENTRAL DA WORKSTATION (DOCK DE ÍCONES CAD + PALCO CENTRAL) ── */}
      <div className="flex-1 min-h-0 flex overflow-hidden">
        {/* DOCK LATERAL ESQUERDO DE ÍCONES CAD (Botões SÓ DE ÍCONE -> Acionam <DrikaActionGate />!) */}
        <aside
          aria-label="Paleta de Ferramentas de Ícone CAD"
          className="w-14 md:w-16 shrink-0 bg-zinc-900/70 border-r border-zinc-800 flex flex-col items-center justify-between py-3 px-1.5 z-10 overflow-y-auto"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-500 text-center">
              CAD
              <br />
              Ícones
            </span>

            {STATIONS.map((st) => {
              const Icon = st.icon
              const isActive = activeStation === st.id
              return (
                <DrikaCadIconButton
                  key={`dock-${st.id}`}
                  active={isActive}
                  badge={st.badge}
                  ariaLabel={`Inspecionar ferramenta: ${st.fullTitle}`}
                  icon={<Icon className="w-4 h-4" />}
                  onClick={() =>
                    requestIconAction({
                      code: st.code,
                      category: 'Estação da Bancada CAD',
                      title: st.fullTitle,
                      description: st.description,
                      drikaTip: st.drikaTip,
                      destination: `Palco Central → ${st.shortTitle}`,
                      confirmLabel: `Abrir ${st.shortTitle}`,
                      onConfirm: () => setActiveStation(st.id),
                    })
                  }
                />
              )
            })}
          </div>

          <div className="w-8 h-px bg-zinc-800 my-1" />

          {/* Atalhos Especiais de Ícone do Instagram & Atendimento */}
          <div className="flex flex-col items-center gap-2">
            {/* Ícone 1: Vídeo Manifesto Fixado */}
            <DrikaCadIconButton
              variant="gold-outline"
              ariaLabel="Inspecionar Vídeo Manifesto Fixado da Drika"
              icon={<Pin className="w-4 h-4" />}
              onClick={() => {
                const pinned =
                  DRIKA_INSTAGRAM_POSTS.find((p) => p.isPinned) || DRIKA_INSTAGRAM_POSTS[0]
                requestIconAction({
                  code: 'DRK-IG-PINNED',
                  category: 'Destaque Oficial @drika_hair_santana',
                  title: pinned.title,
                  description: pinned.technicalSummary,
                  drikaTip:
                    'Assista em MP4 nativo à apresentação oficial da Drika sobre visagismo e transformação capilar.',
                  previewImage: pinned.image,
                  badge: 'REEL MP4 FIXADO',
                  destination: 'Player Nativo de Vídeo',
                  confirmLabel: 'Reproduzir Vídeo Manifesto',
                  onConfirm: () => setInspectedPost(pinned),
                })
              }}
            />

            {/* Ícone 2: Regras de Agendamento e Sinal */}
            <DrikaCadIconButton
              ariaLabel="Inspecionar Regras de Agendamento e Sinal de Reserva"
              icon={<FileText className="w-4 h-4" />}
              onClick={() => {
                const rulesPost =
                  DRIKA_INSTAGRAM_POSTS.find((p) => p.code === 'DcpcsKkRlvM') ||
                  DRIKA_INSTAGRAM_POSTS[0]
                requestIconAction({
                  code: 'DRK-IG-RULES',
                  category: 'Política de Atendimento Exclusivo',
                  title: 'Regras de Agendamento & Sinal de Reserva',
                  description:
                    'Comunicado oficial publicado no Instagram da Drika explicando como funciona a reserva de horário exclusivo e o abatimento integral do sinal.',
                  previewImage: rulesPost.image,
                  badge: 'COMUNICADO OFICIAL',
                  destination: 'Visor de Comunicado',
                  confirmLabel: 'Ler Regras de Agendamento',
                  onConfirm: () => setInspectedPost(rulesPost),
                })
              }}
            />

            {/* Ícone 3: Unidades SP & Paraná */}
            <DrikaCadIconButton
              ariaLabel="Inspecionar Unidades de Atendimento SP e Paraná"
              icon={<MapPin className="w-4 h-4" />}
              onClick={() => {
                const prPost =
                  DRIKA_INSTAGRAM_POSTS.find((p) => p.code === 'Dez6RcFBI6M') ||
                  DRIKA_INSTAGRAM_POSTS[0]
                requestIconAction({
                  code: 'DRK-LOC-SP-PR',
                  category: 'Atendimento Presencial',
                  title: 'São Paulo (Itaquera) & Temporadas Paraná (Itambé, Floresta, Maringá)',
                  description:
                    'Veja os bastidores da bancada da Drika em ação tanto no Studio em Itaquera (SP) quanto nas temporadas especiais no Paraná.',
                  previewImage: prPost.image,
                  badge: 'SP & PARANÁ',
                  destination: 'Reel de Bastidores PR/SP',
                  confirmLabel: 'Assistir Bastidores SP/PR',
                  onConfirm: () => setInspectedPost(prPost),
                })
              }}
            />

            {/* Ícone 4: WhatsApp Direto */}
            <DrikaCadIconButton
              variant="gold-outline"
              ariaLabel="Inspecionar canal direto do WhatsApp da Drika"
              icon={<MessageCircle className="w-4 h-4" />}
              onClick={() =>
                requestIconAction({
                  code: 'DRK-WA-BIO',
                  category: 'Contato Direto',
                  title: 'Conversar com a Drika pelo WhatsApp Oficial',
                  description:
                    'Abre o canal direto de agendamento e consultoria (+55 11 97846-6027) vinculado à biografia do Instagram @drika_hair_santana.',
                  drikaTip: 'Envie uma foto do seu cabelo atual se quiser agilizar a avaliação!',
                  destination: 'WhatsApp Web / App',
                  confirmLabel: 'Abrir WhatsApp da Drika',
                  onConfirm: () =>
                    window.open(
                      DRIKA_INSTAGRAM_PROFILE.whatsappUrl,
                      '_blank',
                      'noopener,noreferrer'
                    ),
                })
              }
            />
          </div>
        </aside>

        {/* ── PALCO CENTRAL MODULADO (ZERO SCROLL DE PÁGINA) ── */}
        <section className="flex-1 min-w-0 min-h-0 p-3 md:p-4 overflow-hidden flex flex-col">
          {/* ===================================================================
              ESTAÇÃO 01: BANCADA DE SERVIÇOS & VISAGISMO (9 PROCEDIMENTOS)
             =================================================================== */}
          {activeStation === 'servicos' && (
            <div className="h-full flex flex-col gap-3 overflow-hidden">
              {/* Seletor das 4 Categorias (Botões COM Título = 1 Clique Direto) */}
              <div className="flex flex-wrap items-center justify-between gap-2 bg-zinc-900/60 border border-zinc-800/90 p-2.5 rounded-2xl shrink-0">
                <div className="flex flex-wrap items-center gap-1.5">
                  {SERVICE_CATEGORIES.map((cat) => {
                    const isCatActive = activeCategoryId === cat.id
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleCategorySelect(cat.id)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-2 ${
                          isCatActive
                            ? 'bg-[#D4AF37] text-zinc-950 font-bold shadow-[0_0_20px_rgba(212,175,55,0.25)]'
                            : 'bg-zinc-950 text-zinc-300 border border-zinc-800 hover:border-[#D4AF37]/40'
                        }`}
                      >
                        <span>{cat.label}</span>
                      </button>
                    )
                  })}
                </div>

                <span className="hidden md:inline-block font-mono text-[11px] text-zinc-400">
                  {selectedCategoryObj.headline} — clique em qualquer serviço abaixo
                </span>
              </div>

              {/* Grid Principal de 12 Colunas da Bancada de Serviços */}
              <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3 overflow-hidden">
                {/* Coluna Esquerda (4 cols): Lista de Procedimentos da Categoria */}
                <div className="lg:col-span-4 flex flex-col gap-2 overflow-y-auto pr-1">
                  {servicesInActiveCategory.map((srv) => {
                    const isSelected = selectedService.id === srv.id
                    return (
                      <div
                        key={srv.id}
                        className={`p-3 rounded-2xl border transition-all flex items-start justify-between gap-2 ${
                          isSelected
                            ? 'bg-zinc-900 border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.12)]'
                            : 'bg-zinc-900/40 border-zinc-800/90 hover:border-zinc-700'
                        }`}
                      >
                        {/* Área clicável COM Título -> Seleciona o serviço em 1 clique! */}
                        <button
                          type="button"
                          onClick={() => setActiveServiceId(srv.id)}
                          className="flex-1 text-left cursor-pointer"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] font-mono text-[9px] uppercase tracking-wider">
                              {srv.shortLabel}
                            </span>
                            <span className="font-mono text-[10px] text-zinc-400 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-[#D4AF37]" />
                              {srv.duration}
                            </span>
                          </div>
                          <h3 className="font-serif text-base text-zinc-50 leading-snug">
                            {srv.title}
                          </h3>
                          <p className="text-xs text-zinc-400 font-light mt-0.5 line-clamp-2">
                            {srv.description}
                          </p>
                        </button>

                        {/* Botão SÓ DE ÍCONE ao lado -> Aciona <DrikaActionGate /> */}
                        <DrikaCadIconButton
                          size="sm"
                          active={isSelected}
                          ariaLabel={`Inspecionar resumo rápido de ${srv.title}`}
                          icon={<Eye className="w-3.5 h-3.5" />}
                          onClick={() =>
                            requestIconAction({
                              code: `SRV-${srv.id.toUpperCase()}`,
                              category: srv.shortLabel,
                              title: srv.title,
                              description: srv.description,
                              drikaTip: srv.cienciaSemEnrolacao,
                              destination: 'Ficha Técnica & Provas Reais na Bancada',
                              confirmLabel: 'Abrir Procedimento na Bancada',
                              onConfirm: () => setActiveServiceId(srv.id),
                            })
                          }
                        />
                      </div>
                    )
                  })}

                  {/* Atalho Rápido para Todos os 9 Procedimentos */}
                  <div className="p-3 rounded-2xl bg-zinc-900/30 border border-zinc-800/70 space-y-2 mt-auto">
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                      Acesso Direto aos 9 Procedimentos:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {SERVICES_CATALOG.map((srv) => (
                        <button
                          key={`chip-${srv.id}`}
                          type="button"
                          onClick={() => {
                            setActiveCategoryId(srv.categoryId)
                            setActiveServiceId(srv.id)
                          }}
                          className={`px-2 py-1 rounded-lg text-[11px] transition-colors cursor-pointer border ${
                            selectedService.id === srv.id
                              ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37] font-semibold'
                              : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                          }`}
                        >
                          {srv.shortLabel}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Coluna Direita (8 cols): Visor Técnico do Procedimento + Provas Reais do Instagram */}
                <div className="lg:col-span-8 rounded-2xl bg-zinc-900/50 border border-zinc-800/90 p-4 md:p-5 overflow-y-auto flex flex-col justify-between gap-4">
                  <div className="space-y-4">
                    {/* Cabeçalho da Ficha Técnica */}
                    <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-zinc-800">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] font-mono text-[10px] uppercase tracking-widest font-semibold">
                            {selectedCategoryObj.label} · {selectedService.shortLabel}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-[10px] flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#D4AF37]" />
                            Tempo na cadeira: {selectedService.duration}
                          </span>
                        </div>
                        <h2 className="font-serif text-2xl md:text-3xl text-zinc-50">
                          {selectedService.title}
                        </h2>
                        <p className="text-xs md:text-sm text-zinc-400 font-light mt-1">
                          {selectedService.description}
                        </p>
                      </div>

                      {/* Botões SÓ DE ÍCONE de Ação Rápida do Serviço */}
                      <div className="flex items-center gap-2">
                        {selectedService.relatedGuideId && (
                          <DrikaCadIconButton
                            variant="gold-outline"
                            ariaLabel={`Inspecionar guia educativo sobre ${selectedService.title}`}
                            icon={<BookOpen className="w-4 h-4" />}
                            onClick={() =>
                              requestIconAction({
                                code: `GUIA-${selectedService.id.toUpperCase()}`,
                                category: 'Educação & Ciência Capilar',
                                title:
                                  selectedService.relatedGuideLabel ||
                                  `Abrir Guia: ${selectedService.title}`,
                                description:
                                  'Acessa a biblioteca "Aprenda com a Drika" com a explicação passo a passo sobre como cuidar do seu fio antes e depois deste procedimento.',
                                destination: `/aprenda?guia=${selectedService.relatedGuideId}`,
                                confirmLabel: 'Ir para o Guia Completo',
                                onConfirm: () =>
                                  navigate(`/aprenda?guia=${selectedService.relatedGuideId}`),
                              })
                            }
                          />
                        )}
                        <DrikaCadIconButton
                          variant="gold-outline"
                          ariaLabel={`Inspecionar agendamento de ${selectedService.title}`}
                          icon={<Calendar className="w-4 h-4" />}
                          onClick={() =>
                            requestIconAction({
                              code: `BOOK-${selectedService.id.toUpperCase()}`,
                              category: 'Reserva de Horário Exclusivo',
                              title: `Agendar ${selectedService.title}`,
                              description: `Abre a agenda inteligente da Drika com o procedimento "${selectedService.title}" (${selectedService.duration}) já pré-selecionado para você.`,
                              destination: `/contato?servico=${selectedService.id}`,
                              confirmLabel: 'Ir para Agendamento',
                              onConfirm: () => navigate(`/contato?servico=${selectedService.id}`),
                            })
                          }
                        />
                      </div>
                    </div>

                    {/* Três Caixas Explicativas Reais: Papo de Café, Ciência sem Enrolação e Dica de Preparo */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-xl bg-zinc-950/90 border border-[#D4AF37]/30 space-y-1.5 md:col-span-2">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold flex items-center gap-1.5">
                          <Coffee className="w-3.5 h-3.5" /> Papo de Café com a Drika
                        </span>
                        <p className="text-xs md:text-sm text-zinc-200 font-light italic leading-relaxed">
                          "{selectedService.papoDeCafe}"
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 space-y-1.5">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold flex items-center gap-1.5">
                          <FlaskConical className="w-3.5 h-3.5" /> Ciência sem Enrolação
                        </span>
                        <p className="text-xs text-zinc-300 font-light leading-relaxed">
                          {selectedService.cienciaSemEnrolacao}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 space-y-1.5">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold flex items-center gap-1.5">
                          <Lightbulb className="w-3.5 h-3.5" /> Como Vir Preparada(o)
                        </span>
                        <p className="text-xs text-zinc-300 font-light leading-relaxed">
                          {selectedService.prepTip}
                        </p>
                      </div>
                    </div>

                    {/* Tira de Provas Reais Extraídas do Instagram @drika_hair_santana */}
                    <ProvasReaisServico
                      serviceId={selectedService.id}
                      serviceTitle={selectedService.title}
                      onSelectPost={(post) => setInspectedPost(post)}
                      onSelectHighlight={(hl) => setInspectedHighlight(hl)}
                      onRequestIconAction={requestIconAction}
                    />
                  </div>

                  {/* Barra de Ação Inferior do Serviço (Botões COM Título = 1 Clique Direto) */}
                  <div className="pt-3 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <Link
                        to={`/contato?servico=${selectedService.id}`}
                        className="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E8C95D] text-zinc-950 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-[0_0_25px_rgba(212,175,55,0.25)] transition-all"
                      >
                        <span>Agendar {selectedService.shortLabel}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      {selectedService.relatedGuideId && (
                        <Link
                          to={`/aprenda?guia=${selectedService.relatedGuideId}`}
                          className="px-4 py-2.5 rounded-xl border border-zinc-700 hover:border-[#D4AF37]/50 text-zinc-300 hover:text-[#D4AF37] text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 transition-colors"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>{selectedService.relatedGuideLabel || 'Ler Guia Completo'}</span>
                        </Link>
                      )}

                      {selectedService.whatsappQuestion && (
                        <a
                          href={buildWhatsAppUrl(selectedService.whatsappQuestion)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2.5 rounded-xl border border-zinc-800 hover:border-[#D4AF37]/40 text-zinc-300 hover:text-[#D4AF37] text-xs font-mono uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Tirar Dúvida no WhatsApp</span>
                        </a>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveStation('acervo')}
                      className="text-xs font-mono text-[#D4AF37] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Film className="w-3.5 h-3.5" />
                      <span>Ver todos os 63 posts & Reels do Instagram →</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================
              ESTAÇÃO 02: ACERVO NATIVO & REELS @drika_hair_santana (63 POSTS)
             =================================================================== */}
          {activeStation === 'acervo' && (
            <AcervoInstagramDrikaSection
              mode="gallery"
              onRequestIconAction={requestIconAction}
              onSelectPost={(post) => setInspectedPost(post)}
              onSelectHighlight={(hl) => setInspectedHighlight(hl)}
            />
          )}

          {/* ===================================================================
              ESTAÇÃO 03: STORIES, DESTAQUES & BASTIDORES (17 HIGHLIGHTS)
             =================================================================== */}
          {activeStation === 'stories' && (
            <AcervoInstagramDrikaSection
              mode="stories"
              onRequestIconAction={requestIconAction}
              onSelectPost={(post) => setInspectedPost(post)}
              onSelectHighlight={(hl) => setInspectedHighlight(hl)}
            />
          )}

          {/* ===================================================================
              ESTAÇÃO 04: BÚSSOLA "PAPO DE CAFÉ" (4 CENÁRIOS CONVERSACIONAIS)
             =================================================================== */}
          {activeStation === 'bussola' && (
            <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-4 overflow-hidden">
              {/* Coluna Esquerda: Os 4 Cenários Conversacionais */}
              <div className="lg:col-span-5 flex flex-col gap-2.5 overflow-y-auto pr-1">
                <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#D4AF37] flex items-center gap-1.5">
                    <Coffee className="w-3.5 h-3.5" /> Diagnóstico Interativo
                  </span>
                  <h2 className="font-serif text-xl text-zinc-50 mt-1">
                    Me conta: qual dessas frases mais parece com o seu momento hoje?
                  </h2>
                </div>

                {COFFEE_CHAT_SCENARIOS.map((sc, idx) => {
                  const isSelected = selectedScenario.id === sc.id
                  return (
                    <div
                      key={sc.id}
                      className={`p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-2.5 ${
                        isSelected
                          ? 'bg-zinc-900 border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.14)]'
                          : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      {/* Botão COM Título -> Seleciona cenário em 1 clique! */}
                      <button
                        type="button"
                        onClick={() => handleScenarioSelect(sc.id)}
                        className="flex-1 text-left cursor-pointer"
                      >
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#D4AF37] flex items-center gap-1.5">
                          <span>{sc.emoji}</span>
                          <span>
                            Cenário 0{idx + 1} · {sc.shortTag}
                          </span>
                        </span>
                        <h3 className="font-serif text-base text-zinc-100 mt-1 leading-snug">
                          "{sc.clientQuote}"
                        </h3>
                      </button>

                      {/* Botão SÓ DE ÍCONE -> Aciona <DrikaActionGate /> */}
                      <DrikaCadIconButton
                        size="sm"
                        active={isSelected}
                        ariaLabel={`Inspecionar recomendação do cenário ${sc.shortTag}`}
                        icon={<Sparkles className="w-3.5 h-3.5" />}
                        onClick={() =>
                          requestIconAction({
                            code: `CAFE-0${idx + 1}`,
                            category: `Cenário · ${sc.shortTag}`,
                            title: sc.clientQuote,
                            description: sc.drikaCoffeeReply,
                            drikaTip: sc.sciencePill,
                            destination: 'Diagnóstico da Bússola Papo de Café',
                            confirmLabel: 'Ver Recomendação da Drika',
                            onConfirm: () => handleScenarioSelect(sc.id),
                          })
                        }
                      />
                    </div>
                  )
                })}
              </div>

              {/* Coluna Direita: Resposta da Drika + Ciência + Serviços Recomendados + Provas Reais */}
              <div className="lg:col-span-7 rounded-2xl bg-zinc-900/50 border border-zinc-800 p-4 md:p-5 overflow-y-auto flex flex-col justify-between gap-4">
                <div className="space-y-4">
                  {/* Resposta da Drika e Pílula da Ciência */}
                  <div className="p-4 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold flex items-center gap-1.5">
                        <Coffee className="w-3.5 h-3.5" /> Resposta da Drika para Você ({selectedScenario.shortTag}):
                      </span>
                      <span className="text-base">{selectedScenario.emoji}</span>
                    </div>
                    <p className="font-serif text-base md:text-lg text-zinc-100 italic leading-relaxed">
                      "{selectedScenario.drikaCoffeeReply}"
                    </p>
                    {selectedScenario.sciencePill && (
                      <div className="pt-2.5 border-t border-[#D4AF37]/20 flex items-start gap-2 text-xs text-zinc-300 font-light leading-relaxed">
                        <FlaskConical className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span>{selectedScenario.sciencePill}</span>
                      </div>
                    )}
                  </div>

                  {/* Seletor dos Serviços Recomendados para este Cenário */}
                  <div className="p-4 rounded-2xl bg-zinc-950/90 border border-zinc-800 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#D4AF37] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Procedimentos Recomendados ({scenarioRecommendedServices.length}):
                      </span>

                      {scenarioRecommendedServices.length > 1 && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          {scenarioRecommendedServices.map((srv, idx) => (
                            <button
                              key={srv.id}
                              type="button"
                              onClick={() => setActiveScenarioServiceIdx(idx)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer border ${
                                activeScenarioServiceIdx === idx
                                  ? 'bg-[#D4AF37] text-zinc-950 border-[#D4AF37] font-bold'
                                  : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-[#D4AF37]/40'
                              }`}
                            >
                              {srv.shortLabel}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-serif text-xl md:text-2xl text-zinc-50">
                          {scenarioPrimaryService.title}
                        </h3>
                        <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 font-mono text-[10px] text-[#D4AF37]">
                          {scenarioPrimaryService.duration}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed">
                        {scenarioPrimaryService.description}
                      </p>
                    </div>
                  </div>

                  {/* Provas Reais no Instagram para o Serviço Recomendado */}
                  <ProvasReaisServico
                    serviceId={scenarioPrimaryService.id}
                    serviceTitle={scenarioPrimaryService.title}
                    onSelectPost={(post) => setInspectedPost(post)}
                    onSelectHighlight={(hl) => setInspectedHighlight(hl)}
                    onRequestIconAction={requestIconAction}
                  />
                </div>

                {/* CTAs do Cenário (Botões COM Título = 1 Clique Direto) */}
                <div className="pt-3 border-t border-zinc-800 flex flex-wrap items-center gap-2.5">
                  <Link
                    to={`/contato?servico=${scenarioPrimaryService.id}`}
                    className="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E8C95D] text-zinc-950 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-[0_0_25px_rgba(212,175,55,0.25)]"
                  >
                    <span>Agendar {scenarioPrimaryService.shortLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategoryId(scenarioPrimaryService.categoryId)
                      setActiveServiceId(scenarioPrimaryService.id)
                      setActiveStation('servicos')
                    }}
                    className="px-4 py-2.5 rounded-xl border border-zinc-700 hover:border-[#D4AF37]/50 text-zinc-200 text-xs font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    Abrir Ficha na Bancada
                  </button>

                  {selectedScenario.recommendedGuideId && (
                    <Link
                      to={`/aprenda?guia=${selectedScenario.recommendedGuideId}`}
                      className="px-3.5 py-2.5 rounded-xl border border-zinc-800 hover:border-[#D4AF37]/40 text-zinc-300 hover:text-[#D4AF37] text-xs font-mono uppercase tracking-wider inline-flex items-center gap-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Guia Educativo</span>
                    </Link>
                  )}

                  {selectedScenario.whatsappPrefill && (
                    <a
                      href={buildWhatsAppUrl(selectedScenario.whatsappPrefill)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2.5 rounded-xl border border-zinc-800 hover:border-[#D4AF37]/40 text-zinc-300 hover:text-[#D4AF37] text-xs font-mono uppercase tracking-wider inline-flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Conversar no WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================
              ESTAÇÃO 05: CIÊNCIA DO FIO, MASTERCLASSES & FAQ
             =================================================================== */}
          {activeStation === 'ciencia' && (
            <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-4 overflow-hidden">
              {/* Coluna Esquerda (6 cols): Masterclasses & Podcasts */}
              <div className="lg:col-span-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 p-4 flex flex-col gap-3 overflow-y-auto">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#D4AF37]">
                    Para Ouvir Tomando um Café
                  </span>
                  <h2 className="font-serif text-xl text-zinc-50">
                    Masterclasses & Podcasts da Drika
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {MASTERCLASSES.map((mc) => {
                    const isSelected = selectedMasterclass.id === mc.id
                    return (
                      <button
                        key={mc.id}
                        type="button"
                        onClick={() => setActiveMasterclassId(mc.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-zinc-900 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.12)]'
                            : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#D4AF37] mb-1">
                          {mc.type.includes('Vídeo') ? (
                            <PlayCircle className="w-3.5 h-3.5" />
                          ) : (
                            <Mic className="w-3.5 h-3.5" />
                          )}
                          <span>{mc.type}</span>
                        </div>
                        <h3 className="font-serif text-sm text-zinc-100 line-clamp-2">
                          {mc.title}
                        </h3>
                      </button>
                    )
                  })}
                </div>

                {/* Player Embutido da Aula Selecionada */}
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-base text-zinc-100">
                      {selectedMasterclass.title}
                    </h3>
                    <p className="text-xs text-zinc-400 font-light mt-1">
                      {selectedMasterclass.description}
                    </p>
                  </div>
                  <div className="relative pt-[52%] bg-black rounded-lg overflow-hidden border border-zinc-800">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${selectedMasterclass.videoId}?rel=0`}
                      title={selectedMasterclass.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>

              {/* Coluna Direita (6 cols): Dúvidas Frequentes (FAQ) & Visagismo */}
              <div className="lg:col-span-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 p-4 flex flex-col justify-between gap-3 overflow-y-auto">
                <div className="space-y-2.5">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#D4AF37] flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5" /> Transparência Total
                    </span>
                    <h2 className="font-serif text-xl text-zinc-50">
                      Dúvidas Frequentes antes da sua visita
                    </h2>
                  </div>

                  <div className="space-y-2">
                    {FAQ_LIST.map((item, idx) => {
                      const isOpen = activeFaqIndex === idx
                      return (
                        <div
                          key={item.q}
                          className={`rounded-xl border transition-all ${
                            isOpen
                              ? 'bg-zinc-950 border-[#D4AF37]/50'
                              : 'bg-zinc-950/60 border-zinc-800'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => setActiveFaqIndex(isOpen ? -1 : idx)}
                            className="w-full p-3 text-left flex items-center justify-between gap-2 text-xs md:text-sm font-medium text-zinc-100 hover:text-[#D4AF37] cursor-pointer"
                          >
                            <span>{item.q}</span>
                            <span className="font-mono text-xs text-[#D4AF37]">
                              {isOpen ? '−' : '+'}
                            </span>
                          </button>
                          {isOpen && (
                            <div className="px-3 pb-3 pt-1 text-xs text-zinc-300 font-light leading-relaxed border-t border-zinc-800/60">
                              {item.a}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Card de Fechamento Visagismo */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#4A3B6B]/25 via-zinc-900 to-[#D4AF37]/15 border border-[#D4AF37]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-base text-zinc-50">
                      Pronta para o espelho sorrir de volta pra você?
                    </h3>
                    <p className="text-xs text-zinc-300 font-light">
                      Reserve seu horário com escuta ativa e diagnóstico personalizado.
                    </p>
                  </div>
                  <Link
                    to="/contato"
                    className="px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E8C95D] text-zinc-950 text-xs font-bold uppercase tracking-wider shrink-0"
                  >
                    Agendar Agora
                  </Link>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* ── BARRA INFERIOR DE STATUS CAD (28px Fixa · Zero Scroll) ── */}
      <footer className="h-7 shrink-0 bg-zinc-950 border-t border-zinc-900 px-4 flex items-center justify-between text-[10px] font-mono text-zinc-400">
        <div className="flex items-center gap-3 truncate">
          <span className="text-[#D4AF37] font-semibold">
            ● ESTAÇÃO ATIVA: {STATIONS.find((s) => s.id === activeStation)?.code}
          </span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">
            ACERVO NATIVO @drika_hair_santana: 63 POSTS · 36 REELS MP4 · 17 DESTAQUES
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden md:inline text-zinc-500">
            REGRA CAD: BOTÕES COM TÍTULO = 1 CLIQUE · BOTÕES SÓ ÍCONE = INSPECIONA FUNÇÃO
          </span>
        </div>
      </footer>

      {/* ── MODAL DE INSPEÇÃO DE FUNÇÃO PARA BOTÕES DE ÍCONE (<DrikaActionGate />) ── */}
      <DrikaActionGate
        action={pendingAction}
        onConfirm={confirmAction}
        onCancel={cancelAction}
        directMode={directMode}
        onToggleDirectMode={toggleDirectMode}
      />

      {/* ── MODAIS NATIVOS DE VÍDEO MP4 / FOTO HD E STORIES ── */}
      <MediaInspectorModal post={inspectedPost} onClose={() => setInspectedPost(null)} />
      <StoryHighlightModal
        highlight={inspectedHighlight}
        onClose={() => setInspectedHighlight(null)}
      />
    </div>
  )
}
