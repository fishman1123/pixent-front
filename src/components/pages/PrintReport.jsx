import React from 'react';
import { useLocation } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { ResultChart } from '../result/ResultChart.jsx'; // Ensure correct import path

export const PrintReport = () => {
    const { state: data } = useLocation();
    const rootRef = useRef(null);
    const appRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            const root = rootRef.current;
            const app = appRef.current;

            if (!root || !app) return;

            // A6 비율 (105mm x 148mm = 1:1.4095)
            const standardWidth = 1050;
            const standardHeight = 1480;

            app.style.width = `${standardWidth}px`;
            app.style.height = `${standardHeight}px`;

            let width = root.clientWidth;
            let height = width * (standardHeight / standardWidth);

            app.style.zoom = height / standardHeight;

            if (height > root.clientHeight) {
                height = root.clientHeight;
                width = height * (standardWidth / standardHeight);
                app.style.zoom = width / standardWidth;
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!data) {
        return <div>No data available</div>;
    }

    return (
        <div ref={rootRef} className="w-screen h-screen bg-black flex items-center justify-center scrollbar-hide">
            <div ref={appRef} className="bg-white relative">
                <div className="w-full h-full flex flex-col">
                    {/* Title */}
                    <div className="text-center py-4">
                        <h1 className="text-4xl font-bold tracking-widest">AC'SCENT3</h1>
                        <h2 className="text-2xl mt-2">{data.perfumeName}</h2>
                    </div>

                    {/* Top Images Section */}
                    <div className="flex w-full px-4 mb-8">
                        {/* User image on the left if available */}
                        <div className="w-1/2 h-96 mr-4 flex items-center justify-center">
                            {data.userImageUrl ? (
                                <img src={data.userImageUrl} alt="User" className="max-h-full max-w-full"/>
                            ) : (
                                <div>No Image</div>
                            )}
                        </div>
                        {/* Result Chart on the right */}
                        <div className="w-1/2 h-96 flex items-center justify-center">
                            <ResultChart
                                inputCitrus={data.citrus}
                                inputFloral={data.floral}
                                inputWoody={data.woody}
                                inputMusk={data.musk}
                                inputFresh={data.fruity}
                                inputSpicy={data.spicy}
                            />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex w-full px-4 mb-6">
                        {/* Left Column */}
                        <div className="w-1/2 pr-4">
                            <div className="mb-6">
                                <h2 className="font-bold text-xl mb-2">ANALYSIS</h2>
                                <div className="w-full h-px bg-black"></div>
                            </div>

                            <div className="mb-8">
                                <h3 className="font-medium mb-3">Facial Feature</h3>
                                <div className="w-full h-40 flex items-center justify-center scrollbar-hide">
                                    <p className="text-sm px-2">{data.appearance.facialFeature}</p>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="font-medium mb-3">Style</h3>
                                <div className="w-full h-40 flex items-center justify-center scrollbar-hide">
                                    <p className="text-sm px-2 ">{data.appearance.style}</p>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="font-medium mb-3">Vibe</h3>
                                <div className="w-full h-40 flex items-center justify-center scrollbar-hide">
                                    <p className="text-sm px-2 ">{data.appearance.vibe}</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-1/2 pl-4">
                            <div className="mb-6">
                                <h2 className="font-bold text-xl mb-2">NOTES</h2>
                                <div className="w-full h-px bg-black"></div>
                            </div>

                            <div className="mb-8">
                                <h3 className="font-medium mb-3">TOP: {data.mainNote}</h3>
                                <div className="w-full h-40 flex flex-col p-2 overflow-auto scrollbar-hide">
                                    <p className="text-sm">{data.mainNoteDesc}</p>
                                    <p className="text-sm mt-2">Analysis: {data.mainNoteAnalysis}</p>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="font-medium mb-3">MIDDLE: {data.middleNote}</h3>
                                <div className="w-full h-40 flex flex-col p-2 overflow-auto scrollbar-hide">
                                    <p className="text-sm"> {data.middleNoteDesc}</p>
                                    <p className="text-sm mt-2">Analysis: {data.middleNoteAnalysis}</p>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="font-medium mb-3">BASE: {data.baseNote}</h3>
                                <div className="w-full h-40 flex flex-col p-2 overflow-auto scrollbar-hide">
                                    <p className="text-sm">Desc: {data.baseNoteDesc}</p>
                                    <p className="text-sm mt-2">Analysis: {data.baseNoteAnalysis}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full px-4 mb-8">
                        <div className="mb-4">
                            <h2 className="font-bold text-xl mb-2">PROFILES</h2>
                            <div className="w-full h-px bg-black"></div>
                        </div>
                        <div className="w-full h-40 flex items-center justify-center p-2">
                            <p className="text-sm overflow-auto scrollbar-hide">{data.profile}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
