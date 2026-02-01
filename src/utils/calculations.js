/**
 * Weight & Balance Calculations
 * Extracted from App.jsx for better testability
 */

/**
 * Check if a point is inside an irregular polygon using ray-casting algorithm
 * @param {number} cg - Center of gravity (x-coordinate)
 * @param {number} weight - Weight (y-coordinate)
 * @param {Array} envelopePoints - Array of {arm, weight} points defining the envelope
 * @returns {boolean} - True if point is inside the envelope
 */
export function isPointInEnvelope(cg, weight, envelopePoints) {
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
 * Calculate weight and balance for an aircraft
 * @param {Object} aircraft - Aircraft data including empty weight, stations, limits
 * @param {Object} weights - Weight values for all stations
 * @returns {Object} - Calculation results including totals and safety checks
 */
export function calculateWeightBalance(aircraft, weights) {
  if (!aircraft) return null

  // Parse all weights
  const pilotWeight = Number.parseFloat(weights.pilot) || 0
  const copilotWeight = Number.parseFloat(weights.copilot) || 0
  const passenger1Weight = Number.parseFloat(weights.passenger1) || 0
  const passenger2Weight = Number.parseFloat(weights.passenger2) || 0
  const passenger3Weight = Number.parseFloat(weights.passenger3) || 0
  const passenger4Weight = Number.parseFloat(weights.passenger4) || 0
  const baggage1Weight = Number.parseFloat(weights.baggage1) || 0
  const baggage2Weight = Number.parseFloat(weights.baggage2) || 0
  const fuelWeight = Number.parseFloat(weights.fuel) || 0

  // Calculate moments (weight × arm)
  const emptyMoment = aircraft.emptyWeight * aircraft.emptyArm
  const pilotMoment = pilotWeight * aircraft.stations.pilot
  const copilotMoment = copilotWeight * aircraft.stations.copilot
  const passenger1Moment = passenger1Weight * aircraft.stations.passenger1
  const passenger2Moment = passenger2Weight * aircraft.stations.passenger2
  const passenger3Moment = passenger3Weight * aircraft.stations.passenger3
  const passenger4Moment = passenger4Weight * aircraft.stations.passenger4
  const baggage1Moment = baggage1Weight * aircraft.stations.baggage1
  const baggage2Moment = baggage2Weight * aircraft.stations.baggage2
  const fuelMoment = fuelWeight * aircraft.stations.fuel

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

  // Calculate center of gravity
  const centerOfGravity = totalMoment / totalWeight

  // Check if within limits
  const isWeightOk = totalWeight <= aircraft.maxWeight
  const isCgOk = isPointInEnvelope(centerOfGravity, totalWeight, aircraft.cgEnvelope.points)
  
  return {
    totalWeight,
    totalMoment,
    centerOfGravity,
    isWeightOk,
    isCgOk,
    maxWeight: aircraft.maxWeight,
    cgLimits: aircraft.cgLimits,
    moments: {
      empty: emptyMoment,
      pilot: pilotMoment,
      copilot: copilotMoment,
      passenger1: passenger1Moment,
      passenger2: passenger2Moment,
      passenger3: passenger3Moment,
      passenger4: passenger4Moment,
      baggage1: baggage1Moment,
      baggage2: baggage2Moment,
      fuel: fuelMoment
    }
  }
}

/**
 * Validate safety conditions and generate warnings
 * @param {Object} aircraft - Aircraft data with safety factors
 * @param {number} totalWeight - Calculated total weight
 * @param {number} centerOfGravity - Calculated CG
 * @returns {Object} - Safety warnings and recommendations
 */
export function validateSafetyConditions(aircraft, totalWeight, centerOfGravity) {
  const safetyFactors = aircraft.safetyFactors
  const warnings = []
  const recommendations = []
  
  // Check weight near limit
  const weightPercentage = (totalWeight / aircraft.maxWeight) * 100
  if (weightPercentage > safetyFactors.weightMargin * 100) {
    warnings.push({
      type: "weight-warning",
      message: `Peso al ${weightPercentage.toFixed(1)}% del máximo permitido`,
      severity: "medium"
    })
  }
  
  // Check CG near limits
  const cgForwardMargin = centerOfGravity - aircraft.cgLimits.forward
  const cgAftMargin = aircraft.cgLimits.aft - centerOfGravity
  
  if (cgForwardMargin < safetyFactors.cgMargin) {
    warnings.push({
      type: "cg-forward-warning",
      message: `Centro de gravedad muy cerca del límite frontal (${cgForwardMargin.toFixed(2)}" de margen)`,
      severity: "high"
    })
  }
  
  if (cgAftMargin < safetyFactors.cgMargin) {
    warnings.push({
      type: "cg-aft-warning", 
      message: `Centro de gravedad muy cerca del límite posterior (${cgAftMargin.toFixed(2)}" de margen)`,
      severity: "high"
    })
  }
  
  // Safety recommendations
  if (totalWeight > aircraft.maxWeight - safetyFactors.recommendedReserve.weight) {
    recommendations.push({
      type: "weight-reserve",
      message: `Considerar reducir peso en ${(totalWeight - (aircraft.maxWeight - safetyFactors.recommendedReserve.weight)).toFixed(0)} lbs para mayor margen de seguridad`
    })
  }
  
  // Data reliability check
  const dataReliability = aircraft.metadata.dataReliability
  if (dataReliability !== "verified-complete") {
    warnings.push({
      type: "data-reliability",
      message: `Datos ${dataReliability === "verified-partial" ? "parcialmente verificados" : "estimados"} - confirmar con documentación oficial`,
      severity: "low"
    })
  }
  
  return {
    warnings,
    recommendations,
    weightPercentage: weightPercentage.toFixed(1),
    cgMargins: {
      forward: cgForwardMargin.toFixed(2),
      aft: cgAftMargin.toFixed(2)
    },
    dataReliability: aircraft.metadata.dataReliability
  }
}
