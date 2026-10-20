import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Shield, FileText, Scale, Lock, UserCheck, Cookie, Mail } from 'lucide-react'
import Seo from '../components/Seo'

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
      <Seo
        title="Termos de Uso e Política de Privacidade — Drika Santana Studio"
        description="Termos de uso, política de privacidade e conformidade com a LGPD do Studio Drika Santana."
        canonicalUrl="https://drikasantana.vercel.app/termos"
      />

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
            Última atualização: 20 de outubro de 2026 — Padrão de Conformidade v3.0
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
              </strong>, oferecidos de forma autônoma por{' '}
              <strong className="text-zinc-300 font-medium">Adriana Santana (Drika Santana)</strong>.
            </p>
          </LegalSubSection>

          <LegalSubSection number="1.2." title="Contato, Agendamentos, Tolerância e Teste de Mecha">
            <p>
              Os contatos, orçamentos e agendamentos realizados através dos botões de redirecionamento
              deste site (como WhatsApp e Instagram) são de inteira responsabilidade da usuária e da
              profissional prestadora do serviço. Eventuais políticas de tolerância de atraso,
              remarcação de horários e avaliação prévia de saúde capilar (como teste de mecha e
              histórico químico para procedimentos de colorimetria/alisamento) são alinhadas
              diretamente no atendimento presencial.
            </p>
          </LegalSubSection>

          <LegalSubSection number="1.3." title="Isenção de Responsabilidade Técnica, Repositório Público e Cláusula de Indenização (Hold Harmless)">
            <p>
              A infraestrutura web, design e código-fonte deste site foram desenvolvidos de forma
              terceirizada sob o modelo <em>AS-IS</em> (&ldquo;no estado em que se encontra&rdquo;).
              Por razões de transparência tecnológica, auditoria de segurança da informação e
              portfólio de engenharia de software, o código-fonte de apresentação (front-end) pode
              estar hospedado em repositório público (GitHub), contendo exclusivamente marcação
              estrutural e metadados públicos de divulgação comercial expressamente autorizados pela
              Controladora. O desenvolvedor responsável pela criação da página não possui vínculos
              societários, não atua no atendimento às clientes, não interfere nos procedimentos
              capilares presenciais e não detém responsabilidade solidária ou subsidiária (nos termos
              do Art. 42 da LGPD) pela prestação dos serviços ofertados ou pela gestão e
              armazenamento dos dados trocados diretamente com a profissional após o redirecionamento.
            </p>
          </LegalSubSection>

          <LegalSubSection number="1.4." title="Propriedade Intelectual e Reserva de Direitos em Repositório Público">
            <p>
              A disponibilização pública do código-fonte para fins de transparência técnica e
              portfólio <strong className="text-zinc-300 font-medium">não concede licença de uso</strong>{' '}
              sobre a marca <strong className="text-zinc-300 font-medium">Drika Santana Studio</strong>,
              fotografias de portfólio e transformações capilares, retratos pessoais, vídeos ou textos
              comerciais desta página, os quais permanecem protegidos pela Lei de Direitos Autorais
              (Lei nº 9.610/1998) e pela Lei da Propriedade Industrial (Lei nº 9.279/1996). É vedada a
              reprodução ou uso comercial de imagens sem autorização expressa.
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
            Em conformidade com a Lei Geral de Proteção de Dados (Lei Federal nº 13.709/2018),
            detalhamos de forma transparente como tratamos as suas informações:
          </p>

          <LegalSubSection number="2.1." title="Coleta Mínima e Processamento 100% Local (Client-Side)">
            <p>
              Adotamos o princípio da minimização de dados (Art. 6º, III da LGPD). Toda a navegação e
              pré-seleção de serviços nesta página ocorrem exclusivamente na memória temporária do
              navegador da própria usuária (<em>Client-Side</em>), sem bancos de dados ocultos ou
              servidores intermediários de captura. Quando você aciona nossos botões de contato
              (WhatsApp), os dados fornecidos voluntariamente por você (como seu nome, telefone e
              serviço desejado) são recebidos diretamente por{' '}
              <strong className="text-zinc-300 font-medium">Adriana Santana (Drika Santana)</strong>.
            </p>
          </LegalSubSection>

          <LegalSubSection number="2.2." title="Finalidade e Bases Legais do Tratamento (Art. 7º da LGPD)">
            <p>Os dados fornecidos voluntariamente pela titular fundamentam-se nas seguintes bases legais:</p>
            <ul className="space-y-2 mt-3">
              {[
                'Procedimentos Preliminares e Execução de Contrato (Art. 7º, V): Retornar o contato, responder a dúvidas, enviar orçamentos e realizar agendamentos no estúdio;',
                'Consentimento Específico (Art. 7º, I e Art. 11, I): Para ficha de avaliação capilar e eventual autorização de uso de imagem (portfólio) colhida presencialmente;',
                'Cumprimento de Obrigação Legal ou Regulatória (Art. 7º, II): Cumprimento de obrigações fiscais e sanitárias aplicáveis.',
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

          <LegalSubSection number="2.4." title="Cookies, Armazenamento Técnico e Zero-Tracking">
            <p>
              Este site segue o princípio de <em>Privacy by Design</em> e não utiliza cookies de
              rastreamento publicitário invasivo ou venda de perfil comportamental. Apenas recursos
              técnicos essenciais do navegador são utilizados para garantir o correto funcionamento
              visual e responsivo da página.
            </p>
          </LegalSubSection>

          <LegalSubSection number="2.5." title="Direitos da Titular dos Dados (Art. 18 da LGPD)">
            <p>Nos termos do Art. 18 da LGPD, você tem o direito de solicitar à Controladora a qualquer momento:</p>
            <ul className="space-y-2 mt-3">
              {[
                'A confirmação da existência de tratamento e o acesso aos seus dados;',
                'A correção de dados incompletos, inexatos ou desatualizados;',
                'A exclusão dos seus dados dos nossos contatos comerciais e a revogação de consentimento (Art. 18, IX), com resposta em até 15 (quinze) dias conforme o Art. 19, II da LGPD.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <UserCheck size={12} className="text-[#D4AF37]/60 flex-shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </LegalSubSection>

          <LegalSubSection number="2.6." title="Proteção dos Dados Públicos da Profissional — Vedação de Scraping e Spam (Art. 7º, §§ 3º e 4º da LGPD)">
            <p>
              Os dados de contato comercial (WhatsApp, endereço do estúdio, Instagram, nome e
              fotografias) disponibilizados publicamente nesta página e no código-fonte público têm
              como <strong className="text-zinc-300 font-medium">única e estrita finalidade permitir o contato comercial por clientes interessadas nos serviços de embelezamento descritos</strong>{' '}
              (Art. 7º, §§ 3º e 4º da LGPD). É expressamente{' '}
              <strong className="text-zinc-300 font-medium">proibida a coleta automatizada</strong>{' '}
              (<em>web scraping</em>, <em>crawling</em>, mineração por bots), a inclusão em listas de{' '}
              <em>spam</em> ou telemarketing não solicitado, a comercialização por <em>data brokers</em>{' '}
              ou o uso de dados e imagens para treinamento de modelos de inteligência artificial sem
              autorização expressa da titular.
            </p>
          </LegalSubSection>

          <LegalSubSection number="2.7." title="Contato da Controladora de Dados e Alerta Antifraude">
            <p className="mb-4">
              Para exercer seus direitos ou tirar dúvidas sobre esta política, entre em contato
              diretamente com a responsável pelo tratamento dos dados exclusivamente pelos canais
              oficiais abaixo (o estúdio jamais solicita códigos de verificação via SMS/WhatsApp ou
              transferências Pix para terceiros desconhecidos):
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
