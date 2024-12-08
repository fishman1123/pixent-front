// src/hooks/useDeleteResult.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AxiosInstance from '../api/axiosInstance';

export const useDeleteResult = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (uuid) => {
            await AxiosInstance.delete(`/api/result/${uuid}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['results']);
        },
    });
};
