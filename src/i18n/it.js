/**
 * Messaggi dell'interfaccia in italiano.
 * Rispecchia la struttura (e le firme dei parametri) di es.js.
 */
export const it = {
  app: {
    title: (/** @type {string} */ aircraftName) => `${aircraftName} - Massa e centraggio`,
    subtitle: (/** @type {string} */ tcds) => `Calcolo di massa e centraggio basato su ${tcds}`,
    aircraftCardTitle: "Dati dell'aeromobile",
    aircraftCardDescription: "Seleziona il tipo di aeromobile e inserisci le masse",
    aircraftSelectLabel: "Tipo di aeromobile",
    aircraftSelectPlaceholder: "Seleziona un aeromobile",
    requestAircraft: "Manca il tuo aeromobile? Richiedilo su GitHub",
    clearWeights: "Azzera le masse",
    resultsCardTitle: "Risultati del calcolo",
    resultsCardDescription: "Massa totale e centro di gravità",
    noAircraftSelected: "Seleziona un aeromobile per vedere i risultati",
    envelopeSectionTitle: "Inviluppo del centro di gravità",
    envelopeCaption:
      "Il punto nero indica la condizione attuale di massa e CG. Le linee tratteggiate indicano le coordinate esatte. L'aeromobile può operare in sicurezza solo se il punto si trova all'interno dell'area ombreggiata.",
  },

  results: {
    totalWeight: "Massa totale:",
    centerOfGravity: "Centro di gravità:",
    ok: "OK",
    overweight: "MASSA ECCESSIVA",
    cgOutOfLimits: "FUORI LIMITI",
    readyForTakeoff: "✅ AEROMOBILE PRONTO AL DECOLLO",
    readyDetail: "Massa e centraggio entro i limiti",
    notFitForTakeoff: "⚠️ NON IDONEO AL DECOLLO",
    overweightDetail: "Massa superata. ",
    cgOutDetail: "Centro di gravità fuori limiti.",
  },

  safety: {
    title: "Avvisi di sicurezza",
    weightUsage: "Utilizzo della massa:",
    cgMargin: "Margine del CG:",
    weightNearLimit: (/** @type {string|number} */ pct) =>
      `Massa al ${pct}% del massimo consentito`,
    cgNearForward: (/** @type {string|number} */ margin, /** @type {string} */ unit = '"') =>
      `Centro di gravità molto vicino al limite anteriore (margine di ${margin}${unit})`,
    cgNearAft: (/** @type {string|number} */ margin, /** @type {string} */ unit = '"') =>
      `Centro di gravità molto vicino al limite posteriore (margine di ${margin}${unit})`,
    reduceWeight: (/** @type {string|number} */ value, /** @type {string} */ unit = "lbs") =>
      `Valuta di ridurre la massa di ${value} ${unit} per un margine di sicurezza maggiore`,
    dataPartial: "Dati verificati parzialmente - conferma con la documentazione ufficiale",
    dataEstimated: "Dati stimati - conferma con la documentazione ufficiale",
  },

  aircraftInfo: {
    emptyWeight: (/** @type {string|number} */ value, /** @type {string} */ unit = "lbs") =>
      `Massa a vuoto: ${value} ${unit}`,
    maxWeight: (/** @type {string|number} */ value, /** @type {string} */ unit = "lbs") =>
      `Massa massima: ${value} ${unit}`,
    cgLimits: (
      /** @type {string|number} */ forward,
      /** @type {string|number} */ aft,
      /** @type {string} */ unit = '"'
    ) => `Limiti del CG: ${forward}${unit} - ${aft}${unit}`,
    production: "Produzione:",
    productionDetail: (/** @type {string|number} */ years, /** @type {string|number} */ total) =>
      `${years} (${total} esemplari costruiti)`,
    engines: "Motori:",
    manufacturer: "Costruttore attuale:",
    dataReliability: "Affidabilità dei dati:",
    reliabilityVerified: "Verificati",
    reliabilityPartial: "Parziali",
    reliabilityEstimated: "Stimati",
  },

  stations: {
    pilot: "Pilota",
    copilot: "Copilota",
    frontPassenger: "Passeggero anteriore",
    passenger1: "Passeggero 1",
    passenger2: "Passeggero 2",
    passenger3: "Passeggero 3",
    passenger4: "Passeggero 4",
    rearPassenger1: "Passeggero posteriore 1",
    rearPassenger2: "Passeggero posteriore 2",
    baggage: "Bagagli",
    baggage1: "Bagagli 1",
    baggage2: "Bagagli 2",
    baggageArea1: "Vano bagagli 1",
    baggageArea2: "Vano bagagli 2",
    baggageExtension: "Estensione vano bagagli",
    fuel: "Carburante",
  },

  units: {
    label: "Unità",
    imperial: "Imperiali (lbs, in, gal)",
    metric: "Metriche (kg, mm, L)",
    stationLabel: (/** @type {string} */ label, /** @type {string} */ unit) => `${label} (${unit})`,
    stationLabelMax: (
      /** @type {string} */ label,
      /** @type {string} */ unit,
      /** @type {string|number} */ max
    ) => `${label} (${unit}, max ${max})`,
    fuelInputMode: "Inserisci il carburante per",
    byWeight: "Massa",
    byVolume: "Volume",
    fuelEquivalent: (/** @type {string} */ value) => `Equivale a ${value}`,
    fuelDensityNote: (/** @type {string} */ density) => `Densità AVGAS: ${density}`,
    millimeters: "millimetri",
    kilograms: "chilogrammi",
    axisNoteMetric: "Braccio del C.G. - mm dietro il datum STA 0.0",
  },

  dataSources: {
    title: "Riferimenti ufficiali e fonti",
    lastUpdated: "Ultimo aggiornamento:",
    verifiedSources: "Fonti verificate:",
    pendingVerification: "⚠️ In attesa di verifica:",
    aircraftSpecificTitle: "⚠️ Dati specifici dell'aeromobile",
    basedOn: "Esempio basato su:",
    disclaimerLabel: "Importante:",
    disclaimer:
      "Per i calcoli operativi di massa e centraggio consulta sempre la documentazione ufficiale specifica del tuo aeromobile. Questo strumento è solo un riferimento generale.",
  },

  chart: {
    title: (/** @type {string} */ tcds) => `Inviluppo del CG — ${tcds}`,
    axisNote: "Braccio del C.G. - Pollici dietro il datum STA 0.0",
    tooltipTitle: "Informazioni sul punto",
    tooltipCg: (/** @type {string|number} */ value, /** @type {string} */ unit = '"') =>
      `CG: braccio ${value}${unit}`,
    tooltipWeight: (/** @type {string|number} */ value, /** @type {string} */ unit = "lbs") =>
      `Massa: ${value} ${unit}`,
    envelopeLimit: "Limite dell'inviluppo",
    operatingPoint: "Punto operativo",
    xUnit: "pollici",
    yUnit: "libbre",
  },

  flightPhases: {
    title: "Massa all'atterraggio e senza carburante",
    fuelBurnLabel: "Consumo di carburante previsto",
    fuelBurnPlaceholder: "800",
    fuelLoaded: (/** @type {string|number} */ value, unit = "lbs") =>
      `Carburante imbarcato: ${value} ${unit}`,
    noFuelStation: "Questo aeromobile non ha una stazione carburante definita",
    phase: "Fase",
    weight: "Massa",
    cg: "CG",
    status: "Stato",
    takeoff: "Decollo",
    landing: "Atterraggio",
    zeroFuel: "Senza carburante (ZFW)",
    inEnvelope: "OK",
    outOfEnvelope: "FUORI",
    readyForLanding: "✅ ATTERRAGGIO ENTRO I LIMITI",
    landingOkDetail: "Massa e centraggio all'atterraggio entro i limiti",
    notFitForLanding: "⚠️ ATTERRAGGIO FUORI LIMITI",
    overMaxLandingWeight: (/** @type {string|number} */ value, unit = "lbs") =>
      `La massa all'atterraggio supera il massimo (${value} ${unit})`,
    overMaxZeroFuelWeight: (/** @type {string|number} */ value, unit = "lbs") =>
      `La massa senza carburante supera il massimo (${value} ${unit})`,
    landingOutOfEnvelope: "Centro di gravità all'atterraggio fuori dall'inviluppo",
    zeroFuelOutOfEnvelope: "Centro di gravità senza carburante fuori dall'inviluppo",
    burnExceedsFuel: (
      /** @type {string|number} */ burn,
      /** @type {string|number} */ loaded,
      unit = "lbs"
    ) => `Il consumo previsto (${burn} ${unit}) supera il carburante imbarcato (${loaded} ${unit})`,
    chartLanding: "Atterraggio",
    chartZeroFuel: "Senza carburante",
    chartBurnPath: "Consumo carburante",
  },

  customAircraft: {
    title: "I miei aeromobili (per marche)",
    description:
      "Inserisci la massa a vuoto e il braccio dal Weight & Balance Report del tuo aeromobile. Inviluppo, stazioni e limiti provengono dal modello base.",
    baseModelLabel: "Modello base",
    registrationLabel: "Marche",
    registrationPlaceholder: "I-ABCD",
    emptyWeightLabel: "Massa a vuoto",
    emptyArmLabel: "Braccio della massa a vuoto",
    save: "Salva aeromobile",
    empty: "Non hai ancora salvato nessun aeromobile.",
    listLabel: "Aeromobili salvati",
    recordDetail: (/** @type {string} */ weight, /** @type {string} */ arm) => `${weight} @ ${arm}`,
    remove: (/** @type {string} */ registration) => `Elimina ${registration}`,
    sourceDocument: "Weight & Balance Report dell'aeromobile (dati inseriti dall'utente)",
    specificWarning:
      "Massa a vuoto e braccio inseriti dall'utente dal Weight & Balance Report di questo aeromobile. Inviluppo, stazioni e limiti provengono dal modello base: verificali con il POH del tuo aeromobile.",
    errors: {
      registrationRequired: "Inserisci le marche.",
      registrationInvalid:
        "Marche non valide (solo lettere, cifre e trattini, da 2 a 10 caratteri).",
      baseModelUnknown: "Seleziona un modello base.",
      emptyWeightInvalid: "Inserisci una massa a vuoto maggiore di 0.",
      emptyWeightAboveMax: "La massa a vuoto deve essere inferiore alla massa massima del modello.",
      emptyArmInvalid: "Inserisci un braccio maggiore di 0.",
    },
  },

  share: {
    button: "Condividi",
    buttonLabel: "Condividi un link a questo calcolo",
    copied: "Link copiato",
    copyFailed: "Impossibile copiare il link",
    showQr: "Mostra QR",
    hideQr: "Nascondi QR",
    qrAlt: "Codice QR con il link a questo calcolo",
    qrFailed: "Impossibile generare il codice QR",
    shareTitle: (/** @type {string} */ aircraftName) => `Massa e centraggio: ${aircraftName}`,
    loaded: "È stato caricato un calcolo condiviso.",
    conflict:
      "Il link contiene un aeromobile le cui marche hai già salvato con una massa a vuoto o un braccio diversi. Non è stato caricato per non sovrascrivere i tuoi dati.",
    invalid: "Il link condiviso non è valido o è incompleto.",
    dismiss: "Chiudi avviso",
  },

  errorBoundary: {
    title: "Qualcosa è andato storto",
    description:
      "Si è verificato un errore imprevisto nell'applicazione. Puoi riprovare o ricaricare la pagina. Se il problema persiste, prova a cancellare i dati salvati del browser.",
    retry: "Riprova",
  },

  fleet: {
    shareTitle: "Condividi la flotta (istruttori e scuole)",
    shareDescription:
      "Crea un link con i tuoi aeromobili per marche, così i tuoi allievi possono importarli sul loro dispositivo. Vengono condivisi solo modello base, marche, massa a vuoto e braccio.",
    schoolNameLabel: "Scuola o aeroclub (facoltativo)",
    schoolNamePlaceholder: "Aeroclub ...",
    shareButton: "Condividi flotta",
    shareEmpty: "Salva almeno un aeromobile per marche per condividere la tua flotta.",
    truncated: (/** @type {number} */ max) => `Sono inclusi solo i primi ${max} aeromobili.`,
    copied: "Link della flotta copiato negli appunti.",
    shared: "Link della flotta condiviso.",
    copyFailed: "Impossibile copiare automaticamente. Copia il link:",
    linkLabel: "Link della flotta",
    importTitle: "Importa flotta",
    importFrom: (/** @type {string} */ name) => `${name} ha condiviso con te la sua flotta.`,
    importAnonymous: "Qualcuno ha condiviso con te una flotta di aeromobili.",
    importListLabel: "Aeromobili da importare",
    overwriteNote:
      "Se hai già salvato alcune di queste marche, i loro dati verranno sostituiti da quelli del link.",
    willOverwrite: "Sostituisce quello salvato",
    verifyNote:
      "Prima del volo verifica massa a vuoto e braccio con il Weight & Balance Report di ciascun aeromobile.",
    importButton: (/** @type {number} */ count) =>
      count === 1 ? "Importa 1 aeromobile" : `Importa ${count} aeromobili`,
    dismiss: "Ignora",
    imported: (/** @type {number} */ count) =>
      count === 1 ? "1 aeromobile importato." : `${count} aeromobili importati.`,
    invalidLink: "Il link della flotta non è valido o è danneggiato.",
    close: "Chiudi",
  },

  footer: {
    madeBy: "Realizzato da",
    sourceCode: "Open source: lascia una ⭐ su GitHub",
    fleetHint: "Sei un istruttore o una scuola di volo? Condividi la tua flotta",
    disclaimer:
      "Questo è un ausilio: il POH/AFM e il Weight & Balance Report del tuo aeromobile sono il riferimento ufficiale. Controlla sempre i risultati.",
    version: (/** @type {string} */ version) => `Versione ${version}`,
  },

  loadSheet: {
    formTitle: "Foglio di carico (stampa / PDF)",
    formDescription:
      "Compila i dati del volo per stampare il foglio di massa e centraggio o salvarlo come PDF.",
    pilot: "Pilota in comando",
    registration: "Marche dell'aeromobile",
    date: "Data",
    departure: "Partenza (ICAO)",
    destination: "Destinazione (ICAO)",
    icaoPlaceholder: "LIRF",
    remarks: "Note",
    printButton: "Stampa foglio di carico / Salva PDF",
    sheetTitle: "Foglio di carico — Massa e centraggio",
    aircraft: "Aeromobile",
    tcds: "TCDS",
    route: "Rotta",
    units: (
      /** @type {string} */ weight,
      /** @type {string} */ arm,
      /** @type {string} */ moment
    ) => `Unità: massa ${weight}, braccio ${arm}, momento ${moment}`,
    stationsTitle: "Distribuzione del carico",
    station: "Stazione",
    weight: "Massa",
    arm: "Braccio",
    moment: "Momento",
    emptyWeight: "Massa a vuoto (base)",
    total: "Totale al decollo",
    phasesTitle: "Fasi del volo",
    phase: "Condizione",
    cg: "CG",
    status: "Inviluppo",
    inEnvelope: "DENTRO",
    outOfEnvelope: "FUORI",
    plannedBurn: "Consumo di carburante previsto",
    limitsTitle: "Limiti",
    maxTakeoffWeight: "Massa massima al decollo",
    maxLandingWeight: "Massa massima all'atterraggio",
    maxZeroFuelWeight: "Massa massima senza carburante",
    cgLimits: "Limiti del CG (ant. / post.)",
    takeoffOk: "Decollo entro i limiti",
    takeoffNotOk: "DECOLLO FUORI LIMITI",
    warningsTitle: "Avvisi di sicurezza",
    noWarnings: "Nessun avviso.",
    envelopeTitle: "Inviluppo del CG",
    dataTitle: "Affidabilità dei dati e fonti",
    reliability: "Affidabilità:",
    pending: "In attesa di verifica:",
    remarksTitle: "Note",
    signature: "Firma del pilota in comando",
    generatedBy: "Generato con CheckCG",
    disclaimer:
      "Strumento solo di riferimento. Il manuale di volo dell'aeromobile (POH/AFM) e il rapporto di massa e centraggio prevalgono su questo foglio.",
  },

  guides: {
    navLabel: "Guide",
    footerLink: "Guide su massa e centraggio",
    homeTitle: "Guide su massa e centraggio",
    homeIntro: "Impara a fare il calcolo a mano e a capire i limiti del tuo aereo.",
    indexTitle: "Guide su massa e centraggio per piloti | CheckCG",
    indexDescription:
      "Guide gratuite su massa e centraggio: come calcolare il centro di gravità, la massa, il braccio e il momento con un esempio svolto, e come leggere l'inviluppo del CG.",
    indexH1: "Guide su massa e centraggio",
    indexIntro:
      "Spiegazioni chiare per allievi piloti, piloti e istruttori. Ogni guida termina con un link al calcolatore, così puoi esercitarti con il tuo aereo.",
    breadcrumbHome: "Home",
    updated: "Aggiornato:",
    faqTitle: "Domande frequenti",
    ctaTitle: "Provalo nel calcolatore",
    ctaText:
      "Inserisci la massa a vuoto dal rapporto di massa e centraggio e la massa di ogni stazione: CheckCG calcola il CG al decollo, all'atterraggio e senza carburante, e stampa il foglio di carico. Gratis e offline.",
    ctaButton: "Apri il calcolatore",
    ctaAircraft: "Dati di riferimento per aeromobile:",
    otherGuides: "Altre guide",
    readGuide: "Leggi la guida",
    disclaimer:
      "Materiale di studio. Il POH/AFM e il rapporto di massa e centraggio del tuo aeromobile sono i riferimenti ufficiali.",
  },

  seo: {
    siteName: "CheckCG",
    ogLocale: "it_IT",
    // Social preview images (src/pages/og/**), rendered at build time.
    og: {
      title: "Massa e centraggio",
      tagline: "Calcolatore gratuito del centro di gravità. Funziona offline, senza registrazione.",
      envelope: "Inviluppo del CG",
    },
    languageLabel: "Lingua",
    calculatorTitle: "Calcolatore interattivo",
    loading: "Caricamento del calcolatore…",
    noscript:
      "Il calcolatore richiede JavaScript. I dati di riferimento di questa pagina sono disponibili anche senza.",
    appDescription:
      "Calcolatore gratuito di massa e centraggio per aeromobili: centro di gravità, inviluppo del CG e foglio di carico. Funziona offline, senza registrazione.",
    home: {
      title: "Calcolatore di massa e centraggio per aeromobili | CheckCG",
      description:
        "Calcola massa e centraggio e il centro di gravità del tuo aeromobile con i dati del TCDS e del POH. Gratis, offline e senza registrazione.",
      h1: "Calcolatore di massa e centraggio per aeromobili",
      intro1:
        "Il calcolo di massa e centraggio verifica, prima di ogni volo, che l'aeromobile non superi la massa massima e che il suo centro di gravità (CG) resti all'interno dell'inviluppo approvato. Un CG fuori limiti compromette stabilità e controllo anche quando la massa totale è corretta.",
      intro2:
        "CheckCG somma la massa a vuoto e ogni stazione di carico (equipaggio, passeggeri, bagagli e carburante), calcola il momento e il CG risultanti e li confronta con l'inviluppo del costruttore, comprese le condizioni all'atterraggio e senza carburante. Funziona nel browser, senza registrazione e offline.",
      aircraftListTitle: "Aeromobili supportati",
      aircraftLink: (/** @type {string} */ name) => `Massa e centraggio ${name}`,
    },
    aircraft: {
      title: (/** @type {string} */ name) =>
        `Massa e centraggio ${name}: calcolatore del CG | CheckCG`,
      description: (/** @type {string} */ name, /** @type {string} */ maxWeight) =>
        `Calcolatore di massa e centraggio per ${name}: massa massima ${maxWeight}, bracci delle stazioni, limiti e inviluppo del CG. Gratis e offline.`,
      h1: (/** @type {string} */ name) => `Massa e centraggio ${name}`,
      intro: (/** @type {string} */ name, /** @type {string} */ tcds) =>
        `Calcola la massa totale e il centro di gravità del ${name} con i dati di riferimento di ${tcds}. Inserisci la massa in ogni stazione e il calcolatore verifica la massa massima e l'inviluppo del CG al decollo e all'atterraggio.`,
      specsTitle: "Dati di massa e centraggio",
      tcds: "Scheda dati del certificato di tipo (TCDS)",
      manufacturer: "Costruttore",
      engines: "Motori",
      maxWeight: "Massa massima al decollo",
      emptyWeight: "Massa a vuoto di riferimento",
      emptyArm: "Braccio della massa a vuoto",
      cgLimits: "Limiti del CG",
      cgLimitsValue: (/** @type {string} */ forward, /** @type {string} */ aft) =>
        `Da ${forward} a ${aft} dietro il datum`,
      stationsTitle: "Stazioni di carico e bracci",
      station: "Stazione",
      arm: "Braccio (in)",
      maxLoad: "Massimo (lbs)",
      envelopeTitle: "Punti dell'inviluppo del CG",
      envelopeCaption:
        "Vertici del poligono dell'inviluppo (braccio in pollici dietro il datum, massa in libbre).",
      point: "Punto",
      envelopeArm: "Braccio (in)",
      envelopeWeight: "Massa (lbs)",
      reliabilityTitle: "Affidabilità dei dati e fonti",
      reliabilityLabel: "Affidabilità:",
      reliabilityVerifiedComplete: "verificati con la documentazione ufficiale",
      reliabilityVerifiedPartial: "verificati parzialmente",
      reliabilityEstimated: "valori di riferimento stimati",
      lastVerified: "Ultima verifica:",
      sourcesLabel: "Fonti:",
      pendingLabel: "In attesa di verifica:",
      ownDataWarning:
        "Massa a vuoto e braccio cambiano per ogni singola cellula: usa i valori del rapporto di massa e centraggio del tuo aeromobile (puoi aggiungerli come aeromobile personalizzato nel calcolatore).",
      faqTitle: "Domande frequenti",
      faqWhatQ: (/** @type {string} */ name) => `Come si calcolano massa e centraggio del ${name}?`,
      faqWhatA: (/** @type {string} */ name) =>
        `Moltiplica la massa di ogni stazione per il suo braccio per ottenerne il momento, somma masse e momenti (inclusa la massa a vuoto) e dividi il momento totale per la massa totale per ottenere il CG. Il ${name} è entro i limiti quando la massa non supera il massimo e il punto massa/CG si trova all'interno dell'inviluppo.`,
      faqMaxWeightQ: (/** @type {string} */ name) => `Qual è la massa massima del ${name}?`,
      faqMaxWeightA: (
        /** @type {string} */ name,
        /** @type {string} */ maxWeight,
        /** @type {string} */ tcds
      ) =>
        `La massa massima al decollo di riferimento del ${name} è ${maxWeight}, secondo ${tcds}. Confermalo sempre nel POH/AFM del tuo aeromobile.`,
      faqCgQ: (/** @type {string} */ name) => `Quali sono i limiti del CG del ${name}?`,
      faqCgA: (
        /** @type {string} */ name,
        /** @type {string} */ forward,
        /** @type {string} */ aft
      ) =>
        `Il CG del ${name} deve trovarsi tra ${forward} (limite anteriore) e ${aft} (limite posteriore) dietro il datum. Il limite effettivo dipende dalla massa: l'inviluppo in questa pagina ne mostra la forma completa.`,
      faqOwnQ: (/** @type {string} */ name) => `Posso usare questo calcolatore per il mio ${name}?`,
      faqOwnA: (/** @type {string} */ name) =>
        `Sì, come riferimento. Ogni ${name} ha la propria massa a vuoto e il proprio braccio in base all'equipaggiamento: inseriscili dal suo rapporto di massa e centraggio come aeromobile personalizzato. Il POH/AFM resta sempre il riferimento ufficiale.`,
      otherAircraftTitle: "Altri aeromobili",
    },
  },
}
