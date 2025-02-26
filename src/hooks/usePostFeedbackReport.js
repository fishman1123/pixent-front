import { useMutation } from "@tanstack/react-query";
import AxiosInstance from "../api/axiosInstance";
import { useSelector, useStore } from "react-redux";

export function usePostFeedbackReport() {
  const store = useStore(); // Access the entire Redux store when needed

  return useMutation({
    mutationFn: async (reportId) => {
      if (!reportId) {
        throw new Error("reportId is required.");
      }

      // Get the latest Redux state at mutation time
      const state = store.getState();
      const feedbackData = state.feedbackPost;

      // Format feedback data
      const formattedFeedbackData = {
        citrus: feedbackData.citrus,
        floral: feedbackData.floral,
        woody: feedbackData.woody,
        musk: feedbackData.musk,
        fruity: feedbackData.fruity,
        spicy: feedbackData.spicy,
        feedbackElement: feedbackData.feedbackElement
          .filter((el) => el.elementName !== "") // Exclude empty placeholders
          .map((el) => ({
            elementName: el.elementName,
            elementRatio: el.elementRatio,
          })),
      };

      // Log data being sent
      console.log(
        "📤 Sending feedback data to server:",
        JSON.stringify(formattedFeedbackData, null, 2),
      );

      try {
        // POST request
        const response = await AxiosInstance.post(
          `/api/user/report/${reportId}/feedback`,
          formattedFeedbackData,
        );

        // Log received response
        console.log("📥 Received response from server:", response.data);

        return response.data;
      } catch (error) {
        console.error(
          "❌ Error sending feedback data:",
          error.response?.data || error.message,
        );
        throw error;
      }
    },
  });
}
