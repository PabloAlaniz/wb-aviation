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
- [x] Eventos de conversión propios en Cloudflare activos (ver §5).

## 3. Canales automáticos / de bajo costo

| Canal                    | Acción                                                     | Estado |
| ------------------------ | ---------------------------------------------------------- | ------ |
| Google (SEO)             | Search Console + sitemap; una página por aeronave × idioma | ⬜     |
| Guías (content)          | 3 guías por idioma (cómo calcular W&B, momento/brazo, …)   | ⬜     |
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

Eventos de conversión propios (first-party) en **Cloudflare Workers Analytics
Engine**, sin depender de Plausible. `trackEvent()` (`src/analytics.js`) los
manda con `navigator.sendBeacon` a `POST /api/e` (`functions/api/e.js`), solo
desde `checkcg.com` (nunca localhost, previews ni tests). Si Plausible está
configurado, también le llegan.

| Evento                    | Cuándo                                   | Props           |
| ------------------------- | ---------------------------------------- | --------------- |
| `pdf_export`              | Hoja de carga generada                   | `units`         |
| `share_link`              | Link/QR compartido (cálculo o flota)     | `method`/`kind` |
| `fleet_import`            | Flota importada desde un link de escuela | `count`         |
| `custom_aircraft_created` | Matrícula propia nueva                   | `baseModelId`   |
| `shared_link_opened`      | Se abrió un link `?s=`                   | `status`        |
| `fleet_link_opened`       | Se abrió un link `?fleet=`               | `count`         |
| `units_changed`           | Cambio de unidades                       | `units`         |
| `install_pwa`             | PWA instalada (`appinstalled`)           | -               |

**Privacidad:** lista cerrada de eventos, body ≤ 2 KB, ≤ 6 props primitivas
(strings ≤ 64 caracteres). Se guarda evento, path (sin query), idioma, avión,
`ref` y país (de Cloudflare). Nunca IP, user agent, cookies ni identificadores.

**Convención `?ref=`:** todo link de campaña lleva `?ref=<fuente>` en
minúsculas, `[a-z0-9._-]`, máx. 48 caracteres (p. ej. `?ref=flyer-ar`,
`?ref=reddit-flying`, `?ref=school.aeroclub-sf`). También se acepta
`utm_source`. Se guarda en `sessionStorage` (`checkcg-ref`) durante la visita y
se quita de la barra de direcciones (se conservan `s`, `fleet` y el resto).

**Datos:** dataset `checkcg_events` (binding `EVENTS` en `wrangler.toml`).
Columnas: `blob1` evento, `blob2` path, `blob3` idioma, `blob4` avión,
`blob5` ref, `blob6` país, `blob7` props (JSON), `double1` = 1. Retención: 3
meses. Consulta vía SQL API
(`POST https://api.cloudflare.com/client/v4/accounts/{account_id}/analytics_engine/sql`,
token con permiso _Account Analytics Read_):

```sql
SELECT blob1 AS event, blob5 AS ref, SUM(_sample_interval) AS n
FROM checkcg_events
WHERE timestamp > NOW() - INTERVAL '7' DAY
GROUP BY event, ref
ORDER BY n DESC
```

Reporte semanal: una tabla con estrellas de GitHub, eventos por `ref` (SQL de
arriba) y clics/impresiones de Search Console.

## 6. Revisión

Cada 4 semanas: qué canal trajo usuarios que generaron un PDF. Reforzar ese
canal y cortar los que no aportan.
