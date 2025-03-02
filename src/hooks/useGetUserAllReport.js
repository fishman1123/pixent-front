// src/hooks/useGetUserAllReport.js
import { useQuery } from "@tanstack/react-query";
import AxiosInstance from "../api/axiosInstance";

export const useGetUserAllReport = (enabled = false) => {
  return useQuery({
    queryKey: ["userAllReport"],
    queryFn: async () => {
      const response = await AxiosInstance.get("/api/user/report");
      // console.log("Fetched userAllReport:", response.data);
      return response.data;
    },
    enabled,

    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
