import { useQueries } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance.js";

const fetchVariationByUuid = async (uuid) => {
  const response = await axiosInstance.get(
    `/api/user/report/${uuid}/variation`,
  );
  return response.data;
};

export const useGetSecondCollection = (uuidList) => {
  // Ensure `useQueries` is always called with a stable structure
  const queries = useQueries({
    queries:
      uuidList.length > 0
        ? uuidList.map((uuid) => ({
            queryKey: ["secondCollection", uuid],
            queryFn: () => fetchVariationByUuid(uuid),
            staleTime: 1000 * 60 * 5,
          }))
        : [
            {
              queryKey: ["secondCollection", "empty"],
              queryFn: async () => [],
              staleTime: Infinity,
            },
          ],
  });

  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => query.isError);
  const error = queries.find((query) => query.isError)?.error;

  const data = queries
    .map((query) => query.data)
    .filter(Boolean)
    .flat();

  return { data, isLoading, isError, error };
};
