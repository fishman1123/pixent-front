// SummaryChart.jsx
import React, { useState, useEffect } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

import { useSelector } from "react-redux";
import { selectBlendedChartData } from "../../store/selectors/feedbackSelectors";

export const Summarychart = ({
  inputCitrus,
  inputFloral,
  inputWoody,
  inputMusk,
  inputFresh,
  inputSpicy,
}) => {
  const scentOrder = ["Musk", "Floral", "Citrus", "Spicy", "Woody", "Fruity"];

  const [profile, setProfile] = useState({
    Musk: inputMusk,
    Floral: inputFloral,
    Citrus: inputCitrus,
    Spicy: inputSpicy,
    Woody: inputWoody,
    Fruity: inputFresh,
  });

  const [animatedProfile, setAnimatedProfile] = useState({ ...profile });

  useEffect(() => {
    const animationDuration = 500; // ms
    const steps = 20;
    const stepDuration = animationDuration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep < steps) {
        setAnimatedProfile((prevProfile) => {
          const newProfile = { ...prevProfile };
          Object.keys(profile).forEach((key) => {
            newProfile[key] +=
              (profile[key] - prevProfile[key]) / (steps - currentStep);
          });
          return newProfile;
        });
        currentStep++;
      } else {
        clearInterval(interval);
        setAnimatedProfile({ ...profile });
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [profile]);

  const handleSliderChange = (event) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: parseInt(value, 10),
    }));
  };

  const originalData = scentOrder.map((key) => ({
    subject: key,
    A: animatedProfile[key],
  }));

  const blended = useSelector(selectBlendedChartData);
  console.log("SummaryChart >> blended from Redux:", blended);

  let finalData;
  if (blended) {
    finalData = scentOrder.map((key) => {
      const lowerKey = key.toLowerCase();
      return {
        subject: key,
        A: animatedProfile[key],
        B: blended[lowerKey] || 0,
      };
    });
  } else {
    finalData = originalData;
  }

  console.log("SummaryChart >> final data used for chart:", finalData);

  return (
    <div className="w-full max-w-md mx-auto">
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
              tick={(props) => {
                const { payload, x, y, textAnchor, ...rest } = props;
                let dy = 0;
                // Move the 4th label downward
                if (
                  payload &&
                  payload.value === scentOrder[3] // the 4th item
                ) {
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

            <Radar
              name="Scent"
              dataKey="A"
              stroke="#000000"
              fill="#000000"
              fillOpacity={0.3}
            />

            {blended && (
              <Radar
                name="Modified"
                dataKey="B"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.3}
              />
            )}
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Optional debug sliders, commented out */}
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
