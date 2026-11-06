---
title: "Conversões de combustível: litros, galões, libras e quilos"
description: "Tabelas de conversão de AVGAS e Jet A entre litros, galões US e imperiais, libras e quilos, com um conversor, exemplos resolvidos e os erros mais comuns."
lang: pt
translationKey: fuel-conversions
slug: conversoes-de-combustivel
updated: 2026-11-05
tool: fuel-converter
faq:
  - q: "Quanto pesa um litro de AVGAS?"
    a: "Com a densidade convencional de 6 lb por galão US, um litro de AVGAS pesa cerca de 1,59 lb, ou 0,72 kg. A densidade real muda com a temperatura, por isso o POH indica o valor a usar."
  - q: "Quanto pesa um litro de Jet A?"
    a: "Com 6,7 lb por galão US, um litro de Jet A pesa cerca de 1,77 lb, ou 0,80 kg. É cerca de 12% mais pesado que o mesmo volume de AVGAS."
  - q: "Qual é a diferença entre o galão US e o galão imperial?"
    a: "O galão US tem 3,785 litros e o imperial 4,546 litros: o imperial é 20% maior. Os POH de aviões norte-americanos usam galões US."
---

Em peso e balanceamento, o combustível é **abastecido por volume** mas **conta pelo peso**. No posto ele é vendido em litros, o POH o indica em galões e a ficha de carregamento o soma em libras ou quilos. Converter é simples, mas um fator errado muda o peso total e o CG tanto quanto um passageiro a mais.

Acima há um **conversor**: escolha o combustível, digite a quantidade e ele mostra as demais unidades.

## Volume e peso: a densidade

Para passar de volume a peso é preciso a **densidade** do combustível. Em peso e balanceamento usam-se valores convencionais:

- **AVGAS 100LL**: 6,0 lb por galão US, cerca de **0,72 kg por litro** (densidade relativa 0,72).
- **Jet A / Jet A-1**: 6,7 lb por galão US, cerca de **0,80 kg por litro**.

A densidade real muda com a temperatura: o combustível frio pesa um pouco mais por litro. Por isso vale o valor do seu POH/AFM; se ele indicar outro, use esse.

As conversões entre volumes (litros e galões) e entre pesos (libras e quilos) não dependem do combustível: 1 galão US = 3,785 L, 1 galão imperial = 4,546 L e 1 kg = 2,205 lb.

## Tabela de AVGAS

Cada linha diz quanto vale **uma** unidade em cada coluna. Por exemplo, 1 galão US de AVGAS são 3,79 L, 6,00 lb ou 2,72 kg.

| 1 unidade    | gal US | gal imp. |     L |   lb |    kg |
| ------------ | -----: | -------: | ----: | ---: | ----: |
| **gal US**   |      1 |    0,833 |  3,79 | 6,00 |  2,72 |
| **gal imp.** |   1,20 |        1 |  4,55 | 7,21 |  3,27 |
| **L**        |  0,264 |    0,220 |     1 | 1,59 | 0,719 |
| **lb**       |  0,167 |    0,139 | 0,631 |    1 | 0,454 |
| **kg**       |  0,367 |    0,306 |  1,39 | 2,20 |     1 |

## Tabela de Jet A

Mesmo formato, com 6,7 lb por galão US. É a que corresponde a turboélices como o [King Air B200](/pt/king-air-b200/) ou o King Air E90.

| 1 unidade    | gal US | gal imp. |     L |   lb |    kg |
| ------------ | -----: | -------: | ----: | ---: | ----: |
| **gal US**   |      1 |    0,833 |  3,79 | 6,70 |  3,04 |
| **gal imp.** |   1,20 |        1 |  4,55 | 8,05 |  3,65 |
| **L**        |  0,264 |    0,220 |     1 | 1,77 | 0,803 |
| **lb**       |  0,149 |    0,124 | 0,565 |    1 | 0,454 |
| **kg**       |  0,329 |    0,274 |  1,25 | 2,20 |     1 |

A ficha de carregamento da calculadora imprime a tabela do combustível da aeronave escolhida.

## Exemplos resolvidos

### Cessna 152: 60 litros de AVGAS

Você abasteceu 60 L no aeroclube e precisa do peso para a ficha do [Cessna 152](/pt/cessna-152/), que trabalha em galões e libras:

- 60 L ÷ 3,785 = **15,85 gal US**
- 15,85 gal × 6 lb/gal = **95,1 lb**
- 95,1 lb ÷ 2,205 = **43,1 kg**

Atalho com a tabela: 60 L × 1,59 = 95 lb. A diferença para o cálculo completo é só de arredondamento.

### King Air: 800 litros de Jet A

- 800 L × 1,77 = **1416 lb** (642 kg).

Se por engano você usasse a densidade de AVGAS, daria 1268 lb: **148 lb a menos** do que você realmente abasteceu. É o peso de um passageiro que não aparece na ficha, com seu efeito no CG.

## Contas rápidas de cabeça

Para conferir um número na pista, sem calculadora:

- **AVGAS**: litros × 1,6 ≈ libras; litros × 0,72 ≈ quilos; galões US × 6 = libras.
- **Jet A**: litros × 1,8 ≈ libras; litros × 0,8 ≈ quilos; galões US × 6,7 = libras.
- **Quilos para libras**: dobre e some 10% (50 kg → 100 + 10 = 110 lb).

Servem para detectar um erro grosseiro, não para a ficha.

## Erros comuns

- **Galão imperial em vez de US.** São 4,546 L contra 3,785 L. Se converter 40 galões imperiais como se fossem US, faltam cerca de 48 lb de AVGAS.
- **Densidade de AVGAS para Jet A.** O Jet A pesa cerca de 12% mais por litro. Num turboélice com muito combustível, o erro chega a centenas de libras.
- **Misturar quilos e libras.** O fator é 2,2: anotar 100 kg como 100 lb deixa de fora 120 lb.
- **Combustível total e utilizável.** O POH separa o combustível total do utilizável; o não utilizável costuma estar incluído no peso vazio. Confira qual corresponde antes de somar.
- **Arredondar demais.** Para uma estimativa rápida bastam os fatores da tabela; para a ficha, faça a conta com os valores completos ou use a calculadora.

## Na calculadora

No [CheckCG](/pt/) o combustível pode ser lançado **por peso ou por volume** (galões ou litros), e a conversão usa a densidade do combustível de cada aeronave: AVGAS para os aviões a pistão e Jet A para os turboélices. Para revisar como esse peso entra no cálculo do centro de gravidade, veja [Peso, braço e momento](/pt/guias/peso-braco-e-momento/).

> **Importante:** este guia é material de estudo. O POH/AFM e a ficha de peso e balanceamento da sua aeronave são a referência oficial e prevalecem sobre qualquer dado ou exemplo desta página. Em caso de dúvida, consulte seu instrutor ou uma oficina homologada.
