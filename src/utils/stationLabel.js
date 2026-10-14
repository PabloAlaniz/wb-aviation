/**
 * Resolve the display name of a load station (without units).
 * Looks up `station.labelKey` (e.g. "stations.pilot") in the given messages
 * catalog and falls back to the raw `station.label`, then to the key, so
 * custom/unknown stations still render.
 * @param {import("../types").LoadStation} station
 * @param {Record<string, unknown>} catalog - active i18n messages
 * @returns {string}
 */
export function resolveStationLabel(station, catalog) {
  if (station.labelKey) {
    /** @type {unknown} */
    let node = catalog
    for (const part of station.labelKey.split(".")) {
      node =
        node !== null && typeof node === "object"
          ? /** @type {Record<string, unknown>} */ (node)[part]
          : undefined
    }
    if (typeof node === "string" && node) return node
  }
  return station.label || station.key
}
