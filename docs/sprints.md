# Plan de Sprints - wb-aviation

**Fecha de planificación:** 2026-06-14
**Estado del proyecto:** En producción ([wb-aviation.pages.dev](https://wb-aviation.pages.dev/)), 2 aeronaves, PWA, tests + CI.
**Duración sugerida por sprint:** 1–2 semanas.

> Este plan parte del estado **real** del repositorio (no del roadmap viejo de
> febrero). Varios items del `roadmap.md` original ya están hechos: PWA,
> persistencia, tests, CI/CD, deploy y una segunda aeronave (Cessna 172S).

---

## Snapshot del estado actual (2026-06-14)

| Área              | Estado | Detalle                                                      |
| ----------------- | ------ | ------------------------------------------------------------ |
| Aeronaves         | 🟡     | 2 implementadas (King Air E90, Cessna 172S)                  |
| PWA / offline     | ✅     | `vite-plugin-pwa` configurado                                |
| Persistencia      | ✅     | `useLocalStorage` (carga + aeronave seleccionada)            |
| Tests             | ✅     | 98 tests, alta cobertura                                     |
| CI/CD             | ✅     | lint + format + typecheck + test + build en cada push/PR     |
| Deploy            | ✅     | Cloudflare Pages                                             |
| i18n              | ✅     | Trilingüe ES/EN/PT con selector y detección de navegador     |
| Accesibilidad     | ✅     | Mejoras + error boundary global                              |
| Documentación     | ✅     | README/FODA al día, roadmap→sprints, CONTRIBUTING (Sprint 1) |
| Export PDF        | 🔴     | No implementado                                              |
| Unidades métricas | 🔴     | Solo imperiales (lbs/in)                                     |
| TypeScript/Types  | ✅     | Type-check (checkJs) en todo `src` (lógica + componentes)    |
| SEO / analytics   | 🟡     | OG/Twitter + sitemap/robots; analytics Plausible opt-in      |
| Monetización      | 🔴     | Sin explorar                                                 |

---

## 🏁 Sprint 1 — Documentación al día (base limpia) — ✅ COMPLETADO

**Objetivo:** Que la documentación refleje la realidad del proyecto. Es el
prerrequisito para que cualquier colaborador (o el yo del futuro) entienda
dónde está parado el proyecto.

- [x] Actualizar `README.md`:
  - Lista de aeronaves soportadas (King Air E90 **+ Cessna 172S**).
  - Stack real: agregar Vitest, vite-plugin-pwa, i18n.
  - Sección Roadmap: mover a "hecho" lo ya entregado, linkear a este doc.
  - Datos del Cessna 172S y fecha de última actualización.
- [x] Reemplazar `roadmap.md` por un puntero a `docs/sprints.md`.
- [x] Actualizar `FODA.md`: mover de Debilidades lo resuelto (persistencia,
      offline, tests, deploy, single-aircraft) y reflejar el estado nuevo.
- [x] Verificar que `docs/aircraft-data.md` siga vigente (está OK).
- [x] Añadir `CONTRIBUTING.md` (cómo correr, testear, agregar aeronave).
- [ ] Capturas/GIF actualizados si la UI cambió. _(pendiente: requiere captura)_

**Entregable:** docs coherentes con el código en `main`.
**Esfuerzo:** ~1 semana (bajo riesgo).

---

## ✈️ Sprint 2 — Expansión del catálogo de aeronaves

**Objetivo:** Pasar de 2 a 4–5 aeronaves, que es el principal driver de valor
y de tráfico. La arquitectura ya es data-driven (`docs/aircraft-data.md`).

- [ ] Agregar **Piper PA-28 Cherokee** (muy común en escuelas).
- [ ] Agregar **King Air 200** (familia ya conocida del proyecto).
- [ ] Opcional: Beechcraft Baron 58 o Cessna 182.
- [ ] Para cada una: TCDS citado, `dataReliability` honesto, `pendingVerification`.
- [ ] Tests por aeronave: validar un cálculo del POH contra `calculateWeightBalance`.
- [ ] Revisar UX del selector con 4+ aeronaves (agrupar por categoría si hace falta).

**Entregable:** catálogo de 4–5 aeronaves verificadas + tests.
**Esfuerzo:** ~1–2 semanas (depende de conseguir datos oficiales).

---

## 🌍 Sprint 3 — Internacionalización real + alcance (SEO) — ✅ COMPLETADO

**Objetivo:** Abrir el mercado angloparlante (el grande en aviación) y mejorar
la presencia. El módulo i18n ya existe pero solo tiene español.

- [x] Traducir todas las strings a **inglés** (`src/i18n/en.js`).
- [x] Resolver locale por preferencia guardada + idioma del navegador, con
      selector manual persistido (`resolveLocale`, `setLocale`, `<html lang>`).
- [x] Test de paridad de claves (todos los locales) y de resolución de locale.
- [x] **Portugués** (`src/i18n/pt.js`) para mercado brasileño.
- [x] Open Graph + Twitter Card tags para previews en redes.
- [x] Analytics privacy-friendly (Plausible, opt-in vía `VITE_PLAUSIBLE_DOMAIN`).
- [x] `sitemap.xml` + `robots.txt` + meta description / canonical.

**Entregable:** app trilingüe (ES/EN/PT) con SEO básico y métricas opt-in. ✅
**Esfuerzo:** ~1–2 semanas.

---

## 🧰 Sprint 4 — Features que piden los pilotos

**Objetivo:** Diferenciadores de UX que aparecen una y otra vez en feedback
de pilotos.

- [ ] **Export a PDF** del cálculo (hoja de W&B imprimible para el vuelo).
- [ ] **Unidades métricas** (kg/cm) además de imperiales, con toggle persistido.
- [ ] **Modo oscuro** (útil en cabina).
- [ ] Validar export PDF y unidades con tests.

**Entregable:** export PDF + unidades configurables + dark mode.
**Esfuerzo:** ~2 semanas (el PDF es lo más pesado).

---

## 🏗️ Sprint 5 — Robustez técnica + cimientos de monetización

**Objetivo:** Bajar deuda técnica y dejar lista la base para el modelo
freemium del roadmap.

- [x] Migración incremental a **TypeScript** (type-check vía `checkJs` + JSDoc
      sobre todo `src` —lógica y componentes `.jsx`—, con `src/types.d.ts` del
      dominio y `npm run typecheck` en CI). _Adelantado antes del Sprint 2._
- [ ] Cobertura de tests > 90% en `calculations.js`.
- [ ] **Aeronave custom por matrícula**: el usuario ingresa su peso vacío y
      brazo, se guarda en localStorage (precursor del freemium).
- [ ] Spike de monetización: evaluar LemonSqueezy/Stripe, definir qué es free
      vs. premium (sin cobrar todavía, solo dejar la arquitectura).

**Entregable:** base tipada + aeronave custom + decisión de modelo de negocio.
**Esfuerzo:** ~2 semanas.

---

## Resumen

| Sprint | Tema                       | Driver principal             |
| ------ | -------------------------- | ---------------------------- |
| 1      | Documentación al día       | Base limpia / mantenibilidad |
| 2      | Catálogo de aeronaves      | Valor de producto / tráfico  |
| 3      | i18n (EN/PT) + SEO         | Expansión de mercado         |
| 4      | PDF + métricas + dark mode | UX / retención               |
| 5      | TypeScript + monetización  | Robustez / negocio           |

_Plan vivo: revisar al cierre de cada sprint y reordenar según feedback real de usuarios._
