# Cómo contribuir a CheckCG

¡Gracias por tu interés! Esta guía cubre lo básico para correr el proyecto,
mantener la calidad y, sobre todo, **agregar aeronaves de forma segura**.

## Requisitos

- Node.js 20+
- npm

## Puesta en marcha

```bash
git clone https://github.com/PabloAlaniz/wb-aviation.git
cd wb-aviation
npm install
npm run dev          # http://localhost:4321
```

## Scripts útiles

```bash
npm run dev           # servidor de desarrollo
npm run build         # build de producción (dist/)
npm run preview       # previsualizar el build
npm test              # tests una vez
npm run test:watch    # tests en modo watch
npm run test:coverage # reporte de cobertura
npm run lint          # ESLint
npm run format        # formatear con Prettier
npm run format:check  # verificar formato (lo que corre CI)
```

## Antes de abrir un PR

La CI ejecuta, en este orden: `format:check`, `lint`, `test` y `build`.
Para no fallar en CI, corré localmente:

```bash
npm run format && npm run lint && npm test && npm run build
```

- Mantené o subí la cobertura de tests (la lógica de `src/utils/calculations.js`
  es crítica para la seguridad y debe tener tests).
- Commits descriptivos (estilo `tipo: resumen`, p. ej. `feat:`, `fix:`, `docs:`).

## Agregar una aeronave

La app es **data-driven**: agregar una aeronave normalmente **no requiere tocar
componentes**, solo datos. Seguí la guía completa en
[docs/aircraft-data.md](docs/aircraft-data.md). En resumen:

1. Conseguir el TCDS oficial (FAA) y, si es posible, el POH/AFM.
2. Crear la entrada en `src/data/aircraft.js` siguiendo la estructura documentada.
3. Usar **lbs y pulgadas**. Si la fuente usa kg/mm, convertir y documentarlo.
4. Declarar `metadata.dataReliability` con honestidad
   (`verified-complete` / `verified-partial` / `estimated`) y listar lo no
   verificado en `dataValidation.pendingVerification` (se muestra al usuario).
5. Agregar un test que valide un cálculo de ejemplo del POH contra
   `calculateWeightBalance` (ver `src/utils/calculations.test.js`).
6. Probar en la UI (`npm run dev`): formulario, alertas y envolvente de CG.

> ⚠️ **Seguridad primero:** los datos de W&B son críticos. Si no podés verificar
> un dato contra documentación oficial, marcalo como `estimated` y dejalo claro
> en `pendingVerification`. Nunca presentes datos estimados como verificados.

## Reportar problemas

Abrí un issue describiendo el comportamiento esperado vs. el observado. Para
bugs en cálculos, incluí la aeronave, los valores cargados y el resultado.
