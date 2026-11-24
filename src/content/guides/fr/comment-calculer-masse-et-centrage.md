---
title: "Comment calculer la masse et le centrage d'un avion, pas à pas"
description: "La procédure complète de masse et centrage : masse à vide, bras de levier, moments, centre de gravité, masse max, enveloppe et centrage à l'atterrissage."
lang: fr
translationKey: how-to-calculate
slug: comment-calculer-masse-et-centrage
published: 2026-11-24
updated: 2026-11-24
steps:
  - name: "Relevez la masse à vide et son bras de levier"
    text: "Prenez la masse à vide de base et son bras de levier (ou son moment) sur la fiche de pesée en vigueur de votre avion, et non sur l'exemple du manuel de vol."
  - name: "Notez la masse de chaque poste"
    text: "Pesez ou estimez prudemment chaque occupant, les bagages et le carburant (en livres : gallons × 6 pour l'AVGAS)."
  - name: "Calculez le moment de chaque poste"
    text: "Multipliez masse × bras de levier pour chaque poste. Les bras de levier figurent dans le manuel de vol (POH/AFM)."
  - name: "Additionnez les masses et les moments"
    text: "La masse totale est la somme de toutes les masses ; le moment total est la somme de tous les moments."
  - name: "Calculez le centre de gravité"
    text: "CG = moment total ÷ masse totale. Le résultat est dans la même unité que les bras de levier (par exemple, en pouces en arrière de la référence)."
  - name: "Vérifiez la masse maximale et l'enveloppe"
    text: "Assurez-vous que la masse totale ne dépasse pas le maximum et que le point (CG, masse) se trouve dans l'enveloppe de centrage du manuel de vol."
  - name: "Recommencez pour l'atterrissage et sans carburant"
    text: "Retirez le carburant que vous allez consommer (puis tout le carburant) et vérifiez que le centrage reste dans les limites."
faq:
  - q: "Puis-je utiliser la masse à vide de l'exemple du manuel de vol ?"
    a: "Non. L'exemple du manuel est illustratif. Chaque avion a sa propre masse à vide et son propre bras de levier, consignés sur sa fiche de pesée, qui change chaque fois qu'un équipement est installé ou déposé."
  - q: "Combien pèse un gallon d'AVGAS ?"
    a: "Les calculs de masse et centrage retiennent en général 6 lb par gallon US, soit environ 0,72 kg par litre. La densité réelle varie avec la température ; utilisez la valeur indiquée dans le manuel de vol de votre avion."
  - q: "Suffit-il de vérifier le centrage au décollage ?"
    a: "Non. Le CG se déplace à mesure que le carburant est consommé. Il faut aussi vérifier le centrage à l'atterrissage et, lorsque le manuel de vol le demande, la condition sans carburant."
---

Un calcul de **masse et centrage** (_weight and balance_ dans les manuels en anglais) répond à deux questions avant chaque vol : l'avion est-il en dessous de sa masse maximale, et son centre de gravité (CG) est-il dans les limites approuvées ? Les deux conditions doivent être remplies. Un avion léger dont le CG sort de l'enveloppe est aussi dangereux qu'un avion en surcharge.

Ce guide détaille la procédure complète, celle qu'exécute le [calculateur CheckCG](/fr/) et celle que vous pouvez faire à la main sur un devis de masse et centrage. Si le bras de levier et le moment restent flous, commencez par [Masse, bras de levier et moment](/fr/guides/masse-bras-de-levier-et-moment/).

## Ce qu'il vous faut d'abord

