---
title: "Conversions de carburant : litres, gallons, livres et kilos"
description: "Tableaux de conversion AVGAS et Jet A entre litres, gallons US et impériaux, livres et kilogrammes, avec un convertisseur, des exemples et les erreurs courantes."
lang: fr
translationKey: fuel-conversions
slug: conversions-de-carburant
published: 2026-11-24
updated: 2026-11-24
tool: fuel-converter
faq:
  - q: "Combien pèse un litre d'AVGAS ?"
    a: "Avec la valeur conventionnelle de 6 lb par gallon US, un litre d'AVGAS pèse environ 1,59 lb, soit 0,72 kg. La densité réelle varie avec la température : votre manuel de vol indique la valeur à utiliser."
  - q: "Combien pèse un litre de Jet A ?"
    a: "Avec 6,7 lb par gallon US, un litre de Jet A pèse environ 1,77 lb, soit 0,80 kg. C'est environ 12 % de plus que le même volume d'AVGAS."
  - q: "Quelle est la différence entre un gallon US et un gallon impérial ?"
    a: "Un gallon US vaut 3,785 litres et un gallon impérial 4,546 litres : le gallon impérial est donc 20 % plus grand. Les manuels des avions nord-américains utilisent des gallons US."
---

En masse et centrage, le carburant est **avitaillé en volume** mais **compte en masse**. La pompe le délivre en litres ou en gallons, le manuel de vol l'indique en gallons, et le devis de masse et centrage l'additionne en livres ou en kilogrammes. La conversion est simple, mais un mauvais facteur décale la masse totale et le centrage autant qu'un passager de plus.

Un **convertisseur** se trouve ci-dessus : choisissez le carburant, saisissez une quantité et il affiche toutes les autres unités.

## Volume et masse : la densité

Pour passer du volume à la masse, il faut la **densité** du carburant. En masse et centrage, on utilise des valeurs conventionnelles :

- **AVGAS 100LL** : 6,0 lb par gallon US, soit environ **0,72 kg par litre** (densité 0,72).
- **Jet A / Jet A-1** : 6,7 lb par gallon US, soit environ **0,80 kg par litre**.

La densité réelle varie avec la température : un carburant froid pèse un peu plus par litre. La valeur qui compte est celle du manuel de vol (POH/AFM) ; s'il en donne une autre, utilisez-la.

Les conversions entre volumes (litres et gallons) et entre masses (livres et kilogrammes) ne dépendent pas du carburant : 1 gallon US = 3,785 L, 1 gallon impérial = 4,546 L et 1 kg = 2,205 lb.

## Tableau de l'AVGAS

Chaque ligne indique ce que vaut **une** unité dans chaque colonne. Par exemple, 1 gallon US d'AVGAS correspond à 3,79 L, 6,00 lb ou 2,72 kg.

| 1 unité      | gal US | gal imp. |     L |   lb |    kg |
| ------------ | -----: | -------: | ----: | ---: | ----: |
| **gal US**   |      1 |    0,833 |  3,79 | 6,00 |  2,72 |
| **gal imp.** |   1,20 |        1 |  4,55 | 7,21 |  3,27 |
| **L**        |  0,264 |    0,220 |     1 | 1,59 | 0,719 |
| **lb**       |  0,167 |    0,139 | 0,631 |    1 | 0,454 |
| **kg**       |  0,367 |    0,306 |  1,39 | 2,20 |     1 |

## Tableau du Jet A

Même présentation, avec 6,7 lb par gallon US. C'est celui qui vaut pour les turbopropulseurs comme le [King Air B200](/fr/king-air-b200/) ou le King Air E90.

| 1 unité      | gal US | gal imp. |     L |   lb |    kg |
| ------------ | -----: | -------: | ----: | ---: | ----: |
| **gal US**   |      1 |    0,833 |  3,79 | 6,70 |  3,04 |
| **gal imp.** |   1,20 |        1 |  4,55 | 8,05 |  3,65 |
| **L**        |  0,264 |    0,220 |     1 | 1,77 | 0,803 |
| **lb**       |  0,149 |    0,124 | 0,565 |    1 | 0,454 |
| **kg**       |  0,329 |    0,274 |  1,25 | 2,20 |     1 |

Le devis de masse et centrage du calculateur imprime le schéma des conversions avec les facteurs du carburant de l'avion sélectionné.

## Exemples

### Cessna 152 : 60 litres d'AVGAS

Vous avez avitaillé 60 L à l'aéroclub et il vous faut la masse pour le devis du [Cessna 152](/fr/cessna-152/), qui travaille en gallons et en livres :

- 60 L ÷ 3,785 = **15,85 gal US**
- 15,85 gal × 6 lb/gal = **95,1 lb**
- 95,1 lb ÷ 2,205 = **43,1 kg**

Raccourci avec le tableau : 60 L × 1,59 = 95 lb. L'écart avec le calcul détaillé n'est qu'une question d'arrondi.

### King Air : 800 litres de Jet A

- 800 L × 1,77 = **1 416 lb** (642 kg).

Si vous utilisiez par erreur la densité de l'AVGAS, vous obtiendriez 1 268 lb : **148 lb de moins** que ce que vous avez réellement embarqué. C'est un passager qui manque sur le devis, avec son effet sur le centrage.

## Calcul mental rapide

Pour vérifier un ordre de grandeur sur le parking, sans calculatrice :

- **AVGAS** : litres × 1,6 ≈ livres ; litres × 0,72 ≈ kilogrammes ; gallons US × 6 = livres.
- **Jet A** : litres × 1,8 ≈ livres ; litres × 0,8 ≈ kilogrammes ; gallons US × 6,7 = livres.
- **Kilogrammes en livres** : doublez et ajoutez 10 % (50 kg → 100 + 10 = 110 lb).

Ces raccourcis détectent une erreur grossière ; ils ne sont pas faits pour le devis.

## Erreurs courantes

- **Gallons impériaux au lieu de gallons US.** Ce sont 4,546 L contre 3,785 L. Convertissez 40 gallons impériaux comme s'il s'agissait de gallons US, et environ 48 lb d'AVGAS disparaissent du calcul.
- **Densité de l'AVGAS pour du Jet A.** Le Jet A est environ 12 % plus lourd par litre. Sur un turbopropulseur qui emporte beaucoup de carburant, l'erreur atteint des centaines de livres.
- **Confondre kilogrammes et livres.** Le facteur est de 2,2 : noter 100 kg comme 100 lb fait oublier 120 lb.
- **Carburant total ou carburant utilisable.** Le manuel de vol distingue le carburant total du carburant utilisable, et le carburant inutilisable est généralement compris dans la masse à vide. Vérifiez lequel s'applique avant de l'additionner.
- **Trop arrondir.** Les facteurs des tableaux conviennent pour une estimation rapide ; pour le devis, utilisez les valeurs complètes ou le calculateur.

## Dans le calculateur

Dans [CheckCG](/fr/), le carburant peut être saisi **en masse ou en volume** (gallons ou litres), et la conversion utilise la densité du carburant de chaque avion : AVGAS pour les avions à pistons et Jet A pour les turbopropulseurs. Pour revoir comment cette masse entre dans le calcul du centre de gravité, voir [Masse, bras de levier et moment](/fr/guides/masse-bras-de-levier-et-moment/).

> **Important:** ce guide est un support d'étude. Le manuel de vol (POH/AFM) de votre aéronef et sa fiche de pesée sont les références qui font foi et prévalent sur toute donnée ou tout exemple de cette page. En cas de doute, consultez votre instructeur ou un atelier de maintenance agréé.
