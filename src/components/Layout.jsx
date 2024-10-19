// Layout.jsx
import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "./Footer.jsx";
import { Navbar } from "./Navbar.jsx";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./transition.css";

export const Layout = () => {
    const location = useLocation();

    // Scroll to the top when the location changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div className="relative min-h-screen bg-intro max-w-[480px] mx-auto">
            <Navbar />
            <div className="relative z-10 mt-[80px] mx-[20px]">
                <TransitionGroup component={null}>
                    <CSSTransition
                        key={location.key}
                        timeout={500}
                        classNames="fade" // Ensure this matches your CSS class prefix
                        unmountOnExit
                    >
                        <Outlet />
                    </CSSTransition>
                </TransitionGroup>
            </div>
            <Footer />
        </div>
    );
};
