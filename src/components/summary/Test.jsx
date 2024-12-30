// src/components/summary/Test.jsx
import React from 'react';

/**
 * Test component.
 * Receives:
 *  - appearance (object) -> { facialFeature, style, vibe }
 *  - perfumeName (string)
 *  - userImageUrl (string)
 */
const Test = ({ appearance, perfumeName, userImageUrl }) => {
    const facialFeature = appearance?.facialFeature || 'No facial feature info';
    const styleText = appearance?.style || 'No style info';
    const vibeText = appearance?.vibe || 'No vibe info';

    return (

    <div className="relative w-full max-w-2xl mx-auto p-4 bg-white">
        {/* ======= Frame / Border Decorations ======= */}
        {/*
        4) We keep the existing borders/corners.
           pointer-events-none ensures clicks pass through these overlays.
      */}
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
        {/*
         5) Removed `h-full` from this wrapper as well.
            Now it will auto-height around the content.
      */}
        <div className="flex flex-col items-center p-6">
            {/* Title & Subtitle */}
            <div className="text-center mb-3 mt-5">
                <h1 className="text-2xl tracking-widest font-light">
                    {perfumeName || "AC'SCENT ID"}
                </h1>
                <p className="text-xs tracking-wide text-gray-600 mt-1 font-light">
                    DISCOVER YOUR SIGNATURE PERFUMEWEAR
                </p>
            </div>

            {/* Main Image (User Image) */}
            <div className="relative w-40 h-48 mb-4">
                <img
                    src={userImageUrl || '/api/placeholder/160/192'}
                    alt="User"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 border border-black opacity-10"></div>
            </div>

            {/* Appearance Features (Facial Feature, Style, Vibe) */}
            <div className="w-full space-y-3">
                {/* Facial Feature */}
                <div className="flex flex-col items-center px-6">
                    <h2 className="text-xs tracking-widest font-bold mb-0.5">FACIAL FEATURE</h2>
                    <p className="text-xs text-gray-600 font-light text-center">{facialFeature}</p>
                </div>

                {/* Style */}
                <div className="flex flex-col items-center px-6">
                    <h2 className="text-xs tracking-widest font-bold mb-0.5">STYLE</h2>
                    <p className="text-xs text-gray-600 font-light text-center">{styleText}</p>
                </div>

                {/* Vibe */}
                <div className="flex flex-col items-center px-6">
                    <h2 className="text-xs tracking-widest font-bold mb-0.5">VIBE</h2>
                    <p className="text-xs text-gray-600 font-light text-center">{vibeText}</p>
                </div>
            </div>
        </div>
    </div>
);
};

export default Test;
