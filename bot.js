import fetchStockPrice from "./utils/fetchStockPrice.js";

const startMonitering = async () => {
  // fetch stock price
  const stockPrice = await fetchStockPrice();
  console.log("stock price-------", stockPrice);
};

export default startMonitering;
