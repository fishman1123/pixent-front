import React, { useState, useRef, useEffect } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { useSelector, useDispatch } from "react-redux";
import { setAttribute } from "../../store/feedbackPostSlice"; // Redux action
import { selectBlendedChartData } from "../../store/selectors/feedbackSelectors";

export const SummaryChart = ({
  inputCitrus,
  inputFloral,
  inputWoody,
  inputMusk,
  inputFresh,
  inputSpicy,
}) => {
  const dispatch = useDispatch();

  // 1) Pull in "blended" values from Redux
  const blended = useSelector(selectBlendedChartData) || {};

  // 2) Keep track of previous blended values so we only dispatch when there's an actual change
  const previousBlendedRef = useRef({});

  // 3) The order of scents we display (should match your Redux slice order if relevant)
  const scentOrder = ["Musk", "Floral", "Citrus", "Spicy", "Woody", "Fruity"];

  // 4) Initialize local profile state with either "blended" or fallback input props
  const [profile, setProfile] = useState({
    Musk: blended.musk ?? inputMusk,
    Floral: blended.floral ?? inputFloral,
    Citrus: blended.citrus ?? inputCitrus,
    Spicy: blended.spicy ?? inputSpicy,
    Woody: blended.woody ?? inputWoody,
    Fruity: blended.fruity ?? inputFresh,
  });

  // 5) Optionally track a second "animatedProfile" if you plan to animate transitions
  const [animatedProfile, setAnimatedProfile] = useState({ ...profile });

  // 6) Map our scent keys (as used in UI) to the matching Redux keys
  const scentMap = {
    Musk: "musk",
    Floral: "floral",
    Citrus: "citrus",
    Spicy: "spicy",
    Woody: "woody",
    Fruity: "fruity",
  };

  /**
   * 7) 🚀 Sync blended values into Redux only when necessary — via useEffect
   *    Instead of dispatching in the component body (which caused the error),
   *    we now do it after render, in a side effect.
   */
  useEffect(() => {
    // Loop through each scent key, compare with previous ref
    Object.keys(scentMap).forEach((key) => {
      const reduxKey = scentMap[key];

      // If the new "blended[reduxKey]" is defined AND differs from the old one, dispatch
      if (
        blended[reduxKey] !== undefined &&
        blended[reduxKey] !== previousBlendedRef.current[reduxKey]
      ) {
        console.log(
          `🔥 Updating Redux with Blended Data: ${reduxKey} -> ${blended[reduxKey]}`,
        );
        // Dispatch the new value
        dispatch(setAttribute({ key: reduxKey, value: blended[reduxKey] }));
      }
    });

    // After we've checked everything, update the reference to the newest values
    previousBlendedRef.current = { ...blended };
  }, [blended, dispatch, scentMap]);

  /**
   * 8) Handle local slider changes (if you choose to expose them).
   *    This only updates local state "profile," and does NOT reset Redux or dispatch.
   */
  const handleSliderChange = (event) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: parseInt(value, 10),
    }));
  };

  // 9) Prepare data for the RadarChart
  //    - "A" = the user's local (animated) profile
  //    - "B" = the "blended" data from Redux
  const finalData = scentOrder.map((key) => ({
    subject: key,
    A: animatedProfile[key], // black radar
    B: blended[key.toLowerCase()] || 0, // green radar
  }));

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Radar Chart Container */}
      <div className="h-40 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="70%"
            data={finalData}
            startAngle={90}
            endAngle={-270}
          >
            <PolarGrid />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fontSize: 12, fill: "#666" }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fontSize: 10 }}
            />

            {/* Black Radar (User-Modified Profile) */}
            <Radar
              name="User Profile"
              dataKey="A"
              stroke="#000000"
              fill="#000000"
              fillOpacity={0.3}
            />

            {/* Green Radar (Blended Data from Redux) */}
            {Object.keys(blended).length > 0 && (
              <Radar
                name="Blended Data"
                dataKey="B"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.3}
              />
            )}
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/*
         10) [Optional] Debug sliders for testing local profile adjustments
         (Commented out by default)
      */}
      {/*
      <div className="space-y-4">
        {scentOrder.map((key) => (
          <div key={key} className="flex items-center">
            <label htmlFor={key} className="w-20">
              {key}
            </label>
            <input
              type="range"
              id={key}
              name={key}
              min="0"
              max="100"
              value={profile[key]}
              onChange={handleSliderChange}
              className="w-full mx-2"
            />
            <span className="w-10 text-right">{profile[key]}</span>
          </div>
        ))}
      </div>
      */}
    </div>
  );
};
