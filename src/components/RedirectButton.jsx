// src/components/RedirectButton.jsx

import React, { useState } from 'react';
import './ProcedureButton.css';
import { ConfirmationModal } from "./ConfirmationModal.jsx";

export const RedirectButton = ({
                                   text,
                                   subText,
                                   delay = 0,
                                   target = "https://google.com",
                               }) => {
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    const handleOpenModal = () => {
        if (isButtonDisabled) return;
        setIsConfirmationOpen(true);
    };

    const handleConfirmRedirect = () => {
        setIsConfirmationOpen(false);

        setButtonDisabled(true);
        setTimeout(() => {
            if (typeof target === "string") {
                if (target.startsWith("https://")) {
                    window.open(target, "_blank");
                } else {
                    window.location.href = target;
                }
            }
            setButtonDisabled(false);
        }, delay);
    };

    const handleCancelRedirect = () => {
        setIsConfirmationOpen(false);
    };

    return (
        <div className="flex flex-col items-center">
            <button
                className="defaultButton z-0"
                onClick={handleOpenModal}
                disabled={isButtonDisabled}
            >
                <span className="text">{text}</span>
                <span>{subText}</span>
            </button>

            {isConfirmationOpen && (
                <ConfirmationModal
                    isOpen={isConfirmationOpen}
                    onClose={handleCancelRedirect}
                    onConfirm={handleConfirmRedirect}
                    title="주의사항 확인"
                    message=""
                >
                    <div className="w-full mb-4 flex justify-center">
                        <img
                            src="/newguideline.png"
                            alt="guideline"
                            className="max-w-[320px] w-auto h-auto"
                        />
                    </div>
                </ConfirmationModal>
            )}
        </div>
    );
};
