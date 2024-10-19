import { ResultChart } from "../result/ResultChart";

export const ResultPage = () => {
    const resultDummydata = [
        {
            id: 1,
            name: "카리나",
            reportTitle: "카랑카랑한 동백나무",
            topNote: "Top: 장미",
            middleNote: "Middle: 은행나무",
            baseNote: "Base: 해바라기",
            appearanceDesc: [
                { facialFeature: "이쁨" },
                { style: "카리나 스타일" },
                { vibe: "에스파 아이돌 느낌" }
            ],
            noteDesc: [
                { topNoteDesc: "장미향 지림" },
                { middleNoteDesc: "은행나무이거 미침" },
                { baseNoteDesc: "해봐라귀~~~~" }
            ],
            combinedDesc: "카리나님은 되게 이쁘십니다. 평가를 할 필요가 없네요.",
            citrus: 30,
            floral: 70,
            woody: 20,
            watery: 60,
            fresh: 40,
            spicy: 100,
        }
    ];

    return (
        <div className="flex-col justify-center items-center min-h-screen w-full text-center">
            <div className="mt-[100px]">bogosau</div>

            <div>
                <ResultChart
                    inputCitrus={resultDummydata[0].citrus}
                    inputFloral={resultDummydata[0].floral}
                    inputWoody={resultDummydata[0].woody}
                    inputWatery={resultDummydata[0].watery}
                    inputFresh={resultDummydata[0].fresh}
                    inputSpicy={resultDummydata[0].spicy}
                />
            </div>
        </div>
    );
};
