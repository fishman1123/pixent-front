import React from "react";
import './IntroButton.css'; // Assuming you have a separate CSS file

export const IntroSecondButton = () => {
    return (
        <div>
            <button className="imageSelectButton" role="button">
                <span className="mainText">
                    <span className="topText">Citrus & Woody</span>
                    <span className="subText">Confidence embodied</span>
                </span>
                <span className="hoverText">
                    <span className="topText">Citrus & Woody</span>
                    <span className="subText">Confidence embodied</span>
                </span>
            </button>
        </div>
    );
};
