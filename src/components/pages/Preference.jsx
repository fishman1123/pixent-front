import React, { useState, useEffect } from 'react';
import { PreferenceButton } from '../preference/PreferenceButton.jsx';

export const Preference = () => {
    const [hoveredButton, setHoveredButton] = useState(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        setIsTouchDevice('ontouchstart' in window);
    }, []);

    return (
        <div className="relative flex-col justify-center items-center min-h-screen w-full text-center pt-12">
            <div className="pt-6">
                <PreferenceButton
                    id="pure-ai"
                    title="PURE AI ANALYSIS"
                    mainText="이미지만으로 향수 추천받기"
                    subText1="AI가 이미지의 감성만을 분석하여"
                    subText2="가장 어울리는 향을 찾아드립니다"
                    hoveredButton={hoveredButton}
                    setHoveredButton={setHoveredButton}
                    isTouchDevice={isTouchDevice}
                    route="/input"
                />
            </div>
            <div className="pt-2">
                <PreferenceButton
                    id="ai-preference"
                    title="AI + PREFERENCES"
                    mainText="이미지 분석에 취향 반영하기"
                    subText1="AI의 이미지 분석 결과에"
                    subText2="선호하는 향의 특성을 반영합니다"
                    hoveredButton={hoveredButton}
                    setHoveredButton={setHoveredButton}
                    isTouchDevice={isTouchDevice}
                    route="/inputTwo"
                />
            </div>
        </div>
    );
};
