import {ProcedureButton} from "../ProcedureButton.jsx";
import React from "react";


export const Preference = () => {
    return (
        <div className="relative flex-col justify-center items-center min-h-screen w-full text-center pt-12">
            <div className="text-2xl">보고서 유형을 골라주세요</div>
            <div className="pt-12">
                <ProcedureButton text="특정 향 계열에 대해서 선택 " route="/input" subText="이동하기" confirm={false}/>
            </div>
            <div className="pt-2">
                <ProcedureButton text="어떤 향 계열이든 상관없어요" route="/inputTwo" subText="이동하기" confirm={false}/>
            </div>

        </div>
    )
}