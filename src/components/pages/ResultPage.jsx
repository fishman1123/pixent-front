import { ResultChart } from "../result/ResultChart";
import {useRecoilValue} from "recoil";
import {useNavigate} from "react-router-dom";
import {responseDataAtom} from "../../recoil/responseDataAtom.jsx";
import imageUploadIcon from "../../assets/upload.svg";
import React from "react";
import {userAtoms} from "../../recoil/userAtoms.jsx";

export const ResultPage = () => {
    const responseData = useRecoilValue(responseDataAtom);
    const navigate = useNavigate();


    // const responseData = useRecoilValue(responseDataAtom);
    // const navigate = useNavigate();
    //
    // if (!responseData) {
    //     // If no data is present, redirect to the form page or show a message
    //     return (
    //         <div className="container mx-auto p-4 text-center">
    //             <h2 className="text-2xl font-semibold mb-4">No Submission Data Found</h2>
    //             <p>Please submit the form first.</p>
    //             <button
    //                 onClick={() => navigate('/')}
    //                 className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
    //             >
    //                 Go to Home
    //             </button>
    //         </div>
    //     );
    // }


    // const responseData = [
    //     {
    //         id: 6,
    //         userName: "장원영",
    //         perfumeName: "몽파리",
    //         mainNote: "스트로베리",
    //         mainNoteDesc: "달콤하고 싱그러운 과즙이 터지는 듯한 프루티 향으로, 사랑스럽고 발랄한 에너지가 특징입니다. 다른 베리류보다 더욱 밝고 경쾌한 달콤함을 지니고 있으며, 귀여우면서도 매력적인 첫인상을 전달하는 대표적인 베리 계열 향입니다. 청순하면서도 사랑스러운 이미지를 완성하는 매력적인 향입니다.",
    //         mainNoteImageUrl: "https://pixent-image.s3.ap-northeast-2.amazonaws.com/product/3-1.png",
    //         middleNote: "자스민",
    //         middleNoteDesc: "섬세하고 여성스러운 화이트 플로럴 노트로, 우아하고 로맨틱한 분위기를 자아냅니다. 다른 화이트 플로럴보다 더욱 관능적이면서도 세련된 향취가 특징이며, 부드럽고 깊이 있는 꽃향이 매혹적인 여성미를 표현합니다. 밤공기에 은은히 퍼지는 듯한 고급스러운 향입니다.",
    //         middleNoteImageUrl: "https://pixent-image.s3.ap-northeast-2.amazonaws.com/product/3-2.png",
    //         baseNote: "바닐라",
    //         baseNoteDesc: "부드럽고 포근한 스위트 노트로, 따뜻하고 안락한 느낌을 선사합니다. 달콤하면서도 부드러운 잔향으로 전체적인 향을 포근하게 감싸안아주는 특징이 있습니다. 다른 스위트 계열보다 더욱 편안하고 아늑한 느낌을 주며, 사랑스러운 잔향을 완성하는 대표적인 베이스 노트입니다.",
    //         baseNoteImageUrl: "https://pixent-image.s3.ap-northeast-2.amazonaws.com/product/3-3.png",
    //         appearance: {
    //             facialFeature: "장원영님의 얼굴은 뚜렷한 이목구비가 특징입니다. 특히 부드럽고 동그란 얼굴형은 청순하고 사랑스러운 인상을 주며, 큰 눈과 선명한 이중 쌍꺼풀은 맑고 청순한 매력을 강조합니다. 날카롭지 않은 코와 자연스럽게 메이크업된 피부는 전체적으로 깨끗하고 맑은 느낌을 줍니다. 붉은빛이 도는 입술은 건강하고 생기있는 이미지를 표현하며, 자연스러운 눈썹과 마스카라로 강조된 속눈썹은 눈을 더욱 돋보이게 합니다.",
    //             style: "장원영님의 스타일은 클래식하면서도 로맨틱한 감성이 돋보입니다. 사진에서 볼 수 있듯이, 그녀는 화려한 진주 액세서리로 머리와 귀를 장식하고 있으며, 빛나는 파스텔 톤의 귀걸이와 목걸이는 소녀스러운 이미지를 한층 더 강조합니다. 그녀의 헤어스타일은 양쪽에 큰 웨이브를 주어 풍성하면서도 사랑스러운 느낌을 줍니다. 화려한 액세서리와 함께 빛나는 화이트 톤의 의상은 청순하면서도 고급스러운 느낌을 줍니다.",
    //             vibe: "장원영님의 전반적인 분위기는 상큼하면서도 러블리한 감성이 돋보입니다. 클래식하면서도 현대적인 이미지가 혼합된 스타일은 그녀만의 독특한 매력을 만들어냅니다. 밝고 청순한 이미지와 함께 화려하고 세련된 느낌을 동시에 지니고 있어 다양한 매력을 발산합니다. 전체적으로 상큼하고 사랑스러운 이미지를 통해 긍정적인 에너지를 전달하며, 그녀의 웃음과 표정에서 전해지는 따뜻한 분위기는 주변 사람들에게도 기분 좋은 인상을 심어줍니다."
    //         },
    //         profile: "AS'CENTS3은 장원영님의 화사하고 사랑스러운 이미지를 반영한 향수로, 그녀의 밝고 발랄한 매력을 가장 잘 표현합니다. 스트로베리의 달콤하고 싱그러운 과즙향으로 시작하여, 자스민의 섬세하고 여성스러운 화이트 플로럴 노트가 로맨틱한 분위기를 자아내며, 마지막으로 바닐라의 부드럽고 포근한 스위트 노트가 전체적인 향을 따뜻하고 아늑하게 마무리합니다.\n\n장원영님의 얼굴은 뚜렷하고 동그란 이목구비가 특징이며, 이는 스트로베리의 달콤하고 발랄한 에너지와 잘 어울립니다. 또한 화려한 진주 액세서리와 화이트 톤 의상은 자스민의 우아하고 여성스러운 플로럴 노트와 잘 맞아떨어집니다. 그녀의 상큼하고 사랑스러운 분위기는 바닐라의 따스하고 편안한 느낌을 통해 한층 더 강조됩니다. \n\n몽파리는 현대적이면서도 클래식한 장원영님의 스타일과 매우 잘 어울리는 향수입니다. 스트로베리의 달콤함은 그녀의 사랑스러운 이미지를 더욱 돋보이게 하며, 자스민의 플로럴 노트는 그녀의 우아함을 장식합니다. 마지막으로 바닐라의 부드러움은 그녀의 따뜻한 분위기와 완벽하게 어우러집니다. 이 향수는 특히 데이트나 소셜 모임, 브런치 약속 등 로맨틱하고 가벼운 분위기의 자리에서 착용하기 좋습니다.\n\n장원영님처럼 밝고 사랑스러운 이미지를 가진 여성에게 몽파리 향수는 최적의 선택이 될 것이며, 그녀의 자연스럽고 긍정적인 매력을 더욱 돋보이게 할 것입니다. 이 향수는 현대적이면서도 로맨틱한 이미지로, 특별한 순간들을 더욱 기억에 남게 만들어줄 것입니다. 몽파리는 장원영님의 상큼함과 따스함, 그리고 우아함을 완벽하게 표현해주는 시그니처 향수가 될 것입니다.",
    //         userImageUrl: "https://pixent-image.s3.ap-northeast-2.amazonaws.com/user/2024-11-11-14-22-07-%EC%9E%A5%EC%9B%90%EC%98%81.jpg",
    //         citrus: 60,
    //         floral: 60,
    //         woody: 20,
    //         musk: 30,
    //         fruity: 80,
    //         spicy: 10
    //     }
    //
    //     //you may ignore these datas
    // ];



    return (
        <div className="flex-col justify-center items-center min-h-screen w-full text-center">
            <div className="mt-[40px] text-[36px] text-right font-bold mr-8">
                {responseData[0].perfumeName}
            </div>
            <div
                className="w-full h-auto flex justify-center items-center">
                {responseData[0].userImageUrl ? (
                    <img src={responseData[0].userImageUrl} alt="User Image" className="max-w-full max-h-full"/>
                ) : (
                    <div className="text-center text-gray-500">
                        <div className="flex justify-center">
                            <img src={imageUploadIcon} alt="Upload icon" className="w-[50px] h-[50px] mb-2"/>
                        </div>
                        <div>No Image Available</div>
                    </div>
                )}
            </div>
            <div className="mx-5">
                <div className="mt-[80px]">
                    <div className="text-left text-[18px] font-bold">ANALYSIS</div>
                    <div className="relative flex items-center justify-center w-full mt-3 mb-5">
                        <div className="h-[1px] w-full bg-black ml-[1px]"/>
                        <div className="h-[1px] w-full bg-black mr-[5px]"/>
                    </div>
                    <div className="text-left">
                        <h2 className="font-bold text-[14px] pb-2">Facial Feature</h2>
                        <p className="text-[12px]">{responseData[0].appearance.facialFeature}</p>
                        <h2 className="font-bold text-[14px] pb-2 mt-4">Style</h2>
                        <p className="text-[12px]">{responseData[0].appearance.style}</p>
                        <h2 className="font-bold text-[14px] pb-2 mt-4">Vibe</h2>
                        <p className="text-[12px]">{responseData[0].appearance.vibe}</p>
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
                    <div>
                        <img src={responseData[0].mainNoteImageUrl} alt="Main Note"
                             className="inline-block w-14 h-14 mr-2"/>
                        <span className="font-bold">TOP:</span> {responseData[0].mainNote}
                    </div>
                    <p className="text-[12px]">{responseData[0].mainNoteDesc}</p>
                </div>
                <div className="text-left mt-4">
                    <div>
                        <img src={responseData[0].middleNoteImageUrl} alt="Middle Note"
                             className="inline-block w-14 h-14  mr-2"/>
                        <span className="font-bold">MIDDLE:</span> {responseData[0].middleNote}
                    </div>
                    <p className="text-[12px]">{responseData[0].middleNoteDesc}</p>
                </div>
                <div className="text-left mt-4">
                    <div>
                        <img src={responseData[0].baseNoteImageUrl} alt="Base Note"
                             className="inline-block w-14 h-14  mr-2"/>
                        <span className="font-bold">BASE:</span> {responseData[0].baseNote}
                    </div>
                    <p className="text-[12px]">{responseData[0].baseNoteDesc}</p>
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
                        <p className="text-[12px]">{responseData[0].profile}</p>
                    </div>
                </div>

                <div className="mt-8">
                    <ResultChart
                        inputCitrus={responseData[0].citrus}
                        inputFloral={responseData[0].floral}
                        inputWoody={responseData[0].woody}
                        inputWatery={responseData[0].musk}
                        inputFresh={responseData[0].fruity}
                        inputSpicy={responseData[0].spicy}
                    />
                </div>
            </div>
        </div>
    );
};
