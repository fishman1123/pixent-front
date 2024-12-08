// src/components/GeneralModal.jsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const PrimeModal = ({ isOpen, title, onClose, children }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
            // Slight delay to trigger CSS transitions
            setTimeout(() => {
                setIsVisible(true);
            }, 10);
        } else if (!isOpen && isMounted) {
            setIsVisible(false);
            setTimeout(() => {
                setIsMounted(false);
            }, 300); // match transition duration
        }
    }, [isOpen, isMounted]);

    useEffect(() => {
        if (isMounted) {
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isMounted]);

    const handleClose = () => {
        onClose();
    };

    if (!isMounted) {
        return null;
    }

    const modalContent = (
        <div
            className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out flex items-center justify-center z-50 ${
                isVisible ? 'bg-opacity-50' : 'bg-opacity-0'
            }`}
            onClick={handleClose}
        >
            <div
                className={`bg-white border border-black p-4 max-w-sm w-full transform transition-all duration-300 ease-in-out ${
                    isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
                <div>{children}</div>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={handleClose}
                        className="bg-black text-white py-2 px-4"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(
        modalContent,
        document.getElementById('modal-root')
    );
};

export default PrimeModal;
