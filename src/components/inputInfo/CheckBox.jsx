import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./CheckboxGrid.css";
import { useSelector, useDispatch } from "react-redux";
import { toggleSelection } from "../../store/checkboxSelectionSlice";
import { GraphComponent } from "../GraphComponent";
import { PortalModal } from "../PortalModal.jsx";
import { InfoButton } from "../InfoButton";

export const Checkbox = ({ componentId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const options = useSelector((state) => state.checkboxData);
  const confirmationState = useSelector(
    (state) => state.checkboxSelection.preferences,
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOptionData, setSelectedOptionData] = useState(null);

  const handleCheckboxChange = (optionId) => {
    const category = componentId === 1 ? "preferred" : "disliked";
    dispatch(toggleSelection({ category, optionId }));
  };

  const openModal = (option, event) => {
    event.stopPropagation();
    setSelectedOptionData(option);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="grid-container">
        {options.map((option) => {
          const category = componentId === 1 ? "preferred" : "disliked";
          const isChecked = confirmationState[category].includes(option.id);

          return (
            <div key={option.id} className="grid-item">
              <div className="label-and-button">
                {/* Use Flexbox to Position Label & InfoButton Properly */}
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
                  <InfoButton option={option} />
                </span>
              </div>

              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  id={`check-${option.id}-comp-${componentId}`}
                  checked={isChecked}
                  onChange={() => handleCheckboxChange(option.id)}
                />
                <label
                  htmlFor={`check-${option.id}-comp-${componentId}`}
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

      {isModalOpen && selectedOptionData && (
        <PortalModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={selectedOptionData.label}
        >
          <div className="modal-content flex flex-col space-y-6">
            <div className="description-section">
              <p className="description-text">
                {selectedOptionData.description}
              </p>
              {selectedOptionData.additionalInfo && (
                <div className="additional-info mt-4">
                  <strong className="info-title block mb-2">
                    {t("modal.suitableFor")}
                  </strong>
                  <ul className="info-list list-disc pl-5 text-[12px]">
                    {selectedOptionData.additionalInfo.map((info, index) => (
                      <li key={index}>{info}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {selectedOptionData.chartData && (
              <div className="graph-component mt-6">
                <GraphComponent
                  data={selectedOptionData.chartData}
                  label={selectedOptionData.label}
                />
              </div>
            )}
          </div>
        </PortalModal>
      )}
    </>
  );
};
