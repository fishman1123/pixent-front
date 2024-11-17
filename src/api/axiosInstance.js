// src/api/axiosInstance.js

import axios from 'axios';
import config from '../config';
import { setRecoil } from 'recoil-nexus'; // Import setRecoil
import { errorModalAtom } from '../recoil/errorModalAtom'; // Import your errorModalAtom

// Create a singleton Axios instance
const AxiosInstance = axios.create({
    baseURL: config.API_BASE_URL,
});

AxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        let errorMessage = '';

        if (error.response) {
            console.error('Server Error:', error.response.data);
            errorMessage = error.response.data.message || 'Server Error';
        } else if (error.request) {
            console.error('Network Error:', error.request);
            errorMessage = 'Network Error: Please check your connection.';
        } else {
            console.error('Error:', error.message);
            errorMessage = 'An unexpected error occurred.';
        }

        return Promise.reject(error);
    }
);

export default AxiosInstance;
