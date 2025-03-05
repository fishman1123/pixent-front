// src/hooks/useGetRequestLimit.js
import { useQuery } from "@tanstack/react-query";
import AxiosInstance from "../api/axiosInstance";

export const useGetRequestLimit = () => {
  return useQuery({
    queryKey: ["requestLimit"],
    queryFn: async () => {
      const response = await AxiosInstance.get("/api/user/request_limit");
      return response.data;
    },
    keepPreviousData: false,
    refetchOnWindowFocus: false,
  });
};
