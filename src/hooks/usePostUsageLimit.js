import { useMutation } from '@tanstack/react-query';
import AxiosInstance from '../api/axiosInstance';

export const usePostUsageLimit = () => {
  return useMutation({
    mutationFn: async userId => {
      const response = await AxiosInstance.post('/api/user/usage_limit', {
        userId,
      });
      return response.data;
    },
  });
};
