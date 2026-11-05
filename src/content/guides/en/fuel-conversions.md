---
title: "Fuel conversions: liters, gallons, pounds and kilograms"
description: "AVGAS and Jet A conversion tables between liters, US and imperial gallons, pounds and kilograms, with a converter, worked examples and the most common mistakes."
lang: en
translationKey: fuel-conversions
slug: fuel-conversions
updated: 2026-11-05
tool: fuel-converter
faq:
  - q: "How much does a liter of AVGAS weigh?"
    a: "With the conventional 6 lb per US gallon, a liter of AVGAS weighs about 1.59 lb, or 0.72 kg. The real density changes with temperature, so your POH states the value to use."
  - q: "How much does a liter of Jet A weigh?"
    a: "With 6.7 lb per US gallon, a liter of Jet A weighs about 1.77 lb, or 0.80 kg. That is about 12% heavier than the same volume of AVGAS."
  - q: "What is the difference between a US gallon and an imperial gallon?"
    a: "A US gallon is 3.785 liters and an imperial gallon is 4.546 liters, so the imperial gallon is 20% larger. POHs for North American aircraft use US gallons."
---

In weight and balance, fuel is **loaded by volume** but **counts by weight**. The fuel truck sells it in liters or gallons, the POH lists it in gallons, and the loading form adds it up in pounds or kilograms. Converting is simple, but a wrong factor shifts the total weight and the CG as much as an extra passenger.

Above there is a **converter**: pick the fuel, type an amount and it shows every other unit.

## Volume and weight: density

Going from volume to weight takes the fuel's **density**. Weight and balance uses conventional values:

- **AVGAS 100LL**: 6.0 lb per US gallon, about **0.72 kg per liter** (specific gravity 0.72).
- **Jet A / Jet A-1**: 6.7 lb per US gallon, about **0.80 kg per liter**.

Real density changes with temperature: cold fuel weighs a little more per liter. The value that counts is the one in your POH/AFM; if it gives a different one, use it.

Conversions between volumes (liters and gallons) and between weights (pounds and kilograms) do not depend on the fuel: 1 US gallon = 3.785 L, 1 imperial gallon = 4.546 L and 1 kg = 2.205 lb.

## AVGAS table

Each row shows what **one** unit equals in every column. For example, 1 US gallon of AVGAS is 3.79 L, 6.00 lb or 2.72 kg.

| 1 unit       | US gal | imp. gal |     L |   lb |    kg |
| ------------ | -----: | -------: | ----: | ---: | ----: |
| **US gal**   |      1 |    0.833 |  3.79 | 6.00 |  2.72 |
| **imp. gal** |   1.20 |        1 |  4.55 | 7.21 |  3.27 |
| **L**        |  0.264 |    0.220 |     1 | 1.59 | 0.719 |
| **lb**       |  0.167 |    0.139 | 0.631 |    1 | 0.454 |
| **kg**       |  0.367 |    0.306 |  1.39 | 2.20 |     1 |

## Jet A table

Same layout, with 6.7 lb per US gallon. This is the one for turboprops such as the [King Air B200](/en/king-air-b200/) or the King Air E90.

| 1 unit       | US gal | imp. gal |     L |   lb |    kg |
| ------------ | -----: | -------: | ----: | ---: | ----: |
| **US gal**   |      1 |    0.833 |  3.79 | 6.70 |  3.04 |
| **imp. gal** |   1.20 |        1 |  4.55 | 8.05 |  3.65 |
| **L**        |  0.264 |    0.220 |     1 | 1.77 | 0.803 |
| **lb**       |  0.149 |    0.124 | 0.565 |    1 | 0.454 |
| **kg**       |  0.329 |    0.274 |  1.25 | 2.20 |     1 |

The calculator's load sheet prints the table for the selected aircraft's fuel.

## Worked examples

### Cessna 152: 60 liters of AVGAS

You uplifted 60 L at the flying club and need the weight for the [Cessna 152](/en/cessna-152/) loading form, which works in gallons and pounds:

- 60 L ÷ 3.785 = **15.85 US gal**
- 15.85 gal × 6 lb/gal = **95.1 lb**
- 95.1 lb ÷ 2.205 = **43.1 kg**

Shortcut with the table: 60 L × 1.59 = 95 lb. The difference from the long calculation is only rounding.

### King Air: 800 liters of Jet A

- 800 L × 1.77 = **1416 lb** (642 kg).

If you used the AVGAS density by mistake, you would get 1268 lb: **148 lb less** than what you actually loaded. That is a passenger missing from the form, with its effect on the CG.

## Quick mental math

To sanity-check a number on the ramp without a calculator:

- **AVGAS**: liters × 1.6 ≈ pounds; liters × 0.72 ≈ kilograms; US gallons × 6 = pounds.
- **Jet A**: liters × 1.8 ≈ pounds; liters × 0.8 ≈ kilograms; US gallons × 6.7 = pounds.
- **Kilograms to pounds**: double it and add 10% (50 kg → 100 + 10 = 110 lb).

They catch a gross error; they are not meant for the loading form.

## Common mistakes

- **Imperial instead of US gallons.** They are 4.546 L against 3.785 L. Convert 40 imperial gallons as if they were US gallons and about 48 lb of AVGAS go missing.
- **AVGAS density for Jet A.** Jet A is about 12% heavier per liter. In a turboprop carrying a lot of fuel, the error reaches hundreds of pounds.
- **Mixing up kilograms and pounds.** The factor is 2.2: writing 100 kg as 100 lb leaves out 120 lb.
- **Total versus usable fuel.** The POH separates total from usable fuel, and the unusable fuel is usually included in the empty weight. Check which one applies before adding it.
- **Rounding too much.** The table factors are fine for a quick estimate; for the form, use the full values or the calculator.

## In the calculator

In [CheckCG](/en/) fuel can be entered **by weight or by volume** (gallons or liters), and the conversion uses each aircraft's fuel density: AVGAS for piston aircraft and Jet A for turboprops. To review how that weight enters the center of gravity calculation, see [Weight, arm and moment](/en/guides/weight-arm-and-moment/).

> **Important:** this guide is study material. Your aircraft's POH/AFM and its weight and balance report are the authoritative references and take precedence over any data or example on this page. When in doubt, ask your flight instructor or a certified maintenance shop.
