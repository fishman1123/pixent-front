import { useEffect } from "react";
import { useRecoilState } from 'recoil'; // Assuming Recoil is used
import { userAtoms } from '../../recoil/userAtoms'; // Import the userAtom
import { IntroTop } from "../intro/IntroTop.jsx";
import { IntroBottom } from "../intro/IntroBotttom.jsx";
import { IntroCenter } from "../intro/IntroCenter.jsx";

export const Intro = () => {
    const [userPage, setCurrentPage] = useRecoilState(userAtoms);
    console.log(userPage);

    useEffect(() => {
        setCurrentPage((prevState) => ({
            ...prevState,
            currentPage: 'intro'
        }));
    }, [setCurrentPage]);

    return (
        <>
            <div className="flex-col justify-center items-center min-h-screen w-full text-center">
                <IntroTop />
                <IntroCenter />
                <IntroBottom />
            </div>
        </>
    );
};
