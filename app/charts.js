// Hand-rolled SVG charts for NusaStat. No library: every chart is drawn
// from the data in data.js, so the site needs no network and no vendored
// chart code. All charts are labelled, scale to their container, and use
// the site's own palette.

const INK = '#17324f';
const GRID = '#dbe4ec';
const MUTED = '#5d7086';
const RED = '#c8102e';
const TEAL = '#0e7c7b';
const BLUE = '#2f6fb2';
const AMBER = '#d98e04';
const GREEN = '#2e7d32';
const PALETTE = [TEAL, BLUE, RED, AMBER, GREEN, '#7a4fa3', '#b3541e', '#4a7a96'];

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);

function niceTicks(min, max, count = 4) {
  const span = max - min || 1;
  const step = span / count;
  const mag = 10 ** Math.floor(Math.log10(step));
  const norm = step / mag;
  const nice = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  const s = nice * mag;
  const start = Math.floor(min / s) * s;
  const ticks = [];
  for (let v = start; v <= max + s * 0.5; v += s) ticks.push(v);
  return ticks;
}

function fmtTick(v) {
  if (Math.abs(v) >= 1000) return String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return Number.isInteger(v) ? String(v) : v.toFixed(1);
}

// Line chart over [year, value] pairs. `opts` may carry a title, a unit
// for the tooltip text and a `zero` flag to force the axis through zero.
export function lineChart(series, opts = {}) {
  const w = 720;
  const h = 300;
  const padL = 58;
  const padR = 16;
  const padT = 14;
  const padB = 34;
  const values = series.map((p) => p[1]);
  let min = Math.min(...values);
  let max = Math.max(...values);
  if (opts.zero) min = Math.min(0, min);
  const pad = (max - min) * 0.08 || 1;
  min -= pad;
  max += pad;
  const ticks = niceTicks(min, max);
  min = Math.min(min, ticks[0]);
  max = Math.max(max, ticks[ticks.length - 1]);
  const x = (i) => padL + (i * (w - padL - padR)) / (series.length - 1);
  const y = (v) => padT + ((max - v) * (h - padT - padB)) / (max - min);
  const points = series.map((p, i) => `${x(i).toFixed(1)},${y(p[1]).toFixed(1)}`).join(' ');
  const area = `${padL},${y(min)} ${points} ${x(series.length - 1)},${y(min)}`;
  const grid = ticks
    .map(
      (t) => `<line x1="${padL}" y1="${y(t)}" x2="${w - padR}" y2="${y(t)}" stroke="${GRID}" stroke-width="1"/>
<text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${fmtTick(t)}</text>`,
    )
    .join('');
  const xlabels = series
    .map(
      (p, i) =>
        `<text x="${x(i)}" y="${h - 10}" text-anchor="middle" font-size="11" fill="${MUTED}">${p[0]}</text>`,
    )
    .join('');
  const dots = series
    .map(
      (p, i) =>
        `<circle cx="${x(i)}" cy="${y(p[1])}" r="4" fill="#fff" stroke="${TEAL}" stroke-width="2"><title>${p[0]}: ${p[1]}${opts.unit ? ` ${opts.unit}` : ''}</title></circle>`,
    )
    .join('');
  const last = series[series.length - 1];
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.title || 'Line chart')}" class="chart">
${grid}
<polygon points="${area}" fill="${TEAL}" opacity="0.08"/>
<polyline points="${points}" fill="none" stroke="${TEAL}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
${dots}
<text x="${x(series.length - 1) + 2}" y="${y(last[1]) - 10}" text-anchor="end" font-size="13" font-weight="700" fill="${INK}">${last[1]}${opts.unit ? ` ${opts.unit}` : ''} (${last[0]})</text>
${xlabels}
</svg>`;
}

// Vertical bar chart over [label, value] pairs. Negative values draw
// below the zero line.
export function barChart(pairs, opts = {}) {
  const w = 720;
  const h = 300;
  const padL = 58;
  const padR = 16;
  const padT = 26;
  const padB = 34;
  const values = pairs.map((p) => p[1]);
  let min = Math.min(0, ...values);
  let max = Math.max(...values);
  const pad = (max - min) * 0.08 || 1;
  // A bar chart with no negative values starts exactly at zero; only a
  // chart that goes below zero gets padding under the axis.
  if (min < 0) min -= pad * 0.4;
  max += pad;
  const ticks = niceTicks(min, max);
  min = Math.min(min, ticks[0]);
  max = Math.max(max, ticks[ticks.length - 1]);
  const slot = (w - padL - padR) / pairs.length;
  const bw = Math.min(46, slot * 0.62);
  const y = (v) => padT + ((max - v) * (h - padT - padB)) / (max - min);
  const grid = ticks
    .map(
      (t) => `<line x1="${padL}" y1="${y(t)}" x2="${w - padR}" y2="${y(t)}" stroke="${GRID}" stroke-width="1"/>
