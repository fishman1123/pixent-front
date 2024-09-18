import {IntroButton} from "./IntroButton.jsx";


export const IntroTop = () => {
    return (
        <div className="flex-1 content-center h-full min-h-[300px] w-full bg-white text-black mt-[80px] font-introTitle">
            <div className="text-xl">DISCOVER</div>
            <div className="text-xl">YOUR SCENT</div>
            <div className="text-[14px] mt-[20px] mb-[48px] text-black">Uncover your unique fragrance profile</div>
            <IntroButton />

        </div>
    )
}