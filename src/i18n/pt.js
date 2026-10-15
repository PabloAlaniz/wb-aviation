/**
 * Mensagens da interface em português (pt-BR).
 * Espelha a estrutura (e as assinaturas de parâmetros) de es.js.
 */
export const pt = {
  app: {
    title: (/** @type {string} */ aircraftName) => `${aircraftName} - Peso e Balanceamento`,
    subtitle: (/** @type {string} */ tcds) => `Cálculo de peso e balanceamento baseado em ${tcds}`,
    aircraftCardTitle: "Dados da Aeronave",
    aircraftCardDescription: "Selecione o tipo de avião e insira os pesos",
    aircraftSelectLabel: "Tipo de Aeronave",
    aircraftSelectPlaceholder: "Selecione uma aeronave",
    clearWeights: "Limpar pesos",
    resultsCardTitle: "Resultados do Cálculo",
    resultsCardDescription: "Peso total e centro de gravidade",
    noAircraftSelected: "Selecione uma aeronave para ver os resultados",
    envelopeSectionTitle: "Envelope do Centro de Gravidade",
    envelopeCaption:
      "O ponto preto mostra a condição atual de peso e CG. As linhas tracejadas indicam as coordenadas exatas. A aeronave está segura para operar somente se o ponto estiver dentro da área sombreada.",
  },

  results: {
    totalWeight: "Peso Total:",
    centerOfGravity: "Centro de Gravidade:",
    ok: "OK",
    overweight: "EXCESSO",
    cgOutOfLimits: "FORA DOS LIMITES",
    readyForTakeoff: "✅ AERONAVE PRONTA PARA DECOLAGEM",
    readyDetail: "Peso e balanceamento dentro dos limites",
    notFitForTakeoff: "⚠️ NÃO APTO PARA DECOLAGEM",
    overweightDetail: "Peso excedido. ",
    cgOutDetail: "Centro de gravidade fora dos limites.",
  },

  safety: {
    title: "Alertas de Segurança",
    weightUsage: "Uso de peso:",
    cgMargin: "Margem CG:",
    weightNearLimit: (/** @type {string|number} */ pct) => `Peso a ${pct}% do máximo permitido`,
    cgNearForward: (/** @type {string|number} */ margin, /** @type {string} */ unit = '"') =>
      `Centro de gravidade muito próximo do limite dianteiro (${margin}${unit} de margem)`,
    cgNearAft: (/** @type {string|number} */ margin, /** @type {string} */ unit = '"') =>
      `Centro de gravidade muito próximo do limite traseiro (${margin}${unit} de margem)`,
    reduceWeight: (/** @type {string|number} */ value, /** @type {string} */ unit = "lbs") =>
      `Considere reduzir o peso em ${value} ${unit} para uma maior margem de segurança`,
    dataPartial: "Dados parcialmente verificados - confirme com a documentação oficial",
    dataEstimated: "Dados estimados - confirme com a documentação oficial",
  },

  aircraftInfo: {
    emptyWeight: (/** @type {string|number} */ value, /** @type {string} */ unit = "lbs") =>
      `Peso vazio: ${value} ${unit}`,
    maxWeight: (/** @type {string|number} */ value, /** @type {string} */ unit = "lbs") =>
      `Peso máximo: ${value} ${unit}`,
    cgLimits: (
      /** @type {string|number} */ forward,
      /** @type {string|number} */ aft,
      /** @type {string} */ unit = '"'
    ) => `Limites CG: ${forward}${unit} - ${aft}${unit}`,
    production: "Produção:",
    productionDetail: (/** @type {string|number} */ years, /** @type {string|number} */ total) =>
      `${years} (${total} fabricados)`,
    engines: "Motores:",
    manufacturer: "Fabricante atual:",
    dataReliability: "Confiabilidade dos dados:",
    reliabilityVerified: "Verificado",
    reliabilityPartial: "Parcial",
    reliabilityEstimated: "Estimado",
  },

  stations: {
    pilot: "Piloto",
    copilot: "Copiloto",
    frontPassenger: "Acompanhante",
    passenger1: "Passageiro 1",
    passenger2: "Passageiro 2",
    passenger3: "Passageiro 3",
    passenger4: "Passageiro 4",
    rearPassenger1: "Passageiro traseiro 1",
    rearPassenger2: "Passageiro traseiro 2",
    baggage: "Bagagem",
    baggage1: "Bagagem 1",
    baggage2: "Bagagem 2",
    baggageArea1: "Bagagem área 1",
    baggageArea2: "Bagagem área 2",
    baggageExtension: "Extensão do bagageiro",
    fuel: "Combustível",
  },

  units: {
    label: "Unidades",
    imperial: "Imperial (lbs, in, gal)",
    metric: "Métrico (kg, mm, L)",
    stationLabel: (/** @type {string} */ label, /** @type {string} */ unit) => `${label} (${unit})`,
    stationLabelMax: (
      /** @type {string} */ label,
      /** @type {string} */ unit,
      /** @type {string|number} */ max
    ) => `${label} (${unit}, máx ${max})`,
    fuelInputMode: "Inserir combustível por",
    byWeight: "Peso",
    byVolume: "Volume",
    fuelEquivalent: (/** @type {string} */ value) => `Equivale a ${value}`,
    fuelDensityNote: (/** @type {string} */ density) => `Densidade AVGAS: ${density}`,
    millimeters: "milímetros",
    kilograms: "quilogramas",
    axisNoteMetric: "Braço C.G. - mm atrás do Datum STA 0.0",
  },

  dataSources: {
    title: "Referências e Fontes Oficiais",
    lastUpdated: "Última atualização:",
    verifiedSources: "Fontes verificadas:",
    pendingVerification: "⚠️ Pendente de verificação:",
    aircraftSpecificTitle: "⚠️ Dados de Aeronave Específica",
    basedOn: "Exemplo baseado em:",
    disclaimerLabel: "Importante:",
    disclaimer:
      "Sempre consulte a documentação oficial específica da sua aeronave para cálculos operacionais de peso e balanceamento. Esta ferramenta é apenas para referência geral.",
  },

  chart: {
    title: (/** @type {string} */ tcds) => `Envelope de CG — ${tcds}`,
    axisNote: "C.G. Arm - Inches aft of Datum STA 0.0",
    tooltipTitle: "Informações do Ponto",
    tooltipCg: (/** @type {string|number} */ value, /** @type {string} */ unit = '"') =>
      `CG: ${value}${unit} Arm`,
    tooltipWeight: (/** @type {string|number} */ value, /** @type {string} */ unit = "lbs") =>
      `Peso: ${value} ${unit}`,
    envelopeLimit: "Limite do Envelope",
    operatingPoint: "Ponto Operacional",
    xUnit: "inches",
    yUnit: "pounds",
  },

  flightPhases: {
    title: "Pouso e peso zero combustível",
    fuelBurnLabel: "Combustível a consumir em voo",
    fuelBurnPlaceholder: "800",
    fuelLoaded: (/** @type {string|number} */ value, unit = "lbs") =>
      `Combustível abastecido: ${value} ${unit}`,
    noFuelStation: "Esta aeronave não tem estação de combustível definida",
    phase: "Fase",
    weight: "Peso",
    cg: "CG",
    status: "Estado",
    takeoff: "Decolagem",
    landing: "Pouso",
    zeroFuel: "Zero combustível (ZFW)",
    inEnvelope: "OK",
    outOfEnvelope: "FORA",
    readyForLanding: "✅ POUSO DENTRO DOS LIMITES",
    landingOkDetail: "Peso e balanceamento no pouso dentro dos limites",
    notFitForLanding: "⚠️ POUSO FORA DOS LIMITES",
    overMaxLandingWeight: (/** @type {string|number} */ value, unit = "lbs") =>
      `Peso de pouso excede o máximo (${value} ${unit})`,
    overMaxZeroFuelWeight: (/** @type {string|number} */ value, unit = "lbs") =>
      `Peso zero combustível excede o máximo (${value} ${unit})`,
    landingOutOfEnvelope: "Centro de gravidade no pouso fora do envelope",
    zeroFuelOutOfEnvelope: "Centro de gravidade sem combustível fora do envelope",
    burnExceedsFuel: (
      /** @type {string|number} */ burn,
      /** @type {string|number} */ loaded,
      unit = "lbs"
    ) =>
      `O consumo planejado (${burn} ${unit}) excede o combustível abastecido (${loaded} ${unit})`,
    chartLanding: "Pouso",
    chartZeroFuel: "Zero combustível",
    chartBurnPath: "Consumo de combustível",
  },

  customAircraft: {
    title: "Minhas aeronaves (por matrícula)",
    description:
      "Informe o peso vazio e o braço do Weight & Balance Report da sua aeronave. O envelope, as estações e os limites vêm do modelo base.",
    baseModelLabel: "Modelo base",
    registrationLabel: "Matrícula",
    registrationPlaceholder: "PR-ABC",
    emptyWeightLabel: "Peso vazio",
    emptyArmLabel: "Braço do peso vazio",
    save: "Salvar aeronave",
    empty: "Você ainda não salvou nenhuma aeronave.",
    listLabel: "Aeronaves salvas",
    recordDetail: (/** @type {string} */ weight, /** @type {string} */ arm) => `${weight} @ ${arm}`,
    remove: (/** @type {string} */ registration) => `Excluir ${registration}`,
    sourceDocument: "Weight & Balance Report da aeronave (dados informados pelo usuário)",
    specificWarning:
      "Peso vazio e braço informados pelo usuário a partir do Weight & Balance Report desta aeronave. Envelope, estações e limites vêm do modelo base: verifique-os com o POH da sua aeronave.",
    errors: {
      registrationRequired: "Informe a matrícula.",
      registrationInvalid:
        "Matrícula inválida (apenas letras, números e hífens, 2 a 10 caracteres).",
      baseModelUnknown: "Selecione um modelo base.",
      emptyWeightInvalid: "Informe um peso vazio maior que 0.",
      emptyWeightAboveMax: "O peso vazio deve ser menor que o peso máximo do modelo.",
      emptyArmInvalid: "Informe um braço maior que 0.",
    },
  },

  share: {
    button: "Compartilhar",
    buttonLabel: "Compartilhar um link para este cálculo",
    copied: "Link copiado",
    copyFailed: "Não foi possível copiar o link",
    showQr: "Mostrar QR",
    hideQr: "Ocultar QR",
    qrAlt: "Código QR com o link para este cálculo",
    qrFailed: "Não foi possível gerar o código QR",
    shareTitle: (/** @type {string} */ aircraftName) => `Peso e balanceamento: ${aircraftName}`,
    loaded: "Um cálculo compartilhado foi carregado.",
    conflict:
      "O link traz uma aeronave cuja matrícula você já salvou com outro peso vazio ou braço. Ele não foi carregado para não sobrescrever seus dados.",
    invalid: "O link compartilhado é inválido ou está incompleto.",
    dismiss: "Fechar aviso",
  },

  errorBoundary: {
    title: "Algo deu errado",
    description:
      "Ocorreu um erro inesperado no aplicativo. Você pode tentar novamente ou recarregar a página. Se o problema persistir, tente limpar os dados salvos do navegador.",
    retry: "Tentar novamente",
  },

  fleet: {
    shareTitle: "Compartilhar frota (instrutores e escolas)",
    shareDescription:
      "Gere um link com suas aeronaves por matrícula para que seus alunos as importem no dispositivo deles. Apenas modelo base, matrícula, peso vazio e braço são compartilhados.",
    schoolNameLabel: "Escola ou aeroclube (opcional)",
    schoolNamePlaceholder: "Aeroclube ...",
    shareButton: "Compartilhar frota",
    shareEmpty: "Salve pelo menos uma aeronave por matrícula para compartilhar sua frota.",
    truncated: (/** @type {number} */ max) =>
      `Somente as primeiras ${max} aeronaves são incluídas.`,
    copied: "Link da frota copiado para a área de transferência.",
    shared: "Link da frota compartilhado.",
    copyFailed: "Não foi possível copiar automaticamente. Copie o link:",
    linkLabel: "Link da frota",
    importTitle: "Importar frota",
    importFrom: (/** @type {string} */ name) => `${name} compartilhou a frota com você.`,
    importAnonymous: "Compartilharam uma frota de aeronaves com você.",
    importListLabel: "Aeronaves a importar",
    overwriteNote:
      "Se você já salvou alguma dessas matrículas, os dados dela serão substituídos pelos do link.",
    willOverwrite: "Substitui a salva",
    verifyNote:
      "Confira peso vazio e braço com o Weight & Balance Report de cada aeronave antes de voar.",
    importButton: (/** @type {number} */ count) =>
      count === 1 ? "Importar 1 aeronave" : `Importar ${count} aeronaves`,
    dismiss: "Descartar",
    imported: (/** @type {number} */ count) =>
      count === 1 ? "1 aeronave importada." : `${count} aeronaves importadas.`,
    invalidLink: "O link da frota é inválido ou está corrompido.",
    close: "Fechar",
  },

  footer: {
    madeBy: "Feito por",
    sourceCode: "Código-fonte no GitHub",
    fleetHint: "É instrutor ou escola? Compartilhe sua frota",
    disclaimer:
      "Ferramenta de apoio: o POH/AFM e o Weight & Balance Report da sua aeronave são a referência oficial. Sempre confira os resultados.",
    version: (/** @type {string} */ version) => `Versão ${version}`,
  },

  loadSheet: {
    formTitle: "Folha de carga (imprimir / PDF)",
    formDescription:
      "Preencha os dados do voo para imprimir a folha de peso e balanceamento ou salvá-la como PDF.",
    pilot: "Piloto em comando",
    registration: "Matrícula da aeronave",
    date: "Data",
    departure: "Origem (ICAO)",
    destination: "Destino (ICAO)",
    icaoPlaceholder: "SBSP",
    remarks: "Observações",
    printButton: "Imprimir folha de carga / Salvar PDF",
    sheetTitle: "Folha de carga — Peso e balanceamento",
    aircraft: "Aeronave",
    tcds: "TCDS",
    route: "Rota",
    units: (
      /** @type {string} */ weight,
      /** @type {string} */ arm,
      /** @type {string} */ moment
    ) => `Unidades: peso ${weight}, braço ${arm}, momento ${moment}`,
    stationsTitle: "Distribuição da carga",
    station: "Estação",
    weight: "Peso",
    arm: "Braço",
    moment: "Momento",
    emptyWeight: "Peso vazio (básico)",
    total: "Total na decolagem",
    phasesTitle: "Fases do voo",
    phase: "Condição",
    cg: "CG",
    status: "Envelope",
    inEnvelope: "DENTRO",
    outOfEnvelope: "FORA",
    plannedBurn: "Consumo previsto",
    limitsTitle: "Limites",
    maxTakeoffWeight: "Peso máximo de decolagem",
    maxLandingWeight: "Peso máximo de pouso",
    maxZeroFuelWeight: "Peso máximo sem combustível",
    cgLimits: "Limites de CG (diant. / tras.)",
    takeoffOk: "Decolagem dentro dos limites",
    takeoffNotOk: "DECOLAGEM FORA DOS LIMITES",
    warningsTitle: "Alertas de segurança",
    noWarnings: "Sem alertas.",
    envelopeTitle: "Envelope de CG",
    dataTitle: "Confiabilidade dos dados e fontes",
    reliability: "Confiabilidade:",
    pending: "Pendente de verificação:",
    remarksTitle: "Observações",
    signature: "Assinatura do piloto em comando",
    generatedBy: "Gerado com CheckCG",
    disclaimer:
      "Ferramenta de referência. O manual de voo (POH/AFM) e o relatório de peso e balanceamento da aeronave prevalecem sobre esta folha.",
  },

  guides: {
    navLabel: "Guias",
    footerLink: "Guias de peso e balanceamento",
    homeTitle: "Guias de peso e balanceamento",
    homeIntro: "Aprenda a fazer o cálculo à mão e a entender os limites do seu avião.",
    indexTitle: "Guias de peso e balanceamento para pilotos | CheckCG",
    indexDescription:
      "Guias gratuitos de peso e balanceamento: como calcular o centro de gravidade, peso, braço e momento com um exemplo resolvido e como ler o envelope de CG.",
    indexH1: "Guias de peso e balanceamento",
    indexIntro:
      "Explicações claras para alunos, pilotos e instrutores. Cada guia termina com um link para a calculadora, para você praticar com o seu próprio avião.",
    breadcrumbHome: "Início",
    updated: "Atualizado:",
    faqTitle: "Perguntas frequentes",
    ctaTitle: "Teste na calculadora",
    ctaText:
      "Informe o peso vazio da ficha de peso e balanceamento e o peso de cada estação: o CheckCG calcula o CG na decolagem, no pouso e com zero combustível, e gera a planilha de carregamento. Grátis e offline.",
    ctaButton: "Abrir a calculadora",
    ctaAircraft: "Dados de referência por aeronave:",
    otherGuides: "Outros guias",
    readGuide: "Ler o guia",
    disclaimer:
      "Material de estudo. O POH/AFM e a ficha de peso e balanceamento da sua aeronave são a referência oficial.",
  },

  seo: {
    siteName: "CheckCG",
    ogLocale: "pt_BR",
    languageLabel: "Idioma",
    calculatorTitle: "Calculadora interativa",
    loading: "Carregando a calculadora…",
    noscript:
      "A calculadora precisa de JavaScript. Os dados de referência desta página podem ser consultados sem ele.",
    appDescription:
      "Calculadora gratuita de peso e balanceamento (Weight & Balance) de aeronaves: centro de gravidade, envelope de CG e folha de carga. Funciona offline e sem cadastro.",
    home: {
      title: "Calculadora de peso e balanceamento de aeronaves | CheckCG",
      description:
        "Calcule o peso e balanceamento (Weight & Balance) e o centro de gravidade da sua aeronave com dados do TCDS e do POH. Grátis, offline e sem cadastro.",
      h1: "Calculadora de peso e balanceamento de aeronaves",
      intro1:
        "O peso e balanceamento (Weight & Balance) verifica, antes de cada voo, que a aeronave não ultrapasse o peso máximo e que o centro de gravidade (CG) fique dentro do envelope aprovado. Um CG fora dos limites afeta a estabilidade e o controle, mesmo com o peso total correto.",
      intro2:
        "O CheckCG soma o peso vazio e cada estação de carga (tripulação, passageiros, bagagem e combustível), calcula o momento e o CG resultantes e os compara com o envelope do fabricante, inclusive no pouso e sem combustível. Funciona no navegador, sem cadastro e offline.",
      aircraftListTitle: "Aeronaves disponíveis",
      aircraftLink: (/** @type {string} */ name) => `Peso e balanceamento ${name}`,
    },
    aircraft: {
      title: (/** @type {string} */ name) =>
        `Peso e balanceamento ${name}: calculadora de CG | CheckCG`,
      description: (/** @type {string} */ name, /** @type {string} */ maxWeight) =>
        `Calculadora de peso e balanceamento do ${name}: peso máximo ${maxWeight}, braços das estações, limites e envelope de CG. Grátis e offline.`,
      h1: (/** @type {string} */ name) => `Peso e balanceamento ${name}`,
      intro: (/** @type {string} */ name, /** @type {string} */ tcds) =>
        `Calcule o peso total e o centro de gravidade do ${name} com os dados de referência de ${tcds}. Informe o peso de cada estação e a calculadora verifica o peso máximo e o envelope de CG na decolagem e no pouso.`,
      specsTitle: "Dados de peso e balanceamento",
      tcds: "Folha de dados (TCDS)",
      manufacturer: "Fabricante",
      engines: "Motores",
      maxWeight: "Peso máximo de decolagem",
      emptyWeight: "Peso vazio de referência",
      emptyArm: "Braço do peso vazio",
      cgLimits: "Limites de CG",
      cgLimitsValue: (/** @type {string} */ forward, /** @type {string} */ aft) =>
        `${forward} a ${aft} atrás do datum`,
      stationsTitle: "Estações de carga e braços",
      station: "Estação",
      arm: "Braço (in)",
      maxLoad: "Máximo (lbs)",
      envelopeTitle: "Pontos do envelope de CG",
      envelopeCaption:
        "Vértices do polígono do envelope (braço em polegadas atrás do datum, peso em libras).",
      point: "Ponto",
      envelopeArm: "Braço (in)",
      envelopeWeight: "Peso (lbs)",
      reliabilityTitle: "Confiabilidade dos dados e fontes",
      reliabilityLabel: "Confiabilidade:",
      reliabilityVerifiedComplete: "verificados com documentação oficial",
      reliabilityVerifiedPartial: "parcialmente verificados",
      reliabilityEstimated: "valores de referência estimados",
      lastVerified: "Última verificação:",
      sourcesLabel: "Fontes:",
      pendingLabel: "Pendente de verificação:",
      ownDataWarning:
        "O peso vazio e o seu braço variam em cada aeronave: use os do relatório de peso e balanceamento da sua aeronave (você pode cadastrá-los como aeronave personalizada na calculadora).",
      faqTitle: "Perguntas frequentes",
      faqWhatQ: (/** @type {string} */ name) =>
        `Como se calcula o peso e balanceamento do ${name}?`,
      faqWhatA: (/** @type {string} */ name) =>
        `Multiplica-se o peso de cada estação pelo seu braço para obter o momento, somam-se pesos e momentos (incluindo o peso vazio) e o CG é o momento total dividido pelo peso total. O ${name} está dentro dos limites quando o peso não excede o máximo e o ponto peso/CG fica dentro do envelope.`,
      faqMaxWeightQ: (/** @type {string} */ name) => `Qual é o peso máximo do ${name}?`,
      faqMaxWeightA: (
        /** @type {string} */ name,
        /** @type {string} */ maxWeight,
        /** @type {string} */ tcds
      ) =>
        `O peso máximo de decolagem de referência do ${name} é ${maxWeight}, segundo ${tcds}. Confirme sempre no POH/AFM da sua aeronave.`,
      faqCgQ: (/** @type {string} */ name) => `Quais são os limites de CG do ${name}?`,
      faqCgA: (
        /** @type {string} */ name,
        /** @type {string} */ forward,
        /** @type {string} */ aft
      ) =>
        `O CG do ${name} deve ficar entre ${forward} (limite dianteiro) e ${aft} (limite traseiro) atrás do datum. O limite efetivo depende do peso: o envelope desta página mostra a forma completa.`,
      faqOwnQ: (/** @type {string} */ name) => `Posso usar esta calculadora para o meu ${name}?`,
      faqOwnA: (/** @type {string} */ name) =>
        `Sim, como referência. Cada ${name} tem o seu próprio peso vazio e braço conforme o equipamento: cadastre-os a partir do relatório de peso e balanceamento como aeronave personalizada. O POH/AFM é sempre a referência oficial.`,
      otherAircraftTitle: "Outras aeronaves",
    },
  },
}
