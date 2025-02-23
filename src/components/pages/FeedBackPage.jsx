// src/components/feedback/FeedBackPage.jsx

import { useLocation } from "react-router-dom";
import { Summarychart } from "../result/SummaryChart.jsx";
import { StepOne } from "../feedback/StepOne";
import { StepTwo } from "../feedback/StepTwo";
import { StepThree } from "../feedback/StepThree";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOriginalChartData } from "../../store/feedbackSlice.js";

// 1) The new Suspense-based hook
import { useNewGetReportByUuid } from "../../hooks/useNewGetReportByUuid";

export const FeedBackPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  // subId & optional perfumeName from route state
  const subId = location.state?.subId;
  const routePerfumeName = location.state?.perfumeName;

  // 2) Unconditionally call our Suspense hook. Must be inside a <Suspense> boundary.
  const { data: reportData } = useNewGetReportByUuid(subId);

  // 3) We'll store the reconstructed dummy object in state
  const [dummydataforfeed, setDummydataforfeed] = useState(null);

  // 4) Reconstruct once we have the server data
  useEffect(() => {
    if (!reportData) return; // Typically won't happen if Suspense ensures data is loaded

    console.log("Fetched reportData via Suspense:", reportData);

    // Provide a fallback date if 'createdAt' is missing
    const safeDate = reportData.createdAt || "2025-02-05T00:00:00.000Z";

    // Build the dummy shape
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

    console.log("Reconstructed dummydataforfeed:", reconstructed);
    setDummydataforfeed(reconstructed);
  }, [reportData]);

  // 5) Step and Redux logic. We always call these hooks, even if we don't yet have dummydataforfeed.
  const [step, setStep] = useState(0);

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

  // 6) When dummydataforfeed is updated, store chart data. But we do NOT skip any hooks if it's null.
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

  const nextStep = (noteName) => {
    console.log("DEBUG => nextStep received:", noteName);
    if (step === 1) {
      setSelectedNote(noteName);
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const shouldShowUI = stepOneRatio > 0;

  // 7) Instead of returning early, we conditionally render if dummydataforfeed is null
  let content;

  if (!dummydataforfeed) {
    // Suspense might have loaded 'reportData' but we haven't reconstructed yet
    content = <div>Reconstructing data from the server...</div>;
  } else {
    // We have our dummy object
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
        <div className="rounded-md bg-white p-4 mb-4">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h2 className="text-lg font-bold text-black">
                {finalPerfumeName}
              </h2>

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

          <Summarychart
            inputCitrus={dummydataforfeed.citrus}
            inputFloral={dummydataforfeed.floral}
            inputWoody={dummydataforfeed.woody}
            inputMusk={dummydataforfeed.musk}
            inputSpicy={dummydataforfeed.spicy}
            inputFresh={dummydataforfeed.fruity}
          />
        </div>

        <div className="overflow-hidden w-full relative">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${step * 100}%)` }}
          >
            <div className="w-full shrink-0">
              <StepOne onNext={nextStep} />
            </div>
            <div className="w-full shrink-0">
              <StepTwo onBack={prevStep} />
            </div>
            <div className="w-full shrink-0">
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

  // 8) Return everything. All hooks were called unconditionally above.
  return (
    <div className="flex-col min-h-screen w-full pt-[10px] px-4 scrollbar-hide">
      {content}
    </div>
  );
};
