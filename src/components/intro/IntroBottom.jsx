// IntroBottom.jsx
import React, { useEffect, useState } from "react";
import { IntroSecondButton } from "./IntroSecondButton.jsx";
import ToastModal from "../ToastModal.jsx";
import plusIcon from "../../assets/newplus.svg";
import checkIcon from "../../assets/check.svg";
import cancelIcon from "../../assets/ax.svg";
import { MyPageToastContent } from "../myPage/MyPageToastContent.jsx";
import { useGetUserAllReport } from "../../hooks/useGetUserAllReport";
import { usePostCollectionCheck } from "../../hooks/usePostCollectionCheck";

export const IntroBottom = () => {
  const [clickedId, setClickedId] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [collectionStates, setCollectionStates] = useState({});

  const { data: userAllReport, isLoading, isError } = useGetUserAllReport(true);
  const { mutate: postCollectionCheck } = usePostCollectionCheck();

  const { userId, reportAmount, reportList = [] } = userAllReport || {};

  console.log("IntroBottom -> userId:", userId);
  console.log("IntroBottom -> reportAmount:", reportAmount);
  console.log("IntroBottom -> reportList:", reportList);

  useEffect(() => {
    const newStates = {};
    reportList.forEach((r) => {
      newStates[r.id] = r.collection ? "added" : "default";
    });
    setCollectionStates(newStates);
  }, [reportList]);

  console.log("IntroBottom -> collectionStates:", collectionStates);

  // Show toast
  const handleClickButton = (id) => {
    console.log(`handleClickButton -> clickedId=${id}`);
    setClickedId(id);
    setShowToast(true);
  };

  const handleCloseToast = () => {
    console.log("handleCloseToast -> closing toast");
    setShowToast(false);
    setClickedId(null);
  };

  const selectedReport = reportList.find((report) => report.id === clickedId);

  // Copy URL to clipboard
  const handleCopy = () => {
    if (!selectedReport) return;
    const urlToCopy = `pixent.co.kr/report/${selectedReport.uuid}`;
    navigator.clipboard
      .writeText(urlToCopy)
      .then(() => {
        setCopySuccess(true);
        console.log("handleCopy -> copied URL:", urlToCopy);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  const handleCollectionClick = (reportId) => {
    const currentState = collectionStates[reportId] || "default";
    const report = reportList.find((r) => r.id === reportId);

    // Show "pending"
    setCollectionStates((prev) => ({
      ...prev,
      [reportId]: "pending",
    }));

    // POST request
    postCollectionCheck(report.uuid, {
      onSuccess: () => {
        const nextState = currentState === "default" ? "added" : "default";
        console.log("check here :", selectedReport.collection);
        setCollectionStates((prev) => ({
          ...prev,
          [reportId]: nextState,
        }));
      },
      onError: (error) => {
        console.error(
          `onError -> revert to "${currentState}" for reportId=${reportId}, error=`,
          error,
        );
        setCollectionStates((prev) => ({
          ...prev,
          [reportId]: currentState,
        }));
      },
    });
  };

  const getCollectionButtonProps = (reportId) => {
    const state = collectionStates[reportId] || "default";

    switch (state) {
      case "pending":
        return {
          icon: checkIcon,
          text: "컬렉션 추가중…",
          disabled: true,
        };
      case "added":
        return {
          icon: cancelIcon,
          text: "컬렉션 추가 취소",
          disabled: false,
        };
      default:
        return {
          icon: plusIcon,
          text: "향수 컬렉션 추가하기",
          disabled: false,
        };
    }
  };

  return (
    <div className="flex-1 flex-col flex h-full min-h-[300px] w-full mt-6 bg-white text-black">
      <div className="text-left ml-[30px] text-[24px] font-bold">GALLERY</div>

      <div className="flex flex-wrap justify-center gap-4 p-4">
        {reportList.map((report) => (
          <div className="w-[45%] max-w-[160px]" key={report.id}>
            <IntroSecondButton
              perfumeName={report.perfumeName}
              mainNote={report.mainNote}
              userImageUrl={report.userImageUrl}
              isClicked={clickedId === report.id}
              onClick={() => handleClickButton(report.id)}
            />
          </div>
        ))}

        {showToast && selectedReport && (
          <ToastModal onClose={handleCloseToast}>
            <MyPageToastContent
              selectedReport={selectedReport}
              handleCopy={handleCopy}
              copySuccess={copySuccess}
              getCollectionButtonProps={getCollectionButtonProps}
              handleCollectionClick={handleCollectionClick}
            />
          </ToastModal>
        )}
      </div>
    </div>
  );
};
