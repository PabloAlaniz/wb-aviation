---
title: "Massa, braccio e momento: esempio svolto con un Cessna 152"
description: "Cosa significano datum, braccio e momento nel calcolo di massa e centraggio, con un esempio completo su un Cessna 152 e gli errori di unità e di scala più comuni."
lang: it
translationKey: weight-arm-moment
slug: massa-braccio-e-momento
updated: 2026-10-30
faq:
  - q: "Cos'è il momento nel calcolo di massa e centraggio?"
    a: "È la massa di un elemento moltiplicata per il suo braccio (la distanza dal datum), espresso per esempio in libbre-pollici (lb-in). Sommando tutti i momenti e dividendo per la massa totale si ottiene il centro di gravità."
  - q: "Perché il POH divide i momenti per 1000?"
    a: "Per mantenere piccoli i numeri di tabelle e grafici. È solo una scala e va usata in modo coerente in tutto il calcolo."
  - q: "Quanto pesano 24,5 galloni di avgas?"
    a: "Con il valore convenzionale di 6 lb/gal, 24,5 gal × 6 = 147 lb. Il POH del tuo aereo indica il valore da usare."
---

Ogni calcolo di massa e centraggio si basa su tre idee: **datum**, **braccio** e **momento**. Una volta capite, qualsiasi foglio di carico del POH è solo una somma.

## Datum, braccio e momento

- **Datum**: un piano verticale di riferimento scelto dal costruttore. Può essere la faccia anteriore della paratia parafiamma, la punta dell'ogiva dell'elica o un punto davanti all'aereo. Tutto si misura a partire da lì.
- **Braccio** (o stazione): la distanza orizzontale dal datum al centro di gravità di un elemento. Negli aerei con unità imperiali si misura in pollici; per convenzione è positivo dietro il datum e negativo davanti.
- **Momento**: massa × braccio. Misura quanta leva ha una massa rispetto al datum. Un oggetto da 20 lb molto arretrato può contare per il centraggio più di uno da 50 lb vicino al datum.

Il **centro di gravità** è il punto in cui agisce tutta la massa: **CG = somma dei momenti ÷ somma delle masse**.

## Esempio svolto: Cessna 152

Usiamo i valori di riferimento del Cessna 152 presenti in CheckCG (TCDS 3A19 e POH del 152). Il datum è la faccia anteriore della paratia parafiamma. **Sono valori di riferimento: per volare usa la massa a vuoto e il braccio del rapporto di massa e centraggio del tuo aereo e i dati del suo POH.**

Il carico:

- Massa a vuoto dell'aereo di esempio del POH: 1136 lb a 29,93 in.
- Pilota 170 lb e passeggero 160 lb, entrambi sui sedili a 39 in.
- Vano bagagli 1 (64 in): 20 lb. Vano 2 (84 in): vuoto.
- Carburante: serbatoi pieni, 24,5 gal utilizzabili × 6 lb/gal = 147 lb a 42 in.

| Stazione              | Massa (lb) | Braccio (in) | Momento (lb-in) |
| --------------------- | ---------: | -----------: | --------------: |
| Massa a vuoto         |       1136 |        29,93 |       34.000,48 |
| Pilota                |        170 |        39,00 |            6630 |
| Passeggero            |        160 |        39,00 |            6240 |
| Vano bagagli 1        |         20 |        64,00 |            1280 |
| Vano bagagli 2        |          0 |        84,00 |               0 |
| Carburante (24,5 gal) |        147 |        42,00 |            6174 |
| **Totale (decollo)**  |   **1633** |              |   **54.324,48** |

**CG = 54.324,48 ÷ 1633 = 33,27 in** dietro il datum. Con momento/1000, come nelle tabelle del POH, il momento totale è 54,32.

### È entro i limiti?

- **Massa**: 1633 lb, sotto il massimo di 1670 lb.
- **CG**: su questo modello il limite posteriore è 36,50 in. Il limite anteriore è 31,00 in fino a 1350 lb e arretra linearmente fino a 32,65 in a 1670 lb. A 1633 lb il limite anteriore è 31,00 + (1633 − 1350) × (1,65 ÷ 320) = **32,46 in**. Poiché 32,46 ≤ 33,27 ≤ 36,50, il CG è all'interno dell'inviluppo.

### Atterraggio e senza carburante

Supponiamo che il volo consumi 9 gal (54 lb). Quel carburante esce dal braccio di 42 in:

- **Atterraggio**: massa 1633 − 54 = **1579 lb**; momento 54.324,48 − 54 × 42 = 52.056,48; **CG = 32,97 in**.
- **Senza carburante**: massa 1633 − 147 = **1486 lb**; momento 48.150,48; **CG = 32,40 in**.

Poiché il serbatoio è dietro il CG, consumare carburante sposta il CG **in avanti**. Entrambe le condizioni restano all'interno dell'inviluppo, ma il margine rispetto al limite anteriore si riduce. Su altri aerei, con i serbatoi in posizioni diverse, può succedere il contrario.

Puoi riprodurre questo esempio nel [calcolatore del Cessna 152](/it/cessna-152/) inserendo le stesse masse.

## Errori comuni

- **Mescolare momenti in scala e non in scala.** Se una riga dice 34,0 (momento/1000) e un'altra 6630 (lb-in), la somma non ha senso. Scegli una scala e mantienila.
- **Libbre e chilogrammi.** 1 kg = 2,2046 lb. Se l'aereo è certificato in chilogrammi e millimetri (o metri), fai tutto il calcolo in quelle unità senza mescolare dati in libbre.
- **Millimetri e pollici.** 1 in = 25,4 mm. Un braccio di 39 in corrisponde a 990,6 mm; se li confondi, il CG diventa un'assurdità.
- **Galloni e libbre.** Il carburante si inserisce in libbre: galloni × 6 per l'avgas (valore convenzionale; verificalo nel POH). Inserire "24,5" nella stazione carburante come se fossero libbre sposta il CG e sottostima la massa di oltre 120 lb.
- **Carburante totale invece di quello utilizzabile.** Il carburante non utilizzabile di solito è già incluso nella massa a vuoto; controlla cosa dice il tuo rapporto di massa e centraggio per non contarlo due volte.
- **Considerare l'esempio del POH come il tuo aereo.** Massa a vuoto e braccio appartengono a ogni singola cellula.
- **Guardare solo il limite posteriore.** Con molta massa davanti il rischio è il limite anteriore, che dipende anche dalla massa.

Per la procedura completa, vedi [Come calcolare massa e centraggio](/it/guide/come-calcolare-massa-e-centraggio/) e, per capire i limiti, [L'inviluppo del CG](/it/guide/inviluppo-del-cg/).

> **Importante:** questa guida è materiale di studio. Il POH/AFM del tuo aereo e il suo rapporto di massa e centraggio sono i riferimenti ufficiali e prevalgono su qualsiasi dato o esempio di questa pagina. In caso di dubbio, chiedi al tuo istruttore di volo o a un'impresa di manutenzione certificata.
