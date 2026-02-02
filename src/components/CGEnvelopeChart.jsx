import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  LineChart,
  Area,
  AreaChart,
  ComposedChart,
} from 'recharts'

/**
 * Interactive chart displaying the Center of Gravity (CG) envelope
 * Shows the aircraft's operational limits and current operating point
 * 
 * @param {Object} props - Component props
 * @param {Object} props.aircraft - Aircraft configuration object containing:
 *   - cgEnvelope: {points: Array<{arm: number, weight: number}>} - CG envelope polygon points
 *   - tcds: string - Type Certificate Data Sheet reference
 * @param {number} props.currentCG - Current center of gravity position (inches aft of datum)
 * @param {number} props.currentWeight - Current aircraft total weight (lbs)
 * @returns {JSX.Element} Scatter chart with CG envelope and operating point
 * 
 * @example
 * <CGEnvelopeChart 
 *   aircraft={aircraftData}
 *   currentCG={152.5}
 *   currentWeight={9500}
 * />
 */
export function CGEnvelopeChart({ aircraft, currentCG, currentWeight }) {
  // Preparar datos del envolvente para formar un polígono cerrado
  const envelopePoints = aircraft.cgEnvelope.points
  
  // Crear el polígono del envolvente (cerrado)
  const envelopeData = [
    ...envelopePoints.map(point => ({ x: point.arm, y: point.weight })),
    // Cerrar el polígono conectando con el primer punto
    { x: envelopePoints[0].arm, y: envelopePoints[0].weight }
  ]
  
  // Datos para el punto de operación actual
  const currentPointData = [
    { x: currentCG, y: currentWeight, label: 'Punto Operativo' }
  ]

  // Tooltip personalizado
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white border-2 border-black p-2 shadow-lg">
          <p className="font-bold text-xs">Información del Punto</p>
          <p className="text-xs">{`CG: ${data.x?.toFixed(1)}" Arm`}</p>
          <p className="text-xs">{`Peso: ${data.y?.toLocaleString()} lbs`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="w-full bg-white border-2 border-black">
      {/* Título superior como el documento original */}
      <div className="text-center py-2 border-b border-gray-300">
        <h3 className="text-sm font-bold text-black">
          Envolvente de CG extraída del {aircraft.tcds} (11 may 2018)
        </h3>
        <p className="text-xs text-black mt-1">
          C.G. Arm - Inches aft of Datum STA 0.0
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
              unit=" inches"
              domain={[144, 162]}
              tickCount={10}
              fontSize={10}
              stroke="#000"
              label={{ 
                value: 'inches', 
                position: 'insideBottom', 
                offset: -10,
                style: { textAnchor: 'middle', fontSize: '11px', fontWeight: 'bold' }
              }}
            />

            {/* Eje Y (Weight - pounds) */}
            <YAxis
              type="number"
              dataKey="y"
              name="Weight"
              unit=" lbs"
              domain={[6000, 10200]}
              width={80}
              fontSize={10}
              stroke="#000"
              tickFormatter={(value) => value.toLocaleString()}
              label={{ 
                value: 'pounds', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle', fontSize: '11px', fontWeight: 'bold' }
              }}
            />

            {/* Tooltip para mostrar datos al pasar el mouse */}
            <Tooltip content={<CustomTooltip />} />
            
            <Legend />

            {/* Polígono del envolvente como línea conectada */}
            <Scatter
              name="Límite del Envolvente"
              data={envelopeData}
              line={{ stroke: '#8884d8', strokeWidth: 2 }}
              fill="transparent"
              shape={() => null}
            />

            {/* Punto de operación actual */}
            <Scatter
              name="Punto Operativo"
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