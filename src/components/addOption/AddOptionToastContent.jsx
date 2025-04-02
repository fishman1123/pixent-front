import { useEffect, useState } from "react";
import moneyIcon from "../../assets/money.svg";
import reservationIcon from "../../assets/reservation.svg";
import { useNavigate } from "react-router-dom";
import { usePostLikeStatusCheck } from "../../hooks/usePostLikeStatusCheck";

export const AddOptionToastContent = ({
  targetSubId,
  targetLikeStatus,
  targetCheckLastIdx,
  targetHasFeedback,
  targetSelectedName,
  taragetConfirmed, // Might be boolean or string ("true"/"false")
}) => {
  const [selectedSubId, setSelectedSubId] = useState(null);
  const navigate = useNavigate();
  const { mutate: postLikeStatus } = usePostLikeStatusCheck();

  useEffect(() => {
    if (targetLikeStatus == null) {
      console.error("Warning: targetLikeStatus is null or undefined.");
    }
    setSelectedSubId(targetSubId);
  }, [
    targetSubId,
    targetLikeStatus,
    targetCheckLastIdx,
    targetHasFeedback,
    targetSelectedName,
    taragetConfirmed,
  ]);

  // 1) Convert taragetConfirmed to a real boolean
  const realConfirmed =
    taragetConfirmed === true || taragetConfirmed === "true";

  console.log("taragetConfirmed (raw):", taragetConfirmed);
  console.log("realConfirmed (bool):", realConfirmed);

  // 2) Purchase button disabled if there's no "." in the name
  const isPurchaseDisabled = !targetSelectedName.includes(".");

  // 3) Feedback button disabled
  const isFeedbackDisabled = !targetHasFeedback || !targetCheckLastIdx;

  // 4) Handler for purchase confirmation
  const handlePurchaseConfirmation = () => {
    postLikeStatus(selectedSubId, {
      onSuccess: () => {
        // Just reload to Collection
        window.location.href = "/secured/collection";
      },
      onError: (error) => {
        console.error("Error toggling like status:", error);
      },
    });
  };

  // 5) Handler for feedback
  const handleAddFeedback = (subId) => {
    navigate("/secured/collection/add", { state: { subid: subId } });
  };

  return (
    <div className="w-full">
      <div className="w-full px-2 mb-8">
        <div className="w-full p-2 mb-3 bg-gray-100">
          <div className="mb-2">
            <p>컬렉션 등록안내</p>
          </div>
          <div className="text-gray-500 text-[3.5vw] flex justify-center">
            <div>
              <p>1. 구매확정은 오프라인에서 안내를 받으신 후 눌러주세요.</p>
              <p>2. 피드백 추가는 관리자와 상의 후 추가 바랍니다.</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          {/* 구매확정 하기 */}
          <div className="w-full">
            <button
              className={`noanimationbutton flex flex-col items-center p-4 min-w-32 w-full h-auto ${
                isPurchaseDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handlePurchaseConfirmation}
              disabled={isPurchaseDisabled}
            >
              <span className="text-sm text-gray-700">
                <img
                  src={moneyIcon}
                  alt="chart"
                  className="w-10 h-10 font-light"
                />
              </span>
              <span className="text-[12px] font-bold text-black">
                {realConfirmed ? "구매확정 취소" : "구매확정 하기"}
              </span>
            </button>
          </div>

          {/* 피드백 적용하기 */}
          <div className="w-full">
            <button
              className={`noanimationbutton flex flex-col items-center p-4 min-w-32 w-full h-auto ${
                isFeedbackDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => handleAddFeedback(selectedSubId)}
              disabled={isFeedbackDisabled}
            >
              <span className="text-sm text-gray-700">
                <img
                  src={reservationIcon}
                  alt="reservation"
                  className="w-10 h-10 font-light"
                />
              </span>
              <span className="text-[12px] font-bold text-black">
                피드백 추가하기
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Logging */}
      {/*<div className="text-sm text-black">*/}
      {/*  hasFeedBack: {String(realConfirmed)}*/}
      {/*</div>*/}
    </div>
  );
};
