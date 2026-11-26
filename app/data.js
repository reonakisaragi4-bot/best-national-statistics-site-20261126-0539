// NusaStat data: Indonesia, compiled from public World Bank WDI, BPS
// (Statistics Indonesia), ILO and UN Comtrade figures. All values are
// rounded; series are the published annual values for 2015-2024 unless a
// different year is stated next to the figure. Nothing here is fetched at
// run time: the site works with no network at all.

export const META = {
  country: 'Indonesia',
  countryCode: 'IDN',
  capital: 'Jakarta',
  currency: 'Indonesian rupiah (IDR)',
  language: 'Indonesian',
  areaKm2: 1904569,
  updated: '26 November 2026',
  sources: [
    'World Bank, World Development Indicators (2024 vintage)',
    'Statistics Indonesia (BPS), Statistical Yearbook 2025',
    'ILO modelled estimates, November 2024',
    'UN Comtrade / BPS foreign trade statistics 2024',
  ],
};

// Headline indicators shown on the home dashboard.
export const HEADLINES = [
  { id: 'population', label: 'Population', value: 283.5, unit: 'million', year: 2024, change: '+0.8% on 2023', note: '4th largest in the world', format: 'one' },
  { id: 'gdp', label: 'GDP (nominal)', value: 1396.3, unit: 'US$ billion', year: 2024, change: '+1.8% on 2023', note: '16th largest economy', format: 'one' },
  { id: 'gdpCapita', label: 'GDP per capita', value: 4925, unit: 'US$', year: 2024, change: '+1.0% on 2023', note: 'Upper middle income', format: 'int' },
  { id: 'growth', label: 'Real GDP growth', value: 5.0, unit: '% per year', year: 2024, change: '5.3% in 2022', note: '10-year average 4.5%', format: 'one' },
  { id: 'inflation', label: 'Inflation (CPI)', value: 2.3, unit: '% per year', year: 2024, change: '3.7% in 2023', note: 'Inside the 2.5% ± 1 target', format: 'one' },
  { id: 'unemployment', label: 'Open unemployment', value: 4.9, unit: '% of labour force', year: 2024, change: '5.3% in 2023', note: 'BPS August survey', format: 'one' },
  { id: 'exports', label: 'Goods exports', value: 264.8, unit: 'US$ billion', year: 2024, change: '+2.3% on 2023', note: 'Trade surplus US$ 31.1bn', format: 'one' },
  { id: 'life', label: 'Life expectancy', value: 71.3, unit: 'years at birth', year: 2024, change: '73.4 women · 69.2 men', note: 'Up from 70.8 in 2015', format: 'one' },
];

// Annual series, 2015-2024. Each entry: [year, value].
export const SERIES = {
  population: [
    [2015, 258.2], [2016, 261.1], [2017, 264.0], [2018, 266.9], [2019, 269.6],
    [2020, 271.9], [2021, 274.9], [2022, 277.5], [2023, 280.7], [2024, 283.5],
  ],
  gdpNominal: [
    [2015, 860.9], [2016, 931.9], [2017, 1015.6], [2018, 1042.3], [2019, 1119.1],
    [2020, 1059.1], [2021, 1186.5], [2022, 1319.1], [2023, 1371.2], [2024, 1396.3],
  ],
  gdpGrowth: [
    [2015, 4.9], [2016, 5.0], [2017, 5.1], [2018, 5.2], [2019, 5.0],
    [2020, -2.1], [2021, 3.7], [2022, 5.3], [2023, 5.0], [2024, 5.0],
  ],
  inflation: [
    [2015, 6.4], [2016, 3.5], [2017, 3.8], [2018, 3.3], [2019, 2.8],
    [2020, 2.0], [2021, 1.6], [2022, 4.2], [2023, 3.7], [2024, 2.3],
  ],
  unemployment: [
    [2015, 6.2], [2016, 5.6], [2017, 5.5], [2018, 5.3], [2019, 5.2],
    [2020, 7.1], [2021, 6.5], [2022, 5.9], [2023, 5.3], [2024, 4.9],
  ],
  exportsGoods: [
    [2015, 150.4], [2016, 145.2], [2017, 168.8], [2018, 180.2], [2019, 167.7],
    [2020, 163.2], [2021, 231.6], [2022, 292.0], [2023, 258.8], [2024, 264.8],
  ],
  importsGoods: [
    [2015, 142.7], [2016, 135.7], [2017, 156.9], [2018, 188.7], [2019, 171.3],
    [2020, 141.6], [2021, 196.2], [2022, 237.4], [2023, 221.9], [2024, 233.7],
  ],
};

