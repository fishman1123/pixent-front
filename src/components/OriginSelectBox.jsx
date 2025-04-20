import React, { useState } from "react";
import "./inputInfo/CheckboxGrid.css";
import feedbackChoiceData from "../data/feedbackchoice.json";

export const OriginSelectBox = ({ setSelectedOrigin }) => {
  // Use data from feedbackchoice.json
  const originNames = feedbackChoiceData.map(item => ({
    id: item.id,
    label: item.name,
    description: item.desc,
    additionalInfo: [`Citrus: ${item.citrus}`, `Floral: ${item.floral}`, `Woody: ${item.woody}`, 
                     `Musk: ${item.musk}`, `Fruity: ${item.fruity}`, `Spicy: ${item.spicy}`],
  }));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOptionData, setSelectedOptionData] = useState(null);
  const [selectedOrigin, setSelectedOriginState] = useState(""); // Store only one selected origin

  const handleSelection = (label) => {
    const newSelection = selectedOrigin === label ? "" : label; // Deselect if clicked again
    setSelectedOriginState(newSelection);
    setSelectedOrigin(newSelection); // Pass selection to parent
  };

  const openModal = (option, event) => {
    event.stopPropagation();
    setSelectedOptionData(option);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="scroll-container">
        <div className="grid-container">
          {originNames.map((option) => {
            const isChecked = selectedOrigin === option.label;

            return (
              <div
                key={option.id}
                className="grid-item text-[13px] bg-white border"
              >
                <div className="label-and-button">
                  <span
                    onClick={(event) => openModal(option, event)}
                    className="label-text"
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    {option.label}
                  </span>
                </div>

                <div className="checkbox-wrapper ">
                  <input
                    type="checkbox"
                    id={`check-${option.id}`}
                    checked={isChecked}
                    onChange={() => handleSelection(option.label)}
                  />
                  <label
                    htmlFor={`check-${option.id}`}
                    style={{ "--size": "30px" }}
                  >
                    <svg viewBox="0 0 50 50">
                      <path d="M5 30 L 20 45 L 45 5"></path>
                    </svg>
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
