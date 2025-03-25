import React from "react";
import { useLocation } from "react-router-dom";
import { useGetReportFeedback } from "../../hooks/useGetReportFeedback.js";
import { FeedBackChart } from "../FeedBackChart.jsx";
import NewChart from "../NewChart.jsx";
import { LoadingData } from "../pages/LoadingData.jsx";

export const FeedBackDetailPage = () => {
  const { state } = useLocation() || {};

  const {
    perfumeName,
    placeholderText,
    url,
    subid,
    citrus,
    floral,
    woody,
    musk,
    fresh, // If your API calls this "fruity,"
    spicy, // you may also want to rename it here.
  } = state || {};

  const { data, isLoading, isError, error } = useGetReportFeedback(subid);
  const propText = placeholderText;
  const propUrl = url;

  if (isLoading) {
    return (
      <div>
        <LoadingData />
      </div>
    );
  }
  if (isError) {
    return (
      <div>Error: {error?.message || "Could not fetch feedback data"}</div>
    );
  }

  // Original (dummy) data from state
  const dummyOne = {
    citrus: citrus ?? 0,
    floral: floral ?? 0,
    woody: woody ?? 0,
    musk: musk ?? 0,
    // If your API actually returns "fruity",
    // you could rename fresh => fruity to match
    fresh: fresh ?? 0,
    spicy: spicy ?? 0,
  };

  // Updated (dummy) data from API
  // Note: your API uses "fruity" instead of "fresh"
  const dummyTwo = {
    citrus: data?.citrus ?? 0,
    floral: data?.floral ?? 0,
    woody: data?.woody ?? 0,
    musk: data?.musk ?? 0,
    fresh: data?.fruity ?? 0, // if you want to match "fresh" to "fruity"
    spicy: data?.spicy ?? 0,
  };

  // FIX: use feedbackElementList instead of feedbacklist
  const feedbacklistData = data?.feedbackElementList || [];

  // Filter out “None” or ratio=0, if you only want to show active ingredients
  const validIngredients = feedbacklistData.filter(
    (item) => item.elementName !== "None" && (item.elementRatio ?? 0) > 0,
  );

  // Sum of valid new ratios
  const sumOfNewRatios = validIngredients.reduce(
    (acc, item) => acc + (item.elementRatio || 0),
    0,
  );

  // Remainder for the main perfume
  const mainPerfumeRatio = 100 - sumOfNewRatios;

  const targetName = perfumeName || "";

  return (
    <div className="mt-[100px]">
      <div className="pl-4">
        <h1 className="text-xl mb-4">Scent Profile</h1>
      </div>

      <FeedBackChart
        inputCitrusOne={dummyOne.citrus}
        inputFloralOne={dummyOne.floral}
        inputWoodyOne={dummyOne.woody}
        inputMuskOne={dummyOne.musk}
        inputFreshOne={dummyOne.fresh}
        inputSpicyOne={dummyOne.spicy}
        inputCitrusTwo={dummyTwo.citrus}
        inputFloralTwo={dummyTwo.floral}
        inputWoodyTwo={dummyTwo.woody}
        inputMuskTwo={dummyTwo.musk}
        inputFreshTwo={dummyTwo.fresh}
        inputSpicyTwo={dummyTwo.spicy}
      />

      {/* 조향 레시피 */}
      <div className="w-full mr-4">
        <div className="mx-5 border-b">조향 레시피</div>
        <div className="mt-3 flex justify-center">
          <div className="mt-3 flex items-center mx-4">
            {/* 기존 조합 */}
            <div className="p-4 border rounded h-[120px]">
              <h2 className="font-bold mb-2">기존 조합</h2>
              <p className="text-[12px]">{targetName} 100%</p>
            </div>

            <div className="text-2xl font-bold mx-3">→</div>

            {/* 변경 조합 */}
            <div className="p-4 border rounded bg-black text-white h-[120px]">
              <h2 className="font-bold mb-2">변경 조합</h2>
              <p className="text-[12px]">
                {targetName} {mainPerfumeRatio < 0 ? 0 : mainPerfumeRatio}%
              </p>
              {validIngredients.map((item, idx) => (
                <p className="text-[12px]" key={idx}>
                  {item.elementName} {item.elementRatio}%
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 향료 변화 */}
      <div className="w-full mt-3 border-b border-t border-black">
        <div className="pl-5 my-3 text-[20px] font-bold">향료 변화</div>
      </div>
      <div className="mt-4 px-4">
        <NewChart
          inputCitrusOne={dummyOne.citrus}
          inputFloralOne={dummyOne.floral}
          inputWoodyOne={dummyOne.woody}
          inputMuskOne={dummyOne.musk}
          inputFreshOne={dummyOne.fresh}
          inputSpicyOne={dummyOne.spicy}
          inputCitrusTwo={dummyTwo.citrus}
          inputFloralTwo={dummyTwo.floral}
          inputWoodyTwo={dummyTwo.woody}
          inputMuskTwo={dummyTwo.musk}
          inputFreshTwo={dummyTwo.fresh}
          inputSpicyTwo={dummyTwo.spicy}
        />
      </div>

      {/* 이동 버튼 */}
      <div className="px-5">
        <button
          className="noanimationbutton flex items-center justify-center w-full h-[60px] px-5 py-4"
          role="button"
          onClick={() => {
            window.location.href = propUrl;
          }}
        >
          <span className="text-black text-[16px] pt-1">{propText}</span>
        </button>
      </div>
    </div>
  );
};
