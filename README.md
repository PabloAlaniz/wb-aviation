# ✈️ wb-aviation - Calculador de Peso y Balance

Aplicación web open source para el cálculo de peso y balance (Weight & Balance) de aeronaves, basada en datos oficiales de la FAA.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![wb-aviation](./public/Captura%20de%20pantalla%202025-08-20%20a%20la(s)%2000.06.41.png)

**Aeronaves soportadas:** King Air E90 (más próximamente)

## 📋 Descripción

Esta herramienta permite calcular el peso total y el centro de gravedad (CG) de una aeronave King Air E90, verificando que se encuentre dentro de los límites operacionales seguros establecidos por el fabricante y la FAA.

El sistema incluye:
- ✅ Cálculo automático de peso total y centro de gravedad
- ✅ Validación contra envolvente de CG oficial
- ✅ Sistema de alertas de seguridad y advertencias
- ✅ Visualización gráfica del envolvente de CG
- ✅ Datos verificados con documentación oficial

## 🚀 Características Principales

### Cálculo de Peso y Balance
- Peso vacío y brazo específicos de aeronave
- Estaciones de carga para tripulación (piloto, copiloto)
- Hasta 4 pasajeros en configuración club
- 2 compartimentos de equipaje
- Cálculo de combustible

### Sistema de Validación
- Verificación de peso máximo (10,100 lbs)
- Validación de límites de CG (144.7" - 160.0")
- Algoritmo de punto en polígono para envolvente irregular
- Márgenes de seguridad configurables

### Alertas de Seguridad
- **Advertencias de peso**: Alerta cuando se acerca al 95% del peso máximo
- **Advertencias de CG**: Notificación de proximidad a límites frontales/posteriores
- **Recomendaciones**: Sugerencias de ajustes para mayor seguridad
- **Confiabilidad de datos**: Indicadores de verificación de información

### Visualización Gráfica
- Gráfico interactivo del envolvente de CG
- Representación del punto operativo actual
- Líneas de referencia de límites
- Tooltips informativos

## 🛠️ Tecnologías Utilizadas

- **React 19.1.1** - Framework UI
- **Vite 7.1.2** - Build tool y dev server
- **Tailwind CSS 4.1.12** - Framework de estilos
- **Recharts 3.1.2** - Librería de gráficos
- **Lucide React 0.540.0** - Sistema de iconos
- **ESLint 9.33.0** - Linter de código

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/PabloAlaniz/wb-aviation.git

# Navegar al directorio
cd wb-aviation

# Instalar dependencias
npm install
```

## 🚀 Uso

### Modo Desarrollo
```bash
npm run dev
```
Inicia el servidor de desarrollo en `http://localhost:5173`

### Build de Producción
```bash
npm run build
```
Genera la versión optimizada en la carpeta `dist/`

### Preview de Producción
```bash
npm run preview
```
Previsualiza el build de producción localmente

### Linting
```bash
npm run lint
```
Ejecuta ESLint para verificar el código

## 📂 Estructura del Proyecto

```
wb-aviation/
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── Badge.jsx      # Componente de badge/etiqueta
│   │   ├── Card.jsx       # Componente de tarjeta
│   │   ├── CGEnvelopeChart.jsx  # Gráfico de envolvente CG
│   │   ├── Input.jsx      # Input personalizado
│   │   ├── Select.jsx     # Select personalizado
│   │   └── Separator.jsx  # Separador visual
│   ├── App.jsx            # Componente principal con lógica
│   └── main.jsx           # Punto de entrada
├── public/                # Recursos estáticos
├── data/                  # Imágenes de referencia del TCDS
├── package.json           # Dependencias y scripts
├── vite.config.js         # Configuración de Vite
├── eslint.config.js       # Configuración de ESLint
└── README.md             # Este archivo
```

## ✈️ Datos de la Aeronave

### King Air Echo 90 (Beechcraft)
- **TCDS**: 3A20 Revision 82 (2024)
- **Fabricante**: Textron Aviation Inc. (anteriormente Beechcraft Corporation)
- **Producción**: 1972-1981 (347 unidades fabricadas)
- **Motores**: 2x Pratt & Whitney PT6A-28 (550 SHP cada uno)
- **Peso vacío**: 6,682 lbs (específico LV-AYG)
- **Peso máximo**: 10,100 lbs
- **Límites de CG**: 144.7" - 160.0" (aft of datum STA 0.0)
- **Altitud máxima**: 28,000 pies
- **Capacidad de combustible**: 474 galones

