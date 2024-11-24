// src/pages/ResultPage.jsx

import { ResultChart } from "../result/ResultChart";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { responseDataAtom } from "../../recoil/responseDataAtom.jsx";
import imageUploadIcon from "../../assets/upload.svg";
import React, { useEffect, useState } from "react";
import Loading from "./Loading.jsx";
import { ProcedureButton } from "../ProcedureButton.jsx";
import { RedirectButton } from "../RedirectButton.jsx";
import { userAtoms } from "../../recoil/userAtoms.jsx";

export const ResultPage = () => {
    const [responseData, setResponseData] = useRecoilState(responseDataAtom);
    const setUserState = useSetRecoilState(userAtoms);
    const navigate = useNavigate();
    const [copySuccess, setCopySuccess] = useState(false);

    useEffect(() => {
        history.pushState(null, "", "/");

        const handlePopState = () => {
            setUserState((prevState) => ({
                ...prevState,
                isAuthenticated: false,
            }));
            setResponseData(null);
            navigate("/", { replace: true });
        };

        window.onpopstate = handlePopState;

        return () => {
            window.onpopstate = null;
        };
    }, [setUserState, setResponseData, navigate]);

    // console.log(responseData);
    // if (!responseData) {
    //     return (
    //         <div className="flex justify-center items-center min-h-screen">
    //             <Loading />
    //         </div>
    //     );
    // }
    const handleCopy = () => {
        const urlToCopy = `https://www.pixent.co.kr/report/${responseData.uuid}`;
        navigator.clipboard
            .writeText(urlToCopy)
            .then(() => {
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
            })
            .catch((err) => {
                console.error("Failed to copy: ", err);
            });
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen w-full text-center">
            <div className="mb-[80px] ml-[140px] text-[36px] text-right font-bold">
                {responseData.perfumeName}
            </div>
            <div className="w-full h-auto flex justify-center items-center">
                {responseData.userImageUrl ? (
                    <img
                        src={responseData.userImageUrl}
                        alt="User Image"
                        className="max-w-full max-h-full"
                    />
                ) : (
                    <div className="text-center text-gray-500">
                        <div className="flex justify-center">
                            <img
                                src={imageUploadIcon}
                                alt="Upload icon"
                                className="w-[50px] h-[50px] mb-2"
                            />
                        </div>
                        <div>No Image Available</div>
                    </div>
                )}
            </div>
            <div className="mx-5">
                <div className="mt-[80px]">
                    <div className="text-left text-[18px] font-bold">ANALYSIS</div>
                    <div className="relative flex items-center justify-center w-full mt-3 mb-5">
                        <div className="h-[1px] w-full bg-black ml-[1px]" />
                        <div className="h-[1px] w-full bg-black mr-[5px]" />
                    </div>
                    <div className="text-left">
                        <h2 className="font-bold text-[14px] pb-2">Facial Feature</h2>
                        <p className="text-[12px]">
                            {responseData.appearance.facialFeature}
                        </p>
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
                    <div className="h-[1px] w-full bg-black ml-[1px]" />
                    <div className="h-[1px] w-full bg-black mr-[5px]" />
                </div>
                <div className="text-left">
                    <div className="flex items-center">
                        <img
                            src={responseData.mainNoteImageUrl}
                            alt="Main Note"
                            className="w-14 h-14 mr-2"
                        />
                        <span className="font-bold">TOP:</span> {responseData.mainNote}
                    </div>
                    <p className="text-[12px]">{responseData.mainNoteDesc}</p>
                    <p className="text-[12px]">{responseData.mainNoteAnalysis}</p>
                </div>
                <div className="text-left mt-4">
                    <div className="flex items-center">
                        <img
                            src={responseData.middleNoteImageUrl}
                            alt="Middle Note"
                            className="w-14 h-14 mr-2"
                        />
                        <span className="font-bold">MIDDLE:</span> {responseData.middleNote}
                    </div>
                    <p className="text-[12px]">{responseData.middleNoteDesc}</p>
                    <p className="text-[12px]">{responseData.middleNoteAnalysis}</p>
                </div>
                <div className="text-left mt-4">
                    <div className="flex items-center">
                        <img
                            src={responseData.baseNoteImageUrl}
                            alt="Base Note"
                            className="w-14 h-14 mr-2"
                        />
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
                        <div className="h-[1px] w-full bg-black ml-[1px]" />
                        <div className="h-[1px] w-full bg-black mr-[5px]" />
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
                <div className="flex justify-center">
                    <div className="w-full max-w-[16rem]">
                        <div className="flex items-center border border-black p-2">
                            <label htmlFor="copy-url-input" className="sr-only">
                                Copy URL
                            </label>
                            <input
                                id="copy-url-input"
                                type="text"
                                className="flex-grow text-gray-500 text-sm focus:ring-blue-500 p-2.5 outline-none border-none"
                                value={`https://www.pixent.co.kr/report/${responseData.uuid}`}
                                disabled
                                readOnly
                            />


                            <button
                                onClick={handleCopy}
                                data-tooltip-target="tooltip-copy-url-button"
                                className="text-gray-500 hover:bg-gray-100 rounded-lg p-2 inline-flex items-center justify-center"
                            >
                <span id="default-icon" className={copySuccess ? "hidden" : ""}>
                  <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 18 20"
                  >
                    <path
                        d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
                  </svg>
                </span>
                                <span id="success-icon" className={copySuccess ? "" : "hidden"}>
                  <svg
                      className="w-4 h-4 text-black"
                      aria-hidden="true"
                      fill="none"
                      viewBox="0 0 16 12"
                  >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5.917L5.724 10.5 15 1.5"
                    />
                  </svg>
                </span>
                            </button>
                            <div
                                id="tooltip-copy-url-button"
                                role="tooltip"
                                className="absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip"
                            >
                <span
                    id="default-tooltip-message"
                    className={copySuccess ? "hidden" : ""}
                >
                  Copy to clipboard
                </span>
                                <span
                                    id="success-tooltip-message"
                                    className={copySuccess ? "" : "hidden"}
                                >
                  Copied!
                </span>
                                <div className="tooltip-arrow" data-popper-arrow></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 mb-10">
                    <div>
                        <RedirectButton text="홈으로" subText="이동하기" delay={1000}/>
                    </div>
                </div>
            </div>
        </div>
    );
};