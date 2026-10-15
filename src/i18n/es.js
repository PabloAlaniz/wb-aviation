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
    cgNearForward: (/** @type {string|number} */ margin, /** @type {string} */ unit = '"') =>
      `Centro de gravedad muy cerca del límite frontal (${margin}${unit} de margen)`,
    cgNearAft: (/** @type {string|number} */ margin, /** @type {string} */ unit = '"') =>
      `Centro de gravedad muy cerca del límite posterior (${margin}${unit} de margen)`,
    reduceWeight: (/** @type {string|number} */ value, /** @type {string} */ unit = "lbs") =>
      `Considerar reducir peso en ${value} ${unit} para mayor margen de seguridad`,
    dataPartial: "Datos parcialmente verificados - confirmar con documentación oficial",
    dataEstimated: "Datos estimados - confirmar con documentación oficial",
  },

  aircraftInfo: {
    emptyWeight: (/** @type {string|number} */ value, /** @type {string} */ unit = "lbs") =>
      `Peso vacío: ${value} ${unit}`,
    maxWeight: (/** @type {string|number} */ value, /** @type {string} */ unit = "lbs") =>
      `Peso máximo: ${value} ${unit}`,
    cgLimits: (
      /** @type {string|number} */ forward,
      /** @type {string|number} */ aft,
      /** @type {string} */ unit = '"'
    ) => `CG límites: ${forward}${unit} - ${aft}${unit}`,
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

  stations: {
    pilot: "Piloto",
    copilot: "Copiloto",
    frontPassenger: "Acompañante",
    passenger1: "Pasajero 1",
    passenger2: "Pasajero 2",
    passenger3: "Pasajero 3",
    passenger4: "Pasajero 4",
    rearPassenger1: "Pasajero trasero 1",
    rearPassenger2: "Pasajero trasero 2",
    baggage1: "Equipaje 1",
    baggage2: "Equipaje 2",
    baggageArea1: "Equipaje área 1",
    baggageArea2: "Equipaje área 2",
    fuel: "Combustible",
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
    fuelInputMode: "Ingresar combustible por",
    byWeight: "Peso",
    byVolume: "Volumen",
    fuelEquivalent: (/** @type {string} */ value) => `Equivale a ${value}`,
    fuelDensityNote: (/** @type {string} */ density) => `Densidad AVGAS: ${density}`,
    millimeters: "milímetros",
    kilograms: "kilogramos",
    axisNoteMetric: "Brazo C.G. - mm detrás del Datum STA 0.0",
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
    tooltipCg: (/** @type {string|number} */ value, /** @type {string} */ unit = '"') =>
      `CG: ${value}${unit} Arm`,
    tooltipWeight: (/** @type {string|number} */ value, /** @type {string} */ unit = "lbs") =>
      `Peso: ${value} ${unit}`,
    envelopeLimit: "Límite del Envolvente",
    operatingPoint: "Punto Operativo",
    xUnit: "inches",
    yUnit: "pounds",
  },

  flightPhases: {
    title: "Aterrizaje y peso sin combustible",
    fuelBurnLabel: "Combustible a consumir en vuelo",
    fuelBurnPlaceholder: "800",
    fuelLoaded: (/** @type {string|number} */ value, unit = "lbs") =>
      `Combustible cargado: ${value} ${unit}`,
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
    overMaxLandingWeight: (/** @type {string|number} */ value, unit = "lbs") =>
      `Peso de aterrizaje excede el máximo (${value} ${unit})`,
    overMaxZeroFuelWeight: (/** @type {string|number} */ value, unit = "lbs") =>
      `Peso sin combustible excede el máximo (${value} ${unit})`,
    landingOutOfEnvelope: "Centro de gravedad al aterrizar fuera de la envolvente",
    zeroFuelOutOfEnvelope: "Centro de gravedad sin combustible fuera de la envolvente",
    burnExceedsFuel: (
      /** @type {string|number} */ burn,
      /** @type {string|number} */ loaded,
      unit = "lbs"
    ) =>
      `El consumo planificado (${burn} ${unit}) supera el combustible cargado (${loaded} ${unit})`,
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
    emptyWeightLabel: "Peso vacío",
    emptyArmLabel: "Brazo del peso vacío",
    save: "Guardar aeronave",
    empty: "Todavía no guardaste ninguna aeronave.",
    listLabel: "Aeronaves guardadas",
    recordDetail: (/** @type {string} */ weight, /** @type {string} */ arm) => `${weight} @ ${arm}`,
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
