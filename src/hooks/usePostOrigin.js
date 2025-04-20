import { useMutation } from '@tanstack/react-query';
import AxiosInstance from '../api/axiosInstance';

export const usePostOrigin = () => {
  return useMutation({
    mutationFn: async selectedOrigin => {
      const response = await AxiosInstance.post('/api/empty', selectedOrigin, {
        headers: {
          'Content-Type': 'text/plain',
        },
      });
      return response.data;
    },
  });
};
