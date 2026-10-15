---
title: "Cómo calcular peso y balance de un avión, paso a paso"
description: "Procedimiento completo de peso y balance: peso vacío, brazos, momentos, centro de gravedad, peso máximo, envolvente y CG de aterrizaje. Con calculadora gratis."
lang: es
translationKey: how-to-calculate
slug: como-calcular-peso-y-balance
updated: 2026-10-15
steps:
  - name: "Buscá el peso vacío y su brazo"
    text: "Tomá el peso vacío básico y su brazo (o momento) del Weight & Balance Report vigente de tu aeronave, no del ejemplo del POH."
  - name: "Anotá el peso de cada estación"
    text: "Pesá o estimá con criterio conservador a cada ocupante, el equipaje y el combustible (en libras: galones × 6 para avgas)."
  - name: "Calculá el momento de cada estación"
    text: "Multiplicá peso × brazo de cada estación. El brazo sale del POH/AFM."
  - name: "Sumá pesos y momentos"
    text: "El peso total es la suma de todos los pesos; el momento total, la suma de todos los momentos."
  - name: "Calculá el centro de gravedad"
    text: "CG = momento total ÷ peso total. El resultado queda en la misma unidad que los brazos (por ejemplo, pulgadas detrás del datum)."
  - name: "Verificá peso máximo y envolvente"
    text: "Comprobá que el peso total no supere el máximo y que el punto (CG, peso) quede dentro de la envolvente de CG del POH."
  - name: "Repetí para aterrizaje y peso sin combustible"
    text: "Restá el combustible que vas a quemar (y luego todo el combustible) y verificá que el CG siga dentro de límites."
faq:
  - q: "¿Puedo usar el peso vacío del ejemplo del POH?"
    a: "No. El ejemplo del POH es ilustrativo. Cada aeronave tiene su propio peso vacío y brazo, registrados en su Weight & Balance Report, que cambia con cada modificación o equipo instalado."
  - q: "¿Cuánto pesa un galón de avgas?"
    a: "Para peso y balance se usa habitualmente 6 lb por galón (unos 0,72 kg por litro). La densidad real varía con la temperatura; usá el valor que indique el POH de tu aeronave."
  - q: "¿Alcanza con verificar el CG al despegue?"
    a: "No. Al quemar combustible el CG se desplaza. Hay que verificar también el CG de aterrizaje y, si el POH lo pide, el de peso sin combustible."
---

El cálculo de **peso y balance** (Weight & Balance) responde dos preguntas antes de cada vuelo: ¿el avión pesa menos que su peso máximo? y ¿el centro de gravedad (CG) está dentro de los límites aprobados? Las dos tienen que cumplirse. Un avión liviano con el CG fuera de la envolvente es tan inseguro como uno pasado de peso.

En esta guía vas a ver el procedimiento completo, el mismo que hace la [calculadora de CheckCG](/es/) y que podés hacer a mano con una planilla. Si todavía no tenés claros los conceptos de brazo y momento, empezá por [Peso, brazo y momento](/es/guias/peso-brazo-y-momento/).

## Qué necesitás antes de empezar

- **El POH/AFM de tu aeronave** (Manual de Operación del Piloto o Manual de Vuelo aprobado). De ahí salen los brazos de cada estación, el peso máximo y la envolvente de CG.
- **El Weight & Balance Report vigente** de _tu_ avión (la planilla de pesada). Ahí figuran el peso vacío y su brazo o momento. Cambia cada vez que se instala o se saca equipo, así que verificá que sea la última versión.
- **Los pesos reales de la carga**: ocupantes (con ropa y auriculares), equipaje y combustible.

## Paso 1: peso vacío y brazo

Copiá del Weight & Balance Report el **peso vacío básico** y su **brazo** (también llamado estación). Algunos reportes dan el momento en lugar del brazo; en ese caso, el brazo es momento ÷ peso. Si el POH usa momentos divididos por 1000, respetá esa escala en todo el cálculo.

