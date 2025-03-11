// src/components/pages/WrongPath.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CenterLine } from "../input/CenterLine.jsx";
import { ProcedureButton } from "../ProcedureButton.jsx";

export const WrongPath = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 기본 문구
  let warningPhrase = "요청하신 페이지가 존재하지 않거나 잘못된 경로입니다.";

  // /report 로 시작하면(즉, /report/* 패스)
  if (location.pathname.startsWith("/report")) {
    warningPhrase = "잘못된 접근 방식입니다. 로그인 후 이용 부탁 드립니다.";
  }

  return (
    <div className="flex-col justify-center items-center min-h-screen w-full text-center mt-[160px]">
      <div className="w-full font-bold text-2xl">페이지를 찾을 수 없습니다</div>
      <div className="flex w-full h-[300px] justify-center items-center">
        <div className="flex-col">
          <img
            src="/warning.png"
            alt="User Image"
            className="max-w-full max-h-full"
          />
        </div>
      </div>
      <div className="text-[#666666]">{warningPhrase}</div>
      <div className="font-bold text-2xl mt-7">에러코드: ???</div>
      <div className="flex justify-center items-center w-[200px] mb-5 mx-auto">
        <CenterLine />
      </div>
      <div>
        <ProcedureButton
          text="홈으로"
          route="/"
          subText="이동하기"
          confirm={false}
        />
      </div>
    </div>
  );
};
