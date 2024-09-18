import { useState } from "react";
import { Outlet } from "react-router-dom";
import {Footer} from "./Footer.jsx";
import {Navbar} from "./Navbar.jsx";

export const Layout = () => {



    return (
        <>
            <div className="relative min-h-screen bg-intro max-w-[480px] mx-auto">
                <Navbar />
                {/* Main Content */}
                <div className="relative z-10 mt-[80px] mx-[20px]">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    );
};
