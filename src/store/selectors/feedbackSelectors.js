import { createSelector } from "@reduxjs/toolkit";
import optionData from "../../data/feedbackchoice.json";

export const selectBlendedChartData = createSelector(
  [
    (state) => state.feedback.originalChartData,
    (state) => state.feedback.stepOneRatio,
    (state) => state.feedback.stepTwoSelections,
  ],
  (originalData, changeRatio, stepTwoSelections) => {
    if (
      changeRatio === null ||
      changeRatio === 0 ||
      !stepTwoSelections ||
      !Object.keys(stepTwoSelections.selectedOptions || {}).length
    ) {
      return null;
    }

    const { selectedOptions, percentages } = stepTwoSelections;
    if (!selectedOptions || !Object.keys(selectedOptions).length) {
      return null;
    }

    let totalPickPercent = 0;
    for (const optName of Object.keys(percentages)) {
      totalPickPercent += percentages[optName] || 0;
    }
    if (totalPickPercent <= 0) {
      return null;
    }

    const dims = ["citrus", "floral", "woody", "musk", "fruity", "spicy"];
    const picksAverages = {
      citrus: 0,
      floral: 0,
      woody: 0,
      musk: 0,
      fruity: 0,
      spicy: 0,
    };

    for (const noteName of Object.keys(selectedOptions)) {
      const picksForThisNote = selectedOptions[noteName] || [];
      picksForThisNote.forEach((pickName) => {
        const pickObj = optionData.find((od) => od.name === pickName);
        if (!pickObj) return;

        const userPct = percentages[pickName] || 0;
        dims.forEach((dim) => {
          picksAverages[dim] += (pickObj[dim] * userPct) / 100;
        });
      });
    }

    const blendedData = { ...originalData };
    for (const dim of dims) {
      blendedData[dim] = originalData[dim] + picksAverages[dim];
    }

    return blendedData;
  },
);
