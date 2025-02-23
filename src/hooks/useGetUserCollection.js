// src/hooks/useGetUserCollection.js
import { useQuery } from "@tanstack/react-query";
import AxiosInstance from "../api/axiosInstance";

export const useGetUserCollection = (enabled = false) => {
  return useQuery({
    queryKey: ["userCollection"],
    queryFn: async () => {
      const response = await AxiosInstance.get("/api/user/report/collection");
      return response.data;
    },
    // Optionally pass the `enabled` param if you want to conditionally fetch
    enabled,
    // Example config:
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
