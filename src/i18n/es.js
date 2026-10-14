/**
 * Mensajes de UI en español (idioma base).
 * Para agregar un idioma: copiar este archivo (p. ej. en.js), traducir los
 * valores y exportarlo desde src/i18n/index.js según el locale activo.
 * Los mensajes con parámetros son funciones que devuelven el string final.
 */
export const es = {
  app: {
    title: (/** @type {string} */ aircraftName) => `${aircraftName} - Peso y Centrado`,
    subtitle: (/** @type {string} */ tcds) => `Cálculo de peso y centrado basado en ${tcds}`,
    aircraftCardTitle: "Datos de la Aeronave",
    aircraftCardDescription: "Selecciona el tipo de avión e ingresa los pesos",
    aircraftSelectLabel: "Tipo de Aeronave",
    aircraftSelectPlaceholder: "Selecciona una aeronave",
    clearWeights: "Limpiar pesos",
    resultsCardTitle: "Resultados del Cálculo",
    resultsCardDescription: "Peso total y centro de gravedad",
    noAircraftSelected: "Selecciona una aeronave para ver los resultados",
    envelopeSectionTitle: "Envolvente de Centro de Gravedad",
    envelopeCaption:
      "El punto negro muestra la condición actual de peso y CG. Las líneas punteadas indican las coordenadas exactas. La aeronave está segura para operar solo si el punto está dentro del área sombreada.",
  },

  results: {
    totalWeight: "Peso Total:",
    centerOfGravity: "Centro de Gravedad:",
    ok: "OK",
    overweight: "EXCESO",
    cgOutOfLimits: "FUERA DE LÍMITES",
    readyForTakeoff: "✅ AERONAVE LISTA PARA DESPEGUE",
    readyDetail: "Peso y centrado dentro de los límites",
    notFitForTakeoff: "⚠️ NO APTO PARA DESPEGUE",
    overweightDetail: "Peso excedido. ",
    cgOutDetail: "Centro de gravedad fuera de límites.",
  },

  safety: {
    title: "Alertas de Seguridad",
    weightUsage: "Uso de peso:",
    cgMargin: "Margen CG:",
    weightNearLimit: (/** @type {string|number} */ pct) => `Peso al ${pct}% del máximo permitido`,
    cgNearForward: (/** @type {string|number} */ margin) =>
      `Centro de gravedad muy cerca del límite frontal (${margin}" de margen)`,
    cgNearAft: (/** @type {string|number} */ margin) =>
      `Centro de gravedad muy cerca del límite posterior (${margin}" de margen)`,
    reduceWeight: (/** @type {string|number} */ lbs) =>
      `Considerar reducir peso en ${lbs} lbs para mayor margen de seguridad`,
    dataPartial: "Datos parcialmente verificados - confirmar con documentación oficial",
    dataEstimated: "Datos estimados - confirmar con documentación oficial",
  },

  aircraftInfo: {
    emptyWeight: (/** @type {string|number} */ lbs) => `Peso vacío: ${lbs} lbs`,
    maxWeight: (/** @type {string|number} */ lbs) => `Peso máximo: ${lbs} lbs`,
    cgLimits: (/** @type {string|number} */ forward, /** @type {string|number} */ aft) =>
      `CG límites: ${forward}" - ${aft}"`,
    production: "Producción:",
    productionDetail: (/** @type {string|number} */ years, /** @type {string|number} */ total) =>
      `${years} (${total} fabricados)`,
    engines: "Motores:",
    manufacturer: "Fabricante actual:",
    dataReliability: "Confiabilidad de datos:",
    reliabilityVerified: "Verificado",
    reliabilityPartial: "Parcial",
    reliabilityEstimated: "Estimado",
  },

  dataSources: {
    title: "Referencias y Fuentes Oficiales",
    lastUpdated: "Última actualización:",
    verifiedSources: "Fuentes verificadas:",
    pendingVerification: "⚠️ Pendiente de verificación:",
    aircraftSpecificTitle: "⚠️ Datos de Aeronave Específica",
    basedOn: "Ejemplo basado en:",
    disclaimerLabel: "Importante:",
    disclaimer:
      "Siempre consulte la documentación oficial específica de su aeronave para cálculos de peso y balance operacionales. Esta herramienta es de referencia general.",
  },

  chart: {
    title: (/** @type {string} */ tcds) => `Envolvente de CG — ${tcds}`,
    axisNote: "C.G. Arm - Inches aft of Datum STA 0.0",
    tooltipTitle: "Información del Punto",
    tooltipCg: (/** @type {string|number} */ value) => `CG: ${value}" Arm`,
    tooltipWeight: (/** @type {string|number} */ value) => `Peso: ${value} lbs`,
    envelopeLimit: "Límite del Envolvente",
    operatingPoint: "Punto Operativo",
    xUnit: "inches",
    yUnit: "pounds",
  },

  flightPhases: {
    title: "Aterrizaje y peso sin combustible",
    fuelBurnLabel: "Combustible a consumir en vuelo (lbs)",
    fuelBurnPlaceholder: "800",
    fuelLoaded: (/** @type {string|number} */ lbs) => `Combustible cargado: ${lbs} lbs`,
    noFuelStation: "Esta aeronave no tiene estación de combustible definida",
    phase: "Fase",
    weight: "Peso",
    cg: "CG",
    status: "Estado",
    takeoff: "Despegue",
    landing: "Aterrizaje",
    zeroFuel: "Sin combustible (ZFW)",
    inEnvelope: "OK",
    outOfEnvelope: "FUERA",
    readyForLanding: "✅ ATERRIZAJE DENTRO DE LÍMITES",
    landingOkDetail: "Peso y centrado al aterrizar dentro de límites",
    notFitForLanding: "⚠️ ATERRIZAJE FUERA DE LÍMITES",
    overMaxLandingWeight: (/** @type {string|number} */ lbs) =>
      `Peso de aterrizaje excede el máximo (${lbs} lbs)`,
    overMaxZeroFuelWeight: (/** @type {string|number} */ lbs) =>
      `Peso sin combustible excede el máximo (${lbs} lbs)`,
    landingOutOfEnvelope: "Centro de gravedad al aterrizar fuera de la envolvente",
    zeroFuelOutOfEnvelope: "Centro de gravedad sin combustible fuera de la envolvente",
    burnExceedsFuel: (/** @type {string|number} */ burn, /** @type {string|number} */ loaded) =>
      `El consumo planificado (${burn} lbs) supera el combustible cargado (${loaded} lbs)`,
    chartLanding: "Aterrizaje",
    chartZeroFuel: "Sin combustible",
    chartBurnPath: "Consumo de combustible",
  },

  customAircraft: {
    title: "Mis aeronaves (por matrícula)",
    description:
      "Cargá el peso vacío y el brazo del Weight & Balance Report de tu aeronave. La envolvente, las estaciones y los límites se toman del modelo base.",
    baseModelLabel: "Modelo base",
    registrationLabel: "Matrícula",
    registrationPlaceholder: "LV-ABC",
    emptyWeightLabel: "Peso vacío (lbs)",
    emptyArmLabel: "Brazo del peso vacío (in)",
    save: "Guardar aeronave",
    empty: "Todavía no guardaste ninguna aeronave.",
    listLabel: "Aeronaves guardadas",
    recordDetail: (/** @type {string|number} */ lbs, /** @type {string|number} */ arm) =>
      `${lbs} lbs @ ${arm}"`,
    remove: (/** @type {string} */ registration) => `Eliminar ${registration}`,
    sourceDocument: "Weight & Balance Report de la aeronave (datos ingresados por el usuario)",
    specificWarning:
      "Peso vacío y brazo ingresados por el usuario desde el Weight & Balance Report de esta aeronave. Envolvente, estaciones y límites provienen del modelo base: verifíquelos con el POH de su aeronave.",
    errors: {
      registrationRequired: "Ingresá la matrícula.",
      registrationInvalid:
        "Matrícula inválida (solo letras, números y guiones, 2 a 10 caracteres).",
      baseModelUnknown: "Seleccioná un modelo base.",
      emptyWeightInvalid: "Ingresá un peso vacío mayor a 0.",
      emptyWeightAboveMax: "El peso vacío debe ser menor al peso máximo del modelo.",
      emptyArmInvalid: "Ingresá un brazo mayor a 0.",
    },
  },

  errorBoundary: {
    title: "Algo salió mal",
    description:
      "Ocurrió un error inesperado en la aplicación. Podés reintentar o recargar la página. Si el problema persiste, probá limpiar los datos guardados del navegador.",
    retry: "Reintentar",
  },
}
