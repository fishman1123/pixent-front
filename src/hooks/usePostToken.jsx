import { useMutation } from '@tanstack/react-query';
import AxiosInstance from '../api/axiosInstance';

export const usePostToken = () => {
    return useMutation({
        mutationFn: async () => {
            const response = await AxiosInstance.post(
                '/api/auth/refresh',
                null,
                { withCredentials: true }
            );

            if (response.status !== 200) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const authHeader = response.headers['authorization'];
            let accessToken = null;
            if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
                accessToken = authHeader.slice('bearer '.length).trim();
            }

            return accessToken;
        }
    });
};
