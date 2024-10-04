import axios from "axios";

// Create the API configuration
const api = axios.create({
  baseURL: process.env.API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Define GET request
export const apiGetRequest = async (endpoint, params = {}) => {
  try {
    const response = await api.get(endpoint, { params });
    return response.data;
  } catch (err) {
    console.error("Error making GET request:", err.message);
    throw err;
  }
};
