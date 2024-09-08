import {IntroTop} from "../intro/IntroTop.jsx";
import {IntroBottom} from "../intro/IntroBotttom.jsx";

export const Intro = () => {


    return (
        <>
            <div className="flex-col justify-center items-center min-h-screen w-full text-center">
                <IntroTop/>
                <IntroBottom/>
            </div>
        </>
    );
}
