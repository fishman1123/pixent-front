import { useLocation } from "react-router-dom";
import { Summarychart } from "../result/SummaryChart.jsx";
import { StepOne } from "../feedback/StepOne";
import { StepTwo } from "../feedback/StepTwo";
import { StepThree } from "../feedback/StepThree";
import { useEffect, useState } from "react";
import { setOriginalChartData } from "../../store/feedbackSlice.js";
import { useDispatch } from "react-redux";

export const FeedBackPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const subId = location.state?.subId;
  const perfumeName = location.state?.perfumeName;
  console.log("we got it: ", subId);
  console.log("we got this too: ", perfumeName);

  const [step, setStep] = useState(0); // Step tracker (0 -> 1 -> 2)
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);

  const nextStep = (value) => {
    if (step === 0) setSelectedOption(value);
    if (step === 1) setSelectedNote(value);
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const dummydataforfeed = {
    user_uuid: "10101010", //user_id
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

  return (
    <div className="flex-col min-h-screen w-full pt-[10px] px-4 scrollbar-hide">
      <h1 className="text-center text-xl font-bold text-black">피드백 기록</h1>

      <div className="rounded-md bg-white p-4 mb-4">
        <h2 className="text-lg font-bold text-black">{perfumeName}</h2>

        {/* Keep Summarychart empty as per request */}
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

      <div className="mt-6 text-center">
        {selectedOption !== null && (
          <p className="text-gray-700 text-sm">
            선택한 수정 비율: {selectedOption}%
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
