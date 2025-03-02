import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// 1) Import SVGs via "?react"
import LikeIcon from "../assets/like.svg?react";
import ReserveIcon from "../assets/reservation.svg?react";
import ReportIcon from "../assets/report.svg?react";
import UserIcon from "../assets/user.svg?react";

import ToastModal from "./ToastModal";
import { ViewCountInfo } from "./ViewCountInfo.jsx";

export const BottomTab = () => {
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isCollectionActive = location.pathname === "/collection";
  const isReserveActive = location.pathname === "/reserve";
  const isAnalysisActive = location.pathname === "/which";
  const isUserActive = location.pathname === "/user";

  const handleAnalysisClick = () => setShowToast(true);
  const handleCloseToast = () => setShowToast(false);

  const handleCharge = () => {
    navigate("/charge");
    handleCloseToast();
  };
  const handleAnalysis = () => {
    navigate("/which");
    handleCloseToast();
  };
  const handleUserPage = () => {
    navigate("/user");
    handleCloseToast();
  };

  return (
    <div className="max-w-[480px] mx-auto">
      {/* Bottom bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white z-30">
        <div className="max-w-[480px] border-t border-gray-200 mx-auto flex justify-around py-2">
          {/* Collection */}
          <button
            className={`w-1/4 flex flex-col items-center space-y-1 whitespace-nowrap ${
              isCollectionActive ? "font-bold text-black" : "text-[#8E8E8E]"
            }`}
            disabled={isCollectionActive}
            onClick={() => navigate("/collection")}
          >
            <LikeIcon
              className={`w-6 h-6 fill-current ${
                isCollectionActive ? "text-black" : "text-[#8E8E8E]"
              }`}
            />

            <span className="text-xs">향수 컬렉션</span>
          </button>

          {/* Reserve */}
          <button
            className={`w-1/4 flex flex-col items-center space-y-1 whitespace-nowrap ${
              isReserveActive ? "font-bold text-black" : "text-[#8E8E8E]"
            }`}
            disabled={isReserveActive}
            onClick={() => {
              window.location.href =
                "https://booking.naver.com/booking/6/bizes/1002529";
            }}
          >
            <ReserveIcon
              className={`w-6 h-6 fill-current ${
                isReserveActive ? "text-black" : "text-[#8E8E8E]"
              }`}
            />
            <span className="text-xs">AS 예약하기</span>
          </button>

          {/* Report / 분석하기 */}
          <button
            className={`w-1/4 flex flex-col items-center space-y-1 whitespace-nowrap ${
              isAnalysisActive ? "font-bold text-black" : "text-[#8E8E8E]"
            }`}
            disabled={isAnalysisActive}
            onClick={handleAnalysisClick}
          >
            <ReportIcon
              className={`w-6 h-6 fill-current ${
                isAnalysisActive ? "text-black" : "text-[#8E8E8E]"
              }`}
            />
            <span className="text-xs">분석하기</span>
          </button>

          {/* User */}
          <button
            className={`w-1/4 flex flex-col items-center space-y-1 whitespace-nowrap ${
              isUserActive ? "font-bold text-black" : "text-[#8E8E8E]"
            }`}
            disabled={isUserActive}
            onClick={handleUserPage}
          >
            <UserIcon
              className={`w-6 h-6 fill-current ${
                isUserActive ? "text-black" : "text-[#8E8E8E]"
              }`}
            />
            <span className="text-xs">마이페이지</span>
          </button>
        </div>
      </div>

      {/* ToastModal for "분석하기" */}
      {showToast && (
        <ToastModal onClose={handleCloseToast}>
          <ViewCountInfo
            onCharge={handleCharge}
            startAnalysis={handleAnalysis}
          />
        </ToastModal>
      )}
    </div>
  );
};
