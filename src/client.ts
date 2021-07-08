// doc: https://www.bitstamp.net/api/
import * as T from "./type";
import fetch from "node-fetch";
import * as U from "./utils";

export const hostDefault = "https://www.bitstamp.net/api";

export class Client {
  apiKey: string;
  secret: string;
  host: string;
  constructor(apiKey: string, secret: string, host: string = hostDefault) {
    this.apiKey = apiKey;
    this.secret = secret;
    this.host = host;
  }

  getTicker = async (currencyPair: T.CurrencyPair): Promise<T.Ticker> => {
    const path = "/ticker/" + currencyPair + "/";
    const url = [this.host, path].join("");

    return request<T.Ticker>(url);
  };

  getOHLC = async (
    currencyPair: T.CurrencyPair,
    step: T.Timestep = 60,
    limit: number = 1000 // Limit OHLC results (minimum: 1; maximum: 1000)
  ): Promise<T.HistoryData[]> => {
    const path = "/v2/ohlc/" + currencyPair + "/";
    const url =
      [this.host, path].join("") + U.queryParametersToString({ step, limit });

    const {
      data: { ohlc },
    } = await request<{ data: { ohlc: T.HistoryDataRaw[] } }>(url);

    return ohlc.map((d) => {
      return {
        open: Number(d.open),
        close: Number(d.close),
        high: Number(d.high),
        low: Number(d.low),
        volume: Number(d.volume),
        timestamp: Number(d.timestamp),
        time: d.time,
      };
    });
  };

  simplePostRequest = <A>(path: string, data?: any): Promise<A> => {
    const url = [this.host, path].join("");
    const method = "POST";

    const body =
      data &&
      Object.entries(data)
        .map(
          ([k, v]) =>
            encodeURIComponent(k) + "=" + encodeURIComponent(String(v))
        )
        .join("&");

    const headers = U.getHeaders(
      { secret: this.secret, apiKey: this.apiKey },
      this.host,
      path,
      method,
      undefined,
      body
    );

    return request(url, headers, method, body);
  };

  getTransactions = async (): Promise<T.TransactionsOut[]> =>
    this.simplePostRequest("/v2/user_transactions/");

  getBalance = async (): Promise<any> => this.simplePostRequest("/v2/balance/");

  getOpenOrders = async (pair: string = "all") =>
    this.simplePostRequest(`/v2/open_orders/${pair}/`);

  getOrderStatus = async (id: string) =>
    this.simplePostRequest("/v2/order_status/", { id });

  cancelOrder = async (id: string) =>
    this.simplePostRequest("/v2/cancel_order/", { id });

  buyLimitOrder = async (
    amount: number,
    price: number,
    currencyPair: T.CurrencyPair
  ) => this.simplePostRequest(`/v2/buy/${currencyPair}/`, { amount, price });
}

export const request = async <A>(
  url: string,
  headers: {
    [k: string]: string;
  } = {
    "content-type": "application/x-www-form-urlencoded",
  },
  method: "POST" | "GET" = "GET",
  body?: string
): Promise<A> => {
  //console.log(body);
  //console.log(headers);

  const r = await fetch(url, { headers, method, body });
  //const y = r.clone();
  //console.log(await y.text());

  try {
    return r.json();
  } catch (err) {
    throw err;
  }
};
