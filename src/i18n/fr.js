/**
 * UI messages in French.
 * Mirrors the structure (and parameter signatures) of es.js.
 */
export const fr = {
  app: {
    title: (/** @type {string} */ aircraftName) => `${aircraftName} - Masse et centrage`,
    subtitle: (/** @type {string} */ tcds) => `Calcul de masse et centrage basé sur ${tcds}`,
    aircraftCardTitle: "Données de l'aéronef",
    aircraftCardDescription: "Sélectionnez le type d'aéronef et saisissez les masses",
    aircraftSelectLabel: "Type d'aéronef",
    aircraftSelectPlaceholder: "Sélectionnez un aéronef",
    aircraftGroups: {
      light: "Avions légers (jusqu'à 5 places)",
      multi: "Avions de 6 places ou plus",
      custom: "Mes aéronefs",
    },
    requestAircraft: "Votre avion n'y est pas ? Demandez-le sur GitHub",
    clearWeights: "Effacer les masses",
    resultsCardTitle: "Résultats du calcul",
    resultsCardDescription: "Masse totale et centre de gravité",
    noAircraftSelected: "Sélectionnez un aéronef pour voir les résultats",
    envelopeSectionTitle: "Enveloppe de centrage",
    envelopeCaption:
      "Le point noir indique la condition actuelle de masse et de centrage. Les lignes pointillées indiquent les coordonnées exactes. L'aéronef ne peut être exploité en sécurité que si le point se trouve dans la zone ombrée.",
  },

  results: {
    totalWeight: "Masse totale :",
    centerOfGravity: "Centre de gravité :",
    ok: "OK",
    overweight: "SURCHARGE",
    cgOutOfLimits: "HORS LIMITES",
    readyForTakeoff: "✅ AÉRONEF PRÊT POUR LE DÉCOLLAGE",
    readyDetail: "Masse et centrage dans les limites",
    notFitForTakeoff: "⚠️ INAPTE AU DÉCOLLAGE",
    overweightDetail: "Masse dépassée. ",
    cgOutDetail: "Centre de gravité hors limites.",
  },

  safety: {
    title: "Alertes de sécurité",
    weightUsage: "Utilisation de la masse :",
    cgMargin: "Marge de centrage :",
    weightNearLimit: (/** @type {string|number} */ pct) => `Masse à ${pct} % du maximum autorisé`,
    cgNearForward: (/** @type {string|number} */ margin, /** @type {string} */ unit = '"') =>
      `Centre de gravité très proche de la limite avant (marge de ${margin}${unit})`,
    cgNearAft: (/** @type {string|number} */ margin, /** @type {string} */ unit = '"') =>
      `Centre de gravité très proche de la limite arrière (marge de ${margin}${unit})`,
    reduceWeight: (/** @type {string|number} */ value, /** @type {string} */ unit = "lbs") =>
      `Envisagez de réduire la masse de ${value} ${unit} pour une plus grande marge de sécurité`,
    dataPartial: "Données partiellement vérifiées - à confirmer avec la documentation officielle",
    dataEstimated: "Données estimées - à confirmer avec la documentation officielle",
  },

  aircraftInfo: {
    emptyWeight: (/** @type {string|number} */ value, /** @type {string} */ unit = "lbs") =>
      `Masse à vide : ${value} ${unit}`,
    maxWeight: (/** @type {string|number} */ value, /** @type {string} */ unit = "lbs") =>
      `Masse max : ${value} ${unit}`,
    cgLimits: (
      /** @type {string|number} */ forward,
      /** @type {string|number} */ aft,
      /** @type {string} */ unit = '"'
    ) => `Limites de centrage : ${forward}${unit} - ${aft}${unit}`,
    production: "Production :",
    productionDetail: (/** @type {string|number} */ years, /** @type {string|number} */ total) =>
      `${years} (${total} construits)`,
    engines: "Moteurs :",
    manufacturer: "Constructeur actuel :",
    dataReliability: "Fiabilité des données :",
    reliabilityVerified: "Vérifiées",
    reliabilityPartial: "Partielles",
    reliabilityEstimated: "Estimées",
  },

  stations: {
    pilot: "Pilote",
    copilot: "Copilote",
    frontPassenger: "Passager avant",
    passenger1: "Passager 1",
    passenger2: "Passager 2",
    passenger3: "Passager 3",
    passenger4: "Passager 4",
    passenger5: "Passager 5",
    passenger6: "Passager 6",
    passenger7: "Passager 7",
    passenger8: "Passager 8",
    passenger9: "Passager 9",
    passenger10: "Passager 10",
    passenger11: "Passager 11",
    passenger12: "Passager 12",
    passenger13: "Passager 13",
    passenger14: "Passager 14",
    passenger15: "Passager 15",
    passenger16: "Passager 16",
    passenger17: "Passager 17",
    passenger18: "Passager 18",
    passenger19: "Passager 19",
    patient: "Patient (civière)",
    medicalEquipment: "Équipement médical",
    rearPassenger1: "Passager arrière 1",
    rearPassenger2: "Passager arrière 2",
    baggage: "Bagages",
    baggage1: "Bagages 1",
    baggage2: "Bagages 2",
    baggageArea1: "Zone bagages 1",
    baggageArea2: "Zone bagages 2",
    baggageExtension: "Extension de soute à bagages",
    fuel: "Carburant",
  },

  fuelConversions: {
    title: "Conversions rapides de carburant",
    boxes: {
      l: "LITRES",
      usGal: "GAL US",
      impGal: "GAL IMP.",
      lb: "LIVRES",
      kg: "KILOGRAMMES",
    },
    diagramNote: (/** @type {string} */ fuel, /** @type {string} */ density) =>
      `${fuel} ${density} kg/L · dans le sens de la flèche ×, à contresens ÷`,
    fuelDependent:
      "Les facteurs en surbrillance dépendent du carburant ; les autres sont des conversions d'unités fixes.",
    units: {
      usGal: "gal US",
      impGal: "gal imp.",
      l: "L",
      lb: "lb",
      kg: "kg",
    },
    fuels: {
      avgas: "AVGAS (6,0 lb/gal US)",
      "jet-a": "Jet A (6,7 lb/gal US)",
    },
    amount: "Quantité",
    unit: "Unité",
    fuel: "Carburant",
    result: "Équivaut à",
  },

  standardWeights: {
    title: "Masses forfaitaires",
    description:
      "Valeurs des boutons rapides d'équipage et de passagers. Utilisez celles du manuel d'exploitation de votre exploitant.",
    crew: "Équipage",
    adult: "Adulte",
    child: "Enfant",
    apply: (
      /** @type {string} */ kind,
      /** @type {string} */ weight,
      /** @type {string} */ station
    ) => `Charger ${kind} (${weight}) : ${station}`,
  },

  units: {
    label: "Unités",
    imperial: "Impérial (lbs, in, gal)",
    metric: "Métrique (kg, mm, L)",
    stationLabel: (/** @type {string} */ label, /** @type {string} */ unit) => `${label} (${unit})`,
    stationLabelMax: (
      /** @type {string} */ label,
      /** @type {string} */ unit,
      /** @type {string|number} */ max
    ) => `${label} (${unit}, max ${max})`,
    fuelInputMode: "Saisir le carburant en",
    byWeight: "Masse",
    byVolume: "Volume",
    fuelEquivalent: (/** @type {string} */ value) => `Équivaut à ${value}`,
    fuelDensityNote: (/** @type {string} */ fuel, /** @type {string} */ density) =>
      `Densité ${fuel} : ${density}`,
    millimeters: "millimètres",
    kilograms: "kilogrammes",
    axisNoteMetric: "Bras de levier du CG - mm en arrière de la référence STA 0.0",
  },

  dataSources: {
    title: "Références et sources officielles",
    lastUpdated: "Dernière mise à jour :",
    verifiedSources: "Sources vérifiées :",
    pendingVerification: "⚠️ En attente de vérification :",
    aircraftSpecificTitle: "⚠️ Données propres à chaque aéronef",
    basedOn: "Exemple basé sur :",
    disclaimerLabel: "Important :",
    disclaimer:
      "Consultez toujours la documentation officielle propre à votre aéronef pour les calculs opérationnels de masse et centrage. Cet outil est fourni à titre de référence générale uniquement.",
  },

  chart: {
    title: (/** @type {string} */ tcds) => `Enveloppe de centrage — ${tcds}`,
    axisNote: "Bras de levier du CG - pouces en arrière de la référence STA 0.0",
    tooltipTitle: "Informations du point",
    tooltipCg: (/** @type {string|number} */ value, /** @type {string} */ unit = '"') =>
      `CG : bras de ${value}${unit}`,
    tooltipWeight: (/** @type {string|number} */ value, /** @type {string} */ unit = "lbs") =>
      `Masse : ${value} ${unit}`,
    envelopeLimit: "Limite de l'enveloppe",
    operatingPoint: "Point de fonctionnement",
    xUnit: "pouces",
    yUnit: "livres",
  },

  flightPhases: {
    title: "Phases de vol",
    fuelBurnLabel: "Consommation prévue (délestage)",
    fuelBurnPlaceholder: "800",
    taxiFuelLabel: "Carburant de mise en route et roulage",
    taxiFuelPlaceholder: "0",
    taxiFuelHint:
      "Déduit du carburant embarqué (masse et moment) pour obtenir la condition de décollage.",
    fuelLoaded: (/** @type {string|number} */ value, unit = "lbs") =>
      `Carburant embarqué : ${value} ${unit}`,
    noFuelStation: "Cet aéronef n'a pas de poste carburant défini",
    phase: "Phase",
    weight: "Masse",
    cg: "CG",
    status: "État",
    ramp: "Parking (avant roulage)",
    takeoff: "Décollage",
    landing: "Atterrissage",
    zeroFuel: "Sans carburant (ZFW)",
    inEnvelope: "OK",
    outOfEnvelope: "HORS",
    readyForLanding: "✅ ATTERRISSAGE DANS LES LIMITES",
    landingOkDetail: "Masse et centrage à l'atterrissage dans les limites",
    notFitForLanding: "⚠️ ATTERRISSAGE HORS LIMITES",
    overMaxLandingWeight: (/** @type {string|number} */ value, unit = "lbs") =>
      `La masse à l'atterrissage dépasse le maximum (${value} ${unit})`,
    overMaxZeroFuelWeight: (/** @type {string|number} */ value, unit = "lbs") =>
      `La masse sans carburant dépasse le maximum (${value} ${unit})`,
    landingOutOfEnvelope: "Centre de gravité à l'atterrissage hors de l'enveloppe",
    zeroFuelOutOfEnvelope: "Centre de gravité sans carburant hors de l'enveloppe",
    overMaxRampWeight: (/** @type {string|number} */ value, unit = "lbs") =>
      `La masse au parking dépasse le maximum (${value} ${unit})`,
    taxiExceedsFuel: (
      /** @type {string|number} */ taxi,
      /** @type {string|number} */ loaded,
      unit = "lbs"
    ) =>
      `Le carburant de roulage (${taxi} ${unit}) dépasse le carburant embarqué (${loaded} ${unit})`,
    burnExceedsFuel: (
      /** @type {string|number} */ burn,
      /** @type {string|number} */ loaded,
      unit = "lbs"
    ) =>
      `La consommation prévue (${burn} ${unit}) dépasse le carburant à bord au décollage (${loaded} ${unit})`,
    chartLanding: "Atterrissage",
    chartZeroFuel: "Sans carburant",
    chartBurnPath: "Consommation",
  },

  margins: {
    title: "Marges de chargement",
    payloadAvailable: "Charge encore disponible :",
    overBy: (/** @type {string|number} */ value, /** @type {string} */ unit = "lbs") =>
      `Dépassement de ${value} ${unit}`,
    extraFuel: "Carburant que vous pouvez encore ajouter :",
    limitedByNote: (/** @type {string} */ limit) => `limité par ${limit}`,
    limitedBy: {
      tank: "la capacité du réservoir",
      weight: "la masse maximale au décollage",
      ramp: "la masse maximale au parking",
      landing: "la masse maximale à l'atterrissage",
      envelope: "l'enveloppe de centrage",
    },
    fuelAtLanding: "Carburant à l'atterrissage :",
    stationOverMax: (
      /** @type {string} */ station,
      /** @type {string|number} */ value,
      /** @type {string|number} */ max,
      /** @type {string} */ unit = "lbs"
    ) => `${station} : ${value} ${unit} dépasse le maximum du poste (${max} ${unit})`,
  },

  savedLoads: {
    title: "Chargements enregistrés",
    description:
      "Enregistrez les chargements que vous utilisez souvent (solo, double commande, cabine pleine) et appliquez-les d'un geste. Vérifiez chaque élément avant chaque vol.",
    nameLabel: "Nom du chargement",
    namePlaceholder: "Instruction en double commande",
    save: "Enregistrer le chargement actuel",
    empty: "Aucun chargement enregistré pour cet aéronef.",
    listLabel: "Chargements enregistrés pour cet aéronef",
    detail: (/** @type {string} */ weight) => `${weight} chargés`,
    apply: (/** @type {string} */ name) => `Appliquer ${name}`,
    remove: (/** @type {string} */ name) => `Supprimer ${name}`,
    errors: {
      nameRequired: "Saisissez un nom pour le chargement.",
      nothingToSave: "Saisissez au moins une masse avant d'enregistrer.",
    },
  },

  advice: {
    title: "Comment revenir dans les limites",
    cgForward: (/** @type {string|number} */ value, /** @type {string} */ unit = '"') =>
      `Le CG est à ${value}${unit} en avant de la limite pour cette masse.`,
    cgAft: (/** @type {string|number} */ value, /** @type {string} */ unit = '"') =>
      `Le CG est à ${value}${unit} en arrière de la limite pour cette masse.`,
    overweight: (/** @type {string|number} */ value, /** @type {string} */ unit = "lbs") =>
      `La masse au décollage dépasse le maximum de ${value} ${unit}.`,
    remove: (
      /** @type {string|number} */ value,
      /** @type {string} */ unit,
      /** @type {string} */ station
    ) => `Retirer ${value} ${unit} de : ${station}`,
    add: (
      /** @type {string|number} */ value,
      /** @type {string} */ unit,
      /** @type {string} */ station
    ) => `Ajouter ${value} ${unit} à : ${station}`,
    move: (
      /** @type {string|number} */ value,
      /** @type {string} */ unit,
      /** @type {string} */ from,
      /** @type {string} */ to
    ) => `Déplacer ${value} ${unit} de ${from} vers ${to}`,
    none: "Aucune modification unique des bagages ou du carburant ne suffit : répartissez autrement le chargement et vérifiez de nouveau.",
    note: "Chaque option ramène à elle seule le décollage dans les limites. Ce n'est que de l'arithmétique : vérifiez l'atterrissage et votre manuel de vol.",
  },

  customAircraft: {
    title: "Mon aéronef (par immatriculation)",
    description:
      "Saisissez la masse à vide et le bras de levier de la fiche de pesée de votre aéronef. L'enveloppe, les postes et les limites proviennent du modèle de base.",
    baseModelLabel: "Modèle de base",
    registrationLabel: "Immatriculation",
    registrationPlaceholder: "F-GABC",
    emptyWeightLabel: "Masse à vide",
    emptyArmLabel: "Bras de levier à vide",
    save: "Enregistrer l'aéronef",
    empty: "Vous n'avez encore enregistré aucun aéronef.",
    listLabel: "Aéronefs enregistrés",
    recordDetail: (/** @type {string} */ weight, /** @type {string} */ arm) => `${weight} @ ${arm}`,
    remove: (/** @type {string} */ registration) => `Supprimer ${registration}`,
    sourceDocument: "Fiche de pesée de l'aéronef (données saisies par l'utilisateur)",
    specificWarning:
      "Masse à vide et bras de levier saisis par l'utilisateur à partir de la fiche de pesée de cet aéronef. L'enveloppe, les postes et les limites proviennent du modèle de base : vérifiez-les dans le manuel de vol de votre aéronef.",
    errors: {
      registrationRequired: "Saisissez l'immatriculation.",
      registrationInvalid:
        "Immatriculation invalide (lettres, chiffres et tirets uniquement, 2 à 10 caractères).",
      baseModelUnknown: "Sélectionnez un modèle de base.",
      emptyWeightInvalid: "Saisissez une masse à vide supérieure à 0.",
      emptyWeightAboveMax: "La masse à vide doit être inférieure à la masse maximale du modèle.",
      emptyArmInvalid: "Saisissez un bras de levier supérieur à 0.",
    },
  },

  share: {
    button: "Partager",
    buttonLabel: "Partager un lien vers ce calcul",
    copied: "Lien copié",
    copyFailed: "Impossible de copier le lien",
    showQr: "Afficher le QR",
    hideQr: "Masquer le QR",
    qrAlt: "Code QR avec le lien vers ce calcul",
    qrFailed: "Impossible de générer le code QR",
    shareTitle: (/** @type {string} */ aircraftName) => `Masse et centrage : ${aircraftName}`,
    loaded: "Un calcul partagé a été chargé.",
    conflict:
      "Le lien contient un aéronef dont vous avez déjà enregistré l'immatriculation avec une masse à vide ou un bras de levier différents. Il n'a pas été chargé afin de ne pas écraser vos données.",
    invalid: "Le lien partagé est invalide ou incomplet.",
    dismiss: "Fermer l'avis",
  },

  errorBoundary: {
    title: "Une erreur est survenue",
    description:
      "Une erreur inattendue s'est produite dans l'application. Vous pouvez réessayer ou recharger la page. Si le problème persiste, essayez d'effacer les données enregistrées du navigateur.",
    retry: "Réessayer",
  },

  fleet: {
    shareTitle: "Partager la flotte (instructeurs et écoles)",
    shareDescription:
      "Créez un lien avec vos aéronefs par immatriculation pour que vos élèves les importent sur leur appareil. Seuls le modèle de base, l'immatriculation, la masse à vide et le bras de levier sont partagés.",
    schoolNameLabel: "École ou aéroclub (facultatif)",
    schoolNamePlaceholder: "Aéroclub ...",
    shareButton: "Partager la flotte",
    shareEmpty: "Enregistrez au moins un aéronef par immatriculation pour partager votre flotte.",
    truncated: (/** @type {number} */ max) => `Seuls les ${max} premiers aéronefs sont inclus.`,
    copied: "Lien de la flotte copié dans le presse-papiers.",
    shared: "Lien de la flotte partagé.",
    copyFailed: "Copie automatique impossible. Copiez le lien :",
    linkLabel: "Lien de la flotte",
    importTitle: "Importer une flotte",
    importFrom: (/** @type {string} */ name) => `${name} a partagé sa flotte avec vous.`,
    importAnonymous: "Quelqu'un a partagé une flotte d'aéronefs avec vous.",
    importListLabel: "Aéronefs à importer",
    overwriteNote:
      "Si vous avez déjà enregistré l'une de ces immatriculations, ses données seront remplacées par celles du lien.",
    willOverwrite: "Remplace l'aéronef enregistré",
    verifyNote:
      "Vérifiez la masse à vide et le bras de levier avec la fiche de pesée de chaque aéronef avant de voler.",
    importButton: (/** @type {number} */ count) =>
      count === 1 ? "Importer 1 aéronef" : `Importer ${count} aéronefs`,
    dismiss: "Ignorer",
    imported: (/** @type {number} */ count) =>
      count === 1 ? "1 aéronef importé." : `${count} aéronefs importés.`,
    invalidLink: "Le lien de la flotte est invalide ou endommagé.",
    close: "Fermer",
  },

  footer: {
    madeBy: "Réalisé par",
    sourceCode: "Code ouvert : donnez-lui une ⭐ sur GitHub",
    fleetHint: "Instructeur ou école de pilotage ? Partagez votre flotte",
    disclaimer:
      "Ceci est une aide : le manuel de vol (POH/AFM) et la fiche de pesée de votre aéronef sont la référence officielle. Vérifiez toujours les résultats.",
    version: (/** @type {string} */ version) => `Version ${version}`,
  },

  loadSheet: {
    formTitle: "Devis de masse et centrage (impression / PDF)",
    formDescription:
      "Renseignez les informations du vol pour imprimer le devis de masse et centrage ou l'enregistrer en PDF.",
    pilot: "Commandant de bord",
    registration: "Immatriculation de l'aéronef",
    date: "Date",
    departure: "Départ (OACI)",
    destination: "Destination (OACI)",
    icaoPlaceholder: "LFPG",
    remarks: "Observations",
    printButton: "Imprimer le devis / Enregistrer en PDF",
    sheetTitle: "Devis de masse et centrage",
    aircraft: "Aéronef",
    tcds: "TCDS",
    route: "Trajet",
    stationsTitle: "Répartition du chargement",
    emptyStationsOmitted: (/** @type {number} */ count) =>
      count === 1
        ? "1 poste sans chargement n'est pas listé"
        : `${count} postes sans chargement ne sont pas listés`,
    station: "Poste",
    weight: "Masse",
    arm: "Bras de levier",
    moment: "Moment",
    emptyWeight: "Masse à vide (de base)",
    total: "Total au décollage",
    phasesTitle: "Phases de vol",
    phase: "Condition",
    cg: "CG",
    status: "Enveloppe",
    inEnvelope: "DANS",
    outOfEnvelope: "HORS",
    plannedBurn: "Consommation prévue (délestage)",
    rampTotal: "Total au parking",
    taxiFuel: "Carburant de mise en route et roulage",
    limitsTitle: "Limites",
    maxTakeoffWeight: "Masse max au décollage",
    maxLandingWeight: "Masse max à l'atterrissage",
    maxZeroFuelWeight: "Masse max sans carburant",
    maxRampWeight: "Masse max au parking",
    cgLimits: "Limites de centrage (avant / arrière)",
    takeoffOk: "Décollage dans les limites",
    takeoffNotOk: "DÉCOLLAGE HORS LIMITES",
    warningsTitle: "Avertissements de sécurité",
    noWarnings: "Aucun avertissement.",
    envelopeTitle: "Enveloppe de centrage",
    dataTitle: "Fiabilité des données et sources",
    reliability: "Fiabilité :",
    pending: "En attente de vérification :",
    remarksTitle: "Observations",
    signature: "Signature du commandant de bord",
    generatedBy: "Généré avec CheckCG",
    disclaimer:
      "Outil de référence uniquement. Le manuel de vol de l'aéronef (POH/AFM) et sa fiche de pesée prévalent sur ce document.",
  },

  guides: {
    navLabel: "Guides",
    footerLink: "Guides de masse et centrage",
    homeTitle: "Guides de masse et centrage",
    homeIntro: "Apprenez à faire le calcul à la main et à comprendre les limites de votre avion.",
    indexTitle: "Guides de masse et centrage pour pilotes | CheckCG",
    indexDescription:
      "Guides gratuits de masse et centrage : calculer le centre de gravité, masse, bras de levier et moment avec un exemple, et lire l'enveloppe de centrage.",
    indexH1: "Guides de masse et centrage",
    indexIntro:
      "Des explications claires pour élèves pilotes, pilotes et instructeurs. Chaque guide se termine par un lien vers le calculateur pour vous entraîner avec votre propre avion.",
    breadcrumbHome: "Accueil",
    updated: "Mis à jour :",
    faqTitle: "Questions fréquentes",
    ctaTitle: "Essayez dans le calculateur",
    ctaText:
      "Saisissez la masse à vide de votre fiche de pesée et la masse de chaque poste : CheckCG calcule le centrage au décollage, à l'atterrissage et sans carburant, et imprime le devis de masse et centrage. Gratuit et hors ligne.",
    ctaButton: "Ouvrir le calculateur",
    ctaAircraft: "Données de référence par aéronef :",
    otherGuides: "Autres guides",
    readGuide: "Lire le guide",
    disclaimer:
      "Support d'étude. Le manuel de vol (POH/AFM) et la fiche de pesée de votre aéronef sont les références qui font foi.",
  },

  seo: {
    siteName: "CheckCG",
    ogLocale: "fr_FR",
    // Social preview images (src/pages/og/**), rendered at build time.
    og: {
      title: "Masse et centrage",
      tagline: "Calculateur de centrage gratuit. Hors ligne, sans inscription.",
      envelope: "Enveloppe de centrage",
    },
    languageLabel: "Langue",
    calculatorTitle: "Calculateur interactif",
    loading: "Chargement du calculateur…",
    noscript:
      "Le calculateur nécessite JavaScript. Les données de référence de cette page sont disponibles sans lui.",
    appDescription:
      "Calculateur gratuit de masse et centrage d'avion : centre de gravité, enveloppe de centrage et devis imprimable. Fonctionne hors ligne, sans inscription.",
    home: {
      title: "Calculateur de masse et centrage avion gratuit (weight and balance) | CheckCG",
      description:
        "Calculez la masse et le centrage de votre avion en quelques secondes : centre de gravité, enveloppe au décollage et à l'atterrissage, devis imprimable. Gratuit et hors ligne.",
      h1: "Calculateur de masse et centrage d'avion",
      intro1:
        "Le devis de masse et centrage (weight and balance en anglais) vérifie, avant chaque vol, que l'avion ne dépasse pas sa masse maximale et que son centre de gravité (CG) reste dans l'enveloppe approuvée. Un centrage hors limites dégrade la stabilité et le contrôle, même lorsque la masse totale est correcte.",
      intro2:
        "CheckCG additionne la masse à vide et chaque poste de chargement (équipage, passagers, bagages et carburant), calcule le moment et le centrage résultants et les compare à l'enveloppe du constructeur, y compris à l'atterrissage et sans carburant. Il fonctionne dans votre navigateur, sans inscription et hors ligne.",
      aircraftListTitle: "Aéronefs disponibles",
      aircraftLink: (/** @type {string} */ name) => `Masse et centrage du ${name}`,
    },
    aircraft: {
      title: (/** @type {string} */ name) =>
        `${name} : calcul de masse et centrage (weight & balance) | CheckCG`,
      description: (/** @type {string} */ name, /** @type {string} */ maxWeight) =>
        `Calculateur gratuit de masse et centrage du ${name} : vérifiez la masse max (${maxWeight}) et le CG dans l'enveloppe au décollage et à l'atterrissage, puis imprimez le devis.`,
      h1: (/** @type {string} */ name) => `Masse et centrage du ${name}`,
      intro: (/** @type {string} */ name, /** @type {string} */ tcds) =>
        `Calculez la masse totale et le centre de gravité du ${name} à partir des données de référence de ${tcds}. Saisissez la masse de chaque poste et le calculateur vérifie la masse maximale et l'enveloppe de centrage au décollage et à l'atterrissage.`,
      specsTitle: "Données de masse et centrage",
      tcds: "Fiche de données du certificat de type (TCDS)",
      manufacturer: "Constructeur",
      engines: "Moteurs",
      maxWeight: "Masse maximale au décollage (MTOW)",
      emptyWeight: "Masse à vide de référence",
      emptyArm: "Bras de levier à vide",
      cgLimits: "Limites de centrage",
      cgLimitsValue: (/** @type {string} */ forward, /** @type {string} */ aft) =>
        `de ${forward} à ${aft} en arrière de la référence`,
      stationsTitle: "Postes de chargement et bras de levier",
      station: "Poste",
      arm: "Bras de levier (in)",
      maxLoad: "Maximum (lbs)",
      envelopeTitle: "Points de l'enveloppe de centrage",
      envelopeCaption:
        "Sommets du polygone de l'enveloppe (bras de levier en pouces en arrière de la référence, masse en livres).",
      point: "Point",
      envelopeArm: "Bras de levier (in)",
      envelopeWeight: "Masse (lbs)",
      reliabilityTitle: "Fiabilité des données et sources",
      reliabilityLabel: "Fiabilité :",
      reliabilityVerifiedComplete: "vérifiées avec la documentation officielle",
      reliabilityVerifiedPartial: "partiellement vérifiées",
      reliabilityEstimated: "valeurs de référence estimées",
      lastVerified: "Dernière vérification :",
      sourcesLabel: "Sources :",
      pendingLabel: "En attente de vérification :",
      ownDataWarning:
        "La masse à vide et le bras de levier diffèrent d'une cellule à l'autre : utilisez les valeurs de la fiche de pesée de votre aéronef (vous pouvez les ajouter comme aéronef personnalisé dans le calculateur).",
      faqTitle: "Questions fréquentes",
      faqWhatQ: (/** @type {string} */ name) =>
        `Comment calcule-t-on la masse et le centrage du ${name} ?`,
      faqWhatA: (/** @type {string} */ name) =>
        `Multipliez la masse de chaque poste par son bras de levier pour obtenir son moment, additionnez les masses et les moments (masse à vide comprise) et divisez le moment total par la masse totale pour obtenir le CG. C'est le calcul que les manuels en anglais appellent weight and balance. Le ${name} est dans les limites lorsque la masse ne dépasse pas le maximum et que le point masse/CG se trouve dans l'enveloppe.`,
      faqMaxWeightQ: (/** @type {string} */ name) => `Quelle est la masse maximale du ${name} ?`,
      faqMaxWeightA: (
        /** @type {string} */ name,
        /** @type {string} */ maxWeight,
        /** @type {string} */ tcds
      ) =>
        `La masse maximale au décollage de référence du ${name} est de ${maxWeight}, selon ${tcds}. Confirmez-la toujours dans le manuel de vol (POH/AFM) de votre aéronef.`,
      faqCgQ: (/** @type {string} */ name) => `Quelles sont les limites de centrage du ${name} ?`,
      faqCgA: (
        /** @type {string} */ name,
        /** @type {string} */ forward,
        /** @type {string} */ aft
      ) =>
        `Le CG du ${name} doit se situer entre ${forward} (limite avant) et ${aft} (limite arrière) en arrière de la référence. La limite effective dépend de la masse : l'enveloppe de cette page en montre la forme complète.`,
      faqOwnQ: (/** @type {string} */ name) => `Puis-je utiliser ce calculateur pour mon ${name} ?`,
      faqOwnA: (/** @type {string} */ name) =>
        `Oui, à titre de référence. Chaque ${name} a sa propre masse à vide et son propre bras de levier selon son équipement : saisissez-les à partir de sa fiche de pesée comme aéronef personnalisé. Le manuel de vol (POH/AFM) reste toujours la référence officielle.`,
      otherAircraftTitle: "Autres aéronefs",
    },
  },
}
