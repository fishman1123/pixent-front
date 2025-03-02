import { useMutation } from "@tanstack/react-query";
import AxiosInstance from "../api/axiosInstance";

export const usePostCreateVariant = () => {
  return useMutation({
    mutationFn: async ({ adminPW, reportId }) => {
      const response = await AxiosInstance.post("/api/user/report/variation", {
        adminPW,
        reportId,
      });
      return response.data;
    },
    onSuccess: (data) => {},
    onError: (error) => {},
  });
};
