import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeAlertMessage } from '../store/errorModalSlice'; // Update this import path as needed

export const Alert = () => {
    const message = useSelector((state) => state.errorModal.alertMessage || '');
    const dispatch = useDispatch();

    if (!message) return null; // Do not render if there is no message

    const handleClose = () => {
        dispatch(closeAlertMessage()); // Clear the alert message
    };

    return (
        <div
            id="alert-2"
            className="flex items-center p-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 fixed top-0 left-0 right-0 z-50"
            role="alert"
        >
            <svg
                className="flex-shrink-0 w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div className="ms-3 text-sm font-medium">{message}</div>
            <button
                type="button"
                className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                onClick={handleClose}
                aria-label="Close"
            >
                <span className="sr-only">Close</span>
                <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                    />
                </svg>
            </button>
        </div>
    );
};
