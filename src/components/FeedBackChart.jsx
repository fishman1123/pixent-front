import React, { useState, useEffect } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

export const FeedBackChart = ({
  // First set of inputs
  inputCitrusOne,
  inputFloralOne,
  inputWoodyOne,
  inputMuskOne,
  inputFreshOne,
  inputSpicyOne,

  // Second set of inputs
  inputCitrusTwo,
  inputFloralTwo,
  inputWoodyTwo,
  inputMuskTwo,
  inputFreshTwo,
  inputSpicyTwo,
}) => {
  // We'll use the same order as before.
  const scentOrder = ["Musk", "Floral", "Citrus", "Spicy", "Woody", "Fruity"];

  // State for the first profile
  const [profileOne, setProfileOne] = useState({
    Musk: inputMuskOne,
    Floral: inputFloralOne,
    Citrus: inputCitrusOne,
    Spicy: inputSpicyOne,
    Woody: inputWoodyOne,
    Fruity: inputFreshOne,
  });

  // State for the second profile
  const [profileTwo, setProfileTwo] = useState({
    Musk: inputMuskTwo,
    Floral: inputFloralTwo,
    Citrus: inputCitrusTwo,
    Spicy: inputSpicyTwo,
    Woody: inputWoodyTwo,
    Fruity: inputFreshTwo,
  });

  // State for animated transitions (Profile One)
  const [animatedProfileOne, setAnimatedProfileOne] = useState({
    ...profileOne,
  });
  // State for animated transitions (Profile Two)
  const [animatedProfileTwo, setAnimatedProfileTwo] = useState({
    ...profileTwo,
  });

  // Animate Profile One
  useEffect(() => {
    const animationDuration = 500; // ms
    const steps = 20;
    const stepDuration = animationDuration / steps;
    let currentStep = 0;

    const intervalOne = setInterval(() => {
      if (currentStep < steps) {
        setAnimatedProfileOne((prev) => {
          const newValues = { ...prev };
          Object.keys(profileOne).forEach((key) => {
            newValues[key] +=
              (profileOne[key] - prev[key]) / (steps - currentStep);
          });
          return newValues;
        });
        currentStep++;
      } else {
        clearInterval(intervalOne);
        setAnimatedProfileOne({ ...profileOne });
      }
    }, stepDuration);

    return () => clearInterval(intervalOne);
  }, [profileOne]);

  // Animate Profile Two
  useEffect(() => {
    const animationDuration = 500; // ms
    const steps = 20;
    const stepDuration = animationDuration / steps;
    let currentStep = 0;

    const intervalTwo = setInterval(() => {
      if (currentStep < steps) {
        setAnimatedProfileTwo((prev) => {
          const newValues = { ...prev };
          Object.keys(profileTwo).forEach((key) => {
            newValues[key] +=
              (profileTwo[key] - prev[key]) / (steps - currentStep);
          });
          return newValues;
        });
        currentStep++;
      } else {
        clearInterval(intervalTwo);
        setAnimatedProfileTwo({ ...profileTwo });
      }
    }, stepDuration);

    return () => clearInterval(intervalTwo);
  }, [profileTwo]);

  // Prepare data for both radars
  const chartData = scentOrder.map((key) => ({
    subject: key,
    A: animatedProfileOne[key] || 0, // Rate from first
    B: animatedProfileTwo[key] || 0, // Rate from second
  }));

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="h-40 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="70%"
            data={chartData}
            startAngle={90}
            endAngle={-270}
          >
            <PolarGrid />
            <PolarAngleAxis
              dataKey="subject"
              tick={(props) => {
                const { payload, x, y, textAnchor, ...rest } = props;
                let dy = 0;
                if (payload && payload.value === scentOrder[3]) {
                  dy = "1rem";
                }
                return (
                  <text
                    x={x}
                    y={y}
                    dy={dy}
                    textAnchor={textAnchor}
                    fill="#666"
                    fontSize={12}
                    {...rest}
                  >
                    {payload.value}
                  </text>
                );
              }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fontSize: 10 }}
            />

            {/* First Radar in black */}
            <Radar
              name="Profile One"
              dataKey="A"
              stroke="#000000"
              fill="#000000"
              fillOpacity={0.3}
            />

            {/* Second Radar in gray-400 */}
            <Radar
              name="Profile Two"
              dataKey="B"
              stroke="#9CA3AF" // Tailwind gray-400
              fill="#9CA3AF"
              fillOpacity={0.3}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/*
      Optional debug sliders for Profile One / Profile Two (commented out)
      --------------------------------------------------
      <div className="space-y-4">
        {scentOrder.map((key) => (
          <div key={key} className="flex items-center">
            <label htmlFor={`one-${key}`} className="w-20">
              {key} (One)
            </label>
            <input
              type="range"
              id={`one-${key}`}
              name={`one-${key}`}
              min="0"
              max="100"
              value={profileOne[key]}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                setProfileOne((prev) => ({ ...prev, [key]: val }));
              }}
              className="w-full mx-2"
            />
            <span className="w-10 text-right">{profileOne[key]}</span>
          </div>
        ))}

        {scentOrder.map((key) => (
          <div key={key} className="flex items-center">
            <label htmlFor={`two-${key}`} className="w-20">
              {key} (Two)
            </label>
            <input
              type="range"
              id={`two-${key}`}
              name={`two-${key}`}
              min="0"
              max="100"
              value={profileTwo[key]}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                setProfileTwo((prev) => ({ ...prev, [key]: val }));
              }}
              className="w-full mx-2"
            />
            <span className="w-10 text-right">{profileTwo[key]}</span>
          </div>
        ))}
      </div>
      */}
    </div>
  );
};

// Default props to prevent errors if any prop is missing
FeedBackChart.defaultProps = {
  inputCitrusOne: 1000,
  inputFloralOne: 0,
  inputWoodyOne: 0,
  inputMuskOne: 0,
  inputFreshOne: 0,
  inputSpicyOne: 0,

  inputCitrusTwo: 0,
  inputFloralTwo: 1500,
  inputWoodyTwo: 1000,
  inputMuskTwo: 0,
  inputFreshTwo: 1000,
  inputSpicyTwo: 0,
};
