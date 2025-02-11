import React from "react";

export const StepThree = ({ onBack }) => {
  return (
    <div className="w-full">
      <h2 className="text-black text-lg mb-4">
        3단계: 선택한 옵션을 확인하세요
      </h2>

      <p className="text-gray-700 text-md">
        피드백이 성공적으로 제출되었습니다!
      </p>

      <button
        className="mt-4 bg-gray-600 text-white py-2 px-4 rounded-md"
        onClick={onBack}
      >
        이전 단계로 돌아가기
      </button>
    </div>
  );
};
