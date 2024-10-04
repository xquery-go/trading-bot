import dotenv from "dotenv/config";

export const INITIAL_BALANCE = process.env.INITIAL_BALANCE || 1000;
export const BUY_THRESHOLD = parseFloat(process.env.BUY_THRESHOLD || "0.98"); // 2% drop
export const SELL_THRESHOLD = parseFloat(process.env.SELL_THRESHOLD || "1.03"); // 3% rise
export const PRICE_RANGE = { min: 100, max: 200 };
export const CHECK_INTERVAL = process.env.CHECK_INTERVAL;
export const API_URL = `http://localhost:${process.env.PORT}`;
