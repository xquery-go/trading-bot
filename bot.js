import TradingBot from "./services/tradingBot.service.js";
import fetchStockPrice from "./utils/fetchStockPrice.js";
import reportStatus from "./utils/report.utils.js";
const bot = new TradingBot();
const startMonitering = async () => {
  // fetch stock price
  const stockPrice = await fetchStockPrice();
  console.log("stock price-------", stockPrice);

  // evaluate stock price
  bot.evaluateTrade(stockPrice);

  // generate status
  bot.getStatus();
};

export default startMonitering;
