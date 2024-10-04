import axios from "axios";

const fetchStockPrice = async () => {
  try {
    const response = await axios.get(`http://localhost:${port}/api/stock-price`);
    console.log(response);
    return parseFloat(response.data.price);
  } catch (error) {
    console.error("Error fetching stock price:", error.message);
    return null;
  }
};

export default fetchStockPrice;
