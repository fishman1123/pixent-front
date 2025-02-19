import React from "react";
import { useParams } from "react-router-dom";
import { FeedBackChart } from "../FeedBackChart.jsx";
import NewChart from "./NewChart.jsx";

export const FeedBackDetailPage = () => {
  // 1) Grab the dynamic param from the URL
  const { id } = useParams(); // This 'id' is actually your subId

  // 2) Create some dummy data
  const dummyOne = {
    citrus: 25,
    floral: 40,
    woody: 10,
    musk: 30,
    fresh: 15,
    spicy: 50,
  };

  const dummyTwo = {
    citrus: 50,
    floral: 20,
    woody: 30,
    musk: 10,
    fresh: 45,
    spicy: 10,
  };

  return (
    <div className="p-4">
      <div className="pl-4">
        <h1 className="text-xl mb-4">Scent Profile</h1>
      </div>

      <FeedBackChart
        // Pass the dummy data for the first radar
        inputCitrusOne={dummyOne.citrus}
        inputFloralOne={dummyOne.floral}
        inputWoodyOne={dummyOne.woody}
        inputMuskOne={dummyOne.musk}
        inputFreshOne={dummyOne.fresh}
        inputSpicyOne={dummyOne.spicy}
        // And for the second radar
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
          // And for the second radar
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
          disabled=""
        >
          <span className="text-black text-[16px] pt-1">
            {/*this need to be conditional rendering*/}
            {/*{index === 0 ? "구매하기" : "매장 예약하기"}*/}
            구매 or A/S
          </span>
        </button>
      </div>
    </div>
  );
};
