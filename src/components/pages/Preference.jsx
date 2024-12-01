import React, { useState, useEffect } from 'react';
import { PreferenceButton } from '../preference/PreferenceButton.jsx';
import {useTranslation} from "react-i18next";

export const Preference = () => {
    const [hoveredButton, setHoveredButton] = useState(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const { t } = useTranslation();


    useEffect(() => {
        setIsTouchDevice('ontouchstart' in window);
    }, []);

    return (
        <div className="relative flex-col justify-center items-center min-h-screen w-full text-center pt-12">
            <div className="pt-6">
                <PreferenceButton
                    id="pure-ai"
                    title={t("pureAI.title")}
                    mainText={t("pureAI.mainText")}
                    subText1={t("pureAI.subText1")}
                    subText2={t("pureAI.subText2")}
                    hoveredButton={hoveredButton}
                    setHoveredButton={setHoveredButton}
                    isTouchDevice={isTouchDevice}
                    route="/inputTwo"
                />
            </div>
            <div className="pt-2">
                <PreferenceButton
                    id="ai-preference"
                    title={t("aiPreference.title")}
                    mainText={t("aiPreference.mainText")}
                    subText1={t("aiPreference.subText1")}
                    subText2={t("aiPreference.subText2")}
                    hoveredButton={hoveredButton}
                    setHoveredButton={setHoveredButton}
                    isTouchDevice={isTouchDevice}
                    route="/input"
                />
            </div>
        </div>
    );
};
