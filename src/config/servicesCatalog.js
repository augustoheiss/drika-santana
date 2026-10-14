// ─────────────────────────────────────────────────────────────────────────────
// CATÁLOGO UNIFICADO DE SERVIÇOS, "PAPO DE CAFÉ" & VÍNCULOS DE APRENDIZADO
// Fonte única da verdade consumida por:
// - /servicos (Servicos.jsx e CoffeeChatFinder.jsx)
// - /contato (BookingCalendar.jsx)
// - /aprenda (Aprenda.jsx)
// - Concierge de WhatsApp (WhatsAppFloat.jsx)
// ─────────────────────────────────────────────────────────────────────────────

export const WHATSAPP_NUMBER = '5511978466027'

export function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const SERVICE_CATEGORIES = [
  {
    id: 'cabelo',
    label: 'Cabelo',
    headline: 'Cortes, Cor & Tratamentos',
    description:
      'Arte, ciência e escuta sincera aplicadas ao seu fio — do café de boas-vindas ao caimento que funciona na sua rotina.',
  },
  {
    id: 'barba',
    label: 'Barba & Masculino',
    headline: 'Barbearia Clássica & Cortes Masculinos',
    description:
      'Tradição, precisão geométrica e alinhamento pensado para o formato do seu rosto sem frescura.',
  },
  {
    id: 'rosto',
    label: 'Rosto',
    headline: 'Design de Sobrancelhas',
    description:
      'Emolduramento do olhar que respeita a sua expressão natural, sem afinar demais nem deixar artificial.',
  },
  {
    id: 'unhas',
    label: 'Unhas',
    headline: 'Nail Care Premium & Biossegurança',
    description:
      'Cuidado rigoroso com materiais 100% esterilizados em autoclave e acabamento impecável para mãos e pés.',
  },
]

