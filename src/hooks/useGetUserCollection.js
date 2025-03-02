// src/hooks/useGetUserCollection.js
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import AxiosInstance from "../api/axiosInstance";

export const useGetUserCollection = () => {
  return useSuspenseQuery({
    queryKey: ["userCollection"],
    queryFn: async () => {
      const response = await AxiosInstance.get("/api/user/report/collection");
      return response.data;
    },
    staleTime: Infinity, // Data remains fresh indefinitely
    refetchOnWindowFocus: true, // Refetch when user returns to the page
    refetchOnMount: true, // Ensure fresh data on mount
  });
};

export const refreshUserCollection = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries(["userCollection"]);
};
