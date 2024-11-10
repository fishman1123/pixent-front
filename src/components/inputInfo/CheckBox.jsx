// src/components/inputInfo/Checkbox.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Added for translations
import "./CheckboxGrid.css";
import { useRecoilState, useRecoilValue } from 'recoil';
import { checkboxDataAtom } from '../../recoil/checkboxDataAtom.jsx';
import { confirmationAtom } from '../../recoil/confirmationAtom.jsx';
import { Modal } from '../Modal'; // Adjust the import path as needed
import { GraphComponent } from '../GraphComponent'; // Adjust the import path as needed

export const Checkbox = ({ componentId }) => {
    const { t } = useTranslation(); // Initialize translation function
    const options = useRecoilValue(checkboxDataAtom); // Options for checkboxes
    const [confirmationState, setConfirmationState] = useRecoilState(confirmationAtom); // Manage selections in confirmationAtom

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOptionData, setSelectedOptionData] = useState(null);

    // Handle checkbox selection and update the confirmationAtom based on componentId
    const handleCheckboxChange = (optionId) => {
        const selectedOption = options.find(option => option.id === optionId);

        setConfirmationState((prevState) => {
            const updatedPreferences = { ...prevState.preferences };
            const currentCategory = componentId === 1 ? 'preferred' : 'disliked';
            const oppositeCategory = componentId === 1 ? 'disliked' : 'preferred';

            // Check if the item is already selected in the current category
            if (updatedPreferences[currentCategory].some(item => item.id === selectedOption.id)) {
                // Remove the item from the current category
                updatedPreferences[currentCategory] = updatedPreferences[currentCategory].filter(
                    (item) => item.id !== selectedOption.id
                );
            } else {
                // Add the item to the current category and remove from the opposite category
                updatedPreferences[currentCategory] = [...updatedPreferences[currentCategory], selectedOption];
                // Remove the item from the opposite category
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
                    const isChecked = confirmationState.preferences[componentId === 1 ? 'preferred' : 'disliked'].some(
                        (item) => item.id === option.id
                    );
                    return (
                        <div key={option.id} className="grid-item">
                            <span
                                onClick={() => openModal(option)}
                                style={{ cursor: 'pointer', textDecoration: 'underline' }}
                            >
                                {option.label}
                            </span>
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
                <Modal
                    title={selectedOptionData.label}
                    onClose={() => setIsModalOpen(false)}
                >
                    <div className="modal-content flex flex-col space-y-6">
                        <div className="description-section">
                            <p className="description-text">
                                {selectedOptionData.description}
                            </p>
                            {selectedOptionData.additionalInfo && (
                                <div className="additional-info mt-4">
                                    <strong className="info-title block mb-2 ">
                                        {t('modal.suitableFor')} {/* Changed to translation key */}
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
                </Modal>
            )}
        </>
    );
};
