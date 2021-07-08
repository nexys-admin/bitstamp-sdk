import * as U from "./utils";

test("currencyPairToTuple", () => {
  const i = "btcusd";
  const e = { base: "BTC", quote: "USD" };
  const r = U.currencyPairToTuple(i);
  expect(r).toEqual(e);
});
