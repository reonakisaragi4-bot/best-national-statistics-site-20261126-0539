# NusaStat — Indonesia in Numbers

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/reonakisaragi4-bot/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/reonakisaragi4-bot/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

An original national statistics site for **Indonesia**, built for the
[make.fun bounty "Make the best national statistics site"](https://make.fun/bounty/best-national-statistics-site-20261126-0539).

## What it is

One country, six sections, every figure in place. The home page gives the
headlines — 283.5 million people, US$ 1.40 trillion of GDP, 5.0% growth,
2.3% inflation, 4.9% unemployment — and each section goes one level deeper:

- **Population** — 2015–2024 growth chart, age structure, largest provinces
- **Economy** — GDP in US$ or rupiah (toggle), growth, inflation, GDP by sector
- **Employment** — unemployment trend, employment by sector, labour market table
- **Trade** — exports vs imports, trade balance, top partners and products
- **Regions** — 20 largest provinces with search, island filter and sorting, plus a detail page per province
- **Data explorer** — all 36 indicators in one searchable table, downloadable as CSV
- **About** — sources and method

Every chart is hand-drawn SVG from the data files shipped with the site.
There is no build step and no network request: serve `app/` with any static
server and open `app/index.html` on a desktop or a phone.

## Figures

Compiled from public World Bank WDI, Statistics Indonesia (BPS), ILO and
UN Comtrade figures, mostly for 2024. Trade partner shares and top export
products are rounded approximations; province populations are BPS 2024
mid-year estimates. See the About page in the site for full sources.

## Run it

```sh
node serve.ts        # serves app/ on http://localhost:8080
```

Or serve `app/` with any static HTTP server. `main.ts` hands the entry in:
it copies `app/` and `screenshots/` to `/output` and writes
`/output/dossier.json`.

## License

MIT — see [LICENSE](LICENSE).
