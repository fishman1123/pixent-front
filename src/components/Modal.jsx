// src/components/Modal.jsx

import React, { useState, useRef, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { modalTriggerAtom } from '../recoil/modalTriggerAtom';
import './intro/IntroButton.css';
import { confirmationAtom } from "../recoil/confirmationAtom.jsx";
import { useLocation } from "react-router-dom";

export const Modal = ({
                          title,
                          onClose,
                          children,
                          /* NEW PROPS for optional confirmation */
                          showConfirmButtons = false,         // if true, show confirm/cancel buttons
                          onConfirm = null,                  // callback for "Confirm" button
                          confirmText = 'Confirm',           // text for the "Confirm" button
                          cancelText = 'Cancel',             // text for the "Cancel" button
                          onCancel = null                    // optional callback for "Cancel" button (defaults to onClose)
                      }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const modalRef = useRef(null);
    const [modalState, setModalState] = useRecoilState(modalTriggerAtom);
    const [confirmModalState] = useRecoilState(confirmationAtom);
    const location = useLocation();

    useEffect(() => {
        setIsVisible(true);
        setModalState({ isOpen: true });
    }, [setModalState]);

    const closeModal = (skipDelay = false) => {
        setIsClosing(true);
        const delay = skipDelay ? 0 : 800;
        setTimeout(() => {
            setIsVisible(false);
            setModalState({ isOpen: false });
            onClose?.();     // call onClose if provided

            setTimeout(() => {
                setIsClosing(false);
            }, 300);
        }, delay);
    };

    // optional helper for confirm scenario
    const handleConfirm = () => {
        if (onConfirm) onConfirm();
        closeModal(true);
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        } else {
            // if no onCancel callback is provided, default to close
            closeModal(true);
        }
    };

    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isVisible]);

    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            closeModal(true);
        }
    };

    return (
        <div
            className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${
                isVisible ? 'bg-opacity-50' : 'bg-opacity-0'
            } flex items-center justify-center p-4 z-50 touch-manipulation`}
            onClick={handleOutsideClick}
        >
            <div
                ref={modalRef}
                className={`relative w-full max-w-[460px] h-[95vh] bg-white border border-black shadow-2xl overflow-hidden transition-all duration-300 ease-in-out ${
                    isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                } flex flex-col`}
            >
                {/* HEADER */}
                <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-black pl-6">
                    <h3 className="text-xl font-bold text-black">{title}</h3>
                    <button
                        onClick={() => closeModal(true)}
                        className="text-black hover:text-gray-700 transition-colors duration-300 p-2 touch-manipulation"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>

                {/* CONTENT */}
                <div className="flex-grow p-4 space-y-4 overflow-y-auto touch-pan-y">
                    {children}
                </div>

                {/* FOOTER */}
                {/* If it's NOT being used as a "confirmation" modal,
                    show the original "닫기" button. Otherwise show confirm/cancel. */}
                {!showConfirmButtons && !confirmModalState.isOpen && (
                    <div className="flex-shrink-0 flex items-center justify-center p-4 border-t border-black bg-white">
                        <button
                            onClick={() => closeModal(false)}
                            className={`defaultButton touch-manipulation ${isClosing ? 'closing' : ''}`}
                            disabled={isClosing}
                        >
                            <span className="relative z-10">닫기</span>
                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 transition-all duration-300">
                                닫기
                            </span>
                        </button>
                    </div>
                )}

                {/* If showConfirmButtons is true, show custom confirm/cancel buttons */}
                {showConfirmButtons && (
                    <div className="flex-shrink-0 flex items-center justify-end p-4 border-t border-black bg-white space-x-2">
                        <button
                            onClick={handleCancel}
                            className={`border border-black bg-white text-black py-2 px-4 ${isClosing ? 'closing' : ''}`}
                            disabled={isClosing}
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={handleConfirm}
                            className={`bg-black text-white py-2 px-4 ${isClosing ? 'closing' : ''}`}
                            disabled={isClosing}
                        >
                            {confirmText}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
