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
    <div className="flex-col min-h-screen w-full pt-[10px] scrollbar-hide">
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
        <div className="flex gap-4">
          <div className="w-full">
            <button className="noanimationbutton flex flex-col items-start p-4 min-w-32 max-w-48 h-auto">
              <span className="text-sm text-gray-700">분석 완료</span>
              <span className="text-2xl font-bold text-black">
                {authState.viewAttempts}회
              </span>
            </button>
          </div>
          <div className="w-full">
            <button className="noanimationbutton flex flex-col items-start p-4 min-w-32 max-w-48 h-auto">
              <span className="text-sm text-gray-700">보유 분석권</span>
              <span className="text-2xl font-bold text-black">
                {authState.viewChance}00개
              </span>
            </button>
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

      <div className="w-full border-t border-black mt-6">
        <button
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          className="w-full flex justify-between items-center px-4 py-3 border-b border-black relative"
        >
          <span className="text-lg font-medium">결제 내역</span>

          <img
            src={downIcon}
            alt="Chevron"
            className={`w-8 h-8 transition-transform duration-300 ${
              isAccordionOpen ? "rotate-0" : "rotate-180"
            }`}
          />
        </button>

        <div
          className={`overflow-hidden transition-all duration-500 ${
            isAccordionOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-[20px] py-3 bg-white">
            {paymentHistory.map((section, idx) => (
              <div
                key={idx}
                className={`mb-4 ${idx !== 0 ? "border-t border-black pt-4" : ""}`}
              >
                {/* Year Header with Conditional Border */}
                <p className="text-gray-400 text-sm mb-2">{section.year}</p>

                {/* Transactions List */}
                {section.transactions.map((tx, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-3 border-b last:border-none"
                  >
                    <div>
                      <p className="text-black font-bold">{tx.amount}</p>
                      <p className="text-gray-600 text-sm">분석권 {tx.count}</p>
                    </div>
                    <div className="flex flex-col items-center gap-[2px]">
                      <p className="text-gray-900 text-sm">{tx.date}</p>
                      <p className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
                        {tx.method}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <IntroBottom />
      </div>
    </div>
  );
};
