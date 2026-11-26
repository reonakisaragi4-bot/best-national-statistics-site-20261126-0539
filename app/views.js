// Page HTML for NusaStat. Each function returns a full page of HTML for
// the #app element, built from data.js and drawn with charts.js. Every
// control on a page does something: range buttons re-draw charts, the
// currency toggle converts the GDP chart, the province tools filter and
// sort the table, and the data explorer searches, filters and downloads.

import {
  AGE_GROUPS,
  EMPLOYMENT_SECTORS,
  EXPORT_PARTNERS,
  EXPORT_PRODUCTS,
  GDP_SECTORS,
  HEADLINES,
  INDICATORS,
  ISLANDS,
  LABOUR,
  META,
  PROVINCES,
  RELEASES,
  SERIES,
} from './data.js';
import { barChart, donutChart, groupedBarChart, hbarChart, lineChart } from './charts.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
const fmt = (n, d = 1) => Number(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });

function rangeSeries(series, range) {
  return range === '5y' ? series.slice(-5) : series;
}

function rangeButtons(range) {
  return `<div class="seg" role="group" aria-label="Year range">
<button type="button" data-range="all" class="${range === 'all' ? 'on' : ''}">2015–2024</button>
<button type="button" data-range="5y" class="${range === '5y' ? 'on' : ''}">Last 5 years</button>
</div>`;
}

function kpiCard(h) {
  const value = h.format === 'int' ? fmt(h.value, 0) : fmt(h.value, 1);
  return `<a class="kpi" href="#/${h.id === 'population' ? 'population' : h.id === 'gdp' || h.id === 'gdpCapita' || h.id === 'growth' || h.id === 'inflation' ? 'economy' : h.id === 'unemployment' ? 'employment' : h.id === 'exports' ? 'trade' : 'population'}">
<span class="kpi-label">${esc(h.label)}</span>
<span class="kpi-value">${value} <small>${esc(h.unit)}</small></span>
<span class="kpi-meta">${esc(h.change)} · ${h.year}</span>
<span class="kpi-note">${esc(h.note)}</span>
</a>`;
}

function chartCard(title, sub, body) {
  return `<section class="card chart-card"><h2>${esc(title)}</h2><p class="card-sub">${esc(sub)}</p>${body}</section>`;
}

function pageHead(title, intro) {
  return `<p class="crumb"><a href="#/">Home</a> &rsaquo; ${esc(title)}</p>
<h1>${esc(title)}</h1>
<p class="lede">${esc(intro)}</p>`;
}

export function home(state) {
  const pop = rangeSeries(SERIES.population, state.range);
  const gdp = rangeSeries(SERIES.gdpNominal, state.range);
  const kpis = HEADLINES.map(kpiCard).join('');
  const releases = RELEASES.map(
    (r) => `<li><span class="rel-date">${esc(r.date)}</span><span class="rel-topic">${esc(r.topic)}</span><a href="#/data">${esc(r.title)}</a></li>`,
  ).join('');
  const quick = [
    ['#/population', 'Population', '283.5 million people across 38 provinces'],
    ['#/economy', 'Economy', 'US$ 1.40 trillion GDP, growing 5.0% a year'],
    ['#/employment', 'Employment', '147 million workers, 4.9% unemployed'],
    ['#/trade', 'Trade', 'US$ 264.8 billion of goods exported in 2024'],
    ['#/regions', 'Regions', 'Compare all 20 largest provinces'],
    ['#/data', 'Data explorer', '36 indicators, searchable and downloadable'],
  ]
    .map(([href, t, d]) => `<a class="quick" href="${href}"><strong>${t}</strong><span>${d}</span></a>`)
    .join('');
  return `<section class="hero">
<h1>Indonesia in numbers</h1>
<p class="lede">The population, economy, jobs and trade of the world's fourth most populous country — 283.5 million people, US$ 1.40 trillion of GDP — in one place, from World Bank, BPS and ILO figures.</p>
<p class="hero-meta">Latest data year: 2024 · Updated ${esc(META.updated)} · <a href="#/about">Sources and method</a></p>
</section>
<div class="kpis">${kpis}</div>
<div class="grid-2">
${chartCard('Population, 2015–2024', 'Millions of people, World Bank WDI', lineChart(pop, { title: 'Population 2015 to 2024', unit: 'million' }))}
${chartCard('GDP, 2015–2024', 'Nominal GDP in US$ billion, World Bank WDI', barChart(gdp.map(([y, v]) => [String(y), v]), { title: 'Nominal GDP 2015 to 2024', unit: 'US$ bn' }))}
</div>
<section class="card">
<h2>Latest releases</h2>
<ul class="releases">${releases}</ul>
</section>
<section>
<h2>Explore the statistics</h2>
<div class="quick-grid">${quick}</div>
</section>`;
}

