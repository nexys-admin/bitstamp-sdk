export interface Ticker {
  volume: number | string;
  last: number | string;
  timestamp: number | string;
  bid: number | string;
  vwap: number | string;
  high: number | string;
  low: number | string;
  ask: number | string;
  open: number | string;
}

export interface TransactionsOut {
  fee: string;
  btc: any;
  btc_usd: any;
  datetime: string;
  usd: any;
  gbp: string;
  type: string;
  id: number;
  eur: any;
  order_id?: number;
  eth_btc?: number;
  eth: string;
  btc_gbp?: number;
  ltc_btc?: number;
  ltc: string;
  xrp_usd?: number;
  xrp: string;
  btc_eur?: number;
  bch: string;
  bch_usd?: number;
  bch_eur?: number;
  ltc_usd?: number;
  eth_usd?: number;
}

export type CurrencyPair =
  | "btcusd"
  | "btceur"
  | "btcgbp"
  | "btcpax"
  | "btcusdc"
  | "gbpusd"
  | "gbpeur"
  | "eurusd"
  | "xrpusd"
  | "xrpeur"
  | "xrpbtc"
  | "xrpgbp"
  | "xrppax"
  | "ltcusd"
  | "ltceur"
  | "ltcbtc"
  | "ltcgbp"
  | "ethusd"
  | "etheur"
  | "ethbtc"
  | "ethgbp"
  | "ethpax"
  | "ethusdc"
  | "bchusd"
  | "bcheur"
  | "bchbtc"
  | "bchgbp"
  | "paxusd"
  | "paxeur"
  | "paxgbp"
  | "xlmbtc"
  | "xlmusd"
  | "xlmeur"
  | "xlmgbp"
  | "linkusd"
  | "linkeur"
  | "linkgbp"
  | "linkbtc"
  | "linketh"
  | "omgusd"
  | "omgeur"
  | "omggbp"
  | "omgbtc"
  | "usdcusd"
  | "usdceur";

interface Pagination {
  count: number | null;
  page: number;
  size: number;
}

export interface HistoryDataRaw {
  close: string;
  high: string;
  low: string;
  open: string;
  time: string;
  timestamp: string;
  volume: string;
}

export interface HistoryData {
  close: number;
  high: number;
  low: number;
  open: number;
  time: string;
  timestamp: number;
  volume: number;
}

export interface History {
  data: HistoryDataRaw[];
  pagination: Pagination;
}

export type Timestep =
  | 60
  | 180
  | 300
  | 900
  | 1800
  | 3600
  | 7200
  | 14400
  | 21600
  | 43200
  | 86400
  | 259200;
