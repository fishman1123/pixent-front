import { useState, useEffect, useRef } from "react";
import { useRecoilState } from 'recoil';
import { userAtoms } from '../../recoil/userAtoms';
import translatorIcon from '../../assets/translate.svg';
import backArrowIcon from '../../assets/leftarrow.svg';

export const TranslateButton = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [userState, setUserState] = useRecoilState(userAtoms); // Recoil state
    const dropdownRef = useRef(null);

    // Check and set default language if null
    useEffect(() => {
        if (!userState.userLanguage) {
            setUserState(prevState => ({
                ...prevState,
                userLanguage: 'Korean', // Set default to Korean if userLanguage is null
            }));
        }
    }, [userState.userLanguage, setUserState]);

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
    const handleLanguageChange = (language) => {
        setUserState(prevState => ({
            ...prevState,
            userLanguage: language, // Update Recoil state
        }));
        setIsDropdownOpen(false); // Close dropdown after selection
    };

    return (
        <div className="relative ml-[4px] mt-[4px]" ref={dropdownRef}>
            {/* Translator Icon with Dropdown */}
            <button
                onClick={toggleDropdown}
                className="text-black focus:ring-4 focus:outline-none focus:ring-none font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center"
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
                        <li>
                            <div className="flex items-center">
                                <input
                                    id="default-radio-1"
                                    type="radio"
                                    name="language-radio"
                                    value="Korean"
                                    checked={userState.userLanguage === 'Korean'}
                                    onChange={() => handleLanguageChange('Korean')}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label
                                    htmlFor="default-radio-1"
                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    한국어
                                </label>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <input
                                    id="default-radio-2"
                                    type="radio"
                                    name="language-radio"
                                    value="Chinese"
                                    checked={userState.userLanguage === 'Chinese'}
                                    onChange={() => handleLanguageChange('Chinese')}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label
                                    htmlFor="default-radio-2"
                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Chinese
                                </label>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <input
                                    id="default-radio-3"
                                    type="radio"
                                    name="language-radio"
                                    value="Japanese"
                                    checked={userState.userLanguage === 'Japanese'}
                                    onChange={() => handleLanguageChange('Japanese')}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label
                                    htmlFor="default-radio-3"
                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Japanese
                                </label>
                            </div>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};
