// src/components/stepTwo/FeedBackFinal.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import chartIcon from "../../assets/newchart.svg";
import reservationIcon from "../../assets/reservation.svg";
import { useNavigate } from "react-router-dom";

const FeedBackFinal = () => {
  const navigation = useNavigate();

  const { citrus, floral, woody, musk, fruity, spicy, feedbackElement } =
    useSelector((state) => state.feedbackPost);

  useEffect(() => {
    // console.log("=== Final Adjusted Values from feedbackPost ===");
    // console.log("citrus:", citrus);
    // console.log("floral:", floral);
    // console.log("woody:", woody);
    // console.log("musk:", musk);
    // console.log("fruity:", fruity);
    // console.log("spicy:", spicy);
    // console.log("=== Feedback Elements ===");
    // feedbackElement.forEach((element, index) => {
    //   console.log(`Element ${index + 1}:`, element);
    // });
  }, [citrus, floral, woody, musk, fruity, spicy, feedbackElement]);

  const handleCheckFeedback = () => {
    navigation("/secured/collection", { replace: true, state: {} });
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
              onClick={handleCheckFeedback}
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
