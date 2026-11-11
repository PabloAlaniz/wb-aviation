---
title: "Conversioni del carburante: litri, galloni, libbre e chili"
description: "Tabelle di conversione di AVGAS e Jet A tra litri, galloni US e imperiali, libbre e chili, con un convertitore, esempi svolti e gli errori più comuni."
lang: it
translationKey: fuel-conversions
slug: conversioni-di-carburante
updated: 2026-11-11
tool: fuel-converter
faq:
  - q: "Quanto pesa un litro di AVGAS?"
    a: "Con la densità convenzionale di 6 lb per gallone US, un litro di AVGAS pesa circa 1,59 lb, cioè 0,72 kg. La densità reale cambia con la temperatura, per questo il POH indica il valore da usare."
  - q: "Quanto pesa un litro di Jet A?"
    a: "Con 6,7 lb per gallone US, un litro di Jet A pesa circa 1,77 lb, ovvero 0,80 kg. È circa il 12% più pesante dello stesso volume di AVGAS."
  - q: "Qual è la differenza tra il gallone US e il gallone imperiale?"
    a: "Il gallone US vale 3,785 litri e quello imperiale 4,546 litri: l'imperiale è più grande del 20%. I POH degli aerei nordamericani usano i galloni US."
---

Nel calcolo di massa e centraggio il carburante si **imbarca a volume** ma **conta come massa**. Sul piazzale te lo vendono in litri, il POH lo indica in galloni e il foglio di carico lo somma in libbre o in chili. Passare da un'unità all'altra è semplice, ma un fattore sbagliato sposta la massa totale e il CG quanto un passeggero in più.

Qui sopra trovi un **convertitore**: scegli il carburante, scrivi la quantità e vedrai il valore nelle altre unità.

## Volume e massa: la densità

Per passare dal volume alla massa serve la **densità** del carburante. Nel calcolo di massa e centraggio si usano valori convenzionali:

- **AVGAS 100LL**: 6,0 lb per gallone US, circa **0,72 kg per litro** (densità relativa 0,72).
- **Jet A / Jet A-1**: 6,7 lb per gallone US, circa **0,80 kg per litro**.

La densità reale cambia con la temperatura: il carburante freddo pesa un po' di più per litro. Per questo il valore che conta è quello del tuo POH/AFM; se ne indica un altro, usa quello.

Le conversioni tra volumi (litri e galloni) e tra masse (libbre e chili) non dipendono dal carburante: 1 gallone US = 3,785 L, 1 gallone imperiale = 4,546 L e 1 kg = 2,205 lb.

## Tabella dell'AVGAS

Ogni riga dice quanto vale **una** unità in ciascuna colonna. Per esempio, 1 gallone US di AVGAS corrisponde a 3,79 L, 6,00 lb o 2,72 kg.

| 1 unità      | gal US | gal imp. |     L |   lb |    kg |
| ------------ | -----: | -------: | ----: | ---: | ----: |
| **gal US**   |      1 |    0,833 |  3,79 | 6,00 |  2,72 |
| **gal imp.** |   1,20 |        1 |  4,55 | 7,21 |  3,27 |
| **L**        |  0,264 |    0,220 |     1 | 1,59 | 0,719 |
| **lb**       |  0,167 |    0,139 | 0,631 |    1 | 0,454 |
| **kg**       |  0,367 |    0,306 |  1,39 | 2,20 |     1 |

## Tabella del Jet A

Stesso formato, con 6,7 lb per gallone US. È quella che vale per i turboelica come il [King Air B200](/it/king-air-b200/) o il King Air E90.

| 1 unità      | gal US | gal imp. |     L |   lb |    kg |
| ------------ | -----: | -------: | ----: | ---: | ----: |
| **gal US**   |      1 |    0,833 |  3,79 | 6,70 |  3,04 |
| **gal imp.** |   1,20 |        1 |  4,55 | 8,05 |  3,65 |
| **L**        |  0,264 |    0,220 |     1 | 1,77 | 0,803 |
| **lb**       |  0,149 |    0,124 | 0,565 |    1 | 0,454 |
| **kg**       |  0,329 |    0,274 |  1,25 | 2,20 |     1 |

Il foglio di carico del calcolatore stampa il grafico delle conversioni con i fattori del carburante dell'aereo scelto.

## Esempi svolti

### Cessna 152: 60 litri di AVGAS

Hai imbarcato 60 L all'aeroclub e ti serve la massa per il foglio di carico del [Cessna 152](/it/cessna-152/), che lavora in galloni e libbre:

- 60 L ÷ 3,785 = **15,85 gal US**
- 15,85 gal × 6 lb/gal = **95,1 lb**
- 95,1 lb ÷ 2,205 = **43,1 kg**

Scorciatoia con la tabella: 60 L × 1,59 = 95 lb. La differenza rispetto al calcolo lungo è solo di arrotondamento.

### King Air: 800 litri di Jet A

- 800 L × 1,77 = **1416 lb** (642 kg).

Se per errore usassi la densità dell'AVGAS, otterresti 1268 lb: **148 lb in meno** di quanto hai davvero imbarcato. È la massa di un passeggero che non compare sul foglio di carico, con il suo effetto sul CG.

## Conti rapidi a mente

Per controllare un numero sul piazzale, senza calcolatrice:

- **AVGAS**: litri × 1,6 ≈ libbre; litri × 0,72 ≈ chili; galloni US × 6 = libbre.
- **Jet A**: litri × 1,8 ≈ libbre; litri × 0,8 ≈ chili; galloni US × 6,7 = libbre.
- **Da chili a libbre**: raddoppia e aggiungi il 10% (50 kg → 100 + 10 = 110 lb).

Servono a scoprire un errore grossolano, non a compilare il foglio di carico.

## Errori comuni

- **Gallone imperiale al posto di quello US.** Sono 4,546 L contro 3,785 L. Se converti 40 galloni imperiali come se fossero US, ti mancano circa 48 lb di AVGAS.
- **Densità dell'AVGAS per il Jet A.** Il Jet A pesa circa il 12% in più per litro. Su un turboelica con molto carburante, l'errore arriva a centinaia di libbre.
- **Confondere chili e libbre.** Il fattore è 2,2: annotare 100 kg come 100 lb lascia fuori 120 lb.
- **Carburante totale e utilizzabile.** Il POH distingue il carburante totale da quello utilizzabile; quello non utilizzabile di solito è compreso nella massa a vuoto. Verifica quale va usato prima di sommare.
- **Arrotondare troppo.** Per una stima rapida bastano i fattori della tabella; per il foglio di carico, fai il conto con i valori completi oppure usa il calcolatore.

## Nel calcolatore

In [CheckCG](/it/) il carburante si può inserire **a massa o a volume** (galloni o litri), e la conversione usa la densità del carburante di ogni aereo: AVGAS per gli aerei a pistoni e Jet A per i turboelica. Se vuoi ripassare come quella massa entra nel calcolo del centro di gravità, leggi [Massa, braccio e momento](/it/guide/massa-braccio-e-momento/).

> **Importante:** questa guida è materiale di studio. Il POH/AFM del tuo aereo e il suo rapporto di massa e centraggio sono i riferimenti ufficiali e prevalgono su qualsiasi dato o esempio di questa pagina. In caso di dubbio, chiedi al tuo istruttore di volo o a un'impresa di manutenzione certificata.
