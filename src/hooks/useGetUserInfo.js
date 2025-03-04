// src/hooks/useGetUserInfo.js
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import AxiosInstance from "../api/axiosInstance";

export const useGetUserInfo = (enabled = true) => {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      const response = await AxiosInstance.get("/api/user/info");
      return response.data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled, // don't run if enabled = false
  });
};
