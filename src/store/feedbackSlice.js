// src/features/feedbackSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Holds the original chart data from the dummy feed
  originalChartData: {
    citrus: 0,
    floral: 0,
    woody: 0,
    musk: 0,
    fruity: 0,
    spicy: 0,
  },

  // StepOne ratio data (0, 10, 30, 50, 70, 100) - Ensure minimum of 10%
  stepOneRatio: null,

  // StepTwo object: { selectedOptions: {noteName: [optionName, ...]}, percentages: {optionName: number}}
  stepTwoSelections: {
    selectedOptions: {},
    percentages: {},
  },
};

export const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setOriginalChartData: (state, action) => {
      state.originalChartData = action.payload;
    },
    setStepOneRatio: (state, action) => {
      state.stepOneRatio = Math.max(10, action.payload); // Prevent ratio from being below 10%
    },
    setStepTwoSelections: (state, action) => {
      state.stepTwoSelections = action.payload; // { selectedOptions, percentages }
    },
    resetStepTwoSelections: (state) => {
      state.stepTwoSelections = { selectedOptions: {}, percentages: {} }; // Clear selections
    },
  },
});

export const {
  setOriginalChartData,
  setStepOneRatio,
  setStepTwoSelections,
  resetStepTwoSelections, // Export reset action
} = feedbackSlice.actions;

export default feedbackSlice.reducer;
