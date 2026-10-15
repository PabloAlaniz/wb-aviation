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
import { niceScale } from "../utils/chartScale"
import { armSuffix, armToDisplay, unitSymbols, weightToDisplay } from "../utils/units"

/** Space reserved above the plot for the legend in fixed-size (print) mode. */
const PRINT_LEGEND_HEIGHT = 24

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
 *   size?: { width: number, height: number },
 * }} props - `size` renders at a fixed size without animation (e.g. for
 *   printing, where ResponsiveContainer can't measure a hidden parent)
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
  size,
}) {
  const animate = !size
  // Datos en lbs/pulgadas; solo se convierten para mostrar (units)
  const x = (/** @type {number} */ inches) => armToDisplay(inches, units)
  const y = (/** @type {number} */ lbs) => weightToDisplay(lbs, units)
  const metric = units === "metric"

  // Preparar datos del envolvente para formar un polígono cerrado
  const envelopePoints = aircraft.cgEnvelope.points

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

  // Escalas "lindas" (pasos 1/2/5 × 10^n) en la unidad mostrada, derivadas de
  // la envolvente y de los puntos graficados para que todo quede visible
  const plotted = [...envelopeData, ...currentPointData]
  if (hasLanding) plotted.push({ x: x(landingCG), y: y(landingWeight) })
  if (hasZeroFuel) plotted.push({ x: x(zeroFuelCG), y: y(zeroFuelWeight) })
  const xScale = niceScale(
    plotted.map((point) => point.x),
    { count: 10 }
  )
  const yScale = niceScale(
    plotted.map((point) => point.y),
    { count: 6 }
  )

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
      <div className={size ? "bg-white" : "h-80 bg-white"}>
        <ChartFrame size={size}>
          <ScatterChart
            width={size?.width}
            height={size?.height}
            margin={{
              // Fixed size (print): the chart is rendered hidden, so Recharts
              // measures the legend as 0 px tall; reserve its space explicitly
              top: size ? 20 + PRINT_LEGEND_HEIGHT : 20,
              right: 30,
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
              domain={xScale.domain}
              ticks={xScale.ticks}
              allowDataOverflow
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
              domain={yScale.domain}
              ticks={yScale.ticks}
              allowDataOverflow
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

            {/* Leyenda arriba: no compite con los ticks ni el título del eje X */}
            <Legend
              verticalAlign="top"
              wrapperStyle={
                size
                  ? { top: 8, fontSize: 11, lineHeight: "16px" }
                  : { paddingBottom: 8, fontSize: 11 }
              }
            />

            {/* Polígono del envolvente como línea conectada */}
            <Scatter
              isAnimationActive={animate}
              name={m.chart.envelopeLimit}
              data={envelopeData}
              line={{ stroke: "#8884d8", strokeWidth: 2 }}
              fill="#8884d8"
              shape={() => null}
              legendType="plainline"
            />

            {/* Punto de operación actual */}
            <Scatter
              isAnimationActive={animate}
              name={m.chart.operatingPoint}
              data={currentPointData}
              fill="#ff0000"
              shape="circle"
            />

            {/* Trayectoria de consumo: despegue -> aterrizaje */}
            {hasLanding && (
              <Scatter
                isAnimationActive={animate}
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
                isAnimationActive={animate}
                name={m.flightPhases.chartLanding}
                data={[{ x: x(landingCG), y: y(landingWeight) }]}
                fill="#f97316"
                shape="triangle"
              />
            )}
            {hasZeroFuel && (
              <Scatter
                isAnimationActive={animate}
                name={m.flightPhases.chartZeroFuel}
                data={[{ x: x(zeroFuelCG), y: y(zeroFuelWeight) }]}
                fill="#6b7280"
                shape="square"
              />
            )}
          </ScatterChart>
        </ChartFrame>
      </div>
    </div>
  )
}

/**
 * Responsive wrapper on screen; plain (fixed-size chart) when `size` is set.
 * @param {{ size?: { width: number, height: number }, children: import("react").ReactElement }} props
 */
function ChartFrame({ size, children }) {
  if (size) return children
  return (
    <ResponsiveContainer width="100%" height="100%">
      {children}
    </ResponsiveContainer>
  )
}