// Age structure, 2024, share of population (%).
export const AGE_GROUPS = [
  { label: '0–14 years', value: 24.6 },
  { label: '15–24 years', value: 16.9 },
  { label: '25–54 years', value: 41.2 },
  { label: '55–64 years', value: 10.0 },
  { label: '65 years and over', value: 7.3 },
];

// GDP by sector, share of gross value added, 2024 (%).
export const GDP_SECTORS = [
  { label: 'Manufacturing', value: 18.7 },
  { label: 'Wholesale and retail trade', value: 13.0 },
  { label: 'Agriculture, forestry and fishing', value: 12.5 },
  { label: 'Construction', value: 10.3 },
  { label: 'Mining and quarrying', value: 8.4 },
  { label: 'Transport and storage', value: 5.3 },
  { label: 'Information and communication', value: 4.4 },
  { label: 'Financial and insurance', value: 4.2 },
  { label: 'Public administration', value: 3.4 },
  { label: 'Real estate', value: 2.7 },
  { label: 'Other services', value: 17.1 },
];

// Employment by sector, share of all workers, 2024 (%).
export const EMPLOYMENT_SECTORS = [
  { label: 'Services', value: 49.8 },
  { label: 'Agriculture, forestry and fishing', value: 28.0 },
  { label: 'Industry', value: 22.3 },
];

// Labour market snapshot, 2024.
export const LABOUR = [
  { label: 'Labour force (age 15+)', value: '147.1 million', source: 'ILO, 2025' },
  { label: 'Labour force participation', value: '68.0%', source: 'ILO, 2025' },
  { label: 'Employment rate (age 15+)', value: '65.8%', source: 'ILO, 2025' },
  { label: 'Youth unemployment (15–24)', value: '13.1%', source: 'ILO, 2024' },
  { label: 'Female participation', value: '53.6%', source: 'World Bank, 2024' },
  { label: 'Male participation', value: '82.3%', source: 'World Bank, 2024' },
  { label: 'Self-employed share', value: '53.3%', source: 'ILO, 2025' },
  { label: 'Informal employment', value: '59.2%', source: 'BPS, 2024' },
];

// Top goods export destinations, 2024, share of goods exports (%).
export const EXPORT_PARTNERS = [
  { label: 'China', value: 25.7 },
  { label: 'United States', value: 10.4 },
  { label: 'Japan', value: 7.8 },
  { label: 'India', value: 6.9 },
  { label: 'Singapore', value: 5.8 },
  { label: 'Malaysia', value: 4.1 },
  { label: 'Philippines', value: 3.9 },
  { label: 'South Korea', value: 3.6 },
  { label: 'Vietnam', value: 2.9 },
  { label: 'Thailand', value: 2.7 },
];

// Top goods export products, 2024, approximate value (US$ billion).
export const EXPORT_PRODUCTS = [
  { label: 'Coal and briquettes', value: 26.9 },
  { label: 'Iron and steel', value: 26.4 },
  { label: 'Palm oil and derivatives', value: 20.1 },
  { label: 'Electrical machinery', value: 13.8 },
  { label: 'Vehicles and parts', value: 10.6 },
  { label: 'Copper ores and concentrates', value: 9.2 },
  { label: 'Natural gas', value: 8.4 },
  { label: 'Rubber and articles', value: 6.1 },
  { label: 'Footwear', value: 5.9 },
  { label: 'Textiles and apparel', value: 5.4 },
];

