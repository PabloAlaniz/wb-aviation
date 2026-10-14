import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { messages as m } from "../i18n"
import { armSuffix, armToDisplay, unitSymbols, weightToDisplay } from "../utils/units"

/**
 * @param {{
 *   aircraft: import("../types").Aircraft,
 *   currentCG: number,
 *   currentWeight: number,
 *   landingCG?: number,
 *   landingWeight?: number,
 *   zeroFuelCG?: number,
 *   zeroFuelWeight?: number,
 *   units?: import("../types").UnitSystem,
 * }} props
 */
export function CGEnvelopeChart({
  aircraft,
  currentCG,
  currentWeight,
  landingCG,
  landingWeight,
  zeroFuelCG,
  zeroFuelWeight,
  units = "imperial",
}) {
  // Datos en lbs/pulgadas; solo se convierten para mostrar (units)
  const x = (/** @type {number} */ inches) => armToDisplay(inches, units)
  const y = (/** @type {number} */ lbs) => weightToDisplay(lbs, units)
  const metric = units === "metric"

  // Preparar datos del envolvente para formar un polígono cerrado
  const envelopePoints = aircraft.cgEnvelope.points

  // Dominios de los ejes derivados de la envolvente de cada aeronave
  const arms = envelopePoints.map((point) => point.arm)
  const envelopeWeights = envelopePoints.map((point) => point.weight)
  const xDomain = [
    Math.floor(x(Math.floor(Math.min(...arms)))),
    Math.ceil(x(Math.ceil(Math.max(...arms)) + 2)),
  ]
  const yDomain = [
    Math.floor(y(Math.min(...envelopeWeights))),
    Math.ceil(y(Math.max(...envelopeWeights) + 100)),
  ]

  // Crear el polígono del envolvente (cerrado)
  const envelopeData = [
    ...envelopePoints.map((point) => ({ x: x(point.arm), y: y(point.weight) })),
    // Cerrar el polígono conectando con el primer punto
    { x: x(envelopePoints[0].arm), y: y(envelopePoints[0].weight) },
  ]

  // Datos para el punto de operación actual
  const currentPointData = [{ x: x(currentCG), y: y(currentWeight), label: m.chart.operatingPoint }]

  // Fases de vuelo opcionales (aterrizaje y peso sin combustible)
  const hasLanding = landingCG !== undefined && landingWeight !== undefined
  const hasZeroFuel = zeroFuelCG !== undefined && zeroFuelWeight !== undefined
  const burnPathData = hasLanding
    ? [
        { x: x(currentCG), y: y(currentWeight) },
        { x: x(landingCG), y: y(landingWeight) },
      ]
    : []

  // Tooltip personalizado
  /** @param {{ active?: boolean, payload?: Array<{ payload: { x: number, y: number } }> }} props */
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white border-2 border-black p-2 shadow-lg">
          <p className="font-bold text-xs">{m.chart.tooltipTitle}</p>
          <p className="text-xs">{m.chart.tooltipCg(data.x?.toFixed(1), armSuffix(units))}</p>
          <p className="text-xs">
            {m.chart.tooltipWeight(
              data.y?.toLocaleString(undefined, { maximumFractionDigits: 1 }),
              unitSymbols(units).weight
            )}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="w-full bg-white border-2 border-black">
      {/* Título superior como el documento original */}
      <div className="text-center py-2 border-b border-gray-300">
        <h3 className="text-sm font-bold text-black">{m.chart.title(aircraft.tcds)}</h3>
        <p className="text-xs text-black mt-1">
          {metric ? m.units.axisNoteMetric : m.chart.axisNote}
        </p>
      </div>

      {/* Gráfico principal */}
      <div className="h-80 bg-white">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 40,
              left: 50,
            }}
          >
            {/* Rejilla cartesiana de fondo */}
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />

            {/* Eje X (Arm - inches) */}
            <XAxis
              type="number"
              dataKey="x"
              name="Arm"
              unit={metric ? " mm" : " inches"}
              domain={xDomain}
              tickCount={10}
              fontSize={10}
              stroke="#000"
              label={{
                value: metric ? m.units.millimeters : m.chart.xUnit,
                position: "insideBottom",
                offset: -10,
                style: { textAnchor: "middle", fontSize: "11px", fontWeight: "bold" },
              }}
            />

            {/* Eje Y (Weight - pounds) */}
            <YAxis
              type="number"
              dataKey="y"
              name="Weight"
              unit={metric ? " kg" : " lbs"}
              domain={yDomain}
              width={80}
              fontSize={10}
              stroke="#000"
              tickFormatter={(value) => value.toLocaleString()}
              label={{
                value: metric ? m.units.kilograms : m.chart.yUnit,
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle", fontSize: "11px", fontWeight: "bold" },
              }}
            />

            {/* Tooltip para mostrar datos al pasar el mouse */}
            <Tooltip content={<CustomTooltip />} />

            <Legend />

            {/* Polígono del envolvente como línea conectada */}
            <Scatter
              name={m.chart.envelopeLimit}
              data={envelopeData}
              line={{ stroke: "#8884d8", strokeWidth: 2 }}
              fill="transparent"
              shape={() => null}
            />

            {/* Punto de operación actual */}
            <Scatter
              name={m.chart.operatingPoint}
              data={currentPointData}
              fill="#ff0000"
              shape="circle"
            />

            {/* Trayectoria de consumo: despegue -> aterrizaje */}
            {hasLanding && (
              <Scatter
                name={m.flightPhases.chartBurnPath}
                data={burnPathData}
                line={{ stroke: "#f97316", strokeWidth: 2, strokeDasharray: "5 3" }}
                fill="transparent"
                shape={() => null}
                legendType="none"
              />
            )}
            {hasLanding && (
              <Scatter
                name={m.flightPhases.chartLanding}
                data={[{ x: x(landingCG), y: y(landingWeight) }]}
                fill="#f97316"
                shape="triangle"
              />
            )}
            {hasZeroFuel && (
              <Scatter
                name={m.flightPhases.chartZeroFuel}
                data={[{ x: x(zeroFuelCG), y: y(zeroFuelWeight) }]}
                fill="#6b7280"
                shape="square"
              />
            )}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
