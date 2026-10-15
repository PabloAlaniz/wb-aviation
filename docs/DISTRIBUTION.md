# Playbook de distribución - CheckCG

Basado en la estructura de `google-suite/tools/agent-distribution/PLAYBOOK.md`:
fit → prerequisitos → canales automáticos → envíos manuales → medición.

## 1. Fit

- **Para quién:** alumnos, pilotos privados e instructores, primero en LATAM (ES/PT) y después en el mercado angloparlante.
- **Por qué nos eligen:** gratis, PWA offline en cualquier Android, en su idioma, con aviones de escuela LATAM y la planilla que piden localmente.
- **Contra qué competimos:** ForeFlight/Garmin Pilot (caros, en inglés) y la planilla en papel o Excel de la escuela.

## 2. Prerequisitos (antes de promocionar)

- [x] Aeronave custom + CG de aterrizaje (Sprint 6).
- [x] Hoja de carga PDF + link compartible (Sprint 7).
- [x] Páginas por aeronave/idioma indexables (Sprint 8).
- [ ] OG card real, screenshot/GIF actualizado en el README.
- [x] Marca de autor visible (footer + README) y dominio definitivo (checkcg.com).
- [ ] Eventos de Plausible activos (ver §5).

## 3. Canales automáticos / de bajo costo

| Canal                    | Acción                                                     | Estado |
| ------------------------ | ---------------------------------------------------------- | ------ |
| Google (SEO)             | Search Console + sitemap; una página por aeronave × idioma | ⬜     |
| Guías (content)          | 3 guías por idioma (cómo calcular W&B, momento/brazo, …)   | ✅     |
| GitHub                   | Topics (`aviation`, `weight-and-balance`, `pwa`, `efb`)    | ⬜     |
| Listas awesome           | PR a listas awesome-aviation / awesome-pwa                 | ⬜     |
| npm / agentes (opcional) | `wb-aviation-core` + MCP server / skill                    | ⬜     |

## 4. Envíos y contactos manuales

| Canal                                    | Mercado  | Notas                                         | Estado |
| ---------------------------------------- | -------- | --------------------------------------------- | ------ |
| Escuelas de vuelo (5 piloto)             | AR/UY/BR | Ofrecer modo escuela: flota cargada + link/QR | ⬜     |
| Grupos de aeroclubes (Facebook/WhatsApp) | LATAM    | Post corto + GIF de la hoja de carga          | ⬜     |
| YouTubers instructores (ES/PT)           | LATAM    | Demo con su avión de escuela                  | ⬜     |
| r/flying, Pilots of America              | EN       | "Free offline W&B PWA", pedir feedback        | ⬜     |
| Product Hunt / Show HN                   | Global   | Lanzar con la versión Astro + catálogo        | ⬜     |
| Reviews (iPad Pilot News, AOPA)          | EN       | Contacto cuando haya tracción                 | ⬜     |

## 5. Medición

Eventos de Plausible (cookieless, ya integrado en `src/analytics.js`):

- `pdf_export`: hoja de carga generada.
- `share_link`: link/QR compartido.
- `custom_aircraft_created`: matrícula propia creada.
- `fleet_import`: flota importada desde un link de escuela.

### Guías

Contenido en `src/content/guides/{es,en,pt}/*.md` (colección `guides`,
`src/content.config.ts`); los slugs localizados viven en
`src/content/guides/registry.js` (también alimenta los hreflang del sitemap).
Para agregar una guía: un `.md` por idioma con el mismo `translationKey`, la
entrada en el registry y `npm test` (verifica frontmatter, links internos,
largo 700–1100 palabras y el disclaimer final).

| Guía                  | ES                                        | EN                                                | PT                                              |
| --------------------- | ----------------------------------------- | ------------------------------------------------- | ----------------------------------------------- |
| Cómo calcular W&B     | `/es/guias/como-calcular-peso-y-balance/` | `/en/guides/how-to-calculate-weight-and-balance/` | `/pt/guias/como-calcular-peso-e-balanceamento/` |
| Peso, brazo y momento | `/es/guias/peso-brazo-y-momento/`         | `/en/guides/weight-arm-and-moment/`               | `/pt/guias/peso-braco-e-momento/`               |
| Envolvente de CG      | `/es/guias/envolvente-de-cg/`             | `/en/guides/cg-envelope-explained/`               | `/pt/guias/envelope-de-cg/`                     |

El ejemplo resuelto del Cessna 152 está en `src/content/guides/examples.js` y
`guides.test.js` lo pasa por `calculateWeightBalance`/`calculateFlightPhases`
y busca los resultados en las tres guías: si cambian los datos del 152, el
test obliga a actualizar el texto.

### Reporte semanal

`scripts/stats.mjs` (Node 22, sin dependencias; adaptado de
`google-suite/tools/agent-distribution/stats/stats.py`) imprime en Markdown
los últimos 7 días:

- **GitHub**: estrellas, forks, vistas y clones (total / únicos sumados por día).
- **Cloudflare Web Analytics**: visitas y páginas vistas de checkcg.com
  (GraphQL, dataset `rumPageloadEventsAdaptiveGroups`).
- **Eventos**: Workers Analytics Engine, dataset `checkcg_events` (SQL API):
  conteo por evento (`blob1`) y top refs (`blob5`), con `SUM(_sample_interval)`.

Cada sección muestra `n/d` si faltan credenciales o falla la llamada; los
diagnósticos van a stderr y nunca incluyen secretos.

Local:

```sh
GITHUB_TOKEN=... CLOUDFLARE_API_TOKEN=... CLOUDFLARE_ACCOUNT_ID=... node scripts/stats.mjs
```

Opcionales: `STATS_GITHUB_REPO`, `STATS_SITE_HOST` (default `checkcg.com`) y
`CLOUDFLARE_WEB_ANALYTICS_SITE_TAG` (filtra por site tag en vez de host).

En CI corre `.github/workflows/stats.yml` los lunes 12:00 UTC (y a mano con
_Run workflow_) y deja la tabla en el resumen del run. Secrets del repo:

| Secret                  | Para qué                                                                                                                                                                                                                          |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARE_API_TOKEN`  | Token con **Account › Account Analytics › Read** (Web Analytics GraphQL + Analytics Engine SQL).                                                                                                                                  |
| `CLOUDFLARE_ACCOUNT_ID` | ID de la cuenta de Cloudflare.                                                                                                                                                                                                    |
| `STATS_GITHUB_TOKEN`    | Opcional. PAT fine-grained solo para este repo con **Administration: read**: la API de tráfico lo exige y el `GITHUB_TOKEN` del workflow no puede tenerlo. Sin él, vistas/clones salen `n/d` (estrellas y forks funcionan igual). |

## 6. Revisión

Cada 4 semanas: qué canal trajo usuarios que generaron un PDF. Reforzar ese
canal y cortar los que no aportan.
