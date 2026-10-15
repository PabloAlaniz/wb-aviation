---
title: "The CG envelope explained: forward and aft limits"
description: "What the center of gravity envelope is, why forward and aft limits matter, why the CG moves by landing and what to do when your loading is out of limits."
lang: en
translationKey: cg-envelope
slug: cg-envelope-explained
updated: 2026-10-15
faq:
  - q: "What happens if I fly with the CG aft of the aft limit?"
    a: "The airplane loses longitudinal stability, control forces get light and recovering from a stall or spin can become difficult or impossible. Never fly outside the limits."
  - q: "Why does a forward CG increase stall speed?"
    a: "With the CG further forward, the tail has to push down harder to balance the airplane. The wing must make up for that extra load with more lift, which raises the stall speed."
  - q: "Is being under maximum weight enough?"
    a: "No. Weight and CG are two independent conditions and both must be met, at takeoff and at landing."
---

The **CG envelope** is the area, on a chart of weight against center of gravity position, within which the airplane was certified. If your loading's (CG, weight) point falls inside, the airplane behaves the way the manufacturer demonstrated. If it falls outside, there's no guarantee of adequate stability or control.

## How to read it

The horizontal axis is the **CG** (arm in inches or millimeters aft of datum, or a moment). The vertical axis is **weight**. The envelope is a polygon:

- The **top edge** is the maximum weight.
- The **left edge** is the **forward limit**. On many airplanes it isn't a vertical line: above a certain weight it slopes aft, so the heavier you are, the less forward CG is allowed.
- The **right edge** is the **aft limit**.

For example, on the Cessna 152 (reference data from TCDS 3A19) the forward limit is 31.0 in up to 1,350 lb and moves linearly aft to 32.65 in at 1,670 lb; the aft limit is 36.5 in. Some airplanes also have separate envelopes for the normal and utility categories: the utility envelope is usually smaller and is the one that permits certain maneuvers.

To know whether a loading is inside, plot the point on the POH chart or interpolate the limit at your weight. Comparing the CG against a single number (the one at max weight, or at minimum weight) can lead you astray.

## Why the forward limit matters

With a forward CG the airplane is **more stable**, but:

- **The tail must push down harder** to keep it balanced. The wing carries that extra load, so **stall speed increases** and performance suffers somewhat (more drag, more fuel burn).
- **Control forces are higher** and the elevator has less margin. At the limit it may not be enough to raise the nose for rotation or to flare for landing, especially at low speed with flaps extended.

The forward limit is typically reached with two heavy people up front, nothing in the back and, on airplanes whose tanks are aft of the CG, little fuel.

## Why the aft limit matters

With an aft CG the airplane is **less stable**:

- Control forces get light and it's easy to over-control in pitch.
- **Stall speed drops** slightly, but the stall can be more abrupt.
- **Recovering from a stall or a spin** can become difficult or impossible, because the elevator loses the authority needed to lower the nose.

Beyond the aft limit the airplane can become unstable in pitch. It's the most dangerous condition and is typically reached with passengers in the back and heavy baggage in the aft compartment.

## Why the landing CG is different

Fuel burns during the flight, and fuel has its own arm. If the tank is **aft** of the CG, burning fuel moves the CG **forward**; if it's **forward**, the CG moves **aft**. That's why you check the landing and zero fuel points, not just takeoff. In the [Cessna 152 example](/en/guides/weight-arm-and-moment/) the CG goes from 33.27 in at takeoff to 32.97 in at landing.

Maximum weights can change too: some airplanes have a maximum landing weight lower than the takeoff weight, and others a maximum zero fuel weight.

## What to do if you're out of limits

First: **don't fly**. Then, depending on the case:

- **CG too far aft**: move baggage from the aft compartment forward, seat the heavier passenger up front or reduce baggage.
- **CG too far forward**: carry baggage in the aft compartment (within its limit), redistribute occupants or, if the POH allows it, use approved ballast.
- **Overweight**: less baggage, fewer passengers or less fuel, always keeping the required reserve and whatever your operation demands. Note that removing fuel also moves the CG.

After every change, recompute takeoff, landing and zero fuel.

## Check it in the calculator

The [CheckCG calculator](/en/) draws your airplane's envelope and plots the takeoff, landing and zero fuel points, with alerts as you approach a limit. For the full procedure, see [How to calculate weight and balance](/en/guides/how-to-calculate-weight-and-balance/).

> **Important:** this guide is study material. Your aircraft's POH/AFM and its weight and balance report are the authoritative references and take precedence over any data or example on this page. When in doubt, ask your flight instructor or a certified maintenance shop.
