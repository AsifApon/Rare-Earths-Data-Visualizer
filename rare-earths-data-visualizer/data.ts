
import { SalientProductionItem, SalientImportItem, SalientPriceItem, NameValuePercentage, TariffItem, WorldMineProductionItem, WorldReserveItem } from './types';

export const DOMESTIC_PRODUCTION_USE_TEXT = `Rare earths were mined and processed domestically in 2024. An estimated 45,000 tons of REO in mineral concentrates were produced and were valued at $260 million. Bastnaesite (or bastnäsite), a rare-earth fluorocarbonate mineral, was mined as a primary product at a mine in Mountain Pass, CA. Monazite, a phosphate mineral, was stockpiled as a separated concentrate or included as an accessory mineral in heavy-mineral-sand concentrates in the southeastern United States. Mixed rare-earth compounds also were produced in the Western United States. The estimated value of rare-earth compounds and metals imported by the United States in 2024 was $170 million, an 11% decrease from $186 million in 2023. The estimated leading domestic end use of rare earths was catalysts. Significant amounts of rare earths are imported as permanent magnets embedded in finished goods. Other end uses were ceramics and glass, metallurgical applications and alloys, and polishing.`;

export const RECYCLING_TEXT = `Limited quantities of rare earths were recovered from batteries, permanent magnets, and fluorescent lamps.`;

export const SALIENT_PRODUCTION_MINERAL_CONCENTRATES: SalientProductionItem = {
  name: "Mineral Concentrates Production (tons REO)",
  data: [
    { year: 2020, value: 39000 },
    { year: 2021, value: 42400 },
    { year: 2022, value: 42500 },
    { year: 2023, value: 41600 },
    { year: 2024, value: 45000 },
  ]
};

export const SALIENT_PRODUCTION_COMPOUNDS_METALS: SalientProductionItem = {
  name: "Compounds and Metals Production (tons REO)",
  data: [
    { year: 2020, value: null }, // OCR data doesn't show a value for 2020 explicitly under this specific line, might be combined or zero
    { year: 2021, value: 120 },
    { year: 2022, value: 95 },
    { year: 2023, value: 250 },
    { year: 2024, value: 1300 },
  ]
};

export const SALIENT_IMPORTS_DATA: SalientImportItem[] = [
  { year: 2020, Compounds: 6510, Metals: 270 + 363 },
  { year: 2021, Compounds: 7690, Metals: 330 + 580 },
  { year: 2022, Compounds: 10700, Metals: 395 + 487 },
  { year: 2023, Compounds: 8920, Metals: 259 + 476 },
  { year: 2024, Compounds: 8000, Metals: 220 + 90 },
];

export const SALIENT_PRICES_DATA: SalientPriceItem[] = [
  { year: 2020, 'Neodymium Oxide': 49, 'Terbium Oxide': 670, 'Cerium Oxide': 2, 'Dysprosium Oxide': 261 },
  { year: 2021, 'Neodymium Oxide': 98, 'Terbium Oxide': 1346, 'Cerium Oxide': 2, 'Dysprosium Oxide': 410 },
  { year: 2022, 'Neodymium Oxide': 134, 'Terbium Oxide': 2051, 'Cerium Oxide': 1, 'Dysprosium Oxide': 382 },
  { year: 2023, 'Neodymium Oxide': 78, 'Terbium Oxide': 1298, 'Cerium Oxide': 1, 'Dysprosium Oxide': 330 },
  { year: 2024, 'Neodymium Oxide': 56, 'Terbium Oxide': 810, 'Cerium Oxide': 1, 'Dysprosium Oxide': 260 },
];

export const IMPORT_SOURCES_DATA: NameValuePercentage[] = [
  { name: "China", value: 70 },
  { name: "Malaysia", value: 13 },
  { name: "Japan", value: 6 },
  { name: "Estonia", value: 5 },
  { name: "Other", value: 6 },
];

export const TARIFF_DATA: TariffItem[] = [
  { item: "Rare-earth metals", number: "2805.30.0000", relation: "5% ad valorem." },
  { item: "Cerium compounds", number: "2846.10.0000", relation: "5.5% ad valorem." },
  { item: "Other rare-earth compounds: Oxides or chlorides", number: "2846.90.2000", relation: "Free." },
  { item: "Other rare-earth compounds: Carbonates", number: "2846.90.8000", relation: "3.7% ad valorem." },
  { item: "Ferrocerium and other pyrophoric alloys", number: "3606.90.3000", relation: "5.9% ad valorem." },
];

export const WORLD_MINE_PRODUCTION_DATA: WorldMineProductionItem[] = [
  { country: "United States", "2023": 41600, "2024": 45000 },
  { country: "Australia", "2023": 16000, "2024": 13000 }, // Interpreted from 1216,000 and 1213,000
  { country: "Brazil", "2023": 140, "2024": 20 },
  { country: "Burma", "2023": 43000, "2024": 31000 }, // Interpreted from 1243,000 and 1231,000
  { country: "China", "2023": 255000, "2024": 270000 }, // Interpreted from 14255,000 and 14270,000 (production quota)
  { country: "India", "2023": 2900, "2024": 2900 },
  { country: "Russia", "2023": 2500, "2024": 2500 },
  { country: "Thailand", "2023": 3600, "2024": 13000 }, // Interpreted from 123,600 and 1213,000 for 2024
  { country: "Vietnam", "2023": 300, "2024": 300 }, // Interpreted from 12300
];

export const WORLD_RESERVES_DATA: WorldReserveItem[] = [
    { country: "United States", reserves: 1900000 },
    { country: "Australia", reserves: 5700000 }, // Interpreted from 135,700,000
    { country: "Brazil", reserves: 21000000 },
    { country: "Canada", reserves: 830000 },
    { country: "China", reserves: 44000000 },
    { country: "Greenland", reserves: 1500000 },
    { country: "India", reserves: 6900000 },
    { country: "Russia", reserves: 3800000 }, // Interpreted data, PDF is unclear for this value
    { country: "South Africa", reserves: 860000 },
    { country: "Tanzania", reserves: 890000 },
    { country: "Vietnam", reserves: 3500000 },
];


export const getGeminiContextSummary = (): string => {
  return `
Key highlights from U.S. Geological Survey Rare Earths data:
Domestic Production (2024): Mineral concentrates at 45,000 tons REO. Leading end use is catalysts.
Import Sources (2020-23): China (70%), Malaysia (13%), Japan (6%), Estonia (5%).
Salient Statistics (US, 2024):
  - Mineral Concentrates Production: 45,000 tons
  - Compounds and Metals Production: 1,300 tons
  - Compound Imports: 8,000 tons
  - Metal Imports: 310 tons (220 Ferrocerium, 90 other RE metals)
  - Neodymium Oxide Price: $56/kg
  - Terbium Oxide Price: $810/kg
World Mine Production (2024, selected, tons REO):
  - China: 270,000 (quota)
  - USA: 45,000
  - Australia: 13,000
  - Burma: 31,000
  - Thailand: 13,000
World Reserves (selected, tons REO):
  - China: 44,000,000
  - Brazil: 21,000,000
  - Vietnam: 3,500,000 (PDF has 3,500,000 for Vietnam, not one of the largest listed as text on page 2)
  - Australia: 5,700,000
  - India: 6,900,000
  - USA: 1,900,000
Recycling: Limited recovery from batteries, magnets, lamps.
Tariffs: Vary, e.g., 5% on RE metals, 5.5% on Cerium compounds, some oxides free.
---
Note: All data is in metric tons, rare-earth-oxide (REO) equivalent, unless otherwise specified. Values for 2024 are estimates.
  `.trim();
};

