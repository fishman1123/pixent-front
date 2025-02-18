// src/components/feedback/FeedBackPage.jsx

import { useLocation } from "react-router-dom";
import { Summarychart } from "../result/SummaryChart.jsx";
import { StepOne } from "../feedback/StepOne";
import { StepTwo } from "../feedback/StepTwo";
import { StepThree } from "../feedback/StepThree";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOriginalChartData } from "../../store/feedbackSlice.js";

export const FeedBackPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const subId = location.state?.subId;
  const perfumeName = location.state?.perfumeName;
  console.log("we got it:", subId);
  console.log("we got this too:", perfumeName);

  // Step state (0 -> 1 -> 2)
  const [step, setStep] = useState(0);

  // Pull stepOneRatio (user-chosen ratio) from Redux
  const stepOneRatio = useSelector((state) => state.feedback.stepOneRatio) || 0;

  // Pull Step Two data from Redux
  const { percentages, selectedOptions } = useSelector(
    (state) => state.feedback.stepTwoSelections,
  );

  // Sum of assigned percentages
  const selectedOption = Object.values(percentages).reduce(
    (sum, val) => sum + val,
    0,
  );

  // leftover: how many % still needed to fill
  const leftover = Math.max(stepOneRatio - selectedOption, 0);

  // bigNumber: base leftover plus assigned ratio, capped at 100
  const bigNumber = Math.min(100, 100 - stepOneRatio + selectedOption);

  // Local state for storing the chosen note's name (as a string)
  const [selectedNote, setSelectedNote] = useState("");

  // Dummy data for demonstration
  const dummydataforfeed = {
    user_uuid: "10101010",
    id: 451,
    userName: "카리나",
    perfumeName: "AC'SCENT17",
    mainNote: "레몬페퍼",
    middleNote: "인센스",
    baseNote: "오리스",
    userImageUrl:
      "https://pixent-image.s3.ap-northeast-2.amazonaws.com/user/2025-02-05-16-15-28-asdasd.jpg",
    citrus: 10,
    floral: 10,
    woody: 70,
    musk: 10,
    fruity: 10,
    spicy: 70,
    uuid: "xxxxxxxxx",
    hasfeedback: true,
    hasCollection: true,
    createdAt: "2025-02-05T00:00:00.000Z",
  };

  // Format purchase date
  const createdAtString = new Date(
    dummydataforfeed.createdAt,
  ).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Store original chart data in Redux on mount
  useEffect(() => {
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
  }, [dispatch]);

  // Step navigation
  const nextStep = (noteName) => {
    // noteName is guaranteed to be a string from StepTwo now
    console.log("DEBUG => nextStep received:", noteName);

    // If we're on Step 1 => Step 2, store the chosen note name
    if (step === 1) {
      setSelectedNote(noteName);
    }

    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => (prev > 0 ? prev - 1 : 0));
  };

  // Only show leftover UI if user chose a ratio in Step One
  const shouldShowUI = stepOneRatio > 0;

  return (
    <div className="flex-col min-h-screen w-full pt-[10px] px-4 scrollbar-hide">
      <h1 className="text-center text-xl font-bold text-black">
        피드백 작성하기
      </h1>

      <div className="rounded-md bg-white p-4 mb-4">
        <div className="flex justify-between">
          {/* Perfume Info */}
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-black">{perfumeName}</h2>

            {/* Slide-down area */}
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

          {/* Big number on right */}
          <div
            className={`transition-all duration-500 overflow-hidden flex items-center ${
              shouldShowUI ? "max-h-32" : "max-h-0"
            }`}
          >
            <p className="text-[54px] text-black font-bold">{bigNumber}%</p>
          </div>
        </div>

        {/* Summary Chart */}
        <Summarychart
          inputCitrus={dummydataforfeed.citrus}
          inputFloral={dummydataforfeed.floral}
          inputWoody={dummydataforfeed.woody}
          inputMusk={dummydataforfeed.musk}
          inputSpicy={dummydataforfeed.spicy}
          inputFresh={dummydataforfeed.fruity}
        />
      </div>

      {/* Step Slider */}
      <div className="overflow-hidden w-full relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${step * 100}%)` }}
        >
          {/* Step 1 */}
          <div className="w-full shrink-0">
            <StepOne onNext={nextStep} />
          </div>

          {/* Step 2 */}
          <div className="w-full shrink-0">
            <StepTwo onBack={prevStep} />
          </div>

          {/* Step 3 */}
          <div className="w-full shrink-0">
            <StepThree />
          </div>
        </div>
      </div>

      {/* Optional UI */}
      <div className="mt-6 text-center">
        {shouldShowUI && (
          <p className="text-gray-700 text-sm">
            현재까지 할당된 수정 비율(전체 합): {selectedOption}%
          </p>
        )}
      </div>
    </div>
  );
};
