import React, { useState, useEffect, useCallback } from 'react'
import { Sparkles, CheckCircle2, X, Zap, ShieldCheck, Coffee, Layers } from 'lucide-react'

const STORAGE_KEY = 'drika_cad_direct_mode'

/**
 * Hook de governança de interação estilo Sekundo / CAD para o Studio Drika Santana.
 *
 * REGRA DE OURO DO USUÁRIO:
 * - Botões COM título visível na tela executam diretamente em 1 clique (sem modal de confirmação).
 * - Botões que são SÓ UM ÍCONE (`isIconOnly: true` / `requestIconAction`) abrem o inspetor de
 *   funcionalidade (<DrikaActionGate />) mostrando o que aquele ícone faz e pedindo confirmação
 *   se a usuária deseja realmente abrir aquela função.
 */
export function useDrikaActionGate() {
  const [pendingAction, setPendingAction] = useState(null)
  const [directMode, setDirectMode] = useState(() => {
    try {
      return window.sessionStorage.getItem(STORAGE_KEY) === 'true'
    } catch {
      return false
    }
  })

  const toggleDirectMode = useCallback(() => {
    setDirectMode((prev) => {
      const next = !prev
      try {
        window.sessionStorage.setItem(STORAGE_KEY, String(next))
      } catch {
        // Ignora falhas de sessionStorage em WebViews restritas
      }
      return next
    })
  }, [])

  /**
   * Aciona o inspetor de funcionalidade SOMENTE para botões que são apenas ícone (ou quando isIconOnly !== false).
   * Se `hasVisibleTitle: true` for passado, executa imediatamente sem abrir o modal.
   */
  const requestAction = useCallback(
    (actionPayload) => {
      if (!actionPayload) return
      if (actionPayload.hasVisibleTitle === true || actionPayload.isIconOnly === false || directMode) {
        actionPayload.onConfirm?.()
        return
      }
      setPendingAction(actionPayload)
    },
    [directMode]
  )

  /**
   * Atalho explícito para botões que possuem apenas ícone na interface CAD.
   */
  const requestIconAction = useCallback(
    (actionPayload) => {
      if (!actionPayload) return
      if (directMode) {
        actionPayload.onConfirm?.()
        return
      }
      setPendingAction({ ...actionPayload, isIconOnly: true })
    },
    [directMode]
  )

  const confirmAction = useCallback(() => {
    if (!pendingAction) return
    const callback = pendingAction.onConfirm
    setPendingAction(null)
    callback?.()
  }, [pendingAction])

  const cancelAction = useCallback(() => {
    setPendingAction(null)
  }, [])

  return {
    pendingAction,
    directMode,
    toggleDirectMode,
    requestAction,
    requestIconAction,
    confirmAction,
    cancelAction,
  }
}

/**
 * Botão de alternância na barra CAD para permitir que até os ícones abram em 1 clique se a usuária desejar.
 */
export function DrikaDirectModeToggle({ directMode, onToggle, className = '' }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      title={
        directMode
          ? 'Modo 1-Clique ativo: ícones abrem direto sem inspeção prévia'
          : 'Modo CAD ativo: clicar em um botão de ícone exibe sua funcionalidade antes de abrir'
      }
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all border cursor-pointer ${
        directMode
          ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60'
          : 'bg-zinc-900/90 border-[#D4AF37]/40 text-[#D4AF37] hover:border-[#D4AF37]'
      } ${className}`}
    >
      {directMode ? (
        <>
          <Zap className="w-3 h-3 text-emerald-400" />
          <span>Ícones: 1-Clique</span>
        </>
      ) : (
        <>
          <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
          <span>Ícones: Inspecionar Função</span>
        </>
      )}
    </button>
  )
}

/**
 * Botão CAD exclusivamente de Ícone (Sem texto visível).
 * Ao clicar neste botão de ícone, o <DrikaActionGate /> se abre revelando sua funcionalidade
 * e confirmando se a usuária quer abrir aquela função.
 */
export function DrikaCadIconButton({
  icon,
  active = false,
  badge = null,
  ariaLabel,
  onClick,
  size = 'md',
  variant = 'default',
  className = '',
}) {
  const sizeClasses =
    size === 'sm'
      ? 'w-8 h-8 rounded-lg'
      : size === 'lg'
        ? 'w-12 h-12 rounded-xl'
        : 'w-10 h-10 rounded-xl'

  const variantClasses = active
    ? 'bg-[#D4AF37] text-zinc-950 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.35)]'
    : variant === 'gold-outline'
      ? 'bg-zinc-900/90 text-[#D4AF37] border-[#D4AF37]/40 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10'
      : 'bg-zinc-900/80 text-zinc-300 border-zinc-800 hover:border-[#D4AF37]/50 hover:text-[#D4AF37] hover:bg-zinc-900'

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center border transition-all duration-200 cursor-pointer active:scale-95 ${sizeClasses} ${variantClasses} ${className}`}
    >
      {icon}
      {badge !== null && badge !== undefined && (
        <span
          className={`absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full text-[9px] font-mono font-bold flex items-center justify-center border ${
            active
              ? 'bg-zinc-950 text-[#D4AF37] border-[#D4AF37]'
              : 'bg-[#D4AF37] text-zinc-950 border-zinc-950'
          }`}
        >
          {badge}
        </span>
      )}
    </button>
  )
}

