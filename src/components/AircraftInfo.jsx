import { Badge } from "./Badge"
import { messages as m } from "../i18n"

/**
 * Aircraft summary box: name, TCDS, key weights, CG limits and metadata
 * (production, engines, data reliability badge).
 * @param {Object} props
 * @param {Object} props.aircraft - Aircraft data entry
 */
export function AircraftInfo({ aircraft }) {
  const { metadata } = aircraft

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-semibold mb-2">{aircraft.name}</h3>
      <div className="text-sm text-gray-600 space-y-1">
        <p className="font-medium text-blue-700">{aircraft.tcds}</p>
        <p>{m.aircraftInfo.emptyWeight(aircraft.emptyWeight)}</p>
        <p>{m.aircraftInfo.maxWeight(aircraft.maxWeight)}</p>
        <p>{m.aircraftInfo.cgLimits(aircraft.cgLimits.forward, aircraft.cgLimits.aft)}</p>

        {metadata && (
          <div className="mt-3 pt-3 border-t border-gray-300">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium">{m.aircraftInfo.production}</span>
              <span className="text-xs">
                {m.aircraftInfo.productionDetail(metadata.productionYears, metadata.totalProduced)}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium">{m.aircraftInfo.engines}</span>
              <span className="text-xs">{metadata.engines}</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium">{m.aircraftInfo.manufacturer}</span>
              <span className="text-xs">{metadata.manufacturer.split("(")[0]}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium">{m.aircraftInfo.dataReliability}</span>
              <Badge
                variant={
                  metadata.dataReliability === "verified-complete"
                    ? "default"
                    : metadata.dataReliability === "verified-partial"
                      ? "secondary"
                      : "outline"
                }
                className="text-xs"
              >
                {metadata.dataReliability === "verified-complete"
                  ? m.aircraftInfo.reliabilityVerified
                  : metadata.dataReliability === "verified-partial"
                    ? m.aircraftInfo.reliabilityPartial
                    : m.aircraftInfo.reliabilityEstimated}
              </Badge>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
