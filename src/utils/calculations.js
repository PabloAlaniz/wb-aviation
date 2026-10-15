/**
 * Weight & Balance calculation utilities
 * Extracted for testing and reusability
 */
import { messages as m } from "../i18n"

/**
 * Check if a point (CG, weight) is inside the CG envelope
 * Uses ray casting algorithm
 * @param {number} cg - Center of gravity position (arm)
 * @param {number} weight - Total weight
 * @param {import('../types').EnvelopePoint[]} envelopePoints - Envelope polygon points
 * @returns {boolean} - True if point is inside envelope
 */
export function isPointInEnvelope(cg, weight, envelopePoints) {
  if (!envelopePoints || envelopePoints.length < 3) {
    return false
  }

  let inside = false
  let j = envelopePoints.length - 1

  for (let i = 0; i < envelopePoints.length; i++) {
    const xi = envelopePoints[i].arm
    const yi = envelopePoints[i].weight
    const xj = envelopePoints[j].arm
    const yj = envelopePoints[j].weight

    if (yi > weight !== yj > weight && cg < ((xj - xi) * (weight - yi)) / (yj - yi) + xi) {
      inside = !inside
    }
    j = i
  }

  return inside
}

/**
 * Calculate moment from weight and arm
 * @param {number} weight - Weight in lbs
 * @param {number} arm - Arm (station) in inches
 * @returns {number} - Moment (lb-in)
 */
export function calculateMoment(weight, arm) {
  return weight * arm
}

/**
 * Calculate center of gravity from total weight and moment
 * @param {number} totalMoment - Total moment (lb-in)
 * @param {number} totalWeight - Total weight (lbs)
 * @returns {number} - Center of gravity position (inches)
 */
export function calculateCG(totalMoment, totalWeight) {
  if (totalWeight === 0) return 0
  return totalMoment / totalWeight
}

/**
 * Calculate total weight and balance for an aircraft.
 * Iterates over every numeric station defined in aircraft.stations, so it
 * works for any aircraft regardless of its cabin configuration.
 * @param {import('../types').Aircraft} aircraft - Aircraft data with emptyWeight, emptyArm, stations
 * @param {import('../types').StationWeights} weights - Weights for each station (keyed by station name)
 * @returns {import('../types').WeightBalanceResult | null} - Calculation results
 */
export function calculateWeightBalance(aircraft, weights) {
  if (!aircraft || !weights) return null

  const parseWeight = (/** @type {string} */ val) => Number.parseFloat(val) || 0

  let totalWeight = aircraft.emptyWeight
  let totalMoment = calculateMoment(aircraft.emptyWeight, aircraft.emptyArm)

  for (const [station, arm] of Object.entries(aircraft.stations)) {
    if (typeof arm !== "number") continue // skip non-station entries like "notes"
    const weight = parseWeight(weights[station])
    totalWeight += weight
    totalMoment += calculateMoment(weight, arm)
  }

  const centerOfGravity = calculateCG(totalMoment, totalWeight)

  // Validate limits
  const isWeightOk = totalWeight <= aircraft.maxWeight
  const isCgOk = isPointInEnvelope(centerOfGravity, totalWeight, aircraft.cgEnvelope?.points || [])

  return {
    totalWeight,
    totalMoment,
    centerOfGravity,
    isWeightOk,
    isCgOk,
    maxWeight: aircraft.maxWeight,
    cgLimits: aircraft.cgLimits,
  }
}

/**
 * Validate safety conditions for flight
 * @param {import('../types').Aircraft} aircraft - Aircraft data
 * @param {number} totalWeight - Total weight
 * @param {number} centerOfGravity - CG position
 * @returns {import('../types').SafetyValidation} - Safety validation results
 */
export function validateSafetyConditions(aircraft, totalWeight, centerOfGravity) {
  /** @type {import('../types').SafetyIssue[]} */
  const warnings = []
  /** @type {import('../types').SafetyIssue[]} */
  const errors = []

  // Weight checks
  if (totalWeight > aircraft.maxWeight) {
    errors.push({
      type: "weight",
      message: `Peso excede máximo permitido (${aircraft.maxWeight} lbs)`,
      value: totalWeight,
      limit: aircraft.maxWeight,
    })
  } else if (totalWeight > aircraft.maxWeight * (aircraft.safetyFactors?.weightMargin || 0.95)) {
    warnings.push({
      type: "weight",
      message: "Peso cercano al límite máximo",
      value: totalWeight,
      limit: aircraft.maxWeight,
    })
  }

  // CG checks
  const cgMargin = aircraft.safetyFactors?.cgMargin || 0.1
  if (centerOfGravity < aircraft.cgLimits.forward) {
    errors.push({
      type: "cg",
      message: "CG adelante del límite",
      value: centerOfGravity,
      limit: aircraft.cgLimits.forward,
    })
  } else if (centerOfGravity < aircraft.cgLimits.forward + cgMargin) {
    warnings.push({
      type: "cg",
      message: "CG cercano al límite delantero",
      value: centerOfGravity,
      limit: aircraft.cgLimits.forward,
    })
  }

  if (centerOfGravity > aircraft.cgLimits.aft) {
    errors.push({
      type: "cg",
      message: "CG detrás del límite",
      value: centerOfGravity,
      limit: aircraft.cgLimits.aft,
    })
  } else if (centerOfGravity > aircraft.cgLimits.aft - cgMargin) {
    warnings.push({
      type: "cg",
      message: "CG cercano al límite trasero",
      value: centerOfGravity,
      limit: aircraft.cgLimits.aft,
    })
  }

  return {
    isValid: errors.length === 0,
    warnings,
    errors,
  }
}

