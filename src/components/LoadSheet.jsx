import { CGEnvelopeChart } from "./CGEnvelopeChart"
import { messages as m } from "../i18n"
import { resolveStationLabel } from "../utils/stationLabel"
import { localizeLandingIssue, localizeSafetyMessage } from "../utils/safetyDisplay"
import { buildRampIssues } from "../utils/calculations"
import { APP_URL, buildLoadSheetRows } from "../utils/loadSheet"
import { armToDisplay, momentToDisplay, unitSymbols, weightToDisplay } from "../utils/units"

/**
 * Chart size for print: half the printable width of A4 and Letter (12 mm
 * margins), beside the loading table, and tall enough that the envelope keeps
 * its shape instead of flattening.
 */
const PRINT_CHART_SIZE = { width: 330, height: 330 }

/**
 * Printable load sheet (hoja de carga), modeled on a typical weight and
 * balance form: flight header, stations table, flight phases, limits,
 * warnings, envelope chart, data sources and the pilot's signature.
 * Plain black-on-white markup meant for the browser's print dialog.
 * @param {{
 *   aircraft: import("../types").Aircraft,
 *   weights: import("../types").StationWeights,
 *   results: import("../types").WeightBalanceResult,
 *   safetyChecks: import("../types").SafetyReport | null,
 *   phases: import("../types").FlightPhasesResult | null,
 *   landingReport: import("../types").LandingReport | null,
 *   details: import("../utils/loadSheet").LoadSheetDetails,
 *   units?: import("../types").UnitSystem,
 * }} props
 */
