---
title: "Schwerpunkt-Envelope: vordere und hintere Grenze richtig lesen"
description: "Was die Schwerpunkt-Envelope ist, warum vordere und hintere Grenze zählen, warum der Schwerpunkt bis zur Landung wandert und was außerhalb der Grenzen zu tun ist."
lang: de
translationKey: cg-envelope
slug: schwerpunkt-envelope
published: 2026-11-24
updated: 2026-11-24
faq:
  - q: "Was passiert, wenn ich mit dem Schwerpunkt hinter der hinteren Grenze fliege?"
    a: "Das Flugzeug verliert Längsstabilität, die Steuerkräfte werden gering, und das Ausleiten eines Strömungsabrisses oder des Trudelns kann schwierig oder unmöglich werden. Niemals außerhalb der Grenzen fliegen."
  - q: "Warum erhöht ein vorderer Schwerpunkt die Überziehgeschwindigkeit?"
    a: "Liegt der Schwerpunkt weiter vorn, muss das Höhenleitwerk stärker nach unten drücken, um das Flugzeug auszubalancieren. Der Flügel muss diese zusätzliche Last mit mehr Auftrieb ausgleichen, was die Überziehgeschwindigkeit erhöht."
  - q: "Reicht es, unter der Höchstmasse zu bleiben?"
    a: "Nein. Masse und Schwerpunkt sind zwei unabhängige Bedingungen, und beide müssen erfüllt sein, beim Start und bei der Landung."
---

Die **Schwerpunkt-Envelope** (auch Schwerpunktbereich) ist die Fläche in einem Diagramm aus Masse und Schwerpunktlage, innerhalb der das Flugzeug zugelassen wurde. Liegt der Punkt (CG, Masse) der eigenen Beladung darin, verhält sich das Flugzeug so, wie es der Hersteller nachgewiesen hat. Liegt er außerhalb, gibt es keine Gewähr für ausreichende Stabilität oder Steuerbarkeit. Sie ist das Kernstück jeder Masse- und Schwerpunktberechnung (Weight and Balance).

## So wird sie gelesen

Die waagerechte Achse ist der **Schwerpunkt** (Hebelarm in Zoll oder Millimetern hinter der Bezugsebene, oder ein Moment). Die senkrechte Achse ist die **Masse**. Die Envelope ist ein Polygon:

- Die **obere Kante** ist die Höchstmasse.
- Die **linke Kante** ist die **vordere Grenze**. Bei vielen Flugzeugen ist sie keine senkrechte Linie: Oberhalb einer bestimmten Masse verläuft sie schräg nach hinten, je schwerer das Flugzeug, desto weniger weit vorn darf der Schwerpunkt liegen.
- Die **rechte Kante** ist die **hintere Grenze**.

Bei der Cessna 152 zum Beispiel (Referenzdaten aus TCDS 3A19) liegt die vordere Grenze bis 1.350 lb bei 31,0 in und wandert linear nach hinten bis 32,65 in bei 1.670 lb; die hintere Grenze liegt bei 36,5 in. Manche Flugzeuge haben außerdem getrennte Envelopes für die Normal- und die Nutzflugzeugkategorie (Utility): Die Utility-Envelope ist meist kleiner und diejenige, die bestimmte Flugmanöver erlaubt.

Ob eine Beladung innerhalb liegt, zeigt sich, wenn der Punkt in das Diagramm des Flughandbuchs eingetragen oder die Grenze bei der eigenen Masse interpoliert wird. Den Schwerpunkt mit einer einzigen Zahl zu vergleichen (der bei Höchstmasse oder der bei geringer Masse) kann in die Irre führen.

## Warum die vordere Grenze zählt

Mit vorderem Schwerpunkt ist das Flugzeug **stabiler**, aber:

