// src/hooks/useGetUserInfo.js
import { useQuery } from '@tanstack/react-query';
import AxiosInstance from '../api/axiosInstance';

export const useGetUserInfo = (enabled = false) => {
    return useQuery({
        queryKey: ['userInfo'],
        queryFn: async () => {
            // Because AxiosInstance automatically attaches the token (via interceptors),
            // we can simply do this:
            const response = await AxiosInstance.get('/api/user/info');
            return response.data;
        },
        enabled,
        // These settings ensure the data won't automatically refetch
        // just from time passing or window refocus.
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });
};
