---
title: "Weight, arm and moment: a worked Cessna 152 example"
description: "What datum, arm and moment mean in weight and balance, with a complete Cessna 152 worked example and the most common unit and scaling mistakes."
lang: en
translationKey: weight-arm-moment
slug: weight-arm-and-moment
updated: 2026-10-15
faq:
  - q: "What is a moment in weight and balance?"
    a: "It is an item's weight multiplied by its arm (the distance from the datum), expressed for example in pound-inches (lb-in). Adding all moments and dividing by total weight gives the center of gravity."
  - q: "Why does the POH divide moments by 1000?"
    a: "To keep the numbers in tables and charts small. It is only a scale and must be used consistently throughout the calculation."
  - q: "How much do 24.5 gallons of avgas weigh?"
    a: "Using the conventional 6 lb/gal, 24.5 gal × 6 = 147 lb. Your aircraft's POH gives the value to use."
---

Every weight and balance calculation rests on three ideas: **datum**, **arm** and **moment**. Once they click, any POH loading form is just addition.

## Datum, arm and moment

- **Datum**: a vertical reference plane chosen by the manufacturer. It can be the front face of the firewall, the tip of the spinner or a point ahead of the airplane. Everything is measured from it.
- **Arm** (or station): the horizontal distance from the datum to an item's center of gravity. On airplanes with imperial units it is measured in inches; by convention it is positive aft of the datum and negative forward of it.
- **Moment**: weight × arm. It measures how much leverage a weight has around the datum. A 20 lb item far aft can matter more for balance than a 50 lb item close to the datum.

The **center of gravity** is the point where all the weight acts: **CG = sum of moments ÷ sum of weights**.

## Worked example: Cessna 152

We'll use the Cessna 152 reference values in CheckCG (TCDS 3A19 and the 152 POH). The datum is the front face of the firewall. **These are reference values: to fly, use the empty weight and arm from your airplane's weight and balance report and the data in its POH.**

The loading:

- Empty weight of the POH sample airplane: 1,136 lb at 29.93 in.
- Pilot 170 lb and passenger 160 lb, both in the seats at 39 in.
- Baggage area 1 (64 in): 20 lb. Area 2 (84 in): empty.
- Fuel: full tanks, 24.5 usable gal × 6 lb/gal = 147 lb at 42 in.

| Station             | Weight (lb) | Arm (in) | Moment (lb-in) |
| ------------------- | ----------: | -------: | -------------: |
| Empty weight        |       1,136 |    29.93 |      34,000.48 |
| Pilot               |         170 |    39.00 |          6,630 |
| Passenger           |         160 |    39.00 |          6,240 |
| Baggage area 1      |          20 |    64.00 |          1,280 |
| Baggage area 2      |           0 |    84.00 |              0 |
| Fuel (24.5 gal)     |         147 |    42.00 |          6,174 |
| **Total (takeoff)** |   **1,633** |          |  **54,324.48** |

**CG = 54,324.48 ÷ 1,633 = 33.27 in** aft of datum. With moment/1000, as in the POH tables, the total moment is 54.32.

### Is it within limits?

- **Weight**: 1,633 lb, below the 1,670 lb maximum.
- **CG**: on this model the aft limit is 36.50 in. The forward limit is 31.00 in up to 1,350 lb and moves aft linearly to 32.65 in at 1,670 lb. At 1,633 lb the forward limit is 31.00 + (1,633 − 1,350) × (1.65 ÷ 320) = **32.46 in**. Since 32.46 ≤ 33.27 ≤ 36.50, the CG is inside the envelope.

### Landing and zero fuel

Say the flight burns 9 gal (54 lb). That fuel leaves from the 42 in arm:

- **Landing**: weight 1,633 − 54 = **1,579 lb**; moment 54,324.48 − 54 × 42 = 52,056.48; **CG = 32.97 in**.
- **Zero fuel**: weight 1,633 − 147 = **1,486 lb**; moment 48,150.48; **CG = 32.40 in**.

Because the tank is aft of the CG, burning fuel moves the CG **forward**. Both conditions are still inside the envelope, but the margin to the forward limit shrinks. On other airplanes, with tanks elsewhere, the opposite can happen.

You can reproduce this example in the [Cessna 152 calculator](/en/cessna-152/) by entering the same weights.

## Common mistakes

- **Mixing scaled and unscaled moments.** If one row reads 34.0 (moment/1000) and another 6,630 (lb-in), the sum is meaningless. Pick one scale and stick to it.
- **Pounds and kilograms.** 1 kg = 2.2046 lb. If the airplane is certified in kilograms and millimeters (or meters), do the entire calculation in those units without mixing in pound data.
- **Millimeters and inches.** 1 in = 25.4 mm. A 39 in arm is 990.6 mm; mix them up and the CG becomes nonsense.
- **Gallons and pounds.** Fuel goes in as pounds: gallons × 6 for avgas (conventional value; check your POH). Entering "24.5" in the fuel station as if it were pounds shifts the CG and understates the weight by more than 120 lb.
- **Total fuel instead of usable fuel.** Unusable fuel is usually included in the empty weight; check what your weight and balance report says so you don't count it twice.
- **Treating the POH sample as your airplane.** Empty weight and arm belong to each individual airframe.
- **Watching only the aft limit.** With a lot of weight up front the risk is the forward limit, which also depends on weight.

For the full procedure, see [How to calculate weight and balance](/en/guides/how-to-calculate-weight-and-balance/), and to understand the limits, [The CG envelope explained](/en/guides/cg-envelope-explained/).

> **Important:** this guide is study material. Your aircraft's POH/AFM and its weight and balance report are the authoritative references and take precedence over any data or example on this page. When in doubt, ask your flight instructor or a certified maintenance shop.