- **Das Höhenleitwerk muss stärker nach unten drücken**, um es im Gleichgewicht zu halten. Der Flügel trägt diese zusätzliche Last, deshalb **steigt die Überziehgeschwindigkeit**, und die Flugleistungen leiden etwas (mehr Widerstand, mehr Verbrauch).
- **Die Steuerkräfte sind höher**, und das Höhenruder hat weniger Reserve. An der Grenze reicht es womöglich nicht, um beim Rotieren die Nase zu heben oder bei der Landung abzufangen, vor allem bei geringer Geschwindigkeit mit ausgefahrenen Klappen.

Die vordere Grenze wird typischerweise mit zwei schweren Personen vorn und nichts hinten erreicht, und bei Flugzeugen, deren Tanks hinter dem Schwerpunkt liegen, mit wenig Kraftstoff.

## Warum die hintere Grenze zählt

Mit hinterem Schwerpunkt ist das Flugzeug **weniger stabil**:

- Die Steuerkräfte werden gering, und um die Querachse wird leicht übersteuert.
- **Die Überziehgeschwindigkeit sinkt** leicht, aber der Strömungsabriss kann abrupter verlaufen.
- **Das Ausleiten eines Strömungsabrisses oder des Trudelns** kann schwierig oder unmöglich werden, weil dem Höhenruder die Wirkung fehlt, um die Nase zu senken.

Jenseits der hinteren Grenze kann das Flugzeug um die Querachse instabil werden. Das ist der gefährlichste Zustand, und er wird typischerweise mit Passagieren hinten und schwerem Gepäck im hinteren Gepäckraum erreicht.

## Warum der Schwerpunkt bei der Landung anders liegt

Während des Flugs wird Kraftstoff verbraucht, und Kraftstoff hat seinen eigenen Hebelarm. Liegt der Tank **hinter** dem Schwerpunkt, wandert der Schwerpunkt mit dem Verbrauch nach **vorn**; liegt er **davor**, wandert der Schwerpunkt nach **hinten**. Deshalb werden auch die Punkte für die Landung und für den Zustand ohne Kraftstoff geprüft, nicht nur der Start. Im [Beispiel mit der Cessna 152](/de/ratgeber/masse-hebelarm-und-moment/) wandert der Schwerpunkt von 33,27 in beim Start auf 32,97 in bei der Landung.

Auch die Höchstmassen können sich unterscheiden: Manche Flugzeuge haben eine höchstzulässige Landemasse unter der Abflugmasse, andere eine Höchstmasse ohne Kraftstoff.

## Was außerhalb der Grenzen zu tun ist

Zuerst: **nicht fliegen**. Dann, je nach Fall:

- **Schwerpunkt zu weit hinten**: Gepäck aus dem hinteren Gepäckraum nach vorn umladen, den schwereren Passagier nach vorn setzen oder Gepäck verringern.
- **Schwerpunkt zu weit vorn**: Gepäck im hinteren Gepäckraum mitführen (innerhalb seiner Grenze), die Insassen anders verteilen oder, wenn das Flughandbuch es zulässt, zugelassenen Ballast verwenden.
- **Überladen**: weniger Gepäck, weniger Passagiere oder weniger Kraftstoff, immer unter Einhaltung der vorgeschriebenen Reserve und der Anforderungen des Flugs. Dabei beachten: Weniger Kraftstoff verschiebt auch den Schwerpunkt.

Nach jeder Änderung Start, Landung und den Zustand ohne Kraftstoff neu berechnen: Eine Korrektur, die den Start in die Grenzen bringt, kann die Landung aus den Grenzen schieben.

## Im Rechner prüfen

Der [CheckCG-Rechner](/de/) zeichnet die Envelope des Flugzeugs und trägt die Punkte für Start, Landung und ohne Kraftstoff ein, mit Hinweisen bei Annäherung an eine Grenze. Das vollständige Verfahren steht in [Masse und Schwerpunkt berechnen](/de/ratgeber/masse-und-schwerpunkt-berechnen/).

> **Wichtig:** Dieser Ratgeber ist Lernmaterial. Maßgeblich sind das POH/AFM des Luftfahrzeugs und sein Wägebericht; sie haben Vorrang vor allen Daten und Beispielen auf dieser Seite. Im Zweifel den Fluglehrer oder einen zugelassenen Instandhaltungsbetrieb fragen.