export function population(state) {
  const pop = rangeSeries(SERIES.population, state.range);
  const top = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 10);
  const rows = top
    .map(
      (p, i) => `<tr><td>${i + 1}</td><td><a href="#/regions/${p.slug}">${esc(p.name)}</a></td><td class="num">${fmt(p.pop)}</td><td class="num">${fmt((p.pop / 283.5) * 100)}</td><td class="num">${fmt((p.pop * 1e6) / p.area, 0)}</td></tr>`,
    )
    .join('');
  return `${pageHead('Population', '283.5 million people in 2024, growing 0.8% a year. Java holds more than half of everyone in the country on less than 7% of its land.')}
<div class="toolbar">${rangeButtons(state.range)}</div>
<div class="grid-2">
${chartCard('Population growth', 'Total population, millions, 2015–2024', lineChart(pop, { title: 'Population 2015 to 2024', unit: 'million' }))}
${chartCard('Age structure, 2024', 'Share of the population by age group', hbarChart(AGE_GROUPS.map((g) => [g.label, g.value]), { title: 'Age structure 2024', unit: '%' }))}
</div>
<section class="card">
<h2>Key facts</h2>
<dl class="facts">
<dt>Urban population</dt><dd>58.8% live in towns and cities</dd>
<dt>Population density</dt><dd>149 people per km² nationwide — 16,100 per km² in Jakarta</dd>
<dt>Median age</dt><dd>30.5 years</dd>
<dt>Life expectancy</dt><dd>71.3 years (73.4 for women, 69.2 for men)</dd>
<dt>Fertility rate</dt><dd>2.1 births per woman (2023)</dd>
<dt>Projected population</dt><dd>324 million by 2045 (BPS projection)</dd>
</dl>
</section>
<section class="card">
<h2>Largest provinces</h2>
<p class="card-sub">Population in millions, share of the national total, and density. <a href="#/regions">See all provinces &rarr;</a></p>
<table class="tbl"><thead><tr><th>#</th><th>Province</th><th class="num">Population (m)</th><th class="num">Share (%)</th><th class="num">Density (/km²)</th></tr></thead><tbody>${rows}</tbody></table>
</section>`;
}

export function economy(state) {
  const idr = state.currency === 'idr';
  const rate = 15855;
  const gdp = rangeSeries(SERIES.gdpNominal, state.range).map(([y, v]) => [
    String(y),
    idr ? Math.round((v * rate) / 1000) : v,
  ]);
  const growth = rangeSeries(SERIES.gdpGrowth, state.range).map(([y, v]) => [String(y), v]);
  const infl = rangeSeries(SERIES.inflation, state.range);
  const toggle = `<div class="seg" role="group" aria-label="Currency">
<button type="button" data-currency="usd" class="${!idr ? 'on' : ''}">US$</button>
<button type="button" data-currency="idr" class="${idr ? 'on' : ''}">Rupiah</button>
</div>`;
  return `${pageHead('Economy', 'A US$ 1.40 trillion economy in 2024 — the 16th largest in the world — growing 5.0% a year, with inflation at 2.3%.')}
<div class="toolbar">${rangeButtons(state.range)}${toggle}</div>
<div class="grid-2">
${chartCard(idr ? 'GDP in rupiah, 2015–2024' : 'GDP in US dollars, 2015–2024', idr ? 'Nominal GDP, Rp trillion (US$ × 15,855 IDR/US$)' : 'Nominal GDP, US$ billion, World Bank WDI', barChart(gdp, { title: 'Nominal GDP 2015 to 2024', unit: idr ? 'Rp tn' : 'US$ bn' }))}
${chartCard('Real GDP growth', 'Annual change in constant prices, %', barChart(growth, { title: 'Real GDP growth 2015 to 2024', unit: '%' }))}
${chartCard('Inflation', 'Consumer prices, annual change, %', lineChart(infl, { title: 'Inflation 2015 to 2024', unit: '%' }))}
${chartCard('What the economy makes', 'Share of gross value added by sector, 2024', donutChart(GDP_SECTORS, { title: 'GDP by sector 2024', unit: '%', centre: '100%', centreSub: 'of value added' }))}
</div>
<section class="card">
<h2>Economy in brief</h2>
<dl class="facts">
<dt>GDP, PPP</dt><dd>US$ 4.10 trillion — 7th largest in the world</dd>
<dt>GDP per capita, PPP</dt><dd>US$ 14,500</dd>
<dt>Government debt</dt><dd>39.8% of GDP</dd>
<dt>Foreign investment</dt><dd>US$ 24.2 billion net inflows in 2024</dd>
<dt>Reserves</dt><dd>US$ 155.7 billion at the end of 2024</dd>
<dt>Exchange rate</dt><dd>15,855 rupiah per US$ on average in 2024</dd>
</dl>
<p class="fine">The rupiah view converts the US$ series at the 2024 average rate of 15,855 IDR per US$; it is an illustration, not a re-based series.</p>
</section>`;
}

