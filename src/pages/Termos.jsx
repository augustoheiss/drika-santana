import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Shield, FileText, Scale, Lock, UserCheck, Cookie, Mail } from 'lucide-react'

/* ─── Animation Variants ─────────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut', delay },
  }),
}

/* ─── Legal Section Component ────────────────────────────────────────────── */

function LegalSection({ icon, number, title, children }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={fadeUp}
      custom={0.05}
      className="mb-10"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center justify-center w-9 h-9 border border-[#D4AF37]/30 bg-[#D4AF37]/5">
          {icon}
        </div>
        <h2 className="font-serif text-xl md:text-2xl text-zinc-100">
          <span className="text-[#D4AF37] mr-2">{number}</span>
          {title}
        </h2>
      </div>
      <div className="pl-12 space-y-4 text-zinc-400 text-sm md:text-base font-light leading-relaxed">
        {children}
      </div>
    </motion.section>
  )
}

function LegalSubSection({ number, title, children }) {
  return (
    <div className="mb-6">
      <h3 className="text-zinc-300 font-medium text-sm md:text-base mb-2">
        <span className="text-[#D4AF37]/80 mr-1.5">{number}</span>
        {title}
      </h3>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  TERMOS PAGE                                                               */
/* ═══════════════════════════════════════════════════════════════════════════ */

export default function Termos() {
  return (
    <div className="bg-zinc-950 min-h-screen pt-16">

      {/* ── Hero header ── */}
      <section className="relative py-20 px-6 border-b border-zinc-900 overflow-hidden text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-[#4A3B6B] opacity-[0.08] blur-[120px]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] rounded-full bg-[#D4AF37] opacity-[0.04] blur-[80px]" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative z-10 max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-px bg-[#D4AF37]/40" />
            <Shield size={15} className="text-[#D4AF37]/60" />
            <div className="w-12 h-px bg-[#D4AF37]/40" />
          </div>

          <div className="inline-flex items-center gap-2.5 mb-6">
            <Scale size={16} className="text-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium">
              Conformidade LGPD
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-5xl text-zinc-50 leading-tight mb-6">
            Termos de Uso e{' '}
            <span className="text-[#D4AF37] italic">Política de Privacidade</span>
          </h1>

          <p className="text-zinc-500 text-sm font-light">
            Última atualização: 12 de abril de 2026
          </p>
        </motion.div>
      </section>

      {/* ── Content ── */}
      <div className="relative max-w-3xl mx-auto px-6 py-16 md:py-24">

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link
            to="/"
            id="termos-back-button"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 border border-zinc-800 text-zinc-400 text-sm font-light tracking-wide rounded-sm transition-all duration-300 hover:border-[#D4AF37]/40 hover:text-[#D4AF37] hover:bg-[#D4AF37]/5"
          >
            <ArrowLeft size={14} />
            Voltar para o Início
          </Link>
        </motion.div>

        {/* Intro */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="mb-14"
        >
          <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed">
            Bem-vindo(a) ao site de{' '}
            <strong className="text-zinc-200 font-medium">Drika Santana — Studio de Embelezamento</strong>.
            Ao acessar e utilizar esta página, você concorda com os Termos de Uso e a Política de
            Privacidade descritos abaixo. Caso não concorde com algum dos termos, pedimos que não
            utilize os serviços aqui oferecidos.
          </p>
        </motion.div>

        {/* Decorative divider */}
        <div className="flex items-center gap-3 mb-14">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#D4AF37]/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/40" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#D4AF37]/20" />
        </div>

        {/* ═══════════ SECTION 1: TERMOS DE USO ═══════════ */}
        <LegalSection
          icon={<FileText size={16} className="text-[#D4AF37]" />}
          number="1."
          title="Termos de Uso"
        >
          <LegalSubSection number="1.1." title="Descrição dos Serviços">
            <p>
              Este site tem como objetivo apresentar e facilitar o contato para os serviços de{' '}
              <strong className="text-zinc-300 font-medium">
                visagismo capilar, design de imagem, colorimetria, cortes geométricos, tratamentos
                capilares e serviços de embelezamento
              </strong>, oferecidos por{' '}
              <strong className="text-zinc-300 font-medium">Adriana Santana (Drika Santana)</strong>.
            </p>
          </LegalSubSection>

          <LegalSubSection number="1.2." title="Contato e Agendamentos">
            <p>
              Os contatos, orçamentos e agendamentos realizados através dos botões de redirecionamento
              deste site (como WhatsApp e E-mail) são de inteira responsabilidade do usuário e do
              profissional prestador do serviço. O site funciona apenas como um canal de vitrine e
              facilitação de comunicação.
            </p>
          </LegalSubSection>

          <LegalSubSection number="1.3." title="Isenção de Responsabilidade Técnica">
            <p>
              A infraestrutura web, design e código-fonte deste site foram desenvolvidos de forma
              terceirizada. O desenvolvedor responsável pela criação da página não possui vínculos
              societários, não atua no atendimento aos clientes e não se responsabiliza pela prestação
              dos serviços ofertados, promessas comerciais, ou pela gestão e armazenamento dos dados
              trocados diretamente com o profissional após o redirecionamento.
            </p>
          </LegalSubSection>
        </LegalSection>

        {/* Decorative divider */}
        <div className="flex items-center gap-3 my-14">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#D4AF37]/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/40" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#D4AF37]/20" />
        </div>

        {/* ═══════════ SECTION 2: POLÍTICA DE PRIVACIDADE ═══════════ */}
        <LegalSection
          icon={<Lock size={16} className="text-[#D4AF37]" />}
          number="2."
          title="Política de Privacidade (LGPD)"
        >
          <p className="text-zinc-500 text-xs tracking-wide mb-6 border-l-2 border-[#D4AF37]/30 pl-4">
            Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), detalhamos
            como tratamos as suas informações:
          </p>

          <LegalSubSection number="2.1." title="Coleta de Dados">
            <p>
              Nós coletamos apenas as informações estritamente necessárias para a prestação do serviço
              ou atendimento. Quando você clica em nossos botões de contato (WhatsApp ou E-mail), os
              dados fornecidos voluntariamente por você (como seu nome, número de telefone e conteúdo
              da mensagem) são recebidos diretamente por{' '}
              <strong className="text-zinc-300 font-medium">Adriana Santana (Drika Santana)</strong>.
              Este site não possui bancos de dados ocultos que capturam suas informações sem o seu
              consentimento.
            </p>
          </LegalSubSection>

          <LegalSubSection number="2.2." title="Uso dos Dados">
            <p>Os dados fornecidos por você serão utilizados única e exclusivamente para:</p>
            <ul className="space-y-2 mt-3">
              {[
                'Retornar o seu contato e responder a dúvidas;',
                'Enviar orçamentos e realizar agendamentos;',
                'Prestar o serviço contratado;',
                'Enviar atualizações estritamente relacionadas ao serviço solicitado.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37]/60 flex-shrink-0 mt-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </LegalSubSection>

          <LegalSubSection number="2.3." title="Compartilhamento de Informações">
            <p>
              Nós não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins
              de marketing ou qualquer outra finalidade que não seja o cumprimento do serviço
              solicitado, exceto se exigido por lei ou determinação judicial.
            </p>
          </LegalSubSection>

          <LegalSubSection number="2.4." title="Cookies e Tecnologias de Rastreamento">
            <p>
              Este site pode utilizar cookies básicos e ferramentas de análise (como o Google
              Analytics) apenas para entender o volume de acessos e melhorar a sua experiência de
              navegação. Nenhuma informação pessoal identificável é extraída através desses cookies
              funcionais.
            </p>
          </LegalSubSection>

          <LegalSubSection number="2.5." title="Seus Direitos">
            <p>Você tem o direito de solicitar a qualquer momento:</p>
            <ul className="space-y-2 mt-3">
              {[
                'A confirmação da existência de tratamento dos seus dados;',
                'A correção de dados incompletos, inexatos ou desatualizados;',
                'A exclusão dos seus dados dos nossos contatos comerciais.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <UserCheck size={12} className="text-[#D4AF37]/60 flex-shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </LegalSubSection>

          <LegalSubSection number="2.6." title="Contato do Controlador de Dados">
            <p className="mb-4">
              Para exercer seus direitos ou tirar dúvidas sobre esta política, entre em contato
              diretamente com o responsável pelo tratamento dos dados:
            </p>

            <div className="p-5 border border-[#D4AF37]/20 bg-[#D4AF37]/5 space-y-3">
              <div className="flex items-center gap-3">
                <UserCheck size={14} className="text-[#D4AF37] flex-shrink-0" />
                <div>
                  <span className="text-zinc-600 text-xs tracking-wide uppercase">Responsável</span>
                  <p className="text-zinc-200 text-sm font-medium">Adriana Santana (Drika Santana)</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={14} className="text-[#D4AF37] flex-shrink-0" />
                <div>
                  <span className="text-zinc-600 text-xs tracking-wide uppercase">WhatsApp</span>
                  <p>
                    <a
                      href="https://wa.me/5511978466027"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-300 text-sm hover:text-[#D4AF37] transition-colors"
                    >
                      (11) 97846-6027
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Cookie size={14} className="text-[#D4AF37] flex-shrink-0" />
                <div>
                  <span className="text-zinc-600 text-xs tracking-wide uppercase">Instagram</span>
                  <p>
                    <a
                      href="https://www.instagram.com/drika_hair_santana/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-300 text-sm hover:text-[#D4AF37] transition-colors"
                    >
                      @drika_hair_santana
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </LegalSubSection>
        </LegalSection>

        {/* ── Bottom back button ── */}
        <div className="flex items-center gap-3 my-14">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#D4AF37]/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/40" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#D4AF37]/20" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="text-center"
        >
          <Link
            to="/"
            id="termos-back-button-bottom"
            className="inline-flex items-center gap-2.5 px-7 py-3 border border-zinc-800 text-zinc-400 text-sm font-light tracking-wide rounded-sm transition-all duration-300 hover:border-[#D4AF37]/40 hover:text-[#D4AF37] hover:bg-[#D4AF37]/5"
          >
            <ArrowLeft size={14} />
            Voltar para o Início
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
