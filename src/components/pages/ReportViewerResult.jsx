import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetReportByUuid } from "../../hooks/useGetReportByUuid";
import imageUploadIcon from "../../assets/upload.svg";
import { ResultChart } from "../result/ResultChart.jsx";
import { RedirectButton } from "../RedirectButton.jsx";
import { ImagePerfumeButton } from "../result/ImagePerfumeButton.jsx";

export const ReportViewerResult = () => {
    const { id: uuid } = useParams();
    const { data: responseData, isLoading, isError } = useGetReportByUuid(uuid);
    const navigate = useNavigate();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching report. Please try again later.</div>;
    }

    const handleSummaryClick = () => {
        // Navigate to '/summary' and pass responseData via state
        navigate('/summary', { state: responseData });
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen w-full text-center">
            <div className="w-full h-auto flex flex-col justify-center items-center">
                {responseData.userImageUrl ? (
                    <img src={responseData.userImageUrl} alt="User Image" className="max-w-full max-h-full"/>
                ) : (
                    <div className="text-center text-gray-500">
                        <div className="flex justify-center">
                            <img src={imageUploadIcon} alt="Upload icon" className="w-[50px] h-[50px] mb-2"/>
                        </div>
                        <div>No Image Available</div>
                    </div>
                )}
                <div className='mt-12'>
                    <p className='font-headerTitle text-[40px]'>{responseData.perfumeName}</p>
                </div>
            </div>

            <div className="mx-5">
                <div className="mt-[80px]">
                    <div><p className="text-white text-sm mt-8">
                        {/*클릭하여 추천 향 확인하기*/}
                    </p></div>
                    <div className="text-left text-[18px] font-bold">ANALYSIS</div>
                    <div className="relative flex items-center justify-center w-full mt-3 mb-5">
                        <div className="h-[1px] w-full bg-black ml-[1px]"/>
                        <div className="h-[1px] w-full bg-black mr-[5px]"/>
                    </div>
                    <div className="text-left">
                        <h2 className="font-bold text-[14px] pb-2">Facial Feature</h2>
                        <p className="text-[12px]">{responseData.appearance.facialFeature}</p>
                        <h2 className="font-bold text-[14px] pb-2 mt-4">Style</h2>
                        <p className="text-[12px]">{responseData.appearance.style}</p>
                        <h2 className="font-bold text-[14px] pb-2 mt-4">Vibe</h2>
                        <p className="text-[12px]">{responseData.appearance.vibe}</p>
                    </div>
                </div>
                <div>
                    <div className="text-left text-[18px] font-bold mt-8">NOTES</div>
                </div>
                <div className="relative flex items-center justify-center w-full mt-3 mb-5">
                    <div className="h-[1px] w-full bg-black ml-[1px]"/>
                    <div className="h-[1px] w-full bg-black mr-[5px]"/>
                </div>
                <div className="text-left">
                    <div className="flex items-center">
                        <img src={responseData.mainNoteImageUrl} alt="Main Note" className="w-14 h-14 mr-2"/>
                        <span className="font-bold">TOP:</span> {responseData.mainNote}
                    </div>
                    <p className="text-[12px]">{responseData.mainNoteDesc}</p>
                    <p className="text-[12px]">{responseData.mainNoteAnalysis}</p>
                </div>
                <div className="text-left mt-4">
                    <div className="flex items-center">
                        <img src={responseData.middleNoteImageUrl} alt="Middle Note" className="w-14 h-14 mr-2"/>
                        <span className="font-bold">MIDDLE:</span> {responseData.middleNote}
                    </div>
                    <p className="text-[12px]">{responseData.middleNoteDesc}</p>
                    <p className="text-[12px]">{responseData.middleNoteAnalysis}</p>
                </div>
                <div className="text-left mt-4">
                    <div className="flex items-center">
                        <img src={responseData.baseNoteImageUrl} alt="Base Note" className="w-14 h-14 mr-2"/>
                        <span className="font-bold">BASE:</span> {responseData.baseNote}
                    </div>
                    <p className="text-[12px]">{responseData.baseNoteDesc}</p>
                    <p className="text-[12px]">{responseData.baseNoteAnalysis}</p>
                </div>
                <div className="text-left">
                    <div>
                        <div className="text-[18px] font-bold mt-14">PROFILES</div>
                    </div>
                    <div className="relative flex items-center justify-center w-full mt-3 mb-5">
                        <div className="h-[1px] w-full bg-black ml-[1px]"/>
                        <div className="h-[1px] w-full bg-black mr-[5px]"/>
                    </div>
                    <div>
                        <p className="text-[12px]">{responseData.profile}</p>
                    </div>
                </div>
                <div className="mt-8">
                    <ResultChart
                        inputCitrus={responseData.citrus}
                        inputFloral={responseData.floral}
                        inputWoody={responseData.woody}
                        inputMusk={responseData.musk}
                        inputFresh={responseData.fruity}
                        inputSpicy={responseData.spicy}
                    />
                </div>
                <div className="mt-8 mb-10">
                    <div>
                        <RedirectButton text="구매하기" subText="이동하기" delay={0} target="https://acscent.co.kr/shop_view/?idx=199"/>
                    </div>
                </div>
                <div className='flex justify-end'>
                    <button
                        onClick={handleSummaryClick}
                        className="bg-white text-white px-4 py-2 rounded mt-4"
                    >
                        요약본 보기
                    </button>
                </div>
            </div>
        </div>
    );
};
