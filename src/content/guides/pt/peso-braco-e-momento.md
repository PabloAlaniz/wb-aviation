---
title: "Peso, braço e momento: exemplo resolvido com um Cessna 152"
description: "O que são datum, braço e momento em peso e balanceamento, com um exemplo completo num Cessna 152 e os erros mais comuns de unidades e escalas."
lang: pt
translationKey: weight-arm-moment
slug: peso-braco-e-momento
updated: 2026-10-15
faq:
  - q: "O que é momento em peso e balanceamento?"
    a: "É o peso de um item multiplicado pelo seu braço (a distância até o datum), expresso por exemplo em libras-polegada (lb-in). Somando os momentos e dividindo pelo peso total obtém-se o centro de gravidade."
  - q: "Por que o POH divide os momentos por 1000?"
    a: "Para trabalhar com números menores nas tabelas e gráficos. É apenas uma escala e deve ser usada de forma consistente em todo o cálculo."
  - q: "Quanto pesam 24,5 galões de AVGAS?"
    a: "Com o valor convencional de 6 lb/gal, 24,5 gal × 6 = 147 lb. O POH da sua aeronave indica o valor a usar."
---

Todo cálculo de peso e balanceamento se apoia em três ideias: **datum**, **braço** e **momento**. Com elas claras, qualquer planilha do POH vira uma soma.

## Datum, braço e momento

- **Datum**: um plano de referência vertical escolhido pelo fabricante. Pode ser a face dianteira da parede de fogo (_firewall_), a ponta do spinner ou um ponto à frente do avião. Tudo é medido a partir dele.
- **Braço** (ou estação): a distância horizontal entre o datum e o centro de gravidade de um item. Em aviões com unidades imperiais é medido em polegadas; por convenção é positivo atrás do datum e negativo à frente.
- **Momento**: peso × braço. Mede a "alavanca" que um peso faz em torno do datum. Uma carga de 20 lb bem atrás pode pesar mais no balanceamento do que uma de 50 lb perto do datum.

O **centro de gravidade** é o ponto onde todo o peso se concentra: **CG = soma dos momentos ÷ soma dos pesos**.

## Exemplo resolvido: Cessna 152

Usamos os valores de referência do Cessna 152 que estão no CheckCG (TCDS 3A19 e POH do 152). O datum é a face dianteira da parede de fogo. **São valores de referência: para voar, use o peso vazio e o braço da ficha de peso e balanceamento do seu avião e os dados do POH dele.**

Carregamento do exemplo:

- Peso vazio do avião de exemplo do POH: 1.136 lb a 29,93 in.
- Piloto 170 lb e passageiro 160 lb, ambos nos assentos a 39 in.
- Bagagem na área 1 (64 in): 20 lb. Área 2 (84 in): vazia.
- Combustível: tanques cheios, 24,5 gal utilizáveis × 6 lb/gal = 147 lb a 42 in.

| Estação                | Peso (lb) | Braço (in) | Momento (lb-in) |
| ---------------------- | --------: | ---------: | --------------: |
| Peso vazio             |     1.136 |      29,93 |       34.000,48 |
| Piloto                 |       170 |      39,00 |           6.630 |
| Passageiro             |       160 |      39,00 |           6.240 |
| Bagagem área 1         |        20 |      64,00 |           1.280 |
| Bagagem área 2         |         0 |      84,00 |               0 |
| Combustível (24,5 gal) |       147 |      42,00 |           6.174 |
| **Total (decolagem)**  | **1.633** |            |   **54.324,48** |

**CG = 54.324,48 ÷ 1.633 = 33,27 in** atrás do datum. Com momento/1000, como nas tabelas do POH, o momento total é 54,32.

### Está dentro dos limites?

- **Peso**: 1.633 lb, abaixo do máximo de 1.670 lb.
- **CG**: neste modelo o limite traseiro é 36,50 in. O dianteiro é 31,00 in até 1.350 lb e recua linearmente até 32,65 in a 1.670 lb. A 1.633 lb o limite dianteiro é 31,00 + (1.633 − 1.350) × (1,65 ÷ 320) = **32,46 in**. Como 32,46 ≤ 33,27 ≤ 36,50, o CG está dentro do envelope.

### Pouso e peso zero combustível

Suponha um voo que consome 9 gal (54 lb). Esse combustível sai do braço de 42 in:

- **Pouso**: peso 1.633 − 54 = **1.579 lb**; momento 54.324,48 − 54 × 42 = 52.056,48; **CG = 32,97 in**.
- **Zero combustível**: peso 1.633 − 147 = **1.486 lb**; momento 48.150,48; **CG = 32,40 in**.

Como o tanque fica atrás do CG, queimar combustível leva o CG **para frente**. As duas condições continuam dentro do envelope, mas a margem até o limite dianteiro diminui. Em outros aviões, com tanques em outra posição, pode acontecer o contrário.

Você pode reproduzir este exemplo na [calculadora do Cessna 152](/pt/cessna-152/) informando os mesmos pesos.

## Erros comuns

- **Misturar momentos com e sem escala.** Se uma linha diz 34,0 (momento/1000) e outra 6.630 (lb-in), a soma não faz sentido. Escolha uma escala e use em todo o cálculo.
- **Libras e quilos.** 1 kg = 2,2046 lb. Se o avião é certificado em quilos e milímetros (ou metros), faça todo o cálculo nessas unidades, sem misturar com dados em libras.
- **Milímetros e polegadas.** 1 in = 25,4 mm. Um braço de 39 in equivale a 990,6 mm; misturando unidades, o CG vira um absurdo.
- **Galões e libras.** O combustível entra em libras: galões × 6 para AVGAS (valor convencional; confira o do POH). Digitar "24,5" na estação de combustível como se fossem libras desloca o CG e subestima o peso em mais de 120 lb.
- **Combustível total em vez de utilizável.** O combustível não utilizável costuma estar incluído no peso vazio; confira o que diz sua ficha de peso e balanceamento para não contá-lo duas vezes.
- **Usar o exemplo do POH como se fosse o seu avião.** Peso vazio e braço são próprios de cada matrícula.
- **Olhar só o limite traseiro.** Com muito peso na frente, o risco é o limite dianteiro, que também depende do peso.

Para o procedimento completo, veja [Como calcular peso e balanceamento](/pt/guias/como-calcular-peso-e-balanceamento/) e, para entender os limites, [O envelope de CG](/pt/guias/envelope-de-cg/).

> **Importante:** este guia é material de estudo. O POH/AFM e a ficha de peso e balanceamento da sua aeronave são a referência oficial e prevalecem sobre qualquer dado ou exemplo desta página. Em caso de dúvida, consulte seu instrutor ou uma oficina homologada.
