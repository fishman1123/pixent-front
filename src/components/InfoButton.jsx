import React, { useState } from "react";
import { PortalModal } from "./PortalModal";
import { GraphComponent } from "./GraphComponent";

export const InfoButton = ({ option }) => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const openInfoModal = (event) => {
    event.stopPropagation(); // Prevent event from bubbling up
    setIsInfoModalOpen(true);
  };

  const closeInfoModal = () => {
    setIsInfoModalOpen(false);
  };

  return (
    <div onClick={(event) => event.stopPropagation()}>
      {" "}
      {/* Stop propagation at the parent level */}
      <button type="button" onClick={openInfoModal} className="info-button">
        <svg
          className="w-4 h-3 text-gray-400 hover:text-gray-500"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116
                            0zm-8-3a1 1 0 00-.867.5 1 1 0
                            11-1.731-1A3 3 0 0113 8a3.001 3.001
                            0 01-2 2.83V11a1 1 0 11-2
                            0v-1a1 1 0 011-1 1 1 0
                            100-2zm0 8a1 1 0 100-2 1
                            1 0 000 2z"
            clipRule="evenodd"
          />
        </svg>
        <span className="sr-only">Show information</span>
      </button>
      {isInfoModalOpen && option && (
        <PortalModal
          isOpen={isInfoModalOpen}
          onClose={closeInfoModal}
          title={`Information about ${option.label}`}
        >
          <div
            className="modal-content flex flex-col space-y-6"
            // Prevent clicks inside the modal from closing it
            onClick={(e) => e.stopPropagation()}
          >
            <p className="description-text">{option.description}</p>

            {option.additionalInfo && (
              <div className="additional-info mt-4">
                <strong className="info-title block mb-2">
                  Additional Information
                </strong>
                <ul className="info-list list-disc pl-5 text-[12px]">
                  {option.additionalInfo.map((info, index) => (
                    <li key={index}>{info}</li>
                  ))}
                </ul>
              </div>
            )}

            {option.chartData && (
              <div className="graph-component mt-6">
                <strong className="info-title block mb-2">Related Data</strong>
                <GraphComponent data={option.chartData} label={option.label} />
              </div>
            )}
          </div>
        </PortalModal>
      )}
    </div>
  );
};
