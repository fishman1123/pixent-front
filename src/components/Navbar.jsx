import {useState} from "react";

const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-white transition ease transform duration-300`;

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="max-w-[480px] mx-auto">
                <div className="fixed top-0 left-0 w-full text-white z-30">
                    <div className="max-w-[480px] mx-auto bg-black flex items-center justify-between p-4">
                        <div className="flex-1 text-[24px] font-title text-center">
                            AC'SCENT
                        </div>
                        <button className="flex flex-col h-12 w-12 rounded justify-center items-center group"
                                onClick={toggleMenu}>
                            <div
                                className={`${genericHamburgerLine} ${isOpen ? "rotate-45 translate-y-3" : "translate-y-0"}`}/>
                            <div className={`${genericHamburgerLine} ${isOpen ? "opacity-0" : "opacity-100"}`}/>
                            <div
                                className={`${genericHamburgerLine} ${isOpen ? "-rotate-45 -translate-y-3" : "translate-y-0"}`}/>
                        </button>
                    </div>
                </div>
            </div>

            {/* actual hamburger contents*/}
            <div
                className={`fixed top-0  w-full bg-white transform transition-transform duration-300 z-20 ${isOpen ? "translate-y-0" : "-translate-y-full"}`}
                style={{height: "60vh"}}
            >
                <div className="pt-[100px] pl-2">
                    <h2 className="text-lg font-bold">Menu</h2>
                    <ul className="mt-4">
                        <li className="py-2"><a href="#">Home</a></li>
                        <li className="py-2"><a href="#">About</a></li>
                        <li className="py-2"><a href="#">Contact</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}