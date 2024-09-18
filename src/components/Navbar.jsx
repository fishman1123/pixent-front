import { useState } from "react";
import translatorIcon from '../assets/translate.svg';
import { Menu } from './navbar/Menu';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="max-w-[480px] mx-auto">
                <div className="fixed top-0 left-0 w-full text-black z-30">
                    <div className="max-w-[480px] mx-auto bg-white flex items-center justify-between p-4">
                        <div className="ml-[4px] mt-[4px]">
                            <button>
                                <img
                                    src={translatorIcon}
                                    alt="Translator Icon"
                                    className="w-6 h-6"
                                />
                            </button>
                        </div>
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
