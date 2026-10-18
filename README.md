# ✈️ CheckCG: weight & balance calculator for pilots

**English** · [Español](README.es.md)

Free, open source, offline-capable weight & balance (W&B) calculator for light aircraft, built on official TCDS and POH/AFM data.

[![CI](https://github.com/PabloAlaniz/wb-aviation/actions/workflows/ci.yml/badge.svg)](https://github.com/PabloAlaniz/wb-aviation/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Live: checkcg.com](https://img.shields.io/badge/live-checkcg.com-2563eb)](https://checkcg.com/en/)
[![PWA: works offline](https://img.shields.io/badge/PWA-works%20offline-16a34a)](https://checkcg.com/en/)

### 🚀 [Try it at checkcg.com](https://checkcg.com/en/), no sign-up or install needed

![CheckCG demo: loading a Cessna 152, watching the CG envelope update and filling in the load sheet](./docs/demo.gif)

## Why

Every flight starts with a weight & balance check, and most pilots still do it on paper, in a spreadsheet someone at the club made years ago, or in an app locked to one fleet. A mistake in the CG puts you outside the envelope you were trained to stay in.

CheckCG does the math, draws your loading on the official CG envelope and warns you before you get close to a limit. It runs in the browser, keeps working with no signal at the airfield, and its data and code are open, so anyone can check where each number comes from.

## Features

- **Weight & CG for takeoff, landing and zero fuel**, checked against each aircraft's real (irregular) CG envelope.
- **Your own aircraft by registration**: use the empty weight and arm from your W&B report, not the POH example.
- **Printable load sheet / PDF**, plus a link and QR code to share a calculation.
- **School mode**: instructors share their whole fleet with students in one link.
- **Safety alerts** near max weight and CG limits, with a data-reliability badge per aircraft.
- **Offline PWA**, installable on phone or tablet.
- **lbs/kg and gal/L**, in **English, Spanish and Portuguese**.
- **Free guides** on [how to calculate weight & balance](https://checkcg.com/en/guides/) with worked examples.

## Supported aircraft

| Aircraft                 | TCDS          | Max weight (lbs) | Data reliability |
| ------------------------ | ------------- | ---------------- | ---------------- |
| King Air E90             | FAA 3A20      | 10,100           | verified         |
| Cessna 172S Skyhawk      | FAA 3A12      | 2,550            | estimated        |
| Cessna 152               | FAA 3A19      | 1,670            | estimated        |
| Piper PA-28-161 Warrior  | FAA 2A13      | 2,440            | partial          |
| Piper PA-38-112 Tomahawk | FAA A18SO     | 1,670            | partial          |
| Tecnam P2008 JC          | EASA.A.583    | 1,388            | estimated        |
| Tecnam P2002 JF          | EASA.A.006    | 1,278            | estimated        |
| Diamond DA20-C1          | EASA.IM.A.223 | 1,653            | estimated        |
| Diamond DA40 (IO-360)    | EASA.IM.A.022 | 2,535            | estimated        |

Coming next: King Air B200 and Beech 1900D.

**Missing your aircraft?** [Request it](https://github.com/PabloAlaniz/wb-aviation/issues/new?template=aircraft-request.yml), or add it yourself: the app is data-driven, so a new aircraft is one data entry plus a test, with no UI code. See [CONTRIBUTING.md](CONTRIBUTING.md).

> ⚠️ Empty weight and arm are POH example values. Always use the Weight & Balance Report of your own aircraft ("My aircraft"). Sources, assumptions and open points for each model are in the `metadata` field of [`src/data/aircraft.js`](src/data/aircraft.js).

## How it works

- **Data-driven**: each aircraft is a single object in [`src/data/aircraft.js`](src/data/aircraft.js) (stations, arms, limits, envelope, sources). The form, calculations, alerts and chart are generated from it.
- **Envelope check**: the CG point is tested against the envelope polygon with ray casting (point in polygon), so irregular envelopes work and points on the edge count as within limits.
- **Stack**: [Astro](https://astro.build) static pages (one per aircraft and language, for SEO) with a React 19 island, Tailwind CSS 4, Recharts, and vite-plugin-pwa for offline support. Tested with Vitest and Testing Library, and deployed on Cloudflare Pages.

## Run it locally

```bash
git clone https://github.com/PabloAlaniz/wb-aviation.git
cd wb-aviation
npm install
npm run dev          # http://localhost:4321
```

```bash
npm test             # unit and component tests
npm run lint         # ESLint
npm run typecheck    # TypeScript (checkJs) + astro check
npm run build        # production build in dist/
```

Optional analytics (cookieless) are only enabled through environment variables; see `.env.example` and [docs/analytics.md](docs/analytics.md).

## Contributing

Contributions are very welcome, especially:

- **New aircraft** with verifiable data ([guide](CONTRIBUTING.md#add-an-aircraft)). Look for [`good first issue`](https://github.com/PabloAlaniz/wb-aviation/labels/good%20first%20issue).
- **Data verification** of the existing aircraft against the POH/AFM.
- **Translations** into new languages.
- Ideas and questions in [Discussions](https://github.com/PabloAlaniz/wb-aviation/discussions).

See the [roadmap](ROADMAP.md) for what's next.

## ⚠️ Disclaimer

CheckCG is a **reference and training tool**. It does not replace your aircraft's official documentation. The POH/AFM and your aircraft's Weight & Balance Report are the authority: always verify the results, and follow your operating procedures and applicable regulations.

## License

[MIT](LICENSE) © Pablo Alaniz

---

If CheckCG helps you, a ⭐ helps other pilots find it.
