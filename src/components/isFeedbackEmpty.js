// src/utils/isFeedbackEmpty.js (for example)
export const isFeedbackEmpty = (feedbackPost) => {
  const { citrus, floral, woody, musk, fruity, spicy, feedbackElement } =
    feedbackPost;

  const hasMajorNote =
    citrus !== 0 ||
    floral !== 0 ||
    woody !== 0 ||
    musk !== 0 ||
    fruity !== 0 ||
    spicy !== 0;

  // Check if feedbackElement array is all empty
  const hasElements = feedbackElement.some((el) => el.elementName !== "");

  return !hasMajorNote && !hasElements;
};
