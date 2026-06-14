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
    cgNearForward: (/** @type {string|number} */ margin) =>
      `Centro de gravidade muito próximo do limite dianteiro (${margin}" de margem)`,
    cgNearAft: (/** @type {string|number} */ margin) =>
      `Centro de gravidade muito próximo do limite traseiro (${margin}" de margem)`,
    reduceWeight: (/** @type {string|number} */ lbs) =>
      `Considere reduzir o peso em ${lbs} lbs para uma maior margem de segurança`,
    dataPartial: "Dados parcialmente verificados - confirme com a documentação oficial",
    dataEstimated: "Dados estimados - confirme com a documentação oficial",
  },

  aircraftInfo: {
    emptyWeight: (/** @type {string|number} */ lbs) => `Peso vazio: ${lbs} lbs`,
    maxWeight: (/** @type {string|number} */ lbs) => `Peso máximo: ${lbs} lbs`,
    cgLimits: (/** @type {string|number} */ forward, /** @type {string|number} */ aft) =>
      `Limites CG: ${forward}" - ${aft}"`,
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
    tooltipCg: (/** @type {string|number} */ value) => `CG: ${value}" Arm`,
    tooltipWeight: (/** @type {string|number} */ value) => `Peso: ${value} lbs`,
    envelopeLimit: "Limite do Envelope",
    operatingPoint: "Ponto Operacional",
    xUnit: "inches",
    yUnit: "pounds",
  },

  errorBoundary: {
    title: "Algo deu errado",
    description:
      "Ocorreu um erro inesperado no aplicativo. Você pode tentar novamente ou recarregar a página. Se o problema persistir, tente limpar os dados salvos do navegador.",
    retry: "Tentar novamente",
  },
}
