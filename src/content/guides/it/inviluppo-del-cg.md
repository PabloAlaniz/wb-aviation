---
title: "L'inviluppo del CG: limiti anteriore e posteriore"
description: "Cos'è l'inviluppo del centro di gravità, perché contano i limiti anteriore e posteriore, perché il CG si sposta all'atterraggio e cosa fare se il carico è fuori limiti."
lang: it
translationKey: cg-envelope
slug: inviluppo-del-cg
updated: 2026-10-30
faq:
  - q: "Cosa succede se volo con il CG oltre il limite posteriore?"
    a: "L'aereo perde stabilità longitudinale, le forze sui comandi diventano leggere e la rimessa da uno stallo o da una vite può diventare difficile o impossibile. Non volare mai fuori dai limiti."
  - q: "Perché un CG avanzato aumenta la velocità di stallo?"
    a: "Con il CG più avanti, la coda deve spingere più forte verso il basso per bilanciare l'aereo. L'ala deve compensare quel carico extra con più portanza, e questo aumenta la velocità di stallo."
  - q: "Basta essere sotto la massa massima?"
    a: "No. Massa e CG sono due condizioni indipendenti e vanno rispettate entrambe, al decollo e all'atterraggio."
---

L'**inviluppo del CG** è l'area, su un grafico della massa in funzione della posizione del centro di gravità, entro la quale l'aereo è stato certificato. Se il punto (CG, massa) del tuo carico cade all'interno, l'aereo si comporta come ha dimostrato il costruttore. Se cade fuori, non c'è garanzia di stabilità o controllo adeguati.

## Come si legge

L'asse orizzontale è il **CG** (braccio in pollici o millimetri dietro il datum, oppure un momento). L'asse verticale è la **massa**. L'inviluppo è un poligono:

- Il **lato superiore** è la massa massima.
- Il **lato sinistro** è il **limite anteriore**. In molti aerei non è una linea verticale: oltre un certo massa si inclina all'indietro, quindi più sei pesante, meno CG avanzato è consentito.
- Il **lato destro** è il **limite posteriore**.

Per esempio, sul Cessna 152 (dati di riferimento del TCDS 3A19) il limite anteriore è 31,0 in fino a 1350 lb e arretra linearmente fino a 32,65 in a 1670 lb; il limite posteriore è 36,5 in. Alcuni aerei hanno anche inviluppi separati per le categorie normale e utility: quello utility di solito è più piccolo ed è quello che consente certe manovre.

Per sapere se un carico è all'interno, riporta il punto sul grafico del POH o interpola il limite al tuo massa. Confrontare il CG con un solo numero (quello alla massa massima o alla massa minimo) può trarti in inganno.

## Perché conta il limite anteriore

Con il CG avanzato l'aereo è **più stabile**, ma:

- **La coda deve spingere più forte verso il basso** per mantenerlo bilanciato. L'ala sostiene quel carico extra, quindi **la velocità di stallo aumenta** e le prestazioni peggiorano un po' (più resistenza, più consumo).
- **Le forze sui comandi sono maggiori** e l'equilibratore ha meno margine. Al limite potrebbe non bastare per alzare il muso in rotazione o per la richiamata in atterraggio, soprattutto a bassa velocità con i flap estesi.

Il limite anteriore si raggiunge di solito con due persone pesanti davanti, niente dietro e, negli aerei con i serbatoi dietro il CG, poco carburante.

## Perché conta il limite posteriore

Con il CG arretrato l'aereo è **meno stabile**:

- Le forze sui comandi diventano leggere ed è facile sovracontrollare in beccheggio.
- **La velocità di stallo diminuisce** leggermente, ma lo stallo può essere più brusco.
- **La rimessa da uno stallo o da una vite** può diventare difficile o impossibile, perché l'equilibratore perde l'autorità necessaria per abbassare il muso.

Oltre il limite posteriore l'aereo può diventare instabile in beccheggio. È la condizione più pericolosa e si raggiunge di solito con passeggeri dietro e bagagli pesanti nel vano posteriore.

## Perché il CG all'atterraggio è diverso

Durante il volo il carburante si consuma, e il carburante ha un suo braccio. Se il serbatoio è **dietro** il CG, consumare carburante sposta il CG **in avanti**; se è **davanti**, il CG si sposta **indietro**. Per questo si verificano anche i punti di atterraggio e senza carburante, non solo quello di decollo. Nell'[esempio del Cessna 152](/it/guide/massa-braccio-e-momento/) il CG passa da 33,27 in al decollo a 32,97 in all'atterraggio.

Anche le masse massime possono cambiare: alcuni aerei hanno una massa massima all'atterraggio inferiore a quello al decollo, altri una massa massima senza carburante.

## Cosa fare se sei fuori limiti

Prima di tutto: **non volare**. Poi, a seconda del caso:

- **CG troppo arretrato**: sposta i bagagli dal vano posteriore in avanti, fai sedere davanti il passeggero più pesante o riduci i bagagli.
- **CG troppo avanzato**: carica bagagli nel vano posteriore (entro il suo limite), ridistribuisci gli occupanti o, se il POH lo consente, usa zavorra approvata.
- **Massa eccessiva**: meno bagagli, meno passeggeri o meno carburante, mantenendo sempre la riserva obbligatoria e quanto richiede la tua operazione. Ricorda che togliere carburante sposta anche il CG.

Dopo ogni modifica, ricalcola decollo, atterraggio e senza carburante.

## Verificalo nel calcolatore

Il [calcolatore di CheckCG](/it/) disegna l'inviluppo del tuo aereo e riporta i punti di decollo, atterraggio e senza carburante, con avvisi quando ti avvicini a un limite. Per la procedura completa, vedi [Come calcolare massa e centraggio](/it/guide/come-calcolare-massa-e-centraggio/).

> **Importante:** questa guida è materiale di studio. Il POH/AFM del tuo aereo e il suo rapporto di massa e centraggio sono i riferimenti ufficiali e prevalgono su qualsiasi dato o esempio di questa pagina. In caso di dubbio, chiedi al tuo istruttore di volo o a un'impresa di manutenzione certificata.