No uses el peso vacío del ejemplo del POH ni el de otro avión del mismo modelo: dos aviones "iguales" pueden diferir en decenas de libras y en el brazo.

## Paso 2: peso de cada estación

Anotá el peso de cada estación de carga que tenga el POH: asientos delanteros, asientos traseros, cada compartimiento de equipaje y cada tanque de combustible.

- **Personas**: si no las pesás, estimá hacia arriba. Un error de 20 lb en el asiento trasero puede mover el CG más de lo que pensás.
- **Combustible**: convertí galones a libras. Para avgas se usa habitualmente **6 lb/gal**. Si tenés litros, primero pasalos a galones (1 gal US = 3,785 L).
- **Equipaje**: respetá el máximo de cada compartimiento y, si existe, el máximo combinado.

## Paso 3: momento de cada estación

El **momento** es peso × brazo. Calculalo para cada estación, incluida la del peso vacío. Los brazos salen del POH (sección de peso y balance) y se miden desde el _datum_, un plano de referencia que define el fabricante.

## Paso 4: sumar pesos y momentos

- **Peso total** = peso vacío + todas las estaciones.
- **Momento total** = momento vacío + todos los momentos.

## Paso 5: calcular el centro de gravedad

**CG = momento total ÷ peso total.** El resultado queda en la misma unidad que los brazos: si los brazos están en pulgadas detrás del datum, el CG también. Si trabajaste con momento/1000, multiplicá por 1000 antes de dividir (o dividí y multiplicá el resultado por 1000).

## Paso 6: verificar peso máximo y envolvente

1. **Peso total ≤ peso máximo de despegue.** Algunos aviones tienen además un peso máximo de rampa (para puesta en marcha y rodaje) y un peso máximo de aterrizaje distinto.
2. **El punto (CG, peso) dentro de la envolvente.** No alcanza con comparar el CG contra un número: en muchos aviones el límite delantero se corre hacia atrás a medida que aumenta el peso. Ubicá el punto en el gráfico del POH o interpolá entre los vértices. Lo explicamos en [La envolvente de CG](/es/guias/envolvente-de-cg/).

## Paso 7: aterrizaje y peso sin combustible

El combustible se consume durante el vuelo y, con él, cambia el momento. Para el **aterrizaje**:

- Restá al peso total el combustible que vas a quemar (consumo × tiempo de vuelo; la reserva sigue a bordo).
- Restá al momento total ese combustible × el brazo del tanque.
- Calculá el nuevo CG y verificá que siga dentro de la envolvente y bajo el peso máximo de aterrizaje.

Repetí el cálculo con **todo el combustible quemado** (peso sin combustible). Es la condición más desfavorable en muchos aviones y algunos POH fijan un peso máximo sin combustible.

Según dónde esté el tanque respecto del CG, al quemar combustible el CG puede ir hacia adelante o hacia atrás. Por eso un avión que despega dentro de límites puede aterrizar fuera.

## Si te da fuera de límites

No se vuela. Redistribuí la carga (por ejemplo, equipaje a otro compartimiento o un pasajero en otro asiento), reducí equipaje o combustible sin resignar la reserva reglamentaria y la que exija la operación, y volvé a calcular. Si la solución pasa por lastre, usá solo el que autorice el POH.

## Hacelo con la calculadora

La [calculadora de CheckCG](/es/) hace estos siete pasos al instante: cargás el peso vacío de tu Weight & Balance Report (como aeronave propia), los pesos de cada estación y el combustible a quemar, y te muestra peso, CG, la envolvente y las fases de despegue, aterrizaje y sin combustible. También genera la hoja de carga en PDF. Hay páginas con datos de referencia para cada modelo, como el [Cessna 152](/es/cessna-152/) o el [Cessna 172S](/es/cessna-172s/).

> **Importante:** esta guía es material de estudio. El POH/AFM y el Weight & Balance Report de tu aeronave son la referencia oficial y prevalecen sobre cualquier dato o ejemplo de esta página. Ante dudas, consultá a tu instructor o a un taller habilitado.
