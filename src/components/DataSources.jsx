/**
 * Official references and data sources panel: last update, verified sources,
 * pending verification items and the aircraft-specific data warning.
 * @param {Object} props
 * @param {Object} props.aircraft - Aircraft data entry (uses metadata, dataValidation)
 */
import { messages as m } from "../i18n"

export function DataSources({ aircraft }) {
  const { metadata, dataValidation } = aircraft
  if (!dataValidation) return null

  return (
    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h4 className="font-medium text-sm text-blue-900 mb-2">{m.dataSources.title}</h4>
      <div className="space-y-2 text-xs text-blue-800">
        <div>
          <span className="font-medium">{m.dataSources.lastUpdated}</span>
          <span className="ml-1">{dataValidation.lastUpdated}</span>
        </div>
        <div>
          <span className="font-medium">{m.dataSources.verifiedSources}</span>
          <div className="mt-1">
            {metadata.sourceDocuments.map((doc, index) => (
              <div key={index} className="ml-2">
                • {doc}
              </div>
            ))}
          </div>
        </div>
        {dataValidation.pendingVerification.length > 0 && (
          <div>
            <span className="font-medium text-orange-800">{m.dataSources.pendingVerification}</span>
            <div className="mt-1 text-orange-700">
              {dataValidation.pendingVerification.map((item, index) => (
                <div key={index} className="ml-2">
                  • {item}
                </div>
              ))}
            </div>
          </div>
        )}
        {metadata.aircraftSpecific && (
          <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
            <div className="font-bold text-yellow-800 mb-1">
              {m.dataSources.aircraftSpecificTitle}
            </div>
            <div className="text-yellow-700">
              <div className="mb-1">
                <strong>{m.dataSources.basedOn}</strong>{" "}
                {metadata.aircraftSpecific.registrationExample} (S/N:{" "}
                {metadata.aircraftSpecific.serialNumber})
              </div>
              <div className="text-xs">{metadata.aircraftSpecific.warning}</div>
            </div>
          </div>
        )}

        <div className="mt-3 text-xs text-blue-600">
          <strong>{m.dataSources.disclaimerLabel}</strong> {m.dataSources.disclaimer}
        </div>
      </div>
    </div>
  )
}
