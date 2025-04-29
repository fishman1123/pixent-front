// src/hooks/useGetRequestList.js
import { useQuery } from "@tanstack/react-query";
import AxiosInstance from "../api/axiosInstance";

export const useGetRequestList = (page, size) => {
  return useQuery({
    queryKey: ["requests", page, size],
    queryFn: async () => {
      const response = await AxiosInstance.get(
        `/api/user?page=${page}&size=${size}&sort=requestedLimit,desc`,
      );
      return response.data;
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};
