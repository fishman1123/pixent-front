import { useMutation } from "@tanstack/react-query";
import AxiosInstance from "../api/axiosInstance";

export const usePostLikeStatusCheck = () => {
  return useMutation({
    mutationFn: async (uuid) => {
      const response = await AxiosInstance.post(
        `/api/user/report/${uuid}/like`,
        null,
        {
          headers: { "Cache-Control": "no-cache" }, // 캐시 방지
        },
      );
      return response.data;
    },
  });
};
