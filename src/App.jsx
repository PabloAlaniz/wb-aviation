import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/Card"
import { SimpleSelect } from "./components/Select"
import { Label } from "./components/Input"
import { Separator } from "./components/Separator"
import { CGEnvelopeChart } from "./components/CGEnvelopeChart"
import { StationForm } from "./components/StationForm"
import { AircraftInfo } from "./components/AircraftInfo"
import { ResultsPanel, TakeoffVerdict } from "./components/ResultsPanel"
import { SafetyAlerts } from "./components/SafetyAlerts"
import { DataSources } from "./components/DataSources"
import { Plane, Calculator, RotateCcw } from "lucide-react"
import { aircraftData, aircraftOptions, emptyWeightsFor } from "./data/aircraft"
import { calculateWeightBalance, buildSafetyReport } from "./utils/calculations"
import { useLocalStorage } from "./hooks/useLocalStorage"

const DEFAULT_AIRCRAFT = "king-air-echo-90"

export default function App() {
  const [selectedAircraft, setSelectedAircraft] = useLocalStorage(
    "wb-selected-aircraft",
    DEFAULT_AIRCRAFT,
    (value) => typeof value === "string" && value in aircraftData
  )
  const [weights, setWeights, resetWeights] = useLocalStorage(
    "wb-weights",
    emptyWeightsFor(aircraftData[DEFAULT_AIRCRAFT]),
    (value) => value !== null && typeof value === "object" && !Array.isArray(value)
  )

  const aircraft = aircraftData[selectedAircraft]

  const handleWeightChange = (field, value) => {
    setWeights((prev) => ({ ...prev, [field]: value }))
  }

  const results = calculateWeightBalance(aircraft, weights)
  const safetyChecks = results
    ? buildSafetyReport(aircraft, results.totalWeight, results.centerOfGravity)
    : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Plane className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">{aircraft.name} - Peso y Centrado</h1>
          </div>
          <p className="text-gray-600">Cálculo de peso y centrado basado en {aircraft.tcds}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Datos de la Aeronave
              </CardTitle>
              <CardDescription>Selecciona el tipo de avión e ingresa los pesos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="aircraft">Tipo de Aeronave</Label>
                <SimpleSelect
                  value={selectedAircraft}
                  onValueChange={setSelectedAircraft}
                  placeholder="Selecciona una aeronave"
                  options={aircraftOptions}
                />
              </div>

              <Separator />

              <StationForm
                aircraft={aircraft}
                weights={weights}
                onWeightChange={handleWeightChange}
              />

              <button
                type="button"
                onClick={resetWeights}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-md px-3 py-2 hover:bg-gray-50"
              >
                <RotateCcw className="h-4 w-4" />
                Limpiar pesos
              </button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resultados del Cálculo</CardTitle>
              <CardDescription>Peso total y centro de gravedad</CardDescription>
            </CardHeader>
            <CardContent>
              {!aircraft ? (
                <div className="text-center py-8 text-gray-500">
                  <Plane className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Selecciona una aeronave para ver los resultados</p>
                </div>
              ) : results ? (
                <div className="space-y-4">
                  <AircraftInfo aircraft={aircraft} />

                  <Separator />

                  <ResultsPanel results={results} />

                  <Separator />

                  <SafetyAlerts safetyChecks={safetyChecks} />

                  <Separator />

                  <TakeoffVerdict results={results} />

                  <Separator />

                  <div className="space-y-3">
                    <h3 className="font-semibold text-center">Envolvente de Centro de Gravedad</h3>
                    <CGEnvelopeChart
                      aircraft={aircraft}
                      currentCG={results.centerOfGravity}
                      currentWeight={results.totalWeight}
                    />
                    <p className="text-xs text-gray-500 text-center">
                      El punto negro muestra la condición actual de peso y CG. Las líneas punteadas
                      indican las coordenadas exactas. La aeronave está segura para operar solo si
                      el punto está dentro del área sombreada.
                    </p>
                  </div>

                  <DataSources aircraft={aircraft} />
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
