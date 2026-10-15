---
title: "Como calcular peso e balanceamento de um avião, passo a passo"
description: "O procedimento completo de peso e balanceamento: peso vazio, braços, momentos, CG, peso máximo, envelope e CG de pouso. Com calculadora grátis."
lang: pt
translationKey: how-to-calculate
slug: como-calcular-peso-e-balanceamento
updated: 2026-10-15
steps:
  - name: "Pegue o peso vazio e o braço"
    text: "Use o peso vazio básico e o braço (ou momento) da ficha de peso e balanceamento vigente da sua aeronave, não do exemplo do POH."
  - name: "Anote o peso de cada estação"
    text: "Pese ou estime de forma conservadora cada ocupante, a bagagem e o combustível (em libras: galões × 6 para AVGAS)."
  - name: "Calcule o momento de cada estação"
    text: "Multiplique peso × braço de cada estação. Os braços vêm do POH/AFM."
  - name: "Some pesos e momentos"
    text: "O peso total é a soma de todos os pesos; o momento total, a soma de todos os momentos."
  - name: "Calcule o centro de gravidade"
    text: "CG = momento total ÷ peso total. O resultado fica na mesma unidade dos braços (por exemplo, polegadas atrás do datum)."
  - name: "Verifique o peso máximo e o envelope"
    text: "Confirme que o peso total não passa do máximo e que o ponto (CG, peso) fica dentro do envelope de CG do POH."
  - name: "Repita para o pouso e o peso zero combustível"
    text: "Subtraia o combustível que será queimado (e depois todo o combustível) e verifique se o CG continua dentro dos limites."
faq:
  - q: "Posso usar o peso vazio do exemplo do POH?"
    a: "Não. O exemplo do POH é ilustrativo. Cada aeronave tem o próprio peso vazio e braço, registrados na sua ficha de peso e balanceamento, que muda sempre que um equipamento é instalado ou removido."
  - q: "Quanto pesa um galão de AVGAS?"
    a: "Em peso e balanceamento costuma-se usar 6 lb por galão americano (cerca de 0,72 kg por litro). A densidade real varia com a temperatura; use o valor indicado no POH da sua aeronave."
  - q: "Basta verificar o CG na decolagem?"
    a: "Não. O CG se desloca conforme o combustível é queimado. É preciso verificar também o CG de pouso e, quando o POH pedir, a condição de peso zero combustível."
---

O cálculo de **peso e balanceamento** (Weight & Balance) responde a duas perguntas antes de cada voo: o avião está abaixo do peso máximo? E o centro de gravidade (CG) está dentro dos limites aprovados? As duas precisam ser verdadeiras. Um avião leve com o CG fora do envelope é tão inseguro quanto um avião acima do peso.

Neste guia você vai ver o procedimento completo, o mesmo que a [calculadora do CheckCG](/pt/) faz e que você pode fazer à mão numa planilha de carregamento. Se braço e momento ainda não estão claros, comece por [Peso, braço e momento](/pt/guias/peso-braco-e-momento/).

## O que você precisa antes de começar

- **O POH/AFM da sua aeronave** (Manual de Operação do Piloto ou Manual de Voo aprovado). É de lá que saem os braços de cada estação, os pesos máximos e o envelope de CG.
- **A ficha de peso e balanceamento vigente** do _seu_ avião (o relatório de pesagem). Ela traz o peso vazio e o braço ou momento. Muda toda vez que um equipamento é instalado ou retirado, então confira se é a versão mais recente.
- **Os pesos reais da carga**: ocupantes (com roupa e headset), bagagem e combustível.

## Passo 1: peso vazio e braço

Copie da ficha de peso e balanceamento o **peso vazio básico** e o **braço** (também chamado de estação). Alguns relatórios trazem o momento em vez do braço; nesse caso, o braço é momento ÷ peso. Se o POH usa momentos divididos por 1000, mantenha essa escala em todo o cálculo.

