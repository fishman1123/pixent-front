import {CenterLine} from "../input/CenterLine.jsx";
import {ProcedureButton} from "../ProcedureButton.jsx";

export const WrongPath = () => {
    return (
        <div className="flex-col justify-center items-center min-h-screen w-full text-center mt-[160px]">
            <div className="w-full font-bold text-2xl">페이지를 찾을 수 없습니다</div>
            <div className="flex w-full h-[300px] justify-center items-center">

                <div className="flex-col">
                    <div className="flex justify-center">(대충 이쁜 이미지 있을예정)</div>
                    <div className="flex justify-center">(매우 기대중)</div>
                    <div className="flex justify-center">(ㄷㄱㄷㄱ)</div>
                </div>

            </div>
            <div className="text-[#666666]">요청하신 페이지가 존재하지 않거나 잘못된 경로입니다.</div>
            <div className="flex justify-center items-center w-[200px] mt-5 mb-5 mx-auto">
                <CenterLine />
            </div>
            <div>
                <ProcedureButton text="홈으로" route="/basic" subText="이동하기" confirm={false} />
            </div>
        </div>
    );
};
