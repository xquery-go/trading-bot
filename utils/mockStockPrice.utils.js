const getMockStockPrice = () => {
  return (Math.random() * (200 - 100) + 100).toFixed(2);
};

export default getMockStockPrice;
