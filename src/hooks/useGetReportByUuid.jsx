import { useQuery } from '@tanstack/react-query';
import AxiosInstance from '../api/axiosInstance';

export const useGetReportByUuid = (uuid) => {
    return useQuery({
        queryKey: ['report', uuid],
        queryFn: async () => {
            const response = await AxiosInstance.get(`/api/result/${uuid}`);
            return response.data;
        },
        enabled: !!uuid,
        retry: 2,
        refetchOnWindowFocus: false,
    });
};
