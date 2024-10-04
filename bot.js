import TradingBot from "./services/tradingBot.service.js";
import fetchStockPrice from "./utils/fetchStockPrice.js";
import reportStatus from "./utils/report.utils.js";
import reportSummary from "./utils/reportSummary.utils.js";

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
    // Call reportStatus to log the current status
    reportStatus(status);

    // Generate and log the summary report
    const summary = bot.getSummary();
    // Call reportSummary to log trade details
    reportSummary(summary);
  } catch (error) {
    console.error("Error in monitoring:", error.message);
  }
};

export default startMonitoring;
