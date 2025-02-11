import { useLocation } from "react-router-dom";
import { Summarychart } from "../result/SummaryChart.jsx";
import { StepOne } from "../feedback/StepOne";
import { StepTwo } from "../feedback/StepTwo";
import { StepThree } from "../feedback/StepThree";
import { useState } from "react";

export const FeedBackPage = () => {
  const location = useLocation();
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

  return (
    <div className="flex-col min-h-screen w-full pt-[10px] px-4 scrollbar-hide">
      <h1 className="text-center text-xl font-bold text-black">피드백 기록</h1>

      <div className="rounded-md bg-white p-4 mb-4">
        <h2 className="text-lg font-bold text-black">{perfumeName}</h2>

        {/* Keep Summarychart empty as per request */}
        <Summarychart
          inputCitrus={30}
          inputFloral={30}
          inputMusk={30}
          inputSpicy={30}
          inputWoody={30}
          inputFresh={30}
        />
      </div>

      {/* Animated Step Container */}
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

      {/* Display selected values */}
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
