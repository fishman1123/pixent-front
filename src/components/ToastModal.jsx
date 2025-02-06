import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
// Import the SVG icon
import axIcon from "../assets/ax.svg";

const THRESHOLD = 80;

const ToastModal = ({ children, onClose }) => {
  const [opened, setOpened] = useState(false);
  const [closing, setClosing] = useState(false);

  const [dragOffset, setDragOffset] = useState(0);
  const startYRef = useRef(0);

  useEffect(() => {
    // Disable background scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    setOpened(true);

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      startYRef.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e) => {
    if (!opened || closing) return;
    if (e.touches.length === 1) {
      const currentY = e.touches[0].clientY;
      const diff = currentY - startYRef.current;
      if (diff > 0) {
        setDragOffset(diff);
      }
    }
  };

  const handleTouchEnd = () => {
    if (dragOffset > THRESHOLD) {
      handleClose();
    } else {
      setDragOffset(0);
    }
  };

  return ReactDOM.createPortal(
    <div
      className={`
        fixed inset-0 z-50
        flex items-end justify-center
        transition-all duration-300
        ${
          // Fade overlay in/out
          opened && !closing
            ? "bg-black bg-opacity-50"
            : "bg-black bg-opacity-0"
        }
      `}
    >
      <div
        className={`w-full max-h-[90%] overflow-y-auto transform transition-transform duration-300
          ${opened && !closing ? "" : "translate-y-full"}`}
        style={
          opened && !closing
            ? { transform: `translateY(${dragOffset}px)` }
            : undefined
        }
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex flex-col items-center w-full">
          {/* Close button row */}
          <div className="flex justify-center mb-5 w-full">
            <button
              onClick={handleClose}
              className="text-white border border-white rounded-full px-1 py-1 focus:outline-none"
              aria-label="Close Toast Modal"
            >
              <img
                src={axIcon}
                alt="Close"
                className="w-5 h-5 filter invert brightness-0"
              />
            </button>
          </div>

          <div className="bg-white rounded-t-md shadow-lg w-full">
            {/* Decorative gray bar (optional) */}
            <div className="flex justify-center">
              <div className="mt-4 bg-[#E0E0E0] w-[48px] h-1" />
            </div>
            <div className="p-4 flex items-center justify-center">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
};

export default ToastModal;