/**
 * Modal de Inspeção de Funcionalidade e Confirmação (Exibido ao clicar em botões de Ícone).
 */
export default function DrikaActionGate({
  action,
  onConfirm,
  onCancel,
  directMode = false,
  onToggleDirectMode,
}) {
  useEffect(() => {
    if (!action) return undefined
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onCancel?.()
      } else if (e.key === 'Enter') {
        e.preventDefault()
        onConfirm?.()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [action, onCancel, onConfirm])

  if (!action) return null

  return (
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="drika-gate-title"
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-zinc-950 border border-[#D4AF37]/50 shadow-[0_0_60px_rgba(212,175,55,0.18)] overflow-hidden text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Linha superior dourada */}
        <div className="h-1 w-full bg-gradient-to-r from-[#4A3B6B] via-[#D4AF37] to-[#4A3B6B]" />

        {/* Cabeçalho CAD */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-zinc-900/90 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37]">
              {action.icon || <Layers className="w-4 h-4" />}
            </span>
            <div>
              <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                {action.code || 'DRK-CAD-ICON'} · {action.category || 'Inspeção de Ícone da Bancada'}
              </span>
              <span className="block text-[11px] text-zinc-400">
                Funcionalidade do botão de ícone selecionado
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onCancel}
            aria-label="Fechar janela de inspeção"
            className="w-7 h-7 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-[#D4AF37]/50 flex items-center justify-center text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Corpo da Funcionalidade */}
        <div className="p-5 space-y-4">
          {action.previewImage && (
            <div className="flex items-center gap-3.5 p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <img
                src={action.previewImage}
                alt={action.title}
                className="w-14 h-14 rounded-lg object-cover border border-[#D4AF37]/30 shrink-0"
              />
              <div className="min-w-0">
                <span className="inline-block px-2 py-0.5 rounded bg-[#D4AF37]/15 text-[#D4AF37] font-mono text-[10px] uppercase tracking-wider mb-1">
                  {action.badge || 'Mídia Nativa'}
                </span>
                <p className="text-xs text-zinc-300 line-clamp-2 font-light">
                  {action.subtitle || 'Arquivo carregado localmente sem depender de iframes externos.'}
                </p>
              </div>
            </div>
          )}

          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-1">
              Função Identificada:
            </p>
            <h3 id="drika-gate-title" className="text-lg font-serif text-zinc-50 leading-snug">
              {action.title}
            </h3>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800/90 space-y-2">
            <p className="text-xs text-zinc-300 leading-relaxed font-light">
              {action.description ||
                'Esta ferramenta abre o módulo correspondente diretamente no visor central da bancada sem recarregar nem rolar a página.'}
            </p>

            {action.drikaTip && (
              <div className="pt-2 border-t border-zinc-800/80 flex items-start gap-2 text-[11px] text-[#D4AF37]">
                <Coffee className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>
                  <strong className="uppercase tracking-wider text-[10px]">Papo de Café:</strong>{' '}
                  {action.drikaTip}
                </span>
              </div>
            )}

            {action.destination && (
              <div className="pt-1.5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>DESTINO NA BANCADA:</span>
                <span className="text-[#D4AF37] truncate max-w-[230px]">{action.destination}</span>
              </div>
            )}
          </div>

          <p className="text-xs text-zinc-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span>Deseja confirmar e abrir esta função agora?</span>
          </p>

          {/* Botões com Título (Executam imediatamente em 1 clique) */}
          <div className="flex items-center gap-2.5 pt-1">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2.5 px-3 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold text-zinc-300 transition-colors cursor-pointer"
            >
              Cancelar (ESC)
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="flex-[1.6] py-2.5 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#E8C95D] text-zinc-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all cursor-pointer active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{action.confirmLabel || 'Confirmar e Abrir'}</span>
            </button>
          </div>
        </div>

        {/* Rodapé com opção de 1-clique para ícones */}
        {onToggleDirectMode && (
          <div className="px-5 py-2.5 bg-zinc-900/60 border-t border-zinc-900 flex items-center justify-between text-[11px] text-zinc-400">
            <span>Quer abrir botões de ícone sem confirmar?</span>
            <button
              type="button"
              onClick={onToggleDirectMode}
              className="font-mono text-[10px] uppercase tracking-wider font-semibold text-[#D4AF37] hover:underline cursor-pointer"
            >
              {directMode ? 'Manter confirmação de ícones' : 'Ativar 1-Clique para ícones'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
