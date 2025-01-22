import React, { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userAtoms } from "../../recoil/userAtoms";
import { authAtom } from "../../recoil/authAtoms";
import { useTranslation } from "react-i18next";
import AxiosInstance from "../../api/axiosInstance"; // <-- import your axios instance

/**
 * SerialNumberBox
 *  - Uses AxiosInstance to POST { username: serialNumber }
 *  - If success => set authAtom.isAuthenticated = true, navigate to "/"
 *  - If error => set errorMessage
 */
export const SerialNumberBox = ({ path, isViewer }) => {
    const { t } = useTranslation();

    // Recoil
    const setUserState = useSetRecoilState(userAtoms);
    const [authState, setAuthState] = useRecoilState(authAtom);

    // Local state
    const [serialNumber, setSerialNumber] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    // Build the target URL using base from config (already in AxiosInstance)
    // If you need a path param, you can just pass "/api/user/username" into `path`
    const targetPath = path; // e.g. "/api/user/username"

    // Regex pattern for disallowed input
    const sqlInjectionPattern = /('|"|;|--|\b(SELECT|UPDATE|DELETE|INSERT|WHERE|DROP|EXEC)\b)/i;

    // Placeholder logic
    const placeholder =
        location.pathname === "/login/nickname"
            ? "닉네임을 입력해주세요"
            : t("Enter Serial Code");

    // Update user state on mount
    useEffect(() => {
        setUserState((prevState) => ({
            ...prevState,
            currentPage: 'input',
        }));
    }, [setUserState]);

    // Handle input change
    const handleSerialNumberChange = (e) => {
        const value = e.target.value;
        setSerialNumber(value);

        // Basic validations
        if (sqlInjectionPattern.test(value)) {
            setErrorMessage(t("Special characters are not allowed."));
        } else if (value.length > 10) {
            setErrorMessage("10자 초과하는 아이디는 허용되지 않습니다.");
        } else {
            setErrorMessage("");
        }
    };

    // POST request using Axios for normal (non-viewer) flow
    const handleSubmit = async () => {
        if (!serialNumber) {
            setErrorMessage(t("Please enter the serial number."));
            return;
        }
        if (errorMessage) return;

        try {
            console.log("POST to", targetPath, "with:", { username: serialNumber });

            // POST to /api/user/username, for example
            const response = await AxiosInstance.post(targetPath, {
                username: serialNumber,
            });

            // If successful
            console.log("Response data:", response.data);
            setAuthState((prev) => ({ ...prev, isAuthenticated: true }));

            // Optional: store token in localStorage if returned, or handle as needed
            // localStorage.setItem('gToken', response.data.someToken);

            console.log("Nickname registration success, redirecting to /");
            navigate("/");
        } catch (err) {
            // If request fails or returns a non-2xx
            console.error("Error in POST:", err);
            if (err.response) {
                // Errors with response (4xx / 5xx)
                const msg = err.response.data?.message || "Failed to register username";
                setErrorMessage(msg);
            } else {
                // Network or CORS errors, etc.
                setErrorMessage(err.message);
            }
        }
    };

    // POST request for "viewer" flow
    const handleViewerSubmit = async () => {
        if (!serialNumber) {
            setErrorMessage(t("Please enter the serial number."));
            return;
        }
        if (errorMessage) return;

        try {
            console.log("POST (viewer) to", targetPath, "with:", { username: serialNumber });

            const response = await AxiosInstance.post(targetPath, {
                username: serialNumber,
            });

            console.log("Response data:", response.data);
            setAuthState((prev) => ({ ...prev, isAuthenticated: true }));

            console.log("Viewer success, redirecting...");
            navigate(targetPath + '/' + serialNumber);
            // or navigate("/") if you'd rather go home
        } catch (err) {
            console.error("Error in POST (viewer):", err);
            if (err.response) {
                const msg = err.response.data?.message || "Failed to register username";
                setErrorMessage(msg);
            } else {
                setErrorMessage(err.message);
            }
        }
    };

    return (
        <div className={`mt-6 pl-5 pr-5 ${!errorMessage ? 'mb-[51px]' : ''}`}>
            <div className="flex items-center">
                <input
                    type="text"
                    value={serialNumber}
                    onChange={handleSerialNumberChange}
                    className={`border ${
                        errorMessage ? 'border-red-500 border-2' : 'border-black border-2'
                    } p-2.5 w-full text-gray-700 placeholder-gray-500 focus:outline-none`}
                    placeholder={placeholder}
                />
                <button
                    onClick={isViewer ? handleViewerSubmit : handleSubmit}
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
