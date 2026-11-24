---
title: "Masse, bras de levier et moment : exemple du Cessna 152"
description: "Ce que signifient référence, bras de levier et moment en masse et centrage, avec un exemple complet sur Cessna 152 et les erreurs d'unités les plus courantes."
lang: fr
translationKey: weight-arm-moment
slug: masse-bras-de-levier-et-moment
published: 2026-11-24
updated: 2026-11-24
faq:
  - q: "Qu'est-ce qu'un moment en masse et centrage ?"
    a: "C'est la masse d'un élément multipliée par son bras de levier (la distance à la référence), exprimée par exemple en livres-pouces (lb-in). La somme des moments divisée par la masse totale donne le centre de gravité."
  - q: "Pourquoi le manuel de vol divise-t-il les moments par 1000 ?"
    a: "Pour garder des nombres courts dans les tableaux et les abaques. Ce n'est qu'une échelle, à utiliser de façon cohérente dans tout le calcul."
  - q: "Combien pèsent 24,5 gallons d'AVGAS ?"
    a: "Avec la valeur conventionnelle de 6 lb/gal, 24,5 gal × 6 = 147 lb. Le manuel de vol de votre avion indique la valeur à utiliser."
---

Tout calcul de masse et centrage (_weight and balance_ en anglais) repose sur trois notions : la **référence**, le **bras de levier** et le **moment**. Une fois qu'elles sont claires, n'importe quel devis de masse et centrage n'est plus qu'une suite d'additions.

## Référence, bras de levier et moment

- **Référence** (_datum_) : un plan vertical de référence choisi par le constructeur. Ce peut être la face avant de la cloison pare-feu, la pointe du cône d'hélice ou un point situé devant l'avion. Tout se mesure à partir de là.
- **Bras de levier** (ou station) : la distance horizontale entre la référence et le centre de gravité d'un élément. Sur les avions en unités impériales, il se mesure en pouces ; par convention, il est positif en arrière de la référence et négatif en avant.
- **Moment** : masse × bras de levier. Il mesure l'effet de levier d'une masse autour de la référence. Un objet de 20 lb placé très en arrière peut compter davantage pour le centrage qu'un objet de 50 lb proche de la référence.

Le **centre de gravité** est le point où s'applique toute la masse : **CG = somme des moments ÷ somme des masses**.

## Exemple complet : Cessna 152

Nous utilisons les valeurs de référence du Cessna 152 présentes dans CheckCG (TCDS 3A19 et POH du 152). La référence est la face avant de la cloison pare-feu. **Ce sont des valeurs de référence : pour voler, utilisez la masse à vide et le bras de levier de la fiche de pesée de votre avion et les données de son manuel de vol.**

Le chargement :

- Masse à vide de l'avion d'exemple du POH : 1 136 lb à 29,93 in.
- Pilote 170 lb et passager 160 lb, tous deux sur les sièges à 39 in.
- Zone bagages 1 (64 in) : 20 lb. Zone 2 (84 in) : vide.
- Carburant : pleins complets, 24,5 gal utilisables × 6 lb/gal = 147 lb à 42 in.

| Poste                 | Masse (lb) | Bras de levier (in) | Moment (lb-in) |
| --------------------- | ---------: | ------------------: | -------------: |
| Masse à vide          |      1 136 |               29,93 |      34 000,48 |
| Pilote                |        170 |               39,00 |          6 630 |
| Passager              |        160 |               39,00 |          6 240 |
| Zone bagages 1        |         20 |               64,00 |          1 280 |
| Zone bagages 2        |          0 |               84,00 |              0 |
| Carburant (24,5 gal)  |        147 |               42,00 |          6 174 |
| **Total (décollage)** |  **1 633** |                     |  **54 324,48** |

**CG = 54 324,48 ÷ 1 633 = 33,27 in** en arrière de la référence. Avec le moment/1000, comme dans les tableaux du POH, le moment total vaut 54,32.

### Est-ce dans les limites ?

- **Masse** : 1 633 lb, en dessous du maximum de 1 670 lb.
- **Centrage** : sur ce modèle, la limite arrière est de 36,50 in. La limite avant est de 31,00 in jusqu'à 1 350 lb, puis recule linéairement jusqu'à 32,65 in à 1 670 lb. À 1 633 lb, la limite avant vaut 31,00 + (1 633 − 1 350) × (1,65 ÷ 320) = **32,46 in**. Comme 32,46 ≤ 33,27 ≤ 36,50, le CG est dans l'enveloppe.

### Atterrissage et masse sans carburant

Supposons que le vol consomme 9 gal (54 lb). Ce carburant part du bras de levier de 42 in :

- **Atterrissage** : masse 1 633 − 54 = **1 579 lb** ; moment 54 324,48 − 54 × 42 = 52 056,48 ; **CG = 32,97 in**.
- **Sans carburant** : masse 1 633 − 147 = **1 486 lb** ; moment 48 150,48 ; **CG = 32,40 in**.

Comme le réservoir est en arrière du CG, la consommation de carburant déplace le CG **vers l'avant**. Les deux conditions restent dans l'enveloppe, mais la marge par rapport à la limite avant diminue. Sur d'autres avions, dont les réservoirs sont placés ailleurs, c'est l'inverse qui peut se produire.

Vous pouvez reproduire cet exemple dans le [calculateur du Cessna 152](/fr/cessna-152/) en saisissant les mêmes masses.

## Erreurs courantes

- **Mélanger des moments à l'échelle et des moments bruts.** Si une ligne indique 34,0 (moment/1000) et une autre 6 630 (lb-in), la somme n'a aucun sens. Choisissez une échelle et gardez-la.
- **Livres et kilogrammes.** 1 kg = 2,2046 lb. Si l'avion est certifié en kilogrammes et en millimètres (ou en mètres), faites tout le calcul dans ces unités sans y mêler de données en livres.
- **Millimètres et pouces.** 1 in = 25,4 mm. Un bras de levier de 39 in vaut 990,6 mm ; confondez-les et le centrage devient absurde.
- **Gallons et livres.** Le carburant entre dans le calcul en livres : gallons × 6 pour l'AVGAS (valeur conventionnelle ; vérifiez votre manuel de vol). Saisir « 24,5 » dans le poste carburant comme s'il s'agissait de livres décale le CG et sous-estime la masse de plus de 120 lb.
- **Carburant total au lieu du carburant utilisable.** Le carburant inutilisable est généralement compris dans la masse à vide ; vérifiez ce qu'indique votre fiche de pesée pour ne pas le compter deux fois.
- **Prendre l'exemple du POH pour votre avion.** La masse à vide et le bras de levier sont propres à chaque cellule.
- **Ne surveiller que la limite arrière.** Avec beaucoup de masse à l'avant, le risque est la limite avant, qui dépend elle aussi de la masse.

Pour la procédure complète, voir [Comment calculer la masse et le centrage](/fr/guides/comment-calculer-masse-et-centrage/) et, pour comprendre les limites, [L'enveloppe de centrage expliquée](/fr/guides/enveloppe-de-centrage/).

> **Important:** ce guide est un support d'étude. Le manuel de vol (POH/AFM) de votre aéronef et sa fiche de pesée sont les références qui font foi et prévalent sur toute donnée ou tout exemple de cette page. En cas de doute, consultez votre instructeur ou un atelier de maintenance agréé.
