// src/components/intro/SerialNumberBox.jsx
import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userAtoms } from "../../recoil/userAtoms.jsx";
import { useTranslation } from 'react-i18next';

export const SerialNumberBox = () => {

    const { t } = useTranslation();
    const setUserState = useSetRecoilState(userAtoms);
    const [serialNumber, setSerialNumber] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    // Regex patterns
    const serialNumberPattern = /^[a-zA-Z0-9]{6,12}$/;
    const sqlInjectionPattern = /('|"|;|--|\b(SELECT|UPDATE|DELETE|INSERT|WHERE|DROP|EXEC)\b)/i;

    const handleSerialNumberChange = (e) => {
        const value = e.target.value;
        setSerialNumber(value);

        // Check for SQL injection and serial number validity
        if (sqlInjectionPattern.test(value)) {
            setErrorMessage(t("Special characters are not allowed."));
        } else if (!serialNumberPattern.test(value)) {
            setErrorMessage(t("Serial number must be between 6 and 12 characters."));
        } else {
            setErrorMessage("");
        }
    };

    setUserState((prevState) => ({
        ...prevState,
        currentPage: 'input',
    }));

    const handleSubmit = () => {
        if (!serialNumber) {
            setErrorMessage(t("Please enter the serial number."));  // Show error message for blank input
        } else if (!errorMessage && serialNumber) {
            setUserState((prevState) => ({
                ...prevState,
                isAuthenticated: true,
            }));
            navigate('/input');
        }
    };

    return (
        <div className={`mt-12 pl-5 pr-5 ${!errorMessage ? 'mb-[51px]' : ''}`}>
            <div className="flex items-center">
                <input
                    type="text"
                    value={serialNumber}
                    onChange={handleSerialNumberChange}
                    className={`border ${errorMessage ? 'border-red-500 border-2' : 'border-black border-2'} p-2.5 w-full text-gray-700 placeholder-gray-500 focus:outline-none`}
                    placeholder={t("Enter Serial Code")}
                />
                <button
                    onClick={handleSubmit}
                    className="bg-black text-white p-[16px] focus:outline-none"
                    disabled={!!errorMessage}
                >
                    <FaArrowRight />
                </button>
            </div>
            {errorMessage && (
                <p className="mt-2 text-[10px] text-red-600 mb-7">{errorMessage}</p>
            )}
        </div>
    );
};
