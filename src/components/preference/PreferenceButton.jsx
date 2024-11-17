import React from 'react';
import { useNavigate } from 'react-router-dom';

export const PreferenceButton = ({
                                     id,
                                     title,
                                     mainText,
                                     subText1,
                                     subText2,
                                     hoveredButton,
                                     setHoveredButton,
                                     isTouchDevice,
                                     route,
                                 }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (isTouchDevice) {
            if (hoveredButton !== id) {
                setHoveredButton(id);
            } else {
                navigate(route);
            }
        } else {
            navigate(route);
        }
    };

    return (
        <div
            className="group relative w-full cursor-pointer flex"
            onMouseEnter={() => !isTouchDevice && setHoveredButton(id)}
            onMouseLeave={() => !isTouchDevice && setHoveredButton(null)}
            onClick={handleClick}
        >
            <div className="w-2 bg-black rounded-l" />

            <div
                className={`relative flex-1 p-10 rounded-r-xl border-2 border-l-0 border-gray-200
                transition-all duration-700 ease-out overflow-hidden
                ${
                    hoveredButton === id
                        ? 'shadow-[0_8px_30px_rgb(0,0,0,0.08)] bg-white border-gray-300'
                        : 'bg-gray-50'
                }`}
            >
                <div
                    className={`absolute inset-0 bg-gradient-to-r from-gray-50 to-white
                  transition-all duration-1000 ease-out delay-100
                  ${hoveredButton === id ? 'opacity-100' : 'opacity-0'}`}
                />

                <div
                    className={`relative z-10 transition-all duration-700 ease-out delay-150
                  ${hoveredButton === id ? 'translate-x-2' : 'translate-x-0'}`}
                >
                    <h3
                        className={`text-xl font-light tracking-wider mb-8 transition-all duration-700 delay-200
                    ${hoveredButton === id ? 'text-black' : 'text-gray-800'}`}
                    >
                        {title}
                    </h3>

                    <div className="space-y-4">
                        <p
                            className={`text-base font-medium transition-all duration-700 delay-250
                      ${hoveredButton === id ? 'text-black' : 'text-gray-800'}`}
                        >
                            {mainText}
                        </p>
                        <div
                            className={`space-y-1 pt-2 transition-all duration-700 delay-300 
                      ${hoveredButton === id ? 'opacity-100' : 'opacity-80'}`}
                        >
                            <p className="text-sm text-gray-500 font-light leading-relaxed">{subText1}</p>
                            <p className="text-sm text-gray-500 font-light leading-relaxed">{subText2}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
