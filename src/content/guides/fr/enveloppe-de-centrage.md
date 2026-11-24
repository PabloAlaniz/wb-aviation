---
title: "L'enveloppe de centrage d'un avion : limites avant et arrière"
description: "Ce qu'est l'enveloppe de centrage, pourquoi les limites avant et arrière comptent, pourquoi le CG se déplace jusqu'à l'atterrissage et que faire hors limites."
lang: fr
translationKey: cg-envelope
slug: enveloppe-de-centrage
published: 2026-11-24
updated: 2026-11-24
faq:
  - q: "Que se passe-t-il si je vole avec le CG en arrière de la limite arrière ?"
    a: "L'avion perd sa stabilité longitudinale, les efforts aux commandes deviennent faibles et la sortie de décrochage ou de vrille peut devenir difficile, voire impossible. Ne volez jamais hors limites."
  - q: "Pourquoi un centrage avant augmente-t-il la vitesse de décrochage ?"
    a: "Avec un CG plus en avant, l'empennage doit pousser plus fort vers le bas pour équilibrer l'avion. L'aile doit compenser cette charge supplémentaire par davantage de portance, ce qui augmente la vitesse de décrochage."
  - q: "Suffit-il d'être sous la masse maximale ?"
    a: "Non. La masse et le centrage sont deux conditions indépendantes, et les deux doivent être respectées, au décollage comme à l'atterrissage."
---

L'**enveloppe de centrage** (ou domaine de centrage, _CG envelope_ en anglais) est la zone, sur un graphique de la masse en fonction de la position du centre de gravité, dans laquelle l'avion a été certifié. Si le point (CG, masse) de votre chargement s'y trouve, l'avion se comporte comme le constructeur l'a démontré. S'il en sort, rien ne garantit une stabilité ni un contrôle suffisants.

## Comment la lire

L'axe horizontal représente le **centrage** (bras de levier en pouces ou en millimètres en arrière de la référence, ou un moment). L'axe vertical représente la **masse**. L'enveloppe est un polygone :

- Le **bord supérieur** est la masse maximale.
- Le **bord gauche** est la **limite avant**. Sur beaucoup d'avions, ce n'est pas une ligne verticale : au-dessus d'une certaine masse, elle s'incline vers l'arrière, si bien que plus l'avion est lourd, moins le centrage avant est admis.
- Le **bord droit** est la **limite arrière**.

Par exemple, sur le Cessna 152 (données de référence du TCDS 3A19), la limite avant est de 31,0 in jusqu'à 1 350 lb et recule linéairement jusqu'à 32,65 in à 1 670 lb ; la limite arrière est de 36,5 in. Certains avions ont aussi des enveloppes distinctes pour les catégories normale et utilitaire : l'enveloppe utilitaire est généralement plus petite, et c'est elle qui autorise certaines manœuvres.

Pour savoir si un chargement est à l'intérieur, reportez le point sur l'abaque du manuel de vol ou interpolez la limite à votre masse. Comparer le CG à un seul nombre (celui de la masse maximale, ou celui de la masse minimale) peut vous induire en erreur.

## Pourquoi la limite avant compte

Avec un centrage avant, l'avion est **plus stable**, mais :

- **L'empennage doit pousser plus fort vers le bas** pour maintenir l'équilibre. L'aile supporte cette charge supplémentaire : la **vitesse de décrochage augmente** et les performances se dégradent un peu (plus de traînée, plus de consommation).
- **Les efforts aux commandes sont plus élevés** et la gouverne de profondeur a moins de marge. À la limite, elle peut ne pas suffire pour lever le nez à la rotation ou pour arrondir à l'atterrissage, surtout à basse vitesse avec les volets sortis.

La limite avant est typiquement atteinte avec deux personnes lourdes à l'avant, rien à l'arrière et, sur les avions dont les réservoirs sont en arrière du CG, peu de carburant.

## Pourquoi la limite arrière compte

Avec un centrage arrière, l'avion est **moins stable** :

- Les efforts aux commandes deviennent faibles et il est facile de surcontrôler en tangage.
- La **vitesse de décrochage diminue** légèrement, mais le décrochage peut être plus brutal.
- La **sortie de décrochage ou de vrille** peut devenir difficile, voire impossible, parce que la gouverne de profondeur perd l'autorité nécessaire pour baisser le nez.

Au-delà de la limite arrière, l'avion peut devenir instable en tangage. C'est la situation la plus dangereuse ; elle est typiquement atteinte avec des passagers à l'arrière et des bagages lourds dans la soute arrière.

## Pourquoi le centrage à l'atterrissage est différent

Le carburant est consommé pendant le vol, et il a son propre bras de levier. Si le réservoir est **en arrière** du CG, la consommation déplace le CG **vers l'avant** ; s'il est **en avant**, le CG se déplace **vers l'arrière**. C'est pourquoi on vérifie les points d'atterrissage et sans carburant, et pas seulement le décollage. Dans l'[exemple du Cessna 152](/fr/guides/masse-bras-de-levier-et-moment/), le CG passe de 33,27 in au décollage à 32,97 in à l'atterrissage.

Les masses maximales peuvent changer elles aussi : certains avions ont une masse maximale à l'atterrissage inférieure à la masse maximale au décollage, et d'autres une masse maximale sans carburant.

## Que faire si vous êtes hors limites

D'abord : **ne volez pas**. Ensuite, selon le cas :

- **Centrage trop arrière** : déplacez des bagages de la soute arrière vers l'avant, installez le passager le plus lourd à l'avant ou réduisez les bagages.
- **Centrage trop avant** : placez des bagages dans la soute arrière (dans sa limite), répartissez autrement les occupants ou, si le manuel de vol l'autorise, utilisez du lest approuvé.
- **Surcharge** : moins de bagages, moins de passagers ou moins de carburant, en conservant toujours la réserve réglementaire et ce qu'exige votre exploitation. Notez que retirer du carburant déplace aussi le CG.

Après chaque modification, recalculez le décollage, l'atterrissage et la condition sans carburant.

## Vérifiez dans le calculateur

Le [calculateur CheckCG](/fr/) trace l'enveloppe de votre avion et y place les points de décollage, d'atterrissage et sans carburant, avec des alertes à l'approche d'une limite. Pour la procédure complète, voir [Comment calculer la masse et le centrage](/fr/guides/comment-calculer-masse-et-centrage/).

> **Important:** ce guide est un support d'étude. Le manuel de vol (POH/AFM) de votre aéronef et sa fiche de pesée sont les références qui font foi et prévalent sur toute donnée ou tout exemple de cette page. En cas de doute, consultez votre instructeur ou un atelier de maintenance agréé.
