import { useQuery } from "@tanstack/react-query";
import AxiosInstance from "../api/axiosInstance";

export const useGetReportFeedback = (reportId) => {
  return useQuery({
    queryKey: ["feedback", reportId],
    queryFn: async () => {
      const response = await AxiosInstance.get(
        `/api/user/report/${reportId}/feedback`,
      );
      console.log("what are you? : ", response.data);
      return response.data;
    },
    // Only run query if 'reportId' has a value
    enabled: !!reportId,
    refetchOnWindowFocus: false,
  });
};
