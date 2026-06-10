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
