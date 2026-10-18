# Contributing to CheckCG

**English** · [Español](CONTRIBUTING.es.md)

Thanks for your interest! This guide covers running the project, keeping CI green and, above all, **adding aircraft safely**. Issues and PRs in English, Spanish or Portuguese are all welcome.

## Getting started

Requirements: Node.js 20+ and npm.

```bash
git clone https://github.com/PabloAlaniz/wb-aviation.git
cd wb-aviation
npm install
npm run dev           # http://localhost:4321
```

## Before opening a PR

CI runs `format:check`, `lint`, `typecheck`, `test` and `build`. To avoid surprises, run locally:

```bash
npm run format && npm run lint && npm run typecheck && npm test && npm run build
```

- Keep or raise test coverage. `src/utils/calculations.js` is safety-critical and must stay tested.
- Use descriptive commits in the `type: summary` style (`feat:`, `fix:`, `docs:`).

## Add an aircraft

The app is **data-driven**: adding an aircraft usually means **adding data, not components**. The form, calculations, alerts and CG chart are generated from one object in `src/data/aircraft.js`. The full field reference is in [docs/aircraft-data.md](docs/aircraft-data.md) (in Spanish; the code comments and the existing aircraft are good examples too).

1. Get the official **TCDS** ([FAA DRS](https://drs.faa.gov/), EASA) and, if possible, the **POH/AFM** weight & balance section.
2. Add the entry to `src/data/aircraft.js`, using an existing aircraft of the same class as a template. The aircraft selector updates by itself.
3. Use **lbs and inches**. If the source uses kg/mm, convert and say so in `metadata`.
4. Build `cgEnvelope.points` as a closed polygon (the last point repeats the first).
5. Be honest about `metadata.dataReliability` (`verified-complete` / `verified-partial` / `estimated`) and list anything unverified in `dataValidation.pendingVerification`. Users see it.
6. Add a test that runs a POH example loading through `calculateWeightBalance` (see `src/utils/calculations.test.js`).
7. Add the station labels to `src/i18n/{es,en,pt}.js` if the aircraft has new stations.
8. Check it in the UI (`npm run dev`): form, alerts and envelope.

> ⚠️ **Safety first.** Weight & balance data is safety-critical. If you can't verify a value against official documentation, mark it `estimated` and say so in `pendingVerification`. Never present estimated data as verified.

Not sure where to start? Look for issues labeled [`aircraft-request`](https://github.com/PabloAlaniz/wb-aviation/labels/aircraft-request) or [`good first issue`](https://github.com/PabloAlaniz/wb-aviation/labels/good%20first%20issue). Verifying an existing aircraft against its POH is just as valuable as adding a new one.

## Add a guide

Guides live in `src/content/guides/{es,en,pt}/*.md` (collection `guides`, `src/content.config.ts`). Localized slugs are in `src/content/guides/registry.js`, which also feeds the sitemap hreflang alternates.

1. Write one `.md` per language with the same `translationKey`.
2. Add the entry to the registry.
3. Run `npm test`, which checks frontmatter, internal links, length (700–1100 words) and the closing disclaimer.

## Add a language

Copy `src/i18n/es.js` to `src/i18n/<locale>.js`, translate the values and register it in `src/i18n/index.js`.

## Reporting problems

Open an [issue](https://github.com/PabloAlaniz/wb-aviation/issues/new/choose). For calculation bugs, include the aircraft, the values you entered and the result you expected; a share link reproduces your exact loading.
