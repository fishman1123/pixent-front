import React, { useState, useEffect } from "react";
import { StatusInputBox } from "../StatusInputBox.jsx";
import { OriginSelectBox } from "../OriginSelectBox.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import PrimeModal from "../PrimeModal.jsx";
import { usePostOrigin } from "../../hooks/usePostOrigin.js";
import { useQueryClient } from "@tanstack/react-query"; // Ensure the correct import path

export const AddOriginPage = () => {
  const [selectedOrigin, setSelectedOrigin] = useState(""); // Track selected origin
  const location = useLocation();
  const navigate = useNavigate();
  const isValid = location.state?.isValid || false;
  const [showModal, setShowModal] = useState(!isValid); // Show modal if validation is missing
  const { mutate: postOrigin, isLoading, isError } = usePostOrigin();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isValid) {
      setShowModal(true);
    }
  }, [isValid]);

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/"); // Redirect to home or another page
  };

  const handleAddOrigin = () => {
    if (!selectedOrigin) {
      alert("Please select an origin before submitting.");
      return;
    }
    const formattedOrigin = selectedOrigin.replace(
      /([A-Za-z']+)\s+(\d+)/,
      "$1$2",
    );
    postOrigin(formattedOrigin, {
      onSuccess: () => {
        alert("Origin submitted successfully!");
        queryClient.invalidateQueries(["userCollection"]);
        setSelectedOrigin("");
        navigate("/secured/collection");
      },
      onError: (error) => {
        alert("Failed to submit origin: " + error.message);
      },
    });
  };

  return (
    <div className="min-h-screen flex justify-center w-full p-4">
      <div className="flex-1 content-center h-full min-h-[300px] w-full bg-white text-black mt-[140px] font-introTitle">
        <div className="w-full px-5">
          <div className="text-[38px]">분석권 요청하기</div>
          <div className="text-[24px]">
            관리자에게 요청 메시지가 전달 됩니다!
          </div>
        </div>
        <div className="w-full min-w-[290px]">
          <div className="origin-box-container">
            <OriginSelectBox setSelectedOrigin={setSelectedOrigin} />
          </div>
          <div className="p-5">
            <button
              className="noanimationbutton flex items-center justify-center w-full"
              role="button"
              onClick={handleAddOrigin}
            >
              <span className="text">향료 추가하기</span>
              <span className="text" />
            </button>
          </div>

          <div className="flex flex-col items-center ml-5 mr-5 bg-gray-50 py-5 border">
            <div className="text-[14px] text-black">
              *해당 향료 추가는 AI 분석기반 보고서를 제공하지 않습니다.
            </div>
            <div className="text-[14px] text-black">
              *AI 분석을 받고 싶다면 관리자에게 문의 부탁드립니다.
            </div>
          </div>
        </div>
      </div>

      {/* PrimeModal for Validation Expiration */}
      <PrimeModal
        isOpen={showModal}
        title="Validation Expired"
        onClose={handleCloseModal}
      >
        <p>Your session has expired. Please revalidate before continuing.</p>
      </PrimeModal>
    </div>
  );
};