export function LoadSheet({
  aircraft,
  weights,
  results,
  safetyChecks,
  phases,
  landingReport,
  details,
  units = "imperial",
}) {
  const ls = m.loadSheet
  const symbols = unitSymbols(units)
  const metric = units === "metric"
  const weight = (/** @type {number} */ lbs) => weightToDisplay(lbs, units).toFixed(1)
  const arm = (/** @type {number} */ inches) => armToDisplay(inches, units).toFixed(metric ? 1 : 2)
  const moment = (/** @type {number} */ lbIn) => Math.round(momentToDisplay(lbIn, units)).toString()

  const rows = buildLoadSheetRows(
    aircraft,
    weights,
    (station) => resolveStationLabel(station, m),
    ls.emptyWeight
  )

  // estaciones sin carga: no se imprimen (buildLoadSheetRows), solo se cuentan
  const omittedStations =
    aircraft.loadStations.filter((station) => typeof aircraft.stations[station.key] === "number")
      .length -
    (rows.length - 1)

  const phaseRows = phases
    ? [
        ...(phases.taxiFuel > 0
          ? [{ key: "ramp", label: m.flightPhases.ramp, phase: phases.ramp }]
          : []),
        { key: "takeoff", label: m.flightPhases.takeoff, phase: phases.takeoff },
        { key: "landing", label: m.flightPhases.landing, phase: phases.landing },
        { key: "zeroFuel", label: m.flightPhases.zeroFuel, phase: phases.zeroFuel },
      ]
    : [
        {
          key: "takeoff",
          label: m.flightPhases.takeoff,
          phase: { ...results, inEnvelope: results.isCgOk },
        },
      ]

  const rampIssues = phases ? buildRampIssues(aircraft, phases) : []
  const takeoffOk = results.isWeightOk && results.isCgOk && rampIssues.length === 0
  const taxiFuel = phases?.taxiFuel ?? 0
  const warnings = [
    ...rampIssues.map((issue) => localizeLandingIssue(issue, units, phases ?? undefined)),
    ...(safetyChecks
      ? safetyChecks.warnings.map((w) => localizeSafetyMessage(w, safetyChecks, units))
      : []),
    ...(landingReport ? [...landingReport.errors, ...landingReport.warnings] : []).map((issue) =>
      localizeLandingIssue(issue, units, phases ?? undefined)
    ),
  ]

  const { metadata, dataValidation } = aircraft
  const reliability =
    metadata.dataReliability === "verified-complete"
      ? m.aircraftInfo.reliabilityVerified
      : metadata.dataReliability === "verified-partial"
        ? m.aircraftInfo.reliabilityPartial
        : m.aircraftInfo.reliabilityEstimated
  const route = [details.departure, details.destination].filter(Boolean).join(" → ")

  const th = "border border-black px-1 py-0.5 text-left font-semibold"
  const td = "border border-black px-1 py-0.5"
  const num = `${td} text-right font-mono`
  const section = "break-inside-avoid space-y-1"
  const heading = "text-sm font-bold uppercase tracking-wide border-b border-black"

  return (
    <article
      className="load-sheet mx-auto max-w-[190mm] bg-white text-black text-[11px] leading-snug space-y-4"
      data-testid="load-sheet"
    >
      <header className="border border-black px-2 py-1 space-y-1">
        <div className="flex items-baseline justify-between gap-4">
          <h1 className="text-sm font-bold">{ls.sheetTitle}</h1>
          <span className="text-[10px]">CheckCG</span>
        </div>
        <dl className="grid grid-cols-[3fr_2fr_2fr] gap-x-3 gap-y-0.5">
          <Field row label={ls.aircraft} value={aircraft.name} />
          <Field row label={ls.tcds} value={aircraft.tcds} />
          <Field
            row
            label={ls.registration}
            value={details.registration}
            testId="sheet-registration"
          />
          <Field row label={ls.date} value={details.date} />
          <Field row label={ls.route} value={route} />
          <Field row label={ls.pilot} value={details.pilot} />
        </dl>
      </header>

      <div className="grid grid-cols-2 items-start gap-4">
        <div className="space-y-3">
          <section className={section}>
            <h2 className={heading}>{ls.stationsTitle}</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className={th}>{ls.station}</th>
                  <th className={`${th} text-right`}>
                    {ls.weight} ({symbols.weight})
                  </th>
                  <th className={`${th} text-right`}>
                    {ls.arm} ({symbols.arm})
                  </th>
                  <th className={`${th} text-right`}>
                    {ls.moment} ({symbols.moment})
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.key} data-testid={`sheet-station-${row.key}`}>
                    <td className={td}>{row.label}</td>
                    <td className={num}>{weight(row.weight)}</td>
                    <td className={num}>{arm(row.arm)}</td>
                    <td className={num}>{moment(row.moment)}</td>
                  </tr>
                ))}
                {phases && taxiFuel > 0 && (
                  <>
                    <tr className="font-bold" data-testid="sheet-ramp-total">
                      <td className={td}>{ls.rampTotal}</td>
                      <td className={num}>{weight(phases.ramp.totalWeight)}</td>
                      <td className={num}>{arm(phases.ramp.centerOfGravity)}</td>
                      <td className={num}>{moment(phases.ramp.totalMoment)}</td>
                    </tr>
                    <tr data-testid="sheet-taxi-fuel">
                      <td className={td}>{ls.taxiFuel}</td>
                      <td className={num}>−{weight(taxiFuel)}</td>
                      <td className={num} />
                      <td className={num}>
                        −{moment(phases.ramp.totalMoment - phases.takeoff.totalMoment)}
                      </td>
                    </tr>
                  </>
                )}
                <tr className="font-bold" data-testid="sheet-total">
                  <td className={td}>{ls.total}</td>
                  <td className={num}>{weight(results.totalWeight)}</td>
                  <td className={num}>{arm(results.centerOfGravity)}</td>
                  <td className={num}>{moment(results.totalMoment)}</td>
                </tr>
              </tbody>
            </table>
            {omittedStations > 0 && (
              <p className="text-[10px]" data-testid="sheet-omitted-stations">
                {ls.emptyStationsOmitted(omittedStations)}
              </p>
            )}
          </section>
          <section className={section}>
            <h2 className={heading}>{ls.phasesTitle}</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className={th}>{ls.phase}</th>
                  <th className={`${th} text-right`}>
                    {ls.weight} ({symbols.weight})
                  </th>
                  <th className={`${th} text-right`}>
                    {ls.cg} ({symbols.arm})
                  </th>
                  <th className={th}>{ls.status}</th>
                </tr>
              </thead>
              <tbody>
                {phaseRows.map(({ key, label, phase }) => (
                  <tr key={key} data-testid={`sheet-phase-${key}`}>
                    <td className={td}>{label}</td>
                    <td className={num}>{weight(phase.totalWeight)}</td>
                    <td className={num}>{arm(phase.centerOfGravity)}</td>
                    <td className={`${td} font-bold`}>
                      {key !== "ramp"
                        ? phase.inEnvelope
                          ? ls.inEnvelope
                          : ls.outOfEnvelope
                        : aircraft.maxRampWeight === undefined
                          ? "—"
                          : phase.totalWeight <= aircraft.maxRampWeight
                            ? m.results.ok
                            : m.results.overweight}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {phases && phases.fuelBurn > 0 && (
              <p>
                {ls.plannedBurn}: {weight(phases.fuelBurn)} {symbols.weight}
              </p>
            )}
          </section>
        </div>

        <div className="space-y-3">
          <section className={section}>
            <h2 className={heading}>{ls.envelopeTitle}</h2>
            <CGEnvelopeChart
              aircraft={aircraft}
              currentCG={results.centerOfGravity}
              currentWeight={results.totalWeight}
              landingCG={phases?.fuelBurn ? phases.landing.centerOfGravity : undefined}
              landingWeight={phases?.fuelBurn ? phases.landing.totalWeight : undefined}
              zeroFuelCG={phases?.fuelLoaded ? phases.zeroFuel.centerOfGravity : undefined}
              zeroFuelWeight={phases?.fuelLoaded ? phases.zeroFuel.totalWeight : undefined}
              units={units}
              size={PRINT_CHART_SIZE}
            />
          </section>
          <section className={section}>
            <h2 className={heading}>{ls.limitsTitle}</h2>
            <dl className="space-y-0.5">
              <Field
                inline
                label={ls.maxTakeoffWeight}
                value={`${weight(aircraft.maxWeight)} ${symbols.weight}`}
              />
              {aircraft.maxRampWeight !== undefined && (
                <Field
                  inline
                  label={ls.maxRampWeight}
                  value={`${weight(aircraft.maxRampWeight)} ${symbols.weight}`}
                />
              )}
              {aircraft.maxLandingWeight !== undefined && (
                <Field
                  inline
                  label={ls.maxLandingWeight}
                  value={`${weight(aircraft.maxLandingWeight)} ${symbols.weight}`}
                />
              )}
              {aircraft.maxZeroFuelWeight !== undefined && (
                <Field
                  inline
                  label={ls.maxZeroFuelWeight}
                  value={`${weight(aircraft.maxZeroFuelWeight)} ${symbols.weight}`}
                />
              )}
              <Field
                inline
                label={ls.cgLimits}
                value={`${arm(aircraft.cgLimits.forward)} / ${arm(aircraft.cgLimits.aft)} ${symbols.arm}`}
              />
            </dl>
            <p className="mt-2 border-2 border-black p-1 text-center font-bold">
              {takeoffOk ? ls.takeoffOk : ls.takeoffNotOk}
            </p>
          </section>
        </div>
      </div>

      <section className={section}>
        <h2 className={heading}>{ls.warningsTitle}</h2>
        {warnings.length > 0 ? (
          <ul className="list-disc pl-5">
            {warnings.map((text, index) => (
              <li key={index}>{text}</li>
            ))}
          </ul>
        ) : (
          <p>{ls.noWarnings}</p>
        )}
      </section>

      <section className={section}>
        <h2 className={heading}>{ls.dataTitle}</h2>
        <p>
          <span className="font-semibold">{ls.reliability}</span> {reliability}
          {dataValidation?.lastUpdated && (
            <>
              {" · "}
              <span className="font-semibold">{m.dataSources.lastUpdated}</span>{" "}
              {dataValidation.lastUpdated}
            </>
          )}
        </p>
        <ul className="list-disc pl-5">
          {metadata.sourceDocuments.map((doc, index) => (
            <li key={index}>{doc}</li>
          ))}
        </ul>
        {dataValidation && dataValidation.pendingVerification.length > 0 && (
          <p>
            <span className="font-semibold">{ls.pending}</span>{" "}
            {dataValidation.pendingVerification.join("; ")}
          </p>
        )}
        {metadata.aircraftSpecific?.warning && <p>{metadata.aircraftSpecific.warning}</p>}
      </section>

      {details.remarks && (
        <section className={section}>
          <h2 className={heading}>{ls.remarksTitle}</h2>
          <p className="whitespace-pre-wrap">{details.remarks}</p>
        </section>
      )}

      <section className="break-inside-avoid pt-10">
        <div className="w-72 border-t border-black pt-1">
          <p className="font-semibold">{ls.signature}</p>
          {details.pilot && <p>{details.pilot}</p>}
        </div>
      </section>

      <footer className="break-inside-avoid border-t border-black pt-1 text-[10px]">
        <p>
          {ls.generatedBy} — {APP_URL}
        </p>
        <p>{ls.disclaimer}</p>
      </footer>
    </article>
  )
}

/**
 * Label/value pair of the sheet; blank values leave a line to fill by hand.
 * `inline` puts the value right-aligned on the label's line; `row` puts it on
 * the label's line as a fill-in line (compact header).
 * @param {{ label: string, value: string, inline?: boolean, row?: boolean, testId?: string }} props
 */
function Field({ label, value, inline = false, row = false, testId }) {
  return (
    <div className={inline ? "flex justify-between gap-2" : row ? "flex items-baseline gap-1" : ""}>
      <dt className={`text-[10px] uppercase${row ? " shrink-0" : ""}`}>{label}</dt>
      <dd
        className={`min-h-[1.25em] border-b border-dotted border-black font-semibold${
          row ? " min-w-0 flex-1" : ""
        }`}
        data-testid={testId}
      >
        {value}
      </dd>
    </div>
  )
}
