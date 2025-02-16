import React from "react";

// Map internal keys to display labels
const LABELS = {
  citrus: "Citrus",
  floral: "Floral",
  woody: "Woody",
  musk: "Musk",
  fruity: "Fruity",
  spicy: "Spicy",
};

function ScentProfile({ data }) {
  const scentKeys = ["citrus", "floral", "woody", "musk", "fruity", "spicy"];
  const maxValue = Math.max(...scentKeys.map((key) => data[key]));

  return (
    <div className="max-w-sm mx-auto py-4 font-sans bg-white">
      <div className="flex flex-col space-y-3">
        <div>
          <span>{data.desc}</span>
        </div>
        {scentKeys.map((key) => {
          const value = data[key];
          const barFill = (value / maxValue) * 100; // scale so largest = 100%

          return (
            <div className="flex items-center" key={key}>
              {/* Label */}
              <div className="w-16 text-sm text-gray-500">{LABELS[key]}</div>

              {/* Bar */}
              <div className="relative flex-1 h-[2px] mx-2 bg-gray-200 rounded">
                <div
                  className="absolute left-0 top-0 h-full bg-black transition-all duration-300"
                  style={{ width: `${barFill}%` }}
                />
              </div>

              {/* Value */}
              <div className="w-8 text-right text-sm text-gray-800">
                {value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ScentProfile;
