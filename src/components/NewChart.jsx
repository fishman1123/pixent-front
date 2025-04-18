import React from "react";

// Helper function to clamp value to [0, 100]
const clampValue = (value) => {
  if (value > 100) return 100;
  if (value < 0) return 0;
  return value;
};

const NewChart = ({
  // Original data
  inputCitrusOne = 0,
  inputFloralOne = 0,
  inputWoodyOne = 0,
  inputMuskOne = 0,
  inputFreshOne = 0,
  inputSpicyOne = 0,

  // New data
  inputCitrusTwo = 0,
  inputFloralTwo = 0,
  inputWoodyTwo = 0,
  inputMuskTwo = 0,
  inputFreshTwo = 0,
  inputSpicyTwo = 0,
}) => {
  // Clamp the values to ensure they do not exceed 100
  const scentData = [
    {
      name: "Citrus",
      start: clampValue(inputCitrusOne),
      end: clampValue(inputCitrusTwo),
    },
    {
      name: "Floral",
      start: clampValue(inputFloralOne),
      end: clampValue(inputFloralTwo),
    },
    {
      name: "Woody",
      start: clampValue(inputWoodyOne),
      end: clampValue(inputWoodyTwo),
    },
    {
      name: "Musk",
      start: clampValue(inputMuskOne),
      end: clampValue(inputMuskTwo),
    },
    {
      name: "Fruity",
      start: clampValue(inputFreshOne),
      end: clampValue(inputFreshTwo),
    },
    {
      name: "Spicy",
      start: clampValue(inputSpicyOne),
      end: clampValue(inputSpicyTwo),
    },
  ];

  // Find the highest value in the dataset (after clamping)
  // const maxValue = Math.max(...scentData.flatMap((d) => [d.start, d.end]));

  // Adjust scale based on max value condition
  const scale = 1.8;
  const maxWidth = 160;

  const formatNumber = (num) => `${num}`;

  const ScentLine = ({ name, start, end }) => {
    const change = end - start;
    const left = Math.min(start, end) * scale;
    const width = Math.abs(change) * scale;

    return (
      <div className="mb-8">
        <div className="flex justify-center items-center">
          {/* Scent name on the left */}
          <span className="w-[60px] text-gray-500 text-sm">{name}</span>

          <div className="relative" style={{ width: maxWidth }}>
            <div className="flex items-center">
              <div
                className="h-[1px] border-t border-black"
                style={{ width: `${end * scale}px` }}
              />

              {change !== 0 && (
                <>
                  <div
                    className="absolute h-3 border-l border-black"
                    style={{
                      left: `${start * scale}px`,
                      top: "-6px",
                    }}
                  />
                  <div
                    className={`absolute h-[1px] border-t ${
                      change < 0 ? "border-dashed" : ""
                    } border-black`}
                    style={{
                      left: `${left}px`,
                      width: `${width}px`,
                    }}
                  />
                  <div
                    className="absolute h-3 border-l border-black"
                    style={{
                      left: `${end * scale}px`,
                      top: "-6px",
                    }}
                  />
                  <span
                    className="absolute -top-5 text-sm"
                    style={{
                      left: `${((start + end) / 2) * scale}px`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    {change > 0
                      ? `+${formatNumber(change)}`
                      : formatNumber(change)}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* The "end" value label on the far right */}
          <span className="ml-8 text-sm w-8 text-right">
            {formatNumber(end)}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 flex gap-8">
      <div className="flex-1">
        {scentData.map((scent, idx) => (
          <ScentLine
            key={idx}
            name={scent.name}
            start={scent.start}
            end={scent.end}
          />
        ))}
      </div>
    </div>
  );
};

export default NewChart;
