import React from "react";

export const StepTwo = ({ onNext, onBack }) => {
  return (
    <div className="w-full">
      <h2 className="text-black text-lg mb-4">
        2단계: 어떤 향을 더 강조하고 싶으신가요?
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {["시트러스", "플로럴", "우디", "머스크", "프루티", "스파이시"].map(
          (note, index) => (
            <button
              key={index}
              className="bg-white text-black p-4 rounded-lg shadow-md border border-gray-300"
              onClick={() => onNext(note)}
            >
              {note}
            </button>
          ),
        )}
      </div>

      <button
        className="mt-4 bg-gray-600 text-white py-2 px-4 rounded-md"
        onClick={onBack}
      >
        이전 단계로 돌아가기
      </button>
    </div>
  );
};
