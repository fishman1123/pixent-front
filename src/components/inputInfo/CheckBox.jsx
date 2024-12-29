// src/components/inputInfo/Checkbox.jsx

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import "./CheckboxGrid.css";
import { useRecoilState, useRecoilValue } from 'recoil';
import { checkboxDataAtom } from '../../recoil/checkboxDataAtom.jsx';
import { confirmationAtom } from '../../recoil/confirmationAtom.jsx';
// import { Modal } from '../Modal'; // <-- Remove or comment out
import { GraphComponent } from '../GraphComponent';

// Import your new Portal-based modal:
import { PortalModal } from '../PortalModal.jsx'; // Adjust import path as needed

export const Checkbox = ({ componentId }) => {
    const { t } = useTranslation();
    const options = useRecoilValue(checkboxDataAtom);
    const [confirmationState, setConfirmationState] = useRecoilState(confirmationAtom);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOptionData, setSelectedOptionData] = useState(null);

    const [visiblePopoverId, setVisiblePopoverId] = useState(null);

    const handleCheckboxChange = (optionId) => {
        const selectedOption = options.find(option => option.id === optionId);

        setConfirmationState((prevState) => {
            const updatedPreferences = { ...prevState.preferences };
            const currentCategory = componentId === 1 ? 'preferred' : 'disliked';
            const oppositeCategory = componentId === 1 ? 'disliked' : 'preferred';

            // Toggle logic
            if (updatedPreferences[currentCategory].some(item => item.id === selectedOption.id)) {
                // If it's already in currentCategory, remove it
                updatedPreferences[currentCategory] = updatedPreferences[currentCategory].filter(
                    (item) => item.id !== selectedOption.id
                );
            } else {
                // Otherwise add it, and also remove it from oppositeCategory
                updatedPreferences[currentCategory] = [
                    ...updatedPreferences[currentCategory],
                    selectedOption
                ];
                updatedPreferences[oppositeCategory] = updatedPreferences[oppositeCategory].filter(
                    (item) => item.id !== selectedOption.id
                );
            }

            return {
                ...prevState,
                preferences: updatedPreferences,
            };
        });
    };

    const openModal = (option) => {
        setSelectedOptionData(option);
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="grid-container">
                {options.map((option) => {
                    const isChecked = confirmationState.preferences[
                        componentId === 1 ? 'preferred' : 'disliked'
                        ].some((item) => item.id === option.id);

                    return (
                        <div key={option.id} className="grid-item">
                            <div className="label-and-button">
                                <span
                                    onClick={() => openModal(option)}
                                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                >
                                    {option.label}
                                    <button
                                        type="button"
                                        onMouseEnter={() => setVisiblePopoverId(option.id)}
                                        onMouseLeave={() => setVisiblePopoverId(null)}
                                    >
                                        <svg
                                            className="w-4 h-3 ms-1 text-gray-400 hover:text-gray-500"
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

            {/* Instead of <Modal />, use <PortalModal /> */}
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
                                        {t('modal.suitableFor')}
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
