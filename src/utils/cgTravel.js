/**
 * CG travel: how the centre of gravity moves while the aircraft is loaded
 * (station by station, from empty weight to takeoff) and while fuel burns in
 * flight (takeoff → landing → zero fuel). Drawn over the envelope so a pilot
 * sees which item pushes the CG towards a limit.
 *
 * Pure functions; weights in lbs and arms in inches, like the calculations.
 */
import { burnPoint, calculateCG, calculateMoment, parseStationWeight } from "./calculations"

/** Segments drawn for each stretch of the burn curve. */
const BURN_CURVE_STEPS = 16

/**
 * @typedef {{ weight: number, cg: number }} TravelPoint
 * @typedef {TravelPoint & {
 *   key: string,
 *   station?: import("../types").LoadStation,
 *   added: number,
 * }} LoadingStep - `key` is "empty" for the first point, then the station
 *   key; `added` is the load of that station (lbs)
 */

/**
 * Cumulative weight and CG from the empty aircraft through every loaded
 * station, in the order of the load form. The last point is the condition
 * computed by calculateWeightBalance for the same weights.
 * @param {import("../types").Aircraft} aircraft
 * @param {import("../types").StationWeights} weights - e.g. takeoff weights
 * @returns {LoadingStep[]}
 */
export function buildLoadingPath(aircraft, weights) {
  let weight = aircraft.emptyWeight
  let moment = calculateMoment(aircraft.emptyWeight, aircraft.emptyArm)
  /** @type {LoadingStep[]} */
  const path = [{ key: "empty", added: 0, weight, cg: calculateCG(moment, weight) }]

  const formStations = aircraft.loadStations.filter(
    (s) => typeof aircraft.stations[s.key] === "number"
  )
  const formKeys = new Set(formStations.map((s) => s.key))
  // stations without a form row still count in the totals: keep them in
  const others = Object.keys(aircraft.stations)
    .filter((key) => typeof aircraft.stations[key] === "number" && !formKeys.has(key))
    .map((key) => /** @type {import("../types").LoadStation} */ ({ key }))

  for (const station of [...formStations, ...others]) {
    const added = parseStationWeight(weights[station.key])
    if (added <= 0) continue
    weight += added
    moment += calculateMoment(added, /** @type {number} */ (aircraft.stations[station.key]))
    path.push({ key: station.key, station, added, weight, cg: calculateCG(moment, weight) })
  }
  return path
}

/**
 * The burn curve between two amounts of fuel burned (lbs since takeoff).
 * @param {import("../types").FlightPhasesResult} phases
 * @param {number} from
 * @param {number} to
 * @param {number} [steps]
 * @returns {TravelPoint[]} empty when there is nothing to burn in between
 */
export function sampleBurnPath(phases, from, to, steps = BURN_CURVE_STEPS) {
  if (!(to > from)) return []
  /** @type {TravelPoint[]} */
  const points = []
  for (let i = 0; i <= steps; i++) {
    const { weight, cg } = burnPoint(phases, from + ((to - from) * i) / steps)
    points.push({ weight, cg })
  }
  return points
}

/**
 * Everything the envelope chart draws besides the envelope itself.
 * @param {import("../types").Aircraft} aircraft
 * @param {import("../types").StationWeights} takeoffWeights - station weights
 *   at takeoff (ramp load minus taxi fuel)
 * @param {import("../types").FlightPhasesResult | null} phases
 * @returns {{
 *   loading: LoadingStep[],
 *   burn: TravelPoint[],
 *   reserve: TravelPoint[],
 * }} `burn`: takeoff → landing; `reserve`: landing → zero fuel
 */
export function buildCgTravel(aircraft, takeoffWeights, phases) {
  return {
    loading: buildLoadingPath(aircraft, takeoffWeights),
    burn: phases ? sampleBurnPath(phases, 0, phases.fuelBurn) : [],
    reserve: phases ? sampleBurnPath(phases, phases.fuelBurn, phases.fuelLoaded) : [],
  }
}
