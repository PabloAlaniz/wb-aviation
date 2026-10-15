/**
 * Aircraft database for W&B calculations.
 *
 * Each aircraft entry must include:
 * - emptyWeight (lbs), emptyArm (in), maxWeight (lbs)
 * - stations: map of station key -> arm (inches aft of datum)
 * - loadStations: ordered UI config for the load form ({ key, labelKey, max?, placeholder })
 *   labelKey points into the i18n `stations` namespace (e.g. "stations.pilot");
 *   max and placeholder are in lbs
 * - cgLimits: { forward, aft } in inches
 * - cgEnvelope.points: closed polygon of { arm, weight } pairs
 * - safetyFactors, metadata and dataValidation (see docs/aircraft-data.md)
 *
 * @type {Record<string, import('../types').Aircraft>}
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
      { key: "pilot", labelKey: "stations.pilot", placeholder: "200" },
      { key: "copilot", labelKey: "stations.copilot", placeholder: "200" },
      { key: "passenger1", labelKey: "stations.passenger1", placeholder: "170" },
      { key: "passenger2", labelKey: "stations.passenger2", placeholder: "170" },
      { key: "passenger3", labelKey: "stations.passenger3", placeholder: "170" },
      { key: "passenger4", labelKey: "stations.passenger4", placeholder: "170" },
      { key: "baggage1", labelKey: "stations.baggage1", placeholder: "100" },
      { key: "baggage2", labelKey: "stations.baggage2", placeholder: "100" },
      {
        key: "fuel",
        labelKey: "stations.fuel",
        placeholder: "1500",
        fullWidth: true,
        isFuel: true,
      },
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
        "Pesos máximos de aterrizaje y sin combustible (MLW/MZFW) según TCDS 3A20 (no cargados: no se validan)",
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
    maxLandingWeight: 2550, // POH 172S Sección 2 (Limitaciones): máx. aterrizaje = máx. despegue, categoría normal

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
      { key: "pilot", labelKey: "stations.pilot", placeholder: "170" },
      { key: "copilot", labelKey: "stations.frontPassenger", placeholder: "170" },
      { key: "passenger1", labelKey: "stations.rearPassenger1", placeholder: "170" },
      { key: "passenger2", labelKey: "stations.rearPassenger2", placeholder: "170" },
      { key: "baggage1", labelKey: "stations.baggageArea1", max: 120, placeholder: "50" },
      { key: "baggage2", labelKey: "stations.baggageArea2", max: 50, placeholder: "20" },
      {
        key: "fuel",
        labelKey: "stations.fuel",
        max: 318,
        placeholder: "318",
        fullWidth: true,
        isFuel: true,
      },
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

  "cessna-152": {
    name: "Cessna 152",
    tcds: "TCDS# 3A19 Revision 50 (FAA)",

    metadata: {
      manufacturer: "Cessna Aircraft Company (Textron Aviation)",
      tcdsCurrentRevision: "50",
      productionYears: "1977-1985",
      totalProduced: 7584,
      productionSource: "https://en.wikipedia.org/wiki/Cessna_152",
      engines: "1x Lycoming O-235-L2C / O-235-N2C (110/108 HP)",
      lastDataVerification: "2026-10-14",
      sourceDocuments: [
        "FAA TCDS 3A19 Rev. 50, Sección IX Model 152: https://dyzz9obi78pm5.cloudfront.net/app/image/id/615b69bfb50d81224e7b245f/n/3a19-rev-50.pdf",
        "Cessna Model 152 Pilot's Operating Handbook (1979), Secciones 2 y 6 (copia de referencia para instrucción): https://www.touringmachine.com/PDFs-Txt/Cessna-152_POH.pdf",
      ],
      dataReliability: "estimated", // brazos de equipaje solo en el POH (una fuente)
      notes:
        "Límites (peso, CG, datum, brazos de asientos y combustible) verificados contra TCDS 3A19 y POH 152. Brazos de equipaje tomados del POH (Figura 6-3). El peso vacío es el del ejemplo del POH: use el de su Weight & Balance Report.",
      aircraftSpecific: {
        registrationExample: "Genérico 152 (ejemplo POH)",
        serialNumber: "N/A",
        warning:
          "Peso vacío y brazo corresponden al avión de ejemplo del POH (1136 lbs, momento 34.0/1000). Cada aeronave tiene valores propios: consulte su Weight & Balance Report.",
      },
    },

    variants: {
      152: {
        description: "Modelo 152 (categoría utilitaria), tanques estándar de 24.5 gal usables",
        productionYears: "1977-1985",
        modifications: [],
      },
    },

    // Ejemplo del POH 152 (Fig. 6-6): 1136 lbs, momento 34.0 lb-in/1000 -> brazo 34000/1136 = 29.93"
    emptyWeight: 1136,
    emptyArm: 29.93,
    maxWeight: 1670, // TCDS 3A19: máx. 1670 lbs (rampa 1675 lbs, S/N 15282032 y posteriores)
    maxLandingWeight: 1670, // POH 152 Sección 2 (Weight Limits): máx. aterrizaje 1670 lbs

    operationalLimits: {
      fuelCapacity: 26, // gal totales (24.5 usables), tanques estándar
      cabinConfiguration: "2 asientos lado a lado",
      baggageCapacity: 120, // lbs combinado áreas 1 y 2
    },

    cgLimits: {
      forward: 31.0, // a 1350 lbs o menos; lineal hasta 32.65" a 1670 lbs
      aft: 36.5,
      notes:
        "TCDS 3A19: (+31.0) a (+36.5) a 1350 lbs o menos; (+32.65) a (+36.5) a 1670 lbs; variación lineal. Datum: cara delantera del firewall.",
    },

    stations: {
      pilot: 39.0,
      copilot: 39.0,
      baggage1: 64.0,
      baggage2: 84.0,
      fuel: 42.0,
      notes:
        'TCDS 3A19 / POH 152 Fig. 6-3: asientos 39" (rango 33" a 41"), combustible usable tanques estándar 42.0" (tanques long range: 39.5", no modelado), equipaje área 1 64" (est. 50-76, máx 120 lbs), área 2 84" (est. 76-94, máx 40 lbs), máx combinado 120 lbs.',
    },

    loadStations: [
      { key: "pilot", labelKey: "stations.pilot", placeholder: "170" },
      { key: "copilot", labelKey: "stations.frontPassenger", placeholder: "170" },
      { key: "baggage1", labelKey: "stations.baggageArea1", max: 120, placeholder: "20" },
      { key: "baggage2", labelKey: "stations.baggageArea2", max: 40, placeholder: "0" },
      {
        key: "fuel",
        labelKey: "stations.fuel",
        max: 147, // 24.5 gal usables x 6 lbs/gal
        placeholder: "147",
        fullWidth: true,
        isFuel: true,
      },
    ],

    // Envolvente categoría utilitaria según TCDS 3A19 / POH 152 Sección 2.
    // El borde inferior (1000 lbs) es solo el piso del gráfico del POH (Fig. 6-8), no un límite.
    cgEnvelope: {
      points: [
        { arm: 31.0, weight: 1000 },
        { arm: 31.0, weight: 1350 },
        { arm: 32.65, weight: 1670 },
        { arm: 36.5, weight: 1670 },
        { arm: 36.5, weight: 1000 },
        { arm: 31.0, weight: 1000 },
      ],
      source: "FAA TCDS 3A19 Rev. 50 (Model 152) y POH Cessna 152 Sección 2",
      verificationStatus: "verified-partial",
    },

    safetyFactors: {
      weightMargin: 0.95,
      cgMargin: 0.1,
      recommendedReserve: {
        fuel: 30, // ~5 gal (aprox. 45 min)
        weight: 30,
      },
    },

    dataValidation: {
      lastUpdated: "2026-10-14",
      verifiedAgainst: [
        "FAA TCDS 3A19 Rev. 50 (Model 152)",
        "POH Cessna 152 (1979), Secciones 2 y 6",
      ],
      pendingVerification: [
        "Peso vacío y brazo de la aeronave individual (obligatorio: W&B Report propio)",
        'Tanques long range (37.5 gal usables a 39.5") no modelados: solo tanques estándar',
        "Peso de rampa 1675 lbs (5 lbs para puesta en marcha y rodaje) no modelado",
        "Límite combinado de equipaje (áreas 1 + 2 ≤ 120 lbs) no validado automáticamente",
        "Asiento infantil opcional en área 1 no modelado",
      ],
    },
  },

  "piper-pa-28-161-warrior": {
    name: "Piper PA-28-161 Warrior II/III (2440 lbs)",
    tcds: "TCDS# 2A13 Revision 48 (FAA)",

    metadata: {
      manufacturer: "Piper Aircraft, Inc.",
      tcdsCurrentRevision: "48",
      productionYears: "1982-presente (S/N 28-8316001 y posteriores)",
      totalProduced: 2932, // Warrior II (todas las variantes) construidos hasta 1987, según Wikipedia; no incluye Warrior III
      productionSource: "https://en.wikipedia.org/wiki/Piper_PA-28_Cherokee",
      engines: "1x Lycoming O-320-D3G / O-320-D2A (160 HP)",
      lastDataVerification: "2026-10-14",
      sourceDocuments: [
        "FAA TCDS 2A13 Rev. 48, Secciones XVI-B y XVI-C (PA-28-161): https://touringmachine.com/Cherokee/PDFs/Cherokee%20Type%20Certificate%20Data%20Sheet%202A13.pdf",
        "Piper PA-28-161 Warrior II POH, Report VB-1180, Sección 2 (Limitaciones): https://www.desu.edu/sites/business/files/document/11/warrior_161_section_2_limitations.pdf",
        "Piper PA-28-161 Warrior II POH, Report VB-1180, Sección 6 (Figuras 6-11 y 6-15): https://www.desu.edu/sites/business/files/document/11/warrior_161_section_6_weight_and_balance_200_pbi.pdf",
        "Ejemplo de peso vacío de un Warrior real (Beale Aero Club, pregunta 18): https://bealefss.com/wp-content/uploads/2024/05/PA28-MAKEMODEL-2020.pdf",
      ],
      dataReliability: "verified-partial",
      notes:
        "Peso máximo, envolvente y brazos verificados contra TCDS 2A13 y POH VB-1180 (coinciden). Solo categoría normal y versión de 2440 lbs. El peso vacío es un ejemplo: use el de su Weight & Balance Report.",
      aircraftSpecific: {
        registrationExample: "Genérico PA-28-161 (2440 lbs)",
        serialNumber: "28-8316001 y posteriores, 2816001 y posteriores, 2842001 y posteriores",
        warning:
          "Peso vacío y brazo son un ejemplo (1478.4 lbs, momento 125871.0). Los Warrior II S/N 28-7716001 a 28-8216300 y los equipados con el Kit 88050 tienen máximo 2325 lbs y otra envolvente: no use este perfil para ellos.",
      },
    },

    variants: {
      "Warrior II (1983+)": {
        description: "TCDS 2A13 Sección XVI-B, S/N 28-8316001 a 28-8616057 y 2816001 a 2816109",
        productionYears: "1982-1986",
        modifications: [],
      },
      "Warrior III": {
        description: "TCDS 2A13 Sección XVI-C, S/N 2816110 a 2816119 y 2842001 en adelante",
        productionYears: "1994-presente",
        modifications: [],
      },
    },

    // Ejemplo (Beale Aero Club): 1478.4 lbs, momento 125871.0 lb-in -> brazo 125871.0/1478.4 = 85.14"
    emptyWeight: 1478.4,
    emptyArm: 85.14,
    maxWeight: 2440, // TCDS 2A13 / POH VB-1180 2.11: despegue 2440 lbs (rampa 2447 lbs), categoría normal

    operationalLimits: {
      fuelCapacity: 50, // gal totales (48 usables)
      cabinConfiguration: "2 asientos delanteros + 2 traseros",
      baggageCapacity: 200, // lbs
    },

    cgLimits: {
      forward: 83.0, // a 1950 lbs o menos; lineal hasta 88.3" a 2440 lbs
      aft: 93.0,
      notes:
        'TCDS 2A13 (categoría normal): (+83.0) a (+93.0) a 1950 lbs o menos; (+88.3) a (+93.0) a 2440 lbs; variación lineal. Datum: 78.4" delante del borde de ataque del ala.',
    },

    stations: {
      pilot: 80.5,
      copilot: 80.5,
      passenger1: 118.1,
      passenger2: 118.1,
      baggage: 142.8,
      fuel: 95.0,
      notes:
        'TCDS 2A13 y POH VB-1180 Fig. 6-11: asientos delanteros 80.5", traseros 118.1", combustible 95.0" (48 gal usables), equipaje 142.8" (máx 200 lbs).',
    },

    loadStations: [
      { key: "pilot", labelKey: "stations.pilot", placeholder: "170" },
      { key: "copilot", labelKey: "stations.frontPassenger", placeholder: "170" },
      { key: "passenger1", labelKey: "stations.rearPassenger1", placeholder: "170" },
      { key: "passenger2", labelKey: "stations.rearPassenger2", placeholder: "170" },
      { key: "baggage", labelKey: "stations.baggage", max: 200, placeholder: "50" },
      {
        key: "fuel",
        labelKey: "stations.fuel",
        max: 288, // 48 gal usables x 6 lbs/gal
        placeholder: "288",
        fullWidth: true,
        isFuel: true,
      },
    ],

    // Envolvente categoría normal (POH VB-1180 Fig. 6-15; el gráfico arranca en 1200 lbs)
    cgEnvelope: {
      points: [
        { arm: 83.0, weight: 1200 },
        { arm: 83.0, weight: 1950 },
        { arm: 88.3, weight: 2440 },
        { arm: 93.0, weight: 2440 },
        { arm: 93.0, weight: 1200 },
        { arm: 83.0, weight: 1200 },
      ],
      source: "FAA TCDS 2A13 Rev. 48 (XVI-B/C) y POH VB-1180 Fig. 6-15",
      verificationStatus: "verified-partial",
    },

    safetyFactors: {
      weightMargin: 0.95,
      cgMargin: 0.1,
      recommendedReserve: {
        fuel: 48, // ~8 gal (aprox. 45 min a ~9-10 gph)
        weight: 50,
      },
    },

    dataValidation: {
      lastUpdated: "2026-10-14",
      verifiedAgainst: [
        "FAA TCDS 2A13 Rev. 48 (PA-28-161, XVI-B/C)",
        "POH Piper PA-28-161 Warrior II, Report VB-1180, Secciones 2 y 6",
      ],
      pendingVerification: [
        "Peso vacío y brazo de la aeronave individual (obligatorio: W&B Report propio)",
        'No aplica a Warrior II S/N 28-7716001 a 28-8216300 ni con Kit 88050 (máx 2325 lbs, límite delantero 87.0" a 2325 lbs)',
        "Categoría utilitaria (máx 2020 lbs, sin pasajeros traseros ni equipaje) no modelada",
        "Peso máximo de aterrizaje: el POH no lo declara por separado (no cargado)",
        "Peso de rampa 2447 lbs (7 lbs para puesta en marcha y rodaje) no modelado",
        "Revisión vigente del TCDS 2A13 (la copia consultada es Rev. 48)",
      ],
    },
  },

  // Fuente métrica (kg, m). Conversiones: 1 kg = 2.20462 lbs, 1 m = 39.3701 in.
  // Los límites de CG se redondean a 0.01" hacia adentro del rango (conservador).
  "tecnam-p2008-jc": {
    name: "Tecnam P2008 JC",
    tcds: "TCDS# EASA.A.583 Issue 14 (EASA)",

    metadata: {
      manufacturer: "Costruzioni Aeronautiche Tecnam S.p.A.",
      tcdsCurrentRevision: "Issue 14 (31 March 2026)",
      productionYears: "2013-presente",
      totalProduced: "s/d", // sin dato confiable en fuentes públicas
      engines: "1x Rotax 912 S2 (98.6 HP despegue)",
      lastDataVerification: "2026-10-14",
      sourceDocuments: [
        "EASA TCDS EASA.A.583 Issue 14 (P2008JC): https://www.easa.europa.eu/en/downloads/7062/en",
        "Tecnam P2008 JC Aircraft Flight Manual, Doc. 2008/100 Ed. 2 Rev. 7 (copia de escuela, I-SKYP), Secciones 2 y 6: https://www.skyservices-flightacademy.com/wp-content/uploads/2020/08/Aircraft_Flight_Manual_b_I-SKYP_Ed2r7.pdf",
      ],
      dataReliability: "estimated",
      notes:
        "Pesos máximos, límites de CG, datum y equipaje coinciden entre TCDS y AFM. Los brazos de asientos y combustible salen solo del AFM (copia no controlada). Valores convertidos de kg/m a lbs/in.",
      aircraftSpecific: {
        registrationExample: "Genérico P2008 JC (ejemplo AFM)",
        serialNumber: "N/A",
        warning:
          "Peso vacío y brazo corresponden al ejemplo del AFM (369.0 kg a 1.89 m). Cada aeronave tiene valores propios: consulte su Weight & Balance Report.",
      },
    },

    variants: {
      "P2008 JC (630 kg)": {
        description: "Configuración básica, MTOW 630 kg",
        productionYears: "2013-presente",
        modifications: [],
      },
    },

    // AFM Sección 6 ejemplo: 369.0 kg a 1.89 m -> 813.5 lbs a 74.41"
    emptyWeight: 813.5,
    emptyArm: 74.41,
    maxWeight: 1388, // TCDS/AFM: 630 kg (1388 lb)
    maxLandingWeight: 1388, // TCDS/AFM: aterrizaje 630 kg (1388 lb)

    operationalLimits: {
      fuelCapacity: 32.76, // gal totales (124 L); 32 gal (120 L) usables
      cabinConfiguration: "2 asientos lado a lado",
      baggageCapacity: 44, // lbs (20 kg)
    },

    cgLimits: {
      forward: 72.49, // 1.841 m (20% MAC) = 72.480" -> 72.49"
      aft: 77.87, // 1.978 m (30% MAC) = 77.874" -> 77.87"
      notes:
        "TCDS EASA.A.583 / AFM Sección 2: 1.841 m a 1.978 m detrás del datum para todos los pesos. Datum: brida de soporte de la hélice (sin espaciador).",
    },

    stations: {
      pilot: 70.87, // 1.800 m
      copilot: 70.87, // 1.800 m
      baggage: 95.16, // AFM 2.417 m (TCDS: 2.42 m = 95.28")
      fuel: 86.97, // 2.209 m
      notes:
        'AFM 2008/100 Sección 6: piloto y pasajero 1.800 m (70.87"), combustible 2.209 m (86.97"), equipaje 2.417 m (95.16", máx 20 kg / 44 lbs).',
    },

    loadStations: [
      { key: "pilot", labelKey: "stations.pilot", placeholder: "170" },
      { key: "copilot", labelKey: "stations.frontPassenger", placeholder: "170" },
      { key: "baggage", labelKey: "stations.baggage", max: 44, placeholder: "10" },
      {
        key: "fuel",
        labelKey: "stations.fuel",
        max: 190, // 120 L usables x 0.72 kg/L = 86.4 kg = 190.5 lbs
        placeholder: "150",
        fullWidth: true,
        isFuel: true,
      },
    ],

    // Rango de CG constante (rectángulo). El borde inferior (700 lbs) es solo un
    // piso de graficación: el AFM declara los límites "para todos los pesos".
    cgEnvelope: {
      points: [
        { arm: 72.49, weight: 700 },
        { arm: 72.49, weight: 1388 },
        { arm: 77.87, weight: 1388 },
        { arm: 77.87, weight: 700 },
        { arm: 72.49, weight: 700 },
      ],
      source: "EASA TCDS EASA.A.583 Issue 14 y AFM 2008/100 Sección 2 (convertido a lbs/in)",
      verificationStatus: "estimated",
    },

    safetyFactors: {
      weightMargin: 0.95,
      cgMargin: 0.1,
      recommendedReserve: {
        fuel: 30, // ~19 L (aprox. 45 min)
        weight: 20,
      },
    },

    dataValidation: {
      lastUpdated: "2026-10-14",
      verifiedAgainst: [
        "EASA TCDS EASA.A.583 Issue 14",
        "AFM Tecnam 2008/100 Ed. 2 Rev. 7 (copia de escuela)",
      ],
      pendingVerification: [
        "Peso vacío y brazo de la aeronave individual (obligatorio: W&B Report propio)",
        "Brazos de asientos y combustible tomados solo del AFM (copia no controlada): verificar con el AFM de su número de serie",
        "MTOW 650 kg (1433 lbs) con MOD 2008/027, 2008/045 o 2008/086 no modelado: este perfil usa 630 kg",
        "Combustible: la conversión por volumen de la app usa densidad AVGAS (6.0 lb/gal); con MOGAS el peso real es algo mayor",
        'Brazo de equipaje: AFM 2.417 m vs TCDS 2.42 m (diferencia 0.12")',
      ],
    },
  },

  // Fuente métrica (kg, m). Conversiones: 1 kg = 2.20462 lbs, 1 m = 39.3701 in.
  // Los límites de CG se redondean a 0.01" hacia adentro del rango (conservador).
  "tecnam-p2002-jf": {
    name: "Tecnam P2002 JF",
    tcds: "TCDS# EASA.A.006 Issue 13 (EASA)",

    metadata: {
      manufacturer: "Costruzioni Aeronautiche Tecnam S.p.A.",
      tcdsCurrentRevision: "Issue 13 (24 November 2022)",
      productionYears: "2008-presente",
      totalProduced: "s/d", // sin dato confiable en fuentes públicas
      engines: "1x Rotax 912 S2 (98.6 HP despegue)",
      lastDataVerification: "2026-10-14",
      sourceDocuments: [
        "EASA TCDS EASA.A.006 Issue 13 (P2002-JF), Sección A: https://www.easa.europa.eu/en/downloads/7514/en",
        "Tecnam P2002 JF Aircraft Flight Manual, Doc. 2002/028 3rd Ed. Rev. 15 (copia de escuela, I-SKYN), Secciones 2 y 6: https://www.skyservices-flightacademy.com/wp-content/uploads/2020/06/P2002_JF_AFM_-_Ed3r15_I-SKYN.pdf",
      ],
      dataReliability: "estimated",
      notes:
        "Pesos máximos, límites de CG, datum y equipaje coinciden entre TCDS y AFM. Los brazos de asientos y combustible salen solo del AFM (copia no controlada). Valores convertidos de kg/m a lbs/in. No aplica al P2002 Sierra (LSA, otros límites).",
      aircraftSpecific: {
        registrationExample: "Genérico P2002 JF (ejemplo AFM)",
        serialNumber: "N/A",
        warning:
          "Peso vacío y brazo corresponden al ejemplo del AFM (350 kg a 1.66 m). Cada aeronave tiene valores propios: consulte su Weight & Balance Report.",
      },
    },

    variants: {
      "P2002 JF (580 kg)": {
        description: "Configuración básica, MTOW 580 kg",
        productionYears: "2008-presente",
        modifications: [],
      },
    },

    // AFM Tabla 6-2: 350 kg a 1.66 m (581 kgm) -> 771.6 lbs a 65.35"
    emptyWeight: 771.6,
    emptyArm: 65.35,
    maxWeight: 1278, // TCDS/AFM: 580 kg = 1278.7 lbs, redondeado hacia abajo
    maxLandingWeight: 1278, // TCDS/AFM: aterrizaje 580 kg
    maxZeroFuelWeight: 1278, // TCDS: Zero Fuel 580 kg

    operationalLimits: {
      fuelCapacity: 26.4, // gal totales (100 L); 99 L usables
      cabinConfiguration: "2 asientos lado a lado",
      baggageCapacity: 44, // lbs (20 kg)
    },

    cgLimits: {
      forward: 66.66, // 1.693 m (26.0% MAC) = 66.654" -> 66.66"
      aft: 70.15, // 1.782 m (32.5% MAC) = 70.157" -> 70.15"
      notes:
        "TCDS EASA.A.006 / AFM Sección 2: 1.693 m a 1.782 m detrás del datum para todos los pesos. Datum: brida de soporte de la hélice (sin espaciador).",
    },

    stations: {
      pilot: 70.87, // 1.8 m
      copilot: 70.87, // 1.8 m
      baggage: 88.98, // 2.26 m
      fuel: 60.24, // 1.53 m
      notes:
        'AFM 2002/028 Tabla 6-1: piloto y copiloto 1.8 m (70.87"), equipaje 2.26 m (88.98", máx 20 kg / 44 lbs), combustible 1.53 m (60.24").',
    },

    loadStations: [
      { key: "pilot", labelKey: "stations.pilot", placeholder: "170" },
      { key: "copilot", labelKey: "stations.copilot", placeholder: "170" },
      { key: "baggage", labelKey: "stations.baggage", max: 44, placeholder: "10" },
      {
        key: "fuel",
        labelKey: "stations.fuel",
        max: 157, // 99 L usables x 0.72 kg/L = 71.3 kg = 157.1 lbs
        placeholder: "127",
        fullWidth: true,
        isFuel: true,
      },
    ],

    // Rango de CG constante (rectángulo, AFM Fig. 6.5). El borde inferior (700 lbs)
    // es solo un piso de graficación (el AFM grafica desde el peso vacío, 337 kg).
    cgEnvelope: {
      points: [
        { arm: 66.66, weight: 700 },
        { arm: 66.66, weight: 1278 },
        { arm: 70.15, weight: 1278 },
        { arm: 70.15, weight: 700 },
        { arm: 66.66, weight: 700 },
      ],
      source: "EASA TCDS EASA.A.006 Issue 13 y AFM 2002/028 Sección 2 (convertido a lbs/in)",
      verificationStatus: "estimated",
    },

    safetyFactors: {
      weightMargin: 0.95,
      cgMargin: 0.1,
      recommendedReserve: {
        fuel: 30, // ~19 L (aprox. 45 min)
        weight: 20,
      },
    },

    dataValidation: {
      lastUpdated: "2026-10-14",
      verifiedAgainst: [
        "EASA TCDS EASA.A.006 Issue 13",
        "AFM Tecnam 2002/028 3rd Ed. Rev. 15 (copia de escuela)",
      ],
      pendingVerification: [
        "Peso vacío y brazo de la aeronave individual (obligatorio: W&B Report propio)",
        "Brazos de asientos y combustible tomados solo del AFM (copia no controlada): verificar con el AFM de su número de serie",
        "MTOW 600 kg (MOD2002/29, SB010-CS) y 620 kg (MOD2002/87, SB0105-CS) no modelados: este perfil usa 580 kg",
        'El rango de CG es angosto (3.5"): cargas livianas con piloto solo pueden quedar cerca del límite delantero',
        "Combustible: la conversión por volumen de la app usa densidad AVGAS (6.0 lb/gal); con MOGAS el peso real es algo mayor",
        "Ediciones anteriores del AFM (Rev. 0) indican equipaje a 2.2 m; TCDS y Rev. 15 indican 2.26 m (usado aquí)",
      ],
    },
  },

  // El AFM del DA20-C1 publica los valores en lbs/in (con su equivalente métrico);
  // se usan los valores en pulgadas del AFM. Datum: borde de ataque del ala en la costilla raíz.
  "diamond-da20-c1": {
    name: "Diamond DA20-C1 Eclipse (750 kg)",
    tcds: "TCDS# EASA.IM.A.223 Issue 06 (EASA) / TCCA A-191",

    metadata: {
      manufacturer: "Diamond Aircraft Industries Inc. (Canadá)",
      tcdsCurrentRevision: "Issue 06 (05 December 2022)",
      productionYears: "1998-2010s",
      totalProduced: 1000, // "1,000+" DA20 (todas las variantes) según Wikipedia
      productionSource: "https://en.wikipedia.org/wiki/Diamond_DA20",
      engines: "1x Teledyne Continental IO-240-B (125 HP)",
      lastDataVerification: "2026-10-14",
      sourceDocuments: [
        "EASA TCDS EASA.IM.A.223 Issue 06 (DA20-C1, Sección B): https://www.easa.europa.eu/en/downloads/7232/en",
        "Diamond DA20-C1 Airplane Flight Manual, Doc. DA202-C1 Rev. 23 (copia de escuela), Secciones 1, 2 y 6 y Suplemento 4: https://www.keilir.net/static/files/Flugakademian/Diamond/DA20_C1_AFM_incl_R23.pdf",
      ],
      dataReliability: "estimated",
      notes:
        "Configuración original de 750 kg (1653 lbs). Límites de CG y pesos coinciden entre AFM y TCDS (202 mm / 317 mm); brazos de estaciones solo del AFM (copia no controlada).",
      aircraftSpecific: {
        registrationExample: "Genérico DA20-C1 (ejemplo AFM)",
        serialNumber: "C0014 y posteriores (24 gal usables)",
        warning:
          "Peso vacío y brazo corresponden al ejemplo del AFM (1153 lbs, momento 12562 in·lbs). Consulte su Weight & Balance Report. Los DA20-C1 operados a 800 kg (Suplemento 4) tienen otra envolvente: no use este perfil para ellos.",
      },
    },

    variants: {
      "DA20-C1 (750 kg)": {
        description: "MTOW 1653 lbs, tanque de 24 gal usables (S/N C0014+)",
        productionYears: "1998-2010s",
        modifications: [],
      },
    },

    // AFM Fig. 6.7 ejemplo: 1153 lbs, momento 12562 in·lbs -> brazo 12562/1153 = 10.895"
    emptyWeight: 1153,
    emptyArm: 10.895,
    maxWeight: 1653, // AFM 2.7: despegue 1653 lbs (750 kg); rampa 1660 lbs
    maxLandingWeight: 1653, // AFM 2.7: aterrizaje 1653 lbs (750 kg)

    operationalLimits: {
      fuelCapacity: 24.5, // gal totales (24.0 usables)
      cabinConfiguration: "2 asientos lado a lado",
      baggageCapacity: 44, // lbs combinado (20 kg)
    },

    cgLimits: {
      forward: 7.96, // AFM 2.8: 7.96 in (202 mm)
      aft: 12.48, // AFM 2.8: 12.49 in; 317 mm = 12.480 in (TCDS 12,48 in) -> se usa el más restrictivo
      notes:
        'AFM 2.8 / TCDS EASA.IM.A.223: CG más adelantado 202 mm (7.96"), más atrasado 317 mm (12.48") para todos los pesos hasta 750 kg. Datum: plano tangente al borde de ataque del ala en la costilla raíz.',
    },

    stations: {
      pilot: 5.63,
      copilot: 5.63,
      baggage1: 32.44,
      baggage2: 62.0,
      fuel: 32.44,
      notes:
        'AFM Fig. 6.7: piloto y pasajero 0.143 m (5.63"), equipaje 0.824 m (32.44", máx 44 lbs), extensión de equipaje 1.575 m (62.0", máx 44 lbs), total combinado de equipaje máx 44 lbs, combustible 0.824 m (32.44").',
    },

    loadStations: [
      { key: "pilot", labelKey: "stations.pilot", placeholder: "170" },
      { key: "copilot", labelKey: "stations.frontPassenger", placeholder: "170" },
      { key: "baggage1", labelKey: "stations.baggage", max: 44, placeholder: "10" },
      { key: "baggage2", labelKey: "stations.baggageExtension", max: 44, placeholder: "0" },
      {
        key: "fuel",
        labelKey: "stations.fuel",
        max: 144, // 24.0 gal usables x 6 lbs/gal (AFM usa 6.01 lb/gal: 144.2 lbs)
        placeholder: "144",
        fullWidth: true,
        isFuel: true,
      },
    ],

    // Rango constante (rectángulo). El borde inferior (1200 lbs) es el piso del
    // gráfico de momentos del AFM (Fig. 6.8), no un límite declarado.
    cgEnvelope: {
      points: [
        { arm: 7.96, weight: 1200 },
        { arm: 7.96, weight: 1653 },
        { arm: 12.48, weight: 1653 },
        { arm: 12.48, weight: 1200 },
        { arm: 7.96, weight: 1200 },
      ],
      source: "AFM DA202-C1 Sección 2.8 y TCDS EASA.IM.A.223 (configuración 750 kg)",
      verificationStatus: "estimated",
    },

    safetyFactors: {
      weightMargin: 0.95,
      cgMargin: 0.1,
      recommendedReserve: {
        fuel: 30, // ~5 gal (aprox. 45 min)
        weight: 30,
      },
    },

    dataValidation: {
      lastUpdated: "2026-10-14",
      verifiedAgainst: [
        "EASA TCDS EASA.IM.A.223 Issue 06",
        "AFM Diamond DA202-C1 Rev. 23 (copia de escuela)",
      ],
      pendingVerification: [
        "Peso vacío y brazo de la aeronave individual (obligatorio: W&B Report propio)",
        "Configuración 800 kg (Suplemento 4, hélice Sensenich; envolvente 205-309 mm a 800 kg) no modelada",
        "S/N C0001 a C0013 (21.3 gal usables) y tanque Dwg. 22-2813 (20.0 gal usables) tienen menos combustible usable",
        "Límite combinado de equipaje (equipaje + extensión ≤ 44 lbs) no validado automáticamente",
        "TCDS FAA TA4CH no consultado (solo EASA)",
      ],
    },
  },

  // El AFM del DA40 publica los valores en m/kg con su equivalente en in/lb;
  // se usan los valores en pulgadas/libras del AFM.
  "diamond-da40-180": {
    name: "Diamond DA40 (IO-360, 1150 kg)",
    tcds: "TCDS# EASA.IM.A.022 Issue 24 (EASA) / TCCA A-224",

    metadata: {
      manufacturer: "Diamond Aircraft Industries Inc. (Canadá)",
      tcdsCurrentRevision: "Issue 24 (22 April 2021)",
      productionYears: "1997-presente",
      totalProduced: 2200, // DA40 (todas las variantes) entregados a dic. 2020 según Wikipedia
      productionSource: "https://en.wikipedia.org/wiki/Diamond_DA40_Diamond_Star",
      engines: "1x Lycoming IO-360-M1A (180 HP), AVGAS",
      lastDataVerification: "2026-10-14",
      sourceDocuments: [
        "EASA TCDS EASA.IM.A.022 Issue 24 (DA 40, Sección A): https://www.easa.europa.eu/en/downloads/44254/en",
        "Diamond DA 40 Airplane Flight Manual, Doc. 6.01.01-E Rev. 7 (15-Jul-2006, copia de escuela), Secciones 2 y 6: https://takeflightsandiego.com/assets/documents/DA40POH.pdf",
        "Diamond DA 40 Airplane Flight Manual, Doc. 6.01.01-E Rev. 5 (2001, copia de escuela): https://seagle.aero/docs/diamond-da40-180-afm.pdf",
      ],
      dataReliability: "estimated",
      notes:
        "Configuración de 1150 kg (2535 lbs) con tanques estándar. Envolvente y pesos coinciden entre TCDS y AFM; brazos de estaciones solo del AFM (dos revisiones, copias no controladas).",
      aircraftSpecific: {
        registrationExample: "Genérico DA40 (ejemplo AFM)",
        serialNumber: "N/A",
        warning:
          'Peso vacío y brazo corresponden al ejemplo del AFM Rev. 7 (1620 lbs, momento 152762 in·lbs). Consulte su Weight & Balance Report. Con tanque Long Range el límite trasero es 100.4" (no 102.0"): no use este perfil.',
      },
    },

    variants: {
      "DA40 (IO-360-M1A)": {
        description: "MTOW 1150 kg, tanques estándar 40.2 gal usables, tren original (MLW 1092 kg)",
        productionYears: "2000-presente",
        modifications: [],
      },
    },

    // AFM Rev. 7 ejemplo (6.4.3): 1620 lbs, momento 152762 in·lbs -> brazo 152762/1620 = 94.30"
    emptyWeight: 1620,
    emptyArm: 94.3,
    maxWeight: 2535, // TCDS/AFM: 1150 kg (2535 lb) categoría normal
    maxLandingWeight: 2407, // TCDS/AFM: 1092 kg (2407 lb) con tren original; 2535 lb con MÄM 40-123

    operationalLimits: {
      fuelCapacity: 41.2, // gal totales, tanques estándar (40.2 usables)
      cabinConfiguration: "2 asientos delanteros + 2 traseros",
      baggageCapacity: 66, // lbs compartimiento estándar (30 kg)
    },

    cgLimits: {
      forward: 94.5, // 2.40 m de 780 a 980 kg; lineal hasta 96.9" (2.46 m) a 1150 kg
      aft: 102.0, // 2.59 m, tanques estándar
      notes:
        'AFM 2.8 / TCDS: 2.40 m (94.5") de 780 a 980 kg (1720-2161 lbs), 2.46 m (96.9") a 1150 kg (2535 lbs), variación lineal; trasero 2.59 m (102.0") con tanques estándar. Datum 2.194 m delante de la costilla raíz del ala.',
    },

    stations: {
      pilot: 90.6,
      copilot: 90.6,
      passenger1: 128.0,
      passenger2: 128.0,
      baggage: 143.7,
      fuel: 103.5,
      notes:
        'AFM 6.4.1: asientos delanteros 2.30 m (90.6"), traseros 3.25 m (128.0"), combustible 2.63 m (103.5"), equipaje compartimiento estándar 3.65 m (143.7", máx 66 lbs). Tubo de equipaje y compartimiento extendido no modelados.',
    },

    loadStations: [
      { key: "pilot", labelKey: "stations.pilot", placeholder: "170" },
      { key: "copilot", labelKey: "stations.frontPassenger", placeholder: "170" },
      { key: "passenger1", labelKey: "stations.rearPassenger1", placeholder: "170" },
      { key: "passenger2", labelKey: "stations.rearPassenger2", placeholder: "170" },
      { key: "baggage", labelKey: "stations.baggage", max: 66, placeholder: "30" },
      {
        key: "fuel",
        labelKey: "stations.fuel",
        max: 241, // 40.2 gal usables x 6 lbs/gal
        placeholder: "241",
        fullWidth: true,
        isFuel: true,
      },
    ],

    // Envolvente categoría normal, tanques estándar (AFM 6.4.4). 1720 lbs (780 kg)
    // es el peso mínimo del rango de CG declarado en el AFM.
    cgEnvelope: {
      points: [
        { arm: 94.5, weight: 1720 },
        { arm: 94.5, weight: 2161 },
        { arm: 96.9, weight: 2535 },
        { arm: 102.0, weight: 2535 },
        { arm: 102.0, weight: 1720 },
        { arm: 94.5, weight: 1720 },
      ],
      source: "AFM DA 40 Rev. 7 Sección 2.8 / 6.4.4 y TCDS EASA.IM.A.022 Issue 24",
      verificationStatus: "estimated",
    },

    safetyFactors: {
      weightMargin: 0.95,
      cgMargin: 0.1,
      recommendedReserve: {
        fuel: 48, // ~8 gal (aprox. 45 min)
        weight: 50,
      },
    },

    dataValidation: {
      lastUpdated: "2026-10-14",
      verifiedAgainst: [
        "EASA TCDS EASA.IM.A.022 Issue 24 (Sección A)",
        "AFM Diamond DA 40 6.01.01-E Rev. 7 y Rev. 5 (copias de escuela)",
      ],
      pendingVerification: [
        "Peso vacío y brazo de la aeronave individual (obligatorio: W&B Report propio)",
        'Tanque Long Range (50 gal usables, límite trasero 100.4") no modelado: este perfil es solo para tanques estándar',
        "MTOW 1200 kg (MÄM 40-227) no modelado; MLW 1150 kg con MÄM 40-123 / OÄM 40-283 no modelado (se usa 1092 kg)",
        'Tubo de equipaje (170.1", máx 11 lbs) y compartimiento extendido OÄM 40-163 no modelados',
        "Categoría utilitaria (máx 980 kg) no modelada",
        "AFM vigente (Rev. 8 o posterior) y TCDS FAA A47CE no consultados",
        "No aplica al DA40 NG / DA40 D (Jet-A, otros límites)",
      ],
    },
  },

  "piper-pa-38-112-tomahawk": {
    name: "Piper PA-38-112 Tomahawk",
    tcds: "TCDS# A18SO Revision 5 (FAA)",

    metadata: {
      manufacturer: "Piper Aircraft, Inc.",
      tcdsCurrentRevision: "5 (August 7, 2006)",
      productionYears: "1978-1982",
      totalProduced: 2484,
      productionSource: "https://en.wikipedia.org/wiki/Piper_PA-38_Tomahawk",
      engines: "1x Lycoming O-235-L2C (112 HP)",
      lastDataVerification: "2026-10-14",
      sourceDocuments: [
        "FAA TCDS A18SO Rev. 5 (copia archivada de rgl.faa.gov): http://web.archive.org/web/20210309185125id_/https://rgl.faa.gov/Regulatory_and_Guidance_Library/rgMakeModel.nsf/0/5b754021f0c8564086257212006c3447/$FILE/A18SO.pdf",
        "Piper PA-38-112 Tomahawk POH, Report VB-2126 (rev. 2 May 2012, copia de aeroclub), Secciones 1, 2 y 6: https://www.aeroclubvitoria.net/utilidades/ECFRE%20POH-2012.pdf",
      ],
      dataReliability: "verified-partial",
      notes:
        "Peso máximo, envolvente, datum y brazos de asientos, combustible y equipaje coinciden entre TCDS A18SO y POH VB-2126. El peso vacío es el del ejemplo del POH: use el de su Weight & Balance Report.",
      aircraftSpecific: {
        registrationExample: "Genérico PA-38-112 (ejemplo POH)",
        serialNumber: "N/A",
        warning:
          'Peso vacío y brazo corresponden al avión de ejemplo del POH (1169.0 lbs a 73.2"). Cada aeronave tiene valores propios: consulte su Weight & Balance Report.',
      },
    },

    variants: {
      "PA-38-112": {
        description: "Categorías normal y utilitaria (mismos límites de peso y CG)",
        productionYears: "1978-1982",
        modifications: [],
      },
    },

    // Ejemplo del POH (6.7): 1169.0 lbs a 73.2" (momento 85570)
    emptyWeight: 1169,
    emptyArm: 73.2,
    maxWeight: 1670, // TCDS A18SO / POH 1.11: 1670 lbs (normal y utilitaria)
    maxLandingWeight: 1670, // POH 1.11 (b): máx. aterrizaje 1670 lbs

    operationalLimits: {
      fuelCapacity: 32, // gal totales (30 usables)
      cabinConfiguration: "2 asientos lado a lado",
      baggageCapacity: 100, // lbs
    },

    cgLimits: {
      forward: 72.4, // a 1277 lbs o menos; lineal hasta 73.5" a 1670 lbs
      aft: 78.5,
      notes:
        'TCDS A18SO / POH 2.13: (+72.4) a (+78.5) a 1277 lbs o menos; (+73.5) a (+78.5) a 1670 lbs; variación lineal. Datum: 66.25" delante del borde de ataque del ala.',
    },

    stations: {
      pilot: 85.5,
      copilot: 85.5,
      baggage: 115.0,
      fuel: 75.4,
      notes:
        'TCDS A18SO y POH VB-2126: asientos 85.5" (4.ª muesca; rango 80.8" a 89.5" según POH Fig. 6-14), combustible 75.4" (30 gal usables), equipaje 115.0" (máx 100 lbs; sin equipaje para barrenas).',
    },

    loadStations: [
      { key: "pilot", labelKey: "stations.pilot", placeholder: "170" },
      { key: "copilot", labelKey: "stations.frontPassenger", placeholder: "170" },
      { key: "baggage", labelKey: "stations.baggage", max: 100, placeholder: "20" },
      {
        key: "fuel",
        labelKey: "stations.fuel",
        max: 180, // 30 gal usables x 6 lbs/gal
        placeholder: "180",
        fullWidth: true,
        isFuel: true,
      },
    ],

    // Envolvente (normal y utilitaria) según TCDS A18SO / POH 2.13.
    // El borde inferior (1100 lbs) es solo un piso de graficación, no un límite.
    cgEnvelope: {
      points: [
        { arm: 72.4, weight: 1100 },
        { arm: 72.4, weight: 1277 },
        { arm: 73.5, weight: 1670 },
        { arm: 78.5, weight: 1670 },
        { arm: 78.5, weight: 1100 },
        { arm: 72.4, weight: 1100 },
      ],
      source: "FAA TCDS A18SO Rev. 5 y POH VB-2126 Sección 2.13",
      verificationStatus: "verified-partial",
    },

    safetyFactors: {
      weightMargin: 0.95,
      cgMargin: 0.1,
      recommendedReserve: {
        fuel: 30, // ~5 gal (aprox. 45 min)
        weight: 30,
      },
    },

    dataValidation: {
      lastUpdated: "2026-10-14",
      verifiedAgainst: ["FAA TCDS A18SO Rev. 5", "POH Piper PA-38-112, Report VB-2126 (rev. 2012)"],
      pendingVerification: [
        "Peso vacío y brazo de la aeronave individual (obligatorio: W&B Report propio)",
        'Posición de asiento: se usa 85.5" (4.ª muesca); otras muescas van de 80.8" a 89.5"',
        "Sin equipaje para barrenas (POH 2.11): no validado automáticamente",
        "Revisión vigente del TCDS A18SO (la copia consultada es Rev. 5, 2006)",
      ],
    },
  },
}

/**
 * Options for the aircraft selector, derived from aircraftData and ordered by
 * manufacturer, then by name, so the list stays scannable as the catalog grows.
 */
export const aircraftOptions = Object.entries(aircraftData)
  .sort(
    ([, a], [, b]) =>
      a.metadata.manufacturer.localeCompare(b.metadata.manufacturer, "en") ||
      a.name.localeCompare(b.name, "en")
  )
  .map(([value, aircraft]) => ({
    value,
    label: aircraft.name,
  }))

/**
 * Build an empty weights state object for a given aircraft
 * @param {import('../types').Aircraft} aircraft
 * @returns {import('../types').StationWeights}
 */
export function emptyWeightsFor(aircraft) {
  return Object.fromEntries(aircraft.loadStations.map((station) => [station.key, ""]))
}
