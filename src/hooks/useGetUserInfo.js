// src/hooks/useGetUserInfo.js
import { useSuspenseQuery } from "@tanstack/react-query";
import AxiosInstance from "../api/axiosInstance";

export const useGetUserInfo = (enabled = true) => {
  return useSuspenseQuery({
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
