import React from "react";
import { useNavigate } from "react-router-dom"; // <-- Import useNavigate
import barChart from "../../assets/barchart.svg";
import CopyIcon from "../../assets/copy.svg";
import cartIcon from "../../assets/cart.svg";
import rightIcon from "../../assets/rightarrow.svg";
import cancelIcon from "../../assets/ax.svg";

export const MyPageToastContent = ({
  selectedReport,
  handleCopy,
  copySuccess,
  getCollectionButtonProps,
  handleCollectionClick,
}) => {
  // We use useNavigate hook from react-router-dom for navigation
  const navigate = useNavigate();

  if (!selectedReport) return null;

  // Get the icon, text, disabled status from props
  const { icon, text, disabled } = getCollectionButtonProps(selectedReport.id);

  // Default state: user must add to collection
  let bottomButtonText = "향수 컬렉션에 추가 하셔야 합니다!";
  let bottomButtonDisabled = true;

  // If they've already added to collection, let them navigate
  if (text === "컬렉션 추가 취소") {
    bottomButtonText = "향수 컬렉션 바로가기";
    bottomButtonDisabled = false;
  }

  const handleBottomButtonClick = () => {
    if (!bottomButtonDisabled) {
      console.log("Navigating to 향수 컬렉션…");
      // Here is the actual navigation to /user/collection
      navigate("/user/collection");
    }
  };

  return (
    <div className="mx-[24px] w-full h-full">
      {/* Header */}
      <div className="flex justify-between">
        <div className="text-[22px] font-bold">
          {selectedReport.perfumeName}
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-[12px] text-end">분석일자</div>
          <div className="text-[14px] text-[#666666]">2024-10-23</div>
        </div>
      </div>

      <div className="w-full h-full flex flex-col gap-2 mt-[30px]">
        <div className="flex gap-6">
          <div className="text-[#666666]">Top</div>
          <div>{selectedReport.mainNote}</div>
        </div>
        <div className="flex gap-6">
          <div className="text-[#666666]">Middle</div>
          <div>{selectedReport.middleNote}</div>
        </div>
        <div className="flex gap-6">
          <div className="text-[#666666]">Base</div>
          <div>{selectedReport.baseNote}</div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <div className="w-full">
          <button className="noanimationbutton flex flex-col items-center p-4 min-w-32 w-full h-auto">
            <span className="text-sm text-gray-700">
              <img
                src={barChart}
                alt="chart"
                className="w-10 h-10 font-light"
              />
            </span>
            <span className="text-[12px] font-bold text-black">
              상세 보고서 확인하기
            </span>
          </button>
        </div>
        <div className="w-full">
          <button
            className="noanimationbutton flex flex-col items-center p-4 min-w-32 w-full h-auto"
            disabled={disabled}
            onClick={() => handleCollectionClick(selectedReport.id)}
          >
            <span className="text-sm text-gray-700">
              <img
                src={icon}
                alt="collection-icon"
                className="w-10 h-10 font-light"
              />
            </span>
            <span className="text-[12px] font-bold text-black">{text}</span>
          </button>
        </div>
      </div>

      {/* Bottom Navigation Button */}
      <div className="mt-4">
        <button
          className="noanimationbutton flex items-center justify-center w-full h-[60px] px-5 py-4"
          role="button"
          onClick={handleBottomButtonClick}
          disabled={bottomButtonDisabled}
        >
          <span
            className={
              !bottomButtonDisabled
                ? "text-black text-[16px] pt-1"
                : "text-[#666666] text-[16px] pt-1"
            }
          >
            {bottomButtonText}
          </span>
          {!bottomButtonDisabled && (
            <img
              src={rightIcon}
              alt="Arrow Right"
              className="w-6 h-6 ml-1 mt-1"
            />
          )}
        </button>
      </div>

      {/* Copy URL, purchase, etc. */}
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
              value={`https://www.pixent.co.kr/report/${selectedReport?.uuid}`}
              disabled
              readOnly
            />
            <button
              onClick={handleCopy}
              data-tooltip-target="tooltip-copy-url-button"
              className="relative text-gray-500 border-l border-r p-2 px-4 h-full flex items-center justify-center space-x-2 w-[120px] whitespace-nowrap"
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
              <span className="text-sm">
                {copySuccess ? "Copied!" : "Copy URL"}
              </span>
            </button>
            <button
              onClick={() => {
                const url = `https://www.pixent.co.kr/report/${selectedReport?.uuid}`;
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
            </div>
          </div>
          <div className="flex text-gray-400 text-[12px] mb-4">
            제품 구매를 위해서는 반드시 링크를 복사해야 합니다.
          </div>
          <div className="mt-6">
            <button
              className="noanimationbutton flex items-center justify-center w-full px-5 py-4"
              role="button"
              onClick={() => {
                // TODO: handle purchase logic
              }}
            >
              <img src={cartIcon} alt="Arrow Right" className="w-6 h-6 mr-1" />
              <span className="text">구매하기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