/**
 * Build the safety report shown in the UI: severity-tagged warnings,
 * recommendations, weight usage percentage and CG margins.
 * @param {import('../types').Aircraft} aircraft - Aircraft data (safetyFactors, cgLimits, metadata)
 * @param {number} totalWeight - Total weight (lbs)
 * @param {number} centerOfGravity - CG position (inches)
 * @returns {import('../types').SafetyReport} - { warnings, recommendations, weightPercentage, cgMargins, dataReliability }
 */
export function buildSafetyReport(aircraft, totalWeight, centerOfGravity) {
  const safetyFactors = aircraft.safetyFactors
  /** @type {import('../types').SafetyIssue[]} */
  const warnings = []
  /** @type {import('../types').SafetyRecommendation[]} */
  const recommendations = []

  // Verificar peso cerca del límite
  const weightPercentage = (totalWeight / aircraft.maxWeight) * 100
  if (weightPercentage > safetyFactors.weightMargin * 100) {
    warnings.push({
      type: "weight-warning",
      message: m.safety.weightNearLimit(weightPercentage.toFixed(1)),
      severity: "medium",
    })
  }

  // Verificar CG cerca de límites
  const cgForwardMargin = centerOfGravity - aircraft.cgLimits.forward
  const cgAftMargin = aircraft.cgLimits.aft - centerOfGravity

  if (cgForwardMargin < safetyFactors.cgMargin) {
    warnings.push({
      type: "cg-forward-warning",
      message: m.safety.cgNearForward(cgForwardMargin.toFixed(2)),
      severity: "high",
    })
  }

  if (cgAftMargin < safetyFactors.cgMargin) {
    warnings.push({
      type: "cg-aft-warning",
      message: m.safety.cgNearAft(cgAftMargin.toFixed(2)),
      severity: "high",
    })
  }

  // Recomendaciones de seguridad
  if (totalWeight > aircraft.maxWeight - safetyFactors.recommendedReserve.weight) {
    const excessLbs = totalWeight - (aircraft.maxWeight - safetyFactors.recommendedReserve.weight)
    recommendations.push({
      type: "weight-reserve",
      message: m.safety.reduceWeight(excessLbs.toFixed(0)),
      excessLbs,
    })
  }

  // Verificación de confiabilidad de datos
  const dataReliability = aircraft.metadata.dataReliability
  if (dataReliability !== "verified-complete") {
    warnings.push({
      type: "data-reliability",
      message:
        dataReliability === "verified-partial" ? m.safety.dataPartial : m.safety.dataEstimated,
      severity: "low",
    })
  }

  return {
    warnings,
    recommendations,
    weightPercentage: weightPercentage.toFixed(1),
    cgMargins: {
      forward: cgForwardMargin.toFixed(2),
      aft: cgAftMargin.toFixed(2),
    },
    dataReliability,
  }
}

/**
 * Keys of the fuel stations of an aircraft. Stations are flagged with
 * `isFuel: true` in `loadStations`; when none is flagged, a numeric station
 * named "fuel" is used as a fallback (keeps older/custom data working).
 * @param {import('../types').Aircraft} aircraft
 * @returns {string[]}
 */
export function getFuelStationKeys(aircraft) {
  if (!aircraft) return []
  const flagged = (aircraft.loadStations || [])
    .filter((station) => station.isFuel && typeof aircraft.stations[station.key] === "number")
    .map((station) => station.key)
  if (flagged.length > 0) return flagged
  return typeof aircraft.stations?.fuel === "number" ? ["fuel"] : []
}

/**
 * Weight, moment, CG and envelope check for one flight phase.
 * @param {import('../types').Aircraft} aircraft
 * @param {number} totalWeight - lbs
 * @param {number} totalMoment - lb-in
 * @returns {import('../types').FlightPhase}
 */
function buildPhase(aircraft, totalWeight, totalMoment) {
  const centerOfGravity = calculateCG(totalMoment, totalWeight)
  return {
    totalWeight,
    totalMoment,
    centerOfGravity,
    inEnvelope: isPointInEnvelope(centerOfGravity, totalWeight, aircraft.cgEnvelope?.points || []),
  }
}

