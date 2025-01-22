// src/components/PortalModal.jsx

import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import './ProcedureButton.css';

export const PortalModal = ({
                                isOpen,
                                onClose,
                                title,
                                children,
                                showConfirmButtons = false,
                                onConfirm = null,
                                confirmText = 'Confirm',
                                cancelText = 'Cancel',
                                onCancel = null,
                            }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
            setTimeout(() => setIsVisible(true), 10);
        } else {
            setIsVisible(false);
            setTimeout(() => {
                setIsMounted(false);
            }, 300);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isMounted) {
            document.body.style.overflow = 'hidden'; // disable scrolling behind modal
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMounted]);

    const closeModal = (skipDelay = false) => {
        setIsClosing(true);
        const delay = skipDelay ? 0 : 800;
        setTimeout(() => {
            setIsClosing(false);
            onClose?.(); // calls onClose after fade-out
        }, delay);
    };

    const handleConfirm = () => {
        onConfirm?.();
        closeModal(true);
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        } else {
            closeModal(true);
        }
    };

    // REMOVED handleOutsideClick so clicking overlay doesn't close the modal

    if (!isMounted) {
        return null;
    }

    const modalContent = (
        <div
            className={`
        fixed inset-0 bg-black transition-opacity duration-300 ease-in-out 
        ${isVisible ? 'bg-opacity-50' : 'bg-opacity-0'}
        flex items-center justify-center p-4 z-50
      `}
            // No click handler here -> behind the modal is not clickable
        >
            <div
                ref={modalRef}
                className={`
          relative w-full max-w-[460px] h-[80vh] bg-white border border-black shadow-2xl 
          overflow-hidden transition-all duration-300 ease-in-out
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
          flex flex-col
        `}
            >
                {/* HEADER */}
                <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-black pl-6">
                    <h3 className="text-xl font-bold text-black">{title}</h3>
                    {/* Top-Right "X" */}
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

                <div className="flex-grow p-4 space-y-4 overflow-y-auto touch-pan-y text-center">
                    {children}
                </div>

                {/* FOOTER */}
                {!showConfirmButtons && (
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

                {showConfirmButtons && (
                    <div
                        className="flex-shrink-0 flex flex-col items-center justify-center p-4 border-t border-black bg-white space-y-2"
                    >
                        <button
                            onClick={handleConfirm}
                            className={`defaultButton touch-manipulation ${isClosing ? 'closing' : ''}`}
                            disabled={isClosing}
                        >
                            <span className="relative z-10">{confirmText}</span>
                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2
                translate-y-full opacity-0 transition-all duration-300">
                {confirmText}
              </span>
                        </button>

                        <button
                            onClick={handleCancel}
                            className={`defaultButton touch-manipulation ${isClosing ? 'closing' : ''}`}
                            disabled={isClosing}
                        >
                            <span className="relative z-10">{cancelText}</span>
                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2
                translate-y-full opacity-0 transition-all duration-300">
                {cancelText}
              </span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

    return ReactDOM.createPortal(modalContent, document.getElementById('modal-root'));
};
