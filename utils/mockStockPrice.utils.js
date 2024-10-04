import { PRICE_RANGE } from "../configs/env.config.js";

const getStockPrice = () => {
    return (
      Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min) +
      PRICE_RANGE.min
    ).toFixed(2);
  };

export default getStockPrice;
