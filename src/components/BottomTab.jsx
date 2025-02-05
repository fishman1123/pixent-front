import React, { useState } from 'react';
import userIcon from '../assets/user.svg';
import reserveIcon from '../assets/reservation.svg';
import likeIcon from '../assets/like.svg';
import reportIcon from '../assets/report.svg';
import ToastModal from './ToastModal';
import { ViewCountInfo } from './ViewCountInfo.jsx';
import { useNavigate } from 'react-router-dom';

export const BottomTab = () => {
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();

    const handleAnalysisClick = () => {
        setShowToast(true);
    };

    const handleCloseToast = () => {
        setShowToast(false);
    };

    // Callback for "분석권 충전하기"
    const handleCharge = () => {
        navigate('/');
        handleCloseToast();
    };

    // Callback for "분석 시작하기"
    const handleAnalysis = () => {
        navigate('/which');
        handleCloseToast();
    };

    const handleUserPage = () => {
        navigate('/user');
        handleCloseToast();
    };

    return (
        <div className="max-w-[480px] mx-auto">
            {/* Fixed bar at bottom */}
            <div className="fixed bottom-0 left-0 w-full bg-white z-30">
                <div className="max-w-[480px] border-t border-gray-200 mx-auto flex justify-around py-2">
                    {/* Collection */}
                    <button className="flex flex-col items-center space-y-1">
                        <img src={likeIcon} alt="Like" className="w-6 h-6" />
                        <span className="text-xs text-[#8E8E8E]">향수 컬렉션</span>
                    </button>

                    {/* Reserve */}
                    <button className="flex flex-col items-center space-y-1">
                        <img src={reserveIcon} alt="Reserve" className="w-6 h-6" />
                        <span className="text-xs text-[#8E8E8E]">AS 예약하기</span>
                    </button>

                    {/* Report / 분석하기 */}
                    <button
                        className="flex flex-col items-center space-y-1"
                        onClick={handleAnalysisClick}
                    >
                        <img src={reportIcon} alt="Report" className="w-6 h-6" />
                        <span className="text-xs text-[#8E8E8E]">분석하기</span>
                    </button>

                    {/* User */}
                    <button className="flex flex-col items-center space-y-1" onClick={handleUserPage}>
                        <img src={userIcon} alt="User" className="w-6 h-6" />
                        <span className="text-xs text-[#8E8E8E]">마이페이지</span>
                    </button>
                </div>
            </div>

            {/* Show ToastModal when user clicks "분석하기" */}
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
