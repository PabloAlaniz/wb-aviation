/** Glossary and "about" page content (fr). Same shape in every language: see pages.test.js. */
export const fr = {
  glossary: {
    navLabel: "Glossaire",
    title: "Glossaire masse et centrage : bras de levier, moment, CG | CheckCG",
    description:
      "Glossaire de masse et centrage pour pilotes : référence, bras de levier, moment, centre de gravité, enveloppe, masse à vide, charge utile, MTOW, MLW, MZFW et %MAC.",
    h1: "Glossaire de masse et centrage",
    intro:
      "Les termes du manuel de vol, de la fiche de pesée et du calculateur, expliqués en une ou deux phrases. En anglais, le même sujet s'appelle weight and balance (ou mass and balance).",
    guideLink: "Guide associé :",
    terms: {
      datum: {
        term: "Référence (datum)",
        text: "Plan vertical imaginaire, choisi par le constructeur, à partir duquel sont mesurées toutes les distances horizontales de l'avion. Il peut se trouver sur la cloison pare-feu, au nez ou même en avant de celui-ci ; le manuel de vol le définit.",
      },
      arm: {
        term: "Bras de levier",
        text: "Distance horizontale entre la référence et une masse (un siège, un réservoir, la soute à bagages). Il se mesure en pouces ou en millimètres et est positif en arrière de la référence.",
      },
      moment: {
        term: "Moment",
        text: "Masse multipliée par son bras de levier (lb·in ou kg·mm). Il mesure la tendance d'une charge à faire pivoter l'avion autour de la référence. Certains manuels le donnent divisé par 1000 pour manipuler des nombres plus petits.",
      },
      cg: {
        term: "Centre de gravité (CG)",
        text: "Point où l'on peut considérer que toute la masse de l'avion est concentrée. C'est le moment total divisé par la masse totale, exprimé comme un bras de levier depuis la référence.",
      },
      envelope: {
        term: "Enveloppe de centrage",
        text: "Zone du graphique masse/centrage dans laquelle l'avion a été certifié. Elle a une limite avant, une limite arrière et une masse maximale ; le point de chargement doit s'y trouver au décollage comme à l'atterrissage.",
      },
      station: {
        term: "Poste de chargement",
        text: "Chaque emplacement où l'on peut placer une masse et qui a un bras de levier défini : sièges avant et arrière, soutes à bagages, réservoirs de carburant.",
      },
      "empty-weight": {
        term: "Masse à vide de base (BEW)",
        text: "Masse de l'avion avec ses équipements installés, le carburant inutilisable et le plein d'huile, sans occupants, bagages ni carburant utilisable. Elle est propre à chaque appareil et figure, avec son bras de levier ou son moment, sur la dernière fiche de pesée.",
      },
      "useful-load": {
        term: "Charge utile",
        text: "Différence entre la masse maximale et la masse à vide de base : ce que l'on peut répartir entre les occupants, les bagages et le carburant utilisable.",
      },
      mtow: {
        term: "Masse maximale au décollage (MTOW)",
        text: "Masse maximale à laquelle l'avion peut commencer son roulement au décollage. C'est une limite structurale et de performances fixée à la certification.",
      },
      "ramp-weight": {
        term: "Masse maximale au parking",
        text: "Masse maximale autorisée au sol, avant le roulage. Elle est légèrement supérieure à la MTOW car elle tient compte du carburant brûlé à la mise en route, au roulage et aux essais moteur.",
      },
      mlw: {
        term: "Masse maximale à l'atterrissage (MLW)",
        text: "Masse maximale à laquelle on peut atterrir. Sur beaucoup d'avions légers, elle est égale à la MTOW ; sur les plus gros, elle est inférieure et impose de consommer du carburant avant l'atterrissage.",
      },
      mzfw: {
        term: "Masse maximale sans carburant (MZFW)",
        text: "Masse maximale de l'avion chargé mais sans carburant utilisable. Toute la masse au-delà de cette valeur doit être du carburant ; la limite protège la structure de l'aile.",
      },
      "usable-fuel": {
        term: "Carburant utilisable",
        text: "Carburant que le moteur peut réellement consommer en vol. Le carburant inutilisable reste dans les réservoirs et les tuyauteries et fait déjà partie de la masse à vide. Le carburant se compte en masse : environ 6 lb par gallon d'AVGAS et environ 6,7 lb par gallon de Jet A.",
      },
      mac: {
        term: "Corde aérodynamique moyenne (%MAC)",
        text: "Autre façon d'exprimer le centrage : en pourcentage de la corde aérodynamique moyenne de l'aile plutôt qu'en bras de levier depuis la référence. C'est courant sur les turbopropulseurs et les jets.",
      },
      tcds: {
        term: "Fiche de données du certificat de type (TCDS)",
        text: "Document de l'autorité (FAA, EASA) qui résume les limites approuvées d'un modèle : masses maximales, limites de centrage, référence et bras de levier des postes.",
      },
      poh: {
        term: "Manuel de vol (POH/AFM)",
        text: "Manuel approuvé de l'avion. Sa section masse et centrage, avec la fiche de pesée de l'appareil, est la référence officielle pour tout calcul.",
      },
    },
  },
  about: {
    navLabel: "Méthodologie et sources",
    title: "Méthodologie et sources de données de CheckCG : calcul et vérification",
    description:
      "D'où viennent les données de chaque avion, comment les calculs de masse et centrage sont vérifiés, quelles sont les limites de l'outil et qui le maintient.",
    h1: "Méthodologie et sources de données",
    intro:
      "CheckCG est un calculateur de masse et centrage gratuit et open source. Cette page explique d'où viennent les données, comment les calculs sont contrôlés et où s'arrête l'outil.",
    sections: {
      data: {
        title: "D'où viennent les données",
        text: "Les masses maximales, les limites de centrage, les bras de levier et les enveloppes de chaque modèle sont saisis à partir de la fiche de données du certificat de type (TCDS) et du manuel de vol (POH/AFM). Chaque page d'avion indique ses documents sources, la date de la dernière vérification et ce qui reste à confirmer.",
      },
      reliability: {
        title: "Niveau de fiabilité de chaque avion",
        text: "Chaque modèle porte un niveau déclaré : vérifié avec la documentation officielle, partiellement vérifié ou valeurs de référence estimées. Le catalogue aujourd'hui :",
      },
      method: {
        title: "Comment il calcule et comment c'est vérifié",
        text: "Le calcul est celui du manuel : on additionne les masses et les moments de chaque poste, le centre de gravité est le moment total divisé par la masse totale, et le point obtenu est comparé au polygone de l'enveloppe au décollage, à l'atterrissage et sans carburant. Le code est couvert par des tests automatiques, y compris l'exemple chiffré des guides, recalculé à chaque modification.",
      },
      limits: {
        title: "Ce que ce n'est pas",
        text: "C'est une aide, pas un document approuvé. La masse à vide et son bras de levier changent avec chaque appareil et chaque modification : il faut les saisir à partir de la fiche de pesée en vigueur. Le manuel de vol et cette fiche restent la référence officielle, et le commandant de bord est responsable de la vérification du résultat.",
      },
      privacy: {
        title: "Confidentialité",
        text: "Il n'y a ni inscription ni compte. Les masses saisies, vos propres avions et les liens partagés restent dans le navigateur. Seuls quelques événements d'usage anonymes sont comptés (par exemple un devis généré), sans adresse IP, cookies de suivi ni identifiants ; le seul cookie mémorise la langue choisie.",
      },
      contact: {
        title: "Qui le maintient",
        text: "CheckCG est développé par Pablo Alaniz et publié sous licence MIT. Les erreurs de données, les demandes d'avions et les corrections de traduction sont les bienvenues sous forme d'issues GitHub.",
      },
    },
    aircraftColumn: "Avion",
    reliabilityColumn: "Fiabilité",
    verifiedColumn: "Dernière vérification",
    repoLink: "Code source sur GitHub",
    issuesLink: "Signaler une erreur ou demander un avion",
  },
}