<text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${fmtTick(t)}</text>`,
    )
    .join('');
  const bars = pairs
    .map((p, i) => {
      const cx = padL + slot * i + slot / 2;
      const top = y(Math.max(0, p[1]));
      const bottom = y(Math.min(0, p[1]));
      const color = p[1] < 0 ? RED : opts.color || TEAL;
      return `<rect x="${(cx - bw / 2).toFixed(1)}" y="${top.toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(1, bottom - top).toFixed(1)}" rx="3" fill="${color}"><title>${esc(p[0])}: ${p[1]}${opts.unit ? ` ${opts.unit}` : ''}</title></rect>
<text x="${cx}" y="${(top - 6).toFixed(1)}" text-anchor="middle" font-size="11" fill="${INK}">${p[1]}</text>`;
    })
    .join('');
  const labels = pairs
    .map((p, i) => {
      const cx = padL + slot * i + slot / 2;
      return `<text x="${cx}" y="${h - 10}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(p[0])}</text>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.title || 'Bar chart')}" class="chart">
${grid}
<line x1="${padL}" y1="${y(0)}" x2="${w - padR}" y2="${y(0)}" stroke="${INK}" stroke-width="1"/>
${bars}
${labels}
</svg>`;
}

// Grouped vertical bars: two series over the same labels, e.g. exports
// against imports for each year.
export function groupedBarChart(labels, seriesA, seriesB, opts = {}) {
  const w = 720;
  const h = 300;
  const padL = 58;
  const padR = 16;
  const padT = 26;
  const padB = 34;
  const all = [...seriesA.map((p) => p[1]), ...seriesB.map((p) => p[1])];
  let min = 0;
  let max = Math.max(...all);
  const pad = max * 0.08 || 1;
  max += pad;
  const ticks = niceTicks(min, max);
  max = Math.max(max, ticks[ticks.length - 1]);
  const slot = (w - padL - padR) / labels.length;
  const bw = Math.min(22, slot * 0.3);
  const y = (v) => padT + ((max - v) * (h - padT - padB)) / (max - min);
  const grid = ticks
    .map(
      (t) => `<line x1="${padL}" y1="${y(t)}" x2="${w - padR}" y2="${y(t)}" stroke="${GRID}" stroke-width="1"/>
<text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${fmtTick(t)}</text>`,
    )
    .join('');
  const bars = labels
    .map((label, i) => {
      const cx = padL + slot * i + slot / 2;
      const a = seriesA[i][1];
      const b = seriesB[i][1];
      return `<rect x="${(cx - bw - 2).toFixed(1)}" y="${y(a).toFixed(1)}" width="${bw}" height="${(y(0) - y(a)).toFixed(1)}" rx="2" fill="${TEAL}"><title>${esc(label)} ${esc(opts.labelA || 'A')}: ${a}${opts.unit ? ` ${opts.unit}` : ''}</title></rect>
