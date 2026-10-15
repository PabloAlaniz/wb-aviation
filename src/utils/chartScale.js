/**
 * "Nice" axis scales for charts: tick steps of 1, 2 or 5 × 10^n and a
 * domain aligned to them, so axes read 850, 900, 950… instead of the raw
 * converted values (e.g. 3657 mm or 2721 kg).
 */

/**
 * Round a positive step to the closest 1, 2 or 5 × 10^n.
 * @param {number} rawStep
 * @returns {number}
 */
export function niceStep(rawStep) {
  if (!(rawStep > 0) || !Number.isFinite(rawStep)) return 1
  const exponent = Math.floor(Math.log10(rawStep))
  const magnitude = 10 ** exponent
  const fraction = rawStep / magnitude
  const nice = fraction < 1.5 ? 1 : fraction < 3 ? 2 : fraction < 7 ? 5 : 10
  return snap(nice * magnitude, magnitude)
}

/**
 * Remove floating point noise (e.g. 0.30000000000000004) from a value that
 * is a multiple of `step`.
 * @param {number} value
 * @param {number} step
 */
function snap(value, step) {
  const decimals = Math.min(20, Math.max(0, -Math.floor(Math.log10(step))))
  return Number(value.toFixed(decimals))
}

/**
 * Compute nice ticks covering [min, max] with roughly `count` ticks.
 * The returned domain starts and ends on a tick, so it always contains
 * [min, max].
 * @param {number} min
 * @param {number} max
 * @param {number} [count] - desired number of ticks (approximate, >= 2)
 * @returns {{ domain: [number, number], ticks: number[], step: number }}
 */
export function niceTicks(min, max, count = 6) {
  let lo = Math.min(min, max)
  let hi = Math.max(min, max)
  if (lo === hi) {
    // Degenerate range: open a window around the single value
    const pad = lo === 0 ? 1 : Math.abs(lo) * 0.1
    lo -= pad
    hi += pad
  }
  const step = niceStep((hi - lo) / Math.max(1, count - 1))
  const start = snap(Math.floor(lo / step) * step, step)
  const end = snap(Math.ceil(hi / step) * step, step)
  /** @type {number[]} */
  const ticks = []
  const n = Math.round((end - start) / step)
  for (let i = 0; i <= n; i++) ticks.push(snap(start + i * step, step))
  return { domain: [start, end], ticks, step }
}

/**
 * Nice scale for a set of data values, with a small padding (fraction of
 * the data range) on both sides so points never sit on the plot border.
 * Non-finite values are ignored.
 * @param {number[]} values
 * @param {{ count?: number, padding?: number }} [options]
 */
export function niceScale(values, { count = 6, padding = 0.03 } = {}) {
  const finite = values.filter(Number.isFinite)
  if (finite.length === 0) return niceTicks(0, 1, count)
  const min = Math.min(...finite)
  const max = Math.max(...finite)
  const pad = (max - min) * padding
  return niceTicks(min - pad, max + pad, count)
}
