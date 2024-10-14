import React, { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userAtoms } from '../recoil/userAtoms';
import { confirmationAtom } from '../recoil/confirmationAtom';
import { useNavigate } from 'react-router-dom';
import { Modal } from './Modal.jsx';
import './ProcedureButton.css';
import { modalTriggerAtom } from "../recoil/modalTriggerAtom.jsx";

export const ProcedureButton = ({ text, route, subText, confirm }) => {
    const setUserState = useSetRecoilState(userAtoms);
    const navigate = useNavigate();
    const [confirmationState, setConfirmationState] = useRecoilState(confirmationAtom);
    const [modalState, setModalState] = useRecoilState(modalTriggerAtom);
    const [isButtonDisabled, setButtonDisabled] = useState(false); // New state for disabling the button

    const handleButtonClick = () => {
        if (isButtonDisabled) return; // Prevent click if button is disabled

        setButtonDisabled(true); // Disable the button on click

        if (confirm) {
            setConfirmationState((prevState) => ({
                ...prevState,
                isOpen: true, // Open the confirmation modal
            }));
        } else {
            setTimeout(() => {
                setUserState((prevState) => ({
                    ...prevState,
                    currentPage: route, // Update the state
                }));
                navigate(route); // Navigate after the delay

                setButtonDisabled(false); // Re-enable the button after navigation
            }, 700);
        }
    };

    const handleConfirm = () => {
        setConfirmationState((prevState) => ({
            ...prevState,
            isOpen: false, // Close the modal before navigating
            isConfirm: true,
        }));
        setModalState({ isOpen: false });

        setTimeout(() => {
            setUserState((prevState) => ({
                ...prevState,
                currentPage: route,
            }));
            navigate(route);
            setButtonDisabled(false); // Re-enable the button after navigation
        }, 200);
    };

    const handleCancel = () => {
        setConfirmationState((prevState) => ({
            ...prevState,
            isOpen: false,
            isConfirm: false,
        }));
        setModalState({ isOpen: false });
        setButtonDisabled(false); // Re-enable the button after cancellation
    };

    return (
        <div>
            {/* Only show the button when the modal is NOT open */}
            {!confirmationState.isOpen && (
                <button
                    className="defaultButton"
                    role="button"
                    onClick={handleButtonClick}
                    disabled={isButtonDisabled} // Disable the button when isButtonDisabled is true
                >
                    <span className="text">{text}</span>
                    <span>{subText}</span>
                </button>
            )}

            {confirmationState.isOpen && (
                <Modal title="Confirm Your Choices" onClose={handleCancel}>
                    <p>Do you want to proceed with the current selections?</p>

                    {/* Render Preferred Scents */}
                    <div className="mt-4">
                        <h3 className="text-lg font-bold">PREFERRED SCENTS</h3>
                        {confirmationState.preferences.preferred.length > 0 ? (
                            confirmationState.preferences.preferred.map((scent, index) => (
                                <div key={index} className="mb-4">
                                    <p className="font-semibold">{scent.label}</p>
                                    <p className="text-gray-600">{scent.description}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">No preferred scents selected.</p>
                        )}
                    </div>

                    {/* Render Disliked Scents */}
                    <div className="mt-4">
                        <h3 className="text-lg font-bold">DISLIKED SCENTS</h3>
                        {confirmationState.preferences.disliked.length > 0 ? (
                            confirmationState.preferences.disliked.map((scent, index) => (
                                <div key={index} className="mb-4">
                                    <p className="font-semibold">{scent.label}</p>
                                    <p className="text-gray-600">{scent.description}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">No disliked scents selected.</p>
                        )}
                    </div>

                    {/* Description on how the preferences will be used */}
                    <div className="mt-4">
                        <h3 className="text-lg font-bold">HOW WE USE YOUR PREFERENCES</h3>
                        <ul className="list-disc pl-5">
                            <li>Recommendations will focus on your preferred scent categories.</li>
                            <li>Scents from disliked categories will be excluded from recommendations.</li>
                        </ul>
                    </div>

                    <div className="flex flex-col justify-between mt-4">
                        <div>
                            <button onClick={handleConfirm} className="defaultButton mb-4 w-full max-w-[285px]">
                                <span className="text">Confirm</span>
                                <span>Confirm</span>
                            </button>
                        </div>
                        <div>
                        <button onClick={handleCancel} className="defaultButton w-full max-w-[285px]">
                            <span className="text">Cancel</span>
                            <span>Cancel</span>
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};
