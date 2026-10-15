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
import { FuelBurnInput } from "./components/FuelBurnInput"
import { FlightPhasesPanel } from "./components/FlightPhasesPanel"
import { CustomAircraftManager } from "./components/CustomAircraftManager"
import { UnitToggle } from "./components/UnitToggle"
import { ShareButton } from "./components/ShareButton"
import { SharedCalculationNotice } from "./components/SharedCalculationNotice"
import { FleetShare } from "./components/FleetShare"
import { FleetImportDialog } from "./components/FleetImportDialog"
import { Footer } from "./components/Footer"
import { useFleetImport } from "./hooks/useFleetImport"
import { LoadSheetPanel } from "./components/LoadSheetPanel"
import { Plane, Calculator, RotateCcw } from "lucide-react"
import { aircraftData, aircraftOptions, emptyWeightsFor } from "./data/aircraft"
import {
  calculateWeightBalance,
  buildSafetyReport,
  calculateFlightPhases,
  buildLandingReport,
} from "./utils/calculations"
import { useLocalStorage } from "./hooks/useLocalStorage"
import { useCustomAircraft } from "./hooks/useCustomAircraft"
import { isCustomAircraftId } from "./utils/customAircraft"
import { useUnits } from "./hooks/useUnits"
import { useSharedCalculation } from "./hooks/useSharedCalculation"
import { buildShareUrl } from "./utils/shareLink"
import { messages as m, getLocale, setLocale, localeOptions } from "./i18n"

const DEFAULT_AIRCRAFT = "king-air-echo-90"

