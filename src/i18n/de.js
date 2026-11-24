/**
 * UI-Texte auf Deutsch.
 * Spiegelt die Struktur (und die Parametersignaturen) von es.js.
 */
export const de = {
  app: {
    title: (/** @type {string} */ aircraftName) => `${aircraftName} - Masse und Schwerpunkt`,
    subtitle: (/** @type {string} */ tcds) =>
      `Masse- und Schwerpunktberechnung auf Grundlage von ${tcds}`,
    aircraftCardTitle: "Luftfahrzeugdaten",
    aircraftCardDescription: "Luftfahrzeugmuster auswählen und die Massen eingeben",
    aircraftSelectLabel: "Luftfahrzeugmuster",
    aircraftSelectPlaceholder: "Luftfahrzeug auswählen",
    aircraftGroups: {
      light: "Leichtflugzeuge (bis 5 Sitze)",
      multi: "Flugzeuge mit 6 oder mehr Sitzen",
      custom: "Meine Luftfahrzeuge",
    },
    requestAircraft: "Muster fehlt? Auf GitHub anfragen",
    clearWeights: "Massen löschen",
    resultsCardTitle: "Ergebnis der Berechnung",
    resultsCardDescription: "Gesamtmasse und Schwerpunktlage",
    noAircraftSelected: "Luftfahrzeug auswählen, um die Ergebnisse zu sehen",
    envelopeSectionTitle: "Schwerpunkt-Envelope",
    envelopeCaption:
      "Der schwarze Punkt zeigt die aktuelle Masse und Schwerpunktlage. Die gestrichelten Linien markieren die genauen Koordinaten. Das Luftfahrzeug darf nur betrieben werden, wenn der Punkt innerhalb der schattierten Fläche liegt.",
  },

  results: {
    totalWeight: "Gesamtmasse:",
    centerOfGravity: "Schwerpunkt:",
    ok: "OK",
    overweight: "ÜBERLADEN",
    cgOutOfLimits: "AUSSERHALB DER GRENZEN",
    readyForTakeoff: "✅ LUFTFAHRZEUG STARTBEREIT",
    readyDetail: "Masse und Schwerpunkt innerhalb der Grenzen",
    notFitForTakeoff: "⚠️ NICHT STARTBEREIT",
    overweightDetail: "Masse überschritten. ",
    cgOutDetail: "Schwerpunkt außerhalb der Grenzen.",
  },

  safety: {
    title: "Sicherheitshinweise",
    weightUsage: "Ausnutzung der Masse:",
    cgMargin: "Schwerpunktreserve:",
    weightNearLimit: (/** @type {string|number} */ pct) =>
      `Masse bei ${pct} % des zulässigen Höchstwerts`,
    cgNearForward: (/** @type {string|number} */ margin, /** @type {string} */ unit = '"') =>
      `Schwerpunkt sehr nahe an der vorderen Grenze (${margin}${unit} Reserve)`,
    cgNearAft: (/** @type {string|number} */ margin, /** @type {string} */ unit = '"') =>
      `Schwerpunkt sehr nahe an der hinteren Grenze (${margin}${unit} Reserve)`,
    reduceWeight: (/** @type {string|number} */ value, /** @type {string} */ unit = "lbs") =>
      `Für mehr Sicherheitsreserve die Masse um ${value} ${unit} verringern`,
    dataPartial: "Teilweise verifizierte Daten - mit den offiziellen Unterlagen abgleichen",
    dataEstimated: "Geschätzte Daten - mit den offiziellen Unterlagen abgleichen",
  },

  aircraftInfo: {
    emptyWeight: (/** @type {string|number} */ value, /** @type {string} */ unit = "lbs") =>
      `Leermasse: ${value} ${unit}`,
    maxWeight: (/** @type {string|number} */ value, /** @type {string} */ unit = "lbs") =>
      `Höchstmasse: ${value} ${unit}`,
    cgLimits: (
      /** @type {string|number} */ forward,
      /** @type {string|number} */ aft,
      /** @type {string} */ unit = '"'
    ) => `Schwerpunktgrenzen: ${forward}${unit} - ${aft}${unit}`,
    production: "Produktion:",
    productionDetail: (/** @type {string|number} */ years, /** @type {string|number} */ total) =>
      `${years} (${total} gebaut)`,
    engines: "Triebwerke:",
    manufacturer: "Aktueller Hersteller:",
    dataReliability: "Zuverlässigkeit der Daten:",
    reliabilityVerified: "Verifiziert",
    reliabilityPartial: "Teilweise",
    reliabilityEstimated: "Geschätzt",
  },

  stations: {
    pilot: "Pilot",
    copilot: "Copilot",
    frontPassenger: "Passagier vorn",
    passenger1: "Passagier 1",
    passenger2: "Passagier 2",
    passenger3: "Passagier 3",
    passenger4: "Passagier 4",
    passenger5: "Passagier 5",
    passenger6: "Passagier 6",
    passenger7: "Passagier 7",
    passenger8: "Passagier 8",
    passenger9: "Passagier 9",
    passenger10: "Passagier 10",
    passenger11: "Passagier 11",
    passenger12: "Passagier 12",
    passenger13: "Passagier 13",
    passenger14: "Passagier 14",
    passenger15: "Passagier 15",
    passenger16: "Passagier 16",
    passenger17: "Passagier 17",
    passenger18: "Passagier 18",
    passenger19: "Passagier 19",
    patient: "Patient (Trage)",
    medicalEquipment: "Medizinische Ausrüstung",
    rearPassenger1: "Passagier hinten 1",
    rearPassenger2: "Passagier hinten 2",
    baggage: "Gepäck",
    baggage1: "Gepäck 1",
    baggage2: "Gepäck 2",
    baggageArea1: "Gepäckraum 1",
    baggageArea2: "Gepäckraum 2",
    baggageExtension: "Gepäckraumerweiterung",
    fuel: "Kraftstoff",
  },

  fuelConversions: {
    title: "Kraftstoff schnell umrechnen",
    boxes: {
      l: "LITER",
      usGal: "US GAL",
      impGal: "IMP. GAL",
      lb: "PFUND",
      kg: "KILOGRAMM",
    },
    diagramNote: (/** @type {string} */ fuel, /** @type {string} */ density) =>
      `${fuel} ${density} kg/L · in Pfeilrichtung ×, gegen die Pfeilrichtung ÷`,
    fuelDependent:
      "Hervorgehobene Faktoren hängen vom Kraftstoff ab; die übrigen sind feste Einheitenumrechnungen.",
    units: {
      usGal: "US gal",
      impGal: "imp. gal",
      l: "L",
      lb: "lb",
      kg: "kg",
    },
    fuels: {
      avgas: "AVGAS (6,0 lb/US gal)",
      "jet-a": "Jet A (6,7 lb/US gal)",
    },
    amount: "Menge",
    unit: "Einheit",
    fuel: "Kraftstoff",
    result: "Entspricht",
  },

  standardWeights: {
    title: "Standardmassen",
    description:
      "Werte für die Schnelltasten für Besatzung und Passagiere. Maßgeblich sind die Werte aus dem Betriebshandbuch des Betreibers.",
    crew: "Besatzung",
    adult: "Erwachsener",
    child: "Kind",
    apply: (
      /** @type {string} */ kind,
      /** @type {string} */ weight,
      /** @type {string} */ station
    ) => `${kind} laden (${weight}): ${station}`,
  },

  units: {
    label: "Einheiten",
    imperial: "Imperial (lbs, in, gal)",
    metric: "Metrisch (kg, mm, L)",
    stationLabel: (/** @type {string} */ label, /** @type {string} */ unit) => `${label} (${unit})`,
    stationLabelMax: (
      /** @type {string} */ label,
      /** @type {string} */ unit,
      /** @type {string|number} */ max
    ) => `${label} (${unit}, max. ${max})`,
    fuelInputMode: "Kraftstoff eingeben als",
    byWeight: "Masse",
    byVolume: "Volumen",
    fuelEquivalent: (/** @type {string} */ value) => `Entspricht ${value}`,
    fuelDensityNote: (/** @type {string} */ fuel, /** @type {string} */ density) =>
      `Dichte ${fuel}: ${density}`,
    millimeters: "Millimeter",
    kilograms: "Kilogramm",
    axisNoteMetric: "Schwerpunkt-Hebelarm - mm hinter der Bezugsebene STA 0.0",
  },

  dataSources: {
    title: "Offizielle Referenzen und Quellen",
    lastUpdated: "Zuletzt aktualisiert:",
    verifiedSources: "Verifizierte Quellen:",
    pendingVerification: "⚠️ Prüfung ausstehend:",
    aircraftSpecificTitle: "⚠️ Luftfahrzeugspezifische Daten",
    basedOn: "Beispiel auf Grundlage von:",
    disclaimerLabel: "Wichtig:",
    disclaimer:
      "Für die operationelle Masse- und Schwerpunktberechnung immer die offiziellen Unterlagen des jeweiligen Luftfahrzeugs heranziehen. Dieses Werkzeug dient nur der allgemeinen Orientierung.",
  },

  chart: {
    title: (/** @type {string} */ tcds) => `Schwerpunkt-Envelope — ${tcds}`,
    axisNote: "Schwerpunkt-Hebelarm - Zoll hinter der Bezugsebene STA 0.0",
    tooltipTitle: "Punktinformationen",
    tooltipCg: (/** @type {string|number} */ value, /** @type {string} */ unit = '"') =>
      `CG: ${value}${unit} Hebelarm`,
    tooltipWeight: (/** @type {string|number} */ value, /** @type {string} */ unit = "lbs") =>
      `Masse: ${value} ${unit}`,
    envelopeLimit: "Envelope-Grenze",
    operatingPoint: "Betriebspunkt",
    xUnit: "Zoll",
    yUnit: "Pfund",
    loadingPath: "Beladungspfad",
    loadingPathToggle: "Beladungspfad anzeigen",
    loadingPathHint:
      "Die graue Linie zeigt, wie sich der Schwerpunkt mit jeder hinzugefügten Station verschiebt, vom Leergewicht bis zum Start. Die orange Linie ist der im Flug verbrauchte Kraftstoff.",
    emptyPoint: "Leergewicht",
    addedStation: (
      /** @type {string} */ label,
      /** @type {string|number} */ weight,
      /** @type {string} */ unit = "lbs"
    ) => `+ ${label} (${weight} ${unit})`,
  },

  flightPhases: {
    title: "Flugphasen",
    fuelBurnLabel: "Geplanter Kraftstoffverbrauch",
    fuelBurnPlaceholder: "800",
    taxiFuelLabel: "Kraftstoff für Anlassen und Rollen",
    taxiFuelPlaceholder: "0",
    taxiFuelHint:
      "Wird vom getankten Kraftstoff abgezogen (Masse und Moment), um den Startzustand zu erhalten.",
    fuelLoaded: (/** @type {string|number} */ value, unit = "lbs") =>
      `Getankter Kraftstoff: ${value} ${unit}`,
    noFuelStation: "Für dieses Luftfahrzeug ist keine Kraftstoffstation definiert",
    phase: "Phase",
    weight: "Masse",
    cg: "CG",
    status: "Status",
    ramp: "Rampe (vor dem Rollen)",
    takeoff: "Start",
    landing: "Landung",
    zeroFuel: "Ohne Kraftstoff (ZFW)",
    inEnvelope: "OK",
    outOfEnvelope: "AUSSERHALB",
    readyForLanding: "✅ LANDUNG INNERHALB DER GRENZEN",
    landingOkDetail: "Masse und Schwerpunkt bei der Landung innerhalb der Grenzen",
    notFitForLanding: "⚠️ LANDUNG AUSSERHALB DER GRENZEN",
    overMaxLandingWeight: (/** @type {string|number} */ value, unit = "lbs") =>
      `Landemasse überschreitet den Höchstwert (${value} ${unit})`,
    overMaxZeroFuelWeight: (/** @type {string|number} */ value, unit = "lbs") =>
      `Masse ohne Kraftstoff überschreitet den Höchstwert (${value} ${unit})`,
    landingOutOfEnvelope: "Schwerpunkt bei der Landung außerhalb der Envelope",
    zeroFuelOutOfEnvelope: "Schwerpunkt ohne Kraftstoff außerhalb der Envelope",
    overMaxRampWeight: (/** @type {string|number} */ value, unit = "lbs") =>
      `Rampenmasse überschreitet den Höchstwert (${value} ${unit})`,
    taxiExceedsFuel: (
      /** @type {string|number} */ taxi,
      /** @type {string|number} */ loaded,
      unit = "lbs"
    ) => `Rollkraftstoff (${taxi} ${unit}) übersteigt den getankten Kraftstoff (${loaded} ${unit})`,
    burnExceedsFuel: (
      /** @type {string|number} */ burn,
      /** @type {string|number} */ loaded,
      unit = "lbs"
    ) =>
      `Geplanter Verbrauch (${burn} ${unit}) übersteigt den Kraftstoff an Bord beim Start (${loaded} ${unit})`,
    chartLanding: "Landung",
    chartZeroFuel: "Ohne Kraftstoff",
    chartBurnPath: "Kraftstoffverbrauch",
    cgLeavesEnvelopeInFlight: (/** @type {string|number} */ burned, unit = "lbs") =>
      `Der Schwerpunkt verlässt im Flug die Grenzen, nachdem etwa ${burned} ${unit} Kraftstoff verbraucht wurden`,
  },

  margins: {
    title: "Beladungsreserven",
    payloadAvailable: "Noch verfügbare Zuladung:",
    overBy: (/** @type {string|number} */ value, /** @type {string} */ unit = "lbs") =>
      `Um ${value} ${unit} überschritten`,
    extraFuel: "Kraftstoff, der noch getankt werden kann:",
    limitedByNote: (/** @type {string} */ limit) => `begrenzt durch ${limit}`,
    limitedBy: {
      tank: "das Tankvolumen",
      weight: "die höchstzulässige Abflugmasse",
      ramp: "die höchstzulässige Rampenmasse",
      landing: "die höchstzulässige Landemasse",
      envelope: "die Schwerpunkt-Envelope",
    },
    fuelAtLanding: "Kraftstoff bei der Landung:",
    stationOverMax: (
      /** @type {string} */ station,
      /** @type {string|number} */ value,
      /** @type {string|number} */ max,
      /** @type {string} */ unit = "lbs"
    ) => `${station}: ${value} ${unit} überschreitet den Höchstwert der Station (${max} ${unit})`,
  },

  savedLoads: {
    title: "Gespeicherte Beladungen",
    description:
      "Häufig geflogene Beladungen (solo, mit Fluglehrer, volle Kabine) speichern und mit einem Tipp anwenden. Vor jedem Flug jeden Posten prüfen.",
    nameLabel: "Name der Beladung",
    namePlaceholder: "Schulung mit Fluglehrer",
    save: "Aktuelle Beladung speichern",
    empty: "Für dieses Luftfahrzeug sind noch keine Beladungen gespeichert.",
    listLabel: "Gespeicherte Beladungen für dieses Luftfahrzeug",
    detail: (/** @type {string} */ weight) => `${weight} geladen`,
    apply: (/** @type {string} */ name) => `${name} anwenden`,
    remove: (/** @type {string} */ name) => `${name} löschen`,
    errors: {
      nameRequired: "Einen Namen für die Beladung eingeben.",
      nothingToSave: "Vor dem Speichern mindestens eine Masse eingeben.",
    },
  },

  advice: {
    title: "So kommt die Beladung zurück in die Grenzen",
    cgForward: (/** @type {string|number} */ value, /** @type {string} */ unit = '"') =>
      `Der Schwerpunkt liegt ${value}${unit} vor der Grenze für diese Masse.`,
    cgAft: (/** @type {string|number} */ value, /** @type {string} */ unit = '"') =>
      `Der Schwerpunkt liegt ${value}${unit} hinter der Grenze für diese Masse.`,
    overweight: (/** @type {string|number} */ value, /** @type {string} */ unit = "lbs") =>
      `Die Abflugmasse liegt ${value} ${unit} über dem Höchstwert.`,
    remove: (
      /** @type {string|number} */ value,
      /** @type {string} */ unit,
      /** @type {string} */ station
    ) => `${value} ${unit} entfernen: ${station}`,
    add: (
      /** @type {string|number} */ value,
      /** @type {string} */ unit,
      /** @type {string} */ station
    ) => `${value} ${unit} hinzufügen: ${station}`,
    move: (
      /** @type {string|number} */ value,
      /** @type {string} */ unit,
      /** @type {string} */ from,
      /** @type {string} */ to
    ) => `${value} ${unit} umladen: ${from} → ${to}`,
    none: "Keine einzelne Änderung bei Gepäck oder Kraftstoff behebt es: die Beladung neu verteilen und erneut prüfen.",
    note: "Jede Option allein bringt den Start zurück in die Grenzen. Es handelt sich nur um Arithmetik: Landung und Flughandbuch (POH) prüfen.",
  },

  customAircraft: {
    title: "Meine Luftfahrzeuge (nach Kennzeichen)",
    description:
      "Leermasse und Hebelarm aus dem Wägebericht (Weight & Balance Report) des Luftfahrzeugs eingeben. Envelope, Stationen und Grenzen stammen vom Basismuster.",
    baseModelLabel: "Basismuster",
    registrationLabel: "Kennzeichen",
    registrationPlaceholder: "D-EABC",
    emptyWeightLabel: "Leermasse",
    emptyArmLabel: "Hebelarm der Leermasse",
    save: "Luftfahrzeug speichern",
    empty: "Es ist noch kein Luftfahrzeug gespeichert.",
    listLabel: "Gespeicherte Luftfahrzeuge",
    recordDetail: (/** @type {string} */ weight, /** @type {string} */ arm) => `${weight} @ ${arm}`,
    remove: (/** @type {string} */ registration) => `${registration} löschen`,
    sourceDocument: "Wägebericht des Luftfahrzeugs (vom Nutzer eingegebene Daten)",
    specificWarning:
      "Leermasse und Hebelarm wurden vom Nutzer aus dem Wägebericht dieses Luftfahrzeugs eingegeben. Envelope, Stationen und Grenzen stammen vom Basismuster: mit dem Flughandbuch (POH) des Luftfahrzeugs abgleichen.",
    errors: {
      registrationRequired: "Kennzeichen eingeben.",
      registrationInvalid:
        "Ungültiges Kennzeichen (nur Buchstaben, Ziffern und Bindestriche, 2 bis 10 Zeichen).",
      baseModelUnknown: "Basismuster auswählen.",
      emptyWeightInvalid: "Eine Leermasse größer als 0 eingeben.",
      emptyWeightAboveMax: "Die Leermasse muss unter der Höchstmasse des Musters liegen.",
      emptyArmInvalid: "Einen Hebelarm größer als 0 eingeben.",
    },
  },

  share: {
    button: "Teilen",
    buttonLabel: "Link zu dieser Berechnung teilen",
    copied: "Link kopiert",
    copyFailed: "Link konnte nicht kopiert werden",
    showQr: "QR-Code anzeigen",
    hideQr: "QR-Code ausblenden",
    qrAlt: "QR-Code mit dem Link zu dieser Berechnung",
    qrFailed: "QR-Code konnte nicht erzeugt werden",
    shareTitle: (/** @type {string} */ aircraftName) => `Masse und Schwerpunkt: ${aircraftName}`,
    loaded: "Geteilte Berechnung geladen.",
    conflict:
      "Der Link enthält ein Luftfahrzeug, dessen Kennzeichen bereits mit anderer Leermasse oder anderem Hebelarm gespeichert ist. Es wurde nicht geladen, damit die eigenen Daten nicht überschrieben werden.",
    invalid: "Der geteilte Link ist ungültig oder unvollständig.",
    dismiss: "Hinweis schließen",
  },

  errorBoundary: {
    title: "Etwas ist schiefgelaufen",
    description:
      "In der Anwendung ist ein unerwarteter Fehler aufgetreten. Erneut versuchen oder die Seite neu laden. Besteht das Problem weiter, die gespeicherten Daten des Browsers löschen.",
    retry: "Erneut versuchen",
  },

  fleet: {
    shareTitle: "Flotte teilen (Fluglehrer und Flugschulen)",
    shareDescription:
      "Einen Link mit den eigenen Luftfahrzeugen nach Kennzeichen erstellen, damit Flugschüler sie auf ihrem Gerät importieren können. Geteilt werden nur Basismuster, Kennzeichen, Leermasse und Hebelarm.",
    schoolNameLabel: "Flugschule oder Verein (optional)",
    schoolNamePlaceholder: "Luftsportverein ...",
    shareButton: "Flotte teilen",
    shareEmpty: "Mindestens ein Luftfahrzeug nach Kennzeichen speichern, um die Flotte zu teilen.",
    truncated: (/** @type {number} */ max) => `Nur die ersten ${max} Luftfahrzeuge sind enthalten.`,
    copied: "Flottenlink in die Zwischenablage kopiert.",
    shared: "Flottenlink geteilt.",
    copyFailed: "Automatisches Kopieren nicht möglich. Link kopieren:",
    linkLabel: "Flottenlink",
    importTitle: "Flotte importieren",
    importFrom: (/** @type {string} */ name) => `${name} hat eine Flotte geteilt.`,
    importAnonymous: "Jemand hat eine Luftfahrzeugflotte geteilt.",
    importListLabel: "Zu importierende Luftfahrzeuge",
    overwriteNote:
      "Bereits gespeicherte Kennzeichen aus dieser Liste werden durch die Daten des Links ersetzt.",
    willOverwrite: "Ersetzt gespeicherten Eintrag",
    verifyNote:
      "Vor dem Flug Leermasse und Hebelarm mit dem Wägebericht jedes Luftfahrzeugs abgleichen.",
    importButton: (/** @type {number} */ count) =>
      count === 1 ? "1 Luftfahrzeug importieren" : `${count} Luftfahrzeuge importieren`,
    dismiss: "Verwerfen",
    imported: (/** @type {number} */ count) =>
      count === 1 ? "1 Luftfahrzeug importiert." : `${count} Luftfahrzeuge importiert.`,
    invalidLink: "Der Flottenlink ist ungültig oder beschädigt.",
    close: "Schließen",
  },

  footer: {
    madeBy: "Entwickelt von",
    sourceCode: "Open Source: ein ⭐ auf GitHub hilft",
    fleetHint: "Fluglehrer oder Flugschule? Flotte teilen",
    disclaimer:
      "Dies ist ein Hilfsmittel: Maßgeblich sind das Flughandbuch (POH/AFM) und der Wägebericht des Luftfahrzeugs. Ergebnisse immer gegenprüfen.",
    version: (/** @type {string} */ version) => `Version ${version}`,
  },

  loadSheet: {
    formTitle: "Ladeblatt (Drucken / PDF)",
    formDescription:
      "Flugdaten ausfüllen, um das Masse- und Schwerpunktblatt zu drucken oder als PDF zu speichern.",
    pilot: "Verantwortlicher Pilot",
    registration: "Kennzeichen",
    date: "Datum",
    departure: "Startflugplatz (ICAO)",
    destination: "Zielflugplatz (ICAO)",
    icaoPlaceholder: "EDDF",
    remarks: "Bemerkungen",
    printButton: "Ladeblatt drucken / als PDF speichern",
    sheetTitle: "Ladeblatt — Masse und Schwerpunkt",
    aircraft: "Luftfahrzeug",
    tcds: "TCDS",
    route: "Strecke",
    stationsTitle: "Verteilung der Beladung",
    emptyStationsOmitted: (/** @type {number} */ count) =>
      count === 1
        ? "1 Station ohne Beladung ist nicht aufgeführt"
        : `${count} Stationen ohne Beladung sind nicht aufgeführt`,
    station: "Station",
    weight: "Masse",
    arm: "Hebelarm",
    moment: "Moment",
    emptyWeight: "Leermasse (Basis)",
    total: "Summe Start",
    phasesTitle: "Flugphasen",
    phase: "Zustand",
    cg: "CG",
    status: "Envelope",
    inEnvelope: "INNERHALB",
    outOfEnvelope: "AUSSERHALB",
    plannedBurn: "Geplanter Kraftstoffverbrauch",
    rampTotal: "Summe Rampe",
    taxiFuel: "Kraftstoff für Anlassen und Rollen",
    limitsTitle: "Grenzwerte",
    maxTakeoffWeight: "Höchstzulässige Abflugmasse",
    maxLandingWeight: "Höchstzulässige Landemasse",
    maxZeroFuelWeight: "Höchstmasse ohne Kraftstoff",
    maxRampWeight: "Höchstzulässige Rampenmasse",
    cgLimits: "Schwerpunktgrenzen (vorn / hinten)",
    takeoffOk: "Start innerhalb der Grenzen",
    takeoffNotOk: "START AUSSERHALB DER GRENZEN",
    warningsTitle: "Sicherheitshinweise",
    noWarnings: "Keine Hinweise.",
    envelopeTitle: "Schwerpunkt-Envelope",
    dataTitle: "Zuverlässigkeit der Daten und Quellen",
    reliability: "Zuverlässigkeit:",
    pending: "Prüfung ausstehend:",
    remarksTitle: "Bemerkungen",
    signature: "Unterschrift des verantwortlichen Piloten",
    generatedBy: "Erstellt mit CheckCG",
    disclaimer:
      "Nur ein Hilfsmittel. Das Flughandbuch (POH/AFM) und der Wägebericht des Luftfahrzeugs haben Vorrang vor diesem Blatt.",
  },

  guides: {
    navLabel: "Ratgeber",
    footerLink: "Ratgeber zu Masse und Schwerpunkt",
    homeTitle: "Ratgeber zu Masse und Schwerpunkt",
    homeIntro: "Die Berechnung von Hand lernen und die Grenzen des eigenen Flugzeugs verstehen.",
    indexTitle: "Masse und Schwerpunkt: Ratgeber für Piloten | CheckCG",
    indexDescription:
      "Kostenlose Ratgeber zu Masse und Schwerpunkt (Weight and Balance): Schwerpunkt berechnen, Masse, Hebelarm und Moment mit Beispiel, Schwerpunkt-Envelope lesen.",
    indexH1: "Ratgeber zu Masse und Schwerpunkt",
    indexIntro:
      "Verständliche Erklärungen für Flugschüler, Piloten und Fluglehrer. Jeder Ratgeber endet mit einem Link zum Rechner, um mit dem eigenen Flugzeug zu üben.",
    breadcrumbHome: "Startseite",
    updated: "Aktualisiert:",
    faqTitle: "Häufige Fragen",
    ctaTitle: "Im Rechner ausprobieren",
    ctaText:
      "Leermasse aus dem Wägebericht und die Masse jeder Station eingeben: CheckCG berechnet den Schwerpunkt für Start, Landung und ohne Kraftstoff und druckt das Ladeblatt. Kostenlos und offline.",
    ctaButton: "Rechner öffnen",
    ctaAircraft: "Referenzdaten nach Luftfahrzeug:",
    otherGuides: "Weitere Ratgeber",
    readGuide: "Ratgeber lesen",
    disclaimer:
      "Lernmaterial. Maßgeblich sind das Flughandbuch (POH/AFM) und der Wägebericht des Luftfahrzeugs.",
  },

  seo: {
    siteName: "CheckCG",
    ogLocale: "de_DE",
    // Vorschaubilder für soziale Netzwerke (src/pages/og/**), beim Build erzeugt.
    og: {
      title: "Masse und Schwerpunkt",
      tagline: "Kostenloser Schwerpunktrechner. Funktioniert offline, ohne Anmeldung.",
      envelope: "Schwerpunkt-Envelope",
    },
    languageLabel: "Sprache",
    calculatorTitle: "Interaktiver Rechner",
    loading: "Rechner wird geladen…",
    noscript:
      "Der Rechner benötigt JavaScript. Die Referenzdaten auf dieser Seite sind auch ohne verfügbar.",
    appDescription:
      "Kostenloser Rechner für Masse und Schwerpunkt (Weight and Balance) von Flugzeugen: Schwerpunkt, Envelope und Ladeblatt. Funktioniert offline, ohne Anmeldung.",
    home: {
      title: "Masse und Schwerpunkt berechnen: Weight & Balance Rechner | CheckCG",
      description:
        "Masse und Schwerpunkt (Weight and Balance) in Sekunden berechnen: Schwerpunkt, Envelope für Start und Landung und druckbares Ladeblatt. Kostenlos, offline, ohne Anmeldung.",
      h1: "Rechner für Masse und Schwerpunkt (Weight & Balance)",
      intro1:
        "Die Masse- und Schwerpunktberechnung (Weight and Balance) stellt vor jedem Flug sicher, dass das Luftfahrzeug seine Höchstmasse nicht überschreitet und der Schwerpunkt (CG) innerhalb der zugelassenen Envelope bleibt. Ein Schwerpunkt außerhalb der Grenzen beeinträchtigt Stabilität und Steuerbarkeit, auch wenn die Gesamtmasse stimmt.",
      intro2:
        "CheckCG addiert die Leermasse und jede Beladestation (Besatzung, Passagiere, Gepäck und Kraftstoff), berechnet das resultierende Moment und den Schwerpunkt und prüft beides gegen die Envelope des Herstellers, auch für die Landung und den Zustand ohne Kraftstoff. Der Rechner läuft im Browser, ohne Anmeldung und offline.",
      aircraftListTitle: "Unterstützte Luftfahrzeuge",
      aircraftLink: (/** @type {string} */ name) => `Masse und Schwerpunkt ${name}`,
    },
    aircraft: {
      title: (/** @type {string} */ name) =>
        `${name}: Masse und Schwerpunkt, Weight & Balance Rechner | CheckCG`,
      description: (/** @type {string} */ name, /** @type {string} */ maxWeight) =>
        `Kostenloser Weight-and-Balance-Rechner für die ${name}: Höchstmasse (${maxWeight}) und Schwerpunkt für Start und Landung prüfen, Ladeblatt drucken. Ohne Anmeldung.`,
      h1: (/** @type {string} */ name) => `Masse und Schwerpunkt ${name}`,
      intro: (/** @type {string} */ name, /** @type {string} */ tcds) =>
        `Gesamtmasse und Schwerpunkt der ${name} mit Referenzdaten aus ${tcds} berechnen (Weight and Balance). Die Masse jeder Station eingeben, und der Rechner prüft die Höchstmasse und die Schwerpunkt-Envelope für Start und Landung.`,
      specsTitle: "Daten zu Masse und Schwerpunkt",
      tcds: "Kennblatt zur Musterzulassung (TCDS)",
      manufacturer: "Hersteller",
      engines: "Triebwerke",
      maxWeight: "Höchstzulässige Abflugmasse (MTOW)",
      emptyWeight: "Referenz-Leermasse",
      emptyArm: "Hebelarm der Leermasse",
      cgLimits: "Schwerpunktgrenzen",
      cgLimitsValue: (/** @type {string} */ forward, /** @type {string} */ aft) =>
        `${forward} bis ${aft} hinter der Bezugsebene`,
      stationsTitle: "Beladestationen und Hebelarme",
      station: "Station",
      arm: "Hebelarm (in)",
      maxLoad: "Maximum (lbs)",
      envelopeTitle: "Punkte der Schwerpunkt-Envelope",
      envelopeCaption:
        "Eckpunkte des Envelope-Polygons (Hebelarm in Zoll hinter der Bezugsebene, Masse in Pfund).",
      point: "Punkt",
      envelopeArm: "Hebelarm (in)",
      envelopeWeight: "Masse (lbs)",
      reliabilityTitle: "Zuverlässigkeit der Daten und Quellen",
      reliabilityLabel: "Zuverlässigkeit:",
      reliabilityVerifiedComplete: "mit den offiziellen Unterlagen abgeglichen",
      reliabilityVerifiedPartial: "teilweise verifiziert",
      reliabilityEstimated: "geschätzte Referenzwerte",
      lastVerified: "Zuletzt geprüft:",
      sourcesLabel: "Quellen:",
      pendingLabel: "Prüfung ausstehend:",
      ownDataWarning:
        "Leermasse und Hebelarm unterscheiden sich bei jedem einzelnen Luftfahrzeug: die Werte aus dem Wägebericht des eigenen Luftfahrzeugs verwenden (im Rechner als eigenes Luftfahrzeug anlegbar).",
      faqTitle: "Häufige Fragen",
      faqWhatQ: (/** @type {string} */ name) =>
        `Wie werden Masse und Schwerpunkt der ${name} berechnet?`,
      faqWhatA: (/** @type {string} */ name) =>
        `Bei der Masse- und Schwerpunktberechnung (Weight and Balance) wird die Masse jeder Station mit ihrem Hebelarm multipliziert, das ergibt das Moment. Massen und Momente (einschließlich der Leermasse) werden addiert, und das Gesamtmoment geteilt durch die Gesamtmasse ergibt den Schwerpunkt. Die ${name} ist innerhalb der Grenzen, wenn die Masse den Höchstwert nicht überschreitet und der Punkt aus Masse und Schwerpunkt innerhalb der Envelope liegt.`,
      faqMaxWeightQ: (/** @type {string} */ name) => `Wie hoch ist die Höchstmasse der ${name}?`,
      faqMaxWeightA: (
        /** @type {string} */ name,
        /** @type {string} */ maxWeight,
        /** @type {string} */ tcds
      ) =>
        `Die höchstzulässige Abflugmasse (MTOW) der ${name} beträgt als Referenzwert ${maxWeight}, laut ${tcds}. Immer im Flughandbuch (POH/AFM) des eigenen Luftfahrzeugs bestätigen.`,
      faqCgQ: (/** @type {string} */ name) => `Welche Schwerpunktgrenzen hat die ${name}?`,
      faqCgA: (
        /** @type {string} */ name,
        /** @type {string} */ forward,
        /** @type {string} */ aft
      ) =>
        `Der Schwerpunkt der ${name} muss zwischen ${forward} (vordere Grenze) und ${aft} (hintere Grenze) hinter der Bezugsebene liegen. Die tatsächliche Grenze hängt von der Masse ab: Die Envelope auf dieser Seite zeigt ihre vollständige Form.`,
      faqOwnQ: (/** @type {string} */ name) =>
        `Kann ich diesen Rechner für meine ${name} verwenden?`,
      faqOwnA: (/** @type {string} */ name) =>
        `Ja, als Orientierung. Jede ${name} hat je nach Ausrüstung ihre eigene Leermasse und ihren eigenen Hebelarm: beide aus dem Wägebericht als eigenes Luftfahrzeug eingeben. Maßgeblich ist immer das Flughandbuch (POH/AFM).`,
      otherAircraftTitle: "Weitere Luftfahrzeuge",
    },
  },
}
