# FODA - CheckCG (ex wb-aviation)

**Fecha de análisis:** 2026-10-15 (revisión: dominio checkcg.com, Astro, 9 aeronaves)
**Revisión anterior:** 2026-06-14
**Análisis original:** 2026-02-15

---

## 💪 Fortalezas

1. **Código limpio y bien estructurado**
   - React moderno (19.1.1) con hooks
   - Componentes reutilizables bien organizados
   - Manejo de datos centralizado en `aircraftData`

2. **Datos verificados con fuentes oficiales**
   - TCDS #3A20 de la FAA
   - Manual oficial Beechcraft E90 (LV-AYG específico)
   - Weight & Balance Report específico

3. **Sistema de validación robusto**
   - Algoritmo ray casting para envolvente irregular
   - Alertas de seguridad por niveles (high/medium/low)
   - Márgenes de seguridad configurables

4. **Stack moderno y rápido**
   - Astro (HTML estático por aeronave e idioma) con React como isla
   - Tailwind CSS 4 para estilos
   - Recharts para visualización

5. **Disclaimers legales claros**
   - Advierte sobre uso de referencia
   - Indica que datos son específicos de aeronave ejemplo

6. **Visualización gráfica del envolvente**
   - Gráfico interactivo con Recharts
   - Punto operativo actual visible
   - Tooltips informativos

---

## ✅ Debilidades ya resueltas (desde el análisis de febrero)

- **Persistencia** → resuelto con `useLocalStorage` (carga + aeronave).
- **Modo offline** → resuelto: PWA instalable con `@vite-pwa/astro`.
- **Sin tests** → resuelto: ~79 tests, ~88% de cobertura.
- **Deploy / CI/CD** → resuelto: Cloudflare Pages + workflow de CI.
- **Dominio y marca** → resuelto: [checkcg.com](https://checkcg.com) con Search Console y Web Analytics.
- **Single aircraft** → parcialmente: ya son 2 aeronaves (King Air E90 + Cessna 172S).

## 🚧 Debilidades vigentes

1. **Catálogo aún corto**
   - 2 aeronaves; el valor crece con cada modelo verificado.
   - La arquitectura data-driven facilita sumar más.

2. **i18n incompleto** _(resuelto)_
   - Trilingüe español/inglés/portugués con selector y detección de navegador.

3. **Sin export ni unidades métricas**
   - No hay PDF imprimible del cálculo.
   - Solo unidades imperiales (lbs/in), sin kg/cm.

4. **Deuda técnica de tipos** _(resuelto)_
   - Type-check con TypeScript (`checkJs` + JSDoc, `strict`) sobre todo `src`:
     lógica crítica (`utils/`, `data/`, `hooks/`, `i18n/`) y componentes
     (`.jsx`), con `src/types.d.ts` del dominio y `npm run typecheck` en CI.

5. **Métricas de uso / SEO** _(base lista)_
   - SEO básico: Open Graph + Twitter Card, `sitemap.xml`, `robots.txt`,
     canonical y meta description.
   - Analytics privacy-friendly (Plausible) opt-in vía `VITE_PLAUSIBLE_DOMAIN`;
     resta activarlo en producción con la cuenta del sitio.

---

## 🚀 Oportunidades

1. **Mercado desatendido**
   - Apps de W&B existentes son caras y de mala calidad (feedback real de pilotos)
   - Espacio para disrumpir con algo gratuito/barato

2. **Modelo freemium viable**
   - Gratis: aeronaves genéricas
   - $1-2 USD: aeronaves específicas con datos verificados
   - Potencial recurrente si se agregan features premium

3. **PWA para uso en cabina**
   - Pilotos necesitan offline
   - Mobile-first para tablets en cockpit
   - Diferenciador vs competencia

4. **Expansión de catálogo**
   - Cessna 172 (la más común para entrenamiento)
   - Piper PA-28 Cherokee
   - Otros King Air (200/350)
   - Cada aeronave = potencial monetización

5. **Marca personal de Pablo**
   - Hermano piloto (Juan, FlyTec/Q400)
   - Conexión real con la comunidad aeronáutica
   - Potencial para artículo en Medium

6. **Exportación de cálculos**
   - PDF para documentación de vuelo
   - Historial de cálculos
   - Integración con logbooks

---

## ⚠️ Amenazas

1. **Responsabilidad legal**
   - Cálculos de seguridad críticos
   - Disclaimers protegen pero no eliminan riesgo
   - Posible requerimiento de certificación

2. **Datos específicos por aeronave**
   - Cada matrícula tiene su propio W&B report
   - Difícil escalar datos verificados
   - Usuarios podrían usar datos incorrectos

3. **Competencia establecida**
   - ForeFlight (pero muy caro)
   - Apps específicas de fabricantes
   - Excel/spreadsheets gratis

4. **Actualizaciones de datos oficiales**
   - TCDS se actualiza periódicamente
   - Requiere mantenimiento de datos
   - Sin automatización de actualizaciones

5. **Nicho pequeño**
   - Pilotos privados son mercado limitado
   - Aerolíneas usan software interno
   - Escuela de vuelo es el sweet spot

---

## 📊 Resumen Ejecutivo

| Dimensión     | Score      | Notas                                         |
| ------------- | ---------- | --------------------------------------------- |
| Fortalezas    | ⭐⭐⭐⭐⭐ | Código sólido, datos verificados, tests + PWA |
| Debilidades   | ⭐⭐       | Catálogo corto, i18n incompleto, sin export   |
| Oportunidades | ⭐⭐⭐⭐⭐ | Mercado desatendido con dolor real            |
| Amenazas      | ⭐⭐       | Manejables con disclaimers claros             |

**Veredicto:** El MVP público ya está entregado (PWA, persistencia, tests, CI/CD, deploy, 9 aeronaves, dominio propio). El foco se mueve de "terminar el core" a **crecer**: más aeronaves, internacionalización (inglés), features de UX (PDF, métricas) y validar monetización. Ver el plan en [docs/sprints.md](./docs/sprints.md).

---

_Análisis original generado por Margarita; revisión de junio 2026._
