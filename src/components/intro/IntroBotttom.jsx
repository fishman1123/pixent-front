import { IntroSecondButton } from "./IntroSecondButton.jsx";

export const IntroBottom = () => {
    return (
        <div className="flex-1 flex-col flex h-full min-h-[300px] w-full bg-white text-black">
            <div className="text-left ml-[30px] text-[24px] font-bold">GALLERY</div>
            <div className="flex flex-wrap justify-center gap-4 p-4">
                {/* Responsive heights using Tailwind utilities */}
                <div className="w-[45%] max-w-[160px]">
                    <IntroSecondButton />
                </div>
                <div className="w-[45%] max-w-[160px]">
                    <IntroSecondButton />
                </div>
                <div className="w-[45%] max-w-[160px]">
                    <IntroSecondButton />
                </div>
                <div className="w-[45%] max-w-[160px]">
                    <IntroSecondButton />
                </div>
            </div>
        </div>
    );
};
