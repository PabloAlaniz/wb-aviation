---
title: "Masse, Hebelarm und Moment: Rechenbeispiel Cessna 152"
description: "Was Bezugsebene, Hebelarm und Moment bei Masse und Schwerpunkt bedeuten, mit vollständigem Rechenbeispiel einer Cessna 152 und den häufigsten Einheitenfehlern."
lang: de
translationKey: weight-arm-moment
slug: masse-hebelarm-und-moment
published: 2026-11-24
updated: 2026-11-24
faq:
  - q: "Was ist ein Moment bei Masse und Schwerpunkt?"
    a: "Es ist die Masse eines Postens multipliziert mit seinem Hebelarm (dem Abstand von der Bezugsebene), zum Beispiel in Pfund-Zoll (lb-in). Die Summe aller Momente geteilt durch die Gesamtmasse ergibt den Schwerpunkt."
  - q: "Warum teilt das Flughandbuch die Momente durch 1000?"
    a: "Damit die Zahlen in Tabellen und Diagrammen klein bleiben. Es ist nur ein Maßstab, der in der gesamten Rechnung einheitlich verwendet werden muss."
  - q: "Wie viel wiegen 24,5 Gallonen AVGAS?"
    a: "Mit dem üblichen Wert von 6 lb/gal sind es 24,5 gal × 6 = 147 lb. Welcher Wert gilt, steht im Flughandbuch (POH) des Luftfahrzeugs."
---

Jede Masse- und Schwerpunktberechnung (Weight and Balance) beruht auf drei Begriffen: **Bezugsebene**, **Hebelarm** und **Moment**. Wer sie einmal verstanden hat, sieht in jedem Beladeformular des Flughandbuchs nur noch eine Addition. Dieser Ratgeber erklärt die drei Begriffe und rechnet ein vollständiges Beispiel durch, vom Start bis zur Landung.

## Bezugsebene, Hebelarm und Moment

- **Bezugsebene** (Datum): eine senkrechte Bezugsebene, die der Hersteller festlegt. Das kann die Vorderseite des Brandschotts sein, die Spitze des Spinners oder ein Punkt vor dem Flugzeug. Von ihr aus wird alles gemessen.
- **Hebelarm** (Arm, auch Station): der waagerechte Abstand von der Bezugsebene bis zum Schwerpunkt eines Postens. Bei Flugzeugen mit imperialen Einheiten wird er in Zoll gemessen; üblicherweise ist er hinter der Bezugsebene positiv und davor negativ.
- **Moment**: Masse × Hebelarm. Es beschreibt, wie stark eine Masse um die Bezugsebene „hebelt“. Ein Gepäckstück von 20 lb weit hinten kann für die Schwerpunktlage mehr ausmachen als eines von 50 lb nahe der Bezugsebene.

Der **Schwerpunkt** (CG) ist der Punkt, in dem die gesamte Masse angreift: **CG = Summe der Momente ÷ Summe der Massen**.

## Rechenbeispiel: Cessna 152

Verwendet werden die Referenzwerte der Cessna 152 in CheckCG (TCDS 3A19 und das POH der 152). Die Bezugsebene ist die Vorderseite des Brandschotts. **Es sind Referenzwerte: Für den Flug gelten Leermasse und Hebelarm aus dem Wägebericht des eigenen Flugzeugs und die Daten aus dessen Flughandbuch.**

Die Beladung:

- Leermasse des Beispielflugzeugs aus dem POH: 1.136 lb bei 29,93 in.
- Pilot 170 lb und Passagier 160 lb, beide auf den Sitzen bei 39 in.
- Gepäckraum 1 (64 in): 20 lb. Gepäckraum 2 (84 in): leer.
- Kraftstoff: volle Tanks, 24,5 gal ausfliegbar × 6 lb/gal = 147 lb bei 42 in.

| Station               | Masse (lb) | Hebelarm (in) | Moment (lb-in) |
| --------------------- | ---------: | ------------: | -------------: |
| Leermasse             |      1.136 |         29,93 |      34.000,48 |
| Pilot                 |        170 |         39,00 |          6.630 |
| Passagier             |        160 |         39,00 |          6.240 |
| Gepäckraum 1          |         20 |         64,00 |          1.280 |
| Gepäckraum 2          |          0 |         84,00 |              0 |
| Kraftstoff (24,5 gal) |        147 |         42,00 |          6.174 |
| **Summe (Start)**     |  **1.633** |               |  **54.324,48** |

