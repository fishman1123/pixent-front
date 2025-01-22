import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userAtoms } from '../recoil/userAtoms';
import { confirmationAtom } from '../recoil/confirmationAtom';
import { useNavigate } from 'react-router-dom';
import './ProcedureButton.css';
import { modalTriggerAtom } from "../recoil/modalTriggerAtom.jsx";
import { useTranslation } from "react-i18next";
import { PortalModal } from "./PortalModal.jsx";
import PrimeModal from './PrimeModal';

export const ProcedureButton = ({ text, route, subText, confirm }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Recoil
    const [userState, setUserState] = useRecoilState(userAtoms);
    const [confirmationState, setConfirmationState] = useRecoilState(confirmationAtom);
    const [modalState, setModalState] = useRecoilState(modalTriggerAtom);

    // Local
    const [isButtonDisabled, setButtonDisabled] = useState(false);

    const [loginNeededModalOpen, setLoginNeededModalOpen] = useState(false);

    const handleButtonClick = () => {
        if (isButtonDisabled) return;

        const token = localStorage.getItem('gToken');
        const isAuth = !!token; // true if token exists, false otherwise

        setUserState(prev => ({
            ...prev,
            isAuthenticated: isAuth,
        }));

        if (!isAuth) {
            setLoginNeededModalOpen(true);
            return;
        }

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

    const handleCloseLoginNeededModal = () => {
        setLoginNeededModalOpen(false);
        navigate('/login');
    };

    return (
        <div className="flex justify-center">
            {/* The main button, only shown if confirmation modal isn't open */}
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

            {/* Confirmation Modal (existing) */}
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
                    <h3 className="text-lg font-bold">
                        {t('confirmationModal.preferredScents')}
                    </h3>
                    {confirmationState.preferences.preferred.length > 0 ? (
                        confirmationState.preferences.preferred.map((scent, index) => (
                            <div key={index} className="mb-4">
                                <p className="font-semibold">{t(scent.label)}</p>
                                <p className="text-gray-600">{t(scent.description)}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">
                            {t('confirmationModal.noPreferredScents')}
                        </p>
                    )}
                </div>

                <div className="mt-4">
                    <h3 className="text-lg font-bold">
                        {t('confirmationModal.dislikedScents')}
                    </h3>
                    {confirmationState.preferences.disliked.length > 0 ? (
                        confirmationState.preferences.disliked.map((scent, index) => (
                            <div key={index} className="mb-4">
                                <p className="font-semibold">{t(scent.label)}</p>
                                <p className="text-gray-600">{t(scent.description)}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">
                            {t('confirmationModal.noDislikedScents')}
                        </p>
                    )}
                </div>

                <div className="mt-4">
                    <h3 className="text-lg font-bold">
                        {t('confirmationModal.howWeUsePreferences')}
                    </h3>
                    <ul className="list-disc pl-5 text-[14px]">
                        <li>{t('confirmationModal.usePreference1')}</li>
                        <li>{t('confirmationModal.usePreference2')}</li>
                    </ul>
                </div>
            </PortalModal>

            {/* "Login needed" Modal using PrimeModal (same as SecuredRoute) */}
            {loginNeededModalOpen && (
                <PrimeModal
                    isOpen={loginNeededModalOpen}
                    onClose={handleCloseLoginNeededModal}
                    title="Login Required"
                >
                    <p className="my-2">로그인이 필요합니다. 로그인 후 이용해주세요.</p>
                </PrimeModal>
            )}
        </div>
    );
};
