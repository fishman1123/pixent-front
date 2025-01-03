// src/components/pages/ReportSummary.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

// Child slides
import Test from '../summary/Test.jsx';
import TestTwo from '../summary/TestTwo.jsx';

// Regex helper
import { extractFirstTwoSentences } from '../ExtractTwoSentense.jsx';

export const ReportSummary = () => {
    const location = useLocation();
    const passedData = location.state;

    // Track the current slide (0 for the first, 1 for the second)
    const [currentSlide, setCurrentSlide] = useState(0);

    // For debugging
    // useEffect(() => {
    //     // console.log('ReportSummary received data:', passedData);
    // }, [passedData]);

    // 1) Extract up to two sentences from each appearance field
    const facialFeature = extractFirstTwoSentences(passedData?.appearance?.facialFeature);
    const styleText     = extractFirstTwoSentences(passedData?.appearance?.style);
    const vibeText      = extractFirstTwoSentences(passedData?.appearance?.vibe);

    // Handlers
    const handleNext = () => setCurrentSlide(1);
    const handlePrev = () => setCurrentSlide(0);

    const redirectToReport = () => {
        // Open the report in a new tab
        window.open(`https://www.pixent.co.kr/report/${passedData?.uuid}`, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="relative w-full">
            {/* Carousel wrapper */}
            <div className="relative h-[760px] overflow-hidden rounded-lg">
                {/* Slide 1 */}
                <div
                    className={`
                        absolute inset-0
                        transform transition-transform duration-700 ease-in-out
                        ${currentSlide === 0 ? 'translate-x-0' : '-translate-x-full'}
                    `}
                >
                    <Test
                        appearance={{
                            facialFeature: facialFeature,
                            style: styleText,
                            vibe: vibeText,
                        }}
                        perfumeName={passedData?.perfumeName}
                        userImageUrl={passedData?.userImageUrl}
                    />
                </div>

                {/* Slide 2 */}
                <div
                    className={`
                        absolute inset-0
                        transform transition-transform duration-700 ease-in-out
                        ${currentSlide === 1 ? 'translate-x-0' : 'translate-x-full'}
                    `}
                >
                    <TestTwo
                        perfumeName={passedData?.perfumeName}
                        mainNote={passedData?.mainNote}
                        mainNoteDesc={passedData?.mainNoteDesc}
                        mainNoteAnalysis={passedData?.mainNoteAnalysis}
                        mainNoteImageUrl={passedData?.mainNoteImageUrl}

                        middleNote={passedData?.middleNote}
                        middleNoteDesc={passedData?.middleNoteDesc}
                        middleNoteAnalysis={passedData?.middleNoteAnalysis}
                        middleNoteImageUrl={passedData?.middleNoteImageUrl}

                        baseNote={passedData?.baseNote}
                        baseNoteDesc={passedData?.baseNoteDesc}
                        baseNoteAnalysis={passedData?.baseNoteAnalysis}
                        baseNoteImageUrl={passedData?.baseNoteImageUrl}

                        citrus={passedData?.citrus}
                        floral={passedData?.floral}
                        fruity={passedData?.fruity}
                        musk={passedData?.musk}
                        spicy={passedData?.spicy}
                        woody={passedData?.woody}
                    />
                </div>
            </div>

            <div
                className="absolute z-30 flex left-1/2 bottom-[80px] transform -translate-x-1/2 space-x-3"
            >
                <button
                    type="button"
                    className={`w-3 h-3 rounded-full ${
                        currentSlide === 0 ? 'bg-black' : 'bg-gray-400'
                    }`}
                    aria-current={currentSlide === 0 ? 'true' : 'false'}
                    aria-label="Slide 1"
                    onClick={() => setCurrentSlide(0)}
                />
                <button
                    type="button"
                    className={`w-3 h-3 rounded-full ${
                        currentSlide === 1 ? 'bg-black' : 'bg-gray-400'
                    }`}
                    aria-current={currentSlide === 1 ? 'true' : 'false'}
                    aria-label="Slide 2"
                    onClick={() => setCurrentSlide(1)}
                />
            </div>


            {/* Next/Prev Controls */}
            {currentSlide === 0 && (
                <button
                    type="button"
                    className="absolute bottom-32 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    onClick={handleNext}
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full">
                        <svg
                            className="w-4 h-4 text-black"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            {/* RIGHT arrow */}
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 9 4-4-4-4"
                            />
                        </svg>
                        <span className="sr-only">Next</span>
                    </span>
                </button>
            )}

            {currentSlide === 1 && (
                <button
                    type="button"
                    className="absolute bottom-32 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    onClick={handlePrev}
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full">
                        <svg
                            className="w-4 h-4 text-black"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            {/* LEFT arrow */}
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 1 1 5l4 4"
                            />
                        </svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>
            )}

            {/* Button to open new tab */}
            <div className='flex items-center justify-center mb-4'>
                <button
                    className='defaultButton'
                    onClick={redirectToReport}
                >
                    <span className="text">보고서 보기</span>
                    <span>이동하기</span>
                </button>
            </div>

        </div>
    );
};
