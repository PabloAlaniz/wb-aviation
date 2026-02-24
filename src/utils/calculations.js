/**
 * Weight & Balance calculation utilities
 * Extracted for testing and reusability
 */

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

    if (((yi > weight) !== (yj > weight)) && (cg < (xj - xi) * (weight - yi) / (yj - yi) + xi)) {
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
 * Calculate total weight and balance for an aircraft
 * @param {Object} aircraft - Aircraft data with emptyWeight, emptyArm, stations
 * @param {Object} weights - Weights for each station
 * @returns {Object} - Calculation results
 */
export function calculateWeightBalance(aircraft, weights) {
  if (!aircraft || !weights) return null

  const parseWeight = (val) => Number.parseFloat(val) || 0

  // Parse all weights
  const pilotWeight = parseWeight(weights.pilot)
  const copilotWeight = parseWeight(weights.copilot)
  const passenger1Weight = parseWeight(weights.passenger1)
  const passenger2Weight = parseWeight(weights.passenger2)
  const passenger3Weight = parseWeight(weights.passenger3)
  const passenger4Weight = parseWeight(weights.passenger4)
  const baggage1Weight = parseWeight(weights.baggage1)
  const baggage2Weight = parseWeight(weights.baggage2)
  const fuelWeight = parseWeight(weights.fuel)

  // Calculate moments
  const emptyMoment = calculateMoment(aircraft.emptyWeight, aircraft.emptyArm)
  const pilotMoment = calculateMoment(pilotWeight, aircraft.stations.pilot)
  const copilotMoment = calculateMoment(copilotWeight, aircraft.stations.copilot)
  const passenger1Moment = calculateMoment(passenger1Weight, aircraft.stations.passenger1)
  const passenger2Moment = calculateMoment(passenger2Weight, aircraft.stations.passenger2)
  const passenger3Moment = calculateMoment(passenger3Weight, aircraft.stations.passenger3)
  const passenger4Moment = calculateMoment(passenger4Weight, aircraft.stations.passenger4)
  const baggage1Moment = calculateMoment(baggage1Weight, aircraft.stations.baggage1)
  const baggage2Moment = calculateMoment(baggage2Weight, aircraft.stations.baggage2)
  const fuelMoment = calculateMoment(fuelWeight, aircraft.stations.fuel)

  // Calculate totals
  const totalWeight =
    aircraft.emptyWeight +
    pilotWeight +
    copilotWeight +
    passenger1Weight +
    passenger2Weight +
    passenger3Weight +
    passenger4Weight +
    baggage1Weight +
    baggage2Weight +
    fuelWeight

  const totalMoment =
    emptyMoment + pilotMoment + copilotMoment + passenger1Moment + passenger2Moment +
    passenger3Moment + passenger4Moment + baggage1Moment + baggage2Moment + fuelMoment

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
    cgLimits: aircraft.cgLimits
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
      type: 'weight',
      message: `Peso excede máximo permitido (${aircraft.maxWeight} lbs)`,
      value: totalWeight,
      limit: aircraft.maxWeight
    })
  } else if (totalWeight > aircraft.maxWeight * (aircraft.safetyFactors?.weightMargin || 0.95)) {
    warnings.push({
      type: 'weight',
      message: 'Peso cercano al límite máximo',
      value: totalWeight,
      limit: aircraft.maxWeight
    })
  }

  // CG checks
  const cgMargin = aircraft.safetyFactors?.cgMargin || 0.1
  if (centerOfGravity < aircraft.cgLimits.forward) {
    errors.push({
      type: 'cg',
      message: 'CG adelante del límite',
      value: centerOfGravity,
      limit: aircraft.cgLimits.forward
    })
  } else if (centerOfGravity < aircraft.cgLimits.forward + cgMargin) {
    warnings.push({
      type: 'cg',
      message: 'CG cercano al límite delantero',
      value: centerOfGravity,
      limit: aircraft.cgLimits.forward
    })
  }

  if (centerOfGravity > aircraft.cgLimits.aft) {
    errors.push({
      type: 'cg',
      message: 'CG detrás del límite',
      value: centerOfGravity,
      limit: aircraft.cgLimits.aft
    })
  } else if (centerOfGravity > aircraft.cgLimits.aft - cgMargin) {
    warnings.push({
      type: 'cg',
      message: 'CG cercano al límite trasero',
      value: centerOfGravity,
      limit: aircraft.cgLimits.aft
    })
  }

  return {
    isValid: errors.length === 0,
    warnings,
    errors
  }
}
