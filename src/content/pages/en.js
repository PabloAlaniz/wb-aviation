/** Glossary and "about" page content (en). Same shape in every language: see pages.test.js. */
export const en = {
  glossary: {
    navLabel: "Glossary",
    title: "Weight and balance glossary: datum, arm, moment, CG, MTOW | CheckCG",
    description:
      "Weight and balance glossary for pilots: datum, arm, moment, center of gravity, envelope, empty weight, useful load, MTOW, MLW, MZFW and %MAC in plain words.",
    h1: "Weight and balance glossary",
    intro:
      "The terms used in the flight manual, the weight and balance report and the calculator, each explained in a sentence or two. EASA and UK training material calls the same subject mass and balance.",
    guideLink: "Related guide:",
    terms: {
      datum: {
        term: "Datum (reference datum)",
        text: "An imaginary vertical plane, chosen by the manufacturer, from which every horizontal distance on the airplane is measured. It can sit at the firewall, at the nose or even ahead of it; the flight manual defines it.",
      },
      arm: {
        term: "Arm",
        text: "The horizontal distance from the datum to a weight (a seat, a tank, the baggage compartment). It is measured in inches or millimeters and is positive aft of the datum.",
      },
      moment: {
        term: "Moment",
        text: "Weight multiplied by its arm (lb-in or kg-mm). It measures how hard a load tries to rotate the airplane about the datum. Some manuals divide it by 1000 to keep the numbers small.",
      },
      cg: {
        term: "Center of gravity (CG)",
        text: "The point where the whole weight of the airplane can be considered to act. It is the total moment divided by the total weight, expressed as an arm from the datum.",
      },
      envelope: {
        term: "CG envelope",
        text: "The area of the weight against CG chart inside which the airplane was certified. It has a forward limit, an aft limit and a maximum weight; the loading point must fall inside at takeoff and at landing.",
      },
      station: {
        term: "Loading station",
        text: "Each place where weight can go and that has a defined arm: front and rear seats, baggage compartments, fuel tanks.",
      },
      "empty-weight": {
        term: "Basic empty weight (BEW)",
        text: "The weight of the airplane with its installed equipment, unusable fuel and full oil, with no occupants, baggage or usable fuel. It is specific to each airframe and is listed, with its arm or moment, in the latest weight and balance report.",
      },
      "useful-load": {
        term: "Useful load",
        text: "The difference between maximum weight and basic empty weight: what can be shared between occupants, baggage and usable fuel.",
      },
      mtow: {
        term: "Maximum takeoff weight (MTOW)",
        text: "The heaviest the airplane may be at the start of the takeoff roll. It is a structural and performance limit set at certification.",
      },
      "ramp-weight": {
        term: "Maximum ramp weight",
        text: "The heaviest the airplane may be on the ground, before taxi. It is slightly above MTOW because it allows for the fuel burned during start, taxi and run-up.",
      },
      mlw: {
        term: "Maximum landing weight (MLW)",
        text: "The heaviest the airplane may be at touchdown. On many light airplanes it equals MTOW; on larger ones it is lower, so fuel must be burned before landing.",
      },
      mzfw: {
        term: "Maximum zero fuel weight (MZFW)",
        text: "The maximum weight of the loaded airplane without usable fuel. Any weight above that value must be fuel; the limit protects the wing structure.",
      },
      "usable-fuel": {
        term: "Usable fuel",
        text: "The fuel the engine can actually burn in flight. Unusable fuel stays in the tanks and lines and is already part of the empty weight. Fuel is loaded by weight: about 6 lb per gallon of AVGAS and about 6.7 lb per gallon of Jet A.",
      },
      mac: {
        term: "Mean aerodynamic chord (%MAC)",
        text: "Another way to express the CG: as a percentage of the wing's mean aerodynamic chord instead of an arm from the datum. It is common on turboprops and jets.",
      },
      tcds: {
        term: "Type certificate data sheet (TCDS)",
        text: "The authority's document (FAA, EASA) that summarizes the approved limits of a model: maximum weights, CG limits, datum and station arms.",
      },
      poh: {
        term: "Flight manual (POH/AFM)",
        text: "The approved manual of the airplane. Its weight and balance section, together with the airframe's weight and balance report, is the official reference for any calculation.",
      },
    },
  },
  about: {
    navLabel: "Methodology and sources",
    title: "CheckCG methodology and data sources: how it calculates and verifies",
    description:
      "Where each aircraft's data comes from, how the weight and balance calculations are verified, what the tool's limits are and who maintains it.",
    h1: "Methodology and data sources",
    intro:
      "CheckCG is a free, open source weight and balance calculator. This page explains where the data comes from, how the calculations are checked and where the tool stops.",
    sections: {
      data: {
        title: "Where the data comes from",
        text: "Maximum weights, CG limits, arms and envelopes of each model are entered from the type certificate data sheet (TCDS) and the flight manual (POH/AFM). Every aircraft page lists its source documents, the date of the last verification and anything still pending confirmation.",
      },
      reliability: {
        title: "Reliability level of each aircraft",
        text: "Every model carries a stated level: verified against official documentation, partially verified, or estimated reference values. This is the catalog today:",
      },
      method: {
        title: "How it calculates and how that is verified",
        text: "The calculation is the one in the manual: weights and moments of every station are added, the CG is the total moment divided by the total weight, and the resulting point is checked against the envelope polygon at takeoff, at landing and with zero fuel. The code is covered by automated tests, including the worked example of the guides, which is recomputed on every change.",
      },
      limits: {
        title: "What it is not",
        text: "It is an aid, not an approved document. Empty weight and its arm change with every airframe and every modification: enter them from the current weight and balance report. The flight manual and that report are always the official reference, and the pilot in command is responsible for checking the result.",
      },
      privacy: {
        title: "Privacy",
        text: "There is no sign-up and there are no accounts. The weights you enter, your own aircraft and the links you share stay in the browser. Only a handful of anonymous usage events are counted (for example, a load sheet generated), with no IP address, tracking cookies or identifiers; the only cookie stores the chosen language.",
      },
      contact: {
        title: "Who maintains it",
        text: "CheckCG is developed by Pablo Alaniz and released under the MIT license. Data errors, aircraft requests and translation fixes are welcome as GitHub issues.",
      },
    },
    aircraftColumn: "Aircraft",
    reliabilityColumn: "Reliability",
    verifiedColumn: "Last verified",
    repoLink: "Source code on GitHub",
    issuesLink: "Report an error or request an aircraft",
  },
}
