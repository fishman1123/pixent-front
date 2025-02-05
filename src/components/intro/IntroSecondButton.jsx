import React from "react";
import "./IntroButton.css";

export const IntroSecondButton = ({
                                      perfumeName,
                                      mainNote,
                                      userImageUrl,
                                      isClicked,
                                      onClick,
                                  }) => {
    return (
        <div>
            <button
                className={`imageSelectButton ${isClicked ? "clicked" : ""}`}
                onClick={onClick}
                style={{
                    backgroundImage: `url(${userImageUrl})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
            >
        <span className="mainText">
          <span className="topText">{perfumeName}</span>
          <span className="subText">{mainNote}</span>
        </span>
                <span className="hoverText">
          <span className="topText">{perfumeName}</span>
          <span className="subText">{mainNote}</span>
        </span>
            </button>
        </div>
    );
};
