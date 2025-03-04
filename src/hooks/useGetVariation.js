// src/hooks/useGetVariation.js
import { useQuery } from "@tanstack/react-query";
import AxiosInstance from "../api/axiosInstance";

export const useGetVariation = (reportId) => {
  return useQuery({
    queryKey: ["feedback", reportId],
    queryFn: async () => {
      const response = await AxiosInstance.get(`/api/user/report/${reportId}`);
      return response.data;
    },
    enabled: !!reportId, // Only run if reportId is truthy
    refetchOnWindowFocus: false, // Prevent auto-refetch on window focus
  });
};
