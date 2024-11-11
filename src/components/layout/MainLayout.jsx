// src/components/layout/MainLayout.jsx

import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "../Footer.jsx";
import { Navbar } from "../Navbar.jsx";

export const MainLayout = () => {
    const location = useLocation();

    // Scroll to the top when the location changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div className="relative min-h-screen bg-intro max-w-[480px] mx-auto">
            <div className="relative z-10 mt-[80px] mx-[20px]">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};
