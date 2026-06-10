# Estructura de datos de aeronave

Guía para agregar o modificar aeronaves en `src/data/aircraft.js`. El formulario de carga, los cálculos, el gráfico de envolvente y los paneles de información se generan automáticamente a partir de esta estructura: **agregar una aeronave no requiere tocar componentes**.

## ⚠️ Antes de empezar

Los datos de W&B son críticos para la seguridad. Toda aeronave nueva debe:

1. Citar sus fuentes oficiales (TCDS de la FAA, POH/AFM del fabricante).
2. Declarar su nivel de confiabilidad en `metadata.dataReliability`:
   - `verified-complete`: todos los datos verificados contra documentación oficial.
   - `verified-partial`: datos principales verificados, estaciones estimadas.
   - `estimated`: datos de referencia general, requiere verificación.
3. Listar lo no verificado en `dataValidation.pendingVerification` (se muestra al usuario).

Si `dataReliability` no es `verified-complete`, la UI muestra automáticamente una alerta.

## Estructura mínima requerida

```js
"clave-de-aeronave": {
  name: "Nombre visible (Fabricante)",
  tcds: "TCDS# XXXX Revision NN",

  // Pesos y brazos — en lbs y pulgadas aft of datum
  emptyWeight: 6682,    // peso vacío (lbs)
  emptyArm: 151.0415,   // brazo del peso vacío (in)
  maxWeight: 10100,     // peso máximo de despegue (lbs)

  // Límites de CG (in)
  cgLimits: { forward: 144.7, aft: 160.0 },

  // Brazos de cada estación de carga (in). Las claves son libres,
  // pero deben coincidir con loadStations. La clave "notes" se ignora.
  stations: {
    pilot: 144.0,
    copilot: 144.0,
    fuel: 154.0,
    // ...
  },

  // Configuración del formulario: orden, etiquetas y placeholders.
  // Los campos se renderizan de a pares; fullWidth: true ocupa la fila.
  loadStations: [
    { key: "pilot", label: "Piloto (lbs)", placeholder: "200" },
    { key: "fuel", label: "Combustible (lbs)", placeholder: "1500", fullWidth: true },
  ],

  // Envolvente de CG: polígono cerrado (el último punto repite el primero).
  // El gráfico y la validación por ray-casting usan estos puntos.
  cgEnvelope: {
    points: [
      { arm: 144.7, weight: 6000 },
      { arm: 144.7, weight: 7850 },
      { arm: 152.0, weight: 10100 },
      { arm: 160.0, weight: 10100 },
      { arm: 160.0, weight: 6000 },
      { arm: 144.7, weight: 6000 },
    ],
    source: "Documento de origen",
    verificationStatus: "verified-complete",
  },

  // Umbrales de alertas
  safetyFactors: {
    weightMargin: 0.95,  // alerta arriba del 95% del peso máximo
    cgMargin: 0.1,       // alerta a menos de 0.1" de los límites de CG
    recommendedReserve: { fuel: 200, weight: 200 },
  },

  metadata: { /* fabricante, motores, producción, dataReliability, sourceDocuments... */ },
  dataValidation: { lastUpdated, verifiedAgainst: [], pendingVerification: [] },
}
```

## Checklist para agregar una aeronave

1. Conseguir el TCDS en [el sitio de la FAA](https://drs.faa.gov/) y, si es posible, el POH/AFM.
2. Crear la entrada en `src/data/aircraft.js` siguiendo la estructura de arriba. El selector de aeronaves (`aircraftOptions`) se actualiza solo.
3. Verificar unidades: **lbs y pulgadas**. Si la fuente usa kg/mm, convertir y documentarlo.
4. Construir `cgEnvelope.points` en sentido horario o antihorario, cerrando el polígono.
5. Marcar `dataReliability` honestamente y completar `pendingVerification`.
6. Agregar tests en `src/utils/` que validen un cálculo de ejemplo del POH contra el resultado de `calculateWeightBalance` (ver `calculations.test.js`).
7. Probar en la UI: formulario, alertas y envolvente (`npm run dev`).

## Dónde se usa cada campo

| Campo                                   | Consumidor                                                |
| --------------------------------------- | --------------------------------------------------------- |
| `stations` + pesos ingresados           | `calculateWeightBalance()` en `src/utils/calculations.js` |
| `loadStations`                          | `StationForm` (formulario data-driven)                    |
| `cgEnvelope.points`                     | `isPointInEnvelope()` y `CGEnvelopeChart`                 |
| `cgLimits`, `safetyFactors`, `metadata` | `buildSafetyReport()` (alertas)                           |
| `metadata`, `dataValidation`            | `AircraftInfo` y `DataSources` (paneles informativos)     |
