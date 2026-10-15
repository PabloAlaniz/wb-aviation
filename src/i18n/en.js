/**
 * UI messages in English.
 * Mirrors the structure (and parameter signatures) of es.js.
 */
export const en = {
  app: {
    title: (/** @type {string} */ aircraftName) => `${aircraftName} - Weight & Balance`,
    subtitle: (/** @type {string} */ tcds) => `Weight and balance calculation based on ${tcds}`,
    aircraftCardTitle: "Aircraft Data",
    aircraftCardDescription: "Select the aircraft type and enter the weights",
    aircraftSelectLabel: "Aircraft Type",
    aircraftSelectPlaceholder: "Select an aircraft",
    clearWeights: "Clear weights",
    resultsCardTitle: "Calculation Results",
    resultsCardDescription: "Total weight and center of gravity",
    noAircraftSelected: "Select an aircraft to see the results",
    envelopeSectionTitle: "Center of Gravity Envelope",
    envelopeCaption:
      "The black dot shows the current weight and CG condition. The dashed lines indicate the exact coordinates. The aircraft is safe to operate only if the dot is inside the shaded area.",
  },

  results: {
    totalWeight: "Total Weight:",
    centerOfGravity: "Center of Gravity:",
    ok: "OK",
    overweight: "OVERWEIGHT",
    cgOutOfLimits: "OUT OF LIMITS",
    readyForTakeoff: "✅ AIRCRAFT READY FOR TAKEOFF",
    readyDetail: "Weight and balance within limits",
    notFitForTakeoff: "⚠️ NOT FIT FOR TAKEOFF",
    overweightDetail: "Weight exceeded. ",
    cgOutDetail: "Center of gravity out of limits.",
  },

  safety: {
    title: "Safety Alerts",
    weightUsage: "Weight usage:",
    cgMargin: "CG margin:",
    weightNearLimit: (/** @type {string|number} */ pct) =>
      `Weight at ${pct}% of the maximum allowed`,
    cgNearForward: (/** @type {string|number} */ margin, /** @type {string} */ unit = '"') =>
      `Center of gravity very close to the forward limit (${margin}${unit} margin)`,
    cgNearAft: (/** @type {string|number} */ margin, /** @type {string} */ unit = '"') =>
      `Center of gravity very close to the aft limit (${margin}${unit} margin)`,
    reduceWeight: (/** @type {string|number} */ value, /** @type {string} */ unit = "lbs") =>
      `Consider reducing weight by ${value} ${unit} for a greater safety margin`,
    dataPartial: "Partially verified data - confirm with official documentation",
    dataEstimated: "Estimated data - confirm with official documentation",
  },

  aircraftInfo: {
    emptyWeight: (/** @type {string|number} */ value, /** @type {string} */ unit = "lbs") =>
      `Empty weight: ${value} ${unit}`,
    maxWeight: (/** @type {string|number} */ value, /** @type {string} */ unit = "lbs") =>
      `Max weight: ${value} ${unit}`,
    cgLimits: (
      /** @type {string|number} */ forward,
      /** @type {string|number} */ aft,
      /** @type {string} */ unit = '"'
    ) => `CG limits: ${forward}${unit} - ${aft}${unit}`,
    production: "Production:",
    productionDetail: (/** @type {string|number} */ years, /** @type {string|number} */ total) =>
      `${years} (${total} built)`,
    engines: "Engines:",
    manufacturer: "Current manufacturer:",
    dataReliability: "Data reliability:",
    reliabilityVerified: "Verified",
    reliabilityPartial: "Partial",
    reliabilityEstimated: "Estimated",
  },

  stations: {
    pilot: "Pilot",
    copilot: "Copilot",
    frontPassenger: "Front passenger",
    passenger1: "Passenger 1",
    passenger2: "Passenger 2",
    passenger3: "Passenger 3",
    passenger4: "Passenger 4",
    rearPassenger1: "Rear passenger 1",
    rearPassenger2: "Rear passenger 2",
    baggage: "Baggage",
    baggage1: "Baggage 1",
    baggage2: "Baggage 2",
    baggageArea1: "Baggage area 1",
    baggageArea2: "Baggage area 2",
    baggageExtension: "Baggage extension",
    fuel: "Fuel",
  },

  units: {
    label: "Units",
    imperial: "Imperial (lbs, in, gal)",
    metric: "Metric (kg, mm, L)",
    stationLabel: (/** @type {string} */ label, /** @type {string} */ unit) => `${label} (${unit})`,
    stationLabelMax: (
      /** @type {string} */ label,
      /** @type {string} */ unit,
      /** @type {string|number} */ max
    ) => `${label} (${unit}, max ${max})`,
    fuelInputMode: "Enter fuel by",
    byWeight: "Weight",
    byVolume: "Volume",
    fuelEquivalent: (/** @type {string} */ value) => `Equivalent to ${value}`,
    fuelDensityNote: (/** @type {string} */ density) => `AVGAS density: ${density}`,
    millimeters: "millimeters",
    kilograms: "kilograms",
    axisNoteMetric: "C.G. Arm - mm aft of Datum STA 0.0",
  },

  dataSources: {
    title: "Official References and Sources",
    lastUpdated: "Last updated:",
    verifiedSources: "Verified sources:",
    pendingVerification: "⚠️ Pending verification:",
    aircraftSpecificTitle: "⚠️ Aircraft-Specific Data",
    basedOn: "Example based on:",
    disclaimerLabel: "Important:",
    disclaimer:
      "Always consult the official documentation specific to your aircraft for operational weight and balance calculations. This tool is for general reference only.",
  },

  chart: {
    title: (/** @type {string} */ tcds) => `CG Envelope — ${tcds}`,
    axisNote: "C.G. Arm - Inches aft of Datum STA 0.0",
    tooltipTitle: "Point Information",
    tooltipCg: (/** @type {string|number} */ value, /** @type {string} */ unit = '"') =>
      `CG: ${value}${unit} Arm`,
    tooltipWeight: (/** @type {string|number} */ value, /** @type {string} */ unit = "lbs") =>
      `Weight: ${value} ${unit}`,
    envelopeLimit: "Envelope Limit",
    operatingPoint: "Operating Point",
    xUnit: "inches",
    yUnit: "pounds",
  },

  flightPhases: {
    title: "Landing and zero-fuel weight",
    fuelBurnLabel: "Planned fuel burn",
    fuelBurnPlaceholder: "800",
    fuelLoaded: (/** @type {string|number} */ value, unit = "lbs") =>
      `Fuel loaded: ${value} ${unit}`,
    noFuelStation: "This aircraft has no fuel station defined",
    phase: "Phase",
    weight: "Weight",
    cg: "CG",
    status: "Status",
    takeoff: "Takeoff",
    landing: "Landing",
    zeroFuel: "Zero fuel (ZFW)",
    inEnvelope: "OK",
    outOfEnvelope: "OUT",
    readyForLanding: "✅ LANDING WITHIN LIMITS",
    landingOkDetail: "Landing weight and balance within limits",
    notFitForLanding: "⚠️ LANDING OUT OF LIMITS",
    overMaxLandingWeight: (/** @type {string|number} */ value, unit = "lbs") =>
      `Landing weight exceeds the maximum (${value} ${unit})`,
    overMaxZeroFuelWeight: (/** @type {string|number} */ value, unit = "lbs") =>
      `Zero-fuel weight exceeds the maximum (${value} ${unit})`,
    landingOutOfEnvelope: "Landing center of gravity outside the envelope",
    zeroFuelOutOfEnvelope: "Zero-fuel center of gravity outside the envelope",
    burnExceedsFuel: (
      /** @type {string|number} */ burn,
      /** @type {string|number} */ loaded,
      unit = "lbs"
    ) => `Planned burn (${burn} ${unit}) exceeds the fuel loaded (${loaded} ${unit})`,
    chartLanding: "Landing",
    chartZeroFuel: "Zero fuel",
    chartBurnPath: "Fuel burn",
  },

  customAircraft: {
    title: "My aircraft (by registration)",
    description:
      "Enter the empty weight and arm from your aircraft's Weight & Balance Report. The envelope, stations and limits come from the base model.",
    baseModelLabel: "Base model",
    registrationLabel: "Registration",
    registrationPlaceholder: "N12345",
    emptyWeightLabel: "Empty weight",
    emptyArmLabel: "Empty weight arm",
    save: "Save aircraft",
    empty: "You haven't saved any aircraft yet.",
    listLabel: "Saved aircraft",
    recordDetail: (/** @type {string} */ weight, /** @type {string} */ arm) => `${weight} @ ${arm}`,
    remove: (/** @type {string} */ registration) => `Delete ${registration}`,
    sourceDocument: "Aircraft Weight & Balance Report (user-entered data)",
    specificWarning:
      "Empty weight and arm entered by the user from this aircraft's Weight & Balance Report. Envelope, stations and limits come from the base model: verify them against your aircraft's POH.",
    errors: {
      registrationRequired: "Enter the registration.",
      registrationInvalid:
        "Invalid registration (letters, digits and dashes only, 2 to 10 characters).",
      baseModelUnknown: "Select a base model.",
      emptyWeightInvalid: "Enter an empty weight greater than 0.",
      emptyWeightAboveMax: "Empty weight must be lower than the model's maximum weight.",
      emptyArmInvalid: "Enter an arm greater than 0.",
    },
  },

  share: {
    button: "Share",
    buttonLabel: "Share a link to this calculation",
    copied: "Link copied",
    copyFailed: "Couldn't copy the link",
    showQr: "Show QR",
    hideQr: "Hide QR",
    qrAlt: "QR code with the link to this calculation",
    qrFailed: "Couldn't generate the QR code",
    shareTitle: (/** @type {string} */ aircraftName) => `Weight & balance: ${aircraftName}`,
    loaded: "Loaded a shared calculation.",
    conflict:
      "The link includes an aircraft whose registration you already saved with a different empty weight or arm. It wasn't loaded so your data isn't overwritten.",
    invalid: "The shared link is invalid or incomplete.",
    dismiss: "Dismiss notice",
  },

  errorBoundary: {
    title: "Something went wrong",
    description:
      "An unexpected error occurred in the application. You can retry or reload the page. If the problem persists, try clearing the browser's saved data.",
    retry: "Retry",
  },

  fleet: {
    shareTitle: "Share fleet (instructors and schools)",
    shareDescription:
      "Create a link with your aircraft by registration so your students can import them on their device. Only base model, registration, empty weight and arm are shared.",
    schoolNameLabel: "School or flying club (optional)",
    schoolNamePlaceholder: "Flying club ...",
    shareButton: "Share fleet",
    shareEmpty: "Save at least one aircraft by registration to share your fleet.",
    truncated: (/** @type {number} */ max) => `Only the first ${max} aircraft are included.`,
    copied: "Fleet link copied to the clipboard.",
    shared: "Fleet link shared.",
    copyFailed: "Couldn't copy automatically. Copy the link:",
    linkLabel: "Fleet link",
    importTitle: "Import fleet",
    importFrom: (/** @type {string} */ name) => `${name} shared their fleet with you.`,
    importAnonymous: "Someone shared an aircraft fleet with you.",
    importListLabel: "Aircraft to import",
    overwriteNote:
      "If you already saved any of these registrations, their data will be replaced with the link's.",
    willOverwrite: "Replaces saved one",
    verifyNote:
      "Check empty weight and arm against each aircraft's Weight & Balance Report before flying.",
    importButton: (/** @type {number} */ count) =>
      count === 1 ? "Import 1 aircraft" : `Import ${count} aircraft`,
    dismiss: "Dismiss",
    imported: (/** @type {number} */ count) =>
      count === 1 ? "Imported 1 aircraft." : `Imported ${count} aircraft.`,
    invalidLink: "The fleet link is invalid or damaged.",
    close: "Close",
  },

  footer: {
    madeBy: "Made by",
    sourceCode: "Source code on GitHub",
    fleetHint: "Instructor or flight school? Share your fleet",
    disclaimer:
      "This is an aid: your aircraft's POH/AFM and Weight & Balance Report are the official reference. Always double-check the results.",
    version: (/** @type {string} */ version) => `Version ${version}`,
  },

  loadSheet: {
    formTitle: "Load sheet (print / PDF)",
    formDescription:
      "Fill in the flight details to print the weight and balance sheet or save it as a PDF.",
    pilot: "Pilot in command",
    registration: "Aircraft registration",
    date: "Date",
    departure: "Departure (ICAO)",
    destination: "Destination (ICAO)",
    icaoPlaceholder: "KJFK",
    remarks: "Remarks",
    printButton: "Print load sheet / Save PDF",
    sheetTitle: "Load sheet — Weight and balance",
    aircraft: "Aircraft",
    tcds: "TCDS",
    route: "Route",
    units: (
      /** @type {string} */ weight,
      /** @type {string} */ arm,
      /** @type {string} */ moment
    ) => `Units: weight ${weight}, arm ${arm}, moment ${moment}`,
    stationsTitle: "Load distribution",
    station: "Station",
    weight: "Weight",
    arm: "Arm",
    moment: "Moment",
    emptyWeight: "Empty weight (basic)",
    total: "Takeoff total",
    phasesTitle: "Flight phases",
    phase: "Condition",
    cg: "CG",
    status: "Envelope",
    inEnvelope: "WITHIN",
    outOfEnvelope: "OUT",
    plannedBurn: "Planned fuel burn",
    limitsTitle: "Limits",
    maxTakeoffWeight: "Max takeoff weight",
    maxLandingWeight: "Max landing weight",
    maxZeroFuelWeight: "Max zero-fuel weight",
    cgLimits: "CG limits (fwd / aft)",
    takeoffOk: "Takeoff within limits",
    takeoffNotOk: "TAKEOFF OUT OF LIMITS",
    warningsTitle: "Safety warnings",
    noWarnings: "No warnings.",
    envelopeTitle: "CG envelope",
    dataTitle: "Data reliability and sources",
    reliability: "Reliability:",
    pending: "Pending verification:",
    remarksTitle: "Remarks",
    signature: "Pilot in command signature",
    generatedBy: "Generated with CheckCG",
    disclaimer:
      "Reference tool only. The aircraft's flight manual (POH/AFM) and weight and balance report take precedence over this sheet.",
  },

  seo: {
    siteName: "CheckCG",
    ogLocale: "en_US",
    languageLabel: "Language",
    calculatorTitle: "Interactive calculator",
    loading: "Loading the calculator…",
    noscript:
      "The calculator requires JavaScript. The reference data on this page is available without it.",
    appDescription:
      "Free aircraft weight and balance calculator: center of gravity, CG envelope and load sheet. Works offline, no sign-up.",
    home: {
      title: "Aircraft weight and balance calculator | CheckCG",
      description:
        "Calculate your aircraft's weight and balance and center of gravity with TCDS and POH data. Free, offline and no sign-up.",
      h1: "Aircraft weight and balance calculator",
      intro1:
        "Weight and balance checks, before every flight, that the aircraft does not exceed its maximum weight and that its center of gravity (CG) stays inside the approved envelope. An out-of-limits CG affects stability and control even when the total weight is fine.",
      intro2:
        "CheckCG adds the empty weight and every loading station (crew, passengers, baggage and fuel), computes the resulting moment and CG and checks them against the manufacturer's envelope, including landing and zero-fuel conditions. It runs in your browser, with no sign-up and offline.",
      aircraftListTitle: "Supported aircraft",
      aircraftLink: (/** @type {string} */ name) => `${name} weight and balance`,
    },
    aircraft: {
      title: (/** @type {string} */ name) => `${name} weight and balance: CG calculator | CheckCG`,
      description: (/** @type {string} */ name, /** @type {string} */ maxWeight) =>
        `${name} weight and balance calculator: ${maxWeight} max weight, station arms, CG limits and envelope. Free and offline.`,
      h1: (/** @type {string} */ name) => `${name} weight and balance`,
      intro: (/** @type {string} */ name, /** @type {string} */ tcds) =>
        `Calculate the total weight and center of gravity of the ${name} using reference data from ${tcds}. Enter the weight at each station and the calculator checks maximum weight and the CG envelope for takeoff and landing.`,
      specsTitle: "Weight and balance data",
      tcds: "Type certificate data sheet (TCDS)",
      manufacturer: "Manufacturer",
      engines: "Engines",
      maxWeight: "Maximum takeoff weight",
      emptyWeight: "Reference empty weight",
      emptyArm: "Empty weight arm",
      cgLimits: "CG limits",
      cgLimitsValue: (/** @type {string} */ forward, /** @type {string} */ aft) =>
        `${forward} to ${aft} aft of datum`,
      stationsTitle: "Loading stations and arms",
      station: "Station",
      arm: "Arm (in)",
      maxLoad: "Maximum (lbs)",
      envelopeTitle: "CG envelope points",
      envelopeCaption: "Envelope polygon vertices (arm in inches aft of datum, weight in pounds).",
      point: "Point",
      envelopeArm: "Arm (in)",
      envelopeWeight: "Weight (lbs)",
      reliabilityTitle: "Data reliability and sources",
      reliabilityLabel: "Reliability:",
      reliabilityVerifiedComplete: "verified against official documentation",
      reliabilityVerifiedPartial: "partially verified",
      reliabilityEstimated: "estimated reference values",
      lastVerified: "Last verified:",
      sourcesLabel: "Sources:",
      pendingLabel: "Pending verification:",
      ownDataWarning:
        "Empty weight and arm differ for every airframe: use the values from your aircraft's weight and balance report (you can add them as a custom aircraft in the calculator).",
      faqTitle: "Frequently asked questions",
      faqWhatQ: (/** @type {string} */ name) => `How is the ${name} weight and balance calculated?`,
      faqWhatA: (/** @type {string} */ name) =>
        `Multiply each station's weight by its arm to get its moment, add up weights and moments (including the empty weight) and divide the total moment by the total weight to get the CG. The ${name} is within limits when the weight does not exceed the maximum and the weight/CG point lies inside the envelope.`,
      faqMaxWeightQ: (/** @type {string} */ name) => `What is the maximum weight of the ${name}?`,
      faqMaxWeightA: (
        /** @type {string} */ name,
        /** @type {string} */ maxWeight,
        /** @type {string} */ tcds
      ) =>
        `The reference maximum takeoff weight of the ${name} is ${maxWeight}, per ${tcds}. Always confirm it in your aircraft's POH/AFM.`,
      faqCgQ: (/** @type {string} */ name) => `What are the CG limits of the ${name}?`,
      faqCgA: (
        /** @type {string} */ name,
        /** @type {string} */ forward,
        /** @type {string} */ aft
      ) =>
        `The ${name} CG must be between ${forward} (forward limit) and ${aft} (aft limit) aft of datum. The effective limit depends on weight: the envelope on this page shows its full shape.`,
      faqOwnQ: (/** @type {string} */ name) => `Can I use this calculator for my ${name}?`,
      faqOwnA: (/** @type {string} */ name) =>
        `Yes, as a reference. Every ${name} has its own empty weight and arm depending on its equipment: enter them from its weight and balance report as a custom aircraft. The POH/AFM is always the official reference.`,
      otherAircraftTitle: "Other aircraft",
    },
  },
}
