import axios from 'axios';

const baseURL = 'http://127.0.0.1:5000';

const axiosInstance = axios.create({
  baseURL,
});

<<<<<<< HEAD
export const fetchData = async () => {
  try {
    const response = await axiosInstance.get('/categories/products');
    console.log('API Response:', response.data); // Log the API response
=======
export const fetchData = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint);
>>>>>>> main
    return response.data;
  } catch (error) {
    throw error;
  }
};
