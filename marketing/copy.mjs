/**
 * Copy for the printed pieces (flyer A5, schools one-pager A4), in Spanish
 * (rioplatense) and Brazilian Portuguese. Keep it in line with what the app
 * actually does (see src/i18n/*.js): offline PWA, own aircraft by
 * registration, kg/lbs, printable load sheet, share link/QR (calculation) and
 * fleet link (no QR) for schools.
 */

export const flyer = {
  es: {
    lang: "es",
    file: "flyer-es",
    title: "CheckCG: peso y balance en tu celular",
    headline: "Peso y balance en tu celular, gratis",
    lead: "Calculá el centro de gravedad antes de cada vuelo, con los datos del TCDS y el POH.",
    benefits: [
      [
        "Funciona sin señal",
        "Instalala en el celular como una app y usala offline: en la plataforma, en el hangar o en el aeroclub.",
      ],
      [
        "Tu avión, con su matrícula",
        "Cargá el peso vacío y el brazo de su Weight & Balance Report. Trabajá en kg o en lbs, como prefieras.",
      ],
      [
        "Hoja de carga lista",
        "Imprimila o guardala en PDF para la carpeta de vuelo, y compartí el cálculo con un link o un QR.",
      ],
    ],
    aircraftTitle: "Aeronaves incluidas",
    qrCta: "Escaneá y probala",
    credit: "Hecho por Pablo Alaniz · open source",
    disclaimer: "Herramienta de ayuda: el POH/AFM de tu aeronave es la referencia oficial.",
    qrUrl: "https://checkcg.com/?ref=flyer",
  },
  pt: {
    lang: "pt-BR",
    file: "flyer-pt",
    title: "CheckCG: peso e balanceamento no seu celular",
    headline: "Peso e balanceamento no seu celular, grátis",
    lead: "Calcule o centro de gravidade antes de cada voo, com os dados do TCDS e do POH.",
    benefits: [
      [
        "Funciona sem sinal",
        "Instale no celular como um app e use offline: no pátio, no hangar ou no aeroclube.",
      ],
      [
        "Seu avião, com a matrícula dele",
        "Informe o peso vazio e o braço do Weight & Balance Report. Trabalhe em kg ou em lbs, como preferir.",
      ],
      [
        "Folha de carga pronta",
        "Imprima ou salve em PDF para a pasta de voo, e compartilhe o cálculo por link ou QR code.",
      ],
    ],
    aircraftTitle: "Aeronaves incluídas",
    qrCta: "Escaneie e experimente",
    credit: "Feito por Pablo Alaniz · open source",
    disclaimer: "Ferramenta de apoio: o POH/AFM da sua aeronave é a referência oficial.",
    qrUrl: "https://checkcg.com/?ref=flyer",
  },
}

export const schools = {
  es: {
    lang: "es",
    file: "escuelas-es",
    title: "CheckCG para escuelas de vuelo",
    headline: "CheckCG para escuelas de vuelo",
    lead: "Peso y balance correcto para cada alumno y cada matrícula de tu flota. Gratis y sin cuentas.",
    problemTitle: "El problema",
    problem:
      "Las planillas en papel o en Excel pasan de alumno en alumno, quedan desactualizadas y no distinguen una matrícula de otra. Un brazo mal leído o un momento mal multiplicado alcanzan para dejar el CG fuera de la envolvente sin que nadie lo note.",
    stepsTitle: "Cómo funciona el modo escuela",
    steps: [
      [
        "El instructor carga la flota",
        "En «Mis aeronaves» carga cada avión por matrícula, con el peso vacío y el brazo de su última pesada (Weight & Balance Report).",
      ],
      [
        "Comparte el link de la flota",
        "Con «Compartir flota» genera un único link con el nombre de la escuela, para mandarlo por WhatsApp, mail o el grupo del curso.",
      ],
      [
        "Los alumnos lo importan",
        "Abren el link, importan las aeronaves y calculan con los datos de cada matrícula. Imprimen la hoja de carga (o la guardan en PDF) para la carpeta de vuelo.",
      ],
    ],
    includedTitle: "Qué incluye",
    included: (/** @type {number} */ count) => [
      `${count} aeronaves con datos del TCDS y el POH`,
      "Verificación al despegue, al aterrizaje y sin combustible",
      "Español, inglés y portugués",
      "Funciona offline y se instala en el celular",
      "Unidades en kg o en lbs",
      "Gratis y open source (licencia MIT)",
      "Sin cuentas ni registro: los datos quedan en cada dispositivo",
    ],
    qrCta: "Probalo ahora",
    qrUrl: "https://checkcg.com/?ref=escuelas",
    disclaimer:
      "CheckCG es una herramienta de ayuda. El POH/AFM y el Weight & Balance Report de cada aeronave son la referencia oficial y prevalecen sobre cualquier cálculo de la app. Verificá siempre los resultados.",
    credit: "Hecho por Pablo Alaniz · open source",
    contact: "Contacto y código:",
  },
  pt: {
    lang: "pt-BR",
    file: "escolas-pt",
    title: "CheckCG para escolas de aviação",
    headline: "CheckCG para escolas de aviação",
    lead: "Peso e balanceamento certo para cada aluno e cada matrícula da sua frota. Grátis e sem cadastro.",
    problemTitle: "O problema",
    problem:
      "As planilhas em papel ou em Excel passam de aluno para aluno, ficam desatualizadas e não diferenciam uma matrícula da outra. Um braço lido errado ou um momento mal multiplicado bastam para deixar o CG fora do envelope sem que ninguém perceba.",
    stepsTitle: "Como funciona o modo escola",
    steps: [
      [
        "O instrutor cadastra a frota",
        "Em «Minhas aeronaves» cadastra cada avião pela matrícula, com o peso vazio e o braço da última pesagem (Weight & Balance Report).",
      ],
      [
        "Compartilha o link da frota",
        "Com «Compartilhar frota» gera um único link com o nome da escola, para enviar por WhatsApp, e-mail ou no grupo da turma.",
      ],
      [
        "Os alunos importam",
        "Abrem o link, importam as aeronaves e calculam com os dados de cada matrícula. Imprimem a folha de carga (ou salvam em PDF) para a pasta de voo.",
      ],
    ],
    includedTitle: "O que inclui",
    included: (/** @type {number} */ count) => [
      `${count} aeronaves com dados do TCDS e do POH`,
      "Verificação na decolagem, no pouso e sem combustível",
      "Português, espanhol e inglês",
      "Funciona offline e pode ser instalado no celular",
      "Unidades em kg ou em lbs",
      "Grátis e open source (licença MIT)",
      "Sem contas nem cadastro: os dados ficam em cada dispositivo",
    ],
    qrCta: "Experimente agora",
    qrUrl: "https://checkcg.com/?ref=escolas",
    disclaimer:
      "O CheckCG é uma ferramenta de apoio. O POH/AFM e o Weight & Balance Report de cada aeronave são a referência oficial e prevalecem sobre qualquer cálculo do app. Sempre confira os resultados.",
    credit: "Feito por Pablo Alaniz · open source",
    contact: "Contato e código:",
  },
}
