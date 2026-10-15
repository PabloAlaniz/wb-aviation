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

  share: {
    button: "Compartir",
    buttonLabel: "Compartir enlace a este cálculo",
    copied: "Enlace copiado",
    copyFailed: "No se pudo copiar el enlace",
    showQr: "Mostrar QR",
    hideQr: "Ocultar QR",
    qrAlt: "Código QR con el enlace a este cálculo",
    qrFailed: "No se pudo generar el código QR",
    shareTitle: (/** @type {string} */ aircraftName) => `Peso y centrado: ${aircraftName}`,
    loaded: "Se cargó un cálculo compartido.",
    conflict:
      "El enlace trae una aeronave con una matrícula que ya tenés guardada con otro peso vacío o brazo. No se cargó para no sobrescribir tus datos.",
    invalid: "El enlace compartido no es válido o está incompleto.",
    dismiss: "Cerrar aviso",
  },

  errorBoundary: {
    title: "Algo salió mal",
    description:
      "Ocurrió un error inesperado en la aplicación. Podés reintentar o recargar la página. Si el problema persiste, probá limpiar los datos guardados del navegador.",
    retry: "Reintentar",
  },

  fleet: {
    shareTitle: "Compartir flota (instructores y escuelas)",
    shareDescription:
      "Generá un link con tus aeronaves por matrícula para que tus alumnos las importen en su dispositivo. Solo se comparten modelo base, matrícula, peso vacío y brazo.",
    schoolNameLabel: "Escuela o aeroclub (opcional)",
    schoolNamePlaceholder: "Aeroclub ...",
    shareButton: "Compartir flota",
    shareEmpty: "Guardá al menos una aeronave por matrícula para compartir tu flota.",
    truncated: (/** @type {number} */ max) => `Se incluyen solo las primeras ${max} aeronaves.`,
    copied: "Link de la flota copiado al portapapeles.",
    shared: "Link de la flota compartido.",
    copyFailed: "No se pudo copiar automáticamente. Copiá el link:",
    linkLabel: "Link de la flota",
    importTitle: "Importar flota",
    importFrom: (/** @type {string} */ name) => `${name} compartió su flota con vos.`,
    importAnonymous: "Te compartieron una flota de aeronaves.",
    importListLabel: "Aeronaves a importar",
    overwriteNote:
      "Si ya tenés guardada alguna de estas matrículas, sus datos se van a reemplazar por los del link.",
    willOverwrite: "Reemplaza la guardada",
    verifyNote:
      "Verificá peso vacío y brazo contra el Weight & Balance Report de cada aeronave antes de volar.",
    importButton: (/** @type {number} */ count) =>
      count === 1 ? "Importar 1 aeronave" : `Importar ${count} aeronaves`,
    dismiss: "Descartar",
    imported: (/** @type {number} */ count) =>
      count === 1 ? "Se importó 1 aeronave." : `Se importaron ${count} aeronaves.`,
    invalidLink: "El link de flota no es válido o está dañado.",
    close: "Cerrar",
  },

  footer: {
    madeBy: "Hecho por",
    sourceCode: "Código fuente en GitHub",
    fleetHint: "¿Sos instructor o escuela? Compartí tu flota",
    disclaimer:
      "Herramienta de ayuda: el POH/AFM y el Weight & Balance Report de tu aeronave son la referencia oficial. Verificá siempre los resultados.",
    version: (/** @type {string} */ version) => `Versión ${version}`,
  },

  loadSheet: {
    formTitle: "Hoja de carga (imprimir / PDF)",
    formDescription:
      "Completá los datos del vuelo para imprimir la hoja de peso y balance o guardarla como PDF.",
    pilot: "Piloto al mando",
    registration: "Matrícula de la aeronave",
    date: "Fecha",
    departure: "Origen (OACI)",
    destination: "Destino (OACI)",
    icaoPlaceholder: "SUMU",
    remarks: "Observaciones",
    printButton: "Imprimir hoja de carga / Guardar PDF",
    sheetTitle: "Hoja de carga — Peso y balance",
    aircraft: "Aeronave",
    tcds: "TCDS",
    route: "Ruta",
    units: (
      /** @type {string} */ weight,
      /** @type {string} */ arm,
      /** @type {string} */ moment
    ) => `Unidades: peso ${weight}, brazo ${arm}, momento ${moment}`,
    stationsTitle: "Distribución de la carga",
    station: "Estación",
    weight: "Peso",
    arm: "Brazo",
    moment: "Momento",
    emptyWeight: "Peso vacío (básico)",
    total: "Total al despegue",
    phasesTitle: "Fases del vuelo",
    phase: "Condición",
    cg: "CG",
    status: "Envolvente",
    inEnvelope: "DENTRO",
    outOfEnvelope: "FUERA",
    plannedBurn: "Consumo previsto",
    limitsTitle: "Límites",
    maxTakeoffWeight: "Peso máximo de despegue",
    maxLandingWeight: "Peso máximo de aterrizaje",
    maxZeroFuelWeight: "Peso máximo sin combustible",
    cgLimits: "Límites de CG (del. / tras.)",
    takeoffOk: "Despegue dentro de límites",
    takeoffNotOk: "DESPEGUE FUERA DE LÍMITES",
    warningsTitle: "Advertencias de seguridad",
    noWarnings: "Sin advertencias.",
    envelopeTitle: "Envolvente de CG",
    dataTitle: "Confiabilidad de los datos y fuentes",
    reliability: "Confiabilidad:",
    pending: "Pendiente de verificación:",
    remarksTitle: "Observaciones",
    signature: "Firma del piloto al mando",
    generatedBy: "Generado con W&B Aviation",
    disclaimer:
      "Herramienta de referencia. El manual de vuelo (POH/AFM) y el informe de peso y balance de la aeronave prevalecen sobre esta hoja.",
  },

  // Contenido estático de las páginas indexables (Astro). Solo datos: lo
  // renderizan src/pages/**/*.astro, no componentes React.
  seo: {
    siteName: "W&B Aviation",
    ogLocale: "es_ES",
    languageLabel: "Idioma",
    calculatorTitle: "Calculadora interactiva",
    loading: "Cargando la calculadora…",
    noscript:
      "La calculadora necesita JavaScript. Los datos de referencia de esta página se pueden consultar sin él.",
    appDescription:
      "Calculadora gratuita de peso y balance (Weight & Balance) de aeronaves: centro de gravedad, envolvente de CG y hoja de carga. Funciona offline y sin registro.",
    home: {
      title: "Calculadora de peso y balance de aeronaves | W&B Aviation",
      description:
        "Calculá peso y balance (Weight & Balance) y centro de gravedad de tu aeronave con datos del TCDS y el POH. Gratis, offline y sin registro.",
      h1: "Calculadora de peso y balance de aeronaves",
      intro1:
        "El peso y balance (Weight & Balance) verifica antes de cada vuelo que la aeronave no supere su peso máximo y que su centro de gravedad (CG) quede dentro de la envolvente aprobada. Un CG fuera de límites afecta la estabilidad y el control, aunque el peso total sea correcto.",
      intro2:
        "W&B Aviation suma el peso vacío y cada estación de carga (tripulación, pasajeros, equipaje y combustible), calcula el momento y el CG resultantes y los compara con la envolvente del fabricante, también para el aterrizaje y el peso sin combustible. Funciona en el navegador, sin registro y sin conexión.",
      aircraftListTitle: "Aeronaves disponibles",
      aircraftLink: (/** @type {string} */ name) => `Peso y balance ${name}`,
    },
    aircraft: {
      title: (/** @type {string} */ name) =>
        `Peso y balance ${name}: calculadora de CG | W&B Aviation`,
      description: (/** @type {string} */ name, /** @type {string} */ maxWeight) =>
        `Calculadora de peso y balance del ${name}: peso máximo ${maxWeight}, brazos de las estaciones, límites y envolvente de CG. Gratis y offline.`,
      h1: (/** @type {string} */ name) => `Peso y balance ${name}`,
      intro: (/** @type {string} */ name, /** @type {string} */ tcds) =>
        `Calculá el peso total y el centro de gravedad del ${name} con los datos de referencia de ${tcds}. Ingresá los pesos de cada estación y la calculadora verifica el peso máximo y la envolvente de CG al despegue y al aterrizaje.`,
      specsTitle: "Datos de peso y centrado",
      tcds: "Hoja de datos (TCDS)",
      manufacturer: "Fabricante",
      engines: "Motores",
      maxWeight: "Peso máximo de despegue",
      emptyWeight: "Peso vacío de referencia",
      emptyArm: "Brazo del peso vacío",
      cgLimits: "Límites de CG",
      cgLimitsValue: (/** @type {string} */ forward, /** @type {string} */ aft) =>
        `${forward} a ${aft} detrás del datum`,
      stationsTitle: "Estaciones de carga y brazos",
      station: "Estación",
      arm: "Brazo (in)",
      maxLoad: "Máximo (lbs)",
      envelopeTitle: "Puntos de la envolvente de CG",
      envelopeCaption:
        "Vértices del polígono de la envolvente (brazo en pulgadas detrás del datum, peso en libras).",
      point: "Punto",
      envelopeArm: "Brazo (in)",
      envelopeWeight: "Peso (lbs)",
      reliabilityTitle: "Confiabilidad de los datos y fuentes",
      reliabilityLabel: "Confiabilidad:",
      reliabilityVerifiedComplete: "verificados con documentación oficial",
      reliabilityVerifiedPartial: "parcialmente verificados",
      reliabilityEstimated: "valores de referencia estimados",
      lastVerified: "Última verificación:",
      sourcesLabel: "Fuentes:",
      pendingLabel: "Pendiente de verificación:",
      ownDataWarning:
        "El peso vacío y su brazo varían en cada aeronave: usá los de tu Weight & Balance Report (podés cargarlos como aeronave personalizada en la calculadora).",
      faqTitle: "Preguntas frecuentes",
      faqWhatQ: (/** @type {string} */ name) => `¿Cómo se calcula el peso y balance del ${name}?`,
      faqWhatA: (/** @type {string} */ name) =>
        `Se multiplica el peso de cada estación por su brazo para obtener el momento, se suman pesos y momentos (incluido el peso vacío) y el CG es el momento total dividido por el peso total. El ${name} está dentro de límites si el peso no supera el máximo y el punto peso/CG queda dentro de la envolvente.`,
      faqMaxWeightQ: (/** @type {string} */ name) => `¿Cuál es el peso máximo del ${name}?`,
      faqMaxWeightA: (
        /** @type {string} */ name,
        /** @type {string} */ maxWeight,
        /** @type {string} */ tcds
      ) =>
        `El peso máximo de despegue de referencia del ${name} es ${maxWeight}, según ${tcds}. Confirmalo siempre en el POH/AFM de tu aeronave.`,
      faqCgQ: (/** @type {string} */ name) => `¿Cuáles son los límites de CG del ${name}?`,
      faqCgA: (
        /** @type {string} */ name,
        /** @type {string} */ forward,
        /** @type {string} */ aft
      ) =>
        `El CG del ${name} debe estar entre ${forward} (límite delantero) y ${aft} (límite trasero) detrás del datum. El límite efectivo depende del peso: la envolvente de esta página muestra la forma completa.`,
      faqOwnQ: (/** @type {string} */ name) => `¿Puedo usar esta calculadora para mi ${name}?`,
      faqOwnA: (/** @type {string} */ name) =>
        `Sí, como referencia. Cada ${name} tiene su propio peso vacío y brazo según su equipamiento: cargalos desde su Weight & Balance Report como aeronave personalizada. El POH/AFM es siempre la referencia oficial.`,
      otherAircraftTitle: "Otras aeronaves",
    },
  },
}
