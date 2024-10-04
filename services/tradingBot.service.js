import {
    BUY_THRESHOLD,
    SELL_THRESHOLD,
    INITIAL_BALANCE,
  } from "../configs/env.config.js";
  
  class TradingBot {
    #balance;
    #stockOwned;
    #stockPriceAtBuy;
    #trades; // Array to keep track of trades made
  
    constructor(initialBalance = INITIAL_BALANCE) {
      this.#balance = Number(initialBalance) || 0;
      this.#stockOwned = false;
      this.#stockPriceAtBuy = 0;
      this.#trades = []; // Initialize an empty array to track trades
    }
  
    #log(message) {
      console.log(message);
    }
  
    #canBuy(currentPrice) {
      if (this.#stockOwned) {
        return false; // Can't buy if already holding stock
      }
      const dropPercentage = ((this.#stockPriceAtBuy - currentPrice) / this.#stockPriceAtBuy) * 100;
      return dropPercentage >= 2; // Buy if the price has dropped by 2%
    }
  
    #canSell(currentPrice) {
      if (!this.#stockOwned) {
        return false; // Can't sell if no stock is owned
      }
      const risePercentage = ((currentPrice - this.#stockPriceAtBuy) / this.#stockPriceAtBuy) * 100;
      return risePercentage >= 3; // Sell if the price has risen by 3%
    }
  
    buy(price) {
      if (this.#stockOwned) {
        this.#log("Cannot buy, stock already owned.");
        return;
      }
      this.#stockOwned = true;
      this.#stockPriceAtBuy = price;
      this.#trades.push({ type: 'buy', price, date: new Date() }); // Record the buy trade
      this.#log(`Bought stock at $${price}`);
    }
  
    sell(price) {
      if (!this.#stockOwned) {
        this.#log("Cannot sell, no stock owned.");
        return;
      }
      const profit = price - this.#stockPriceAtBuy;
  
      // Update balance
      this.#balance = (Number(this.#balance) + Number(profit)).toFixed(2);
      this.#stockOwned = false;
      
      // Record the sell trade
      this.#trades.push({ type: 'sell', price, profit, date: new Date() });
      this.#log(
        `Sold stock at $${price}. Profit: $${profit.toFixed(2)}. Balance: $${this.#balance}`
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
  
    // New method to get the summary report
    getSummary() {
      const totalTrades = this.#trades.length;
      const totalProfit = this.#trades.reduce((total, trade) => {
        return total + (trade.type === 'sell' ? trade.profit : 0);
      }, 0);
  
      return {
        totalTrades,
        totalProfit: totalProfit.toFixed(2),
        trades: this.#trades,
      };
    }
  }
  
  export default TradingBot;
  