import crypto from "crypto";
import { v4 as generateNonce } from "uuid";
import * as T from "./type";

/*
Signature is a HMAC-SHA256 encoded message containing nonce, customer ID and API key.
The HMAC-SHA256 code must be generated using a secret key that was generated with your
API key. This code must be converted to it's hexadecimal representation 
(64 uppercase characters).
*/
export const createSignature = (stringToSign: string, secret: string) => {
  const signer = crypto.createHmac("sha256", Buffer.from(secret, "utf8"));
  return signer.update(stringToSign).digest("hex").toUpperCase();
};

export const getHeaders = (
  { apiKey, secret }: { apiKey: string; secret: string },
  host: string,
  path: string,
  method: "GET" | "POST",
  query: string = "",
  body?: string
) => {
  const version = "v2";
  const hostWithoutPrefix = host.replace(/^http[s]{0,1}:\/\//, "");

  const nonce = generateNonce();
  const timestamp = String(Date.now());

  const xAuth = "BITSTAMP " + apiKey;

  const contentType: undefined | string =
    body && "application/x-www-form-urlencoded";

  const stringToSign = [
    xAuth,
    method,
    hostWithoutPrefix,
    path,
    query,
    contentType || "",
    nonce,
    timestamp,
    version,
    body || "",
  ].join("");

  const signature = createSignature(stringToSign, secret);

  const h: { [k: string]: string } = {
    "X-AUTH": xAuth,
    "X-AUTH-SIGNATURE": signature,
    "X-AUTH-NONCE": nonce,
    "X-AUTH-TIMESTAMP": timestamp,
    "X-AUTH-VERSION": version,
  };

  // You also do not need to set Content-Type header if there is no body.
  // see https://www.bitstamp.net/api/#authentication-errors
  if (contentType) {
    h["Content-type"] = contentType;
  }

  return h;
};

export const queryParametersToString = (q: {
  [k: string]: string | number;
}): string =>
  "?" +
  Object.entries(q)
    .map(([k, v]) => k + "=" + v)
    .join("&");

export const currencyPairToTuple = (
  currencyPair: T.CurrencyPair
): { base: string; quote: string } => {
  const [, base, quote] = currencyPair.toUpperCase().split(/^(\w{3})/);

  return { base, quote };
};
