// src/components/RedirectButton.jsx
import React, { useState } from 'react';
import './ProcedureButton.css'; // Reuse the same styles as ProcedureButton

export const RedirectButton = ({ text, subText, delay = 2000 }) => {
    const [isButtonDisabled, setButtonDisabled] = useState(false);

    const handleButtonClick = () => {
        if (isButtonDisabled) return; // Prevent multiple clicks

        setButtonDisabled(true);

        setTimeout(() => {
            window.location.href = 'https://acscent.co.kr';
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
