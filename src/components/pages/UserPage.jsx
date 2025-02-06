import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import downIcon from "../../assets/down.svg";
import { IntroBottom } from "../intro/IntroBottom.jsx";
import { PortalModal } from "../PortalModal";
import { SerialNumberBox } from "../input/SerialNumberBox.jsx";

export const UserPage = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const paymentHistory = [
    {
      year: "2024년 1월",
      transactions: [
        { amount: "₩5,000", count: "5개", date: "01.25", method: "카카오페이" },
        { amount: "₩3,000", count: "3개", date: "01.10", method: "카카오페이" },
      ],
    },
    {
      year: "2023년 12월",
      transactions: [
        { amount: "₩10,000", count: "10개", date: "12.30", method: "신용카드" },
      ],
    },
  ];

  return (
    <div className="flex-col min-h-screen w-full pt-[10px]">
      <div className="flex flex-col pt-[30px] bg-black text-white px-[28px]">
        <div>
          <p className="text-gray-400">MY PAGE</p>
          <p className="text-[22px] font-bold">
            {authState.nickname}님의 프로필
          </p>
        </div>
        <div className="mb-[20px]">
          <button onClick={() => setIsModalOpen(true)}>닉네임 변경</button>
        </div>
      </div>

      <div className="flex flex-col px-[20px] w-full py-[14px]">
        <div className="bg-gray-100 px-[20px] py-[8px] mb-[20px]">
          <div>
            <p className="text-gray-500">로그인 계정</p>
            <div>
              <p>{authState.userEmail} (여기옆에 아이콘)</p>
            </div>
          </div>
        </div>
      </div>

      <PortalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="닉네임 변경"
        confirmText="닫기"
      >
        <div className="flex flex-col w-full py-[14px]">
          <div className="bg-gray-50 px-[20px] py-[8px] mb-[20px]">
            <div className="text-start">
              <p>닉네임 변경 안내</p>
              <div>
                <p className="text-gray-500 text-[12px]">
                  닉네임 변경 후에도 자유롭게 변경 가능합니다.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full min-w-[260px]">
            <SerialNumberBox path="/api/user/username" />
          </div>
        </div>
      </PortalModal>

      <div>
        <IntroBottom />
      </div>
    </div>
  );
};
