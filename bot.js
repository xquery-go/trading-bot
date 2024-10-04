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
    reportStatus(status); // Call reportStatus to log the current status

    // Generate and log the summary report
    const summary = bot.getSummary();
    reportSummary(summary); // Call reportSummary to log trade details
  } catch (error) {
    console.error("Error in monitoring:", error.message);
  }
};

export default startMonitoring;
