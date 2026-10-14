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
    cgNearForward: (/** @type {string|number} */ margin) =>
      `Center of gravity very close to the forward limit (${margin}" margin)`,
    cgNearAft: (/** @type {string|number} */ margin) =>
      `Center of gravity very close to the aft limit (${margin}" margin)`,
    reduceWeight: (/** @type {string|number} */ lbs) =>
      `Consider reducing weight by ${lbs} lbs for a greater safety margin`,
    dataPartial: "Partially verified data - confirm with official documentation",
    dataEstimated: "Estimated data - confirm with official documentation",
  },

  aircraftInfo: {
    emptyWeight: (/** @type {string|number} */ lbs) => `Empty weight: ${lbs} lbs`,
    maxWeight: (/** @type {string|number} */ lbs) => `Max weight: ${lbs} lbs`,
    cgLimits: (/** @type {string|number} */ forward, /** @type {string|number} */ aft) =>
      `CG limits: ${forward}" - ${aft}"`,
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
    tooltipCg: (/** @type {string|number} */ value) => `CG: ${value}" Arm`,
    tooltipWeight: (/** @type {string|number} */ value) => `Weight: ${value} lbs`,
    envelopeLimit: "Envelope Limit",
    operatingPoint: "Operating Point",
    xUnit: "inches",
    yUnit: "pounds",
  },

  flightPhases: {
    title: "Landing and zero-fuel weight",
    fuelBurnLabel: "Planned fuel burn (lbs)",
    fuelBurnPlaceholder: "800",
    fuelLoaded: (/** @type {string|number} */ lbs) => `Fuel loaded: ${lbs} lbs`,
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
    overMaxLandingWeight: (/** @type {string|number} */ lbs) =>
      `Landing weight exceeds the maximum (${lbs} lbs)`,
    overMaxZeroFuelWeight: (/** @type {string|number} */ lbs) =>
      `Zero-fuel weight exceeds the maximum (${lbs} lbs)`,
    landingOutOfEnvelope: "Landing center of gravity outside the envelope",
    zeroFuelOutOfEnvelope: "Zero-fuel center of gravity outside the envelope",
    burnExceedsFuel: (/** @type {string|number} */ burn, /** @type {string|number} */ loaded) =>
      `Planned burn (${burn} lbs) exceeds the fuel loaded (${loaded} lbs)`,
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
    emptyWeightLabel: "Empty weight (lbs)",
    emptyArmLabel: "Empty weight arm (in)",
    save: "Save aircraft",
    empty: "You haven't saved any aircraft yet.",
    listLabel: "Saved aircraft",
    recordDetail: (/** @type {string|number} */ lbs, /** @type {string|number} */ arm) =>
      `${lbs} lbs @ ${arm}"`,
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

  errorBoundary: {
    title: "Something went wrong",
    description:
      "An unexpected error occurred in the application. You can retry or reload the page. If the problem persists, try clearing the browser's saved data.",
    retry: "Retry",
  },
}
