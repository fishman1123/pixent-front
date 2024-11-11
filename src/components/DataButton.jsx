// src/components/DataButton.jsx

import React from 'react';

export const DataButton = ({ text, subText, onClick, disabled }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="bg-black text-white py-2 px-4 w-full cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
            {text}
            {subText && <span>{subText}</span>}
        </button>
    );
};
