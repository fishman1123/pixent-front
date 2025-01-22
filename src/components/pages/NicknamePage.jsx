import {SerialNumberBox} from "../input/SerialNumberBox.jsx";
import {ProcedureButton} from "../ProcedureButton.jsx";
import React from "react";

export const NicknamePage = () => {
    return (
        <div className="min-h-screen flex justify-center w-full p-4">
            <div
                className="flex-1 content-center h-full min-h-[300px] w-full bg-white text-black mt-[140px] font-introTitle">
                <div className='w-full px-5'>
                    <div className="text-[38px]">LET PEOPLE KNOW</div>
                    <div className="text-[24px]">WHO YOU ARE</div>
                    <div className="text-[14px] mt-[20px] text-black">
                        *등록 이후에 나중에 수정이 가능합니다!
                    </div>
                </div>
                <div className='w-full min-w-[290px]'>
                    <SerialNumberBox path="/api/user/username"/>
                </div>
            </div>
        </div>
    )
}