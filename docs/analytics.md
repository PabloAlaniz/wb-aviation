# Métricas y privacidad - CheckCG

CheckCG mide solo un puñado de eventos de producto, sin cookies ni
identificadores personales. Este documento explica qué se guarda, cómo y cómo
correr el reporte semanal.

## Eventos

Eventos propios (first-party) en **Cloudflare Workers Analytics Engine**.
`trackEvent()` (`src/analytics.js`) los manda con `navigator.sendBeacon` a
`POST /api/e` (`functions/api/e.js`), solo desde `checkcg.com` (nunca
localhost, previews ni tests). Si Plausible está configurado, también le llegan.

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
| `github_click`            | Click a GitHub (footer o pedir avión)    | `source`        |

## Privacidad

Lista cerrada de eventos, body ≤ 2 KB, ≤ 6 props primitivas (strings ≤ 64
caracteres). Se guarda evento, path (sin query), idioma, avión, `ref` y país
(de Cloudflare). **Nunca** IP, user agent, cookies ni identificadores. Los
pesos cargados y los links compartidos no salen del navegador.

## Parámetro `?ref=`

Los links de origen conocido llevan `?ref=<fuente>` en minúsculas,
`[a-z0-9._-]`, máx. 48 caracteres (p. ej. `?ref=flyer`). También se acepta
`utm_source`. Se guarda en `sessionStorage` (`checkcg-ref`) durante la visita y
se quita de la barra de direcciones (se conservan `s`, `fleet` y el resto).

## Datos

Dataset `checkcg_events` (binding `EVENTS` en `wrangler.toml`). Columnas:
`blob1` evento, `blob2` path, `blob3` idioma, `blob4` avión, `blob5` ref,
`blob6` país, `blob7` props (JSON), `double1` = 1. Retención: 3 meses.
Consulta vía SQL API
(`POST https://api.cloudflare.com/client/v4/accounts/{account_id}/analytics_engine/sql`,
token con permiso _Account Analytics Read_):

```sql
SELECT blob1 AS event, blob5 AS ref, SUM(_sample_interval) AS n
FROM checkcg_events
WHERE timestamp > NOW() - INTERVAL '7' DAY
GROUP BY event, ref
ORDER BY n DESC
```

## Reporte semanal

`scripts/stats.mjs` (Node 22, sin dependencias) imprime en Markdown los
últimos 7 días:

- **GitHub**: estrellas, forks, vistas y clones (total / únicos sumados por día).
- **Cloudflare Web Analytics**: visitas y páginas vistas de checkcg.com
  (GraphQL, dataset `rumPageloadEventsAdaptiveGroups`).
- **Eventos**: conteo por evento (`blob1`) y top refs (`blob5`) del dataset
  `checkcg_events`, con `SUM(_sample_interval)`.

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
