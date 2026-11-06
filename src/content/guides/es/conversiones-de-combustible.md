---
title: "Conversiones de combustible: litros, galones, libras y kilos"
description: "Tablas de conversión de AVGAS y Jet A entre litros, galones US e imperiales, libras y kilos, con un conversor, ejemplos resueltos y los errores más comunes."
lang: es
translationKey: fuel-conversions
slug: conversiones-de-combustible
updated: 2026-11-05
tool: fuel-converter
faq:
  - q: "¿Cuánto pesa un litro de AVGAS?"
    a: "Con la densidad convencional de 6 lb por galón US, un litro de AVGAS pesa unas 1,59 lb, es decir 0,72 kg. La densidad real cambia con la temperatura, por eso el POH indica el valor a usar."
  - q: "¿Cuánto pesa un litro de Jet A?"
    a: "Con 6,7 lb por galón US, un litro de Jet A pesa unas 1,77 lb, o 0,80 kg. Es alrededor de un 12% más pesado que el mismo volumen de AVGAS."
  - q: "¿Cuál es la diferencia entre el galón US y el galón imperial?"
    a: "El galón US tiene 3,785 litros y el imperial 4,546 litros: el imperial es un 20% más grande. Los POH de aviones norteamericanos usan galones US."
---

En peso y balance el combustible se **carga por volumen** pero **cuenta por peso**. En la plataforma te lo venden en litros, el POH lo indica en galones y la planilla de carga lo suma en libras o kilos. Pasar de una unidad a otra es simple, pero un factor equivocado mueve el peso total y el CG tanto como un pasajero de más.

Arriba tenés un **conversor**: elegí el combustible, escribí la cantidad y te muestra el resto de las unidades.

## Volumen y peso: la densidad

Para pasar de volumen a peso hace falta la **densidad** del combustible. En peso y balance se usan valores convencionales:

- **AVGAS 100LL**: 6,0 lb por galón US, unos **0,72 kg por litro** (gravedad específica 0,72).
- **Jet A / Jet A-1**: 6,7 lb por galón US, unos **0,80 kg por litro**.

La densidad real cambia con la temperatura: el combustible frío pesa un poco más por litro. Por eso el valor que manda es el de tu POH/AFM; si indica otro, usá ese.

Las conversiones entre volúmenes (litros y galones) y entre pesos (libras y kilos) no dependen del combustible: 1 galón US = 3,785 L, 1 galón imperial = 4,546 L y 1 kg = 2,205 lb.

## Tabla de AVGAS

Cada fila dice cuánto vale **una** unidad en cada columna. Por ejemplo, 1 galón US de AVGAS son 3,79 L, 6,00 lb o 2,72 kg.

| 1 unidad     | gal US | gal imp. |     L |   lb |    kg |
| ------------ | -----: | -------: | ----: | ---: | ----: |
| **gal US**   |      1 |    0,833 |  3,79 | 6,00 |  2,72 |
| **gal imp.** |   1,20 |        1 |  4,55 | 7,21 |  3,27 |
| **L**        |  0,264 |    0,220 |     1 | 1,59 | 0,719 |
| **lb**       |  0,167 |    0,139 | 0,631 |    1 | 0,454 |
| **kg**       |  0,367 |    0,306 |  1,39 | 2,20 |     1 |

## Tabla de Jet A

Mismo formato, con 6,7 lb por galón US. Esta es la que corresponde a turbohélices como el [King Air B200](/es/king-air-b200/) o el King Air E90.

| 1 unidad     | gal US | gal imp. |     L |   lb |    kg |
| ------------ | -----: | -------: | ----: | ---: | ----: |
| **gal US**   |      1 |    0,833 |  3,79 | 6,70 |  3,04 |
| **gal imp.** |   1,20 |        1 |  4,55 | 8,05 |  3,65 |
| **L**        |  0,264 |    0,220 |     1 | 1,77 | 0,803 |
| **lb**       |  0,149 |    0,124 | 0,565 |    1 | 0,454 |
| **kg**       |  0,329 |    0,274 |  1,25 | 2,20 |     1 |

La hoja de carga de la calculadora imprime el gráfico de conversiones con los factores del combustible del avión elegido.

## Ejemplos resueltos

### Cessna 152: 60 litros de AVGAS

Cargaste 60 L en el aeroclub y necesitás el peso para la planilla del [Cessna 152](/es/cessna-152/), que trabaja en galones y libras:

- 60 L ÷ 3,785 = **15,85 gal US**
- 15,85 gal × 6 lb/gal = **95,1 lb**
- 95,1 lb ÷ 2,205 = **43,1 kg**

Atajo con la tabla: 60 L × 1,59 = 95 lb. La diferencia con el cálculo largo es solo de redondeo.

### King Air: 800 litros de Jet A

- 800 L × 1,77 = **1416 lb** (642 kg).

Si por error usaras la densidad de AVGAS, te darían 1268 lb: **148 lb menos** de lo que realmente cargaste. Es el peso de un pasajero que no figura en la planilla, con su efecto sobre el CG.

## Cuentas rápidas de cabeza

Para chequear un número en la plataforma, sin calculadora:

- **AVGAS**: litros × 1,6 ≈ libras; litros × 0,72 ≈ kilos; galones US × 6 = libras.
- **Jet A**: litros × 1,8 ≈ libras; litros × 0,8 ≈ kilos; galones US × 6,7 = libras.
- **Kilos a libras**: duplicá y sumale el 10% (50 kg → 100 + 10 = 110 lb).

Sirven para detectar un error grosero, no para la planilla.

## Errores comunes

- **Galón imperial en lugar de US.** Son 4,546 L contra 3,785 L. Si convertís 40 galones imperiales como si fueran US, te faltan unas 48 lb de AVGAS.
- **Densidad de AVGAS para Jet A.** El Jet A pesa alrededor de 12% más por litro. En un turbohélice con mucho combustible, el error llega a cientos de libras.
- **Mezclar kilos y libras.** El factor es 2,2: anotar 100 kg como 100 lb deja afuera 120 lb.
- **Combustible total y usable.** El POH distingue el combustible total del usable; el no usable suele estar incluido en el peso vacío. Revisá cuál corresponde antes de sumar.
- **Redondear demasiado.** Para una estimación rápida alcanza con los factores de la tabla; para la planilla, hacé la cuenta con los valores completos o usá la calculadora.

## En la calculadora

En [CheckCG](/es/) el combustible se puede cargar **por peso o por volumen** (galones o litros), y la conversión usa la densidad del combustible de cada avión: AVGAS para los aviones de pistón y Jet A para los turbohélices. Si querés repasar cómo entra ese peso en el cálculo del centro de gravedad, mirá [Peso, brazo y momento](/es/guias/peso-brazo-y-momento/).

> **Importante:** esta guía es material de estudio. El POH/AFM y el Weight & Balance Report de tu aeronave son la referencia oficial y prevalecen sobre cualquier dato o ejemplo de esta página. Ante dudas, consultá a tu instructor o a un taller habilitado.
