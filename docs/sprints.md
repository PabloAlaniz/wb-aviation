# Plan de Sprints - CheckCG (ex wb-aviation)

**Fecha de replanificación:** 2026-10-14 (plan original: 2026-06-14)
**Estado del proyecto:** En producción en [checkcg.com](https://checkcg.com/) (antes `wb-aviation.pages.dev`, redirige con 301). 9 aeronaves, Astro + PWA, ES/EN/PT, ~500 tests + CI.
**Duración sugerida por sprint:** 1–2 semanas.

> Este replan incorpora un benchmark de herramientas W&B comerciales y open
> source, y suma **distribución** como eje propio (aprendizaje del repo
> `google-suite`). Los sprints 2, 4 y 5 originales quedan absorbidos en 6–8.

---

## Snapshot del estado actual (2026-10-15)

| Área               | Estado | Detalle                                                                                                        |
| ------------------ | ------ | -------------------------------------------------------------------------------------------------------------- |
| Aeronaves          | ✅     | 9 (E90, C172S, C152, PA-28-161, PA-38, P2008 JC, P2002 JF, DA20, DA40)                                         |
| Aeronave custom    | ✅     | Por matrícula, varias, persistidas en localStorage                                                             |
| CG de aterrizaje   | ✅     | Fuel burn → aterrizaje y zero-fuel, MLW/MZFW si están declarados                                               |
| Unidades métricas  | ✅     | lbs/in ↔ kg/mm, combustible en gal/L                                                                           |
| Export PDF / share | ✅     | Hoja de carga imprimible, link `?s=` + QR, flota `?fleet=`                                                     |
| SEO                | 🟡     | Astro: página por aeronave × idioma, JSON-LD, hreflang, sitemap. Falta Search Console, guías y OG por aeronave |
| Dominio / marca    | ✅     | checkcg.com, marca CheckCG                                                                                     |
| Medición           | ✅     | Cloudflare Web Analytics + Search Console (desde 2026-10-15)                                                   |
| Distribución       | 🔴     | Playbook escrito, sin ejecutar                                                                                 |
| Monetización       | ⏸️     | Diferida hasta tener tracción                                                                                  |

---

## Benchmark (2026-10)

| Herramienta                 | Modelo                    | Notas relevantes                                               |
| --------------------------- | ------------------------- | -------------------------------------------------------------- |
| ForeFlight                  | US$130–390/año            | Perfiles custom, envelope, integrado al plan de vuelo          |
| Garmin Pilot                | ~US$210/año (premium)     | Diagrama táctil del avión, CG de aterrizaje, export load sheet |
| FltPlan Go                  | Gratis                    | 450–800+ perfiles, flota compartida, offline                   |
| SkyDemon                    | Suscripción               | Múltiples tanques                                              |
| AvareX                      | Gratis, OSS               | Envelope interactivo                                           |
| Aviatize W&B calculator     | Gratis (web)              | 8 aviones de escuela; lead magnet para su software             |
| TippingPoint                | Gratis, OSS (self-hosted) | Categorías Normal/Utility, lb/kg, gal/L                        |
| Apps de un solo tipo (C152) | US$2–17                   | Alertas de sobrepeso, % MAC, performance                       |

**Table stakes que nos faltan:** aeronave custom (pesaje real del avión),
kg/L, fuel burn → CG de aterrizaje, múltiples matrículas.

**Hueco de mercado:** no encontramos ninguna herramienta W&B en español o
portugués ni con aeronaves LATAM (Aero Boero, Tecnam P2002/P2008, PA-38, DA20,
Paulistinha). Tampoco planillas imprimibles al estilo de la autoridad local
(DINACIA/ANAC) ni un "modo escuela".

**Cómo se distribuyen:** app stores, una página SEO por modelo, escuelas (flota
compartida que llega a cada alumno), reviews (AOPA, iPad Pilot News), foros y
YouTube.

### Las 3 mejoras de mayor impacto

1. **Paridad de producto:** aeronave custom + unidades métricas + CG de aterrizaje.
2. **Hoja de carga PDF + link/QR compartible:** útil para el piloto y motor viral vía instructores.
3. **Catálogo LATAM + una página SEO por aeronave e idioma:** moat de contenido y tráfico orgánico.

---

## ✅ Completados

- **Sprint 1 — Documentación al día:** README, FODA, CONTRIBUTING, roadmap → sprints.
- **Sprint 3 — i18n + SEO básico:** ES/EN/PT, detección de idioma, OG/Twitter, sitemap/robots, Plausible opt-in.
- **Type-check (ex Sprint 5):** `checkJs` + JSDoc sobre todo `src`, `npm run typecheck` en CI.
- **Sprint 6 — Paridad de producto** (PR #9): aeronave custom, unidades, CG de aterrizaje, labels traducidos.
- **Sprint 7 — Motor viral** (PR #10): hoja de carga PDF, link + QR, modo escuela, footer de marca.
- **Sprint 8 — Astro + catálogo LATAM** (PR #11): páginas por aeronave × idioma, 7 aeronaves nuevas, ticks/leyenda, fix del borde de la envolvente y del precache del SW. Aero Boero omitido (sin manual ni caso de carga verificable).

---

## 🧮 Sprint 6 — Paridad de producto (custom + métricas + aterrizaje) — ✅

**Objetivo:** cerrar los table stakes que tiene toda la competencia.

- [x] **Aeronave custom por matrícula:** peso vacío, brazo y envelope base clonado de un modelo. Persistida en `useLocalStorage`, con varias matrículas.
- [x] **Unidades:** toggle lbs/in ↔ kg/mm y combustible en gal/L (densidad AVGAS). La conversión vive en la UI y `calculations.js` sigue en imperial.
- [x] **Fuel burn:** CG de aterrizaje y zero-fuel reutilizando `calculateWeightBalance`. `CGEnvelopeChart` dibuja el segmento entre despegue y aterrizaje.
- [x] Traducir los labels de estaciones de `src/data/aircraft.js` con claves i18n.
- [x] Tests de conversión de unidades y de CG de aterrizaje.

**Entregable:** el piloto usa los datos de **su** avión, en sus unidades, y ve despegue y aterrizaje.

---

## 📄 Sprint 7 — Hoja de carga + compartir (motor viral) — ✅

**Objetivo:** que cada cálculo pueda salir de la app y traer usuarios nuevos.

- [x] Estado de carga codificado en la URL (`?a=c172s&w=...`) + botón compartir (Web Share API + QR).
- [x] **Hoja de carga imprimible/PDF:** primero `@media print` sin dependencias y jsPDF solo si hace falta. Incluye matrícula, piloto, aeródromos, tabla de estaciones, envelope y firma, con formato inspirado en la planilla de DINACIA.
- [x] **Modo escuela v0:** un link de flota que importa varias matrículas custom de una vez.
- [x] Footer de marca personal ("Hecho por Pablo Alaniz", GitHub/portfolio, contacto para escuelas).

**Entregable:** PDF de vuelo + links compartibles + import de flota.

---

## 🧱 Decisión de stack para SEO: Astro con React como isla

Hoy la app es una SPA Vite sin router (`src/main.jsx` monta `<App/>` en `#root`),
así que el crawler solo ve el `<head>`.

| Opción                                | SEO                                      | Costo                        | Veredicto      |
| ------------------------------------- | ---------------------------------------- | ---------------------------- | -------------- |
| Vite SPA + pre-render casero          | Bien, pero hreflang/sitemap a mano       | Bajo al inicio, alto después | ❌             |
| `vite-react-ssg` / `vite-plugin-ssg`  | Bien                                     | Bajo                         | Plan B         |
| Next.js static export                 | Bien                                     | Medio-alto, más JS           | ❌             |
| **Astro (static) + `@astrojs/react`** | HTML real por página, i18n, sitemap, MDX | Medio-bajo (~15 componentes) | ✅ Recomendado |

- Astro corre sobre Vite: Tailwind 4, Vitest y los componentes React quedan sin cambios. El PWA sigue con `@vite-pwa/astro`.
- La calculadora pasa a ser `<App client:only="react" />`, porque `useLocalStorage` lee `window`.
- Alrededor de la isla va contenido estático indexable: descripción, tabla de estaciones/brazos, límites, fuentes TCDS y FAQ.
- Habilita guías en `src/content/guides/{es,en,pt}/*.mdx` ("cómo calcular peso y balance", "momento y brazo explicado").

**Pasos de migración** (PR propio, al inicio del Sprint 8):

1. `astro.config.mjs`: `output: 'static'`, integraciones react + sitemap + vite-pwa, `i18n` con `es` (default), `en` y `pt`.
2. `index.html` → `src/layouts/Base.astro` (meta, OG, hreflang, JSON-LD, `initAnalytics`).
3. `src/pages/[lang]/[aircraft].astro` con `getStaticPaths()` sobre `aircraft.js` × locales, `src/pages/[lang]/index.astro`, y redirect desde `/` según el idioma.
4. `App.jsx` recibe `initialAircraft` y `locale` por props.
5. Scripts `dev/build/preview` → `astro …`; config de Vitest separada (`getViteConfig`); `astro check` + `tsc`.
6. Cloudflare Pages: build `npm run build`, output `dist`.

**Criterio de salida:** tests actuales en verde, la app funciona igual en
`/es/cessna-172s`, y `curl` devuelve el H1 y la tabla de estaciones en el HTML.

---

## ✈️ Sprint 8 — Catálogo LATAM + SEO programático (sobre Astro) — ✅

**Objetivo:** ser el resultado de búsqueda para "peso y balance {aeronave}" en ES/PT.

- [x] Migración a Astro (ver sección anterior).
- [x] Aeronaves: C152, PA-28, PA-38, Tecnam P2002/P2008 y DA20/DA40 (Aero Boero omitido), con TCDS citado y `dataReliability` honesto.
- [x] Tests por aeronave contra un ejemplo del POH.
- [x] Página por aeronave × idioma con title/description/H1 propios, JSON-LD (`SoftwareApplication`, `HowTo`, `FAQPage`), hreflang y canonical.
- [ ] 3 guías iniciales por idioma.
- [x] Sitemap con `@astrojs/sitemap` (reemplaza `public/sitemap.xml`).
- [ ] OG card real por aeronave (1200×630) y manifest PWA multilenguaje.
- [ ] Limpieza: comprimir el screenshot de `public/`, borrar `vite.svg` y las imágenes sin uso.
- [ ] Search Console: dar de alta la propiedad y enviar el sitemap.

**Entregable:** ~10 aeronaves × 3 idiomas indexables + guías.

---

## 🌐 Decisión de dominio y marca: checkcg.com / CheckCG (2026-10-15)

Dos análisis en paralelo (SEO y marca) descartaron `wb-aviation.com`:

- Google no da bonus por keywords en el dominio (EMD); manda el contenido por página.
- "wb" no se entiende en ES/PT; guion; confundible con la app paga "Aviation W&B Calculator"; `wbaviation.com` es de otro dueño.
- **CheckCG**: "CG" es igual en ES/PT/EN y "check" es vocabulario de piloto; `.com` sin guion; sin conflictos encontrados.
- gTLD + subdirectorios `/es/ /pt/ /en/` con hreflang (un ccTLD como `.com.ar` geolocalizaría en Argentina).
- `wb-aviation.pages.dev` y `www.checkcg.com` redirigen con 301 a `checkcg.com` (`functions/_middleware.js`); previews con `X-Robots-Tag: noindex`.
- Claves de localStorage (`wb-*`) y formatos de link `?s=`/`?fleet=` sin cambios.

---

## 🛫 Próximo — Cierre del Sprint 8 + aeronaves de Flytec

- [x] Search Console: propiedad de dominio `checkcg.com` verificada por DNS (TXT) y sitemap enviado (2026-10-15). El cambio de dirección no aplica: pages.dev redirige todo con 301 y no se puede verificar; Google sigue los 301.
- [x] Analytics: Cloudflare Web Analytics activo (2026-10-15).
- [ ] **King Air B200** y **Beech 1900D** (flota de Flytec, Salta) desde el TCDS público; validar con el W&B Report real cuando llegue.
- [ ] Confirmar MLW/MZFW del King Air E90 (LV-AYG).
- [ ] 3 guías por idioma, OG card por aeronave.
- [x] Limpieza de `public/`: captura de 5 MB reemplazada por `docs/screenshot.jpg`.

---

## 📣 Sprint 9 — Distribución

**Objetivo:** llevar usuarios de forma medible. Detalle en [DISTRIBUTION.md](DISTRIBUTION.md).

- [x] Dominio propio: checkcg.com.
- [ ] Lanzamientos: Product Hunt / Show HN, r/flying, Pilots of America.
- [ ] LATAM: grupos de aeroclubes, contacto con 5 escuelas (AR/UY/BR) y YouTubers instructores.
- [ ] Eventos de Plausible: `pdf_export`, `share_link`, `custom_aircraft_created`, `fleet_import`.
- [ ] Reporte semanal de métricas por canal (portado de `google-suite`).
- [ ] Opcional: `wb-aviation-core` en npm + MCP server / skill (en `google-suite`, el canal de agentes fue el que más instalaciones trajo).

**Entregable:** playbook ejecutado + tablero semanal por canal.

---

## ⏸️ Diferido — Monetización

Se evalúa cuando el modo escuela tenga tracción. Candidato natural a premium:
flota sincronizada para escuelas (LemonSqueezy/Stripe).

---

## Resumen

| Sprint | Tema                           | Driver principal         |
| ------ | ------------------------------ | ------------------------ |
| 1 ✅   | Documentación al día           | Mantenibilidad           |
| 3 ✅   | i18n (EN/PT) + SEO básico      | Expansión de mercado     |
| 6 ✅   | Custom + métricas + aterrizaje | Paridad con competidores |
| 7 ✅   | PDF + compartir + modo escuela | Retención / viralidad    |
| 8 ✅   | Astro + catálogo LATAM + SEO   | Tráfico orgánico / moat  |
| 8.5    | Medición + B200/1900D + guías  | Medir + caso real        |
| 9      | Distribución + métricas        | Adquisición              |

_Plan vivo: revisar al cierre de cada sprint y reordenar según feedback real de usuarios._
