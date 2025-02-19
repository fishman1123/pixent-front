import React from "react";

/**
 * Props expected:
 *  - inputCitrusOne, inputFloralOne, inputWoodyOne, inputMuskOne, inputFreshOne, inputSpicyOne
 *  - inputCitrusTwo, inputFloralTwo, inputWoodyTwo, inputMuskTwo, inputFreshTwo, inputSpicyTwo
 *
 * Example usage:
 *  <NewChart
 *    // original
 *    inputCitrusOne={dummyOne.citrus}
 *    inputFloralOne={dummyOne.floral}
 *    inputWoodyOne={dummyOne.woody}
 *    inputMuskOne={dummyOne.musk}
 *    inputFreshOne={dummyOne.fresh}
 *    inputSpicyOne={dummyOne.spicy}
 *    // new
 *    inputCitrusTwo={dummyTwo.citrus}
 *    inputFloralTwo={dummyTwo.floral}
 *    inputWoodyTwo={dummyTwo.woody}
 *    inputMuskTwo={dummyTwo.musk}
 *    inputFreshTwo={dummyTwo.fresh}
 *    inputSpicyTwo={dummyTwo.spicy}
 *  />
 */
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

  // Defines how wide the chart can be (in px) and a scaling factor
  const maxWidth = 130;
  const scale = 3; // Multiply each data point by 2.4px to control bar length

  // Small helper function to display numbers (e.g., rounding or formatting)
  const formatNumber = (num) => `${num}`;

  /**
   * Component that renders a single horizontal line showing:
   * 1. Start (original) -> End (new) range
   * 2. A dashed portion if there's a negative difference
   * 3. A label for the difference
   */
  const ScentLine = ({ name, start, end, change }) => {
    const left = Math.min(start, end) * scale; // left boundary in px
    const width = Math.abs(end - start) * scale; // difference in px

    return (
      <div className="mb-8">
        <div className="flex justify-center items-center">
          {/* Scent name on the left */}
          <span className="w-20 text-gray-500 text-sm">{name}</span>

          {/* The bar container, fixed width (maxWidth) */}
          <div className="relative" style={{ width: maxWidth }}>
            <div className="flex items-center">
              {/* The black line from 0 to end if you want a baseline:
                  you could do:
                  style={{ width: `${end * scale}px` }}
                  but let's represent only the 'segment' from 0 up to end */}
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

                  {/* The difference label (e.g., +20 or -15) */}
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
