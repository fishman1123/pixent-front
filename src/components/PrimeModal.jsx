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
            }, 0);
        } else if (!isOpen && isMounted) {
            setIsVisible(false);
            setTimeout(() => {
                setIsMounted(false);
            }, 300);
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
            className={`
        fixed inset-0 
        transition-opacity duration-300 ease-in-out 
        z-50 
        flex items-center justify-center
        ${isVisible ? 'bg-black bg-opacity-50' : 'bg-black bg-opacity-0'}
      `}
            // Removed onClick={handleClose} so clicking overlay does NOT close the modal
        >
            <div
                className={`
          bg-white border border-black p-4 max-w-sm w-full 
          transform transition-all duration-300 ease-in-out
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        `}
                onClick={(e) => e.stopPropagation()}
                // Stopping propagation so clicks in the modal don't close it either
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