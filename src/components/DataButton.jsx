// src/components/DataButton.jsx
import React from "react";

export const DataButton = ({ text, subText, onClick, disabled }) => {
    return (
        <div className="w-full flex justify-center">
            <button
                className="defaultButton"
                role="button"
                onClick={onClick}
                disabled={disabled}
            >
                <span className="text">{text}</span>
                <span>{subText}</span>
            </button>
        </div>
    );
};
