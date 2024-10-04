import { PRICE_RANGE } from "../configs/env.config.js";

const getMockStockPrice = () => {
    return (
      Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min) +
      PRICE_RANGE.min
    ).toFixed(2);
  };

export default getMockStockPrice;
