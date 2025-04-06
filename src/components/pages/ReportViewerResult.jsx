// ReportViewerResult.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetReportByUuid } from "../../hooks/useGetReportByUuid";
import imageUploadIcon from "../../assets/upload.svg";
import { ResultChart } from "../result/ResultChart.jsx";
import { RedirectButton } from "../RedirectButton.jsx";
import CopyIcon from "../../assets/copy.svg";
import { LoadingData } from "./LoadingData.jsx";

// Import the KakaoShareButton
import { KakaoShareButton } from "../KakaoShareButton.jsx";

export const ReportViewerResult = () => {
  const navigate = useNavigate();
  const { id: uuid } = useParams();
  const [copySuccess, setCopySuccess] = useState(false);

  // Data request
  const { data: responseData, isLoading, isError } = useGetReportByUuid(uuid);

  // Loading or error handling
  if (isLoading) return <LoadingData />;
  if (isError) return <div>Error fetching report. Please try again later.</div>;

  if (!responseData?.appearance) {
    navigate("/");
    return null;
  }

  const handleReportSummary = () => {
    navigate("/result/reportsummary", { state: responseData });
  };

  const handleCopy = () => {
    const urlToCopy = `pixent.co.kr/report/${responseData?.uuid}`;
    navigator.clipboard
      .writeText(urlToCopy)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full text-center">
      <div className="w-full h-auto flex flex-col justify-center items-center">
        {responseData.userImageUrl ? (
          <img
            src={responseData.userImageUrl}
            alt="User Image"
            className="max-w-full max-h-full"
          />
        ) : (
          <div className="text-center text-gray-500">
            <div className="flex justify-center">
              <img
                src={imageUploadIcon}
                alt="Upload icon"
                className="w-[50px] h-[50px] mb-2"
              />
            </div>
            <div>No Image Available</div>
          </div>
        )}
        <div className="mt-12">
          <p className="font-headerTitle text-[40px]">
            {responseData?.perfumeName}
          </p>
        </div>
      </div>

      <div className="mx-5">
        {/* ANALYSIS */}
        <div className="mt-[80px]">
          <div className="text-left text-[18px] font-bold">ANALYSIS</div>
          <div className="relative flex items-center justify-center w-full mt-3 mb-5">
            <div className="h-[1px] w-full bg-black ml-[1px]" />
            <div className="h-[1px] w-full bg-black mr-[5px]" />
          </div>
          <div className="text-left">
            <h2 className="font-bold text-[14px] pb-2">Facial Feature</h2>
            <p className="text-[12px]">
              {responseData?.appearance?.facialFeature}
            </p>
            <h2 className="font-bold text-[14px] pb-2 mt-4">Style</h2>
            <p className="text-[12px]">{responseData?.appearance?.style}</p>
            <h2 className="font-bold text-[14px] pb-2 mt-4">Vibe</h2>
            <p className="text-[12px]">{responseData?.appearance?.vibe}</p>
          </div>
        </div>

        {/* NOTES */}
        <div className="text-left text-[18px] font-bold mt-8">NOTES</div>
        <div className="relative flex items-center justify-center w-full mt-3 mb-5">
          <div className="h-[1px] w-full bg-black ml-[1px]" />
          <div className="h-[1px] w-full bg-black mr-[5px]" />
        </div>

        {/* TOP / MIDDLE / BASE Note */}
        <div className="text-left">
          <div className="flex items-center">
            <img
              src={responseData?.mainNoteImageUrl}
              alt="Main Note"
              className="w-14 h-14 mr-2"
            />
            <span className="font-bold">TOP:</span>{" "}
            {responseData?.mainNote || ""}
          </div>
          <p className="text-[12px]">{responseData?.mainNoteDesc}</p>
          <p className="text-[12px]">{responseData?.mainNoteAnalysis}</p>
        </div>
        <div className="text-left mt-4">
          <div className="flex items-center">
            <img
              src={responseData?.middleNoteImageUrl}
              alt="Middle Note"
              className="w-14 h-14 mr-2"
            />
            <span className="font-bold">MIDDLE:</span>{" "}
            {responseData?.middleNote || ""}
          </div>
          <p className="text-[12px]">{responseData?.middleNoteDesc}</p>
          <p className="text-[12px]">{responseData?.middleNoteAnalysis}</p>
        </div>
        <div className="text-left mt-4">
          <div className="flex items-center">
            <img
              src={responseData?.baseNoteImageUrl}
              alt="Base Note"
              className="w-14 h-14 mr-2"
            />
            <span className="font-bold">BASE:</span>{" "}
            {responseData?.baseNote || ""}
          </div>
          <p className="text-[12px]">{responseData?.baseNoteDesc}</p>
          <p className="text-[12px]">{responseData?.baseNoteAnalysis}</p>
        </div>

        {/* PROFILES */}
        <div className="text-left">
          <div>
            <div className="text-[18px] font-bold mt-14">PROFILES</div>
          </div>
          <div className="relative flex items-center justify-center w-full mt-3 mb-5">
            <div className="h-[1px] w-full bg-black ml-[1px]" />
            <div className="h-[1px] w-full bg-black mr-[5px]" />
          </div>
          <p className="text-[12px]">{responseData?.profile}</p>
        </div>

        {/* Chart */}
        <div className="mt-8">
          <ResultChart
            inputCitrus={responseData?.citrus}
            inputFloral={responseData?.floral}
            inputWoody={responseData?.woody}
            inputMusk={responseData?.musk}
            inputFresh={responseData?.fruity}
            inputSpicy={responseData?.spicy}
          />
        </div>

        {/* Copy, Share Buttons */}
        <div className="flex">
          <div className="w-full">
            <div className="my-4 flex items-center border border-gray-200">
              <label htmlFor="copy-url-input" className="sr-only">
                Copy URL
              </label>
              <input
                id="copy-url-input"
                type="text"
                className="flex-1 min-w-0 text-gray-500 text-sm focus:ring-blue-500 outline-none border-none"
                value={`https://www.pixent.co.kr/report/${responseData?.uuid}`}
                disabled
                readOnly
              />
              <button
                onClick={handleCopy}
                data-tooltip-target="tooltip-copy-url-button"
                className="relativetext-gray-500 border-l border-r p-2 px-4 h-full flex items-center justify-center space-x-2 w-[50px] copy-visible:w-[120px] whitespace-nowrap"
              >
                <span
                  id="default-icon"
                  className={`flex-shrink-0 ${copySuccess ? "hidden" : ""}`}
                >
                  <img src={CopyIcon} alt="Copy Icon" className="w-4 h-4" />
                </span>
                <span
                  id="success-icon"
                  className={`flex-shrink-0 ${copySuccess ? "" : "hidden"}`}
                >
                  <svg
                    className="w-4 h-4 text-black"
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5.917L5.724 10.5 15 1.5"
                    />
                  </svg>
                </span>
                <span className="text-sm hidden copy-visible:inline-block">
                  {copySuccess ? "Copied!" : "Copy URL"}
                </span>
              </button>

              {/* Twitter Share Button */}
              <button
                onClick={() => {
                  const url = `https://www.pixent.co.kr/report/${responseData?.uuid}`;
                  const text = `Share analysis report created by Pixent!`;
                  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    text,
                  )}&url=${encodeURIComponent(url)}`;
                  window.open(twitterUrl, "_blank");
                }}
                className="text-blue-500 hover:bg-blue-100 rounded-lg p-2 px-4 h-full flex items-center justify-center"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.4 4.4 0 0 0 1.93-2.43 8.93 8.93 0 0 1-2.82 1.1 4.48 4.48 0 0 0-7.62 4.08A12.72 12.72 0 0 1 3.11 4.7a4.44 4.44 0 0 0-.61 2.26 4.47 4.47 0 0 0 2 3.72 4.43 4.43 0 0 1-2-.56v.06a4.48 4.48 0 0 0 3.57 4.38 4.48 4.48 0 0 1-2 .07 4.47 4.47 0 0 0 4.18 3.1A8.96 8.96 0 0 1 2 20.54a12.64 12.64 0 0 0 6.8 2 12.63 12.63 0 0 0 12.74-12.74c0-.2 0-.39-.01-.58A9.14 9.14 0 0 0 24 4.56a8.92 8.92 0 0 1-2.54.7z" />
                </svg>
              </button>

              {/* Kakao Share Button */}
              <KakaoShareButton uuid={responseData?.uuid || ""} />

              <div
                id="tooltip-copy-url-button"
                role="tooltip"
                className="absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip"
              >
                <span
                  id="default-tooltip-message"
                  className={copySuccess ? "hidden" : ""}
                >
                  Copy to clipboard
                </span>
                <span
                  id="success-tooltip-message"
                  className={copySuccess ? "" : "hidden"}
                >
                  Copied!
                </span>
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
            <div className="flex text-gray-400 text-[12px] mb-4">
              제품 구매를 위해서는 반드시 링크를 복사해야 합니다.
            </div>
          </div>
        </div>

        <div className="mt-8 mb-6">
          <RedirectButton
            text="구매하기"
            subText="이동하기"
            delay={0}
            target="https://acscent.co.kr/shop_view/?idx=199"
          />
        </div>

        <div className="mt-8 mb-10 ">
          <div className="flex flex-col items-center">
            <button className="defaultButton" onClick={handleReportSummary}>
              <span className="text">요약본 보기</span>
              <span>이동하기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
