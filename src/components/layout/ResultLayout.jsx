// src/components/layout/ResultLayout.jsx

import React, {useEffect} from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import { Footer } from '../Footer.jsx';

export const ResultLayout = () => {

    const location = useLocation();

    // Scroll to the top when the location changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    return (
        <div className="relative min-h-screen bg-intro max-w-[480px] mx-auto">
            <div className="relative z-10 mt-[20px]">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};
