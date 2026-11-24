/** Glossary and "about" page content (de). Same shape in every language: see pages.test.js. */
export const de = {
  glossary: {
    navLabel: "Glossar",
    title: "Glossar Masse und Schwerpunkt: Hebelarm, Moment, CG, MTOW | CheckCG",
    description:
      "Glossar zu Masse und Schwerpunkt (Weight and Balance) für Piloten: Bezugsebene, Hebelarm, Moment, Schwerpunkt, Envelope, Leermasse, Zuladung, MTOW, MLW, MZFW, %MAC.",
    h1: "Glossar Masse und Schwerpunkt",
    intro:
      "Die Begriffe aus Flughandbuch, Wägebericht und Rechner, jeweils in ein bis zwei Sätzen erklärt. Im Englischen heißt das Thema Weight and Balance (oder Mass and Balance).",
    guideLink: "Passender Ratgeber:",
    terms: {
      datum: {
        term: "Bezugsebene (Datum)",
        text: "Gedachte senkrechte Ebene, die der Hersteller festlegt und von der aus alle horizontalen Abstände am Flugzeug gemessen werden. Sie kann am Brandschott, an der Flugzeugnase oder sogar davor liegen; das Flughandbuch definiert sie.",
      },
      arm: {
        term: "Hebelarm",
        text: "Horizontaler Abstand zwischen der Bezugsebene und einer Masse (einem Sitz, einem Tank, dem Gepäckraum). Er wird in Zoll oder Millimetern gemessen und ist hinter der Bezugsebene positiv.",
      },
      moment: {
        term: "Moment",
        text: "Masse multipliziert mit ihrem Hebelarm (lb·in oder kg·mm). Es beschreibt, wie stark eine Last das Flugzeug um die Bezugsebene drehen will. Manche Handbücher geben es durch 1000 geteilt an, um mit kleineren Zahlen zu arbeiten.",
      },
      cg: {
        term: "Schwerpunkt (CG)",
        text: "Punkt, in dem man sich die gesamte Masse des Flugzeugs vereint denken kann. Er ist das Gesamtmoment geteilt durch die Gesamtmasse, angegeben als Hebelarm ab der Bezugsebene.",
      },
      envelope: {
        term: "Schwerpunkt-Envelope (Schwerpunktbereich)",
        text: "Bereich im Diagramm Masse über Schwerpunktlage, für den das Flugzeug zugelassen ist. Er hat eine vordere Grenze, eine hintere Grenze und eine Höchstmasse; der Beladepunkt muss bei Start und Landung darin liegen.",
      },
      station: {
        term: "Ladestation",
        text: "Jeder Ort, an dem Masse zugeladen werden kann und der einen festen Hebelarm hat: vordere und hintere Sitze, Gepäckräume, Kraftstofftanks.",
      },
      "empty-weight": {
        term: "Leermasse (BEW)",
        text: "Masse des Flugzeugs mit eingebauter Ausrüstung, nicht ausfliegbarem Kraftstoff und voller Ölmenge, ohne Insassen, Gepäck und ausfliegbaren Kraftstoff. Sie gilt für das einzelne Flugzeug und steht mit Hebelarm oder Moment im aktuellen Wägebericht.",
      },
      "useful-load": {
        term: "Zuladung",
        text: "Differenz zwischen Höchstmasse und Leermasse: das, was sich auf Insassen, Gepäck und ausfliegbaren Kraftstoff verteilen lässt.",
      },
      mtow: {
        term: "Höchstzulässige Abflugmasse (MTOW)",
        text: "Höchste Masse, mit der das Flugzeug den Startlauf beginnen darf. Sie ist eine bei der Zulassung festgelegte Struktur- und Leistungsgrenze.",
      },
      "ramp-weight": {
        term: "Höchstzulässige Rampenmasse",
        text: "Höchste am Boden zulässige Masse vor dem Rollen. Sie liegt etwas über der MTOW, weil sie den Kraftstoff für Anlassen, Rollen und Motorcheck berücksichtigt.",
      },
      mlw: {
        term: "Höchstzulässige Landemasse (MLW)",
        text: "Höchste Masse, mit der gelandet werden darf. Bei vielen Leichtflugzeugen entspricht sie der MTOW; bei größeren ist sie niedriger, sodass vor der Landung Kraftstoff verbraucht werden muss.",
      },
      mzfw: {
        term: "Höchstmasse ohne Kraftstoff (MZFW)",
        text: "Höchste Masse des beladenen Flugzeugs ohne ausfliegbaren Kraftstoff. Alles darüber muss Kraftstoff sein; die Grenze schützt die Flügelstruktur.",
      },
      "usable-fuel": {
        term: "Ausfliegbarer Kraftstoff",
        text: "Kraftstoff, den das Triebwerk im Flug tatsächlich verbrauchen kann. Der nicht ausfliegbare Rest bleibt in Tanks und Leitungen und ist bereits in der Leermasse enthalten. Kraftstoff wird als Masse gerechnet: etwa 6 lb pro Gallone AVGAS und etwa 6,7 lb pro Gallone Jet A.",
      },
      mac: {
        term: "Mittlere aerodynamische Flügeltiefe (%MAC)",
        text: "Eine andere Angabe der Schwerpunktlage: als Prozentsatz der mittleren aerodynamischen Flügeltiefe statt als Hebelarm ab der Bezugsebene. Üblich bei Turboprops und Jets.",
      },
      tcds: {
        term: "Kennblatt zur Musterzulassung (TCDS)",
        text: "Dokument der Behörde (FAA, EASA), das die zugelassenen Grenzen eines Musters zusammenfasst: Höchstmassen, Schwerpunktgrenzen, Bezugsebene und Hebelarme der Stationen.",
      },
      poh: {
        term: "Flughandbuch (POH/AFM)",
        text: "Das zugelassene Handbuch des Flugzeugs. Sein Abschnitt Masse und Schwerpunkt ist zusammen mit dem Wägebericht des Flugzeugs die verbindliche Grundlage jeder Berechnung.",
      },
    },
  },
  about: {
    navLabel: "Methodik und Quellen",
    title: "Methodik und Datenquellen von CheckCG: Berechnung und Prüfung",
    description:
      "Woher die Daten der einzelnen Flugzeuge stammen, wie die Berechnung von Masse und Schwerpunkt geprüft wird, wo die Grenzen des Tools liegen und wer es pflegt.",
    h1: "Methodik und Datenquellen",
    intro:
      "CheckCG ist ein kostenloser Open-Source-Rechner für Masse und Schwerpunkt (Weight and Balance). Diese Seite erklärt, woher die Daten stammen, wie die Berechnung geprüft wird und wo das Tool endet.",
    sections: {
      data: {
        title: "Woher die Daten stammen",
        text: "Höchstmassen, Schwerpunktgrenzen, Hebelarme und Envelopes jedes Musters werden aus dem Kennblatt zur Musterzulassung (TCDS) und dem Flughandbuch (POH/AFM) übernommen. Jede Flugzeugseite nennt ihre Quelldokumente, das Datum der letzten Prüfung und alles, was noch zu bestätigen ist.",
      },
      reliability: {
        title: "Verlässlichkeit je Flugzeug",
        text: "Jedes Muster trägt eine ausgewiesene Stufe: anhand der offiziellen Dokumentation geprüft, teilweise geprüft oder geschätzte Referenzwerte. Der Katalog heute:",
      },
      method: {
        title: "Wie gerechnet und wie das geprüft wird",
        text: "Gerechnet wird wie im Handbuch: Massen und Momente aller Stationen werden addiert, der Schwerpunkt ist das Gesamtmoment geteilt durch die Gesamtmasse, und der Punkt wird für Start, Landung und ohne Kraftstoff mit dem Polygon der Envelope verglichen. Der Code ist durch automatische Tests abgedeckt, einschließlich des Rechenbeispiels der Ratgeber, das bei jeder Änderung neu berechnet wird.",
      },
      limits: {
        title: "Was es nicht ist",
        text: "Es ist ein Hilfsmittel, kein zugelassenes Dokument. Leermasse und Hebelarm unterscheiden sich bei jedem Flugzeug und nach jeder Änderung: Sie sind aus dem gültigen Wägebericht zu übernehmen. Flughandbuch und Wägebericht bleiben die verbindliche Grundlage, und der verantwortliche Pilot muss das Ergebnis prüfen.",
      },
      privacy: {
        title: "Datenschutz",
        text: "Es gibt keine Anmeldung und keine Konten. Eingegebene Massen, eigene Flugzeuge und geteilte Links bleiben im Browser. Gezählt werden nur wenige anonyme Nutzungsereignisse (zum Beispiel ein erzeugtes Ladeblatt), ohne IP-Adresse, Tracking-Cookies oder Kennungen; das einzige Cookie speichert die gewählte Sprache.",
      },
      contact: {
        title: "Wer es pflegt",
        text: "CheckCG wird von Pablo Alaniz entwickelt und unter der MIT-Lizenz veröffentlicht. Datenfehler, Flugzeugwünsche und Korrekturen der Übersetzung sind als GitHub-Issues willkommen.",
      },
    },
    aircraftColumn: "Flugzeug",
    reliabilityColumn: "Verlässlichkeit",
    verifiedColumn: "Zuletzt geprüft",
    repoLink: "Quellcode auf GitHub",
    issuesLink: "Fehler melden oder Flugzeug anfragen",
  },
}
