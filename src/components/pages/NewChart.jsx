import React, { useState } from "react";

const ScentController = () => {
  const [scentData, setScentData] = useState([
    { name: "Citrus", start: 1.5, end: 10.0, change: 8.5 },
    { name: "Floral", start: 6.0, end: 4.0, change: -2.0 },
    { name: "Woody", start: 2.0, end: 6.0, change: 4.0 },
    { name: "Musk", start: 2.0, end: 0.0, change: -2.0 },
    { name: "Fruity", start: 0.0, end: 8.0, change: 0.0 },
    { name: "Spicy", start: 0.0, end: 1.0, change: 0.0 },
  ]);

  const maxWidth = 240;
  const scale = 24;

  const formatNumber = (num) => {
    return Number(num.toFixed(1)).toString();
  };

  const updateScentValue = (index, field, value) => {
    const newData = [...scentData];
    let newValue = parseFloat(value) || 0; // parseFloat로 변경하여 소수점 지원

    if (field !== "change") {
      newValue = Math.max(0, newValue);
      newValue = Math.round(newValue * 10) / 10; // 소수점 첫째자리까지만 유지
    }

    newData[index] = {
      ...newData[index],
      [field]: newValue,
      change:
        field === "start"
          ? Number((newData[index].end - newValue).toFixed(1))
          : field === "end"
            ? Number((newValue - newData[index].start).toFixed(1))
            : newValue,
    };

    setScentData(newData);
  };

  const ScentLine = ({ name, start, end, change }) => {
    return (
      <div className="mb-8">
        <div className="flex items-center">
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
                    className={`absolute h-[1px] border-t ${change < 0 ? "border-dashed" : ""} border-black`}
                    style={{
                      left: `${Math.min(start, end) * scale}px`,
                      width: `${Math.abs(change) * scale}px`,
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
                      left: `${((start + end) * scale) / 2}px`,
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
        {scentData.map((scent, index) => (
          <ScentLine
            key={index}
            name={scent.name}
            start={scent.start}
            end={scent.end}
            change={scent.change}
          />
        ))}
      </div>

      <div className="w-72 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium mb-4">값 조정</h3>
        {scentData.map((scent, index) => (
          <div key={index} className="mb-4">
            <h4 className="font-medium mb-2">{scent.name}</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label className="text-sm w-16">시작값:</label>
                <input
                  type="number"
                  value={scent.start}
                  onChange={(e) =>
                    updateScentValue(index, "start", e.target.value)
                  }
                  className="w-24 px-2 py-1 border rounded"
                  min="0"
                  step="0.1"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm w-16">최종값:</label>
                <input
                  type="number"
                  value={scent.end}
                  onChange={(e) =>
                    updateScentValue(index, "end", e.target.value)
                  }
                  className="w-24 px-2 py-1 border rounded"
                  min="0"
                  step="0.1"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScentController;
