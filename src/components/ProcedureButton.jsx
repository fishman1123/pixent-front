// src/components/ProcedureButton.jsx
import React, { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userAtoms } from '../recoil/userAtoms';
import { confirmationAtom } from '../recoil/confirmationAtom';
import { useNavigate } from 'react-router-dom';
import { Modal } from './Modal.jsx';
import './ProcedureButton.css';
import { modalTriggerAtom } from "../recoil/modalTriggerAtom.jsx";
import { useTranslation } from "react-i18next";

export const ProcedureButton = ({ text, route, subText, confirm }) => {
    const { t } = useTranslation(); // Access the translation function
    const setUserState = useSetRecoilState(userAtoms);
    const navigate = useNavigate();
    const [confirmationState, setConfirmationState] = useRecoilState(confirmationAtom);
    const [modalState, setModalState] = useRecoilState(modalTriggerAtom);
    const [userState] = useRecoilState(userAtoms);
    const [isButtonDisabled, setButtonDisabled] = useState(false); // State to disable the button during processing

    const handleButtonClick = () => {
        if (isButtonDisabled) return; // Prevent multiple clicks

        setButtonDisabled(true); // Disable the button

        if (confirm) {
            setConfirmationState((prevState) => ({
                ...prevState,
                isOpen: true, // Open the confirmation modal
            }));
        } else {
            setTimeout(() => {
                setUserState((prevState) => ({
                    ...prevState,
                    currentPage: route, // Update the current page
                }));
                navigate(route); // Navigate to the specified route

                setButtonDisabled(false); // Re-enable the button after navigation
            }, 700);
        }
    };

    const handleConfirm = () => {
        setConfirmationState((prevState) => ({
            ...prevState,
            isOpen: false, // Close the modal
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
        <div className="flex justify-center">
            {/* Display the button only when the modal is not open */}
            {!confirmationState.isOpen && (
                <button
                    className="defaultButton"
                    role="button"
                    onClick={handleButtonClick}
                    disabled={isButtonDisabled} // Disable the button when processing
                >
                    <span className="text">{text}</span>
                    <span>{subText}</span>
                </button>
            )}

            {confirmationState.isOpen && (
                <Modal title={t('confirmationModal.title')} onClose={handleCancel}>
                    <p>{t('confirmationModal.proceedQuestion')}</p>

                    {/* Preferred Scents Section */}
                    <div className="mt-4">
                        <h3 className="text-lg font-bold">{t('confirmationModal.preferredScents')}</h3>
                        {confirmationState.preferences.preferred.length > 0 ? (
                            confirmationState.preferences.preferred.map((scent, index) => (
                                <div key={index} className="mb-4">
                                    <p className="font-semibold">{t(scent.label)}</p>
                                    <p className="text-gray-600">{t(scent.description)}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">{t('confirmationModal.noPreferredScents')}</p>
                        )}
                    </div>

                    {/* Disliked Scents Section */}
                    <div className="mt-4">
                        <h3 className="text-lg font-bold">{t('confirmationModal.dislikedScents')}</h3>
                        {confirmationState.preferences.disliked.length > 0 ? (
                            confirmationState.preferences.disliked.map((scent, index) => (
                                <div key={index} className="mb-4">
                                    <p className="font-semibold">{t(scent.label)}</p>
                                    <p className="text-gray-600">{t(scent.description)}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">{t('confirmationModal.noDislikedScents')}</p>
                        )}
                    </div>

                    {/* How We Use Preferences Section */}
                    <div className="mt-4">
                        <h3 className="text-lg font-bold">{t('confirmationModal.howWeUsePreferences')}</h3>
                        <ul className="list-disc pl-5">
                            <li>{t('confirmationModal.usePreference1')}</li>
                            <li>{t('confirmationModal.usePreference2')}</li>
                        </ul>
                    </div>

                    {/* Confirmation and Cancellation Buttons */}
                    <div className="flex flex-col justify-between mt-4">
                        <div className="flex justify-center">
                            <button onClick={handleConfirm} className="defaultButton mb-4 w-full max-w-[285px]">
                                <span className="text">{t('confirmationModal.confirm')}</span>
                                <span>{t('confirmationModal.confirm')}</span>
                            </button>
                        </div>
                        <div className="flex justify-center">
                            <button onClick={handleCancel} className="defaultButton w-full max-w-[285px]">
                                <span className="text">{t('confirmationModal.cancel')}</span>
                                <span>{t('confirmationModal.cancel')}</span>
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};