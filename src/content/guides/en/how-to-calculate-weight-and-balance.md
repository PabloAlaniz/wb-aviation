---
title: "How to calculate aircraft weight and balance, step by step"
description: "The full weight and balance procedure: empty weight, arms, moments, center of gravity, max weight, CG envelope and landing CG. With a free calculator."
lang: en
translationKey: how-to-calculate
slug: how-to-calculate-weight-and-balance
updated: 2026-10-15
steps:
  - name: "Get the empty weight and arm"
    text: "Take the basic empty weight and its arm (or moment) from your aircraft's current weight and balance report, not from the POH sample."
  - name: "Write down each station weight"
    text: "Weigh or conservatively estimate each occupant, the baggage and the fuel (in pounds: gallons × 6 for avgas)."
  - name: "Compute each station's moment"
    text: "Multiply weight × arm for every station. The arms come from the POH/AFM."
  - name: "Add up weights and moments"
    text: "Total weight is the sum of all weights; total moment is the sum of all moments."
  - name: "Compute the center of gravity"
    text: "CG = total moment ÷ total weight. The result is in the same unit as the arms (for example, inches aft of datum)."
  - name: "Check max weight and the envelope"
    text: "Make sure the total weight does not exceed the maximum and that the (CG, weight) point falls inside the POH CG envelope."
  - name: "Repeat for landing and zero fuel"
    text: "Subtract the fuel you will burn (and then all the fuel) and check that the CG stays within limits."
faq:
  - q: "Can I use the empty weight from the POH sample?"
    a: "No. The POH sample is illustrative. Every aircraft has its own empty weight and arm, recorded in its weight and balance report, which changes whenever equipment is installed or removed."
  - q: "How much does a gallon of avgas weigh?"
    a: "Weight and balance calculations usually use 6 lb per US gallon. Actual density varies with temperature; use the value given in your aircraft's POH."
  - q: "Is checking the takeoff CG enough?"
    a: "No. The CG moves as fuel burns. You also need to check the landing CG and, where the POH calls for it, the zero fuel condition."
---

A **weight and balance** calculation answers two questions before every flight: is the airplane below its maximum weight, and is its center of gravity (CG) within the approved limits? Both must be true. A light airplane with the CG outside the envelope is as unsafe as an overweight one.

This guide walks through the complete procedure, the same one the [CheckCG calculator](/en/) runs and the one you can do by hand on a loading form. If arm and moment are still fuzzy, start with [Weight, arm and moment](/en/guides/weight-arm-and-moment/).

## What you need first

- **Your aircraft's POH/AFM** (Pilot's Operating Handbook or approved Airplane Flight Manual). It gives the arm of every station, the maximum weights and the CG envelope.
- **The current weight and balance report** for _your_ airplane. It lists the empty weight and its arm or moment. It changes every time equipment is added or removed, so make sure you have the latest one.
- **The actual weights of the load**: occupants (with clothes and headsets), baggage and fuel.

## Step 1: empty weight and arm

Copy the **basic empty weight** and its **arm** (also called station) from the weight and balance report. Some reports give the moment instead of the arm; then the arm is moment ÷ weight. If the POH uses moments divided by 1000, keep that scale for the whole calculation.

Do not use the empty weight from the POH sample or from another airplane of the same model: two "identical" airplanes can differ by tens of pounds and in arm.

## Step 2: weight at each station

Write down the weight at every loading station in the POH: front seats, rear seats, each baggage compartment and each fuel tank.

- **People**: if you don't weigh them, estimate high. A 20 lb error in the back seat can move the CG more than you'd expect.
- **Fuel**: convert gallons to pounds. For avgas, **6 lb/gal** is the usual figure. If you have liters, convert to gallons first (1 US gal = 3.785 L).
- **Baggage**: respect each compartment's limit and, where there is one, the combined limit.

## Step 3: moment of each station

The **moment** is weight × arm. Compute it for every station, including the empty weight. The arms come from the POH weight and balance section and are measured from the _datum_, a reference plane chosen by the manufacturer.

## Step 4: add up weights and moments

- **Total weight** = empty weight + all stations.
- **Total moment** = empty moment + all station moments.

## Step 5: compute the center of gravity

**CG = total moment ÷ total weight.** The result is in the same unit as the arms: if arms are in inches aft of datum, so is the CG. If you worked with moment/1000, multiply by 1000 before dividing (or divide and multiply the result by 1000).

## Step 6: check max weight and the envelope

1. **Total weight ≤ maximum takeoff weight.** Some airplanes also have a maximum ramp weight (for start and taxi) and a different maximum landing weight.
2. **The (CG, weight) point inside the envelope.** Comparing the CG to a single number is not enough: on many airplanes the forward limit moves aft as weight increases. Plot the point on the POH chart or interpolate between the envelope corners. See [The CG envelope explained](/en/guides/cg-envelope-explained/).

## Step 7: landing and zero fuel

Fuel burns during the flight and the moment changes with it. For **landing**:

- Subtract the fuel you'll burn (burn rate × flight time; the reserve stays on board) from the total weight.
- Subtract that fuel × the tank arm from the total moment.
- Compute the new CG and check it is inside the envelope and below the maximum landing weight.

Repeat with **all usable fuel burned** (zero fuel condition). On many airplanes it is the most adverse case, and some POHs set a maximum zero fuel weight.

Depending on where the tank sits relative to the CG, burning fuel can move the CG forward or aft. That's why an airplane that takes off within limits can land outside them.

## If you're out of limits

Don't fly. Redistribute the load (move baggage to another compartment or a passenger to another seat), reduce baggage or fuel without giving up the required reserve and whatever your operation demands, and recalculate. If ballast is the answer, use only what the POH approves.

## Do it with the calculator

The [CheckCG calculator](/en/) does all seven steps instantly: enter the empty weight from your weight and balance report (as a custom aircraft), the station weights and the fuel to burn, and it shows weight, CG, the envelope and the takeoff, landing and zero fuel phases. It also prints a load sheet as a PDF. There are reference data pages for each model, such as the [Cessna 152](/en/cessna-152/) and the [Cessna 172S](/en/cessna-172s/).

> **Important:** this guide is study material. Your aircraft's POH/AFM and its weight and balance report are the authoritative references and take precedence over any data or example on this page. When in doubt, ask your flight instructor or a certified maintenance shop.
