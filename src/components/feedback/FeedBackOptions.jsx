// StepOne.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { setStepOneRatio } from "../../store/feedbackSlice";

export const FeedBackOptions = ({ onSelect }) => {
  const dispatch = useDispatch();

  const options = [
    // { label: "현재 향이 최고예요!", subLabel: "이대로 유지", value: 0 },
    { label: "아주 조금만 수정할래요", subLabel: "20% 수정", value: 20 },
    { label: "어느 정도 수정할래요", subLabel: "40% 수정", value: 40 },
    { label: "많이 수정할래요", subLabel: "60% 수정", value: 60 },
    { label: "대부분 수정할래요", subLabel: "80% 수정", value: 80 },
    // { label: "새 향을 추천받을래요", subLabel: "새로운 분석", value: 100 },
  ];

  const handleSelect = (val) => {
    dispatch(setStepOneRatio(val));
    onSelect(val);
  };

  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      {options.map((option, index) => (
        <button
          key={index}
          className="bg-white text-black text-center p-4 shadow-md border border-gray-300"
          onClick={() => handleSelect(option.value)}
        >
          <p className="text-[3.3vw] maxPcScreen:text-[17px] font-semibold">
            {option.label}
          </p>
          <p className="text-gray-500 text-sm">{option.subLabel}</p>
        </button>
      ))}
    </div>
  );
};
