// fetch historical data
// this is not the official API, favor the official API
import fetch from "node-fetch";
import * as T from "./type";
import * as U from "./utils";
const host = "https://www.bitstamp.net/api-internal/tradeview";

export const getPriceHistoryRaw = async (
  currencyPair: T.CurrencyPair,
  timestep: number,
  timedelta: number,
  endDate: Date = new Date()
): Promise<T.History> => {
  const { base, quote } = U.currencyPairToTuple(currencyPair);

  const endDateString = endDate.toISOString();
  const startDate = new Date(endDate.getTime() - timedelta * 1000);
  const startDateString = startDate.toISOString();

  const url = `${host}/price-history/${base}/${quote}/?step=${timestep}&start_datetime=${startDateString}&end_datetime=${endDateString}`;
  console.log(url);
  const r = await fetch(url);

  return r.json();
};

export const getPriceHistory = async (
  currencyPair: T.CurrencyPair
): Promise<T.HistoryData[]> => {
  const daySeconds = 60 * 60 * 24;
  // 1/2 day, 12 hours
  const timestep = 60;
  // 3 days
  const timedelta = daySeconds;
  const { data } = await getPriceHistoryRaw(currencyPair, timestep, timedelta);

  return data.map((d) => {
    return {
      open: Number(d.volume),
      close: Number(d.volume),
      high: Number(d.volume),
      low: Number(d.volume),
      volume: Number(d.volume),
      timestamp: Number(d.timestamp),
      time: d.time,
    };
  });
};
