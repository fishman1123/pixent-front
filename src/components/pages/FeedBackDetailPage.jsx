import React from "react";
import { useLocation } from "react-router-dom";
import { useGetReportFeedback } from "../../hooks/useGetReportFeedback.js";
import { FeedBackChart } from "../FeedBackChart.jsx";
import NewChart from "./NewChart.jsx";
import { LoadingData } from "./LoadingData.jsx";

export const FeedBackDetailPage = () => {
  const { state } = useLocation() || {};

  const {
    subid, // 'subId' from the calling component
    citrus, // e.g. chart.data.citrus
    floral,
    woody,
    musk,
    fresh,
    spicy,
  } = state || {};

  //    /api/user/report/{subid}/feedback
  const { data, isLoading, isError, error } = useGetReportFeedback(subid);

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

  const dummyOne = {
    citrus: citrus ?? 0,
    floral: floral ?? 0,
    woody: woody ?? 0,
    musk: musk ?? 0,
    fresh: fresh ?? 0,
    spicy: spicy ?? 0,
  };

  const dummyTwo = {
    citrus: data?.citrus ?? 0,
    floral: data?.floral ?? 0,
    woody: data?.woody ?? 0,
    musk: data?.musk ?? 0,
    fresh: data?.fresh ?? 0,
    spicy: data?.spicy ?? 0,
  };

  // console.log("Location-based Scent Data (dummyOne):", dummyOne);
  // console.log("API-based Feedback Data (dummyTwo):", dummyTwo);

  return (
    <div className="p-4">
      <div className="pl-4">
        <h1 className="text-xl mb-4">Scent Profile</h1>
      </div>

      <FeedBackChart
        // Radar 1 => data from navigate state
        inputCitrusOne={dummyOne.citrus}
        inputFloralOne={dummyOne.floral}
        inputWoodyOne={dummyOne.woody}
        inputMuskOne={dummyOne.musk}
        inputFreshOne={dummyOne.fresh}
        inputSpicyOne={dummyOne.spicy}
        // Radar 2 => data from API
        inputCitrusTwo={dummyTwo.citrus}
        inputFloralTwo={dummyTwo.floral}
        inputWoodyTwo={dummyTwo.woody}
        inputMuskTwo={dummyTwo.musk}
        inputFreshTwo={dummyTwo.fresh}
        inputSpicyTwo={dummyTwo.spicy}
      />

      <div className="px-4">
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

      <div className="px-5">
        <button
          className="noanimationbutton flex items-center justify-center w-full h-[60px] px-5 py-4"
          role="button"
          onClick={() => {}}
        >
          <span className="text-black text-[16px] pt-1">구매 or A/S</span>
        </button>
      </div>
    </div>
  );
};
