import { useQuery } from "@tanstack/react-query";
import AxiosInstance from "../api/axiosInstance";

export const useGetFreeReportByUuid = (uuid) => {
  return useQuery({
    queryKey: ["freeReport", uuid],
    queryFn: async () => {
      const response = await AxiosInstance.get(`/api/free/result/${uuid}`);
      return response.data;
    },
    enabled: !!uuid,
    refetchOnWindowFocus: false,
  });
}; 