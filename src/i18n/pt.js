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
    baggage1: "Bagagem 1",
    baggage2: "Bagagem 2",
    baggageArea1: "Bagagem área 1",
    baggageArea2: "Bagagem área 2",
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
}
