import axios from 'axios';

const baseURL = 'http://127.0.0.1:5000';

const axiosInstance = axios.create({
  baseURL,
});

export const fetchData = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};