**CG = 54.324,48 ÷ 1.633 = 33,27 in** hinter der Bezugsebene. Mit Moment/1000, wie in den Tabellen des POH, beträgt das Gesamtmoment 54,32.

### Liegt das innerhalb der Grenzen?

- **Masse**: 1.633 lb, unter dem Höchstwert von 1.670 lb.
- **Schwerpunkt**: Bei diesem Muster liegt die hintere Grenze bei 36,50 in. Die vordere Grenze beträgt 31,00 in bis 1.350 lb und wandert dann linear nach hinten bis 32,65 in bei 1.670 lb. Bei 1.633 lb liegt die vordere Grenze bei 31,00 + (1.633 − 1.350) × (1,65 ÷ 320) = **32,46 in**. Da 32,46 ≤ 33,27 ≤ 36,50 gilt, liegt der Schwerpunkt innerhalb der Envelope.

### Landung und Zustand ohne Kraftstoff

Angenommen, der Flug verbraucht 9 gal (54 lb). Dieser Kraftstoff verschwindet vom Hebelarm 42 in:

- **Landung**: Masse 1.633 − 54 = **1.579 lb**; Moment 54.324,48 − 54 × 42 = 52.056,48; **CG = 32,97 in**.
- **Ohne Kraftstoff**: Masse 1.633 − 147 = **1.486 lb**; Moment 48.150,48; **CG = 32,40 in**.

Weil der Tank hinter dem Schwerpunkt liegt, wandert der Schwerpunkt mit dem Verbrauch nach **vorn**. Beide Zustände liegen weiterhin innerhalb der Envelope, aber die Reserve zur vorderen Grenze schrumpft. Bei anderen Flugzeugen mit anders angeordneten Tanks kann es genau umgekehrt sein.

Das Beispiel lässt sich im [Rechner für die Cessna 152](/de/cessna-152/) mit denselben Massen nachvollziehen.

## Häufige Fehler

- **Skalierte und unskalierte Momente mischen.** Steht in einer Zeile 34,0 (Moment/1000) und in einer anderen 6.630 (lb-in), ist die Summe wertlos. Einen Maßstab wählen und dabei bleiben.
- **Pfund und Kilogramm.** 1 kg = 2,2046 lb. Ist das Flugzeug in Kilogramm und Millimetern (oder Metern) zugelassen, wird die gesamte Rechnung in diesen Einheiten geführt, ohne Angaben in Pfund einzumischen.
- **Millimeter und Zoll.** 1 in = 25,4 mm. Ein Hebelarm von 39 in entspricht 990,6 mm; wer das verwechselt, erhält einen unsinnigen Schwerpunkt.
- **Gallonen und Pfund.** Kraftstoff geht als Masse in die Rechnung ein: Gallonen × 6 bei AVGAS (üblicher Wert; im POH prüfen). Wer „24,5“ in die Kraftstoffstation einträgt, als wären es Pfund, verschiebt den Schwerpunkt und unterschätzt die Masse um mehr als 120 lb.
- **Gesamter statt ausfliegbarer Kraftstoff.** Der nicht ausfliegbare Kraftstoff ist meist schon in der Leermasse enthalten; im Wägebericht nachsehen, damit er nicht doppelt gezählt wird.
- **Das Beispiel aus dem POH für das eigene Flugzeug halten.** Leermasse und Hebelarm gehören zu jedem einzelnen Luftfahrzeug.
- **Nur auf die hintere Grenze achten.** Bei viel Masse vorn liegt das Risiko an der vorderen Grenze, die außerdem von der Masse abhängt.

Das vollständige Verfahren steht in [Masse und Schwerpunkt berechnen](/de/ratgeber/masse-und-schwerpunkt-berechnen/), die Grenzen erklärt [Die Schwerpunkt-Envelope](/de/ratgeber/schwerpunkt-envelope/).

> **Wichtig:** Dieser Ratgeber ist Lernmaterial. Maßgeblich sind das POH/AFM des Luftfahrzeugs und sein Wägebericht; sie haben Vorrang vor allen Daten und Beispielen auf dieser Seite. Im Zweifel den Fluglehrer oder einen zugelassenen Instandhaltungsbetrieb fragen.
