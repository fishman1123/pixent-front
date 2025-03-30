// UserPage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import { setAuthState } from "../../store/authSlice";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";

import downIcon from "../../assets/down.svg";
import { IntroBottom } from "../intro/IntroBottom";
import { PortalModal } from "../PortalModal";
import { SerialNumberBox } from "../input/SerialNumberBox";

export function UserPage() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const { data: userInfo, isLoading, isError } = useGetUserInfo(true);
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
  // const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!userInfo) return;

    const needsUpdate =
      authState.nickname !== userInfo.username ||
      authState.userEmail !== userInfo.email ||
      authState.viewChance !== userInfo.usageLimit ||
      authState.userProvider !== userInfo.provider;

    if (needsUpdate) {
      dispatch(
        setAuthState({
          isAuthenticated: true,
          nickname: userInfo.username,
          email: userInfo.email,
          userProvider: userInfo.provider,
          usageLimit: userInfo.usageLimit,
          viewAttempts: authState.viewAttempts,
        }),
      );
    }
  }, [userInfo, authState, dispatch]);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [location]);

  // if (!authState.isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

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
          <p className="text-gray-500">로그인 계정</p>
          <div className="flex items-center gap-2">
            <span>{authState.userEmail}</span>

            {authState.userProvider === "kakao" && (
              <svg
                className="w-4 h-4 group-hover:text-white"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 3C6.5 3 2 6.5 2 11c0 2.9 1.9 5.4 4.7 6.9-.2.6-.7 2.1-.8 2.5-.1.3.1.6.4.4.3-.1 2.1-1.4 3-2 .8.1 1.7.2 2.7.2 5.5 0 10-3.5 10-8s-4.5-8-10-8z"
                />
              </svg>
            )}

            {authState.userProvider === "google" && (
              <svg className="w-4 h-4 text-current" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
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
                {authState.viewChance}개
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
            {/* SerialNumberBox presumably handles the actual nickname update */}
            <SerialNumberBox path="/api/user/username" />
          </div>
        </div>
      </PortalModal>

      {/*payment part*/}

      {/*<div className="w-full border-t border-black mt-6">*/}
      {/*  <button*/}
      {/*    onClick={() => setIsAccordionOpen(!isAccordionOpen)}*/}
      {/*    className="w-full flex justify-between items-center px-4 py-3 border-b border-black relative"*/}
      {/*  >*/}
      {/*    <span className="text-lg font-medium">결제 내역</span>*/}

      {/*    <img*/}
      {/*      src={downIcon}*/}
      {/*      alt="Chevron"*/}
      {/*      className={`w-8 h-8 transition-transform duration-300 ${*/}
      {/*        isAccordionOpen ? "rotate-0" : "rotate-180"*/}
      {/*      }`}*/}
      {/*    />*/}
      {/*  </button>*/}

      {/*  <div*/}
      {/*    className={`overflow-hidden transition-all duration-500 ${*/}
      {/*      isAccordionOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"*/}
      {/*    }`}*/}
      {/*  >*/}
      {/*    <div className="px-[20px] py-3 bg-white">*/}
      {/*      {paymentHistory.map((section, idx) => (*/}
      {/*        <div*/}
      {/*          key={idx}*/}
      {/*          className={`mb-4 ${idx !== 0 ? "border-t border-black pt-4" : ""}`}*/}
      {/*        >*/}
      {/*          /!* Year Header *!/*/}
      {/*          <p className="text-gray-400 text-sm mb-2">{section.year}</p>*/}

      {/*          /!* Transactions *!/*/}
      {/*          {section.transactions.map((tx, index) => (*/}
      {/*            <div*/}
      {/*              key={index}*/}
      {/*              className="flex justify-between items-center py-3 border-b last:border-none"*/}
      {/*            >*/}
      {/*              <div>*/}
      {/*                <p className="text-black font-bold">{tx.amount}</p>*/}
      {/*                <p className="text-gray-600 text-sm">분석권 {tx.count}</p>*/}
      {/*              </div>*/}
      {/*              <div className="flex flex-col items-center gap-[2px]">*/}
      {/*                <p className="text-gray-900 text-sm">{tx.date}</p>*/}
      {/*                <p className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">*/}
      {/*                  {tx.method}*/}
      {/*                </p>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      {/*          ))}*/}
      {/*        </div>*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}

      <div>
        <IntroBottom />
      </div>
    </div>
  );
}
