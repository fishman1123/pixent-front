// ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Handle scroll reset on route change
    window.scrollTo(0, 0);

    // Try accessing document.documentElement as well
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null; // This component doesn't render anything
};