export const SERVICES_CATALOG = [
  {
    id: 'corte',
    categoryId: 'cabelo',
    anamneseGroup: 'cabelo',
    iconName: 'Scissors',
    title: 'Visagismo Prático & Cortes',
    shortLabel: 'Corte & Visagismo',
    duration: 'Aprox. 1h a 1h30',
    estimatedMinutes: 75,
    requiresEarlySlot: false,
    description:
      'Cortes unissex projetados para o seu formato de rosto e rotina real. O fim do "achismo" na cadeira do salão com diagnóstico sincero.',
    papoDeCafe:
      'Sabe quando você mostra a foto de uma atriz na internet e sai do salão se sentindo fantasiada de outra pessoa? Num papo sincero tomando um café, eu olho para a estrutura do seu rosto, para a textura real do seu fio e pergunto: "Quantos minutos você tem de manhã antes de sair correndo?". O corte perfeito é aquele que respeita quem você é na vida real.',
    cienciaSemEnrolacao:
      'O visagismo cruza linhas de força faciais (formato ósseo) com o peso e a direção do fio para equilibrar proporções sem esforço.',
    prepTip:
      'Traga referências do que você gosta (e do que odeia!), mas venha de coração aberto para adaptarmos tudo à realidade do seu fio.',
    relatedGuideId: 'chanel-long-bob',
    relatedGuideLabel: 'Ver como a geometria do corte facilita a rotina',
    whatsappQuestion:
      'Oi Drika! ☕ Estava vendo o Visagismo Prático & Cortes no site e queria bater um papo sincero: quero um corte que combine com meu rosto e seja prático no dia a dia. Como funciona?',
  },
  {
    id: 'drycut',
    categoryId: 'cabelo',
    anamneseGroup: 'cabelo',
    iconName: 'User',
    title: 'Crespos & Cacheados (Dry Cut)',
    shortLabel: 'Crespos & Cacheados (Dry Cut)',
    duration: 'Aprox. 1h30 a 2h',
    estimatedMinutes: 105,
    requiresEarlySlot: false,
    description:
      'Respeito total à estrutura espiralada e ao fator de encolhimento. Avaliamos o caimento natural e esculpimos o corte a seco, mecha a mecha.',
    papoDeCafe:
      'Vamos falar a verdade: toda cacheada ou crespa já passou pelo trauma de pedir "só as pontinhas" com o cabelo molhado e, quando secou, o cacho subiu lá na orelha! Cabelo com curvatura é mola viva: molhado ele mente, seco ele fala a verdade. Por isso aqui a tesoura trabalha no fio seco, olhando exatamente onde cada cacho vai morar.',
    cienciaSemEnrolacao:
      'Curvaturas de 2C a 4C encolhem de 20% a 75% ao secar; esculpir a seco elimina o erro do fator de encolhimento e evita o efeito pirâmide.',
    prepTip:
      'Inegociável para o seu Dry Cut: venha com o cabelo lavado, 100% seco e finalizado solto do jeito que você costuma usar. Nada de coque apertado, trança ou elástico antes de vir!',
    relatedGuideId: 'dry-cut-cachos',
    relatedGuideLabel: 'Entender por que o Dry Cut evita sustos no espelho',
    whatsappQuestion:
      'Oi Drika! ☕ Tenho cabelo cacheado/crespo, li sobre o seu Dry Cut (corte a seco) no site e amei a sinceridade! Quero conversar sobre o meu cabelo.',
  },
  {
    id: 'chanel-longbob',
    categoryId: 'cabelo',
    anamneseGroup: 'cabelo',
    iconName: 'Wand2',
    title: 'Design de Cortes — Chanel e Long Bob',
    shortLabel: 'Chanel de Bico & Long Bob',
    duration: 'Aprox. 1h30',
    estimatedMinutes: 90,
    requiresEarlySlot: false,
    description:
      'Especialidade em Chanel de bico e Long Bob com precisão geométrica editorial e caimento que se encaixa sozinho no dia a dia.',
    papoDeCafe:
      'Chanel de bico ou Long Bob bem feito não pode exigir que você acorde às 5h30 da manhã para fazer escova! Quando a graduação na nuca e a angulação da tesoura são calculadas milimetricamente, você lava, sacode a cabeça, passa um sérum nas pontas e o corte embica para dentro sozinho.',
    cienciaSemEnrolacao:
      'A graduação interna progressiva cria mechas-guia menores por baixo que empurram as mechas externas naturalmente para dentro.',
    prepTip:
      'Se você usa óculos no dia a dia ou trabalha com roupas de gola alta/social, me conte na cadeira! Ajustamos o ângulo do bico para harmonizar com tudo.',
    relatedGuideId: 'chanel-long-bob',
    relatedGuideLabel: 'Ler o segredo da precisão geométrica no Chanel & Long Bob',
    whatsappQuestion:
      'Oi Drika! ☕ Vi que você é especialista em Chanel de bico e Long Bob! Quero muito um corte elegante e prático que não me deixe refém do secador.',
  },
  {
    id: 'colorimetria',
    categoryId: 'cabelo',
    anamneseGroup: 'cabelo',
    iconName: 'Palette',
    title: 'Alquimia da Colorimetria & Mechas',
    shortLabel: 'Mechas & Colorimetria',
    duration: 'Aprox. 2h30 a 4h',
    estimatedMinutes: 210,
    requiresEarlySlot: true,
    description:
      'Mechas, iluminação personalizada e coloração global com teste de mecha rigoroso e foco absoluto na saúde e integridade do fio.',
    papoDeCafe:
      'Quer iluminar, mudar o visual ou disfarçar os brancos sem ficar presa a retoque a cada 15 dias? Eu amo! Mas aqui entra o meu lado amiga sincera de bar: antes de qualquer descolorante encostar na sua cabeça, a gente faz o Teste de Mecha. Se o fio tiver química incompatível e pedir socorro, eu falo na hora: "Hoje não, linda, vamos tratar primeiro!". Prefiro você me amando com cabelo saudável do que chorando no banho.',
    cienciaSemEnrolacao:
      'O teste de mecha avalia a resistência das pontes dissulfeto (cistina) no córtex capilar antes de elevar o pH ou oxidar a melanina.',
    prepTip:
      'Anote de coração aberto tudo o que passou no cabelo nos últimos 2 anos (progressiva, botox, tonalizante, henna, tintura de caixinha). O fio não esquece, e a sinceridade protege você!',
    relatedGuideId: 'teste-de-mecha',
    relatedGuideLabel: 'Por que o Teste de Mecha salva o seu cabelo',
    whatsappQuestion:
      'Oi Drika! ☕ Quero conversar sobre Colorimetria / Mechas! Li no site sobre a importância do Teste de Mecha e queria te contar o histórico do meu fio.',
  },
  {
    id: 'tratamento',
    categoryId: 'cabelo',
    anamneseGroup: 'cabelo',
    iconName: 'Droplets',
    title: 'Tratamentos de Alta Performance',
    shortLabel: 'Tratamentos & Cronograma',
    duration: 'Aprox. 1h a 1h30',
    estimatedMinutes: 75,
    requiresEarlySlot: false,
    description:
      'Cronogramas capilares sob medida, acidificação, reconstrução lipídica e hidratação profunda para devolver maciez, força e brilho.',
    papoDeCafe:
      'Já comprou uma máscara caríssima que sua amiga jurou que era milagrosa e no seu cabelo ficou duro ou pesado? É porque cabelo não precisa de "preço", precisa de diagnóstico! Às vezes seu fio não está seco, está apenas com a cutícula aberta (pH alcalino) precisando de uma boa acidificação para segurar a água lá dentro.',
    cienciaSemEnrolacao:
      'Reequilibrar o pH ácido (4.5–5.5) sela as escamas da cutícula e impede que a água e os lipídios evaporem no dia seguinte.',
    prepTip:
      'Não precisa fazer hidratação caseira antes de vir — deixe o cabelo como ele está para eu avaliar a porosidade real do seu fio no lavatório.',
    relatedGuideId: 'acidificacao-capilar',
    relatedGuideLabel: 'Descobrir como a Acidificação acaba com a aspereza',
    whatsappQuestion:
      'Oi Drika! ☕ Meu cabelo está precisando de um socorro (tratamento/cronograma) e quero descobrir do que o meu fio realmente precisa!',
  },
  {
    id: 'penteado',
    categoryId: 'cabelo',
    anamneseGroup: 'cabelo',
    iconName: 'Sparkles',
    title: 'Penteados & Estilização para Eventos',
    shortLabel: 'Penteado & Estilização',
    duration: 'Aprox. 1h30',
    estimatedMinutes: 90,
    requiresEarlySlot: false,
    description:
      'Design de penteados para festas, casamentos e formaturas, unindo fixação inteligente, conforto e respeito à sua textura natural.',
    papoDeCafe:
      'Penteado de festa bom é aquele em que você abraça todo mundo, dança a noite inteira e não sente meia dúzia de grampos furando o seu juízo! E mais: se você é cacheada ou crespa, nada de "precisar escovar antes de prender" — nós valorizamos a sua textura real com elegância.',
    cienciaSemEnrolacao:
      'Preparação térmica controlada e pontos de ancoragem anatômicos garantem sustentação duradoura sem tração excessiva na raiz.',
    prepTip:
      'No dia do evento, venha com uma blusa de botões ou gola bem larga para trocar de roupa depois sem desmanchar o penteado!',
    relatedGuideId: 'protecao-termica',
    relatedGuideLabel: 'Ver como protegemos o fio do calor na estilização',
    whatsappQuestion:
      'Oi Drika! ☕ Tenho um evento especial chegando e gostaria de conversar sobre Penteado & Estilização!',
  },
  {
    id: 'barba',
    categoryId: 'barba',
    anamneseGroup: 'rosto',
    iconName: 'Zap',
    title: 'Barbearia Clássica & Visagismo Masculino',
    shortLabel: 'Barbearia Clássica',
    duration: 'Aprox. 45min a 1h',
    estimatedMinutes: 55,
    requiresEarlySlot: false,
    description:
      'Design de barba e cortes masculinos pensados para harmonizar com a estrutura óssea, valorizar o maxilar e facilitar o dia a dia.',
    papoDeCafe:
      'Homem também merece sentar numa cadeira onde alguém realmente estuda o formato do rosto dele em vez de passar a máquina 2 na lateral no piloto automático! A barba certa desenha o maxilar, disfarça o que incomoda e dá presença sem parecer artificial.',
    cienciaSemEnrolacao:
      'O alinhamento geométrico das linhas da bochecha e do pescoço projeta simetria mandibular e alonga ou equilibra o terço inferior da face.',
    prepTip:
      'Deixe a barba crescer por pelo menos alguns dias antes de vir para termos margem de desenho nas linhas principais.',
    relatedGuideId: 'chanel-long-bob',
    relatedGuideLabel: 'Entender a ciência do Visagismo e geometria',
    whatsappQuestion:
      'Olá Drika! ☕ Vi a parte de Barbearia Clássica & Visagismo Masculino no site e quero agendar/tirar uma dúvida.',
  },
  {
    id: 'sobrancelha',
    categoryId: 'rosto',
    anamneseGroup: 'rosto',
    iconName: 'Feather',
    title: 'Design de Sobrancelhas Personalizado',
    shortLabel: 'Design de Sobrancelhas',
    duration: 'Aprox. 40min',
    estimatedMinutes: 40,
    requiresEarlySlot: false,
    description:
      'Técnicas com mapeamento facial e visagismo que respeitam o desenho natural, sem afinar em excesso nem arquear de forma artificial.',
    papoDeCafe:
      'Sobrancelha é a moldura do olhar: um milímetro tirado no lugar errado muda toda a sua expressão para "brava" ou "triste". Aqui não tem molde pronto de papel: medimos a anatomia do seu rosto e limpamos apenas o que valoriza a sua beleza natural.',
    cienciaSemEnrolacao:
      'O mapeamento com paquímetro respeita o alinhamento entre aba nasal, íris e canto externo ocular, preservando a densidade do bulbo.',
    prepTip:
      'Evite usar ácidos faciais fortes na região das sobrancelhas nos 5 dias anteriores ao procedimento para proteger a pele.',
    relatedGuideId: 'chanel-long-bob',
    relatedGuideLabel: 'Como o Visagismo harmoniza as linhas do rosto',
    whatsappQuestion:
      'Oi Drika! ☕ Quero cuidar das minhas sobrancelhas com design natural e visagismo. Podemos conversar?',
  },
  {
    id: 'unhas',
    categoryId: 'unhas',
    anamneseGroup: 'unhas',
    iconName: 'Star',
    title: 'Manicure & Pedicure Premium',
    shortLabel: 'Manicure & Pedicure Premium',
    duration: 'Aprox. 1h a 1h30',
    estimatedMinutes: 75,
    requiresEarlySlot: false,
    description:
      'Biossegurança rigorosa, esterilização em autoclave comprovada, cuticulagem delicada sem "bifes" e esmaltação duradoura.',
    papoDeCafe:
      'Fazer a unha tem que ser momento de relaxar tomando um café, não de sair com os dedos latejando! Aqui todos os alicates e espátulas passam por esterilização hospitalar em autoclave, e a cuticulagem respeita a saúde e a proteção natural da sua unha.',
    cienciaSemEnrolacao:
      'Esterilização em autoclave a vapor sob pressão elimina 100% de fungos, bactérias e vírus, preservando a matriz ungueal.',
    prepTip:
      'Se tiver alergia a componentes de esmaltes tradicionais (como tolueno ou formaldeído), avise na ficha para usarmos opções seguras.',
    relatedGuideId: 'acidificacao-capilar',
    relatedGuideLabel: 'Conhecer nossos pilares de cuidado e biossegurança',
    whatsappQuestion:
      'Oi Drika! ☕ Quero saber mais e agendar Manicure & Pedicure Premium com biossegurança no Studio!',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// BÚSSOLA "PAPO DE CAFÉ" (Descoberta Agonista de Aprendizado em 1 Clique)
// ─────────────────────────────────────────────────────────────────────────────

export const COFFEE_CHAT_SCENARIOS = [
  {
    id: 'praticidade-coque',
    emoji: '☕',
    clientQuote: 'Acordo, olho no espelho e prendo num coque (quero praticidade!).',
    shortTag: 'Rotina Corrida & Sem Forma',
    drikaCoffeeReply:
      'Senta aqui e respira! Se o seu cabelo só fica bom quando sai escovado do salão e no dia seguinte você precisa prender porque ele "arma" ou perde o corte, a culpa NÃO é sua — é da falta de geometria no corte. Quando desenhamos as camadas e o peso certos para o seu rosto, o cabelo trabalha a seu favor.',
    sciencePill:
      'Por que acontece? Quando o corte ignora a direção de nascimento do fio e o caimento natural, as pontas criam volume onde não devem. Com visagismo e angulação precisa, o fio encaixa sozinho ao secar.',
    recommendedServiceIds: ['corte', 'chanel-longbob'],
    recommendedGuideId: 'chanel-long-bob',
    recommendedGuideTitle: 'O segredo dos cortes geométricos de fácil manutenção',
    whatsappPrefill:
      'Oi Drika! ☕ Fiz o teste do "Papo de Café" no site: hoje eu acordo e prendo o cabelo porque ele perdeu a forma. Quero muito um corte prático com visagismo para a minha rotina!',
  },
  {
    id: 'cachos-transicao',
    emoji: '🌀',
    clientQuote: 'Meus cachos encolhem, ficam sem forma ou estou passando pela transição.',
    shortTag: 'Crespos, Cacheados & Transição',
    drikaCoffeeReply:
      'Seja muito bem-vinda à mesa! Cortar cabelo cacheado ou crespo molhado e esticado no pente é pedir para tomar susto quando seca. No Studio, fazemos o Dry Cut (corte 100% a seco): a gente conversa, avalia cada curvatura da sua cabeça e esculpe mecha por mecha vendo o volume e o comprimento reais na hora!',
    sciencePill:
      'Por que acontece? Uma mesma cabeça pode ter curvaturas 3A na nuca e 3C/4A no topo, cada uma com fator de encolhimento diferente. Cortar a seco respeita a anatomia real de cada mola.',
    recommendedServiceIds: ['drycut', 'tratamento'],
    recommendedGuideId: 'dry-cut-cachos',
    recommendedGuideTitle: 'Dry Cut: Por que cortar a seco transforma cachos e crespos',
    whatsappPrefill:
      'Oi Drika! ☕ Fiz o "Papo de Café" no site! Tenho cabelo cacheado/crespo (ou estou em transição) e quero conhecer o seu corte a seco (Dry Cut) e cuidados!',
  },
  {
    id: 'cor-segura',
    emoji: '✨',
    clientQuote: 'Quero iluminar, fazer mechas ou mudar a cor, mas tenho medo de estragar o fio.',
    shortTag: 'Cor, Mechas & Saúde do Fio',
    drikaCoffeeReply:
      'Esse medo é super legítimo — e aqui a gente resolve ele com ciência e sinceridade! Antes de pensar em descolorir ou pintar, fazemos o Teste de Mecha e conversamos sobre tudo o que seu cabelo já viveu nos últimos 2 anos. Se a fibra estiver forte, criamos aquela iluminação dos sonhos; se precisar de força antes, preparamos o fio primeiro!',
    sciencePill:
      'Por que acontece? Químicas antigas (como progressivas ácidas, botox ou metais pesados) reagem com o pó descolorante. O Teste de Mecha revela exatamente até qual tom podemos chegar com 100% de segurança.',
    recommendedServiceIds: ['colorimetria', 'tratamento'],
    recommendedGuideId: 'teste-de-mecha',
    recommendedGuideTitle: 'Teste de Mecha: A garantia inegociável da saúde do seu fio',
    whatsappPrefill:
      'Oi Drika! ☕ Fiz o "Papo de Café" no site: quero iluminar/mudar a cor do meu cabelo com total segurança e fazer o diagnóstico com Teste de Mecha!',
  },
  {
    id: 'barba-rosto-unhas',
    emoji: '💎',
    clientQuote: 'Quero alinhar barba/corte masculino ou cuidar das sobrancelhas e unhas.',
    shortTag: 'Barbearia, Olhar & Biossegurança',
    drikaCoffeeReply:
      'Cuidado completo nos mínimos detalhes! Seja para alinhar a barba e o corte masculino com visagismo, emoldurar o olhar com um design de sobrancelhas natural (sem afinar demais!) ou fazer as unhas com materiais 100% esterilizados em autoclave, aqui o seu horário é exclusivo e sem pressa.',
    sciencePill:
      'Por que faz diferença? No rosto, a simetria com paquímetro e o visagismo valorizam seus traços reais; nas unhas, a autoclave garante biossegurança de nível hospitalar.',
    recommendedServiceIds: ['barba', 'sobrancelha', 'unhas'],
    recommendedGuideId: 'protecao-termica',
    recommendedGuideTitle: 'Conheça nossos guias de cuidado e proteção diária',
    whatsappPrefill:
      'Oi Drika! ☕ Vi no "Papo de Café" do site os cuidados de Barbearia / Design de Sobrancelhas / Unhas com biossegurança e gostaria de agendar!',
  },
]
