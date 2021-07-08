import nock from "nock";
import { Client, hostDefault } from "./client";

// set to false, if you want to try the actual requests
const mock = true;

const action = new Client("apiKey", "secret", hostDefault);

test("get ticker", async () => {
  const currencyPair = "bchbtc";

  const path = "/ticker/" + currencyPair + "/";
  const expectedBody = {
    volume: "10894.92225344",
    last: "37397.78",
    timestamp: "1612432487",
    bid: "37375.22",
    vwap: "37287.85",
    high: "38748.52",
    low: "35699.00",
    ask: "37384.82",
    open: 37693,
  };
  if (mock) {
    nock(hostDefault).get(path).reply(200, expectedBody);
  }
  const r = await action.getTicker(currencyPair);

  expect(r).toEqual(expectedBody);
  expect(Number(r.high)).toBeGreaterThan(Number(r.low));
  expect(Number(r.ask)).toBeGreaterThan(Number(r.bid));
});

test("request with auth", async () => {
  const expectedBody = [
    {
      fee: "0.00005752",
      order_id: 1324192646778881,
      eth_btc: 0.03972975,
      datetime: "2021-01-31 20:16:35.063000",
      usd: 0,
      btc: "-0.01150460",
      eth: "0.28957141",
      type: "2",
      id: 147142080,
      eur: 0,
    },
    {
      fee: "0.24875",
      btc: "0.00201993",
      order_id: 1314307870957568,
      datetime: "2021-01-03 21:55:19.715000",
      btc_gbp: 24629.55,
      usd: 0,
      gbp: "-49.75",
      type: "2",
      id: 138811635,
      eur: 0,
    },
    {
      fee: "0.00",
      btc: 0,
      btc_usd: "0.00",
      datetime: "2021-01-03 20:55:12.152147",
      usd: 0,
      gbp: "50.00",
      type: "0",
      id: 138799603,
      eur: 0,
    },
  ];

  const path = "/v2/user_transactions/";
  if (mock) {
    nock(hostDefault).post(path).reply(200, expectedBody);
  }
  const r = await action.getTransactions();

  expect(r).toEqual(expectedBody);
});
