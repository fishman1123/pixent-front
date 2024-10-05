// CheckBox.jsx
import React, { useState } from 'react';
import "./CheckboxGrid.css";
import { useRecoilState, useRecoilValue } from 'recoil';
import { checkboxDataAtom } from '../../recoil/checkboxDataAtom.jsx';
import { checkboxSelectionsAtom } from '../../recoil/checkboxSelectionsAtom.jsx';
import { Modal } from '../Modal'; // Adjust the import path as needed
import { GraphComponent } from '../GraphComponent'; // Adjust the import path as needed

export const Checkbox = ({ componentId }) => {
    const options = useRecoilValue(checkboxDataAtom);
    const [selections, setSelections] = useRecoilState(checkboxSelectionsAtom);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOptionData, setSelectedOptionData] = useState(null);

    const handleCheckboxChange = (optionId) => {
        setSelections((prevSelections) => {
            // Toggle selection
            const newSelections = { ...prevSelections };

            if (prevSelections[optionId] === componentId) {
                newSelections[optionId] = null;
            } else {
                newSelections[optionId] = componentId;
            }

            return newSelections;
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
                    const isChecked = selections[option.id] === componentId;
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
                    <p className="text-base leading-relaxed text-black">
                        {selectedOptionData.description}
                    </p>
                    {selectedOptionData.additionalInfo && (
                        <p className="text-base leading-relaxed text-black">
                            <strong className="text-lg">이런 사람들한테 어울려요</strong>
                            <ul className="list-disc pl-5 mt-2">
                                {selectedOptionData.additionalInfo.map((info, index) => (
                                    <li key={index}>{info}</li>
                                ))}
                            </ul>
                        </p>
                    )}
                    {selectedOptionData.chartData && (
                        <GraphComponent
                            data={selectedOptionData.chartData}
                            label={selectedOptionData.label}
                        />
                    )}
                </Modal>
            )}
        </>
    );
};