### Fuentes de Datos
- Manual oficial Beechcraft E90 (LV-AYG)
- FAA TCDS 3A20 Rev 81 (11 mayo 2018)
- Weight & Balance Report específico
- Última verificación: 21 agosto 2024

## ⚠️ Advertencias Importantes

### Disclaimer Legal
**IMPORTANTE**: Esta herramienta es de **referencia general** y no sustituye la documentación oficial de la aeronave.

- ⚠️ Los datos de peso vacío y brazo son **específicos de la aeronave LV-AYG** (S/N: LW-135)
- ⚠️ **Cada aeronave individual** tiene su propio Weight & Balance Report que debe consultarse
- ⚠️ Siempre verificar con el **Weight & Balance Report específico** de su aeronave
- ⚠️ Esta calculadora NO reemplaza los procedimientos operacionales oficiales
- ⚠️ NO utilizar para cálculos operacionales sin verificación oficial

### Uso Recomendado
- Planificación preliminar de vuelos
- Educación y entrenamiento
- Verificación cruzada de cálculos manuales
- Estudio de envolventes de CG

### Seguridad Operacional
Para operaciones reales de vuelo:
1. Consultar el Weight & Balance Report de su aeronave específica
2. Verificar los datos con la documentación oficial vigente
3. Seguir los procedimientos del manual de operaciones (AFM/POH)
4. Cumplir con todas las regulaciones aeronáuticas aplicables

## 🔧 Configuración

### Variables de Aeronave
Los datos de la aeronave están centralizados en `src/App.jsx` en el objeto `aircraftData`. Para agregar nuevas aeronaves o variantes, seguir la estructura existente.

### Factores de Seguridad
```javascript
safetyFactors: {
  weightMargin: 0.95,        // 95% del peso máximo = alerta
  cgMargin: 0.1,             // 0.1" de margen en límites CG
  recommendedReserve: {
    fuel: 200,               // lbs de combustible de reserva
    weight: 200              // lbs de margen de peso
  }
}
```

## 📊 Algoritmo de Validación

El sistema utiliza un algoritmo de **ray casting** (punto en polígono) para determinar si el CG está dentro del envolvente irregular:

```javascript
// Verifica si punto (cg, weight) está dentro del polígono del envolvente
isPointInEnvelope(cg, weight, envelopePoints)
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas, especialmente para:
- Agregar más variantes de King Air
- Mejorar visualizaciones
- Agregar más validaciones de seguridad
- Traducción a otros idiomas
- Mejoras en la documentación

## 📝 Licencia

Este proyecto es de código abierto. Verificar archivo LICENSE para más detalles.

## 📞 Soporte

Para preguntas técnicas o reportar problemas, abrir un issue en el repositorio.

---

## 💡 Roadmap / Oportunidad de Producto

### Contexto de Mercado
- Las apps de W&B existentes son **caras y de mala calidad** (feedback de pilotos reales)
- Oportunidad de disrumpir con una herramienta **gratuita o muy barata ($1-2 USD)**
- Potencial para **marca personal** en comunidad aeronáutica

### Próximos Pasos
1. **Hacer público** el repo (actualmente privado)
2. **Agregar más aeronaves** (Cessna 172, Piper, otros King Air)
3. **PWA / App móvil** para uso offline en cabina
4. **Modelo de negocio**:
   - Gratis: aeronaves genéricas
   - $1-2 USD: aeronaves específicas con datos verificados
   - O 100% libre para marca personal

### Aeronaves Prioritarias a Agregar
- [ ] Cessna 172 (la más común para entrenamiento)
- [ ] Piper PA-28 Cherokee
- [ ] King Air 200/350
- [ ] Beechcraft Baron 58
- [ ] Bombardier Q400

### Features Futuras
- [ ] Persistencia de aeronaves del usuario
- [ ] Modo offline (PWA)
- [ ] Exportar PDF del cálculo
- [ ] Historial de vuelos
- [ ] Multi-idioma (español/inglés/portugués)

---

**Desarrollado para la comunidad aeronáutica** 🛩️

*Última actualización: Enero 2026*
