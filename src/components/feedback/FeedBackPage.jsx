import { useLocation } from "react-router-dom";
import { SummaryChart } from "../result/SummaryChart.jsx";
import { StepOne } from "./StepOne.jsx";
import { StepTwo } from "./StepTwo.jsx";
import { StepThree } from "./StepThree.jsx";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux actions
import { resetFeedback } from "../../store/feedbackPostSlice";
import {
  resetStepTwoSelections,
  setOriginalChartData,
} from "../../store/feedbackSlice.js";

// Hooks
import { useNewGetReportByUuid } from "../../hooks/useNewGetReportByUuid";
import { useGetReportByUuid } from "../../hooks/useGetReportByUuid.jsx";

export const FeedBackPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  // Retrieve subId/perfumeName from route state
  const subId = location.state?.subId;
  const routePerfumeName = location.state?.perfumeName;

  // Use your custom hook to get the report data
  const { data: reportData } = useGetReportByUuid(subId);

  // Local state to store a “dummy” version of that data
  const [dummydataforfeed, setDummydataforfeed] = useState(null);

  // On fetch success, build the shape you need
  useEffect(() => {
    if (!reportData) return;

    const safeDate = reportData.createdAt || "2025-02-05T00:00:00.000Z";

    const reconstructed = {
      user_uuid: reportData.userId ?? "UnknownUUID",
      id: reportData.id ?? 0,
      userName: reportData.userName ?? "UnknownUser",
      perfumeName: reportData.perfumeName ?? "UnknownPerfume",
      mainNote: reportData.mainNote ?? "",
      middleNote: reportData.middleNote ?? "",
      baseNote: reportData.baseNote ?? "",
      userImageUrl: reportData.userImageUrl ?? "",
      citrus: reportData.citrus ?? 0,
      floral: reportData.floral ?? 0,
      woody: reportData.woody ?? 0,
      musk: reportData.musk ?? 0,
      fruity: reportData.fruity ?? 0,
      spicy: reportData.spicy ?? 0,
      uuid: reportData.uuid ?? "",
      hasfeedback: reportData.hasFeedback ?? false,
      hasCollection: reportData.collection ?? false,
      createdAt: safeDate,
    };

    setDummydataforfeed(reconstructed);
  }, [reportData]);

  // Local step-based UI
  const [step, setStep] = useState(0);

  // Pull data from Redux
  const stepOneRatio = useSelector((state) => state.feedback.stepOneRatio) || 0;
  const { percentages } = useSelector(
    (state) => state.feedback.stepTwoSelections,
  );

  const selectedOption = Object.values(percentages).reduce(
    (sum, val) => sum + val,
    0,
  );
  const leftover = Math.max(stepOneRatio - selectedOption, 0);
  const bigNumber = Math.min(100, 100 - stepOneRatio + selectedOption);

  const [selectedNote, setSelectedNote] = useState("");

  // Once we have “dummydataforfeed,” also set the original chart data
  useEffect(() => {
    if (!dummydataforfeed) return;
    dispatch(
      setOriginalChartData({
        citrus: dummydataforfeed.citrus,
        floral: dummydataforfeed.floral,
        woody: dummydataforfeed.woody,
        musk: dummydataforfeed.musk,
        fruity: dummydataforfeed.fruity,
        spicy: dummydataforfeed.spicy,
      }),
    );
  }, [dispatch, dummydataforfeed]);

  // Step transitions
  const nextStep = (noteName) => {
    if (step === 1) {
      setSelectedNote(noteName);
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => (prev > 0 ? prev - 1 : 0));
  };

  // Show certain UI elements only if user has a stepOneRatio
  const shouldShowUI = stepOneRatio > 0;

  let content;
  if (!dummydataforfeed) {
    content = <div>Reconstructing data from the server...</div>;
  } else {
    const createdAtString = new Date(
      dummydataforfeed.createdAt,
    ).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const finalPerfumeName = routePerfumeName || dummydataforfeed.perfumeName;

    content = (
      <>
        {/* Perfume info header (fixed) */}
        <div
          className="
            flex justify-between
            border-t border-b border-black
            p-4
            fixed
            top-[88px]
            left-0 right-0
            bg-white
            z-50
          "
        >
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-black">{finalPerfumeName}</h2>

            <div
              className={`transition-all duration-500 overflow-hidden ${
                shouldShowUI ? "max-h-32 mt-2" : "max-h-0"
              }`}
            >
              <p className="text-gray-600 text-sm">
                향을 {leftover}% 더 추가해주세요
              </p>
              <p className="text-gray-600 text-[12px]">
                구매일자: {createdAtString}
              </p>
            </div>
          </div>

          <div
            className={`transition-all duration-500 overflow-hidden flex items-center ${
              shouldShowUI ? "max-h-32" : "max-h-0"
            }`}
          >
            <p className="text-[54px] text-black font-bold">{bigNumber}%</p>
          </div>
        </div>

        {/* Push down the rest of the content so it's not hidden under the fixed header */}
        <div className="mt-[120px] rounded-md bg-white mb-4">
          <div className="p-4">
            <SummaryChart
              inputCitrus={dummydataforfeed.citrus}
              inputFloral={dummydataforfeed.floral}
              inputWoody={dummydataforfeed.woody}
              inputMusk={dummydataforfeed.musk}
              inputSpicy={dummydataforfeed.spicy}
              inputFresh={dummydataforfeed.fruity}
            />
          </div>
        </div>

        {/* Step-based container */}
        <div className="overflow-hidden w-full relative">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${step * 100}%)` }}
          >
            {/* StepOne */}
            <div className="w-full shrink-0 px-4">
              <StepOne onNext={nextStep} />
            </div>

            {/* StepTwo */}
            <div className="w-full shrink-0 px-4">
              <StepTwo onBack={prevStep} reportId={dummydataforfeed.uuid} />
            </div>

            {/* StepThree */}
            <div className="w-full shrink-0 px-4">
              <StepThree />
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          {shouldShowUI && (
            <p className="text-gray-700 text-sm">
              현재까지 할당된 수정 비율(전체 합): {selectedOption}%
            </p>
          )}
        </div>
      </>
    );
  }

  return (
    <div className="flex-col min-h-screen w-full max-w-[520px] pt-[10px] scrollbar-hide">
      {content}
    </div>
  );
};
