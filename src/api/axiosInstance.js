// src/api/axiosInstance.js

import axios from 'axios';
import config from '../config';
import { authAtom } from '../recoil/authAtoms';
import { setRecoil } from 'recoil-nexus';

const AxiosInstance = axios.create({
    baseURL: config.API_BASE_URL,
});

// Attach token if present
AxiosInstance.interceptors.request.use(
    (request) => {
        const token = localStorage.getItem('gToken');
        if (token) {
            request.headers.Authorization = `Bearer ${token}`;
        }
        return request;
    },
    (error) => Promise.reject(error)
);

// Handle 403 => log out globally
AxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status === 403) {
            console.warn('403 Forbidden => removing token + updating authAtom');
            localStorage.removeItem('gToken');

            // Set isAuthenticated: false
            setRecoil(authAtom, (prev) => ({
                ...prev,
                isAuthenticated: false,
            }));
        }
        return Promise.reject(error);
    }
);

export default AxiosInstance;
