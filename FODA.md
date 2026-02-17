# FODA - wb-aviation

**Fecha de análisis:** 2026-02-15  
**Analista:** Margarita (AI)

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
   - Vite para desarrollo ágil
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

## 🚧 Debilidades

1. **Single aircraft support**
   - Solo King Air E90 implementado
   - Estructura preparada pero sin más aeronaves

2. **Sin persistencia**
   - No guarda configuraciones del usuario
   - No hay localStorage/IndexedDB
   - Pierde datos al recargar

3. **Sin modo offline**
   - No es PWA todavía
   - Requiere conexión para uso

4. **Sin tests**
   - 0 tests unitarios o de integración
   - Cálculos críticos de seguridad sin cobertura

5. **Deploy pendiente**
   - Repo privado
   - No hay CI/CD configurado
   - Sin hosting en producción

6. **Sin i18n**
   - Solo español
   - Mercado aeronáutico es mayormente en inglés

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

| Dimensión | Score | Notas |
|-----------|-------|-------|
| Fortalezas | ⭐⭐⭐⭐ | Código sólido, datos verificados |
| Debilidades | ⭐⭐⭐ | Falta persistencia, tests, más aeronaves |
| Oportunidades | ⭐⭐⭐⭐⭐ | Mercado desatendido con dolor real |
| Amenazas | ⭐⭐ | Manejables con disclaimers claros |

**Veredicto:** Proyecto con alto potencial de micro-SaaS. El 80% del trabajo core está hecho. Falta el 20% final (PWA, más aeronaves, deploy, monetización) que típicamente es lo que Pablo evita. Recomiendo priorizar este proyecto sobre nuevos.

---

*Análisis generado automáticamente por Margarita*
