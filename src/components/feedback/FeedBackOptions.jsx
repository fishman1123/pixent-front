// StepOne.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { setStepOneRatio } from "../../store/feedbackSlice"; // Adjust path as needed

export const FeedBackOptions = ({ onSelect }) => {
  const dispatch = useDispatch();

  const options = [
    // { label: "현재 향이 최고예요!", subLabel: "이대로 유지", value: 0 },
    { label: "아주 조금만 수정할래요", subLabel: "10% 수정", value: 10 },
    { label: "어느 정도 수정할래요", subLabel: "30% 수정", value: 30 },
    { label: "많이 수정할래요", subLabel: "50% 수정", value: 50 },
    { label: "대부분 수정할래요", subLabel: "70% 수정", value: 70 },
    // { label: "새 향을 추천받을래요", subLabel: "새로운 분석", value: 100 },
  ];

  const handleSelect = (val) => {
    // Store ratio in Redux
    dispatch(setStepOneRatio(val));
    // Also propagate to parent's "onNext" or "onSelect"
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
          <p className="text-md font-semibold">{option.label}</p>
          <p className="text-gray-500 text-sm">{option.subLabel}</p>
        </button>
      ))}
    </div>
  );
};