- **Le manuel de vol de votre avion** (POH/AFM : _Pilot's Operating Handbook_ ou _Airplane Flight Manual_ approuvé). Il donne le bras de levier de chaque poste, les masses maximales et l'enveloppe de centrage.
- **La fiche de pesée en vigueur** de _votre_ avion. Elle indique la masse à vide et son bras de levier ou son moment. Elle change chaque fois qu'un équipement est ajouté ou retiré : assurez-vous d'avoir la dernière.
- **Les masses réelles du chargement** : occupants (habillés, avec leur casque), bagages et carburant.

## Étape 1 : masse à vide et bras de levier

Recopiez la **masse à vide de base** et son **bras de levier** depuis la fiche de pesée. Certaines fiches donnent le moment à la place du bras de levier ; celui-ci vaut alors moment ÷ masse. Si le manuel de vol utilise des moments divisés par 1000, gardez cette échelle pour tout le calcul.

N'utilisez pas la masse à vide de l'exemple du manuel ni celle d'un autre avion du même modèle : deux avions « identiques » peuvent différer de plusieurs dizaines de livres, et de bras de levier.

## Étape 2 : masse de chaque poste

Notez la masse de chaque poste de chargement du manuel de vol : sièges avant, sièges arrière, chaque soute à bagages et chaque réservoir de carburant.

- **Personnes** : si vous ne les pesez pas, estimez large. Une erreur de 20 lb sur le siège arrière peut déplacer le CG plus que vous ne le pensez.
- **Carburant** : convertissez les gallons en livres. Pour l'AVGAS, on retient habituellement **6 lb/gal**. Si vous avez des litres, convertissez d'abord en gallons (1 gal US = 3,785 L).
- **Bagages** : respectez la limite de chaque soute et, lorsqu'elle existe, la limite combinée.

## Étape 3 : moment de chaque poste

Le **moment** est le produit masse × bras de levier. Calculez-le pour chaque poste, masse à vide comprise. Les bras de levier figurent dans la section masse et centrage du manuel de vol et se mesurent depuis la _référence_ (_datum_), un plan choisi par le constructeur.

## Étape 4 : additionner les masses et les moments

- **Masse totale** = masse à vide + tous les postes.
- **Moment total** = moment à vide + moments de tous les postes.

## Étape 5 : calculer le centre de gravité

**CG = moment total ÷ masse totale.** Le résultat est dans la même unité que les bras de levier : s'ils sont en pouces en arrière de la référence, le CG l'est aussi. Si vous avez travaillé en moment/1000, multipliez par 1000 avant de diviser (ou divisez puis multipliez le résultat par 1000).

## Étape 6 : vérifier la masse maximale et l'enveloppe

1. **Masse totale ≤ masse maximale au décollage (MTOW).** Certains avions ont aussi une masse maximale au parking (pour la mise en route et le roulage) et une masse maximale à l'atterrissage différente.
2. **Le point (CG, masse) dans l'enveloppe.** Comparer le CG à un seul nombre ne suffit pas : sur beaucoup d'avions, la limite avant recule quand la masse augmente. Reportez le point sur l'abaque du manuel de vol ou interpolez entre les sommets de l'enveloppe. Voir [L'enveloppe de centrage expliquée](/fr/guides/enveloppe-de-centrage/).

## Étape 7 : atterrissage et masse sans carburant

Le carburant est consommé pendant le vol et le moment change avec lui. Pour l'**atterrissage** :

- Retirez de la masse totale le carburant que vous allez consommer (consommation horaire × temps de vol ; la réserve reste à bord).
- Retirez du moment total ce carburant × le bras de levier du réservoir.
- Calculez le nouveau CG et vérifiez qu'il est dans l'enveloppe et que la masse est inférieure à la masse maximale à l'atterrissage.

Recommencez avec **tout le carburant utilisable consommé** (condition sans carburant). Sur beaucoup d'avions, c'est le cas le plus défavorable, et certains manuels fixent une masse maximale sans carburant.

Selon la position du réservoir par rapport au CG, la consommation de carburant peut déplacer le CG vers l'avant ou vers l'arrière. C'est pourquoi un avion qui décolle dans les limites peut atterrir en dehors.

## Si vous êtes hors limites

Ne volez pas. Répartissez autrement le chargement (déplacez des bagages vers une autre soute ou un passager vers un autre siège), réduisez les bagages ou le carburant sans renoncer à la réserve réglementaire ni à ce qu'exige votre exploitation, puis refaites le calcul. Si la solution est le lest, n'utilisez que celui qu'approuve le manuel de vol.

## Faites-le avec le calculateur

Le [calculateur CheckCG](/fr/) exécute les sept étapes instantanément : saisissez la masse à vide de votre fiche de pesée (comme aéronef personnalisé), la masse de chaque poste et le carburant à consommer, et il affiche la masse, le CG, l'enveloppe et les phases de décollage, d'atterrissage et sans carburant. Il imprime aussi le devis de masse et centrage en PDF. Des pages de données de référence existent pour chaque modèle, comme le [Cessna 152](/fr/cessna-152/) et le [Cessna 172S](/fr/cessna-172s/).

> **Important:** ce guide est un support d'étude. Le manuel de vol (POH/AFM) de votre aéronef et sa fiche de pesée sont les références qui font foi et prévalent sur toute donnée ou tout exemple de cette page. En cas de doute, consultez votre instructeur ou un atelier de maintenance agréé.
