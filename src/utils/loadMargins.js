/**
 * Room left in a loading: payload still available and how much fuel can be
 * added before the first limit is reached (tank capacity, max takeoff / ramp /
 * landing weight or the CG envelope).
 */
import {
  buildRampIssues,
  calculateFlightPhases,
  getFuelStationKeys,
  parseStationWeight,
} from "./calculations"

/** Weights this close (lbs) to a limit still count as within it. */
const WEIGHT_TOLERANCE_LBS = 1e-6
const BISECTION_STEPS = 40

/**
 * Whether takeoff and landing meet every weight and envelope limit.
 * @param {import('../types').Aircraft} aircraft
 * @param {import('../types').FlightPhasesResult} phases
 */
function withinLimits(aircraft, phases) {
  const { ramp, takeoff, landing } = phases
  return (
    takeoff.totalWeight <= aircraft.maxWeight + WEIGHT_TOLERANCE_LBS &&
    takeoff.inEnvelope &&
    landing.inEnvelope &&
    (aircraft.maxRampWeight === undefined ||
      ramp.totalWeight <= aircraft.maxRampWeight + WEIGHT_TOLERANCE_LBS) &&
    (aircraft.maxLandingWeight === undefined ||
      landing.totalWeight <= aircraft.maxLandingWeight + WEIGHT_TOLERANCE_LBS)
  )
}

/**
 * @param {import('../types').Aircraft} aircraft
 * @param {import('../types').StationWeights} weights - Ramp station weights (raw strings, lbs)
 * @param {number | string} [fuelBurn] - Planned fuel burn (lbs)
 * @param {number | string} [taxiFuel] - Start and taxi fuel (lbs)
 * @returns {import('../types').LoadMargins | null}
 */
export function buildLoadMargins(aircraft, weights, fuelBurn = 0, taxiFuel = 0) {
  const phases = calculateFlightPhases(aircraft, weights, fuelBurn, taxiFuel)
  if (!phases) return null

  /** @type {import('../types').LoadMargins} */
  const margins = {
    payloadAvailable: aircraft.maxWeight - phases.takeoff.totalWeight,
    extraFuel: null,
    fuelAtLanding: phases.fuelLoaded - phases.fuelBurn,
    hasFuelStation: phases.hasFuelStation,
  }

  const fuelKeys = getFuelStationKeys(aircraft)
  const currentOk =
    withinLimits(aircraft, phases) &&
    !phases.burnExceedsFuel &&
    buildRampIssues(aircraft, phases, weights).length === 0
  if (fuelKeys.length === 0 || !currentOk) return margins

  // Room in each tank; unknown (Infinity) when the station declares no maximum
  const room = fuelKeys.map((key) => {
    const max = aircraft.loadStations.find((station) => station.key === key)?.max
    return max === undefined ? Infinity : Math.max(0, max - parseStationWeight(weights[key]))
  })
  const tankRoom = room.reduce((sum, value) => sum + value, 0)
  // Extra fuel fills the tanks in proportion to their room (evenly when unknown)
  const shares = room.map((value) =>
    Number.isFinite(tankRoom) ? (tankRoom > 0 ? value / tankRoom : 0) : 1 / fuelKeys.length
  )

  /** @type {{ amount: number, limitedBy: import('../types').FuelLimit }[]} */
  const caps = [
    { amount: tankRoom, limitedBy: "tank" },
    { amount: aircraft.maxWeight - phases.takeoff.totalWeight, limitedBy: "weight" },
  ]
  if (aircraft.maxRampWeight !== undefined) {
    caps.push({ amount: aircraft.maxRampWeight - phases.ramp.totalWeight, limitedBy: "ramp" })
  }
  if (aircraft.maxLandingWeight !== undefined) {
    caps.push({
      amount: aircraft.maxLandingWeight - phases.landing.totalWeight,
      limitedBy: "landing",
    })
  }
  const cap = caps.reduce((lowest, next) => (next.amount < lowest.amount ? next : lowest))
  if (cap.amount <= WEIGHT_TOLERANCE_LBS) {
    margins.extraFuel = { amount: 0, limitedBy: cap.limitedBy }
    return margins
  }

  const fitsWith = (/** @type {number} */ extra) => {
    const loaded = { ...weights }
    fuelKeys.forEach((key, index) => {
      loaded[key] = String(parseStationWeight(weights[key]) + extra * shares[index])
    })
    const next = calculateFlightPhases(aircraft, loaded, fuelBurn, taxiFuel)
    return next !== null && withinLimits(aircraft, next)
  }

  if (fitsWith(cap.amount)) {
    margins.extraFuel = cap
    return margins
  }
  // The weight caps allow more than the envelope does: find where the CG
  // leaves it. `low` always fits, so the result never overstates the room.
  let low = 0
  let high = cap.amount
  for (let step = 0; step < BISECTION_STEPS; step++) {
    const middle = (low + high) / 2
    if (fitsWith(middle)) low = middle
    else high = middle
  }
  margins.extraFuel = { amount: low, limitedBy: "envelope" }
  return margins
}