/**
 * Takeoff, landing and zero-fuel conditions for a planned fuel burn.
 * - landing = takeoff minus the burned fuel, removed from the fuel stations
 *   proportionally to the fuel loaded in each one (at each station's arm);
 * - zero-fuel = takeoff minus all the loaded fuel.
 * The burn is clamped to [0, loaded fuel]; `burnExceedsFuel` flags when the
 * requested burn was larger than the fuel on board.
 * @param {import('../types').Aircraft} aircraft
 * @param {import('../types').StationWeights} weights - Station weights (raw strings)
 * @param {number | string} fuelBurn - Planned fuel burn (lbs)
 * @returns {import('../types').FlightPhasesResult | null}
 */
export function calculateFlightPhases(aircraft, weights, fuelBurn) {
  const base = calculateWeightBalance(aircraft, weights)
  if (!base) return null

  const takeoff = buildPhase(aircraft, base.totalWeight, base.totalMoment)

  const fuelKeys = getFuelStationKeys(aircraft)
  const fuelByStation = fuelKeys.map((key) => ({
    arm: /** @type {number} */ (aircraft.stations[key]),
    weight: Math.max(0, Number.parseFloat(weights[key]) || 0),
  }))
  const fuelLoaded = fuelByStation.reduce((sum, s) => sum + s.weight, 0)
  const fuelMoment = fuelByStation.reduce((sum, s) => sum + calculateMoment(s.weight, s.arm), 0)

  const requestedBurn = Math.max(0, Number.parseFloat(String(fuelBurn)) || 0)
  const burnExceedsFuel = requestedBurn > fuelLoaded
  const effectiveBurn = Math.min(requestedBurn, fuelLoaded)

  // Quema proporcional: el momento quemado sigue el brazo medio del combustible cargado
  const burnFraction = fuelLoaded > 0 ? effectiveBurn / fuelLoaded : 0
  const landing = buildPhase(
    aircraft,
    takeoff.totalWeight - effectiveBurn,
    takeoff.totalMoment - fuelMoment * burnFraction
  )
  const zeroFuel = buildPhase(
    aircraft,
    takeoff.totalWeight - fuelLoaded,
    takeoff.totalMoment - fuelMoment
  )

  return {
    takeoff,
    landing,
    zeroFuel,
    fuelLoaded,
    fuelBurn: effectiveBurn,
    requestedBurn,
    burnExceedsFuel,
    hasFuelStation: fuelKeys.length > 0,
  }
}

/**
 * Landing / zero-fuel safety checks: CG envelope plus max landing weight and
 * max zero-fuel weight (only when the aircraft data declares them).
 * @param {import('../types').Aircraft} aircraft
 * @param {import('../types').FlightPhasesResult} phases
 * @returns {import('../types').LandingReport}
 */
export function buildLandingReport(aircraft, phases) {
  /** @type {import('../types').SafetyIssue[]} */
  const errors = []
  /** @type {import('../types').SafetyIssue[]} */
  const warnings = []
  const { landing, zeroFuel } = phases
  const fp = m.flightPhases

  if (aircraft.maxLandingWeight !== undefined && landing.totalWeight > aircraft.maxLandingWeight) {
    errors.push({
      type: "landing-weight",
      message: fp.overMaxLandingWeight(aircraft.maxLandingWeight),
      value: landing.totalWeight,
      limit: aircraft.maxLandingWeight,
      severity: "high",
    })
  }
  if (!landing.inEnvelope) {
    errors.push({
      type: "landing-cg",
      message: fp.landingOutOfEnvelope,
      value: landing.centerOfGravity,
      severity: "high",
    })
  }
  if (
    aircraft.maxZeroFuelWeight !== undefined &&
    zeroFuel.totalWeight > aircraft.maxZeroFuelWeight
  ) {
    errors.push({
      type: "zero-fuel-weight",
      message: fp.overMaxZeroFuelWeight(aircraft.maxZeroFuelWeight),
      value: zeroFuel.totalWeight,
      limit: aircraft.maxZeroFuelWeight,
      severity: "high",
    })
  }
  if (phases.hasFuelStation && !zeroFuel.inEnvelope) {
    warnings.push({
      type: "zero-fuel-cg",
      message: fp.zeroFuelOutOfEnvelope,
      value: zeroFuel.centerOfGravity,
      severity: "medium",
    })
  }
  // Planificar quemar más combustible del cargado es un error de planificación
  if (phases.burnExceedsFuel) {
    errors.push({
      type: "burn-exceeds-fuel",
      message: fp.burnExceedsFuel(phases.requestedBurn, phases.fuelLoaded),
      value: phases.requestedBurn,
      limit: phases.fuelLoaded,
      severity: "high",
    })
  }

  return { isLandingOk: errors.length === 0, errors, warnings }
}
