// src/components/pages/ReportSummary.jsx
import React, { useEffect } from 'react';
import { initCarousels } from 'flowbite';
import { useLocation } from "react-router-dom";

// Child slides
import Test from '../summary/Test.jsx';
import TestTwo from '../summary/TestTwo.jsx';

// Regex helper
import { extractFirstTwoSentences } from '../ExtractTwoSentense.jsx';

export const ReportSummary = () => {
    const location = useLocation();
    const passedData = location.state;

    // Log for debugging
    useEffect(() => {
        console.log('ReportSummary received data:', passedData);
    }, [passedData]);

    // Initialize Flowbite carousel after mount
    useEffect(() => {
        initCarousels();
    }, []);

    // 1) Extract up to two sentences ending in "다." from each appearance field
    const facialFeature = extractFirstTwoSentences(passedData?.appearance?.facialFeature);
    const styleText     = extractFirstTwoSentences(passedData?.appearance?.style);
    const vibeText      = extractFirstTwoSentences(passedData?.appearance?.vibe);

    return (
        <div
            id="indicators-carousel"
            className="relative w-full"
            data-carousel="static"
        >
            {/* Carousel wrapper */}
            <div className="relative h-[700px] overflow-hidden rounded-lg">
                {/* Slide 1 */}
                <div className="duration-700 ease-in-out" data-carousel-item="active">
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
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                    <TestTwo
                        // Everything about notes
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

            {/* Slider indicators (buttons to jump to each slide) */}
            <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
                <button
                    type="button"
                    className="w-3 h-3 rounded-full"
                    aria-current="true"
                    aria-label="Slide 1"
                    data-carousel-slide-to="0"
                ></button>
                <button
                    type="button"
                    className="w-3 h-3 rounded-full"
                    aria-current="false"
                    aria-label="Slide 2"
                    data-carousel-slide-to="1"
                ></button>
            </div>

            {/* Next/Prev Controls */}
            <button
                type="button"
                className="absolute bottom-32 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-prev
            >
        <span
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30
                     group-focus:outline-none"
        >
          <svg
              className="w-4 h-4 text-black rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
          >
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
            <button
                type="button"
                className="absolute bottom-32 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-next
            >
        <span
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30
                     group-focus:outline-none"
        >
          <svg
              className="w-4 h-4 text-black rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
          >
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
        </div>
    );
};
