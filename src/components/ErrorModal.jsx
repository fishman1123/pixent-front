// src/components/ErrorModal.jsx

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useRecoilState } from 'recoil';
import { errorModalAtom } from '../recoil/errorModalAtom';

const ErrorModal = () => {
    const [errorModalState, setErrorModalState] = useRecoilState(errorModalAtom);
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (errorModalState.isOpen) {
            setIsMounted(true);
            setTimeout(() => {
                setIsVisible(true);
            }, 10);
        } else if (isMounted) {
            setIsVisible(false);
            setTimeout(() => {
                setIsMounted(false);
            }, 300);
        }
    }, [errorModalState.isOpen, isMounted]);

    useEffect(() => {
        if (isMounted) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isMounted]);

    const handleClose = () => {
        setErrorModalState({ isOpen: false, message: '' });
    };

    if (!isMounted) {
        return null;
    }

    const modalContent = (
        <div
            className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${
                isVisible ? 'bg-opacity-50' : 'bg-opacity-0'
            } flex items-center justify-center z-50`}
            onClick={handleClose}
        >
            <div
                className={`bg-white border border-black p-4 max-w-sm w-full transform transition-all duration-300 ease-in-out ${
                    isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold mb-4">Error</h2>
                <p>{errorModalState.message}</p>
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

export default ErrorModal;
