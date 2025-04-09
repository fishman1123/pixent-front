import axios from "axios";
import config from "../config";

// Import your store and the logout action
import { store } from "../store";
import { logout } from "../store/authSlice";
import { openErrorModal } from "../store/errorModalSlice";

const AxiosInstance = axios.create({
  // baseURL: config.API_BASE_URL,
  // baseURL: `https://perfume-maker-dev.pixent.co.kr/`,
  baseURL: `https://perfume-maker.pixent.co.kr/`,
});

// Attach token if present
AxiosInstance.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("gToken");
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => Promise.reject(error),
);

// Handle 401 or 403 => log out globally
AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const token = localStorage.getItem("gToken");

    // Check if the request requires authentication
    const isAuthRequired = error?.config?.url?.includes("/secured/") || 
                         error?.config?.url?.includes("/admin/");

    if (isAuthRequired && !token) {
      // If auth is required but no token exists
      store.dispatch(openErrorModal({
        message: "로그인이 필요합니다. 로그인 후 이용해주세요.",
        redirectTo: "/login"
      }));
      return Promise.reject(error);
    }

    if (status === 401 || status === 403) {
      console.warn(`${status} => removing token + dispatching logout()`);
      localStorage.removeItem("gToken");

      // Dispatch the logout action to update Redux
      store.dispatch(logout());
      
      // Show error modal
      store.dispatch(openErrorModal({
        message: "세션이 만료되었습니다. 다시 로그인해주세요.",
        redirectTo: "/login"
      }));
    }

    return Promise.reject(error);
  },
);

export default AxiosInstance;
