// src/hooks/useNewGetReportByUuid.js
import { useSuspenseQuery } from "@tanstack/react-query";
import AxiosInstance from "../api/axiosInstance";

export function useNewGetReportByUuid(uuid) {
  // If uuid is falsy, you may want to handle that or skip the query.
  return useSuspenseQuery({
    queryKey: ["reportByUuid", uuid],
    queryFn: async () => {
      // Perform your GET request
      const response = await AxiosInstance.get(`/api/result/${uuid}`);
      return response.data;
    },
    enabled: !!uuid, // Only fetch if uuid is truthy
    refetchOnWindowFocus: false,
  });
}
