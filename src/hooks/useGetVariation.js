// src/hooks/useGetVariation.js
import { useSuspenseQuery } from "@tanstack/react-query";
import AxiosInstance from "../api/axiosInstance";

export function useGetVariation(reportId) {
  return useSuspenseQuery({
    queryKey: ["feedback", reportId],
    queryFn: async () => {
      const response = await AxiosInstance.get(`/api/user/report/${reportId}`);
      return response.data;
    },
    enabled: !!reportId,
    refetchOnWindowFocus: false,
  });
}