export function employment(state) {
  const un = rangeSeries(SERIES.unemployment, state.range);
  const rows = LABOUR.map((l) => `<tr><td>${esc(l.label)}</td><td class="num"><strong>${esc(l.value)}</strong></td><td>${esc(l.source)}</td></tr>`).join('');
  return `${pageHead('Employment', '147.1 million people in the labour force. Open unemployment fell to 4.9% in 2024, its lowest in a decade — but 13.1% of young workers are still without a job.')}
<div class="toolbar">${rangeButtons(state.range)}</div>
<div class="grid-2">
${chartCard('Open unemployment', 'BPS Sakernas, % of the labour force, 2015–2024', lineChart(un, { title: 'Unemployment 2015 to 2024', unit: '%' }))}
${chartCard('Where people work', 'Share of all workers by sector, 2024', hbarChart(EMPLOYMENT_SECTORS.map((s) => [s.label, s.value]), { title: 'Employment by sector 2024', unit: '%' }))}
</div>
<section class="card">
<h2>Labour market in brief</h2>
<table class="tbl"><thead><tr><th>Indicator</th><th class="num">Value</th><th>Source</th></tr></thead><tbody>${rows}</tbody></table>
<p class="fine">The 2020 spike in unemployment to 7.1% was the COVID-19 shock; the rate has fallen every year since. Informal work — jobs without a formal contract or social protection — still covers about three in five workers.</p>
</section>`;
}

export function trade(state) {
  const years = rangeSeries(SERIES.exportsGoods, state.range).map(([y]) => String(y));
  const ex = rangeSeries(SERIES.exportsGoods, state.range);
  const im = rangeSeries(SERIES.importsGoods, state.range);
  const balance = ex.map(([y, v], i) => [String(y), Math.round((v - im[i][1]) * 10) / 10]);
  const partners = EXPORT_PARTNERS.map((p) => `<tr><td>${esc(p.label)}</td><td class="num">${fmt(p.value)}</td></tr>`).join('');
  const products = EXPORT_PRODUCTS.map((p) => `<tr><td>${esc(p.label)}</td><td class="num">US$ ${fmt(p.value)} bn</td></tr>`).join('');
  return `${pageHead('Trade', 'Indonesia exported US$ 264.8 billion of goods in 2024 and imported US$ 233.7 billion — a surplus of US$ 31.1 billion, the fifth surplus year in a row.')}
<div class="toolbar">${rangeButtons(state.range)}</div>
<div class="grid-2">
${chartCard('Exports and imports', 'Goods trade, US$ billion, 2015–2024', groupedBarChart(years, ex, im, { title: 'Exports and imports 2015 to 2024', unit: 'US$ bn', labelA: 'Exports', labelB: 'Imports' }))}
${chartCard('Trade balance', 'Exports minus imports, US$ billion — a surplus every year since 2020', barChart(balance, { title: 'Trade balance 2015 to 2024', unit: 'US$ bn' }))}
</div>
<div class="grid-2">
<section class="card">
<h2>Where exports go</h2>
<p class="card-sub">Share of goods exports, 2024 (approximate)</p>
<table class="tbl"><thead><tr><th>Destination</th><th class="num">Share (%)</th></tr></thead><tbody>${partners}</tbody></table>
</section>
<section class="card">
<h2>What Indonesia sells</h2>
<p class="card-sub">Top export products, 2024 (approximate values)</p>
<table class="tbl"><thead><tr><th>Product</th><th class="num">Value</th></tr></thead><tbody>${products}</tbody></table>
</section>
</div>
<p class="fine">China takes about a quarter of all goods exports, driven by coal, nickel and palm oil. Exports of goods and services equal 22.2% of GDP; the current account ran a deficit of US$ 8.5 billion in 2024.</p>`;
}

