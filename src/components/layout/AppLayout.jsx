// src/components/layout/AppLayout.jsx

import React, { useEffect } from 'react';
import { Outlet, useLocation, useMatch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../transition.css';
import { Navbar } from "../Navbar.jsx";

export const AppLayout = () => {
    const location = useLocation();

    const isResultPage = useMatch('/result/*');
    const isFinalPage = useMatch('/inputTwo/*');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div className="relative min-h-screen max-w-[480px] mx-auto">
            {!isResultPage && !isFinalPage && <Navbar />}

            <TransitionGroup component={null}>
                <CSSTransition
                    key={location.key}
                    timeout={500}
                    classNames="fade"
                    unmountOnExit
                >
                    <Outlet />
                </CSSTransition>
            </TransitionGroup>
        </div>
    );
};
