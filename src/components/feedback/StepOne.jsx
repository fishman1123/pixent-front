import React from "react";
import { FeedbBckOptions } from "./FeedBackOptions";

export const StepOne = ({ onNext }) => {
  return (
    <div className="w-full">
      <h2 className="text-black text-lg mb-4">
        1단계: 현재 향수를 얼마나 유지하고 싶으신가요?
      </h2>
      <FeedbBckOptions onSelect={onNext} />
    </div>
  );
};
