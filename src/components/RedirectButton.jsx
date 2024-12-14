// src/components/RedirectButton.jsx
import React, { useState } from 'react';
import './ProcedureButton.css'; // Reuse the same styles as ProcedureButton

export const RedirectButton = ({ text, subText, delay = 0, target }) => {
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [targetUrl] = useState(target || ''); // No need to change it dynamically

    const handleButtonClick = () => {
        if (isButtonDisabled) return;

        setButtonDisabled(true);

        setTimeout(() => {
            if (typeof targetUrl === 'string') {
                if (targetUrl.startsWith('https://')) {
                    window.open(targetUrl, '_blank');
                } else {
                    window.location.href = targetUrl;
                }
            }
            setButtonDisabled(false);
        }, delay);
    };

    return (
        <div className="flex justify-center">
            <button
                className="defaultButton"
                role="button"
                onClick={handleButtonClick}
                disabled={isButtonDisabled}
            >
                <span className="text">{text}</span>
                <span>{subText}</span>
            </button>
        </div>
    );
};
