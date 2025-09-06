import axios from "axios";

const BASE_URL = "http://localhost:3001"; // JSON Server port

// Get all products
export const getProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products", error);
    // Return mock data if API is not available
    return [
      {
        id: 1,
        name: "Organic Apples",
        price: 2.99,
        image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        rating: 4.5
      },
      {
        id: 2,
        name: "Fresh Avocados",
        price: 3.49,
        image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        rating: 4.8
      }
    ];
  }
};

// Get single product
export const getProduct = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product", error);
    throw error;
  }
};

// Create order
export const createOrder = async (orderData: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/orders`, orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order", error);
    throw error;
  }
};