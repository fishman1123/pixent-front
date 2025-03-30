// AppLayout.jsx
import React, { useLayoutEffect } from "react";
import { Outlet, useLocation, useMatch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../transition.css";
import { Navbar } from "../Navbar.jsx";
import { Footer } from "../Footer.jsx";
import { ExtraFooter } from "../ExtraFooter.jsx";
import { useSelector } from "react-redux";
import { BottomTab } from "../BottomTab.jsx";

export const AppLayout = () => {
  const location = useLocation();

  // Example route checks (unchanged)
  const isResultPage = useMatch("/secured/result/*");
  const isFinalPage = useMatch("/secured/inputTwo/*");
  const isLoginPage = useMatch("/secured/login/*");
  const isReportPage = useMatch("/report/*");
  const isfromInputTwo = location.state?.from === "/secured/inputTwo";

  const shouldShowNavbar =
    !isResultPage &&
    !isFinalPage &&
    !isLoginPage &&
    !isReportPage &&
    !isfromInputTwo;

  const authState = useSelector((state) => state.auth);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Top-level container */}
      <div className="relative min-h-screen max-w-[480px] mx-auto scrollbar-hide">
        {/* 1) Navbar (no fade) */}
        {shouldShowNavbar && <Navbar />}

        {/* 2) Fade transitions ONLY around <Outlet /> */}
        <TransitionGroup component={null}>
          <CSSTransition
            key={location.key}
            timeout={300}
            classNames="fade"
            unmountOnExit
          >
            {/* Wrap only the routed page here */}
            <div>
              <Outlet />
            </div>
          </CSSTransition>
        </TransitionGroup>

        {/* 3) Footer is outside of the transition */}
        <div className={`p-2 ${authState.isAuthenticated ? "mb-9" : ""}`}>
          <Footer />
        </div>
      </div>

      {/* 4) BottomTab is also outside the transition */}
      {authState.isAuthenticated && <BottomTab />}
    </>
  );
};
