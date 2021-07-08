# Bitstamp SDK

[![npm version](https://img.shields.io/npm/v/@nexys/bitstamp.svg)](https://www.npmjs.com/package/@nexys/bitstamp)
[![Build and Test Package](https://github.com/nexys-admin/bitstamp-sdk/actions/workflows/yarn.yml/badge.svg)](https://github.com/nexys-admin/bitstamp-sdk/actions/workflows/yarn.yml)
[![Publish](https://github.com/nexys-admin/bitstamp-sdk/actions/workflows/publish.yml/badge.svg)](https://github.com/nexys-admin/bitstamp-sdk/actions/workflows/publish.yml)
![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)
[![Bundlephobia](https://badgen.net/bundlephobia/min/@nexys/bitstamp)](https://bundlephobia.com/result?p=@nexys/bitstamp)

This is a simple (unofficial) SDK to access the bitstamp API

Link to the official doc: // doc: https://www.bitstamp.net/api/

## Get started

```
import {Client} from '@nexys/bitstamp';

const apiKey = 'myAPiKey';
const secret = 'secret';

const bitstampClient = new Client(apiKey, secret);
```
