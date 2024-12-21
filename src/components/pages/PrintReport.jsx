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
                    <div className="text-right pr-3 py-4">
                        <h1 className=" text-4xl font-bold tracking-widest">{data.perfumeName}</h1>
                    </div>

                    {/*<div className="flex w-full px-4 mb-8">*/}
                    {/*    <div className="w-1/2 h-[280px] mr-4 flex items-center justify-center">*/}
                    {/*        {data.userImageUrl ? (*/}
                    {/*            <img src={data.userImageUrl} alt="User" className="max-h-full max-w-full"/>*/}
                    {/*        ) : (*/}
                    {/*            <div>No Image</div>*/}
                    {/*        )}*/}
                    {/*    </div>*/}
                    {/*    <div className="w-1/2 h-[280px] flex items-center justify-center">*/}
                    {/*        <ResultChart*/}
                    {/*            inputCitrus={data.citrus}*/}
                    {/*            inputFloral={data.floral}*/}
                    {/*            inputWoody={data.woody}*/}
                    {/*            inputMusk={data.musk}*/}
                    {/*            inputFresh={data.fruity}*/}
                    {/*            inputSpicy={data.spicy}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <div className="flex w-full px-4 mb-2">
                        <div className="w-1/2">
                            {/*<div className="mb-6">*/}
                            {/*    <h2 className="font-bold text-xl mb-2">ANALYSIS</h2>*/}
                            {/*    <div className="w-full h-px bg-black"></div>*/}
                            {/*</div>*/}
                            <div className="mb-8">
                                <div>
                                    <h3 className="font-medium mb-3 text-[22px] inline-block border-b-4 border-black">Facial Feature</h3>
                                </div>

                                <div className="w-full h-40 flex items-center justify-center scrollbar-hide">
                                    <div className='mr-4'>
                                        <p className="text-[16px] px-2">{data.appearance.facialFeature}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <div>
                                    <div>
                                    <h3 className="font-medium mb-3 text-[22px] inline-block border-b-4 border-black">Style</h3>
                                    </div>
                                </div>
                                <div className="w-full h-40 flex items-center justify-center scrollbar-hide">
                                    <div className='mr-4'>
                                    <p className="text-[16px] px-2 ">{data.appearance.style}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <div>
                                    <h3 className="font-medium mb-3 text-[22px] inline-block border-b-4 border-black">Vibe</h3>
                                </div>
                                <div className="w-full h-40 flex items-center justify-center scrollbar-hide">
                                    <div className='mr-4'>
                                        <p className="text-[16px] px-2 ">{data.appearance.vibe}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-1/2 border-black">
                            {/*<div className="mb-6">*/}
                            {/*    <h2 className="font-bold text-xl mb-2 pl-4">NOTES</h2>*/}
                            {/*    <div className="w-full h-px bg-black"></div>*/}
                            {/*</div>*/}
                            <div>
                                <div className="mb-8">
                                    <div>
                                        <h3 className="font-medium mb-3 text-[22px] inline-block border-b-4 border-black ml-4">TOP: {data.mainNote}</h3>
                                    </div>
                                    <div className="w-full h-40 flex flex-col p-2 scrollbar-hide">
                                        <div className='mr-4'>
                                            <span className="text-[16px] pl-4">{data.mainNoteDesc}</span>
                                            <span className="text-[16px] pl-4">{data.mainNoteAnalysis}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <div>
                                        <h3 className="font-medium mb-3 text-[22px] inline-block border-b-4 border-black ml-4">MIDDLE: {data.middleNote}</h3>
                                    </div>
                                    <div className="w-full h-40 flex flex-col p-2 scrollbar-hide">
                                        <span className="text-[16px] pl-4">{data.middleNoteDesc}</span>
                                        <span className="text-[16px] pl-4">{data.middleNoteAnalysis}</span>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <div>
                                        <h3 className="font-medium mb-3 text-[22px] inline-block border-b-4 border-black ml-4">BASE: {data.baseNote}</h3>
                                    </div>
                                    <div className="w-full h-40 flex flex-col p-2 scrollbar-hide">
                                        <span className="text-[15px] pl-4">{data.baseNoteDesc}</span>
                                        <span className="text-[15px] pl-4">{data.baseNoteAnalysis}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="w-full px-4 mb-8">
                        <div className="mb-4">
                            <h2 className="font-bold text-xl mb-2">PROFILES</h2>
                            <div className="w-full h-px bg-black"></div>
                        </div>
                        <div className="w-full h-[230px] flex items-center justify-center p-2">
                            <p className="text-[16px] overflow-auto scrollbar-hide">{data.profile}</p>
                        </div>
                    </div>
                    <div className='flex justify-center '>
                        <div className="w-1/2 h-[330px] flex items-center justify-center">
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

                </div>
            </div>
        </div>
    );
};
