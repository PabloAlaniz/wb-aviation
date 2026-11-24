/** Glossary and "about" page content (it). Same shape in every language: see pages.test.js. */
export const it = {
  glossary: {
    navLabel: "Glossario",
    title: "Glossario di massa e centraggio: datum, braccio, momento, CG | CheckCG",
    description:
      "Glossario di massa e centraggio per piloti: datum, braccio, momento, baricentro, inviluppo, massa a vuoto, carico utile, MTOW, MLW, MZFW e %MAC in parole semplici.",
    h1: "Glossario di massa e centraggio",
    intro:
      "I termini che compaiono nel manuale di volo, nel rapporto di pesata e nel calcolatore, spiegati in una o due frasi. In inglese lo stesso argomento è weight and balance (o mass and balance).",
    guideLink: "Guida correlata:",
    terms: {
      datum: {
        term: "Datum (piano di riferimento)",
        text: "Piano verticale immaginario, scelto dal costruttore, da cui si misurano tutte le distanze orizzontali dell'aeroplano. Può trovarsi sulla paratia parafiamma, sul muso o anche davanti a esso; è definito nel manuale di volo.",
      },
      arm: {
        term: "Braccio",
        text: "Distanza orizzontale tra il datum e una massa (un sedile, un serbatoio, il bagagliaio). Si misura in pollici o millimetri ed è positiva dietro al datum.",
      },
      moment: {
        term: "Momento",
        text: "Massa moltiplicata per il suo braccio (lb·in o kg·mm). Misura quanto un carico tende a far ruotare l'aeroplano attorno al datum. Alcuni manuali lo riportano diviso per 1000 per lavorare con numeri più piccoli.",
      },
      cg: {
        term: "Baricentro (CG)",
        text: "Punto in cui si può considerare concentrata tutta la massa dell'aeroplano. È il momento totale diviso per la massa totale, espresso come braccio dal datum.",
      },
      envelope: {
        term: "Inviluppo del CG",
        text: "Area del grafico massa/CG entro la quale l'aeroplano è stato certificato. Ha un limite anteriore, un limite posteriore e una massa massima; il punto del caricamento deve restare all'interno al decollo e all'atterraggio.",
      },
      station: {
        term: "Stazione di carico",
        text: "Ogni posizione in cui si può mettere un carico e che ha un braccio definito: sedili anteriori e posteriori, bagagliai, serbatoi del carburante.",
      },
      "empty-weight": {
        term: "Massa a vuoto di base (BEW)",
        text: "Massa dell'aeroplano con gli equipaggiamenti installati, il carburante non utilizzabile e l'olio al pieno, senza occupanti, bagagli né carburante utilizzabile. È propria di ogni esemplare ed è riportata, con il suo braccio o momento, nell'ultimo rapporto di pesata.",
      },
      "useful-load": {
        term: "Carico utile",
        text: "Differenza tra la massa massima e la massa a vuoto di base: ciò che si può distribuire tra occupanti, bagagli e carburante utilizzabile.",
      },
      mtow: {
        term: "Massa massima al decollo (MTOW)",
        text: "Massa massima con cui l'aeroplano può iniziare la corsa di decollo. È un limite strutturale e di prestazioni fissato in certificazione.",
      },
      "ramp-weight": {
        term: "Massa massima di rampa",
        text: "Massa massima ammessa a terra, prima del rullaggio. È leggermente superiore alla MTOW perché considera il carburante consumato in avviamento, rullaggio e prova motore.",
      },
      mlw: {
        term: "Massa massima all'atterraggio (MLW)",
        text: "Massa massima con cui si può atterrare. Su molti aeroplani leggeri coincide con la MTOW; su quelli più grandi è inferiore e obbliga a consumare carburante prima dell'atterraggio.",
      },
      mzfw: {
        term: "Massa massima senza carburante (MZFW)",
        text: "Massa massima dell'aeroplano caricato ma senza carburante utilizzabile. Tutta la massa oltre quel valore deve essere carburante; il limite protegge la struttura dell'ala.",
      },
      "usable-fuel": {
        term: "Carburante utilizzabile",
        text: "Carburante che il motore può effettivamente consumare in volo. Quello non utilizzabile resta nei serbatoi e nelle tubazioni ed è già compreso nella massa a vuoto. Il carburante si inserisce in massa: circa 6 lb per gallone di AVGAS e circa 6,7 lb per gallone di Jet A.",
      },
      mac: {
        term: "Corda media aerodinamica (%MAC)",
        text: "Un altro modo di esprimere il CG: come percentuale della corda media aerodinamica dell'ala invece che come braccio dal datum. È comune su turboelica e jet.",
      },
      tcds: {
        term: "Scheda dati del certificato di tipo (TCDS)",
        text: "Documento dell'autorità (FAA, EASA) che riassume i limiti approvati di un modello: masse massime, limiti del CG, datum e bracci delle stazioni.",
      },
      poh: {
        term: "Manuale di volo (POH/AFM)",
        text: "Manuale approvato dell'aeroplano. La sua sezione di massa e centraggio, insieme al rapporto di pesata dell'esemplare, è il riferimento ufficiale per qualsiasi calcolo.",
      },
    },
  },
  about: {
    navLabel: "Metodologia e fonti",
    title: "Metodologia e fonti dei dati di CheckCG: come calcola e verifica",
    description:
      "Da dove provengono i dati di ogni aeromobile, come vengono verificati i calcoli di massa e centraggio, quali sono i limiti dello strumento e chi lo mantiene.",
    h1: "Metodologia e fonti dei dati",
    intro:
      "CheckCG è un calcolatore di massa e centraggio gratuito e open source. Questa pagina spiega da dove provengono i dati, come vengono controllati i calcoli e dove si ferma lo strumento.",
    sections: {
      data: {
        title: "Da dove provengono i dati",
        text: "Masse massime, limiti del CG, bracci e inviluppi di ogni modello sono inseriti a partire dalla scheda dati del certificato di tipo (TCDS) e dal manuale di volo (POH/AFM). Ogni pagina di aeromobile elenca i documenti di origine, la data dell'ultima verifica e ciò che resta da confermare.",
      },
      reliability: {
        title: "Livello di affidabilità di ogni aeromobile",
        text: "Ogni modello ha un livello dichiarato: verificato con la documentazione ufficiale, parzialmente verificato o valori di riferimento stimati. Il catalogo oggi:",
      },
      method: {
        title: "Come calcola e come viene verificato",
        text: "Il calcolo è quello del manuale: si sommano masse e momenti di ogni stazione, il CG è il momento totale diviso per la massa totale e il punto risultante viene confrontato con il poligono dell'inviluppo al decollo, all'atterraggio e senza carburante. Il codice è coperto da test automatici, compreso l'esempio svolto delle guide, ricalcolato a ogni modifica.",
      },
      limits: {
        title: "Che cosa non è",
        text: "È un aiuto, non un documento approvato. La massa a vuoto e il suo braccio cambiano per ogni esemplare e a ogni modifica: vanno inseriti dal rapporto di pesata in vigore. Il manuale di volo e quel rapporto sono sempre il riferimento ufficiale e il pilota in comando è responsabile della verifica del risultato.",
      },
      privacy: {
        title: "Privacy",
        text: "Non c'è registrazione e non ci sono account. Le masse inserite, i propri aeromobili e i link condivisi restano nel browser. Vengono contati solo pochi eventi d'uso anonimi (per esempio un foglio di carico generato), senza IP, cookie di tracciamento né identificatori; l'unico cookie memorizza la lingua scelta.",
      },
      contact: {
        title: "Chi lo mantiene",
        text: "CheckCG è sviluppato da Pablo Alaniz e pubblicato con licenza MIT. Errori nei dati, richieste di aeromobili e correzioni di traduzione sono benvenuti come issue su GitHub.",
      },
    },
    aircraftColumn: "Aeromobile",
    reliabilityColumn: "Affidabilità",
    verifiedColumn: "Ultima verifica",
    repoLink: "Codice sorgente su GitHub",
    issuesLink: "Segnalare un errore o richiedere un aeromobile",
  },
}
