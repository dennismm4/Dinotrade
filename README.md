# Trade Command Dashboard

A GitHub-ready dashboard for the first trading project plan:

- `$30` Exness MT5 forex bot for `EUR/USD` and `GBP/USD`
- `$20` Binance Spot crypto bot for `BTC/USDT` and `ETH/USDT`
- Simulation-first risk controls before any real API key is connected

## Current Status

This is a static dashboard only. It does not place trades, connect to Binance, connect to MT5, or store credentials.

Open `index.html` in a browser to view it.

## First Build Goals

1. Track capital allocation and bot status.
2. Define strict risk rules before live trading.
3. Add backtesting before API execution.
4. Add Binance Spot testnet connector.
5. Add MT5 demo connector.
6. Add live trading only after paper logs are stable.

## Safety Rules

- Binance API key should never have withdrawal permission.
- Exness/MT5 live trading should start only after demo trading.
- Every MT5 trade must have a stop-loss.
- The project should pause after three consecutive losses.
- The monthly pilot drawdown limit is 15% of starting capital.

## Research Notes

- Exness Kenya states Exness (KE) Limited is CMA-authorized as a non-dealing online foreign exchange broker under license number 162: https://www.exness.ke/regulation/
- MetaTrader 5 exposes Python integration including `order_send`: https://www.mql5.com/en/docs/python_metatrader5/mt5ordersend_py
- Binance maintains official Spot API documentation and Python connector packages: https://github.com/binance/binance-spot-api-docs and https://github.com/binance/binance-connector-python

## Next Engineering Step

Add a local Python service that exposes mock bot state to the dashboard, then replace the mock data with paper trading results.
