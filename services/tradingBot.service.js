import {
  BUY_THRESHOLD,
  SELL_THRESHOLD,
  INITIAL_BALANCE,
} from "../configs/env.config.js";

class TradingBot {
  #balance;
  #stockOwned;
  #stockPriceAtBuy;

  constructor(initialBalance = INITIAL_BALANCE) {
    this.#balance = Number(initialBalance) || 0;
    this.#stockOwned = false;
    this.#stockPriceAtBuy = 100; // Initialize stock price at some value (or mock last known price)
  }

  #log(message) {
    console.log(message);
  }

  // Check if the price has dropped by 2% or more
  #canBuy(currentPrice) {
    if (this.#stockOwned) {
      return false; // Can't buy if already holding stock
    }
    // Calculate the percentage drop (stockPriceAtBuy is 100 by default, or you can mock a starting price)
    const dropPercentage =
      ((this.#stockPriceAtBuy - currentPrice) / this.#stockPriceAtBuy) * 100;
    return dropPercentage >= 2; // Buy if the price has dropped by 2%
  }

  // Check if the price has risen by 3% or more
  #canSell(currentPrice) {
    if (!this.#stockOwned) {
      return false; // Can't sell if no stock is owned
    }
    // Calculate the percentage rise
    const risePercentage =
      ((currentPrice - this.#stockPriceAtBuy) / this.#stockPriceAtBuy) * 100;
    return risePercentage >= 3; // Sell if the price has risen by 3%
  }

  buy(price) {
    if (this.#stockOwned) {
      this.#log("Cannot buy, stock already owned.");
      return;
    }
    this.#stockOwned = true;
    this.#stockPriceAtBuy = price;
    this.#log(`Bought stock at $${price}`);
  }

  sell(price) {
    if (!this.#stockOwned) {
      this.#log("Cannot sell, no stock owned.");
      return;
    }
    const profit = price - this.#stockPriceAtBuy;

    // Ensure balance is updated with a valid number
    this.#balance = (Number(this.#balance) + Number(profit)).toFixed(2);
    this.#stockOwned = false;
    this.#log(
      `Sold stock at $${price}. Profit: $${profit.toFixed(2)}. Balance: $${
        this.#balance
      }`
    );
  }

  evaluateTrade(currentPrice) {
    if (this.#canBuy(currentPrice)) {
      this.buy(currentPrice);
    } else if (this.#canSell(currentPrice)) {
      this.sell(currentPrice);
    } else {
      this.#log("No action taken.");
    }
  }

  getStatus() {
    return {
      balance: Number(this.#balance).toFixed(2),
      stockOwned: this.#stockOwned,
      stockPriceAtBuy: this.#stockPriceAtBuy,
    };
  }
}

export default TradingBot;
