import { apiGetRequest } from "../services/apiService.js";

const fetchStockPrice = async () => {
  try {
    const response = await apiGetRequest("/app/v1/stock-price");
    return parseFloat(response.data.price);
  } catch (error) {
    console.error("Error fetching stock price:", error.message);
    return null;
  }
};

export default fetchStockPrice;
