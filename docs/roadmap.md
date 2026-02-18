# ROADMAP - wb-aviation

**Última actualización:** 2026-02-15  
**Prioridad recomendada:** 🔴 Alta (proyecto al 80%, falta cerrar)

---

## 🎯 Visión

Ser LA calculadora de peso y balance gratuita/barata para pilotos privados y escuelas de vuelo en LATAM y mercado angloparlante.

---

## 📅 Fase 1: MVP Público (2-3 semanas)

**Objetivo:** Salir a producción con lo que hay + 1-2 aeronaves más.

### Must Have

- [ ] **Hacer repo público** ⏱️ 5 min
- [ ] **Deploy a Cloudflare Pages** ⏱️ 30 min
  - Ya tiene Vite, deploy directo
  - URL: wb-aviation.pages.dev o similar
- [ ] **Agregar Cessna 172** ⏱️ 2-4 horas
  - La aeronave más común para entrenamiento
  - Datos TCDS públicos disponibles
- [ ] **PWA básico** ⏱️ 2 horas
  - Manifest.json
  - Service worker para offline
  - Icon para home screen

### Nice to Have

- [ ] Agregar Piper PA-28 Cherokee
- [ ] Open Graph tags para preview en redes
- [ ] Google Analytics / Plausible

---

## 📅 Fase 2: Estabilización (1 mes)

**Objetivo:** Tests, feedback de usuarios reales, iteración.

### Must Have

- [ ] **Tests unitarios para cálculos** ⏱️ 4-6 horas
  - Vitest ya es compatible con Vite
  - Testear `isPointInEnvelope`
  - Testear cálculos de momento y CG
- [ ] **Compartir con Juan** (hermano piloto)
  - Feedback de usuario real
  - Verificación de cálculos con su experiencia Q400
- [ ] **Persistencia local** ⏱️ 2-3 horas
  - localStorage para últimos valores usados
  - Recordar aeronave seleccionada

### Nice to Have

- [ ] Export a PDF del cálculo
- [ ] Modo oscuro
- [ ] Unidades métricas (kg, cm) además de imperiales

---

## 📅 Fase 3: Monetización (2-3 meses)

**Objetivo:** Validar modelo de negocio.

### Explorar

- [ ] **Catálogo expandido** (5-10 aeronaves)
  - King Air 200/350
  - Beechcraft Baron 58
  - Pilatus PC-12
  - Aeronaves de entrenamiento populares
  
- [ ] **Modelo freemium**
  - Gratis: 2-3 aeronaves genéricas
  - $2-5 USD one-time: Desbloquear todas
  - Stripe/LemonSqueezy para pagos

- [ ] **Aeronaves custom por matrícula**
  - Usuario ingresa su peso vacío y brazo
  - Guarda en cuenta
  - Potencial suscripción $5/mes para pilotos serios

---

## 📅 Fase 4: Escala (6+ meses)

**Objetivo:** Crecimiento y comunidad.

### Ideas

- [ ] Multi-idioma (inglés, portugués)
- [ ] API para integraciones
- [ ] Mobile app nativa (Capacitor/React Native)
- [ ] Historial de vuelos con W&B
- [ ] Integración con EFBs (Electronic Flight Bags)
- [ ] Contribuciones comunitarias de datos

---

## 🛠️ Deuda Técnica

| Item | Prioridad | Esfuerzo |
|------|-----------|----------|
| Sin tests | Alta | 4-6h |
| Sin TypeScript | Media | 4-8h |
| Sin CI/CD | Media | 1h |
| Componentes sin PropTypes | Baja | 2h |

---

## 📈 Métricas de Éxito

### Fase 1
- [ ] Repo público ✓
- [ ] Deploy en producción ✓
- [ ] >100 visitas en primer mes
- [ ] >5 estrellas en GitHub

### Fase 2
- [ ] >500 visitas/mes
- [ ] >10 usuarios activos semanales
- [ ] 0 bugs reportados en cálculos

### Fase 3
- [ ] >50 USD en revenue (validación)
- [ ] >1000 usuarios registrados
- [ ] Aparición en comunidad de aviación

---

## 🔗 Referencias

- [TCDS 3A20 - FAA](https://rgl.faa.gov/Regulatory_and_Guidance_Library/rgMakeModel.nsf/0/...)
- [POH King Air E90](referencia interna)
- Competencia: ForeFlight, Garmin Pilot

---

*Roadmap generado automáticamente por Margarita. Revisar con Pablo para priorización final.*
