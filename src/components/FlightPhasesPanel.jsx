import { AlertTriangle, CheckCircle } from "lucide-react"
import { Badge } from "./Badge"
import { messages as m } from "../i18n"

/**
 * Takeoff / landing / zero-fuel table plus the landing verdict.
 * @param {{
 *   phases: import("../types").FlightPhasesResult,
 *   report: import("../types").LandingReport,
 * }} props
 */
export function FlightPhasesPanel({ phases, report }) {
  const fp = m.flightPhases
  const rows = [
    { key: "takeoff", label: fp.takeoff, phase: phases.takeoff },
    { key: "landing", label: fp.landing, phase: phases.landing },
    { key: "zeroFuel", label: fp.zeroFuel, phase: phases.zeroFuel },
  ]

  return (
    <div className="space-y-3">
      <h3 className="font-semibold">{fp.title}</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th className="font-medium py-1">{fp.phase}</th>
            <th className="font-medium py-1 text-right">{fp.weight}</th>
            <th className="font-medium py-1 text-right">{fp.cg}</th>
            <th className="font-medium py-1 text-right">{fp.status}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ key, label, phase }) => (
            <tr key={key} data-testid={`phase-${key}`} className="border-t border-gray-100">
              <td className="py-1">{label}</td>
              <td className="py-1 text-right font-mono">
                {phase.totalWeight.toFixed(1)} <span className="text-gray-500">lbs</span>
              </td>
              <td className="py-1 text-right font-mono">
                {phase.centerOfGravity.toFixed(2)}
                <span className="text-gray-500">"</span>
              </td>
              <td className="py-1 text-right">
                {phase.inEnvelope ? (
                  <Badge variant="default" className="bg-green-500">
                    {fp.inEnvelope}
                  </Badge>
                ) : (
                  <Badge variant="destructive">{fp.outOfEnvelope}</Badge>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <LandingVerdict report={report} />
    </div>
  )
}

/**
 * Go / no-go verdict for the landing condition, listing every issue found.
 * @param {{ report: import("../types").LandingReport }} props
 */
export function LandingVerdict({ report }) {
  const fp = m.flightPhases
  return (
    <div className="space-y-2" role="status" aria-label={fp.landing}>
      {report.isLandingOk ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
          <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-1" />
          <p className="text-green-800 font-semibold">{fp.readyForLanding}</p>
          <p className="text-green-600 text-sm mt-1">{fp.landingOkDetail}</p>
        </div>
      ) : (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <AlertTriangle className="h-6 w-6 text-red-600 mx-auto mb-1" />
          <p className="text-red-800 font-semibold text-center">{fp.notFitForLanding}</p>
          <ul className="text-red-600 text-sm mt-1 list-disc pl-5">
            {report.errors.map((issue) => (
              <li key={issue.type}>{issue.message}</li>
            ))}
          </ul>
        </div>
      )}
      {report.warnings.length > 0 && (
        <ul className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-yellow-800 text-sm list-disc pl-8">
          {report.warnings.map((issue) => (
            <li key={issue.type}>{issue.message}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
