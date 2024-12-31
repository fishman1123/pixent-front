// src/components/summary/TestTwo.jsx
import React from 'react';
import { ResultChart } from '../result/ResultChart.jsx';
import { Summarychart } from '../result/SummaryChart.jsx';

/**
 * TestTwo component.
 * Receives:
 *  - mainNote, mainNoteDesc, mainNoteAnalysis, mainNoteImageUrl
 *  - middleNote, middleNoteDesc, middleNoteAnalysis, middleNoteImageUrl
 *  - baseNote, baseNoteDesc, baseNoteAnalysis, baseNoteImageUrl
 *  - citrus, floral, fruity, musk, spicy, woody
 */
const TestTwo = ({
                     perfumeName,
                     mainNote,
                     mainNoteDesc,
                     mainNoteAnalysis,
                     mainNoteImageUrl,

                     middleNote,
                     middleNoteDesc,
                     middleNoteAnalysis,
                     middleNoteImageUrl,

                     baseNote,
                     baseNoteDesc,
                     baseNoteAnalysis,
                     baseNoteImageUrl,

                     citrus,
                     floral,
                     fruity,
                     musk,
                     spicy,
                     woody,
                 }) => {
    return (
        <div className="relative w-full max-w-2xl mx-auto p-4 bg-white">
            {/* ======= Frame / Border Decorations ======= */}
            <div className="pointer-events-none absolute inset-4 border border-black opacity-20"></div>
            <div className="pointer-events-none absolute inset-5 border border-black opacity-10"></div>

            {/* Corner decorations */}
            <div className="pointer-events-none absolute top-4 left-4 w-8 h-8">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-black opacity-30"></div>
                <div className="absolute top-0 left-0 w-0.5 h-full bg-black opacity-30"></div>
            </div>
            <div className="pointer-events-none absolute top-4 right-4 w-8 h-8">
                <div className="absolute top-0 right-0 w-full h-0.5 bg-black opacity-30"></div>
                <div className="absolute top-0 right-0 w-0.5 h-full bg-black opacity-30"></div>
            </div>
            <div className="pointer-events-none absolute bottom-4 left-4 w-8 h-8">
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black opacity-30"></div>
                <div className="absolute bottom-0 left-0 w-0.5 h-full bg-black opacity-30"></div>
            </div>
            <div className="pointer-events-none absolute bottom-4 right-4 w-8 h-8">
                <div className="absolute bottom-0 right-0 w-full h-0.5 bg-black opacity-30"></div>
                <div className="absolute bottom-0 right-0 w-0.5 h-full bg-black opacity-30"></div>
            </div>

            {/* ======= Content ======= */}
            <div className="flex flex-col items-center p-6">
                {/* Title & Subtitle */}
                <div className="text-center mb-3 mt-5">
                    <h1 className="text-2xl tracking-widest font-light">{perfumeName}</h1>
                    <p className="text-xs tracking-wide text-gray-600 mt-1 font-light">
                        DISCOVER YOUR SIGNATURE PERFUMEWEAR
                    </p>
                </div>

                {/* Summary Chart */}
                <div className="relative w-52 pt-4 mb-4">
                    <Summarychart
                        inputCitrus={citrus}
                        inputFloral={floral}
                        inputWoody={woody}
                        inputMusk={musk}
                        inputFresh={fruity}
                        inputSpicy={spicy}
                    />
                    <div className="absolute inset-0 border border-black opacity-10"></div>
                </div>

                {/* Notes Section */}
                <div className="w-full space-y-6">
                    {/* TOP NOTE */}
                    <div className="flex flex-col items-center px-6">
                        <div className="flex items-center justify-center gap-2 mb-0.5">
                            <h2 className="text-xs tracking-widest font-bold">TOP NOTE:{mainNote}</h2>
                        </div>
                        <p className="text-xs text-gray-600 font-light text-center">
                             {mainNoteAnalysis}
                        </p>
                    </div>

                    {/* MIDDLE NOTE */}
                    <div className="flex flex-col items-center px-6">
                        <div className="flex items-center justify-center gap-2 mb-0.5">
                            <h2 className="text-xs tracking-widest font-bold">MIDDLE NOTE:{middleNote}</h2>
                        </div>
                        <p className="text-xs text-gray-600 font-light text-center">
                            {middleNoteAnalysis}
                        </p>
                    </div>

                    {/* BASE NOTE */}
                    <div className="flex flex-col items-center px-6">
                        <div className="flex items-center justify-center gap-2 mb-0.5">
                            <h2 className="text-xs tracking-widest font-bold">BASE NOTE:{baseNote}</h2>
                        </div>
                        <p className="text-xs text-gray-600 font-light text-center">
                             {baseNoteAnalysis}
                        </p>
                        <p className="text-[10px] text-gray-500 mt-1 italic text-center">

                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestTwo;
