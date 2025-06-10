
export interface YearValue {
  year: number;
  value: number | null;
}

export interface SalientProductionItem {
  name: string;
  data: YearValue[];
}

export interface SalientImportItem {
  year: number;
  Compounds: number | null;
  Metals: number | null;
}

export interface SalientPriceItem {
  year: number;
  [key: string]: number | null; // For 'Neodymium Oxide', 'Terbium Oxide', etc.
}

export interface NameValuePercentage {
  name: string;
  value: number;
}

export interface TariffItem {
  item: string;
  number: string;
  relation: string;
}

export interface WorldMineProductionItem {
  country: string;
  '2023': number | null;
  '2024': number | null;
}

export interface WorldReserveItem {
    country: string;
    reserves: number | null;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
