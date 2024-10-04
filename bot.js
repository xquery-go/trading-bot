import TradingBot from "./services/tradingBot.service.js";
import fetchStockPrice from "./utils/fetchStockPrice.js";
import reportStatus from "./utils/report.utils.js";

const bot = new TradingBot();

const startMonitoring = async () => {
  try {
    // Fetch stock price
    const stockPrice = await fetchStockPrice();
    console.log("Fetched stock price:", stockPrice);

    // Evaluate stock price
    bot.evaluateTrade(stockPrice);

    // Log or report the bot's status
    const status = bot.getStatus();
    console.log("Current Status:", status);
    reportStatus(status); // Use the reportStatus function if you have one
  } catch (error) {
    console.error("Error in monitoring:", error.message);
  }
};

export default startMonitoring;
