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
    this.#stockPriceAtBuy = 0;
  }

  #log(message) {
    console.log(message);
  }
  #canBuy(currentPrice) {
    return (
      !this.#stockOwned && currentPrice < this.#stockPriceAtBuy * BUY_THRESHOLD
    );
  }

  #canSell(currentPrice) {
    return (
      this.#stockOwned && currentPrice > this.#stockPriceAtBuy * SELL_THRESHOLD
    );
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
      balance: this.#balance.toFixed(2),
      stockOwned: this.#stockOwned,
      stockPriceAtBuy: this.#stockPriceAtBuy,
    };
  }
}

export default TradingBot;
