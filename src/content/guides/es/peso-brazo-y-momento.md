---
title: "Peso, brazo y momento: ejemplo resuelto con un Cessna 152"
description: "Qué son el datum, el brazo y el momento en peso y balance, con un ejemplo completo en un Cessna 152 y los errores más comunes de unidades y escalas."
lang: es
translationKey: weight-arm-moment
slug: peso-brazo-y-momento
updated: 2026-10-15
faq:
  - q: "¿Qué es el momento en peso y balance?"
    a: "Es el peso de un elemento multiplicado por su brazo (la distancia al datum). Se expresa, por ejemplo, en libras-pulgada (lb-in). Sumando los momentos y dividiendo por el peso total se obtiene el centro de gravedad."
  - q: "¿Por qué el POH divide los momentos por 1000?"
    a: "Para trabajar con números más chicos en las tablas y gráficos. Es solo una escala: hay que usarla de forma consistente en todo el cálculo."
  - q: "¿Cuánto pesan 24,5 galones de avgas?"
    a: "Con el valor convencional de 6 lb/gal, 24,5 gal × 6 = 147 lb. El POH de tu aeronave indica el valor a usar."
---

Todo cálculo de peso y balance se apoya en tres ideas: **datum**, **brazo** y **momento**. Si las tenés claras, cualquier planilla del POH se vuelve una suma.

## Datum, brazo y momento

- **Datum**: un plano de referencia vertical elegido por el fabricante. Puede ser la cara delantera del parallamas (_firewall_), la punta del spinner o un punto delante del avión. Todo se mide desde ahí.
- **Brazo** (o estación): la distancia horizontal entre el datum y el centro de gravedad de un elemento. En los aviones con unidades imperiales se mide en pulgadas; por convención es positivo hacia atrás del datum y negativo hacia adelante.
- **Momento**: peso × brazo. Mide cuánto "hace palanca" un peso alrededor del datum. Una carga de 20 lb lejos atrás puede pesar más en el balance que una de 50 lb cerca del datum.

El **centro de gravedad** es el punto donde se concentra todo el peso: **CG = suma de momentos ÷ suma de pesos**.

## Ejemplo resuelto: Cessna 152

Usamos los valores de referencia del Cessna 152 que tiene CheckCG (TCDS 3A19 y POH del 152). El datum es la cara delantera del parallamas. **Son valores de referencia: para volar usá el peso vacío y brazo del Weight & Balance Report de tu avión y los datos de su POH.**

Carga del ejemplo:

- Peso vacío del avión de ejemplo del POH: 1136 lb a 29,93 in.
- Piloto 170 lb y pasajero 160 lb, ambos en los asientos a 39 in.
- Equipaje en el área 1 (64 in): 20 lb. Área 2 (84 in): vacía.
- Combustible: tanques llenos, 24,5 gal usables × 6 lb/gal = 147 lb a 42 in.

| Estación               | Peso (lb) | Brazo (in) | Momento (lb-in) |
| ---------------------- | --------: | ---------: | --------------: |
| Peso vacío             |      1136 |      29,93 |       34.000,48 |
| Piloto                 |       170 |      39,00 |            6630 |
| Pasajero               |       160 |      39,00 |            6240 |
| Equipaje área 1        |        20 |      64,00 |            1280 |
| Equipaje área 2        |         0 |      84,00 |               0 |
| Combustible (24,5 gal) |       147 |      42,00 |            6174 |
| **Total (despegue)**   |  **1633** |            |   **54.324,48** |

**CG = 54.324,48 ÷ 1633 = 33,27 in** detrás del datum. Con momento/1000, como en las tablas del POH, el momento total es 54,32.

### ¿Está dentro de límites?

- **Peso**: 1633 lb, por debajo del máximo de 1670 lb.
- **CG**: en este modelo el límite trasero es 36,50 in. El delantero es 31,00 in hasta 1350 lb y se corre linealmente hasta 32,65 in a 1670 lb. A 1633 lb el límite delantero es 31,00 + (1633 − 1350) × (1,65 ÷ 320) = **32,46 in**. Como 32,46 ≤ 33,27 ≤ 36,50, el CG está dentro de la envolvente.

### Aterrizaje y peso sin combustible

Supongamos un vuelo que consume 9 gal (54 lb). El combustible sale del brazo de 42 in:

- **Aterrizaje**: peso 1633 − 54 = **1579 lb**; momento 54.324,48 − 54 × 42 = 52.056,48; **CG = 32,97 in**.
- **Sin combustible**: peso 1633 − 147 = **1486 lb**; momento 48.150,48; **CG = 32,40 in**.

Como el tanque está detrás del CG, al quemar combustible el CG se mueve **hacia adelante**. Las dos condiciones siguen dentro de la envolvente, pero el margen al límite delantero se achica. En otros aviones, con tanques en otra posición, puede pasar lo contrario.

Podés reproducir este ejemplo en la [calculadora del Cessna 152](/es/cessna-152/) cargando los mismos pesos.

## Errores comunes

- **Mezclar momentos escalados y sin escalar.** Si una fila dice 34,0 (momento/1000) y otra 6630 (lb-in), la suma no tiene sentido. Elegí una escala y usala en todo el cálculo.
- **Libras y kilos.** 1 kg = 2,2046 lb. Si el avión está certificado en kilos y milímetros (o metros), hacé todo el cálculo en esas unidades, sin mezclarlas con datos en libras.
- **Milímetros y pulgadas.** 1 in = 25,4 mm. Un brazo de 39 in son 990,6 mm; si mezclás unidades, el CG queda absurdo.
- **Galones y libras.** El combustible entra en libras: galones × 6 para avgas (valor convencional; verificá el del POH). Cargar "24,5" en la estación de combustible como si fueran libras mueve el CG y subestima el peso en más de 120 lb.
- **Combustible total en lugar de usable.** El combustible no usable suele estar incluido en el peso vacío; revisá qué indica tu Weight & Balance Report para no contarlo dos veces.
- **Usar el ejemplo del POH como si fuera tu avión.** El peso vacío y el brazo son propios de cada matrícula.
- **Mirar solo el límite trasero.** Con mucho peso adelante el riesgo es el límite delantero, que además depende del peso.

Para el procedimiento completo, mirá [Cómo calcular peso y balance](/es/guias/como-calcular-peso-y-balance/), y para entender los límites, [La envolvente de CG](/es/guias/envolvente-de-cg/).

> **Importante:** esta guía es material de estudio. El POH/AFM y el Weight & Balance Report de tu aeronave son la referencia oficial y prevalecen sobre cualquier dato o ejemplo de esta página. Ante dudas, consultá a tu instructor o a un taller habilitado.
