import React from "react";

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
  const scentData = [
    {
      name: "Citrus",
      start: inputCitrusOne,
      end: inputCitrusTwo,
      change: inputCitrusTwo - inputCitrusOne,
    },
    {
      name: "Floral",
      start: inputFloralOne,
      end: inputFloralTwo,
      change: inputFloralTwo - inputFloralOne,
    },
    {
      name: "Woody",
      start: inputWoodyOne,
      end: inputWoodyTwo,
      change: inputWoodyTwo - inputWoodyOne,
    },
    {
      name: "Musk",
      start: inputMuskOne,
      end: inputMuskTwo,
      change: inputMuskTwo - inputMuskOne,
    },
    {
      name: "Fruity",
      start: inputFreshOne,
      end: inputFreshTwo,
      change: inputFreshTwo - inputFreshOne,
    },
    {
      name: "Spicy",
      start: inputSpicyOne,
      end: inputSpicyTwo,
      change: inputSpicyTwo - inputSpicyOne,
    },
  ];

  const maxWidth = 160;
  const scale = 2;

  const formatNumber = (num) => `${num}`;

  const ScentLine = ({ name, start, end, change }) => {
    const left = Math.min(start, end) * scale; // left boundary in px
    const width = Math.abs(end - start) * scale; // difference in px

    return (
      <div className="mb-8">
        <div className="flex justify-center items-center">
          {/* Scent name on the left */}
          <span className="w-20 text-gray-500 text-sm">{name}</span>

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
            change={scent.change}
          />
        ))}
      </div>
    </div>
  );
};

export default NewChart;
