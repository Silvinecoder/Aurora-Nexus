import axios from 'axios';

const baseURL = 'http://127.0.0.1:5000';

const axiosInstance = axios.create({
  baseURL,
});

export const fetchData = async () => {
  try {
    const response = await axiosInstance.get('/categories/products');
    console.log('API Response:', response.data); // Log the API response
    return response.data;
  } catch (error) {
    throw error;
  }
};
