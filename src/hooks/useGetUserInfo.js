// src/hooks/useGetUserInfo.js
import { useQuery } from '@tanstack/react-query';
import AxiosInstance from '../api/axiosInstance';

export const useGetUserInfo = (enabled = false) => {
    return useQuery({
        queryKey: ['userInfo'],
        queryFn: async () => {
            const response = await AxiosInstance.get('/api/user/info');
            return response.data;
        },
        enabled,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false, // Don't auto-refetch if cached
    });
};
