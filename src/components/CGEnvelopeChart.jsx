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

export function CGEnvelopeChart({ aircraft, currentCG, currentWeight }) {
  // Preparar datos del envolvente para formar un polígono cerrado
  const envelopePoints = aircraft.cgEnvelope.points

  // Dominios de los ejes derivados de la envolvente de cada aeronave
  const arms = envelopePoints.map((point) => point.arm)
  const envelopeWeights = envelopePoints.map((point) => point.weight)
  const xDomain = [Math.floor(Math.min(...arms)), Math.ceil(Math.max(...arms)) + 2]
  const yDomain = [Math.min(...envelopeWeights), Math.max(...envelopeWeights) + 100]

  // Crear el polígono del envolvente (cerrado)
  const envelopeData = [
    ...envelopePoints.map((point) => ({ x: point.arm, y: point.weight })),
    // Cerrar el polígono conectando con el primer punto
    { x: envelopePoints[0].arm, y: envelopePoints[0].weight },
  ]

  // Datos para el punto de operación actual
  const currentPointData = [{ x: currentCG, y: currentWeight, label: m.chart.operatingPoint }]

  // Tooltip personalizado
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white border-2 border-black p-2 shadow-lg">
          <p className="font-bold text-xs">{m.chart.tooltipTitle}</p>
          <p className="text-xs">{m.chart.tooltipCg(data.x?.toFixed(1))}</p>
          <p className="text-xs">{m.chart.tooltipWeight(data.y?.toLocaleString())}</p>
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
        <p className="text-xs text-black mt-1">{m.chart.axisNote}</p>
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
              unit=" inches"
              domain={xDomain}
              tickCount={10}
              fontSize={10}
              stroke="#000"
              label={{
                value: m.chart.xUnit,
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
              unit=" lbs"
              domain={yDomain}
              width={80}
              fontSize={10}
              stroke="#000"
              tickFormatter={(value) => value.toLocaleString()}
              label={{
                value: m.chart.yUnit,
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
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
