import { ResultChart } from "../result/ResultChart";
import {useRecoilValue} from "recoil";
import {useNavigate} from "react-router-dom";
import {responseDataAtom} from "../../recoil/responseDataAtom.jsx";
import imageUploadIcon from "../../assets/upload.svg";
import React from "react";
import {userAtoms} from "../../recoil/userAtoms.jsx";

export const ResultPage = () => {
    const userState = useRecoilValue(userAtoms); // Access the user state
    const imagePreview = userState.userImage; // Use base64 image data
    console.log("Base64 Image Data:", imagePreview);
    // const resultDummydata = [
    //     {
    //         id: 1,
    //         name: "카리나",
    //         reportTitle: "카랑카랑한 동백나무",
    //         topNote: "Top: 장미",
    //         middleNote: "Middle: 은행나무",
    //         baseNote: "Base: 해바라기",
    //         appearanceDesc: [
    //             { facialFeature: "이쁨" },
    //             { style: "카리나 스타일" },
    //             { vibe: "에스파 아이돌 느낌" }
    //         ],
    //         noteDesc: [
    //             { topNoteDesc: "장미향 지림" },
    //             { middleNoteDesc: "은행나무이거 미침" },
    //             { baseNoteDesc: "해봐라귀~~~~" }
    //         ],
    //         combinedDesc: "카리나님은 되게 이쁘십니다. 평가를 할 필요가 없네요.",
    //         citrus: 30,
    //         floral: 70,
    //         woody: 20,
    //         watery: 60,
    //         fresh: 40,
    //         spicy: 100,
    //     }
    // ];

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


    const responseData = [
        {
            id: 9,
            userName: "장원영",
            perfumeName: "블랑쉬",
            mainNote: "화이트로즈",
            mainNoteDesc: "섬세하고 순수한 로즈 향으로, 이슬을 머금은 하얀 장미처럼 맑고 깨끗한 향취가 특징입니다. 다른 로즈 계열보다 더욱 청초하고 우아한 느낌을 주며, 순백의 장미가 피워내는 섬세하고 맑은 향이 특징입니다. 순수하면서도 세련된 플로럴 향으로, 모던한 여성미를 표현하는 시그니처 노트입니다.",
            middleNote: "핑크페퍼",
            middleNoteDesc: "은은하고 세련된 스파이시 향으로, 플로럴 향에 현대적인 생동감을 더하는 특징이 있습니다. 다른 스파이시 계열보다 더욱 부드럽고 세련된 느낌을 주며, 장미의 우아함에 모던한 터치를 더하는 매력적인 향입니다. 스파이시향이 만들어내는 독특한 생동감으로 현대적인 세련미를 완성하는 미들 노트입니다.",
            baseNote: "머스크",
            baseNoteDesc: "부드럽고 포근한 베이스 노트로, 따뜻하고 섬세한 잔향이 특징입니다. 다른 머스크 계열보다 더욱 순수하고 포근한 느낌을 주며, 전체적인 향을 따뜻하게 감싸안는 포근한 베이스를 완성합니다. 깨끗하면서도 부드러운 머스크 향으로, 순수한 여성미를 더욱 돋보이게 하는 완벽한 마무리를 선사합니다.",
            appearance: {
                facialFeature: "장원영 님은 큰 눈과 뚜렷한 쌍꺼풀, 균형 잡힌 작은 코, 그리고 또렷한 입술 라인이 특징적입니다. 그녀의 피부는 매우 건강하고 맑으며, 빛나는 피부톤이 그녀의 전체적인 외모를 더욱 돋보이게 만듭니다. 이러한 섬세한 이목구비와 깨끗한 피부는 전형적인 드림 얼굴로 비춰지며, 사진에서도 눈에 띄는 아름다움을 보여줍니다.",
                style: "머리를 양쪽으로 묶고 그 위에 진주 장식이 달린 실을 얹어, 소녀스러움과 귀여움을 강조한 스타일을 완성했습니다. 이 스타일링은 마치 동화 속의 한 장면을 연상시키며, 독특한 개성을 부각시킵니다. 장식이 있는 얇은 목걸이와 귀걸이도 눈에 띄며, 골드와 진주를 활용하여 그녀의 우아함과 동시에 귀여움을 잘 표현하고 있습니다. 의상은 크림색 혹은 화이트톤으로, 전체적인 스타일링과 조화를 이루며 더욱 순수하고 청순한 느낌을 자아냅니다.",
                vibe: "장원영 님의 전반적인 분위기는 매우 활기차고 사랑스러운 느낌을 줍니다. 그녀의 스타일링과 메이크업은 그녀가 매우 발랄하고 친근한 이미지를 갖게 하였으며, 동시에 세련된 분위기 또한 유지하고 있습니다. 특히 진주 장식과 골드 액세서리들은 그녀의 귀여움을 한층 더 돋보이게 하였으며, 그녀의 밝고 긍정적인 에너지가 사진 속에서 그대로 전달됩니다. 이러한 분위기는 마치 누구나 그녀를 어여쁘게 여길 수밖에 없게 만드는 매력을 발산합니다."
            },
            profile: "블랑쉬 향수는 장원영 님의 발랄하고 귀여운 매력을 잘 반영합니다. 첫 향은 화이트 로즈의 섬세하고 순수한 향으로 시작하여, 마치 이슬을 머금은 하얀 장미처럼 맑고 깨끗한 첫인상을 선사합니다. 이는 그녀의 깨끗하고 밝은 이미지를 그대로 반영하며, 처음 보는 사람에게도 긍정적인 인상을 줄 것입니다. 이어서 핑크페퍼의 은은하고 세련된 스파이시함이 더해져 현대적인 생동감을 더하며, 장원영 님의 사랑스러움과 세련된 이미지를 동시에 표현합니다. 마지막으로 머스크의 부드럽고 포근한 베이스 노트가 전체적인 향을 따뜻하게 감싸안습니다. 이는 그녀가 주는 따뜻하고 포근한 인상을 마무리하는 완벽한 조합입니다.\n\n장원영 님의 또렷한 이목구비와 건강한 피부는 블랑쉬의 깨끗하고 섬세한 첫 향과 잘 어울립니다. 그녀의 밝고 사랑스러운 스타일과 진주와 골드 액세서리가 완벽하게 녹아든 세련된 분위기는 핑크페퍼의 현대적 감각에 잘 부합합니다. 전체적인 외모와 분위기가 블랑쉬 향수가 지닌 순수함과 세련된 스파이시함, 포근한 머스크의 조화와 잘 맞습니다. 이 모든 요소들이 합쳐져 장원영 님의 이미지를 더욱 돋보이게 할 것입니다.\n\n블랑쉬는 맑고 우아한 이미지의 장원영 님에게 특히 잘 어울립니다. 투명한 피부와 부드러운 이목구비를 가진 그녀는 화이트 슬립 드레스, 아이보리 실크 블라우스, 크림 컬러의 니트 원피스 등 밝고 여성스러운 의상에 완벽히 조화를 이룰 것입니다. 진주 귀걸이나 실버 펜던트 등 단정하고 우아한 주얼리와 매치하면 더욱 세련된 분위기를 연출할 수 있으며, 그녀의 밝고 우아한 매력을 한층 더 돋보이게 할 수 있습니다. 블랑쉬는 장원영 님의 화사하고 상쾌한 이미지를 완성해 줄 최적의 향수입니다.",
            imageName: "2024-11-05-06-24-14-장원영.jpg",
            citrus: 20,
            floral: 90,
            woody: 20,
            watery: 60,
            fruity: 20,
            spicy: 20
        }
    ];



    return (
        <div className="flex-col justify-center items-center min-h-screen w-full text-center">
            <div className="mt-[100px] text-2xl text-right font-bold mr-10">{responseData[0].perfumeName}</div>
            <div
                className="w-full max-w-[460px] h-[240px] border border-black flex justify-center items-center bg-gray-100">
                {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="max-w-full max-h-full"/>
                ) : (
                    <div className="text-center text-gray-500">
                        <div className="flex justify-center">
                            <img src={imageUploadIcon} alt="Upload icon" className="w-[50px] h-[50px] mb-2"/>
                        </div>
                        <div>이미지</div>
                    </div>
                )}
            </div>
            <div>
                <div><h1>ANALYSIS</h1></div>
                <div className="relative flex items-center justify-center w-full my-8">
                    <div className="h-[2px] w-full bg-black ml-[20px]"/>
                    <div className="h-[2px] w-full bg-black mr-[20px]"/>
                </div>
                <div>Facial Feature</div>
                <div>{responseData[0].appearance.facialFeature}</div>
                <div>Style</div>
                <div>{responseData[0].appearance.style}</div>
                <div>Vibe</div>
                <div>{responseData[0].appearance.vibe}</div>
            </div>
            <div><h1>NOTES</h1></div>
            <div className="relative flex items-center justify-center w-full my-8">
                <div className="h-[2px] w-full bg-black ml-[20px]"/>
                <div className="h-[2px] w-full bg-black mr-[20px]"/>
            </div>
            <div>
                <div>
                    <h1>TOP: {responseData[0].mainNote}</h1>
                </div>
                <div>
                    {responseData[0].mainNoteDesc}
                </div>
            </div>
            <div>
                <div>
                    <h1>MIDDLE: {responseData[0].middleNote}</h1>
                </div>
                <div>
                    {responseData[0].middleNoteDesc}
                </div>
            </div>
            <div>
                <div>
                    <h1>BASE: {responseData[0].baseNote}</h1>
                </div>
                <div>
                    {responseData[0].baseNoteDesc}
                </div>
            </div>

            <div>
                <ResultChart
                    inputCitrus={responseData[0].citrus}
                    inputFloral={responseData[0].floral}
                    inputWoody={responseData[0].woody}
                    inputWatery={responseData[0].watery}
                    inputFresh={responseData[0].fruity}
                    inputSpicy={responseData[0].spicy}
                />
            </div>
        </div>
    );
};
