---
title: "Come calcolare massa e centraggio di un aereo, passo dopo passo"
description: "La procedura completa di massa e centraggio: massa a vuoto, bracci, momenti, baricentro, massa massima, inviluppo e CG all'atterraggio. Con calcolatore gratuito."
lang: it
translationKey: how-to-calculate
slug: come-calcolare-massa-e-centraggio
updated: 2026-10-30
steps:
  - name: "Ricava massa a vuoto e braccio"
    text: "Prendi la massa a vuoto base e il suo braccio (o momento) dal rapporto di massa e centraggio aggiornato del tuo aereo, non dall'esempio del POH."
  - name: "Annota la massa di ogni stazione"
    text: "Pesa o stima per eccesso ogni occupante, i bagagli e il carburante (in libbre: galloni × 6 per l'avgas)."
  - name: "Calcola il momento di ogni stazione"
    text: "Moltiplica massa × braccio per ogni stazione. I bracci si trovano nel POH/AFM."
  - name: "Somma masse e momenti"
    text: "La massa totale è la somma di tutte le masse; il momento totale è la somma di tutti i momenti."
  - name: "Calcola il centro di gravità"
    text: "CG = momento totale ÷ massa totale. Il risultato è nella stessa unità dei bracci (per esempio, pollici dietro il datum)."
  - name: "Verifica massa massima e inviluppo"
    text: "Controlla che la massa totale non superi il massimo e che il punto (CG, massa) cada all'interno dell'inviluppo del CG del POH."
  - name: "Ripeti per atterraggio e senza carburante"
    text: "Sottrai il carburante che consumerai (e poi tutto il carburante) e verifica che il CG resti entro i limiti."
faq:
  - q: "Posso usare la massa a vuoto dell'esempio del POH?"
    a: "No. L'esempio del POH è illustrativo. Ogni aereo ha la propria massa a vuoto e il proprio braccio, riportati nel suo rapporto di massa e centraggio, che cambia ogni volta che si installa o si rimuove un equipaggiamento."
  - q: "Quanto pesa un gallone di avgas?"
    a: "Nei calcoli di massa e centraggio si usano di solito 6 lb per gallone USA. La densità reale varia con la temperatura; usa il valore indicato nel POH del tuo aereo."
  - q: "Basta verificare il CG al decollo?"
    a: "No. Il CG si sposta man mano che si consuma carburante. Devi verificare anche il CG all'atterraggio e, se il POH lo richiede, la condizione senza carburante."
---

Il calcolo di **massa e centraggio** risponde a due domande prima di ogni volo: l'aereo è sotto la sua massa massima? E il suo centro di gravità (CG) è entro i limiti approvati? Entrambe le risposte devono essere sì. Un aereo leggero con il CG fuori dall'inviluppo è pericoloso quanto uno con massa eccessiva.

Questa guida segue la procedura completa, la stessa che esegue il [calcolatore di CheckCG](/it/) e che puoi fare a mano su un foglio di carico. Se braccio e momento non ti sono ancora chiari, comincia da [Massa, braccio e momento](/it/guide/massa-braccio-e-momento/).

## Cosa ti serve prima

