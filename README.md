# Trading Bot

This Trading Bot is an automated application built with Node.js that implements trading strategies based on stock price movements. The bot evaluates stock prices, executes trades based on predefined rules, and tracks its performance, including profit/loss statements.

**Features**

- **Trading Strategies**:
  - **Momentum Trading**: Buys when the stock price drops by 2% and sells when it rises by 3%.
  - **Moving Average Crossover**: Implements short-term and long-term moving averages to generate buy/sell signals based on their crossovers.
  
- **Trade Tracking**: 
  - Keeps track of all trades made, including buy and sell transactions.
  
- **Profit/Loss Calculation**:
  - Calculates the overall profit/loss from trades and provides summary reports.

- **Real-Time Monitoring**:
  - Continuously fetches stock prices at a defined interval and evaluates trades accordingly.

**How to Install**

1. **Clone the Repository**:

```bash
   git clone https://github.com/arun-kumar-1995/trading-bot.git .

```

2. **Folder Structure**:

```bash
├── /configs                    # Configuration files (e.g., environment variables)
│   └── env.config.js           # Environment variable settings
├── /controllers                # Holds related controller function
|     └── app.controller.js      # App related route handler
├── /middlewares                # Holds related middleware function
|     └── err.middleware.js      # Error middleware to catch error
|
├── /services                   # Business logic related to trading
│   └── tradingBot.service.js   # TradingBot class implementation
|    |── api.service.js          # Configured api and custom getApirequest function 
├── /routes                     # routes
|     |── app.routes.js               # defined app routes here
├── /utils                      # Utility functions
│   ├── fetchStockPrice.js      # Function to fetch stock prices
│   |── report.utils.js         # Reporting utility functions for logging status and summary
|   └── reportSummary.utils.js  # Reporting utility functions for summary
|   └── stockPrice.utils.js     # utility functions for getting random stock price
├── bot.js                      # Main application entry point
├── .env                        # define environmental variable here
└── package.json                # Project dependencies and scripts
```

3. **Set Up Environment Variables: Create a .env file in the root directory with the following contents**:

```bash
API_URL=http://localhost:5000
PORT=5000
INITIAL_BALANCE=1000
BUY_THRESHOLD=0.98
SELL_THRESHOLD=1.03
PRICE_RANGE={ min: 100, max: 200 }
API_URL=`http://localhost:${process.env.PORT}`
CHECK_INTERVAL=1000
```

4. **Start server**:

```bash
npm start
```
