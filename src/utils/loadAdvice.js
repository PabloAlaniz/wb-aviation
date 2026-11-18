/**
 * What to change when the takeoff is out of limits: by how much the weight or
 * the CG is off, and the smallest single change to baggage, cargo or fuel
 * that brings the takeoff back inside the envelope.
 *
 * Seats are left alone (people are not divisible); only stations that are not
 * seats are adjusted. Every option is found on the takeoff weight and moment
 * and then confirmed with the full flight-phase calculation.
 */
import {
  buildRampIssues,
  calculateFlightPhases,
  envelopeCgRangeAt,
  getFuelStationKeys,
  isPointInEnvelope,
  parseStationWeight,
} from "./calculations"
import { seatKind } from "./standardWeights"

/** Weights this close (lbs) to a limit still count as within it. */
const WEIGHT_TOLERANCE_LBS = 1e-6
/** Options returned, smallest change first. */
export const MAX_ADVICE_OPTIONS = 3

/**
 * @typedef {{ kind: "remove" | "add", station: string, amount: number }
 *   | { kind: "move", from: string, to: string, amount: number }} LoadAdviceOption
 *
 * @typedef {{
 *   overweightBy: number | null,
 *   cgForwardBy: number | null,
 *   cgAftBy: number | null,
 *   options: LoadAdviceOption[],
 * }} LoadAdvice - weights in lbs, CG distances in inches
 */

/**
 * @param {import('../types').Aircraft} aircraft
 * @param {import('../types').StationWeights} weights - Ramp station weights (raw strings, lbs)
 * @param {number | string} [fuelBurn] - Planned fuel burn (lbs)
 * @param {number | string} [taxiFuel] - Start and taxi fuel (lbs)
 * @param {number} [stepLbs] - Granularity of the suggested amounts (1 lb, or
 *   1 kg in lbs so metric users get whole kilograms)
 * @returns {LoadAdvice | null} null when the takeoff is within limits (or the
 *   aircraft is lighter than the bottom of its envelope)
 */
export function buildLoadAdvice(aircraft, weights, fuelBurn = 0, taxiFuel = 0, stepLbs = 1) {
  const phases = calculateFlightPhases(aircraft, weights, fuelBurn, taxiFuel)
  const points = aircraft.cgEnvelope?.points ?? []
  if (!phases || points.length < 3) return null

  const { totalWeight, totalMoment, centerOfGravity } = phases.takeoff
  const overweight = totalWeight > aircraft.maxWeight + WEIGHT_TOLERANCE_LBS
  if (!overweight && phases.takeoff.inEnvelope) return null
  if (totalWeight < Math.min(...points.map((point) => point.weight))) return null

  const range = overweight ? null : envelopeCgRangeAt(points, totalWeight)
  /** @type {LoadAdvice} */
  const advice = {
    overweightBy: overweight ? totalWeight - aircraft.maxWeight : null,
    cgForwardBy: range && centerOfGravity < range.forward ? range.forward - centerOfGravity : null,
    cgAftBy: range && centerOfGravity > range.aft ? centerOfGravity - range.aft : null,
    options: [],
  }

  const fuelKeys = getFuelStationKeys(aircraft)
  const adjustable = aircraft.loadStations
    .filter(
      (station) => typeof aircraft.stations[station.key] === "number" && seatKind(station) === null
    )
    .map((station) => {
      const load = parseStationWeight(weights[station.key])
      return {
        key: station.key,
        arm: /** @type {number} */ (aircraft.stations[station.key]),
        load,
        room: station.max === undefined ? Infinity : Math.max(0, station.max - load),
        isFuel: fuelKeys.includes(station.key),
      }
    })
  // Fuel that can go without leaving less than the planned taxi and burn
  const spareFuel = Math.max(0, phases.rampFuel - phases.requestedTaxiFuel - phases.requestedBurn)
  const weightRoom = aircraft.maxWeight - totalWeight

  /**
   * Smallest multiple of the step, up to `bound`, that puts the takeoff
   * point inside the envelope and within the max weight.
   * @param {number} bound - lbs
   * @param {number} weightPerLb - change in takeoff weight per lb
   * @param {number} momentPerLb - change in takeoff moment per lb
   * @returns {number | null}
   */
  const smallestFix = (bound, weightPerLb, momentPerLb) => {
    for (let amount = stepLbs; amount <= bound + WEIGHT_TOLERANCE_LBS; amount += stepLbs) {
      const weight = totalWeight + amount * weightPerLb
      if (weight > aircraft.maxWeight + WEIGHT_TOLERANCE_LBS) continue
      const moment = totalMoment + amount * momentPerLb
      if (isPointInEnvelope(moment / weight, weight, points)) return amount
    }
    return null
  }

  /** @type {LoadAdviceOption[]} */
  const candidates = []
  for (const station of adjustable) {
    const removable = station.isFuel ? Math.min(station.load, spareFuel) : station.load
    const removed = smallestFix(removable, -1, -station.arm)
    if (removed !== null) candidates.push({ kind: "remove", station: station.key, amount: removed })

    if (!overweight) {
      const added = smallestFix(Math.min(station.room, weightRoom), 1, station.arm)
      if (added !== null) candidates.push({ kind: "add", station: station.key, amount: added })
    }
    if (station.isFuel) continue
    for (const target of adjustable) {
      if (target.isFuel || target.key === station.key || target.arm === station.arm) continue
      const moved = smallestFix(Math.min(station.load, target.room), 0, target.arm - station.arm)
      if (moved !== null) {
        candidates.push({ kind: "move", from: station.key, to: target.key, amount: moved })
      }
    }
  }

  // Confirm each option with the real calculation (taxi fuel, ramp weight,
  // station maximums) before offering it
  const confirmed = candidates.filter((option) => {
    const changed = { ...weights }
    const shift = (/** @type {string} */ key, /** @type {number} */ delta) => {
      changed[key] = String(Math.max(0, parseStationWeight(weights[key]) + delta))
    }
    if (option.kind === "move") {
      shift(option.from, -option.amount)
      shift(option.to, option.amount)
    } else {
      shift(option.station, option.kind === "add" ? option.amount : -option.amount)
    }
    const next = calculateFlightPhases(aircraft, changed, fuelBurn, taxiFuel)
    return (
      next !== null &&
      next.takeoff.inEnvelope &&
      next.takeoff.totalWeight <= aircraft.maxWeight + WEIGHT_TOLERANCE_LBS &&
      !next.burnExceedsFuel &&
      buildRampIssues(aircraft, next, changed).length === 0
    )
  })

  advice.options = confirmed.sort((a, b) => a.amount - b.amount).slice(0, MAX_ADVICE_OPTIONS)
  return advice
}