- **Il POH/AFM del tuo aereo** (Pilot's Operating Handbook o manuale di volo approvato). Riporta il braccio di ogni stazione, le masse massime e l'inviluppo del CG.
- **Il rapporto di massa e centraggio aggiornato** del _tuo_ aereo. Indica la massa a vuoto e il suo braccio o momento. Cambia ogni volta che si aggiunge o si rimuove un equipaggiamento, quindi assicurati di avere l'ultimo.
- **Le masse reali del carico**: occupanti (con vestiti e cuffie), bagagli e carburante.

## Passo 1: massa a vuoto e braccio

Copia la **massa a vuoto base** e il suo **braccio** (detto anche stazione) dal rapporto di massa e centraggio. Alcuni rapporti riportano il momento invece del braccio; in quel caso il braccio è momento ÷ massa. Se il POH usa momenti divisi per 1000, mantieni quella scala per tutto il calcolo.

Non usare la massa a vuoto dell'esempio del POH né quella di un altro aereo dello stesso modello: due aerei "identici" possono differire di decine di libbre e nel braccio.

## Passo 2: massa in ogni stazione

Annota la massa in ogni stazione di carico del POH: sedili anteriori, sedili posteriori, ogni vano bagagli e ogni serbatoio.

- **Persone**: se non le pesi, stima per eccesso. Un errore di 20 lb sul sedile posteriore può spostare il CG più di quanto pensi.
- **Carburante**: converti i galloni in libbre. Per l'avgas il valore abituale è **6 lb/gal**. Se hai litri, convertili prima in galloni (1 gal USA = 3,785 L).
- **Bagagli**: rispetta il limite di ogni vano e, dove esiste, il limite combinato.

## Passo 3: momento di ogni stazione

Il **momento** è massa × braccio. Calcolalo per ogni stazione, inclusa la massa a vuoto. I bracci si trovano nella sezione di massa e centraggio del POH e sono misurati dal _datum_, un piano di riferimento scelto dal costruttore.

## Passo 4: somma masse e momenti

- **Massa totale** = massa a vuoto + tutte le stazioni.
- **Momento totale** = momento a vuoto + i momenti di tutte le stazioni.

## Passo 5: calcola il centro di gravità

**CG = momento totale ÷ massa totale.** Il risultato è nella stessa unità dei bracci: se i bracci sono in pollici dietro il datum, lo è anche il CG. Se hai lavorato con momento/1000, moltiplica per 1000 prima di dividere (oppure dividi e moltiplica il risultato per 1000).

## Passo 6: verifica massa massima e inviluppo

1. **Massa totale ≤ massa massima al decollo.** Alcuni aerei hanno anche una massa massima di rampa (per avviamento e rullaggio) e una massa massima all'atterraggio diversa.
2. **Il punto (CG, massa) all'interno dell'inviluppo.** Confrontare il CG con un solo numero non basta: in molti aerei il limite anteriore arretra all'aumentare della massa. Riporta il punto sul grafico del POH o interpola tra i vertici dell'inviluppo. Lo spieghiamo in [L'inviluppo del CG](/it/guide/inviluppo-del-cg/).

## Passo 7: atterraggio e senza carburante

Durante il volo il carburante si consuma e il momento cambia con esso. Per l'**atterraggio**:

- Sottrai dalla massa totale il carburante che consumerai (consumo orario × tempo di volo; la riserva resta a bordo).
- Sottrai dal momento totale quel carburante × il braccio del serbatoio.
- Calcola il nuovo CG e verifica che sia all'interno dell'inviluppo e sotto la massa massima all'atterraggio.

Ripeti con **tutto il carburante utilizzabile consumato** (condizione senza carburante). In molti aerei è il caso più sfavorevole, e alcuni POH stabiliscono una massa massima senza carburante.

A seconda di dove si trova il serbatoio rispetto al CG, consumare carburante può spostare il CG in avanti o indietro. Per questo un aereo che decolla entro i limiti può atterrare fuori limiti.

## Se sei fuori limiti

Non volare. Ridistribuisci il carico (sposta i bagagli in un altro vano o un passeggero su un altro sedile), riduci bagagli o carburante senza rinunciare alla riserva obbligatoria e a quanto richiede la tua operazione, e rifai il calcolo. Se la soluzione è la zavorra, usa solo quella approvata dal POH.

## Fallo con il calcolatore

Il [calcolatore di CheckCG](/it/) esegue i sette passi all'istante: inserisci la massa a vuoto dal tuo rapporto di massa e centraggio (come aeromobile personalizzato), la massa di ogni stazione e il carburante da consumare, e ti mostra massa, CG, l'inviluppo e le fasi di decollo, atterraggio e senza carburante. Stampa anche il foglio di carico in PDF. Ci sono pagine con i dati di riferimento di ogni modello, come il [Cessna 152](/it/cessna-152/) e il [Cessna 172S](/it/cessna-172s/).

> **Importante:** questa guida è materiale di studio. Il POH/AFM del tuo aereo e il suo rapporto di massa e centraggio sono i riferimenti ufficiali e prevalgono su qualsiasi dato o esempio di questa pagina. In caso di dubbio, chiedi al tuo istruttore di volo o a un'impresa di manutenzione certificata.
