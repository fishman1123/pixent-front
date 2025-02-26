import { useMutation } from "@tanstack/react-query";
import AxiosInstance from "../api/axiosInstance";

export const usePostCreateVariant = () => {
  return useMutation({
    mutationFn: async ({ adminPW, reportId }) => {
      const response = await AxiosInstance.post("/api/user/report/feedback", {
        adminPW,
        reportId,
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log("✅ Feedback successfully posted:", data);
    },
    onError: (error) => {
      console.error("❌ Error posting feedback:", error);
    },
  });
};
