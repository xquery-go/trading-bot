import {
    BUY_THRESHOLD,
    SELL_THRESHOLD,
    INITIAL_BALANCE,
  } from "../configs/env.config.js";
  
  class TradingBot {
    #balance;
    #stockOwned;
    #stockPriceAtBuy;
    #prices; // Array to hold historical prices for moving averages
    #trades; // Array to keep track of trades made
    #shortTermPeriod; // Number of periods for short-term moving average
    #longTermPeriod; // Number of periods for long-term moving average
  
    constructor(initialBalance = INITIAL_BALANCE, shortTermPeriod = 5, longTermPeriod = 20) {
      this.#balance = Number(initialBalance) || 0;
      this.#stockOwned = false;
      this.#stockPriceAtBuy = 0;
      this.#prices = []; // Initialize an empty array to hold historical prices
      this.#trades = []; // Initialize an empty array to track trades
      this.#shortTermPeriod = shortTermPeriod;
      this.#longTermPeriod = longTermPeriod;
    }
  
    #log(message) {
      console.log(message);
    }
  
    // Method to add new price and maintain the price history
    #addPrice(price) {
      this.#prices.push(price);
      if (this.#prices.length > this.#longTermPeriod) {
        this.#prices.shift(); // Remove the oldest price if we exceed the max length
      }
    }
  
    // Calculate the moving average
    #calculateMovingAverage(period) {
      if (this.#prices.length < period) return null; // Not enough data
      const sum = this.#prices.slice(-period).reduce((a, b) => a + b, 0);
      return sum / period;
    }
  
    // Check if we can buy based on the 2% drop strategy
    #canBuy(currentPrice) {
      if (this.#stockOwned) return false; // Can't buy if already holding stock
      const dropPercentage = ((this.#stockPriceAtBuy - currentPrice) / this.#stockPriceAtBuy) * 100;
      return dropPercentage >= 2; // Buy if the price has dropped by 2%
    }
  
    // Check if we can sell based on the 3% rise strategy
    #canSell(currentPrice) {
      if (!this.#stockOwned) return false; // Can't sell if no stock is owned
      const risePercentage = ((currentPrice - this.#stockPriceAtBuy) / this.#stockPriceAtBuy) * 100;
      return risePercentage >= 3; // Sell if the price has risen by 3%
    }
  
    // Evaluate the trading logic
    evaluateTrade(currentPrice) {
      this.#addPrice(currentPrice); // Add the current price to the history for moving average calculation
  
      const shortTermMA = this.#calculateMovingAverage(this.#shortTermPeriod);
      const longTermMA = this.#calculateMovingAverage(this.#longTermPeriod);
  
      // Check for moving average crossover strategy
      if (shortTermMA && longTermMA) {
        // Buy signal: short-term MA crosses above long-term MA
        if (!this.#stockOwned && shortTermMA > longTermMA) {
          this.buy(currentPrice);
        }
        // Sell signal: short-term MA crosses below long-term MA
        else if (this.#stockOwned && shortTermMA < longTermMA) {
          this.sell(currentPrice);
        }
      }
  
      // Use the 2% drop and 3% rise logic as well
      if (this.#canBuy(currentPrice)) {
        this.buy(currentPrice);
      } else if (this.#canSell(currentPrice)) {
        this.sell(currentPrice);
      } else {
        this.#log("No action taken.");
      }
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
  
    getStatus() {
      return {
        balance: Number(this.#balance).toFixed(2),
        stockOwned: this.#stockOwned,
        stockPriceAtBuy: this.#stockPriceAtBuy,
      };
    }
  
    // Summary method to report total trades and profit
    getSummary() {
      const totalTrades = this.#trades.length; // Number of trades
      const totalProfit = this.#trades.reduce((total, trade) => {
        // Calculate total profit only for sell trades
        return total + (trade.type === 'sell' ? trade.profit : 0);
      }, 0);
  
      return {
        totalTrades,
        totalProfit: totalProfit.toFixed(2), // Format total profit to 2 decimal places
        trades: this.#trades, // Return the array of trades
      };
    }
  }
  
  export default TradingBot;
  