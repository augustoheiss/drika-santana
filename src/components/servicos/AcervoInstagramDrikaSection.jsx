import React, { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Play,
  Film,
  Image as ImageIcon,
  Layers,
  Sparkles,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  ExternalLink,
  Eye,
  MapPin,
  Pin,
  MessageCircle,
  Coffee,
  Scissors,
  Filter,
} from 'lucide-react'
import {
  DRIKA_INSTAGRAM_PROFILE,
  DRIKA_ARCHIVE_CATEGORIES,
  DRIKA_INSTAGRAM_HIGHLIGHTS,
  DRIKA_INSTAGRAM_POSTS,
  getPostsByServiceId,
  getHighlightsByServiceId,
} from '../../data/instagramDrikaArchive'
import { DrikaCadIconButton } from '../ui/DrikaActionGate'

/**
 * Modal Nativo de Inspeção de Publicação / Reel MP4 (@drika_hair_santana)
 */
export function MediaInspectorModal({ post, onClose }) {
  const [slideIdx, setSlideIdx] = useState(0)

  useEffect(() => {
    setSlideIdx(0)
  }, [post])

  useEffect(() => {
    if (!post) return undefined
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [post, onClose])

  if (!post) return null

  const hasCarousel = Array.isArray(post.carouselSlides) && post.carouselSlides.length > 1
  const currentCarouselImage = hasCarousel ? post.carouselSlides[slideIdx]?.image : post.image
  const primaryServiceId = post.serviceIds?.[0] || 'corte'

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={post.title}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90dvh] rounded-2xl bg-zinc-950 border border-[#D4AF37]/40 shadow-[0_0_70px_rgba(0,0,0,0.9)] overflow-hidden grid grid-cols-1 lg:grid-cols-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Coluna de Mídia Nativa (Vídeo MP4 Local ou Foto HD) */}
        <div className="lg:col-span-7 bg-black flex flex-col items-center justify-center relative min-h-[300px] max-h-[52dvh] lg:max-h-[88dvh] overflow-hidden border-b lg:border-b-0 lg:border-r border-zinc-800">
          {post.video ? (
            <video
              key={post.video}
              src={post.video}
              poster={post.image}
              controls
              autoPlay
              playsInline
              preload="metadata"
              className="w-full h-full max-h-[50dvh] lg:max-h-[84dvh] object-contain bg-black"
            />
          ) : (
            <img
              src={currentCarouselImage}
              alt={post.title}
              className="w-full h-full max-h-[50dvh] lg:max-h-[84dvh] object-contain bg-black"
            />
          )}

          {/* Controles de Carrossel se houver múltiplos slides */}
          {hasCarousel && !post.video && (
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between bg-zinc-950/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-zinc-800">
              <button
                type="button"
                onClick={() =>
                  setSlideIdx((prev) => (prev === 0 ? post.carouselSlides.length - 1 : prev - 1))
                }
                className="p-1 text-zinc-300 hover:text-[#D4AF37] cursor-pointer"
                aria-label="Slide anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-mono text-[11px] text-[#D4AF37]">
                Slide {slideIdx + 1} / {post.carouselSlides.length}
              </span>
              <button
                type="button"
                onClick={() =>
                  setSlideIdx((prev) => (prev === post.carouselSlides.length - 1 ? 0 : prev + 1))
                }
                className="p-1 text-zinc-300 hover:text-[#D4AF37] cursor-pointer"
                aria-label="Próximo slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Badge de Mídia Local */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-zinc-950/90 border border-[#D4AF37]/40 text-[#D4AF37] font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
              {post.video ? <Film className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
              {post.video ? 'REEL MP4 NATIVO' : hasCarousel ? 'CARROSSEL HD' : 'FOTO HD NATIVA'}
            </span>
            {post.isPinned && (
              <span className="px-2 py-1 rounded-md bg-[#D4AF37] text-zinc-950 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <Pin className="w-3 h-3" /> Fixado
              </span>
            )}
          </div>
        </div>

        {/* Coluna de Ficha Técnica, Legenda & Ação */}
        <div className="lg:col-span-5 flex flex-col max-h-[38dvh] lg:max-h-[88dvh] bg-zinc-950">
          {/* Header do Perfil */}
          <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between shrink-0 bg-zinc-900/50">
            <div className="flex items-center gap-3">
              <img
                src={DRIKA_INSTAGRAM_PROFILE.avatarHd}
                alt={DRIKA_INSTAGRAM_PROFILE.fullName}
                className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-sm font-semibold text-zinc-100">
                    {DRIKA_INSTAGRAM_PROFILE.handle}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                </div>
                <span className="block text-[11px] text-zinc-400">
                  {post.categoryLabel} · {post.dateBR}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar visor de mídia"
              className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-[#D4AF37]/50 flex items-center justify-center text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Conteúdo Rolável Interno */}
          <div className="p-4 space-y-4 overflow-y-auto flex-1">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#D4AF37]">
                Transformação Catalogada #{post.code}
              </span>
              <h3 className="font-serif text-lg text-zinc-50 mt-1 leading-snug">{post.title}</h3>
            </div>

            {/* Leitura Técnica de Visagismo */}
            <div className="p-3.5 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 space-y-1.5">
              <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#D4AF37] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Leitura de Visagismo & Ciência do Fio</span>
              </div>
              <p className="text-xs text-zinc-200 leading-relaxed font-light">
                {post.technicalSummary}
              </p>
            </div>

            {/* Legenda Original do Instagram */}
            <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800/80 space-y-1.5">
              <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                Legenda Original no Instagram:
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line font-light">
                {post.caption}
              </p>
            </div>
          </div>

          {/* Rodapé de Ação Direta (Botões com Título = 1 Clique) */}
          <div className="p-4 border-t border-zinc-800/80 bg-zinc-900/40 shrink-0 flex flex-col sm:flex-row items-center gap-2.5">
            <Link
              to={`/contato?servico=${primaryServiceId}`}
              onClick={onClose}
              className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#E8C95D] text-zinc-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(212,175,55,0.25)]"
            >
              <Calendar className="w-4 h-4" />
              <span>Quero Esse Resultado</span>
            </Link>
            <a
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto py-2.5 px-3.5 rounded-xl border border-zinc-700 hover:border-[#D4AF37]/50 text-zinc-300 hover:text-[#D4AF37] text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Post Original</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Modal Player Nativo de Destaques dos Stories (Highlights)
 */
export function StoryHighlightModal({ highlight, onClose }) {
  const [slideIdx, setSlideIdx] = useState(0)

  useEffect(() => {
    setSlideIdx(0)
  }, [highlight])

  useEffect(() => {
    if (!highlight) return undefined
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose?.()
      if (e.key === 'ArrowRight') {
        setSlideIdx((prev) =>
          prev < (highlight.slides?.length || 1) - 1 ? prev + 1 : prev
        )
      }
      if (e.key === 'ArrowLeft') {
        setSlideIdx((prev) => (prev > 0 ? prev - 1 : prev))
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [highlight, onClose])

  if (!highlight) return null

  const slides = highlight.slides || []
  const currentSlide = slides[slideIdx] || { image: highlight.cover, mediaType: 'image' }
  const primaryServiceId = highlight.serviceIds?.[0] || 'corte'

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Destaque: ${highlight.title}`}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl bg-zinc-950 border border-[#D4AF37]/40 shadow-[0_0_70px_rgba(0,0,0,0.9)] overflow-hidden grid grid-cols-1 md:grid-cols-12 max-h-[90dvh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Visor Vertical 9:16 do Story */}
        <div className="md:col-span-7 bg-black relative flex flex-col items-center justify-center min-h-[360px] max-h-[58dvh] md:max-h-[86dvh] overflow-hidden">
          {/* Barras de Progresso de Story */}
          <div className="absolute top-3 inset-x-3 z-20 flex items-center gap-1">
            {slides.map((s, idx) => (
              <button
                key={s.code || idx}
                type="button"
                onClick={() => setSlideIdx(idx)}
                aria-label={`Ir para story ${idx + 1}`}
                className="flex-1 h-1 rounded-full overflow-hidden bg-zinc-700/70 cursor-pointer"
              >
                <div
                  className={`h-full transition-all ${
                    idx <= slideIdx ? 'bg-[#D4AF37]' : 'bg-transparent'
                  }`}
                />
              </button>
            ))}
          </div>

          {currentSlide.video ? (
            <video
              key={currentSlide.video}
              src={currentSlide.video}
              poster={currentSlide.image}
              controls
              autoPlay
              playsInline
              className="w-full h-full max-h-[55dvh] md:max-h-[82dvh] object-contain"
            />
          ) : (
            <img
              src={currentSlide.image}
              alt={`${highlight.title} — Story ${slideIdx + 1}`}
              className="w-full h-full max-h-[55dvh] md:max-h-[82dvh] object-contain"
            />
          )}

          {/* Setas Laterais */}
          {slides.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setSlideIdx((prev) => (prev > 0 ? prev - 1 : slides.length - 1))}
                aria-label="Story anterior"
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-zinc-950/80 border border-zinc-700 hover:border-[#D4AF37] text-zinc-200 flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setSlideIdx((prev) => (prev < slides.length - 1 ? prev + 1 : 0))}
                aria-label="Próximo story"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-zinc-950/80 border border-zinc-700 hover:border-[#D4AF37] text-zinc-200 flex items-center justify-center cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Painel Contextual do Destaque */}
        <div className="md:col-span-5 p-5 flex flex-col justify-between bg-zinc-950 border-t md:border-t-0 md:border-l border-zinc-800">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={highlight.cover}
                  alt={highlight.title}
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#D4AF37]"
                />
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-[#D4AF37]">
                    {highlight.category}
                  </span>
                  <h3 className="font-serif text-lg text-zinc-50">{highlight.title}</h3>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar story"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-[#D4AF37]/50 flex items-center justify-center text-zinc-400 hover:text-zinc-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-2">
              <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                Slide {slideIdx + 1} de {slides.length} salvos localmente (
                {highlight.totalSlidesOnInstagram} no destaque original)
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                {highlight.summary}
              </p>
              {currentSlide.dateBR && currentSlide.dateBR !== 'N/A' && (
                <p className="font-mono text-[10px] text-[#D4AF37]">
                  Publicado em: {currentSlide.dateBR}
                </p>
              )}
            </div>
          </div>

          <div className="pt-4 space-y-2 border-t border-zinc-900">
            <Link
              to={`/contato?servico=${primaryServiceId}`}
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#E8C95D] text-zinc-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Horário</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Tira Contextual de Provas Reais do Instagram dentro da Ficha de cada Serviço (EST-02)
 * - Cliques em botões COM título abrem direto em 1 clique.
 * - Cliques em botões SÓ DE ÍCONE acionam o <DrikaActionGate /> para mostrar a função e confirmar.
 */
export function ProvasReaisServico({
  serviceId,
  serviceTitle,
  onSelectPost,
  onSelectHighlight,
  onRequestIconAction,
}) {
  const posts = useMemo(() => getPostsByServiceId(serviceId, 4), [serviceId])
  const highlights = useMemo(() => getHighlightsByServiceId(serviceId), [serviceId])

  if (posts.length === 0) return null

  return (
    <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/90 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#D4AF37] font-semibold">
            Provas Reais no Instagram ({DRIKA_INSTAGRAM_PROFILE.handle})
          </span>
        </div>

        {/* Anéis de Ícone dos Destaques relacionados (Só ícone -> abre confirmação de função!) */}
        {highlights.length > 0 && (
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono text-zinc-400 mr-1">Stories:</span>
            {highlights.slice(0, 4).map((hl) => (
              <button
                key={hl.id}
                type="button"
                aria-label={`Inspecionar Story Destaque: ${hl.title}`}
                onClick={() =>
                  onRequestIconAction
                    ? onRequestIconAction({
                        code: `STORY-${hl.numericId.slice(-4)}`,
                        category: 'Destaque de Stories (@drika_hair_santana)',
                        title: `Abrir Destaque: "${hl.title}" (${hl.slides.length} stories nativos)`,
                        description: hl.summary,
                        previewImage: hl.cover,
                        badge: `${hl.slides.length} SLIDES NATIVOS`,
                        destination: 'Player Nativo de Stories',
                        confirmLabel: 'Abrir Stories Agora',
                        onConfirm: () => onSelectHighlight?.(hl),
                      })
                    : onSelectHighlight?.(hl)
                }
                className="w-7 h-7 rounded-full p-0.5 bg-gradient-to-tr from-[#D4AF37] to-[#4A3B6B] hover:scale-110 transition-transform cursor-pointer"
              >
                <img
                  src={hl.cover}
                  alt={hl.title}
                  className="w-full h-full rounded-full object-cover border border-zinc-950"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {posts.map((post) => (
          <div
            key={post.id}
            className="group relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 hover:border-[#D4AF37]/50 transition-all flex flex-col"
          >
            <div className="relative aspect-[4/4] overflow-hidden bg-black">
              <img
                src={post.image}
                alt={post.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

              {/* Badge de Vídeo Nativo */}
              <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-zinc-950/90 border border-[#D4AF37]/40 text-[#D4AF37] font-mono text-[9px] uppercase">
                {post.video ? 'REEL MP4' : 'FOTO HD'}
              </span>

              {/* Botão SÓ DE ÍCONE no canto superior direito -> Aciona <DrikaActionGate /> */}
              <div className="absolute top-2 right-2">
                <DrikaCadIconButton
                  size="sm"
                  variant="gold-outline"
                  ariaLabel={`Inspecionar ficha técnica do post ${post.code}`}
                  icon={post.video ? <Play className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  onClick={() =>
                    onRequestIconAction
                      ? onRequestIconAction({
                          code: `IG-${post.code}`,
                          category: `Prova Real · ${serviceTitle || post.categoryLabel}`,
                          title: post.title,
                          description: post.technicalSummary,
                          drikaTip: `Publicado em ${post.dateBR} no perfil oficial @drika_hair_santana.`,
                          previewImage: post.image,
                          badge: post.video ? 'REEL MP4 NATIVO' : 'FOTO HD LOCAL',
                          destination: 'Visor Multimídia em Alta Definição',
                          confirmLabel: post.video ? 'Reproduzir Vídeo Nativo' : 'Abrir Foto HD',
                          onConfirm: () => onSelectPost?.(post),
                        })
                      : onSelectPost?.(post)
                  }
                />
              </div>
            </div>

            {/* Botão COM TÍTULO na base do card -> Abre direto em 1 clique sem modal de confirmação! */}
            <button
              type="button"
              onClick={() => onSelectPost?.(post)}
              className="p-2 text-left hover:bg-zinc-900/80 transition-colors cursor-pointer flex-1 flex flex-col justify-between"
            >
              <p className="text-[11px] text-zinc-200 font-medium line-clamp-2 leading-snug group-hover:text-[#D4AF37] transition-colors">
                {post.title}
              </p>
              <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-mono text-[#D4AF37]">
                <Play className="w-2.5 h-2.5" /> Abrir Transformação
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Estação Completa do Acervo Nativo do Instagram (@drika_hair_santana)
 * Pode operar na Estação 03 (Galeria de Reels & Fotos) e na Estação 04 (Stories & Bastidores).
 */
export default function AcervoInstagramDrikaSection({
  mode = 'gallery', // 'gallery' | 'stories'
  onRequestIconAction,
  onSelectPost,
  onSelectHighlight,
}) {
  const [selectedCategory, setSelectedCategory] = useState('todos')
  const [onlyVideos, setOnlyVideos] = useState(false)

  const filteredPosts = useMemo(() => {
    return DRIKA_INSTAGRAM_POSTS.filter((p) => {
      const catOk = selectedCategory === 'todos' || p.category === selectedCategory
      const vidOk = !onlyVideos || p.hasLocalVideo
      return catOk && vidOk
    })
  }, [selectedCategory, onlyVideos])

  if (mode === 'stories') {
    return (
      <div className="h-full flex flex-col gap-4 overflow-hidden">
        {/* Cabeçalho do Perfil Oficial */}
        <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={DRIKA_INSTAGRAM_PROFILE.avatarHd}
                alt={DRIKA_INSTAGRAM_PROFILE.fullName}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#D4AF37]"
              />
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-[#D4AF37] text-zinc-950 font-mono text-[9px] font-bold">
                HD
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl text-zinc-50">
                  {DRIKA_INSTAGRAM_PROFILE.fullName}
                </h2>
                <span className="font-mono text-xs text-[#D4AF37]">
                  {DRIKA_INSTAGRAM_PROFILE.handle}
                </span>
              </div>
              <p className="text-xs text-zinc-300 mt-1 max-w-xl leading-relaxed">
                {DRIKA_INSTAGRAM_PROFILE.bioLines.join(' · ')}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] font-mono text-zinc-400">
                <span>
                  <strong className="text-zinc-100">{DRIKA_INSTAGRAM_PROFILE.postsCount}</strong>{' '}
                  publicações
                </span>
                <span>•</span>
                <span>
                  <strong className="text-zinc-100">
                    {DRIKA_INSTAGRAM_PROFILE.followersCount}
                  </strong>{' '}
                  seguidores
                </span>
                <span>•</span>
                <span className="text-[#D4AF37]">
                  17 Destaques de Stories salvos nativamente no site
                </span>
              </div>
            </div>
          </div>

          {/* Barra de Ícones Rápidos do Perfil (Só Ícone -> Aciona <DrikaActionGate />) */}
          <div className="flex items-center gap-2 self-end md:self-center">
            <DrikaCadIconButton
              variant="gold-outline"
              ariaLabel="Inspecionar localização SP e Paraná"
              icon={<MapPin className="w-4 h-4" />}
              onClick={() =>
                onRequestIconAction?.({
                  code: 'IG-LOC-SP-PR',
                  category: 'Atendimento Presencial',
                  title: 'Unidades de Atendimento: São Paulo (Itaquera) & Paraná',
                  description:
                    'A Drika atende presencialmente no Studio em Itaquera (Rua Eng. Villares da Silva, 885 — SP) e realiza temporadas especiais com agenda aberta em Itambé, Floresta e Maringá (PR).',
                  drikaTip: 'Consulte a temporada atual diretamente pelo WhatsApp antes de agendar.',
                  destination: 'Destaque Paraná PR',
                  confirmLabel: 'Ver Destaque Paraná PR',
                  onConfirm: () => {
                    const prHl = DRIKA_INSTAGRAM_HIGHLIGHTS.find((h) => h.slug.includes('parana'))
                    if (prHl) onSelectHighlight?.(prHl)
                  },
                })
              }
            />
            <DrikaCadIconButton
              variant="gold-outline"
              ariaLabel="Conversar com a Drika no WhatsApp"
              icon={<MessageCircle className="w-4 h-4" />}
              onClick={() =>
                onRequestIconAction?.({
                  code: 'IG-WA-DIRECT',
                  category: 'Canal Direto da Bio',
                  title: 'Abrir Conversa Direta no WhatsApp da Drika',
                  description:
                    'Conecta você diretamente ao WhatsApp oficial (+55 11 97846-6027) que consta na bio do Instagram @drika_hair_santana.',
                  destination: 'WhatsApp Oficial Drika Santana',
                  confirmLabel: 'Abrir WhatsApp',
                  onConfirm: () =>
                    window.open(DRIKA_INSTAGRAM_PROFILE.whatsappUrl, '_blank', 'noopener,noreferrer'),
                })
              }
            />
          </div>
        </div>

        {/* Barra de Anéis de Ícone (Só Ícone -> Aciona <DrikaActionGate />) */}
        <div className="px-4 py-2.5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 flex items-center gap-3 overflow-x-auto shrink-0">
          <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 shrink-0">
            Anéis Rápidos (Ícone = Inspeciona):
          </span>
          {DRIKA_INSTAGRAM_HIGHLIGHTS.map((hl) => (
            <button
              key={`ring-${hl.id}`}
              type="button"
              aria-label={`Inspecionar destaque ${hl.title}`}
              onClick={() =>
                onRequestIconAction?.({
                  code: `HL-${hl.id.toUpperCase()}`,
                  category: `Destaque · ${hl.category}`,
                  title: `Destaque "${hl.title}" (${hl.slides.length} slides locais)`,
                  description: hl.summary,
                  previewImage: hl.cover,
                  badge: `${hl.totalSlidesOnInstagram} STORIES NO IG`,
                  destination: 'Player Nativo 9:16',
                  confirmLabel: 'Abrir Destaque',
                  onConfirm: () => onSelectHighlight?.(hl),
                })
              }
              className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#D4AF37] via-[#E8C95D] to-[#4A3B6B] shrink-0 hover:scale-105 transition-transform cursor-pointer"
            >
              <img
                src={hl.cover}
                alt={hl.title}
                className="w-full h-full rounded-full object-cover border-2 border-zinc-950"
              />
            </button>
          ))}
        </div>

        {/* Grid de Cards dos 17 Destaques (Com Título visível -> Abre direto em 1 clique!) */}
        <div className="flex-1 min-h-0 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {DRIKA_INSTAGRAM_HIGHLIGHTS.map((hl) => (
            <div
              key={hl.id}
              className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <img
                  src={hl.cover}
                  alt={hl.title}
                  loading="lazy"
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#D4AF37] shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#D4AF37]">
                      {hl.category}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-400">
                      {hl.slides.length} slides
                    </span>
                  </div>
                  <h3 className="font-serif text-base text-zinc-100 mt-0.5 truncate">
                    {hl.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-light line-clamp-2 mt-1">
                    {hl.summary}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-zinc-800/70">
                {/* Botão COM título -> 1 clique direto */}
                <button
                  type="button"
                  onClick={() => onSelectHighlight?.(hl)}
                  className="flex-1 py-2 px-3 rounded-xl bg-zinc-950 hover:bg-[#D4AF37] text-zinc-200 hover:text-zinc-950 border border-zinc-800 hover:border-[#D4AF37] text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Assistir "{hl.title}"</span>
                </button>

                {/* Botão SÓ DE ÍCONE -> Aciona <DrikaActionGate /> */}
                <DrikaCadIconButton
                  size="sm"
                  ariaLabel={`Inspecionar detalhes do destaque ${hl.title}`}
                  icon={<Eye className="w-3.5 h-3.5" />}
                  onClick={() =>
                    onRequestIconAction?.({
                      code: `HL-${hl.id.toUpperCase()}`,
                      category: `Ficha de Destaque · ${hl.category}`,
                      title: `Destaque: ${hl.title}`,
                      description: hl.summary,
                      previewImage: hl.cover,
                      badge: `${hl.slides.length} SLIDES SALVOS`,
                      destination: 'Player Nativo de Stories',
                      confirmLabel: 'Confirmar e Assistir',
                      onConfirm: () => onSelectHighlight?.(hl),
                    })
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Modo Padrão: Galeria Filtrável de Transformações, Reels MP4 e Fotos HD
  return (
    <div className="h-full flex flex-col gap-3 overflow-hidden">
      {/* Barra de Filtros e Controles */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-zinc-900/60 border border-zinc-800/90 p-2.5 rounded-2xl shrink-0">
        {/* Botões de Categoria COM Título (1 Clique Direto) */}
        <div className="flex flex-wrap items-center gap-1.5">
          {DRIKA_ARCHIVE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#D4AF37] text-zinc-950 font-semibold shadow-[0_0_20px_rgba(212,175,55,0.25)]'
                    : 'bg-zinc-950/90 text-zinc-300 border border-zinc-800 hover:border-[#D4AF37]/40'
                }`}
              >
                <span>{cat.shortLabel}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-zinc-950/20 text-zinc-950' : 'bg-zinc-900 text-[#D4AF37]'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Controles à direita: Filtro de Vídeos MP4 + Ícone de Inspeção */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOnlyVideos((v) => !v)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider border transition-all cursor-pointer flex items-center gap-1.5 ${
              onlyVideos
                ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]'
                : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Reels MP4 ({DRIKA_INSTAGRAM_PROFILE.extractedVideosCount})</span>
          </button>

          {/* Botão SÓ DE ÍCONE: Manifesto Fixado da Drika */}
          <DrikaCadIconButton
            size="sm"
            variant="gold-outline"
            ariaLabel="Inspecionar vídeo manifesto fixado da Drika"
            icon={<Pin className="w-3.5 h-3.5" />}
            onClick={() => {
              const pinned = DRIKA_INSTAGRAM_POSTS.find((p) => p.isPinned) || DRIKA_INSTAGRAM_POSTS[0]
              onRequestIconAction?.({
                code: 'IG-PINNED-REEL',
                category: 'Vídeo Manifesto Fixado',
                title: pinned.title,
                description: pinned.technicalSummary,
                drikaTip: 'Este é o vídeo principal fixado no topo do Instagram @drika_hair_santana.',
                previewImage: pinned.image,
                badge: 'REEL MP4 NATIVO',
                destination: 'Player de Vídeo em Tela Cheia',
                confirmLabel: 'Assistir Manifesto da Drika',
                onConfirm: () => onSelectPost?.(pinned),
              })
            }}
          />
        </div>
      </div>

      {/* Grid Rolável Interno de Transformações Nativas */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="group rounded-2xl overflow-hidden border border-zinc-800/90 bg-zinc-900/50 hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between"
          >
            <div className="relative aspect-[4/4.3] bg-black overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/15 to-transparent" />

              {/* Badges Superiores */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-zinc-950/90 border border-[#D4AF37]/40 text-[#D4AF37] font-mono text-[10px] font-semibold uppercase flex items-center gap-1">
                  {post.hasLocalVideo ? (
                    <>
                      <Film className="w-3 h-3" /> REEL MP4
                    </>
                  ) : post.mediaType === 'carousel' ? (
                    <>
                      <Layers className="w-3 h-3" /> CARROSSEL
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-3 h-3" /> FOTO HD
                    </>
                  )}
                </span>
                {post.isPinned && (
                  <span className="px-2 py-0.5 rounded-md bg-[#D4AF37] text-zinc-950 font-mono text-[10px] font-bold uppercase">
                    FIXADO
                  </span>
                )}
              </div>

              {/* Botões SÓ DE ÍCONE no canto superior direito (Acionam <DrikaActionGate />!) */}
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                <DrikaCadIconButton
                  size="sm"
                  variant="gold-outline"
                  ariaLabel={`Inspecionar leitura técnica de ${post.code}`}
                  icon={<Eye className="w-3.5 h-3.5" />}
                  onClick={() =>
                    onRequestIconAction?.({
                      code: `IG-${post.code}`,
                      category: post.categoryLabel,
                      title: post.title,
                      description: post.technicalSummary,
                      drikaTip: post.caption.slice(0, 140) + '...',
                      previewImage: post.image,
                      badge: post.hasLocalVideo ? 'REEL MP4 LOCAL' : 'ACERVO HD LOCAL',
                      destination: 'Visor Multimídia Nativo',
                      confirmLabel: post.hasLocalVideo ? 'Abrir e Dar Play no Reel' : 'Abrir Publicação',
                      onConfirm: () => onSelectPost?.(post),
                    })
                  }
                />
              </div>

              {/* Data e Categoria na base da foto */}
              <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono text-zinc-300">
                <span className="text-[#D4AF37]">{post.categoryLabel}</span>
                <span>{post.dateBR}</span>
              </div>
            </div>

            {/* Corpo clicável COM Título (1 clique direto sem modal de confirmação!) */}
            <div className="p-3 flex-1 flex flex-col justify-between gap-2.5">
              <div>
                <h3 className="font-serif text-sm text-zinc-100 line-clamp-2 leading-snug group-hover:text-[#D4AF37] transition-colors">
                  {post.title}
                </h3>
                <p className="text-[11px] text-zinc-400 font-light line-clamp-2 mt-1">
                  {post.technicalSummary}
                </p>
              </div>

              <div className="pt-2 border-t border-zinc-800/70 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onSelectPost?.(post)}
                  className="flex-1 py-1.5 px-3 rounded-xl bg-zinc-950 hover:bg-[#D4AF37] text-zinc-200 hover:text-zinc-950 border border-zinc-800 hover:border-[#D4AF37] text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3 h-3" />
                  <span>{post.hasLocalVideo ? 'Assistir Reel' : 'Ver Detalhes'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