function provinceRows(list) {
  return list
    .map(
      (p) => {
        const density = (p.pop * 1e6) / p.area;
        const share = (p.pop / 283.5) * 100;
        return `<tr><td><a href="#/regions/${p.slug}">${esc(p.name)}</a></td><td>${esc(p.island)}</td><td class="num">${fmt(p.pop)}</td><td class="num">${fmt(share)}</td><td class="num">${fmt(p.area, 0)}</td><td class="num">${fmt(density, 0)}</td></tr>`;
      },
    )
    .join('');
}

export function regions(state) {
  const q = state.q.toLowerCase();
  let list = PROVINCES.filter((p) => p.name.toLowerCase().includes(q));
  if (state.island !== 'All islands') list = list.filter((p) => p.island === state.island);
  const sorted = [...list];
  if (state.sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
  else if (state.sort === 'density') sorted.sort((a, b) => b.pop / b.area - a.pop / a.area);
  else if (state.sort === 'area') sorted.sort((a, b) => b.area - a.area);
  else sorted.sort((a, b) => b.pop - a.pop);
  const totalPop = list.reduce((s, p) => s + p.pop, 0);
  const options = ISLANDS.map((i) => `<option value="${esc(i)}" ${state.island === i ? 'selected' : ''}>${esc(i)}</option>`).join('');
  const rows = provinceRows(sorted);
  return `${pageHead('Regions', 'The twenty largest provinces, from West Java’s 49.9 million people to Central Sulawesi’s 3.1 million. Search, filter by island, or sort the table — then open a province for its detail.')}
<div class="toolbar filters">
<label class="field">Search <input id="q" type="search" placeholder="Type a province name…" value="${esc(state.q)}" aria-label="Search provinces"></label>
<label class="field">Island
<select id="island" aria-label="Filter by island">${options}</select></label>
<label class="field">Sort by
<select id="sort" aria-label="Sort provinces">
<option value="pop" ${state.sort === 'pop' ? 'selected' : ''}>Population, largest first</option>
<option value="name" ${state.sort === 'name' ? 'selected' : ''}>Name A–Z</option>
<option value="density" ${state.sort === 'density' ? 'selected' : ''}>Density, highest first</option>
<option value="area" ${state.sort === 'area' ? 'selected' : ''}>Area, largest first</option>
</select></label>
</div>
<p class="result-count" id="count">${sorted.length} province${sorted.length === 1 ? '' : 's'} · ${fmt(totalPop)} million people in the selection</p>
<section class="card">
<table class="tbl"><thead><tr><th>Province</th><th>Island</th><th class="num">Population (m)</th><th class="num">Share (%)</th><th class="num">Area (km²)</th><th class="num">Density (/km²)</th></tr></thead><tbody id="rows">${rows}</tbody></table>
${sorted.length === 0 ? '<p class="empty">No province matches that search. Try clearing the search box or choosing “All islands”.</p>' : ''}
<p class="fine">Populations are BPS 2024 mid-year estimates, rounded to 0.1 million. Density is computed from population and land area. The 20 provinces listed hold 249.2 million people — 87.9% of the country; the remaining 18 smaller provinces hold the rest.</p>
</section>`;
}

export function regionDetail(slug) {
  const p = PROVINCES.find((x) => x.slug === slug);
  if (!p) return missing();
  const density = (p.pop * 1e6) / p.area;
  const share = (p.pop / 283.5) * 100;
  const rank = [...PROVINCES].sort((a, b) => b.pop - a.pop).findIndex((x) => x.slug === slug) + 1;
  const bar = Math.max(2, Math.min(100, share * 2));
  return `<p class="crumb"><a href="#/">Home</a> &rsaquo; <a href="#/regions">Regions</a> &rsaquo; ${esc(p.name)}</p>
<h1>${esc(p.name)}</h1>
<p class="lede">The ${rank === 1 ? 'largest' : `${rank}th largest`} province in Indonesia, in the ${esc(p.island)} island group.</p>
<div class="kpis">
<div class="kpi"><span class="kpi-label">Population (2024)</span><span class="kpi-value">${fmt(p.pop)} <small>million</small></span><span class="kpi-meta">${fmt(share)}% of Indonesia</span></div>
<div class="kpi"><span class="kpi-label">Land area</span><span class="kpi-value">${fmt(p.area, 0)} <small>km²</small></span><span class="kpi-meta">${fmt((p.area / META.areaKm2) * 100)}% of the country</span></div>
<div class="kpi"><span class="kpi-label">Density</span><span class="kpi-value">${fmt(density, 0)} <small>people / km²</small></span><span class="kpi-meta">National average: 149</span></div>
<div class="kpi"><span class="kpi-label">Rank by population</span><span class="kpi-value">#${rank} <small>of 38</small></span><span class="kpi-meta">Out of all provinces</span></div>
</div>
<section class="card">
<h2>Share of the national population</h2>
<div class="sharebar" role="img" aria-label="${esc(p.name)} holds ${fmt(share)} percent of Indonesia's population"><div class="sharebar-fill" style="width:${bar.toFixed(1)}%"></div><span>${fmt(share)}%</span></div>
<p class="fine">One bar, one province: ${esc(p.name)}'s ${fmt(p.pop)} million people against a national total of 283.5 million. <a href="#/regions">Compare all provinces &rarr;</a></p>
</section>`;
}

export function dataExplorer(state) {
  const q = state.dq.toLowerCase();
  const topics = ['All topics', ...new Set(INDICATORS.map((i) => i.topic))];
  const buttons = topics
    .map((t) => `<button type="button" data-topic="${esc(t)}" class="${state.dtopic === t ? 'on' : ''}">${esc(t)}</button>`)
    .join('');
  const list = INDICATORS.filter(
    (i) =>
      (state.dtopic === 'All topics' || i.topic === state.dtopic) &&
      (q === '' || `${i.name} ${i.value} ${i.source}`.toLowerCase().includes(q)),
  );
  const rows = list
    .map((i) => `<tr><td>${esc(i.topic)}</td><td>${esc(i.name)}</td><td class="num"><strong>${esc(i.value)}</strong></td><td class="num">${i.year}</td><td>${esc(i.source)}</td></tr>`)
    .join('');
  return `${pageHead('Data explorer', 'Every indicator on this site in one searchable table — 36 indicators across population, economy, employment, trade and society. Download the table as a CSV file for your own work.')}
<div class="toolbar filters">
<label class="field">Search <input id="dq" type="search" placeholder="Try “GDP”, “poverty”, “exports”…" value="${esc(state.dq)}" aria-label="Search indicators"></label>
<button type="button" id="csv" class="btn">Download CSV</button>
</div>
<div class="seg topic-row" role="group" aria-label="Filter by topic">${buttons}</div>
<p class="result-count">${list.length} of ${INDICATORS.length} indicators</p>
<section class="card">
<table class="tbl"><thead><tr><th>Topic</th><th>Indicator</th><th class="num">Latest value</th><th class="num">Year</th><th>Source</th></tr></thead><tbody>${rows}</tbody></table>
${list.length === 0 ? '<p class="empty">No indicator matches that search. Try a shorter word, or choose “All topics”.</p>' : ''}
</section>`;
}

export function about() {
  const sources = META.sources.map((s) => `<li>${esc(s)}</li>`).join('');
  return `${pageHead('About NusaStat', 'NusaStat is an independent, original statistics site about Indonesia. It is not the official BPS site and it is not affiliated with Statistics Indonesia, the World Bank or the ILO — it compiles their published figures into one readable place.')}
<section class="card">
<h2>What this site is</h2>
<p>One country, six sections, every figure in place. The home page gives the headlines; Population, Economy, Employment and Trade each go one level deeper with charts and tables; Regions lets you compare provinces; the Data explorer puts all 36 indicators in a single searchable table you can download.</p>
<p>Every chart on the site is drawn from the data files shipped with the site. Nothing is fetched from another server, so the pages work offline once loaded.</p>
</section>
<section class="card">
<h2>Sources</h2>
<ul class="sources">${sources}</ul>
<p class="fine">Headline figures are the latest published annual values, mostly 2024. Trade partner shares and top export products are rounded approximations from BPS and UN Comtrade totals. Province populations are BPS 2024 mid-year estimates rounded to 0.1 million; densities are computed from those populations and land areas.</p>
</section>
<section class="card">
<h2>Country facts</h2>
<dl class="facts">
<dt>Capital</dt><dd>Jakarta (the new capital, Nusantara, is under construction in East Kalimantan)</dd>
<dt>Land area</dt><dd>1,904,569 km² — the world's largest archipelago, over 17,000 islands</dd>
<dt>Currency</dt><dd>Indonesian rupiah (IDR)</dd>
<dt>Official language</dt><dd>Indonesian</dd>
<dt>Government</dt><dd>Presidential republic; 38 provinces</dd>
</dl>
</section>`;
}

export function missing() {
  return `<h1>Page not found</h1>
<p class="lede">There is no statistics page at this address.</p>
<p><a href="#/">Back to the home page &rarr;</a></p>`;
}
