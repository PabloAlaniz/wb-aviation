---
title: "O envelope de CG: limites dianteiro e traseiro, explicados"
description: "O que é o envelope de centro de gravidade, por que os limites dianteiro e traseiro importam, por que o CG muda no pouso e o que fazer se você ficar fora."
lang: pt
translationKey: cg-envelope
slug: envelope-de-cg
updated: 2026-10-15
faq:
  - q: "O que acontece se eu voar com o CG atrás do limite traseiro?"
    a: "O avião perde estabilidade longitudinal, os comandos ficam leves e a recuperação de um estol ou parafuso pode ficar difícil ou impossível. Nunca voe fora dos limites."
  - q: "Por que o CG dianteiro aumenta a velocidade de estol?"
    a: "Com o CG mais à frente, a cauda precisa gerar mais força para baixo para equilibrar o avião. A asa compensa essa carga extra com mais sustentação, o que eleva a velocidade de estol."
  - q: "Basta estar abaixo do peso máximo?"
    a: "Não. Peso e CG são duas condições independentes e as duas precisam ser cumpridas, na decolagem e no pouso."
---

O **envelope de CG** é a área, num gráfico de peso versus posição do centro de gravidade, dentro da qual o avião foi certificado. Se o ponto (CG, peso) do seu carregamento cai dentro, o avião se comporta como o fabricante demonstrou. Se cai fora, não há garantia de estabilidade nem de controle suficientes.

## Como ler

No eixo horizontal fica o **CG** (braço em polegadas ou milímetros atrás do datum, ou um momento). No vertical, o **peso**. O envelope é um polígono:

- A **borda superior** é o peso máximo.
- A **borda esquerda** é o **limite dianteiro**. Em muitos aviões não é uma linha vertical: a partir de certo peso ela se inclina para trás, ou seja, quanto mais peso, menos CG dianteiro é permitido.
- A **borda direita** é o **limite traseiro**.

Por exemplo, no Cessna 152 (dados de referência do TCDS 3A19) o limite dianteiro é 31,0 in até 1.350 lb e recua linearmente até 32,65 in a 1.670 lb; o traseiro é 36,5 in. Alguns aviões têm ainda envelopes diferentes para as categorias normal e utilidade: o da categoria utilidade costuma ser menor e é o que permite certas manobras.

Para saber se um carregamento está dentro, marque o ponto no gráfico do POH ou interpole o limite no seu peso. Comparar o CG com um único número (o do peso máximo ou o do peso mínimo) pode levar a erro.

## Por que o limite dianteiro importa

Com o CG dianteiro o avião fica **mais estável**, mas:

- **A cauda precisa fazer mais força para baixo** para mantê-lo equilibrado. A asa carrega esse peso extra, então a **velocidade de estol aumenta** e o desempenho piora um pouco (mais arrasto, mais consumo).
- **As forças no manche são maiores** e o profundor tem menos margem. No limite, pode não ser suficiente para levantar o nariz na rotação ou para arredondar no pouso, principalmente em baixa velocidade e com flapes.

O limite dianteiro costuma ser atingido com duas pessoas pesadas na frente, nada atrás e, em aviões com tanques atrás do CG, pouco combustível.

## Por que o limite traseiro importa

Com o CG traseiro o avião fica **menos estável**:

- Os comandos ficam leves e é fácil sobrecomandar em arfagem.
- A **velocidade de estol cai** um pouco, mas o estol pode ser mais abrupto.
- A **recuperação de um estol ou de um parafuso** pode ficar difícil ou impossível, porque o profundor perde a autoridade necessária para baixar o nariz.

Além do limite traseiro o avião pode ficar instável em arfagem. É a condição mais perigosa e costuma ser atingida com passageiros atrás e muita bagagem no compartimento traseiro.

## Por que o CG de pouso é diferente

Durante o voo o combustível é queimado, e ele tem seu próprio braço. Se o tanque fica **atrás** do CG, queimar combustível leva o CG **para frente**; se fica **à frente**, o CG vai **para trás**. Por isso é preciso verificar o ponto de pouso e o de zero combustível, não só o de decolagem. No [exemplo do Cessna 152](/pt/guias/peso-braco-e-momento/) o CG passa de 33,27 in na decolagem para 32,97 in no pouso.

Os pesos máximos também podem mudar: alguns aviões têm peso máximo de pouso menor que o de decolagem, e outros um peso máximo zero combustível.

## O que fazer se ficar fora

Primeiro: **não voe**. Depois, conforme o caso:

- **CG muito atrás**: passe bagagem do compartimento traseiro para o dianteiro, coloque o passageiro mais pesado na frente ou reduza a bagagem.
- **CG muito à frente**: leve bagagem no compartimento traseiro (respeitando o máximo dele), redistribua os ocupantes ou, se o POH permitir, use lastro aprovado.
- **Excesso de peso**: menos bagagem, menos passageiros ou menos combustível, sempre mantendo a reserva regulamentar e a exigida pela operação. Atenção: retirar combustível também desloca o CG.

Depois de cada mudança, recalcule decolagem, pouso e zero combustível.

## Confira na calculadora

A [calculadora do CheckCG](/pt/) desenha o envelope do seu avião e marca os pontos de decolagem, pouso e zero combustível, com alertas quando você se aproxima de um limite. Para o procedimento completo, veja [Como calcular peso e balanceamento](/pt/guias/como-calcular-peso-e-balanceamento/).

> **Importante:** este guia é material de estudo. O POH/AFM e a ficha de peso e balanceamento da sua aeronave são a referência oficial e prevalecem sobre qualquer dado ou exemplo desta página. Em caso de dúvida, consulte seu instrutor ou uma oficina homologada.
