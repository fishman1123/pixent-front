// src/components/TranslateButton.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { userAtoms } from '../../recoil/userAtoms';
import { useTranslation } from 'react-i18next';
import translatorIcon from '../../assets/translate.svg';

export const TranslateButton = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [userState, setUserState] = useRecoilState(userAtoms);
    const dropdownRef = useRef(null);
    const { i18n } = useTranslation();

    const languageOptions = [
        { code: 'ko', label: '한국어' },
        { code: 'zh', label: '中文' },
        { code: 'ja', label: '日本語' },
        { code: 'en', label: 'English' },
    ];

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Close dropdown if user clicks outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    // Handle language change
    const handleLanguageChange = (languageCode) => {
        // Update Recoil state
        setUserState(prevState => ({
            ...prevState,
            userLanguage: languageCode,
        }));
        // Change language in i18n
        i18n.changeLanguage(languageCode);
        // Persist the selection in localStorage
        localStorage.setItem('language', languageCode);

        // Close the dropdown
        setIsDropdownOpen(false);
    };

    return (
        <div className="relative ml-[4px] mt-[4px]" ref={dropdownRef}>
            {/* Translator Icon with Dropdown */}
            <button
                onClick={toggleDropdown}
                className="text-black focus:ring-4 focus:outline-none focus:ring-none font-medium rounded-lg text-sm px-1 py-2.5 text-center inline-flex items-center"
                type="button"
            >
                <img
                    src={translatorIcon}
                    alt="Translator Icon"
                    className="w-6 h-6"
                />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div className="z-10 absolute left-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                    <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200">
                        {languageOptions.map(({ code, label }) => (
                            <li key={code}>
                                <div className="flex items-center">
                                    <input
                                        id={`language-radio-${code}`}
                                        type="radio"
                                        name="language-radio"
                                        value={code}
                                        checked={userState.userLanguage === code}
                                        onChange={() => handleLanguageChange(code)}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                    />
                                    <label
                                        htmlFor={`language-radio-${code}`}
                                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        {label}
                                    </label>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
