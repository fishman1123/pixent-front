import { useState } from "react";
import { useRecoilValue } from 'recoil';
import { Menu } from './navbar/Menu';
import { TranslateButton } from './navbar/TranslateButton';
import { BackButton } from "./navbar/BackButton.jsx";
import { userAtoms } from '../recoil/userAtoms';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Get the entire userState object first to debug
    const userState = useRecoilValue(userAtoms);
    console.log("userState:", userState);

    // Now destructure currentPage after confirming userState has this property
    const { currentPage } = userState || {};

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="max-w-[480px] mx-auto">
                <div className="fixed top-0 left-0 w-full text-black z-30">
                    <div className="max-w-[480px] mx-auto bg-white flex items-center justify-between p-4">
                        {/* Conditionally render TranslateButton or BackButton based on currentPage */}
                        {currentPage === "intro" ? <TranslateButton /> : <BackButton />}

                        <div className="flex-1 text-[24px] font-headerTitle text-center">
                            AC'SCENT
                        </div>

                        {/* Hamburger Menu */}
                        <Menu isOpen={isOpen} toggleMenu={toggleMenu} />
                    </div>
                </div>
            </div>
        </>
    );
};
