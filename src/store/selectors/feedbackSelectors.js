import { createSelector } from "@reduxjs/toolkit";
import optionData from "../../data/feedbackchoice.json";

export const selectBlendedChartData = createSelector(
  [
    (state) => state.feedback.originalChartData,
    (state) => state.feedback.stepOneRatio, // 변경 가능한 최대 비율 (e.g. 80%)
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

    // 1) 사용자가 할당한 퍼센트 합계 계산 (이 합계는 changeRatio를 넘을 수 없음)
    let totalPickPercent = 0;
    for (const optName of Object.keys(percentages)) {
      totalPickPercent += percentages[optName] || 0;
    }
    if (totalPickPercent <= 0) {
      return null;
    }

    // 2) 선택된 향들의 기여도 계산
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
          // 각 향의 기여도를 직접 더함 (이미 퍼센트 단위)
          picksAverages[dim] += (pickObj[dim] * userPct) / 100;
        });
      });
    }

    // 3) 최종 결과 계산
    const blendedData = { ...originalData }; // 기존 향 값으로 시작

    for (const dim of dims) {
      // 새로운 향들의 기여도를 기존 값에 더함
      blendedData[dim] = originalData[dim] + picksAverages[dim];
    }

    return blendedData;
  },
);
