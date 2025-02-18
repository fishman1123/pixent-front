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

  // Pulled from route state
  const subId = location.state?.subId;
  const perfumeName = location.state?.perfumeName;
  console.log("we got it: ", subId);
  console.log("we got this too: ", perfumeName);

  // Step state (0 -> 1 -> 2)
  const [step, setStep] = useState(0);

  // 1) Pull stepOneRatio (the user-chosen ratio in Step One) from Redux
  const stepOneRatio = useSelector((state) => state.feedback.stepOneRatio) || 0;

  // 2) Pull Step Two data from Redux
  const { percentages, selectedOptions } = useSelector(
    (state) => state.feedback.stepTwoSelections,
  );

  // 3) The sum of all assigned percentages in Step Two
  const selectedOption = Object.values(percentages).reduce(
    (sum, val) => sum + val,
    0,
  );

  // 4) leftover: how many % still need to be added to reach the chosen ratio from Step One
  const leftover = Math.max(stepOneRatio - selectedOption, 0);

  // 5) bigNumber: (100 - stepOneRatio) + selectedOption, capped at 100
  //    If user picks 30% => we start at 70%. As user adds ratio, it climbs up to 100% max
  const bigNumber = Math.min(100, 100 - stepOneRatio + selectedOption);

  // Local state for storing an emphasized note from Step Two (if needed)
  const [selectedNote, setSelectedNote] = useState(null);

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

  // Format createdAt as desired (e.g., "2025년 2월 5일")
  const createdAtString = new Date(
    dummydataforfeed.createdAt,
  ).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // On mount, store original chart data in Redux
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
  const nextStep = (value) => {
    if (step === 1) {
      // from StepTwo => store note if needed
      setSelectedNote(value);
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => (prev > 0 ? prev - 1 : 0));
  };

  // We'll only show these UI blocks if user has chosen a ratio in Step One
  const shouldShowUI = stepOneRatio > 0;

  return (
    <div className="flex-col min-h-screen w-full pt-[10px] px-4 scrollbar-hide">
      <h1 className="text-center text-xl font-bold text-black">
        피드백 작성하기
      </h1>

      <div className="rounded-md bg-white p-4 mb-4">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-black">{perfumeName}</h2>

            {/*
              SMOOTH SLIDE-DOWN ANIMATION:
              - Show date + leftover only if stepOneRatio > 0
            */}
            <div
              className={`transition-all duration-500 overflow-hidden ${
                shouldShowUI ? "max-h-32 mt-2" : "max-h-0"
              }`}
            >
              {/* Left text: leftover is how many % still to fill from stepOneRatio */}
              <p className="text-gray-600 text-sm">
                향을 {leftover}% 더 추가해주세요
              </p>

              {/* Purchase date */}
              <p className="text-gray-600 text-[12px]">
                구매일자: {createdAtString}
              </p>
            </div>
          </div>

          {/* Right big text: how many % base remains plus added ratio, capped at 100 */}
          <div
            className={`transition-all duration-500 overflow-hidden flex items-center ${
              shouldShowUI ? "max-h-32" : "max-h-0"
            }`}
          >
            <p className="text-[54px] text-black font-bold">{bigNumber}%</p>
          </div>
        </div>

        {/* Summarychart example */}
        <Summarychart
          inputCitrus={dummydataforfeed.citrus}
          inputFloral={dummydataforfeed.floral}
          inputWoody={dummydataforfeed.woody}
          inputMusk={dummydataforfeed.musk}
          inputSpicy={dummydataforfeed.spicy}
          inputFresh={dummydataforfeed.fruity}
        />
      </div>

      {/* Horizontal Step Slider */}
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
            <StepTwo onNext={nextStep} onBack={prevStep} />
          </div>

          {/* Step 3 */}
          <div className="w-full shrink-0">
            <StepThree onBack={prevStep} />
          </div>
        </div>
      </div>

      {/* Extra info at the bottom (optional) */}
      <div className="mt-6 text-center">
        {shouldShowUI && (
          <p className="text-gray-700 text-sm">
            현재까지 할당된 수정 비율(전체 합): {selectedOption}%
          </p>
        )}
        {selectedNote && (
          <p className="text-gray-700 text-sm">
            선택한 강조 노트: {selectedNote}
          </p>
        )}
      </div>
    </div>
  );
};
