// AnalysisRequest.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // If you're using react-router v6
import { StatusInputBox } from "./StatusInputBox.jsx";
import { useGetRequestLimit } from "../hooks/useGetRequestLimit";
import PrimeModal from "../components/PrimeModal"; // Adjust path if needed

export const AnalysisRequest = () => {
  const [count, setCount] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const MAX_REQUEST = 3;

  // Call your custom hook
  const { data, isLoading, error } = useGetRequestLimit();

  // Check the returned amount; if > 0, show the modal
  useEffect(() => {
    if (data && data.amount > 0) {
      setIsModalOpen(true);
    }
  }, [data]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/"); // Navigate to "/" after closing
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleIncrement = () => {
    if (count < MAX_REQUEST) {
      setCount(count + 1);
    }
  };

  // If the request is still loading or there's an error, you can handle those cases
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center p-4">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center p-4">
        Error fetching request limit.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center w-full p-4">
      {/* PrimeModal for alerting the user if they already have a request */}
      <PrimeModal
        isOpen={isModalOpen}
        title="Already Requested"
        onClose={handleCloseModal}
      >
        <p>이미 충전 요청 있습니다.</p>
      </PrimeModal>

      <div className="flex-1 content-center h-full min-h-[300px] w-full bg-white text-black mt-[140px] font-introTitle">
        <div className="w-full px-5">
          <div className="text-[38px]">분석권 요청하기</div>
          <div className="text-[24px]">
            관리자에게 요청 메시지가 전달 됩니다!
          </div>
        </div>
        <div className="w-full min-w-[290px]">
          <div className="flex flex-col items-center p-5">
            {/* Counter Box */}
            <div className="flex w-full border-black border-2">
              <button
                type="button"
                onClick={handleDecrement}
                className="px-4 py-2 border-r-2 border-black focus:outline-none"
              >
                -
              </button>
              <div className="w-full flex-grow text-center py-2">{count}개</div>
              <button
                type="button"
                onClick={handleIncrement}
                className={`px-4 py-2 border-l-2 border-black focus:outline-none ${
                  count >= MAX_REQUEST ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={count >= MAX_REQUEST}
              >
                +
              </button>
            </div>
          </div>

          <StatusInputBox
            path={"/api/user/request_limit"}
            status={"request"}
            count={count}
          />

          <div className="flex flex-col items-center ml-5 mr-5 bg-gray-50 py-5 border">
            <div className="text-[14px] text-black">
              *요청 후 12시간 이내에 승인이 이뤄집니다.
            </div>
            <div className="text-[14px] text-black">
              *한 번에 요청 가능한 갯수는 “{MAX_REQUEST}개” 입니다.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
