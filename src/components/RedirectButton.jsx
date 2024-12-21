// src/components/RedirectButton.jsx

import React, { useState } from 'react';
import './ProcedureButton.css'; // Reuse the same styles
import { ConfirmationModal } from "./ConfirmationModal.jsx";
// ^ adjust path if needed

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
        // Instead of redirecting, open the confirmation modal
        setIsConfirmationOpen(true);
    };

    // Called after user clicks "Yes" in the confirmation modal
    const handleConfirmRedirect = () => {
        // Close the modal
        setIsConfirmationOpen(false);

        // Now proceed with your existing delay-based logic
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

    // If the user clicks "No" or closes the modal
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
                    message="구매 전 필독 사항입니다."
                >
                    {/* Children content: any additional warnings or images */}
                    <div className="w-full mb-4 flex justify-center">
                        <img
                            src="/guideline.png"
                            alt="guideline"
                            className="max-w-[320px] w-auto h-auto"
                        />
                    </div>
                </ConfirmationModal>
            )}
        </div>
    );
};