// Provinces: 2024 mid-year population (millions, BPS estimates, rounded),
// land area (km2) and island group. Density is computed from these two.
export const PROVINCES = [
  { name: 'West Java', slug: 'west-java', pop: 49.9, area: 35378, island: 'Java' },
  { name: 'East Java', slug: 'east-java', pop: 41.8, area: 47800, island: 'Java' },
  { name: 'Central Java', slug: 'central-java', pop: 37.9, area: 32801, island: 'Java' },
  { name: 'North Sumatra', slug: 'north-sumatra', pop: 15.6, area: 72981, island: 'Sumatra' },
  { name: 'Banten', slug: 'banten', pop: 12.4, area: 9663, island: 'Java' },
  { name: 'DKI Jakarta', slug: 'jakarta', pop: 10.7, area: 664, island: 'Java' },
  { name: 'South Sulawesi', slug: 'south-sulawesi', pop: 9.4, area: 46717, island: 'Sulawesi' },
  { name: 'Lampung', slug: 'lampung', pop: 9.3, area: 34624, island: 'Sumatra' },
  { name: 'South Sumatra', slug: 'south-sumatra', pop: 8.9, area: 91592, island: 'Sumatra' },
  { name: 'Riau', slug: 'riau', pop: 6.9, area: 87024, island: 'Sumatra' },
  { name: 'West Sumatra', slug: 'west-sumatra', pop: 6.0, area: 42013, island: 'Sumatra' },
  { name: 'West Kalimantan', slug: 'west-kalimantan', pop: 5.8, area: 147307, island: 'Kalimantan' },
  { name: 'East Kalimantan', slug: 'east-kalimantan', pop: 4.0, area: 129067, island: 'Kalimantan' },
  { name: 'Bali', slug: 'bali', pop: 4.4, area: 5780, island: 'Bali & Nusa Tenggara' },
  { name: 'South Kalimantan', slug: 'south-kalimantan', pop: 4.3, area: 38744, island: 'Kalimantan' },
  { name: 'Aceh', slug: 'aceh', pop: 5.6, area: 57957, island: 'Sumatra' },
  { name: 'Jambi', slug: 'jambi', pop: 3.7, area: 50058, island: 'Sumatra' },
  { name: 'East Nusa Tenggara', slug: 'east-nusa-tenggara', pop: 5.7, area: 47931, island: 'Bali & Nusa Tenggara' },
  { name: 'Yogyakarta', slug: 'yogyakarta', pop: 3.8, area: 3133, island: 'Java' },
  { name: 'Central Sulawesi', slug: 'central-sulawesi', pop: 3.1, area: 61841, island: 'Sulawesi' },
];

// Island-group totals, computed from the provinces above at run time.
export const ISLANDS = ['All islands', 'Java', 'Sumatra', 'Kalimantan', 'Sulawesi', 'Bali & Nusa Tenggara'];

// Latest statistical releases.
export const RELEASES = [
  { date: '5 Nov 2026', title: 'GDP growth, Q3 2026: 5.1% year on year', topic: 'Economy' },
  { date: '3 Nov 2026', title: 'Consumer price inflation, October 2026: 2.9% year on year', topic: 'Prices' },
  { date: '21 Oct 2026', title: 'Foreign trade, September 2026: surplus US$ 3.0 billion', topic: 'Trade' },
  { date: '7 Oct 2026', title: 'Labour force survey, August 2026: unemployment 4.7%', topic: 'Employment' },
  { date: '1 Sep 2026', title: 'Population projection 2025–2045: 324 million by 2045', topic: 'Population' },
  { date: '15 Aug 2026', title: 'Poverty rate, March 2026: 8.5% of the population', topic: 'Society' },
];

