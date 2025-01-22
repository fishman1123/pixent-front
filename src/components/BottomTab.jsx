import React from 'react';
import userIcon from '../assets/user.svg';
import reserveIcon from '../assets/reservation.svg';
import likeIcon from '../assets/like.svg';
import reportIcon from '../assets/report.svg';

export const BottomTab = () => {
    return (
        <div className="max-w-[480px] mx-auto">
            {/* Fixed bar at bottom */}
            <div className="fixed bottom-0 left-0 w-full bg-white  z-30">
                <div className="max-w-[480px] border-t border-gray-200 mx-auto flex justify-around py-2">
                    {/* collection */}
                    <button className="flex flex-col items-center space-y-1">
                        <img src={likeIcon} alt="Like" className="w-6 h-6"/>
                        <span className="text-xs text-[#8E8E8E]">향수 컬렉션</span>
                    </button>

                    {/* reserve */}
                    <button className="flex flex-col items-center space-y-1">
                        <img src={reserveIcon} alt="Reserve" className="w-6 h-6"/>
                        <span className="text-xs text-[#8E8E8E]">AS 예약하기</span>
                    </button>

                    {/* report */}

                    <button className="flex flex-col items-center space-y-1">
                        <img src={reportIcon} alt="Report" className="w-6 h-6"/>
                        <span className="text-xs text-[#8E8E8E]">분석하기</span>
                    </button>
                    {/* user */}

                    <button className="flex flex-col items-center space-y-1">
                        <img src={userIcon} alt="User" className="w-6 h-6"/>
                        <span className="text-xs text-[#8E8E8E]">마이페이지</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
