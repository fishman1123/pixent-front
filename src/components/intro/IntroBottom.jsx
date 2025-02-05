// IntroBottom.jsx

import { IntroSecondButton } from "./IntroSecondButton.jsx";
import React, {useState} from "react";
import ToastModal from "../ToastModal.jsx";
import plusIcon from "../../assets/plus.svg";
import checkIcon from "../../assets/check.svg";
import cancelIcon from "../../assets/ax.svg";
import {MyPageToastContent} from "../myPage/MyPageToastContent.jsx";

export const IntroBottom = () => {

    const [clickedId, setClickedId] = useState(null);
    const [copySuccess, setCopySuccess] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [collectionStates, setCollectionStates] = useState({});

    const dummyData = {
        user_uuid: "10101010",
        user_report: [
            {
                id: 451,
                userName: "카리나",
                perfumeName: "AC'SCENT17",
                mainNote: "레몬페퍼",
                mainNoteDesc: "상큼하면서도 스파이시한 향으로 ...",
                mainNoteAnalysis: "레몬페퍼의 상큼하면서도 ...",
                mainNoteImageUrl: "https://pixent-image.s3.ap-northeast-2.amazonaws.com/product/17-1.png",
                middleNote: "인센스",
                middleNoteDesc: "영적이고 심오한 스모키 향으로 ...",
                middleNoteAnalysis: "인센스의 심오하면서도 매혹적인 ...",
                middleNoteImageUrl: "https://pixent-image.s3.ap-northeast-2.amazonaws.com/product/17-2.png",
                baseNote: "오리스",
                baseNoteDesc: "파우더리하고 은은한 플로럴 노트로 ...",
                baseNoteAnalysis: "오리스의 파우더리하고 섬세한 플로럴 노트는 ...",
                baseNoteImageUrl: "https://pixent-image.s3.ap-northeast-2.amazonaws.com/product/17-3.png",
                appearance: {
                    facialFeature: "사진 속의 인물은 선명한 이목구비와 ...",
                    style: "카리나 님의 스타일은 미래주의적 요소와 ...",
                    vibe: "전체적으로 강렬하면서도 명랑한 분위기가 ..."
                },
                profile: "카리나 님의 외모는 매우 독특하고 현대적인 감각이 돋보입니다 ...",
                userImageUrl: "https://pixent-image.s3.ap-northeast-2.amazonaws.com/user/2025-02-05-16-15-28-asdasd.jpg",
                citrus: 60,
                floral: 10,
                woody: 80,
                musk: 30,
                fruity: 10,
                spicy: 70,
                uuid: "xxxxxxxxx"
            },
            {
                id: 452,
                userName: "아리아",
                perfumeName: "AC'SCENT12",
                mainNote: "로즈마리",
                mainNoteDesc: "부드럽고 푸릇한 허브 계열의 향으로 ...",
                mainNoteAnalysis: "로즈마리의 그린 허브 향은 아리아 님의 ...",
                mainNoteImageUrl: "https://pixent-image.s3.ap-northeast-2.amazonaws.com/product/12-1.png",
                middleNote: "화이트 머스크",
                middleNoteDesc: "깨끗하고 부드러운 머스크 계열의 향으로 ...",
                middleNoteAnalysis: "화이트 머스크의 깨끗하고 포근한 향은 ...",
                middleNoteImageUrl: "https://pixent-image.s3.ap-northeast-2.amazonaws.com/product/12-2.png",
                baseNote: "샌달우드",
                baseNoteDesc: "부드럽고 따뜻한 우디 계열의 향으로 ...",
                baseNoteAnalysis: "샌달우드의 차분하면서도 따뜻한 우디 노트는 ...",
                baseNoteImageUrl: "https://pixent-image.s3.ap-northeast-2.amazonaws.com/product/12-3.png",
                appearance: {
                    facialFeature: "부드러운 눈매와 자연스러운 분위기가 ...",
                    style: "아리아 님의 스타일은 로맨틱하고 ...",
                    vibe: "전체적으로 따뜻하면서도 차분한 분위기를 ..."
                },
                profile: "아리아 님의 자연스러운 이미지와 로맨틱한 감각은 ...",
                userImageUrl: "https://pixent-image.s3.ap-northeast-2.amazonaws.com/user/2025-02-05-16-15-28-asdasd.jpg",
                citrus: 30,
                floral: 50,
                woody: 40,
                musk: 60,
                fruity: 20,
                spicy: 20,
                uuid: "yyyyyyyyy"
            }
        ]
    };
    const handleClickButton = (id) => {
        setClickedId(id);
        setShowToast(true);
    };

    const handleCloseToast = () => {
        setShowToast(false);
        setClickedId(null);
    };

    const selectedReport = dummyData.user_report.find(report => report.id === clickedId);

    const handleCopy = () => {
        const urlToCopy = `pixent.co.kr/report/${selectedReport?.uuid}`;
        navigator.clipboard
            .writeText(urlToCopy)
            .then(() => {
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 2000);
            })
            .catch((err) => {
                console.error("Failed to copy: ", err);
            });
    };

    const handleCollectionClick = (reportId) => {
        const currentState = collectionStates[reportId] || "default";

        if (currentState === "default") {
            setCollectionStates((prev) => ({
                ...prev,
                [reportId]: "pending",
            }));

            setTimeout(() => {
                setCollectionStates((prev) => ({
                    ...prev,
                    [reportId]: "added",
                }));
            }, 600);
        } else if (currentState === "added") {
            setCollectionStates((prev) => ({
                ...prev,
                [reportId]: "default",
            }));
        }
    };

    const getCollectionButtonProps = (reportId) => {
        const state = collectionStates[reportId] || "default";

        switch (state) {
            case "pending":
                return {
                    icon: checkIcon,
                    text: "컬렉션 추가완료!",
                    disabled: true,
                };
            case "added":
                return {
                    icon: cancelIcon,
                    text: "컬렉션 추가 취소",
                    disabled: false,
                };
            default:
                return {
                    icon: plusIcon,
                    text: "향수 컬렉션 추가하기",
                    disabled: false,
                };
        }
    };

    return (
        <div className="flex-1 flex-col flex h-full min-h-[300px] w-full mt-6 bg-white text-black">
            <div className="text-left ml-[30px] text-[24px] font-bold">GALLERY</div>

            <div className="flex flex-wrap justify-center gap-4 p-4">
                {dummyData.user_report.map((report) => (
                    <div className="w-[45%] max-w-[160px]" key={report.id}>
                        <IntroSecondButton
                            perfumeName={report.perfumeName}
                            mainNote={report.mainNote}
                            userImageUrl={report.userImageUrl}
                            isClicked={clickedId === report.id}
                            onClick={() => handleClickButton(report.id)}
                        />
                    </div>
                ))}

                {/* TOAST MODAL */}
                {showToast && selectedReport && (
                    <ToastModal onClose={handleCloseToast}>
                        <MyPageToastContent
                            selectedReport={selectedReport}
                            handleCopy={handleCopy}
                            copySuccess={copySuccess}
                            getCollectionButtonProps={getCollectionButtonProps}
                            handleCollectionClick={handleCollectionClick}
                        />
                    </ToastModal>
                )}
            </div>
        </div>
    );
};
