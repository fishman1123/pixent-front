import React, { useState } from "react";
import { StatusInputBox } from "../StatusInputBox.jsx";
import { OriginSelectBox } from "../OriginSelectBox.jsx";

export const ValidationPage = () => {
  // Create list of AC'SCENT names
  const originNames = Array.from({ length: 30 }, (_, i) => `AC'SCENT ${i + 1}`);

  const [count, setCount] = useState(0); // Index-based count
  const [selectedOrigin, setSelectedOrigin] = useState(""); // Track selected origin

  return (
    <div className="min-h-screen flex justify-center w-full p-4">
      <div className="flex-1 content-center h-full min-h-[300px] w-full bg-white text-black mt-[140px] font-introTitle">
        <div className="w-full px-5">
          <div className="text-[38px]">관리자 승인 페이지</div>
          {/*<div className="text-[24px]">*/}
          {/*  관리자에게 요청 메시지가 전달 됩니다!*/}
          {/*</div>*/}
        </div>
        <div className="w-full min-w-[290px]">
          <StatusInputBox path={"/api/auth/admin"} status={"validation"} />
        </div>
      </div>
    </div>
  );
};
