/**
 * Hub de Conteúdo Educativo — Drika Santana Studio
 * Fonte de verdade para guias práticos, glossário capilar, mitos de café e rotinas de autocuidado.
 * Permite que a Drika e a equipe editem textos sem tocar na camada de layout.
 */

export const categoriasGuia = [
  { id: 'todos', label: 'Todos os Guias' },
  { id: 'cachos', label: 'Crespos & Cacheados' },
  { id: 'lisos', label: 'Lisos & Geométricos' },
  { id: 'quimica', label: 'Cor & Química Segura' },
  { id: 'glossario', label: 'Glossário Capilar' },
]

export const guias = [
  {
    id: 'dry-cut-cachos',
    categoria: 'cachos',
    titulo: 'Dry Cut (Corte a Seco): Por que ele é essencial para cachos e crespos?',
    resumo:
      'Entenda como cortar o fio seco no seu caimento natural evita surpresas e garante o volume e a definição que você sempre quis.',
    tempoLeitura: '3 min',
    destaque: true,
    servicoRelacionadoId: 'drycut',
    servicoRelacionadoLabel: 'Agendar Dry Cut (Corte a Seco)',
    whatsappDuvida:
      'Oi Drika! ☕ Acabei de ler o seu guia sobre Dry Cut (Corte a Seco) no site e quero conversar sobre os meus cachos/crespo!',
    passos: [
      {
        titulo: 'O que é o Dry Cut?',
        descricao:
          'É a técnica onde cada mecha é esculpida com o cabelo 100% seco, no formato e na finalização que você usa no dia a dia. Quando o cabelo cacheado ou crespo é molhado e puxado, ele perde o desenho natural dos cachos.',
      },
      {
        titulo: 'O Respeito ao Fator de Encolhimento',
        descricao:
          'Fios com curvatura encolhem entre 20% e até 75% quando secam. Cortando a seco, você e a Drika veem em tempo real o comprimento final exato, sem medo de "encolher demais".',
      },
      {
        titulo: 'Distribuição Inteligente de Volume',
        descricao:
          'Com a técnica correta, o corte cria camadas tridimensionais que valorizam a forma do seu rosto, eliminando o formato piramidal indesejado e dando movimento leve.',
      },
    ],
    dicaDrika:
      'Venha para o atendimento com o cabelo lavado, 100% seco e finalizado do jeito que você mais gosta de usar. Nada de coques apertados ou grampos antes do corte!',
  },
  {
    id: 'day-after-cachos',
    categoria: 'cachos',
    titulo: 'Rotina de Day After: Como acordar com cachos definidos sem lavar todo dia',
    resumo:
      'Passo a passo simples para manter a definição e o brilho dos cachos por dias sem pesar os fios.',
    tempoLeitura: '4 min',
    destaque: false,
    servicoRelacionadoId: 'drycut',
    servicoRelacionadoLabel: 'Agendar Corte & Orientação de Cachos',
    whatsappDuvida:
      'Oi Drika! ☕ Li o seu guia de Day After no site e queria sua ajuda para melhorar a definição e o corte dos meus cachos!',
    passos: [
      {
        titulo: '1. A Proteção Noturna é Inegociável',
        descricao:
          'Fronha ou touca de cetim reduzem o atrito com o travesseiro em até 80%. O algodão comum suga a umidade do cabelo e gera frizz mecânico.',
      },
      {
        titulo: '2. Revitalização com Borrifador Leve',
        descricao:
          'Pela manhã, não encharque o cabelo. Use uma mistura leve de água filtrada com algumas gotas de soro fisiológico ou um leave-in bem fluido.',
      },
      {
        titulo: '3. Amassar com Carinho',
        descricao:
          'Aplique a umidade nas mãos e aperte suavemente de baixo para cima. Deixe secar naturalmente ou use o difusor em temperatura morna/baixa.',
      },
    ],
    dicaDrika:
      'Menos é mais! O excesso de creme no dia seguinte acumula produto e deixa o cacho opaco e pesado. Prefira revitalizar com leveza.',
  },
  {
    id: 'transicao-capilar',
    categoria: 'cachos',
    titulo: 'Transição Capilar: Superando a fase das duas texturas com leveza',
    resumo:
      'Como passar pelo processo com autoestima preservada, truques de texturização e o momento certo do Big Chop.',
    tempoLeitura: '4 min',
    destaque: false,
    servicoRelacionadoId: 'drycut',
    servicoRelacionadoLabel: 'Agendar Corte de Transição / Acolhimento',
    whatsappDuvida:
      'Oi Drika! ☕ Estou passando pela transição capilar, li o guia no seu site e gostaria de agendar um momento com você para cuidar do meu cabelo sem pressa!',
    passos: [
      {
        titulo: 'Paciência e Acolhimento',
        descricao:
          'A raiz natural crescendo enquanto as pontas ainda têm química pode gerar estranhamento. Entenda que esse é um processo de redescoberta da sua identidade.',
      },
      {
        titulo: 'Cortes Graduais de Transição',
        descricao:
          'Você não precisa raspar se não quiser. Podemos fazer cortes regulares a seco para ir retirando as pontas lisas aos poucos, mantendo um design bonito.',
      },
      {
        titulo: 'Foco na Saúde do Couro Cabeludo',
        descricao:
          'Massagens suaves estimulam a circulação e o crescimento dos fios naturais com força e vitalidade.',
      },
    ],
    dicaDrika:
      'Você não está sozinha nessa jornada. Na cadeira da Drika, escutamos seus anseios e traçamos um plano de corte no seu próprio ritmo.',
  },
  {
    id: 'chanel-long-bob',
    categoria: 'lisos',
    titulo: 'Chanel de Bico & Long Bob: O segredo da precisão geométrica e fácil manutenção',
    resumo:
      'Por que esses cortes clássicos nunca saem de moda e como mantê-los alinhados com o mínimo de esforço em casa.',
    tempoLeitura: '3 min',
    destaque: true,
    servicoRelacionadoId: 'chanel-longbob',
    servicoRelacionadoLabel: 'Agendar Chanel de Bico ou Long Bob',
    whatsappDuvida:
      'Oi Drika! ☕ Li o seu guia sobre Chanel de Bico e Long Bob no site! Quero muito um corte geométrico que fique lindo e fácil de arrumar no dia a dia.',
    passos: [
      {
        titulo: 'A Geometria a Favor do Rosto',
        descricao:
          'O Chanel de bico alonga a linha do pescoço e traz uma elegância sofisticada. A inclinação é calculada através do visagismo de acordo com o formato da sua mandíbula.',
      },
      {
        titulo: 'O Caimento que Não Exige Escovação Pesada',
        descricao:
          'Quando o corte é feito com a angulação correta de tesoura, os fios se encaixam naturalmente para dentro sozinhos, mesmo secando ao natural.',
      },
      {
        titulo: 'Intervalo de Manutenção',
        descricao:
          'Para manter as linhas geométricas perfeitas, o ideal é aparar a cada 6 a 8 semanas. Isso mantém a nuca limpa e o bico nítido.',
      },
    ],
    dicaDrika:
      'Um bom sérum reparador nas pontas faz toda a diferença para dar aquele brilho espelhado característico do corte geométrico.',
  },
  {
    id: 'protecao-termica',
    categoria: 'lisos',
    titulo: 'Proteção Térmica: O escudo inegociável contra o calor de secadores e chapinhas',
    resumo:
      'Descubra a temperatura segura para modelar e por que pular o protetor térmico destrói as proteínas do fio.',
    tempoLeitura: '3 min',
    destaque: false,
    servicoRelacionadoId: 'tratamento',
    servicoRelacionadoLabel: 'Agendar Tratamento & Recuperação Térmica',
    whatsappDuvida:
      'Oi Drika! ☕ Li o guia sobre Proteção Térmica no site e quero recuperar a saúde e o brilho das pontas do meu cabelo!',
    passos: [
      {
        titulo: 'O que o Calor Excessivo Faz no Fio?',
        descricao:
          'Temperaturas acima de 180°C sem proteção derretem a camada de queratina e causam o efeito "bubble hair" (bolhas de ar internas que quebram o fio).',
      },
      {
        titulo: 'Como o Protetor Atua',
        descricao:
          'Ele cria um filme protetor que distribui o calor uniformemente e retém a umidade interna da fibra capilar.',
      },
      {
        titulo: 'Aplicação Correta',
        descricao:
          'Aplique mecha a mecha com o cabelo ainda úmido antes do secador, garantindo que todo o comprimento receba a proteção.',
      },
    ],
    dicaDrika:
      'Nunca passe a chapinha no cabelo úmido ou molhado! Esse chiado é a água fervendo dentro do córtex capilar.',
  },
  {
    id: 'teste-de-mecha',
    categoria: 'quimica',
    titulo: 'Teste de Mecha: Por que ele é obrigatório e inegociável no Studio Drika Santana',
    resumo:
      'A garantia absoluta de que seu cabelo suportará o processo químico com saúde, elasticidade e sem surpresas.',
    tempoLeitura: '3 min',
    destaque: true,
    servicoRelacionadoId: 'colorimetria',
    servicoRelacionadoLabel: 'Agendar Colorimetria com Teste de Mecha',
    whatsappDuvida:
      'Oi Drika! ☕ Li o seu guia sobre o Teste de Mecha e amei o cuidado com a saúde do fio. Quero agendar uma avaliação para iluminar/colorir meu cabelo!',
    passos: [
      {
        titulo: 'O que Avaliamos no Teste de Mecha?',
        descricao:
          'Separamos uma mecha discreta da nuca e aplicamos o produto. Observamos: tempo de clareamento, resistência elástica, porosidade e compatibilidade com químicas anteriores.',
      },
      {
        titulo: 'Transparência em Primeiro Lugar',
        descricao:
          'Se a mecha mostrar fragilidade ou emborrachamento, a Drika não realizará o procedimento no mesmo dia. Primeiro tratamos e fortalecemos o fio.',
      },
      {
        titulo: 'A Cor Desejada com Fio Saudável',
        descricao:
          'A beleza de uma cor radiante só existe se o cabelo mantiver sua integridade e brilho. Preservamos a sua autoestima a longo prazo.',
      },
    ],
    dicaDrika:
      'Seja 100% sincera no questionário de anamnese sobre produtos usados nos últimos 2 anos (progressivas, botox, hennê, tonalizantes). A honestidade protege o seu cabelo!',
  },
  {
    id: 'acidificacao-capilar',
    categoria: 'quimica',
    titulo: 'Acidificação Capilar: O segredo para selar cutículas e acabar com a aspereza',
    resumo:
      'Como o equilíbrio do pH restaura o toque sedoso e retém os tratamentos dentro da fibra capilar.',
    tempoLeitura: '4 min',
    destaque: false,
    servicoRelacionadoId: 'tratamento',
    servicoRelacionadoLabel: 'Agendar Acidificação & Cronograma Capilar',
    whatsappDuvida:
      'Oi Drika! ☕ Li sobre a Acidificação Capilar no seu site e acho que meu cabelo está poroso precisando desse cuidado. Podemos conversar?',
    passos: [
      {
        titulo: 'O pH do Cabelo Saudável',
        descricao:
          'O pH natural do fio é ligeiramente ácido (entre 4.5 e 5.5). Procedimentos químicos abrem as cutículas elevando o pH para níveis alcalinos.',
      },
      {
        titulo: 'Quando Fazer Acidificação?',
        descricao:
          'Sempre após descolorações, tinturas ou quando o cabelo estiver com aspecto de esponja, embaraçando com facilidade e sem retenção de hidratação.',
      },
      {
        titulo: 'O Resultado Imediato',
        descricao:
          'Com as escamas da cutícula perfeitamente alinhadas e fechadas, a luz reflete com intensidade máxima, resultando em brilho e toque aveludado.',
      },
    ],
    dicaDrika:
      'Não faça misturinhas caseiras descontroladas (como vinagre puro em excesso). Utilize acidificantes profissionais com formulação balanceada.',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// PAPO DE CAFÉ & BAR: MITOS DE SALÃO vs. A VERDADE SINCERA DA DRIKA
// ─────────────────────────────────────────────────────────────────────────────

export const mitosDeCafe = [
  {
    id: 'mito-lua',
    mito: '"Cortar na lua cheia faz o cabelo crescer o dobro e mais grosso?"',
    papoReto:
      'Olha, se a gente estivesse tomando um café agora eu te diria rindo: a lua mexe com a maré do oceano, linda, não com o seu bulbo capilar! O que faz o cabelo crescer forte e encorpado é couro cabeludo limpo, boa alimentação e aparar as pontas danificadas para o fio parar de quebrar no comprimento.',
    cienciaCurta: 'O crescimento capilar (~1 a 1,2 cm/mês) é determinado pela genética, vascularização folicular e metabolismo, não pelas fases lunares.',
  },
  {
    id: 'mito-progressiva-trata',
    mito: '"Progressiva ou botox com prancha quente estão hidratando meu fio?"',
    papoReto:
      'Papo reto de amiga que te ama: aquele brilho espelhado no primeiro dia é uma película selada a ferro quente, não saúde! Por baixo, o pH ácido extremo e a chapinha a 230°C podem afinar o córtex e deixar o fio rígido. Se você faz alisamento, o cronograma de reposição lipídica é lei para o fio não partir.',
    cienciaCurta: 'Alisamentos ácidos alteram pontes da fibra sob alta temperatura, reduzindo a permeabilidade à água se não houver tratamento contínuo.',
  },
  {
    id: 'mito-cacheada-curto',
    mito: '"Quem tem cabelo cacheado ou crespo não pode usar corte curto ou franja?"',
    papoReto:
      'Mentira que inventaram porque tinham medo de cortar no seco! Cacho curto, Chanel cacheado e franja com curvatura ficam um espetáculo quando a gente respeita o fator de encolhimento de cada mecha no Dry Cut. O problema nunca foi o seu cacho, foi a tesoura no cabelo molhado!',
    cienciaCurta: 'Ao esculpir o cacho em repouso (seco), desenhamos a silhueta real ao redor das maçãs do rosto e da mandíbula.',
  },
  {
    id: 'mito-agua-fria',
    mito: '"Preciso passar frio lavando o cabelo na água gelada no inverno de São Paulo?"',
    papoReto:
      'De jeito nenhum! Ninguém merece bater queixo no chuveiro achando que água congelando faz milagre. O segredo é fugir da água pelando (que arranca a proteção natural do couro cabeludo). Água morna agradável + um bom finalizador ou acidificante já deixam as cutículas seladas e felizes!',
    cienciaCurta: 'O que sela a cutícula de forma efetiva é o pH ácido dos condicionadores e acidificantes (pH 3.5 a 4.5), não o choque térmico gelado.',
  },
]

export const glossarioCapilar = [
  {
    termo: 'Cutícula',
    definicao:
      'A camada mais externa do fio, composta por escamas sobrepostas (como escamas de peixe). Quando seladas e alinhadas, o cabelo brilha e retém hidratação; quando abertas, o cabelo fica áspero e poroso.',
  },
  {
    termo: 'Córtex',
    definicao:
      'O coração do fio de cabelo, responsável por 80% a 90% da sua massa. É no córtex que ficam as cadeias de queratina (força e elasticidade) e os pigmentos de melanina que dão a cor ao cabelo.',
  },
  {
    termo: 'Porosidade Capilar',
    definicao:
      'A capacidade do fio de absorver e reter água e nutrientes. Pode ser baixa (cutículas muito fechadas), média (ideal e equilibrada) ou alta (cutículas abertas ou danificadas, perdendo água rapidamente).',
  },
  {
    termo: 'Fator de Encolhimento',
    definicao:
      'A diferença de comprimento entre o fio cacheado esticado e o fio em repouso seco. Varia de 20% a 75% dependendo da curvatura (de 3A até 4C).',
  },
  {
    termo: 'Visagismo',
    definicao:
      'A arte e ciência de criar uma imagem pessoal personalizada, analisando os formatos geométricos do rosto, a linguagem das linhas e cores, e alinhando com a essência e objetivos da pessoa.',
  },
  {
    termo: 'Dry Cut',
    definicao:
      'Técnica de corte realizada com o cabelo completamente seco e em seu formato natural de uso, permitindo esculpir o caimento e o volume em tempo real.',
  },
  {
    termo: 'Acidificação',
    definicao:
      'Procedimento que rebaixa o pH dos fios após agressões químicas ou alcalinas, selando as escamas da cutícula e devolvendo maciez e brilho imediato.',
  },
  {
    termo: 'Reconstrução Lipídica',
    definicao:
      'Reposição de óleos essenciais e lipídios que formam o cimento intercelular das cutículas, evitando o ressecamento crônico e as pontas duplas.',
  },
]

export const dicasRapidas = [
  {
    icone: 'Moon',
    titulo: 'Fronha de Cetim',
    texto: 'Troque a fronha de algodão por cetim: evita o frizz matinal e previne quebra por atrito.',
  },
  {
    icone: 'Droplets',
    titulo: 'Água Morna ou Fria',
    texto: 'Água muito quente remove a proteção natural do couro cabeludo e resseca o comprimento.',
  },
  {
    icone: 'Scissors',
    titulo: 'Pente de Baixo para Cima',
    texto: 'Desembarace sempre das pontas em direção à raiz, com condicionador ou leave-in nos fios.',
  },
  {
    icone: 'Shield',
    titulo: 'Cuidado ao Dormir',
    texto: 'Nunca durma com os fios molhados ou presos com elásticos de borracha que marcam e partem o cabelo.',
  },
]
