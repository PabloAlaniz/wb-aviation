# Roadmap - CheckCG

Lo que viene, sin fechas. Las sugerencias son bienvenidas en
[issues](https://github.com/PabloAlaniz/wb-aviation/issues).

## Entregado

- Calculadora multi-aeronave con envolvente de CG, alertas y PWA offline.
- Español, inglés, portugués, italiano, francés y alemán (francés y alemán pendientes de
  revisión por hablantes nativos).
- Aeronave propia por matrícula, kg/lbs, gal/L, CG de aterrizaje y sin combustible.
- Combustible de rodaje con condición de rampa y peso máximo de rampa.
- Pesos estándar editables (tripulante, adulto, niño) con carga de un toque.
- Aeronaves agrupadas en livianas (hasta 5 plazas) y de 6 plazas o más.
- Gráfico de conversiones rápidas de combustible (AVGAS y Jet A) en la hoja de carga y guía con conversor.
- Hoja de carga imprimible / PDF, link y QR para compartir, import de flota para escuelas.
- Página por aeronave e idioma y guías de peso y balance.
- Glosario y página de metodología y fuentes por idioma.
- SEO: datos estructurados enlazados (WebSite, Dataset, Article, DefinedTermSet), sitemap
  con `lastmod`, página 404, `llms.txt`, IndexNow y manifest PWA por idioma.
- Márgenes de carga: carga disponible, combustible que todavía se puede cargar (y qué
  límite lo frena) y combustible al aterrizar.
- Máximo por estación (equipaje, combustible utilizable) validado en el veredicto, y
  márgenes de CG medidos contra la envolvente al peso actual.
- Cargas guardadas por aeronave (solo, doble comando, cabina completa) para aplicar con
  un toque.
- Sugerencias para volver a los límites: cuánto sobra o cuánto se corrió el CG, y el
  cambio mínimo de equipaje o combustible que lo corrige.
- Recorrido del CG en el gráfico de la envolvente: carga estación por estación, curva real
  de consumo hasta sin combustible, líneas de MLW/MZFW y chequeo de que el CG no salga de
  la envolvente en vuelo.
- Headers de seguridad (CSP, HSTS y demás) en todas las respuestas, y actualizaciones de
  dependencias agrupadas con Dependabot.
- 12 aeronaves: King Air E90, King Air B200 (ejecutivo y sanitario), Beech 1900D,
  Cessna 172S y 152, Piper PA-28-161 y PA-38, Tecnam P2008 JC y P2002 JF,
  Diamond DA20-C1 y DA40.

## Próximo

- Verificar B200 y 1900D contra el POH (hoy cargados desde planillas de operador).
- Tabla de momentos de combustible por cantidad (turbohélices).
- Confirmar MLW/MZFW del King Air E90.
- Más aeronaves de escuela, según pedidos y disponibilidad de datos verificables.

## Más adelante

Ideas que surgen de comparar con lo que ya es habitual en este tipo de calculadoras:

- Envolvente de categoría utilitaria además de la normal, en los modelos que la tienen.
- Aeronave propia desde cero (estaciones y envolvente cargadas por el usuario), para
  modelos que no están en el catálogo.
- Secuencia de consumo por tanque (hoy el consumo es proporcional entre tanques).
- Content Security Policy sin `'unsafe-inline'` (hashes de los scripts que inyecta Astro).
- Historial de hojas de carga generadas en el dispositivo.
- Márgenes y sugerencias también en la hoja de carga impresa.
