import React from "react";
import { useLocation } from "react-router-dom";
import { SerialNumberBox } from "../input/SerialNumberBox.jsx";

export const NicknamePage = ({ reportId: propReportId }) => {
  const location = useLocation();

  const reportId = propReportId || location.state?.subid || "";

  const isFromCollection =
    location.pathname.startsWith("/secured/collection") && Boolean(reportId);

  let path = "/api/user/username";
  let mainTitle = "LET PEOPLE KNOW";
  let subTitle = "WHO YOU ARE";
  let status;

  if (reportId === "ticket") {
    path = "/testTwo";
    mainTitle = "관리자 페이지입니다";
    subTitle = "";
    status = reportId;
  } else if (isFromCollection) {
    path = "/api/user/report/variation";
    mainTitle = "관리자 페이지입니다";
    subTitle = "";
  }

  return (
    <div className="min-h-screen flex justify-center w-full p-4">
      <div className="flex-1 content-center h-full min-h-[300px] w-full bg-white text-black mt-[140px] font-introTitle">
        <div className="w-full px-5">
          <div className="text-[34px]">{mainTitle}</div>
          <div className="text-[24px]">{subTitle}</div>
          <div className="text-[14px] mt-[20px] text-black">
            *등록 이후에 나중에 수정이 가능합니다!
          </div>
        </div>

        <div className="w-full min-w-[290px]">
          <SerialNumberBox
            path={path}
            status={status}
            isFromCollection={isFromCollection}
            reportId={reportId}
          />
        </div>
      </div>
    </div>
  );
};
