import axios from "axios";

//creating api configuration
const api = axios.create({
  baseURL: process.env.API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiGetRequest = async (endpoint, params = {}) => {
  try {
    const response = await api.get(endpoint, { params });
    return response.data;
  } catch (err) {
    console.error("Erroe making get request", err.message);
  }
};