// Full indicator table for the data explorer: every indicator the site
// carries, with its latest value, year and source.
export const INDICATORS = [
  { topic: 'Population', name: 'Total population', value: '283.5 million', year: 2024, source: 'World Bank WDI' },
  { topic: 'Population', name: 'Population growth', value: '0.8% per year', year: 2024, source: 'World Bank WDI' },
  { topic: 'Population', name: 'Urban population', value: '58.8% of total', year: 2024, source: 'World Bank WDI' },
  { topic: 'Population', name: 'Population density', value: '149 people per km²', year: 2024, source: 'World Bank WDI' },
  { topic: 'Population', name: 'Fertility rate', value: '2.1 births per woman', year: 2023, source: 'World Bank WDI' },
  { topic: 'Population', name: 'Life expectancy at birth', value: '71.3 years', year: 2024, source: 'World Bank WDI' },
  { topic: 'Population', name: 'Median age', value: '30.5 years', year: 2024, source: 'UN World Population Prospects' },
  { topic: 'Economy', name: 'GDP, nominal', value: 'US$ 1,396.3 billion', year: 2024, source: 'World Bank WDI' },
  { topic: 'Economy', name: 'GDP, PPP', value: 'US$ 4,102 billion', year: 2024, source: 'IMF WEO' },
  { topic: 'Economy', name: 'GDP per capita, nominal', value: 'US$ 4,925', year: 2024, source: 'World Bank WDI' },
  { topic: 'Economy', name: 'GDP per capita, PPP', value: 'US$ 14,500', year: 2024, source: 'IMF WEO' },
  { topic: 'Economy', name: 'Real GDP growth', value: '5.0% per year', year: 2024, source: 'World Bank WDI' },
  { topic: 'Economy', name: 'Inflation, consumer prices', value: '2.3% per year', year: 2024, source: 'World Bank WDI' },
  { topic: 'Economy', name: 'Government debt', value: '39.8% of GDP', year: 2024, source: 'IMF / Ministry of Finance' },
  { topic: 'Economy', name: 'Foreign direct investment, net inflows', value: 'US$ 24.2 billion', year: 2024, source: 'World Bank WDI' },
  { topic: 'Economy', name: 'Foreign exchange reserves', value: 'US$ 155.7 billion', year: 2024, source: 'Bank Indonesia' },
  { topic: 'Economy', name: 'Exchange rate, annual average', value: '15,855 IDR per US$', year: 2024, source: 'World Bank WDI' },
  { topic: 'Employment', name: 'Open unemployment rate', value: '4.9%', year: 2024, source: 'BPS Sakernas' },
  { topic: 'Employment', name: 'Youth unemployment (15–24)', value: '13.1%', year: 2024, source: 'ILO' },
  { topic: 'Employment', name: 'Labour force participation', value: '68.0%', year: 2025, source: 'ILO' },
  { topic: 'Employment', name: 'Employment in agriculture', value: '28.0% of workers', year: 2024, source: 'ILO' },
  { topic: 'Employment', name: 'Employment in industry', value: '22.3% of workers', year: 2024, source: 'ILO' },
  { topic: 'Employment', name: 'Employment in services', value: '49.8% of workers', year: 2024, source: 'ILO' },
  { topic: 'Employment', name: 'Informal employment', value: '59.2% of workers', year: 2024, source: 'BPS' },
  { topic: 'Trade', name: 'Goods exports', value: 'US$ 264.8 billion', year: 2024, source: 'BPS / UN Comtrade' },
  { topic: 'Trade', name: 'Goods imports', value: 'US$ 233.7 billion', year: 2024, source: 'BPS / UN Comtrade' },
  { topic: 'Trade', name: 'Goods trade balance', value: 'US$ +31.1 billion', year: 2024, source: 'BPS / UN Comtrade' },
  { topic: 'Trade', name: 'Exports of goods and services', value: '22.2% of GDP', year: 2024, source: 'World Bank WDI' },
  { topic: 'Trade', name: 'Current account balance', value: 'US$ −8.5 billion', year: 2024, source: 'Bank Indonesia' },
  { topic: 'Society', name: 'Poverty rate', value: '9.0% of population', year: 2024, source: 'BPS' },
  { topic: 'Society', name: 'Gini index', value: '34.9', year: 2024, source: 'World Bank WDI' },
  { topic: 'Society', name: 'Internet users', value: '72.8% of population', year: 2024, source: 'World Bank WDI' },
  { topic: 'Society', name: 'Mobile subscriptions', value: '122.5 per 100 people', year: 2024, source: 'World Bank WDI' },
  { topic: 'Society', name: 'Primary school enrolment, gross', value: '100.4%', year: 2025, source: 'World Bank WDI' },
  { topic: 'Society', name: 'Tertiary enrolment, gross', value: '44.9%', year: 2023, source: 'World Bank WDI' },
  { topic: 'Society', name: 'Infant mortality', value: '15.2 per 1,000 live births', year: 2024, source: 'World Bank WDI' },
];
