import { AlertTriangle, CheckCircle } from "lucide-react"
import { Badge } from "./Badge"
import { messages as m } from "../i18n"

/**
 * Total weight / CG rows with OK / out-of-limits badges, plus the final
 * takeoff verdict box.
 * @param {Object} props
 * @param {Object} props.results - Results from calculateWeightBalance()
 */
export function ResultsPanel({ results }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="font-medium">{m.results.totalWeight}</span>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">{results.totalWeight.toFixed(1)} lbs</span>
          {results.isWeightOk ? (
            <Badge variant="default" className="bg-green-500">
              <CheckCircle className="h-3 w-3 mr-1" />
              {m.results.ok}
            </Badge>
          ) : (
            <Badge variant="destructive">
              <AlertTriangle className="h-3 w-3 mr-1" />
              {m.results.overweight}
            </Badge>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="font-medium">{m.results.centerOfGravity}</span>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">{results.centerOfGravity.toFixed(2)}"</span>
          {results.isCgOk ? (
            <Badge variant="default" className="bg-green-500">
              <CheckCircle className="h-3 w-3 mr-1" />
              {m.results.ok}
            </Badge>
          ) : (
            <Badge variant="destructive">
              <AlertTriangle className="h-3 w-3 mr-1" />
              {m.results.cgOutOfLimits}
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * Final go / no-go verdict box based on weight and CG checks.
 * @param {Object} props
 * @param {Object} props.results - Results from calculateWeightBalance()
 */
export function TakeoffVerdict({ results }) {
  return (
    <div className="text-center" role="status">
      {results.isWeightOk && results.isCgOk ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <p className="text-green-800 font-semibold">{m.results.readyForTakeoff}</p>
          <p className="text-green-600 text-sm mt-1">{m.results.readyDetail}</p>
        </div>
      ) : (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
          <p className="text-red-800 font-semibold">{m.results.notFitForTakeoff}</p>
          <p className="text-red-600 text-sm mt-1">
            {!results.isWeightOk && m.results.overweightDetail}
            {!results.isCgOk && m.results.cgOutDetail}
          </p>
        </div>
      )}
    </div>
  )
}
