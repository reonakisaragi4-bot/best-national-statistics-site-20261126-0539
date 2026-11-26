// NusaStat router: hash routes, page state, and control wiring. The site
// is a single page; every section is a route reached by a link, and the
// browser back button works because routes live in the hash.
//
//   #/                  home dashboard
//   #/population        population
//   #/economy           economy
//   #/employment        employment
//   #/trade             trade
//   #/regions           province explorer
//   #/regions/<slug>    one province
//   #/data              data explorer
//   #/about             about and sources
//
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import { INDICATORS } from './data.js';
import { about, dataExplorer, economy, employment, home, missing, population, regionDetail, regions, trade } from './views.js';

const app = document.getElementById('app');
const nav = document.getElementById('nav');

// State that survives between pages: chart range, GDP currency, and the
// two explorers' filters.
const state = {
  range: 'all',
  currency: 'usd',
  q: '',
  island: 'All islands',
  sort: 'pop',
  dq: '',
  dtopic: 'All topics',
};

const TITLES = {
  '': 'NusaStat — Indonesia in Numbers',
  population: 'Population | NusaStat',
  economy: 'Economy | NusaStat',
  employment: 'Employment | NusaStat',
  trade: 'Trade | NusaStat',
  regions: 'Regions | NusaStat',
  data: 'Data Explorer | NusaStat',
  about: 'About | NusaStat',
};

function route() {
  const hash = location.hash.replace(/^#\/?/, '');
  const [page, arg] = hash.split('/');
  return { page, arg: arg ? decodeURIComponent(arg) : '' };
}

function render() {
  window.__shotReady = false;
  const { page, arg } = route();
  let html;
  if (page === '') html = home(state);
  else if (page === 'population') html = population(state);
  else if (page === 'economy') html = economy(state);
  else if (page === 'employment') html = employment(state);
  else if (page === 'trade') html = trade(state);
  else if (page === 'regions' && arg) html = regionDetail(arg);
  else if (page === 'regions') html = regions(state);
  else if (page === 'data') html = dataExplorer(state);
  else if (page === 'about') html = about();
  else html = missing();
  document.title = TITLES[page] || 'NusaStat — Indonesia in Numbers';
  app.innerHTML = html;
  wire(page);
  nav.querySelectorAll('a').forEach((a) => {
    const target = a.getAttribute('href').replace(/^#\/?/, '').split('/')[0];
    a.classList.toggle('active', target === page || (page === '' && target === ''));
    a.setAttribute('aria-current', a.classList.contains('active') ? 'page' : 'false');
  });
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

// Bind the controls on the page that has just rendered. Range and currency
// buttons re-render with new state; the explorers re-render on input so
// the table, the count and the empty message always agree.
function wire(page) {
  app.querySelectorAll('[data-range]').forEach((b) => {
    b.addEventListener('click', () => {
      state.range = b.dataset.range;
      render();
    });
  });
  app.querySelectorAll('[data-currency]').forEach((b) => {
    b.addEventListener('click', () => {
      state.currency = b.dataset.currency;
      render();
    });
  });
  // The region filters exist only on the province list, not on a
  // province detail page, so bind them only when they are on screen.
  if (page === 'regions' && document.getElementById('q')) {
    const q = document.getElementById('q');
    const island = document.getElementById('island');
    const sort = document.getElementById('sort');
    q.addEventListener('input', () => {
      state.q = q.value;
      render();
      const next = document.getElementById('q');
      next.focus();
      next.setSelectionRange(next.value.length, next.value.length);
    });
    island.addEventListener('change', () => {
      state.island = island.value;
      render();
    });
    sort.addEventListener('change', () => {
      state.sort = sort.value;
      render();
    });
  }
  if (page === 'data') {
    const dq = document.getElementById('dq');
    dq.addEventListener('input', () => {
      state.dq = dq.value;
      render();
      const next = document.getElementById('dq');
      next.focus();
      next.setSelectionRange(next.value.length, next.value.length);
    });
    app.querySelectorAll('[data-topic]').forEach((b) => {
      b.addEventListener('click', () => {
        state.dtopic = b.dataset.topic;
        render();
      });
    });
    document.getElementById('csv').addEventListener('click', downloadCsv);
  }
}

// Download the full indicator table as a CSV file, built in the browser
// from the same data the table shows. No network involved.
function downloadCsv() {
  const head = 'Topic,Indicator,Latest value,Year,Source';
  const cell = (s) => `"${String(s).replace(/"/g, '""')}"`;
  const lines = INDICATORS.map((i) => [i.topic, i.name, i.value, i.year, i.source].map(cell).join(','));
  const blob = new Blob([[head, ...lines].join('\n')], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'nusastat-indonesia-indicators.csv';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

window.addEventListener('hashchange', render);
render();
