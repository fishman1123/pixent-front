// src/components/stepTwo/FeedBackFinal.jsx
import React, { useEffect } from "react";
import { useSelector } from "react-redux"; // <-- Add this
import chartIcon from "../../assets/newchart.svg";
import reservationIcon from "../../assets/reservation.svg";
import { useNavigate } from "react-router-dom";

const FeedBackFinal = () => {
  const navigation = useNavigate();

  // 1) Grab final adjusted values from feedbackPost
  const { citrus, floral, woody, musk, fruity, spicy } = useSelector(
    (state) => state.feedbackPost,
  );

  // 2) Log them whenever the component mounts or these values change
  useEffect(() => {
    console.log("=== Final Adjusted Values from feedbackPost ===");
    console.log("citrus:", citrus);
    console.log("floral:", floral);
    console.log("woody:", woody);
    console.log("musk:", musk);
    console.log("fruity:", fruity);
    console.log("spicy:", spicy);
  }, [citrus, floral, woody, musk, fruity, spicy]);

  const handlecheckfeedback = () => {
    navigation("/user");
  };

  return (
    <div className="w-full">
      <div className="w-full px-2 mb-8">
        <div className="w-full p-2 mb-3 bg-gray-100">
          <div className="mb-2">
            <p>파생향 등록안내</p>
          </div>
          <div className="text-gray-500 text-[14px]">
            <p>파생향 등록을 위해서는 관리자 승인이 필요합니다.</p>
            <p>승인을 위해 관리자 키를 입력해주세요.</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-full">
            <button
              className="noanimationbutton flex flex-col items-center p-4 min-w-32 w-full h-auto"
              onClick={handlecheckfeedback}
            >
              <span className="text-sm text-gray-700">
                <img
                  src={chartIcon}
                  alt="chart"
                  className="w-10 h-10 font-light"
                />
              </span>
              <span className="text-[12px] font-bold text-black">
                피드백 확인하기
              </span>
            </button>
          </div>

          <div className="w-full">
            <button className="noanimationbutton flex flex-col items-center p-4 min-w-32 w-full h-auto">
              <span className="text-sm text-gray-700">
                <img
                  src={reservationIcon}
                  alt="reservation"
                  className="w-10 h-10 font-light"
                />
              </span>
              <span className="text-[12px] font-bold text-black">
                A/S 예약하기
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedBackFinal;
