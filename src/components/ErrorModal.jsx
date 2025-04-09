// src/components/ErrorModal.jsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { closeErrorModal } from '../store/errorModalSlice';
import { useNavigate } from 'react-router-dom';

const ErrorModal = () => {
    const dispatch = useDispatch();
    let navigate;
    
    try {
        navigate = useNavigate();
    } catch (error) {
        console.warn('Navigation not available:', error);
    }

    // 1) Read the current modal state from Redux
    const errorModalState = useSelector((state) => state.errorModal);

    // 2) Local states for controlling mount/unmount animations
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // When isOpen becomes true, mount the modal + fade in
    // When isOpen becomes false, fade out + unmount
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

    // Lock scrolling if mounted
    useEffect(() => {
        if (isMounted) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isMounted]);

    // Close button or backdrop click => dispatch closeErrorModal
    const handleClose = () => {
        dispatch(closeErrorModal());
        // If there's a redirect path, navigate to it
        if (errorModalState.redirectTo) {
            if (navigate) {
                navigate(errorModalState.redirectTo);
            } else {
                // Fallback to window.location if navigation is not available
                window.location.href = errorModalState.redirectTo;
            }
        }
    };

    // If not mounted, no modal in DOM
    if (!isMounted) {
        return null;
    }

    // The actual modal content
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
                <h2 className="text-xl font-bold mb-4">알림</h2>
                <p>{errorModalState.message}</p>
                <div className="mt-4 flex justify-end">
                    <button onClick={handleClose} className="bg-black text-white py-2 px-4">
                        확인
                    </button>
                </div>
            </div>
        </div>
    );

    // Render into a portal (assuming <div id="modal-root"/> in index.html)
    return ReactDOM.createPortal(modalContent, document.getElementById('modal-root'));
};

export default ErrorModal;
