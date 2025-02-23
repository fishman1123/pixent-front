import { useMutation } from "@tanstack/react-query";
import AxiosInstance from "../api/axiosInstance";

export const usePostCollectionCheck = () => {
  return useMutation({
    mutationFn: async (uuid) => {
      const response = await AxiosInstance.post(
        `/api/user/report/${uuid}`,
        null,
        {
          headers: { "Cache-Control": "no-cache" }, // 캐시 방지
        },
      );
      return response.data;
    },
  });
};