Não use o peso vazio do exemplo do POH nem o de outro avião do mesmo modelo: dois aviões "iguais" podem diferir em dezenas de libras e no braço.

## Passo 2: peso de cada estação

Anote o peso de cada estação de carga prevista no POH: assentos dianteiros, assentos traseiros, cada compartimento de bagagem e cada tanque de combustível.

- **Pessoas**: se não for pesar, estime para cima. Um erro de 20 lb no banco traseiro pode deslocar o CG mais do que você imagina.
- **Combustível**: converta galões em libras. Para AVGAS costuma-se usar **6 lb/gal**. Se tiver litros, converta primeiro para galões (1 gal americano = 3,785 L).
- **Bagagem**: respeite o máximo de cada compartimento e, quando houver, o máximo combinado.

## Passo 3: momento de cada estação

O **momento** é peso × braço. Calcule para cada estação, inclusive o peso vazio. Os braços estão na seção de peso e balanceamento do POH e são medidos a partir do _datum_, um plano de referência definido pelo fabricante.

## Passo 4: somar pesos e momentos

- **Peso total** = peso vazio + todas as estações.
- **Momento total** = momento vazio + todos os momentos.

## Passo 5: calcular o centro de gravidade

**CG = momento total ÷ peso total.** O resultado fica na mesma unidade dos braços: se os braços estão em polegadas atrás do datum, o CG também. Se você trabalhou com momento/1000, multiplique por 1000 antes de dividir (ou divida e multiplique o resultado por 1000).

## Passo 6: verificar peso máximo e envelope

1. **Peso total ≤ peso máximo de decolagem.** Alguns aviões têm também um peso máximo de rampa (para partida e táxi) e um peso máximo de pouso diferente.
2. **O ponto (CG, peso) dentro do envelope.** Comparar o CG com um único número não basta: em muitos aviões o limite dianteiro recua conforme o peso aumenta. Marque o ponto no gráfico do POH ou interpole entre os vértices. Explicamos isso em [O envelope de CG](/pt/guias/envelope-de-cg/).

## Passo 7: pouso e peso zero combustível

O combustível é consumido durante o voo e, com ele, muda o momento. Para o **pouso**:

- Subtraia do peso total o combustível que será queimado (consumo × tempo de voo; a reserva continua a bordo).
- Subtraia do momento total esse combustível × o braço do tanque.
- Calcule o novo CG e confira se continua dentro do envelope e abaixo do peso máximo de pouso.

Repita com **todo o combustível utilizável queimado** (peso zero combustível). Em muitos aviões é a condição mais desfavorável, e alguns POH definem um peso máximo zero combustível.

Dependendo de onde fica o tanque em relação ao CG, queimar combustível pode levar o CG para frente ou para trás. Por isso um avião que decola dentro dos limites pode pousar fora deles.

## Se der fora dos limites

Não voe. Redistribua a carga (bagagem em outro compartimento, um passageiro em outro assento), reduza bagagem ou combustível sem abrir mão da reserva regulamentar e da exigida pela operação, e recalcule. Se a solução for lastro, use apenas o que o POH autorizar.

## Faça na calculadora

A [calculadora do CheckCG](/pt/) faz os sete passos na hora: você informa o peso vazio da ficha de peso e balanceamento (como aeronave própria), os pesos de cada estação e o combustível a queimar, e ela mostra peso, CG, o envelope e as fases de decolagem, pouso e zero combustível. Também gera a planilha de carregamento em PDF. Há páginas com dados de referência de cada modelo, como o [Cessna 152](/pt/cessna-152/) e o [Cessna 172S](/pt/cessna-172s/).

> **Importante:** este guia é material de estudo. O POH/AFM e a ficha de peso e balanceamento da sua aeronave são a referência oficial e prevalecem sobre qualquer dado ou exemplo desta página. Em caso de dúvida, consulte seu instrutor ou uma oficina homologada.
