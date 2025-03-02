import { CenterLine } from "../input/CenterLine.jsx";
import { ProcedureButton } from "../ProcedureButton.jsx";
import React from "react";

export const WrongPath = () => {
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
      <div className="text-[#666666]">
        요청하신 페이지가 존재하지 않거나 잘못된 경로입니다.
      </div>
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
