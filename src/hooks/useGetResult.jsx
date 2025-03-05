// src/hooks/useGetResults.js
import { useQuery } from "@tanstack/react-query";
import AxiosInstance from "../api/axiosInstance";

export const useGetResults = (page, size) => {
  return useQuery({
    queryKey: ["results", page, size],
    queryFn: async () => {
      const response = await AxiosInstance.get(
        `/api/result?page=${page}&size=${size}&sort=id,asc`,
      );
      return response.data;
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};
