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

    // 사용자가 선택한 옵션들의 값을 계산
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

    // 변경: 원향 비율을 적용하는 방식 수정
    // changeRatio가 20%이면 원향을 80%로 유지해야 함
    const originalRatio = (100 - changeRatio) / 100; // 예: 20%면 0.8이 됨

    const blendedData = {};
    for (const dim of dims) {
      // 원향에 수정된 비율 적용 (예: 80 * 0.8 = 64)
      const scaledOriginalValue = originalData[dim] * originalRatio;
      // 원향 비율을 적용한 값 + 추가 향들의 값
      blendedData[dim] = scaledOriginalValue + picksAverages[dim];
    }
    // console.log("checking suchi: ", blendedData);

    return blendedData;
  },
);
