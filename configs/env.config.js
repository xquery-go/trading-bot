import dotenv from "dotenv/config";

const Configs = {
  INITIAL_BALANCE: process.env.INITIAL_BALANCE || 1000,
  BUY_THRESHOLD: parseFloat(process.env.BUY_THRESHOLD || "0.98"), // 2% drop
  SELL_THRESHOLD: parseFloat(process.env.SELL_THRESHOLD || "1.03"), // 3% rise
  PRICE_RANGE: { min: 100, max: 200 },
  CHECK_INTERVAL: process.env.CHECK_INTERVAL,
};

export default Configs;
