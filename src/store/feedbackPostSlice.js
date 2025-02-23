import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  citrus: 0,
  floral: 0,
  woody: 0,
  musk: 0,
  fruity: 0,
  spicy: 0,
  feedbackElement: [
    { elementName: "string", elementRatio: 0 },
    { elementName: "string", elementRatio: 0 },
    { elementName: "string", elementRatio: 0 },
  ],
};

const feedbackPostSlice = createSlice({
  name: "feedbackPost",
  initialState,
  reducers: {
    setAttribute: (state, action) => {
      const { key, value } = action.payload;
      if (key in state) {
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
      state.feedbackElement.push(action.payload);
    },
    removeFeedbackElement: (state, action) => {
      state.feedbackElement.splice(action.payload, 1);
    },
    resetFeedback: () => initialState,
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
