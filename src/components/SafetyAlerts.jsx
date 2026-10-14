import { AlertTriangle, CheckCircle } from "lucide-react"
import { messages as m } from "../i18n"
import { formatCgMargin, localizeSafetyMessage } from "../utils/safetyDisplay"

/**
 * Safety warnings, recommendations and margin summary for the current
 * calculation. Renders nothing when there is nothing to alert about.
 * @param {{
 *   safetyChecks: import("../types").SafetyReport | null,
 *   units?: import("../types").UnitSystem,
 * }} props
 */
export function SafetyAlerts({ safetyChecks, units = "imperial" }) {
  if (
    !safetyChecks ||
    (safetyChecks.warnings.length === 0 && safetyChecks.recommendations.length === 0)
  ) {
    return null
  }

  return (
    <div className="space-y-3" role="alert">
      <h4 className="font-medium text-sm">{m.safety.title}</h4>

      {safetyChecks.warnings.map((warning, index) => (
        <div
          key={index}
          className={`p-3 rounded-lg border ${
            warning.severity === "high"
              ? "bg-red-50 border-red-200 text-red-800"
              : warning.severity === "medium"
                ? "bg-yellow-50 border-yellow-200 text-yellow-800"
                : "bg-blue-50 border-blue-200 text-blue-800"
          }`}
        >
          <div className="flex items-start gap-2">
            <AlertTriangle
              className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                warning.severity === "high"
                  ? "text-red-600"
                  : warning.severity === "medium"
                    ? "text-yellow-600"
                    : "text-blue-600"
              }`}
            />
            <p className="text-sm">{localizeSafetyMessage(warning, safetyChecks, units)}</p>
          </div>
        </div>
      ))}

      {safetyChecks.recommendations.map((rec, index) => (
        <div key={index} className="p-3 rounded-lg border bg-gray-50 border-gray-200">
          <div className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-gray-600" />
            <p className="text-sm text-gray-800">
              {localizeSafetyMessage(rec, safetyChecks, units)}
            </p>
          </div>
        </div>
      ))}

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded">
          <span className="font-medium">{m.safety.weightUsage}</span>
          <span className="ml-1">{safetyChecks.weightPercentage}%</span>
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <span className="font-medium">{m.safety.cgMargin}</span>
          <span className="ml-1">
            +{formatCgMargin(safetyChecks.cgMargins.forward, units)} / -
            {formatCgMargin(safetyChecks.cgMargins.aft, units)}
          </span>
        </div>
      </div>
    </div>
  )
}
