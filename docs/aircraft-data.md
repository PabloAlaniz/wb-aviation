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
  // Opcionales: solo se validan si se declaran (citar la fuente)
  maxLandingWeight: 9600,   // peso máximo de aterrizaje (lbs)
  maxZeroFuelWeight: 8000,  // peso máximo sin combustible (lbs)

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
  // labelKey apunta al namespace `stations` de src/i18n/{es,en,pt}.js; la UI
  // agrega la unidad (lbs/kg, gal/L). label (sin unidades) es solo un respaldo
  // para estaciones sin traducción. max y placeholder van en lbs.
  // isFuel: true marca las estaciones de combustible (ver "Fases de vuelo").
  loadStations: [
    { key: "pilot", labelKey: "stations.pilot", placeholder: "200" },
    { key: "fuel", labelKey: "stations.fuel", max: 318, placeholder: "1500", fullWidth: true, isFuel: true },
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

## Fases de vuelo: aterrizaje y peso sin combustible

`calculateFlightPhases(aircraft, weights, fuelBurn)` calcula tres condiciones a partir de la carga y el combustible a consumir que ingresa el piloto:

- **Despegue**: igual a `calculateWeightBalance()`.
- **Aterrizaje**: despegue menos el combustible consumido, descontado de las estaciones de combustible en proporción a lo cargado en cada una (cada una a su brazo).
- **Sin combustible (ZFW)**: despegue menos todo el combustible cargado.

Las estaciones de combustible se identifican con `isFuel: true` en `loadStations` (puede haber varias, p. ej. tanques principales y auxiliares). Si ninguna está marcada, se usa la estación `fuel` si existe. El consumo se limita a `[0, combustible cargado]`; si se pide más de lo cargado, `buildLandingReport()` lo reporta como error.

`buildLandingReport()` valida la envolvente al aterrizar (error), la envolvente sin combustible (advertencia) y, **solo si están declarados**, `maxLandingWeight` y `maxZeroFuelWeight`. No cargar estos valores sin una fuente oficial: si faltan, el chequeo se omite.

## Checklist para agregar una aeronave

1. Conseguir el TCDS en [el sitio de la FAA](https://drs.faa.gov/) y, si es posible, el POH/AFM.
2. Crear la entrada en `src/data/aircraft.js` siguiendo la estructura de arriba. El selector de aeronaves (`aircraftOptions`) se actualiza solo.
3. Verificar unidades: **lbs y pulgadas**. Si la fuente usa kg/mm, convertir y documentarlo.
4. Construir `cgEnvelope.points` en sentido horario o antihorario, cerrando el polígono.
5. Marcar `dataReliability` honestamente y completar `pendingVerification`.
6. Agregar tests en `src/utils/` que validen un cálculo de ejemplo del POH contra el resultado de `calculateWeightBalance` (ver `calculations.test.js`).
7. Probar en la UI: formulario, alertas y envolvente (`npm run dev`).

## Catálogo actual

| Clave                      | Aeronave                       | TCDS                   | Confiabilidad     |
| -------------------------- | ------------------------------ | ---------------------- | ----------------- |
| `king-air-echo-90`         | King Air Echo 90               | FAA 3A20               | verified-complete |
| `cessna-172s`              | Cessna 172S                    | FAA 3A12               | estimated         |
| `cessna-152`               | Cessna 152                     | FAA 3A19 Rev. 50       | estimated         |
| `piper-pa-28-161-warrior`  | Piper PA-28-161 Warrior II/III | FAA 2A13 Rev. 48       | verified-partial  |
| `piper-pa-38-112-tomahawk` | Piper PA-38-112 Tomahawk       | FAA A18SO Rev. 5       | verified-partial  |
| `tecnam-p2008-jc`          | Tecnam P2008 JC (630 kg)       | EASA.A.583 Issue 14    | estimated         |
| `tecnam-p2002-jf`          | Tecnam P2002 JF (580 kg)       | EASA.A.006 Issue 13    | estimated         |
| `diamond-da20-c1`          | Diamond DA20-C1 (750 kg)       | EASA.IM.A.223 Issue 06 | estimated         |
| `diamond-da40-180`         | Diamond DA40 IO-360 (1150 kg)  | EASA.IM.A.022 Issue 24 | estimated         |

Criterios usados en el catálogo:

- `verified-partial` solo cuando pesos, envolvente **y** brazos de estaciones coinciden entre el TCDS y el POH/AFM. Si algún brazo sale de una sola fuente, `estimated`.
- El peso vacío y su brazo son siempre los del ejemplo del POH/AFM (o un ejemplo publicado) y se avisa en `aircraftSpecific.warning`.
- Cada entrada modela **una** configuración (p. ej. MTOW básico, tanques estándar); las demás se listan en `pendingVerification`.
- Si el límite de CG vale "para todos los pesos", el borde inferior de la envolvente es un piso de graficación (se indica en un comentario), no un límite.
- Fuentes métricas (Tecnam, Diamond): 1 kg = 2.20462 lbs, 1 m = 39.3701 in; los límites de CG se redondean a 0.01" hacia adentro del rango. Los valores originales y la conversión quedan en comentarios.
- `totalProduced` admite un texto corto (`"s/d"`) cuando no hay un dato público confiable.

Aero Boero AB-115/AB-180: no se cargaron. El AB-115 tiene límites en la especificación de tipo brasileña EA-8905 (ANAC Brasil), pero no se encontró manual de vuelo ni ejemplo de peso vacío/brazo; del AB-180 solo hay una transcripción no oficial del manual con un MTOW que difiere de otras fuentes.

> Nota: `isPointInEnvelope` (ray casting) considera fuera de la envolvente un punto exactamente sobre el borde superior (peso = máximo). Los tests de ejemplos del POH que cargan justo al peso máximo verifican el CG apenas por debajo de ese borde.

## Dónde se usa cada campo

| Campo                                   | Consumidor                                                |
| --------------------------------------- | --------------------------------------------------------- |
| `stations` + pesos ingresados           | `calculateWeightBalance()` en `src/utils/calculations.js` |
| `loadStations`                          | `StationForm` (formulario data-driven)                    |
| `cgEnvelope.points`                     | `isPointInEnvelope()` y `CGEnvelopeChart`                 |
| `cgLimits`, `safetyFactors`, `metadata` | `buildSafetyReport()` (alertas)                           |
| `loadStations[].isFuel`                 | `calculateFlightPhases()` (aterrizaje / ZFW)              |
| `maxLandingWeight`, `maxZeroFuelWeight` | `buildLandingReport()` (opcionales)                       |
| `metadata`, `dataValidation`            | `AircraftInfo` y `DataSources` (paneles informativos)     |
