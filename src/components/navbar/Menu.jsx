import React from "react";

const genericHamburgerLine = `h-[2px] w-6 my-1 rounded-full bg-black transition ease transform duration-300`;

export const Menu = ({ isOpen, toggleMenu }) => {
    return (
        <>
            {/* Hamburger Icon */}
            <button
                className="relative z-30 flex flex-col h-12 w-12 rounded justify-center items-center group"
                onClick={toggleMenu}
            >
                <div
                    className={`${genericHamburgerLine} ${
                        isOpen ? "rotate-45 translate-y-0" : "translate-y-[-8px]"
                    } absolute`}
                />
                <div
                    className={`${genericHamburgerLine} ${
                        isOpen ? "opacity-0" : "opacity-100"
                    } absolute`}
                />
                <div
                    className={`${genericHamburgerLine} ${
                        isOpen ? "-rotate-45 translate-y-0" : "translate-y-[8px]"
                    } absolute`}
                />
            </button>

            {/* Menu Content */}
            <div
                className={`fixed top-0 w-full bg-white transform transition-transform duration-300 z-20 ${
                    isOpen ? "translate-y-0" : "-translate-y-full"
                }`}
                style={{ height: "60vh" }}
            >
                <div className="pt-[100px] pl-2">
                    <h2 className="text-lg font-bold">Menu</h2>
                    <ul className="mt-4">
                        <li className="py-2">
                            <a href="#">Home</a>
                        </li>
                        <li className="py-2">
                            <a href="#">About</a>
                        </li>
                        <li className="py-2">
                            <a href="#">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};
