import React, { useState, useEffect, useRef } from 'react';
import './ResultImage.css';

export const ImagePerfumeButton = ({ imageUrl, perfumeName }) => {
    const [showPerfumeName, setShowPerfumeName] = useState(true);
    const buttonRef = useRef(null);

    const handleClick = () => {
        setShowPerfumeName(false);
    };

    const handleOutsideClick = (event) => {
        if (buttonRef.current && !buttonRef.current.contains(event.target)) {
            setShowPerfumeName(true);
        }
    };

    useEffect(() => {
        if (!showPerfumeName) {
            // When the image is shown, listen for clicks outside
            document.addEventListener('click', handleOutsideClick);
        } else {
            // Remove the listener when showing the perfume name
            document.removeEventListener('click', handleOutsideClick);
        }

        // Cleanup on unmount
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [showPerfumeName]);

    return (
        <div className="resultImageContainer">
            <button
                className={`resultImageSelectButton ${!showPerfumeName ? 'showImage' : ''}`}
                onClick={handleClick}
                role="button"
                ref={buttonRef}
            >
        <span className="content">
          <img src={imageUrl} alt="User" className="userImage" />
          <span className="perfumeName">{perfumeName}</span>
          <span className="clickText">"VIEW IMAGE"</span>
        </span>
            </button>
        </div>
    );
};
