import React from "react";
import arrowIcon from "../assets/rightarrow.svg";
import { useSelector } from "react-redux";

export const ViewCountInfo = ({ onCharge, startAnalysis }) => {
  const viewChance = useSelector((state) => state.auth.viewChance);

  return (
    <div className="mx-[24px] w-full h-full">
      <div className="mb-[26px] mt-4 ml-[12px]">
        <h2 className="text-lg font-semibold">SCENT ANALYSIS</h2>
      </div>

      <div className="bg-gray-100 h-[120px] px-[24px] py-[24px]">
        <p className="px-2 text-[14px] text-gray-600">AVAILABLE CREDITS</p>
        <p className="px-2 text-[32px]">{viewChance}</p>
      </div>

      <div className="mt-6">
        <button
          className="noanimationbutton flex items-center justify-between w-full px-5 py-2"
          role="button"
          onClick={onCharge}
        >
          <span className="text">분석권 충전하기</span>
          <img src={arrowIcon} alt="Arrow Right" className="w-6 h-6" />
        </button>
      </div>

      <div className="mb-[26px] mt-4 ml-[12px]">
        <h2 className="text-[14px]">분석권 안내</h2>
        <h2 className="text-[14px] text-gray-400">
          분석 진행 시 분석권 1회가 자동으로 차감됩니다.
        </h2>
      </div>
      <div>
        <button
          className={`noanimationbutton flex items-center justify-center w-full px-5 py-2 ${
            viewChance === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed border-0"
              : ""
          }`}
          role="button"
          onClick={startAnalysis}
          disabled={viewChance === 0}
        >
          <span className="text">
            {viewChance === 0
              ? "사용 할 수 있는 분석권이 없습니다."
              : "분석 시작하기"}
          </span>
          <span className="text" />
        </button>
      </div>
    </div>
  );
};
