import { CGEnvelopeChart } from "./CGEnvelopeChart"
import { messages as m } from "../i18n"
import { resolveStationLabel } from "../utils/stationLabel"
import { localizeLandingIssue, localizeSafetyMessage } from "../utils/safetyDisplay"
import { APP_URL, buildLoadSheetRows } from "../utils/loadSheet"
import { armToDisplay, momentToDisplay, unitSymbols, weightToDisplay } from "../utils/units"

/** Chart size for print: fits the printable width of A4 and Letter at 12 mm margins. */
const PRINT_CHART_SIZE = { width: 680, height: 320 }

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

  const phaseRows = phases
    ? [
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

  const takeoffOk = results.isWeightOk && results.isCgOk
  const warnings = [
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

  const th = "border border-black px-2 py-1 text-left font-semibold"
  const td = "border border-black px-2 py-1"
  const num = `${td} text-right font-mono`
  const section = "break-inside-avoid space-y-1"
  const heading = "text-sm font-bold uppercase tracking-wide border-b border-black"

  return (
    <article
      className="load-sheet mx-auto max-w-[190mm] bg-white text-black text-[11px] leading-snug space-y-4"
      data-testid="load-sheet"
    >
      <header className="border-2 border-black p-2 space-y-2">
        <div className="flex items-baseline justify-between gap-4">
          <h1 className="text-lg font-bold">{ls.sheetTitle}</h1>
          <span className="text-xs">W&B Aviation</span>
        </div>
        <dl className="grid grid-cols-3 gap-x-4 gap-y-1">
          <Field label={ls.aircraft} value={aircraft.name} />
          <Field label={ls.tcds} value={aircraft.tcds} />
          <Field label={ls.registration} value={details.registration} testId="sheet-registration" />
          <Field label={ls.date} value={details.date} />
          <Field label={ls.route} value={route} />
          <Field label={ls.pilot} value={details.pilot} />
        </dl>
        <p className="text-[10px]">{ls.units(symbols.weight, symbols.arm, symbols.moment)}</p>
      </header>

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
            <tr className="font-bold" data-testid="sheet-total">
              <td className={td}>{ls.total}</td>
              <td className={num}>{weight(results.totalWeight)}</td>
              <td className={num}>{arm(results.centerOfGravity)}</td>
              <td className={num}>{moment(results.totalMoment)}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <div className="grid grid-cols-2 gap-4">
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
                    {phase.inEnvelope ? ls.inEnvelope : ls.outOfEnvelope}
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

        <section className={section}>
          <h2 className={heading}>{ls.limitsTitle}</h2>
          <dl className="space-y-0.5">
            <Field
              inline
              label={ls.maxTakeoffWeight}
              value={`${weight(aircraft.maxWeight)} ${symbols.weight}`}
            />
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
 * @param {{ label: string, value: string, inline?: boolean, testId?: string }} props
 */
function Field({ label, value, inline = false, testId }) {
  return (
    <div className={inline ? "flex justify-between gap-2" : ""}>
      <dt className="text-[10px] uppercase">{label}</dt>
      <dd
        className="min-h-[1.25em] border-b border-dotted border-black font-semibold"
        data-testid={testId}
      >
        {value}
      </dd>
    </div>
  )
}
