import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  citrus: 0,
  floral: 0,
  woody: 0,
  musk: 0,
  fruity: 0,
  spicy: 0,
  feedbackElement: [
    { elementName: "", elementRatio: 0 },
    { elementName: "", elementRatio: 0 },
  ],
};

const feedbackPostSlice = createSlice({
  name: "feedbackPost",
  initialState,
  reducers: {
    setAttribute: (state, action) => {
      const { key, value } = action.payload;
      if (key in state && state[key] !== value) {
        state[key] = value;
      }
    },
    updateFeedbackElement: (state, action) => {
      const { index, elementName, elementRatio } = action.payload;
      if (state.feedbackElement[index]) {
        if (elementName !== undefined)
          state.feedbackElement[index].elementName = elementName;
        if (elementRatio !== undefined)
          state.feedbackElement[index].elementRatio = elementRatio;
      }
    },
    addFeedbackElement: (state, action) => {
      const { elementName, elementRatio } = action.payload;

      // Check if the element already exists
      const existingIndex = state.feedbackElement.findIndex(
        (el) => el.elementName === elementName,
      );
      if (existingIndex !== -1) {
        // If it exists, update its ratio
        state.feedbackElement[existingIndex].elementRatio = elementRatio;
      } else {
        // Find an empty slot and assign the element
        const emptyIndex = state.feedbackElement.findIndex(
          (el) => el.elementName === "",
        );
        if (emptyIndex !== -1) {
          state.feedbackElement[emptyIndex].elementName = elementName;
          state.feedbackElement[emptyIndex].elementRatio = elementRatio;
        }
      }
    },
    removeFeedbackElement: (state, action) => {
      state.feedbackElement.splice(action.payload, 1);
    },
    resetFeedback: () => {
      return { ...initialState };
    },
  },
});

export const {
  setAttribute,
  updateFeedbackElement,
  addFeedbackElement,
  removeFeedbackElement,
  resetFeedback,
} = feedbackPostSlice.actions;

export default feedbackPostSlice.reducer;
