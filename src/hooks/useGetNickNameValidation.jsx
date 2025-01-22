// src/hooks/useGetNickNameValidation.js
import { useQuery } from '@tanstack/react-query';
import AxiosInstance from '../api/axiosInstance';

export const useGetNickNameValidation = (accessToken, enabled = false) => {
    return useQuery({
        queryKey: ['nickNameValidation'],
        queryFn: async () => {
            const response = await AxiosInstance.get('/api/user/username', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true,
            });
            return response.data;
        },
        enabled,
    });
};
