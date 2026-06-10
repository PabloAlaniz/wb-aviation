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
 * @param {Array<{arm: number, weight: number}>} envelopePoints - Envelope polygon points
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
 * @param {Object} aircraft - Aircraft data with emptyWeight, emptyArm, stations
 * @param {Object} weights - Weights for each station (keyed by station name)
 * @returns {Object} - Calculation results
 */
export function calculateWeightBalance(aircraft, weights) {
  if (!aircraft || !weights) return null

  const parseWeight = (val) => Number.parseFloat(val) || 0

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
 * @param {Object} aircraft - Aircraft data
 * @param {number} totalWeight - Total weight
 * @param {number} centerOfGravity - CG position
 * @returns {Object} - Safety validation results
 */
export function validateSafetyConditions(aircraft, totalWeight, centerOfGravity) {
  const warnings = []
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
 * @param {Object} aircraft - Aircraft data (safetyFactors, cgLimits, metadata)
 * @param {number} totalWeight - Total weight (lbs)
 * @param {number} centerOfGravity - CG position (inches)
 * @returns {Object} - { warnings, recommendations, weightPercentage, cgMargins, dataReliability }
 */
export function buildSafetyReport(aircraft, totalWeight, centerOfGravity) {
  const safetyFactors = aircraft.safetyFactors
  const warnings = []
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
    recommendations.push({
      type: "weight-reserve",
      message: m.safety.reduceWeight(
        (totalWeight - (aircraft.maxWeight - safetyFactors.recommendedReserve.weight)).toFixed(0)
      ),
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
