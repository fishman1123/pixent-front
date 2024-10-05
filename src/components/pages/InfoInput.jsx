// InfoInput.jsx
import React, { useEffect } from 'react';
import { InputTextTop } from "../inputInfo/InputTextTop.jsx";
import { Checkbox } from "../inputInfo/CheckBox.jsx";
import { SelectForm } from "../inputInfo/SelectForm.jsx";
import { InputTextCenter } from "../inputInfo/InputTextCenter.jsx";
import { useRecoilState } from 'recoil';
import { checkboxDataAtom } from '../../recoil/checkboxDataAtom.jsx';
import { checkboxSelectionsAtom } from '../../recoil/checkboxSelectionsAtom.jsx';
import { InputInfoButton } from "../inputInfo/InputInfoButton.jsx";
import {ProcedureButton} from "../ProcedureButton.jsx";

export const InfoInput = () => {
    const [checkboxData, setCheckboxData] = useRecoilState(checkboxDataAtom);
    const [checkboxSelections, setCheckboxSelections] = useRecoilState(checkboxSelectionsAtom);

    useEffect(() => {
        //dummy data
        const dummyData = [
            {
                id: 1,
                label: "시트러스",
                description: "시트러스 계열은 레몬, 라임, 베르가못, 자몽 등의 감귤류 향을 기반으로 합니다. 신선하고 상쾌한 이 향은 여름철에 특히 인기가 있으며, 활력과 긍정적인 기운을 선사합니다.",
                additionalInfo: [
                    "활동적이고 에너지 넘치는 사람",
                    "밝고 긍정적인 성격의 소유자",
                    "깔끔하고 단정한 이미지 추구자",
                    "젊고 생기 있는 분위기를 원하는 사람",
                ],
                chartData: [
                    { name: '당도', value: 7 },
                    { name: '산도', value: 8 },
                    { name: '신선함', value: 9 },
                    { name: '지속력', value: 6 },
                ],
            },
            {
                id: 2,
                label: "플로럴",
                description: "플로럴 계열은 장미, 재스민, 라벤더 등의 꽃 향기를 중심으로 합니다. 로맨틱하고 부드러운 이 향은 여성스러움을 강조하며, 우아하고 세련된 느낌을 줍니다.",
                additionalInfo: [
                    "로맨틱하고 부드러운 성격의 소유자",
                    "여성스럽고 소프트한 향을 선호하는 사람",
                    "우아함과 세련됨을 추구하는 사람",
                ],
                chartData: [
                    { name: '달콤함', value: 8 },
                    { name: '우아함', value: 9 },
                    { name: '신선함', value: 6 },
                    { name: '지속력', value: 7 },
                ],
            },
            {
                id: 3,
                label: "우디",
                description: "우디 계열은 삼나무, 샌달우드, 베티버 등 나무 향을 기반으로 합니다. 깊고 따뜻한 이 향은 성숙하고 세련된 분위기를 연출합니다.",
                additionalInfo: [
                    "깊고 차분한 성격의 소유자",
                    "성숙하고 세련된 이미지를 원하는 사람",
                    "자연과의 연결감을 중요시하는 사람",
                ],
                chartData: [
                    { name: '깊이', value: 9 },
                    { name: '따뜻함', value: 8 },
                    { name: '신선함', value: 5 },
                    { name: '지속력', value: 8 },
                ],
            },
            {
                id: 4,
                label: "오리엔탈",
                description: "오리엔탈 계열은 한국, 중국, 일본, 등 동아시아스러운 향을 기반으로 합니다. 인종차별적이고 얇고 이상한 이 향은 불편한 분위기를 연출합니다.",
                additionalInfo: [
                    "방구석 여포 기질이 있는 사람",
                    "겁나 예민한 사람",
                    "눈치 엄청없는 사람",
                ],
                chartData: [
                    { name: '깊이', value: 1 },
                    { name: '예민함', value: 13 },
                    { name: '신선함', value: 1 },
                    { name: '지속력', value: 12 },
                ],
            },
        ];
        setCheckboxData(dummyData);

        // Initialize checkboxSelectionsAtom based on dummyData
        const initialSelections = {};
        dummyData.forEach(option => {
            initialSelections[option.id] = null;
        });
        setCheckboxSelections(initialSelections);
    }, [setCheckboxData, setCheckboxSelections]);

    return (
        <div className="flex-col justify-center items-center min-h-screen w-full text-center">
            <InputTextTop />
            <SelectForm />
            <Checkbox componentId={1} />
            <InputTextCenter />
            <Checkbox componentId={2} />
            <ProcedureButton text="다음페이지" route="/inputTwo" subText="테스트 중입니다."/>
        </div>
    );
};
