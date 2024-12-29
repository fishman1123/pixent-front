import React, { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userAtoms } from '../recoil/userAtoms';
import { confirmationAtom } from '../recoil/confirmationAtom';
import { useNavigate } from 'react-router-dom';
import './ProcedureButton.css';
import { modalTriggerAtom } from "../recoil/modalTriggerAtom.jsx";
import { useTranslation } from "react-i18next";
import { PortalModal } from "./PortalModal.jsx";

export const ProcedureButton = ({ text, route, subText, confirm }) => {
    const { t } = useTranslation();
    const setUserState = useSetRecoilState(userAtoms);
    const navigate = useNavigate();
    const [confirmationState, setConfirmationState] = useRecoilState(confirmationAtom);
    const [modalState, setModalState] = useRecoilState(modalTriggerAtom);
    const [userState] = useRecoilState(userAtoms);
    const [isButtonDisabled, setButtonDisabled] = useState(false);

    const handleButtonClick = () => {
        if (isButtonDisabled) return;

        setButtonDisabled(true);
        if (confirm) {
            setConfirmationState((prevState) => ({
                ...prevState,
                isOpen: true,
            }));
        } else {
            setTimeout(() => {
                setUserState((prevState) => ({
                    ...prevState,
                    currentPage: route,
                }));
                navigate(route);
                setButtonDisabled(false);
            }, 700);
        }
    };

    const handleConfirm = () => {
        setConfirmationState((prevState) => ({
            ...prevState,
            isOpen: false,
            isConfirm: true,
        }));
        setModalState({ isOpen: false });

        setTimeout(() => {
            setUserState((prevState) => ({
                ...prevState,
                currentPage: route,
            }));
            navigate(route);
            setButtonDisabled(false);
        }, 200);
    };

    const handleCancel = () => {
        setConfirmationState((prevState) => ({
            ...prevState,
            isOpen: false,
            isConfirm: false,
        }));
        setModalState({ isOpen: false });
        setButtonDisabled(false);
    };

    return (
        <div className="flex justify-center">
            {!confirmationState.isOpen && (
                <button
                    className="defaultButton"
                    role="button"
                    onClick={handleButtonClick}
                    disabled={isButtonDisabled}
                >
                    <span className="text">{text}</span>
                    <span>{subText}</span>
                </button>
            )}

            <PortalModal
                isOpen={confirmationState.isOpen}
                onClose={handleCancel}
                title={t('confirmationModal.title')}
                showConfirmButtons
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                confirmText={t('confirmationModal.confirm')}
                cancelText={t('confirmationModal.cancel')}
            >
                <p>{t('confirmationModal.proceedQuestion')}</p>

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

                <div className="mt-4">
                    <h3 className="text-lg font-bold">{t('confirmationModal.howWeUsePreferences')}</h3>
                    <ul className="list-disc pl-5 text-[14px]">
                        <li>{t('confirmationModal.usePreference1')}</li>
                        <li>{t('confirmationModal.usePreference2')}</li>
                    </ul>
                </div>
            </PortalModal>
        </div>
    );
};
