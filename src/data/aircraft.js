/**
 * Aircraft database for W&B calculations.
 *
 * Each aircraft entry must include:
 * - emptyWeight (lbs), emptyArm (in), maxWeight (lbs)
 * - stations: map of station key -> arm (inches aft of datum)
 * - loadStations: ordered UI config for the load form ({ key, label, placeholder })
 * - cgLimits: { forward, aft } in inches
 * - cgEnvelope.points: closed polygon of { arm, weight } pairs
 * - safetyFactors, metadata and dataValidation (see docs/aircraft-data.md)
 */
export const aircraftData = {
  "king-air-echo-90": {
    name: "King Air Echo 90 (Beechcraft)",
    tcds: "TCDS# 3A20 Revision 82",

    // Metadata y referencias oficiales
    metadata: {
      manufacturer: "Beechcraft Corporation (now Textron Aviation Inc.)",
      tcdsCurrentRevision: "82",
      tcdsDate: "2024",
      previousHolder: "Hawker Beechcraft Corporation, Raytheon Aircraft Corporation",
      productionYears: "1972-1981",
      totalProduced: 347,
      engines: "2x Pratt & Whitney PT6A-28 (550 SHP each)",
      lastDataVerification: "2024-08-21",
      sourceDocuments: [
        "Manual oficial Beechcraft E90 (LV-AYG)",
        "FAA TCDS 3A20 Rev 81 (11 may 2018)",
        "Weight & Balance Report específico",
      ],
      dataReliability: "verified-complete", // verified-complete, verified-partial, estimated
      notes: "Datos verificados con manual oficial de aeronave específica (LV-AYG)",
      aircraftSpecific: {
        registrationExample: "LV-AYG",
        serialNumber: "LW-135",
        warning:
          "Los datos de peso vacío y brazo son específicos de esta aeronave. Consulte el Weight & Balance Report de su aeronave individual para datos precisos.",
      },
    },

    // Variantes del modelo
    variants: {
      E90: {
        description: "Modelo estándar con motores PT6A-28",
        productionYears: "1972-1981",
        modifications: [],
      },
    },

    // Especificaciones de peso verificadas con manual oficial
    emptyWeight: 6682, // Peso vacío oficial del manual Beechcraft E90 (LV-AYG)
    emptyArm: 151.0415, // Brazo oficial del manual específico
    maxWeight: 10100, // Actualizado según datos oficiales (10,100 lbs)

    // Límites operacionales
    operationalLimits: {
      maxAltitude: 28000, // feet
      fuelCapacity: 474, // gallons
      maxPayload: 2492, // lbs (según datos oficiales)
      cabinConfiguration: "4 asientos club + 2 jump seats",
      baggageCapacity: 350, // lbs
    },

    // Límites de CG
    cgLimits: {
      forward: 144.7,
      aft: 160.0,
      notes: "Límites basados en envolvente de CG del TCDS",
    },

    // Estaciones de carga (verificar con manual específico)
    stations: {
      pilot: 144.0,
      copilot: 144.0,
      passenger1: 190.0, // Estimado - requiere verificación con manual específico
      passenger2: 190.0,
      passenger3: 220.0,
      passenger4: 220.0,
      baggage1: 280.0,
      baggage2: 310.0,
      fuel: 154.0,
      notes: "Estaciones estimadas basadas en configuración típica King Air 90",
    },

    // Configuración del formulario de carga (orden y etiquetas de la UI)
    loadStations: [
      { key: "pilot", label: "Piloto (lbs)", placeholder: "200" },
      { key: "copilot", label: "Copiloto (lbs)", placeholder: "200" },
      { key: "passenger1", label: "Pasajero 1 (lbs)", placeholder: "170" },
      { key: "passenger2", label: "Pasajero 2 (lbs)", placeholder: "170" },
      { key: "passenger3", label: "Pasajero 3 (lbs)", placeholder: "170" },
      { key: "passenger4", label: "Pasajero 4 (lbs)", placeholder: "170" },
      { key: "baggage1", label: "Equipaje 1 (lbs)", placeholder: "100" },
      { key: "baggage2", label: "Equipaje 2 (lbs)", placeholder: "100" },
      { key: "fuel", label: "Combustible (lbs)", placeholder: "1500", fullWidth: true },
    ],

    // Envolvente de CG (requiere verificación con TCDS oficial)
    cgEnvelope: {
      points: [
        { arm: 144.7, weight: 6000 },
        { arm: 144.7, weight: 7850 },
        { arm: 152.0, weight: 10100 }, // Actualizado al peso máximo oficial
        { arm: 160.0, weight: 10100 },
        { arm: 160.0, weight: 6000 },
        { arm: 144.7, weight: 6000 },
      ],
      source: "Manual oficial Beechcraft E90",
      verificationStatus: "verified-complete",
    },

    // Factores de seguridad y alertas
    safetyFactors: {
      weightMargin: 0.95, // 95% del peso máximo como alerta
      cgMargin: 0.1, // 0.1" de margen en límites de CG
      recommendedReserve: {
        fuel: 200, // lbs de combustible de reserva recomendado
        weight: 200, // lbs de margen de peso recomendado
      },
    },

    // Validación de datos
    dataValidation: {
      lastUpdated: "2024-08-21",
      verifiedAgainst: ["Manual oficial Beechcraft E90 (LV-AYG)", "TCDS 3A20 Rev 81"],
      pendingVerification: [
        "Estaciones de carga específicas para otras aeronaves",
        "Verificación de número de serie específico para validación de peso vacío",
      ],
    },
  },

  "cessna-172s": {
    name: "Cessna 172S Skyhawk",
    tcds: "TCDS# 3A12 (FAA)",

    metadata: {
      manufacturer: "Cessna Aircraft Company (Textron Aviation)",
      tcdsCurrentRevision: "3A12",
      tcdsDate: "2023",
      productionYears: "1998-presente",
      totalProduced: 3000,
      engines: "1x Lycoming IO-360-L2A (180 HP)",
      lastDataVerification: "2026-06-10",
      sourceDocuments: [
        "FAA TCDS 3A12 (Cessna 172 series)",
        "POH Cessna 172S (Sección 6, Weight & Balance) - referencia general",
      ],
      dataReliability: "estimated", // datos de referencia: el peso vacío real varía por aeronave
      notes:
        "Datos de referencia general del modelo 172S. El peso vacío y su brazo DEBEN tomarse del Weight & Balance Report de la aeronave individual.",
      aircraftSpecific: {
        registrationExample: "Genérico 172S",
        serialNumber: "N/A",
        warning:
          "Peso vacío y brazo son valores típicos de fábrica del 172S. Cada aeronave individual tiene valores propios según su equipamiento: consulte su Weight & Balance Report.",
      },
    },

    variants: {
      "172S": {
        description: "Skyhawk SP con motor IO-360-L2A de 180 HP",
        productionYears: "1998-presente",
        modifications: [],
      },
    },

    // Valores típicos de fábrica (estimados): verificar con el W&B Report individual
    emptyWeight: 1663,
    emptyArm: 41.0,
    maxWeight: 2550, // Peso máximo de despegue/aterrizaje, categoría normal

    operationalLimits: {
      maxAltitude: 14000, // feet (techo de servicio)
      fuelCapacity: 56, // gallons (53 usables)
      maxPayload: 887, // lbs (típico, depende del peso vacío real)
      cabinConfiguration: "2 asientos delanteros + banco trasero para 2",
      baggageCapacity: 120, // lbs área 1 (+ 50 lbs área 2, máx combinado 120 lbs)
    },

    cgLimits: {
      forward: 35.0, // a 1950 lbs o menos; el límite real sube linealmente hasta 41.0 a 2550 lbs
      aft: 47.3,
      notes:
        'Límite frontal variable con el peso (35.0" hasta 1950 lbs, lineal hasta 41.0" a 2550 lbs). La envolvente refleja la forma real.',
    },

    stations: {
      pilot: 37.0,
      copilot: 37.0,
      passenger1: 73.0,
      passenger2: 73.0,
      baggage1: 95.0,
      baggage2: 123.0,
      fuel: 48.0,
      notes:
        'Brazos típicos del POH 172S: asientos delanteros 37" (ajustables), banco trasero 73", equipaje área 1 (95", máx 120 lbs), área 2 (123", máx 50 lbs), combustible 48".',
    },

    loadStations: [
      { key: "pilot", label: "Piloto (lbs)", placeholder: "170" },
      { key: "copilot", label: "Acompañante (lbs)", placeholder: "170" },
      { key: "passenger1", label: "Pasajero trasero 1 (lbs)", placeholder: "170" },
      { key: "passenger2", label: "Pasajero trasero 2 (lbs)", placeholder: "170" },
      { key: "baggage1", label: "Equipaje área 1 (lbs, máx 120)", placeholder: "50" },
      { key: "baggage2", label: "Equipaje área 2 (lbs, máx 50)", placeholder: "20" },
      { key: "fuel", label: "Combustible (lbs, máx 318)", placeholder: "318", fullWidth: true },
    ],

    // Envolvente categoría normal (lbs vs pulgadas aft of datum)
    cgEnvelope: {
      points: [
        { arm: 35.0, weight: 1500 },
        { arm: 35.0, weight: 1950 },
        { arm: 41.0, weight: 2550 },
        { arm: 47.3, weight: 2550 },
        { arm: 47.3, weight: 1500 },
        { arm: 35.0, weight: 1500 },
      ],
      source: "POH Cessna 172S, Sección 6 (categoría normal) - referencia general",
      verificationStatus: "estimated",
    },

    safetyFactors: {
      weightMargin: 0.95,
      cgMargin: 0.1,
      recommendedReserve: {
        fuel: 60, // ~10 gal de reserva (1 hora aprox.)
        weight: 50,
      },
    },

    dataValidation: {
      lastUpdated: "2026-06-10",
      verifiedAgainst: ["FAA TCDS 3A12 (referencia general)"],
      pendingVerification: [
        "Peso vacío y brazo de la aeronave individual (obligatorio: W&B Report propio)",
        "Verificación de envolvente contra POH de la variante y año específicos",
        "Límites de equipaje combinado (máx 120 lbs entre áreas 1 y 2)",
      ],
    },
  },
}

/** Options for the aircraft selector, derived from aircraftData */
export const aircraftOptions = Object.entries(aircraftData).map(([value, aircraft]) => ({
  value,
  label: aircraft.name,
}))

/** Build an empty weights state object for a given aircraft */
export function emptyWeightsFor(aircraft) {
  return Object.fromEntries(aircraft.loadStations.map((station) => [station.key, ""]))
}
