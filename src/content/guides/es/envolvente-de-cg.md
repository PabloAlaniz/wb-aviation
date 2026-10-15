---
title: "La envolvente de CG: límites delantero y trasero, explicados"
description: "Qué es la envolvente de centro de gravedad, por qué importan los límites delantero y trasero, por qué cambia el CG al aterrizar y qué hacer si quedás fuera."
lang: es
translationKey: cg-envelope
slug: envolvente-de-cg
updated: 2026-10-15
faq:
  - q: "¿Qué pasa si vuelo con el CG detrás del límite trasero?"
    a: "El avión pierde estabilidad longitudinal, los controles se vuelven livianos y la recuperación de una pérdida o un tirabuzón puede ser difícil o imposible. No se debe volar fuera de límites."
  - q: "¿Por qué con CG adelantado aumenta la velocidad de pérdida?"
    a: "Con el CG más adelante, la cola tiene que generar más fuerza hacia abajo para equilibrar el avión. El ala debe compensar esa carga extra con más sustentación, lo que eleva la velocidad de pérdida."
  - q: "¿Alcanza con estar bajo el peso máximo?"
    a: "No. El peso y el CG son dos condiciones independientes y hay que cumplir ambas, al despegue y al aterrizaje."
---

La **envolvente de CG** es el área, en un gráfico de peso contra posición del centro de gravedad, dentro de la cual el avión fue certificado. Si el punto (CG, peso) de tu carga cae adentro, el avión se comporta como el fabricante demostró. Si cae afuera, no hay garantía de estabilidad ni de control suficientes.

## Cómo se lee

En el eje horizontal está el **CG** (brazo en pulgadas o milímetros detrás del datum, o un momento). En el vertical, el **peso**. La envolvente es un polígono:

- El **borde superior** es el peso máximo.
- El **borde izquierdo** es el **límite delantero**. En muchos aviones no es una línea vertical: a partir de cierto peso se inclina hacia atrás, es decir que con más peso se permite menos CG adelantado.
- El **borde derecho** es el **límite trasero**.

Por ejemplo, en el Cessna 152 (datos de referencia del TCDS 3A19) el límite delantero es 31,0 in hasta 1350 lb y se corre linealmente hasta 32,65 in a 1670 lb; el trasero es 36,5 in. Algunos aviones tienen además envolventes distintas para la categoría normal y la utilitaria: la utilitaria suele ser más chica y es la que habilita ciertas maniobras.

Para saber si una carga está dentro, ubicá el punto en el gráfico del POH o interpolá el límite a tu peso. Comparar el CG contra un solo número (el del peso máximo o el del peso mínimo) puede llevarte a un error.

## Por qué importa el límite delantero

Con el CG adelantado el avión es **más estable**, pero:

- **Necesita más fuerza hacia abajo en la cola** para mantenerse equilibrado. El ala carga con ese peso extra, así que la **velocidad de pérdida aumenta** y la performance empeora un poco (más resistencia, más consumo).
- **Las fuerzas en el comando son mayores** y el profundor tiene menos margen. En el límite, puede no alcanzar para levantar la nariz en la rotación o para hacer el _flare_ al aterrizar, sobre todo a baja velocidad y con flaps.

El límite delantero se alcanza típicamente con dos personas pesadas adelante, sin equipaje atrás y, en aviones con el tanque detrás del CG, con poco combustible.

## Por qué importa el límite trasero

Con el CG atrasado el avión es **menos estable**:

- Los controles se vuelven livianos y es fácil sobrecontrolar el cabeceo.
- La **velocidad de pérdida baja** un poco, pero la pérdida puede ser más brusca.
- La **recuperación de una pérdida o de un tirabuzón** puede volverse difícil o imposible, porque el profundor pierde capacidad para bajar la nariz.

Más allá del límite trasero el avión puede volverse inestable en cabeceo. Es la condición más peligrosa y se alcanza típicamente con pasajeros atrás y mucho equipaje en el compartimiento trasero.

## Por qué el CG de aterrizaje es distinto

Durante el vuelo se quema combustible, y el combustible tiene su propio brazo. Si el tanque está **detrás** del CG, al quemarlo el CG se mueve **hacia adelante**; si está **adelante**, se mueve **hacia atrás**. Por eso hay que verificar el punto de aterrizaje y el de peso sin combustible, no solo el de despegue. En el [ejemplo del Cessna 152](/es/guias/peso-brazo-y-momento/) el CG pasa de 33,27 in al despegue a 32,97 in al aterrizar.

También cambia el peso máximo: algunos aviones tienen un peso máximo de aterrizaje menor que el de despegue, y otros un peso máximo sin combustible.

## Qué hacer si quedás fuera

Primero: **no se vuela**. Después, según el caso:

- **CG muy atrás**: pasá equipaje del compartimiento trasero al delantero, sentá al pasajero más pesado adelante o reducí el equipaje.
- **CG muy adelante**: llevá equipaje en el compartimiento trasero (respetando su máximo), redistribuí ocupantes o, si el POH lo permite, usá lastre aprobado.
- **Exceso de peso**: menos equipaje, menos pasajeros o menos combustible, siempre conservando la reserva reglamentaria y la que exija tu operación. Ojo: sacar combustible también mueve el CG.

Después de cada cambio, recalculá despegue, aterrizaje y peso sin combustible.

## Verificalo en la calculadora

La [calculadora de CheckCG](/es/) dibuja la envolvente de tu avión y ubica los puntos de despegue, aterrizaje y sin combustible, con alertas cuando te acercás a un límite. Para el procedimiento completo, mirá [Cómo calcular peso y balance](/es/guias/como-calcular-peso-y-balance/).

> **Importante:** esta guía es material de estudio. El POH/AFM y el Weight & Balance Report de tu aeronave son la referencia oficial y prevalecen sobre cualquier dato o ejemplo de esta página. Ante dudas, consultá a tu instructor o a un taller habilitado.
