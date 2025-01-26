import axios from 'axios';
import config from '../config';

// Import your store and the logout action
import { store } from '../store';
import { logout } from '../store/authSlice';

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

// Handle 401 or 403 => log out globally
AxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status;

        if (status === 401 || status === 403) {
            console.warn(`${status} => removing token + dispatching logout()`);
            localStorage.removeItem('gToken');

            // Dispatch the logout action to update Redux
            store.dispatch(logout());
        }

        return Promise.reject(error);
    }
);

export default AxiosInstance;
