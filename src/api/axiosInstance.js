// src/api/axiosInstance.js

import axios from 'axios';
import config from '../config'; // Ensure this path is correct

// Create a singleton Axios instance
const AxiosInstance = axios.create({
    baseURL: config.API_BASE_URL, // Define API_BASE_URL in your config
    headers: {
        'Content-Type': 'application/json', // Adjust as needed
    },
    // You can add other default configurations like timeout, etc.
    // timeout: 10000, // 10 seconds timeout
});



// Optional: Add response interceptors
AxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle global response errors
        if (error.response && error.response.status === 401) {
            // For example, redirect to login on unauthorized
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default AxiosInstance;
