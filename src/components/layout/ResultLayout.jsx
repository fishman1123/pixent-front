// src/components/layout/ResultLayout.jsx

import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

export const ResultLayout = () => {
  return (
    <div className="relative min-h-screen bg-intro max-w-[480px] mx-auto">
      <div className="relative z-10 mt-[120px]">
        <Outlet />
      </div>
    </div>
  );
};
