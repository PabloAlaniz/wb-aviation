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

Eventos de Plausible (cookieless, ya integrado en `src/analytics.js`):

- `pdf_export`: hoja de carga generada.
- `share_link`: link/QR compartido.
- `custom_aircraft_created`: matrícula propia creada.
- `fleet_import`: flota importada desde un link de escuela.

Reporte semanal (portar `google-suite/tools/agent-distribution/stats/stats.py`
y su workflow `agent-stats.yml`): una tabla con estrellas de GitHub, visitas y
eventos de Plausible y clics/impresiones de Search Console.

## 6. Revisión

Cada 4 semanas: qué canal trajo usuarios que generaron un PDF. Reforzar ese
canal y cortar los que no aportan.
