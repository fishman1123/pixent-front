// src/components/layout/MainLayout.jsx

import React, { useEffect } from "react";
import { Outlet, useLocation, useMatch } from "react-router-dom";

export const MainLayout = () => {
  const location = useLocation();
  // Check for admin page route
  const isAdminPage = useMatch("/secured/🌚");
  
  // Scroll to the top when the location changes
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [location]);

  return (
    <div className={`relative min-h-screen bg-intro ${isAdminPage ? 'w-full max-w-none' : 'max-w-[480px]'} mx-auto`}>
      <div className="relative z-10 mt-[80px] ">
        <Outlet />
      </div>
    </div>
  );
};