<rect x="${(cx + 2).toFixed(1)}" y="${y(b).toFixed(1)}" width="${bw}" height="${(y(0) - y(b)).toFixed(1)}" rx="2" fill="${AMBER}"><title>${esc(label)} ${esc(opts.labelB || 'B')}: ${b}${opts.unit ? ` ${opts.unit}` : ''}</title></rect>`;
    })
    .join('');
  const xlabels = labels
    .map((label, i) => {
      const cx = padL + slot * i + slot / 2;
      return `<text x="${cx}" y="${h - 10}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(label)}</text>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.title || 'Grouped bar chart')}" class="chart">
${grid}
${bars}
${xlabels}
</svg>
<p class="chart-legend"><span class="swatch" style="background:${TEAL}"></span>${esc(opts.labelA || 'A')} &nbsp; <span class="swatch" style="background:${AMBER}"></span>${esc(opts.labelB || 'B')}</p>`;
}

// Horizontal bars, best for ranked lists and shares.
export function hbarChart(pairs, opts = {}) {
  const rowH = opts.rowH || 30;
  const w = 720;
  const h = rowH * pairs.length + 16;
  const padL = opts.labelWidth || 190;
  const padR = 56;
  const max = Math.max(...pairs.map((p) => p[1])) * 1.08;
  const rows = pairs
    .map((p, i) => {
      const y = 8 + i * rowH;
      const bw = ((w - padL - padR) * p[1]) / max;
      const color = PALETTE[i % PALETTE.length];
      return `<text x="${padL - 10}" y="${y + 15}" text-anchor="end" font-size="12" fill="${INK}">${esc(p[0])}</text>
<rect x="${padL}" y="${y}" width="${Math.max(2, bw).toFixed(1)}" height="18" rx="3" fill="${color}"><title>${esc(p[0])}: ${p[1]}${opts.unit ? ` ${opts.unit}` : ''}</title></rect>
<text x="${padL + Math.max(2, bw) + 8}" y="${y + 15}" font-size="12" font-weight="600" fill="${INK}">${p[1]}${opts.unit ? ` ${opts.unit}` : ''}</text>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.title || 'Horizontal bar chart')}" class="chart chart-hbar">
${rows}
</svg>`;
}

// Donut chart with a centre label and a legend underneath.
export function donutChart(pairs, opts = {}) {
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const r = 92;
  const inner = 58;
  const total = pairs.reduce((s, p) => s + p[1], 0);
  let angle = -Math.PI / 2;
  const slices = pairs
    .map((p, i) => {
      const frac = p[1] / total;
      const a0 = angle;
      angle += frac * Math.PI * 2;
      const a1 = angle;
      const large = frac > 0.5 ? 1 : 0;
      const x0 = cx + r * Math.cos(a0);
      const y0 = cy + r * Math.sin(a0);
      const x1 = cx + r * Math.cos(a1);
      const y1 = cy + r * Math.sin(a1);
      const ix1 = cx + inner * Math.cos(a1);
      const iy1 = cy + inner * Math.sin(a1);
      const ix0 = cx + inner * Math.cos(a0);
      const iy0 = cy + inner * Math.sin(a0);
      const color = PALETTE[i % PALETTE.length];
      return `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${ix1.toFixed(1)} ${iy1.toFixed(1)} A ${inner} ${inner} 0 ${large} 0 ${ix0.toFixed(1)} ${iy0.toFixed(1)} Z" fill="${color}"><title>${esc(p[0])}: ${p[1]}${opts.unit ? ` ${opts.unit}` : ''}</title></path>`;
    })
    .join('');
  const legend = pairs
    .map(
      (p, i) =>
        `<li><span class="swatch" style="background:${PALETTE[i % PALETTE.length]}"></span>${esc(p[0])} <strong>${p[1]}${opts.unit ? ` ${opts.unit}` : ''}</strong></li>`,
    )
    .join('');
  return `<div class="donut-wrap">
<svg viewBox="0 0 ${size} ${size}" role="img" aria-label="${esc(opts.title || 'Donut chart')}" class="chart donut">
${slices}
<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="26" font-weight="800" fill="${INK}">${esc(opts.centre || '')}</text>
<text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="12" fill="${MUTED}">${esc(opts.centreSub || '')}</text>
</svg>
<ul class="legend">${legend}</ul>
</div>`;
}
