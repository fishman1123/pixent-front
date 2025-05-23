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

  // Route checks
  const isResultPage = useMatch("/secured/result/*");
  const isFinalPage = useMatch("/secured/inputTwo/*");
  const isLoginPage = useMatch("/secured/login/*");
  const isReportPage = useMatch("/report/*");
  const isPrintPage = useMatch("/print");
  const isAdminPage = useMatch("/secured/🌚"); // Admin page check
  const isIntroLandingPage = useMatch("/intro"); // New intro landing page check
  const isfromInputTwo = location.state?.from === "/secured/inputTwo";

  const shouldShowNavbar =
    !isResultPage &&
    !isFinalPage &&
    !isLoginPage &&
    !isReportPage &&
    !isPrintPage &&
    !isfromInputTwo &&
    !isAdminPage && 
    !isIntroLandingPage; // Don't show navbar on intro landing page

  // Determine if we should use full width (for print page, admin page, and intro landing page)
  const useFullWidth = isPrintPage || isAdminPage || isIntroLandingPage;
  
  // Determine if we should show footer and bottom tab (not for print, admin or intro landing)
  const hideFooterAndBottomTab = isPrintPage || isAdminPage || isIntroLandingPage;

  const authState = useSelector((state) => state.auth);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Apply admin-specific styles if needed
  useLayoutEffect(() => {
    if (isAdminPage) {
      document.body.classList.add('admin-page');
    } else {
      document.body.classList.remove('admin-page');
    }
    
    if (isIntroLandingPage) {
      document.body.classList.add('intro-landing-page');
    } else {
      document.body.classList.remove('intro-landing-page');
    }
    
    return () => {
      document.body.classList.remove('admin-page');
      document.body.classList.remove('intro-landing-page');
    };
  }, [isAdminPage, isIntroLandingPage]);

  return (
    <>
      {/* Top-level container */}
      <div 
        className={`relative min-h-screen mx-auto scrollbar-hide ${
          useFullWidth ? 'w-full max-w-none' : 'max-w-[480px]'
        }`}
      >
        {/* 1) Navbar (no fade) - now never shown on admin page */}
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
            <div className={isAdminPage || isIntroLandingPage ? 'w-full' : ''}>
              <Outlet />
            </div>
          </CSSTransition>
        </TransitionGroup>

        {/* 3) Footer is outside of the transition */}
        <div className={`p-2 ${hideFooterAndBottomTab ? 'hidden' : ''}`}>
          <ExtraFooter />
          <div className={`p-2 ${authState.isAuthenticated ? "mb-9" : ""}`}>
            <Footer />
          </div>
        </div>
      </div>

      {/* 4) BottomTab is also outside the transition */}
      {authState.isAuthenticated && !hideFooterAndBottomTab && <BottomTab />}
    </>
  );
};
