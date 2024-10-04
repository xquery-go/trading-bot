const reportSummary = (summary) => {
  console.log("=== Trading Bot Summary ===");
  console.log(`Total Trades Made: ${summary.totalTrades}`);
  console.log(`Total Profit: $${summary.totalProfit}`);

  summary.trades.forEach((trade) => {
    console.log(
      `${trade.date.toISOString()}: ${
        trade.type.charAt(0).toUpperCase() + trade.type.slice(1)
      } at $${trade.price}${
        trade.type === "sell" ? `, Profit: $${trade.profit.toFixed(2)}` : ""
      }`
    );
  });

  console.log("===========================");
};

export default reportSummary;
