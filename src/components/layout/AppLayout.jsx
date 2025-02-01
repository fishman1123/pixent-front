import React, { useEffect } from 'react';
import { Outlet, useLocation, useMatch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../transition.css';
import { Navbar } from "../Navbar.jsx";
import { Footer } from "../Footer.jsx";
import { ExtraFooter } from "../ExtraFooter.jsx";
import { useSelector } from 'react-redux'; // <-- Import useSelector from react-redux
import { BottomTab } from "../BottomTab.jsx";

export const AppLayout = () => {
    const location = useLocation();

    const isResultPage = useMatch('/result/*');
    const isFinalPage = useMatch('/inputTwo/*');
    const isLoginPage = useMatch('/login/*');
    const isReportPage = useMatch('/report/*');
    const shouldShowNavbar = !isResultPage && !isFinalPage && !isLoginPage && !isReportPage;

    const authState = useSelector((state) => state.auth);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div className="relative min-h-screen max-w-[480px] mx-auto scrollbar-hide ">
            {shouldShowNavbar && <Navbar />}

            <TransitionGroup component={null}>
                <CSSTransition
                    key={location.key}
                    timeout={500}
                    classNames="fade"
                    unmountOnExit
                >
                    <div>
                        <Outlet />
                    </div>
                </CSSTransition>
            </TransitionGroup>

            {authState.isAuthenticated && <BottomTab />}

            <div className="p-2">
                <ExtraFooter />
                <div className={`p-2 ${authState.isAuthenticated ? 'mb-9' : ''}`}>
                    <Footer />
                </div>

            </div>
        </div>
    );
};