export default function App() {
  const custom = useCustomAircraft()
  const fleetImport = useFleetImport((records) => records.forEach((record) => custom.save(record)))
  const [selectedAircraft, setSelectedAircraft] = useLocalStorage(
    "wb-selected-aircraft",
    DEFAULT_AIRCRAFT,
    (value) => typeof value === "string" && (value in aircraftData || isCustomAircraftId(value))
  )
  const [weights, setWeights, resetWeights] = useLocalStorage(
    "wb-weights",
    emptyWeightsFor(aircraftData[DEFAULT_AIRCRAFT]),
    (value) => value !== null && typeof value === "object" && !Array.isArray(value)
  )

  const [units, setUnits] = useUnits()

  const [fuelBurn, setFuelBurn] = useLocalStorage(
    "wb-fuel-burn",
    "",
    (value) => typeof value === "string"
  )

  const shared = useSharedCalculation({
    records: custom.records,
    saveCustomAircraft: custom.save,
    setSelectedAircraft,
    setWeights,
    setFuelBurn,
    setUnits,
  })

  /** @param {string} id */
  const findAircraft = (id) =>
    aircraftData[id] ?? custom.customAircraft[id] ?? aircraftData[DEFAULT_AIRCRAFT]
  const aircraft = findAircraft(selectedAircraft)

  const handleWeightChange = (/** @type {string} */ field, /** @type {string} */ value) => {
    setWeights((prev) => ({ ...prev, [field]: value }))
  }

  const handleAircraftChange = (/** @type {string} */ value, next = findAircraft(value)) => {
    setSelectedAircraft(value)
    // las estaciones difieren entre aeronaves: empezar el cálculo de cero
    setWeights(emptyWeightsFor(next))
  }

  const results = calculateWeightBalance(aircraft, weights)
  const safetyChecks = results
    ? buildSafetyReport(aircraft, results.totalWeight, results.centerOfGravity)
    : null
  const phases = calculateFlightPhases(aircraft, weights, fuelBurn)
  const landingReport = phases ? buildLandingReport(aircraft, phases) : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 print:hidden">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-end gap-2">
          <UnitToggle units={units} onUnitsChange={setUnits} />
          <div className="w-44">
            <SimpleSelect
              id="locale"
              value={getLocale()}
              onValueChange={setLocale}
              options={localeOptions}
            />
          </div>
        </div>

        <SharedCalculationNotice status={shared.status} onDismiss={shared.dismiss} />

        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Plane className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">{m.app.title(aircraft.name)}</h1>
          </div>
          <p className="text-gray-600">{m.app.subtitle(aircraft.tcds)}</p>
        </div>

        <FleetImportDialog
          state={fleetImport}
          existingRegistrations={custom.records.map((r) => r.registration)}
          units={units}
          onImport={fleetImport.accept}
          onDismiss={fleetImport.dismiss}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                {m.app.aircraftCardTitle}
              </CardTitle>
              <CardDescription>{m.app.aircraftCardDescription}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="aircraft">{m.app.aircraftSelectLabel}</Label>
                <SimpleSelect
                  id="aircraft"
                  value={selectedAircraft}
                  onValueChange={handleAircraftChange}
                  placeholder={m.app.aircraftSelectPlaceholder}
                  options={[...aircraftOptions, ...custom.options]}
                />
              </div>

              <CustomAircraftManager
                units={units}
                records={custom.records}
                onSave={(input) => {
                  const result = custom.save(input)
                  if (result.id && result.aircraft) handleAircraftChange(result.id, result.aircraft)
                  return result
                }}
                onRemove={(id) => {
                  custom.remove(id)
                  if (id === selectedAircraft) handleAircraftChange(DEFAULT_AIRCRAFT)
                }}
              />

              <FleetShare records={custom.records} />

              <Separator />

              <StationForm
                aircraft={aircraft}
                weights={weights}
                onWeightChange={handleWeightChange}
                units={units}
              />

              <FuelBurnInput
                value={fuelBurn}
                onChange={setFuelBurn}
                fuelLoaded={phases?.fuelLoaded ?? 0}
                hasFuelStation={phases?.hasFuelStation ?? false}
                units={units}
              />

              <button
                type="button"
                onClick={resetWeights}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-md px-3 py-2 hover:bg-gray-50"
              >
                <RotateCcw className="h-4 w-4" />
                {m.app.clearWeights}
              </button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <CardTitle>{m.app.resultsCardTitle}</CardTitle>
                <ShareButton
                  title={m.share.shareTitle(aircraft.name)}
                  url={buildShareUrl(window.location.href, {
                    aircraftId: selectedAircraft,
                    weights,
                    fuelBurn,
                    units,
                    customRecords: custom.records,
                  })}
                />
              </div>
              <CardDescription>{m.app.resultsCardDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              {!aircraft ? (
                <div className="text-center py-8 text-gray-500">
                  <Plane className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>{m.app.noAircraftSelected}</p>
                </div>
              ) : results ? (
                <div className="space-y-4">
                  <AircraftInfo aircraft={aircraft} units={units} />

                  <Separator />

                  <ResultsPanel results={results} units={units} />

                  <Separator />

                  <SafetyAlerts safetyChecks={safetyChecks} units={units} />

                  <Separator />

                  <TakeoffVerdict results={results} />

                  <Separator />

                  {phases && landingReport && (
                    <FlightPhasesPanel phases={phases} report={landingReport} units={units} />
                  )}

                  <Separator />

                  <div className="space-y-3">
                    <h3 className="font-semibold text-center">{m.app.envelopeSectionTitle}</h3>
                    <CGEnvelopeChart
                      aircraft={aircraft}
                      currentCG={results.centerOfGravity}
                      currentWeight={results.totalWeight}
                      landingCG={phases?.fuelBurn ? phases.landing.centerOfGravity : undefined}
                      landingWeight={phases?.fuelBurn ? phases.landing.totalWeight : undefined}
                      zeroFuelCG={phases?.fuelLoaded ? phases.zeroFuel.centerOfGravity : undefined}
                      zeroFuelWeight={phases?.fuelLoaded ? phases.zeroFuel.totalWeight : undefined}
                      units={units}
                    />
                    <p className="text-xs text-gray-500 text-center">{m.app.envelopeCaption}</p>
                  </div>

                  <LoadSheetPanel
                    aircraft={aircraft}
                    weights={weights}
                    results={results}
                    safetyChecks={safetyChecks}
                    phases={phases}
                    landingReport={landingReport}
                    units={units}
                  />

                  <DataSources aircraft={aircraft} />
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    </div>
  )
}
