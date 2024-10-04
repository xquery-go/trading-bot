const reportStatus = (bot) => {
  console.log(bot.balance);
  console.log(`Current balance: $${bot.balance.toFixed(2)}`);
  if (bot.stockOwned) {
    console.log(`Holding stock bought at: $${bot.stockPriceAtBuy}`);
  } else {
    console.log(`Not holding any stock.`);
  }
};

export default reportStatus;
