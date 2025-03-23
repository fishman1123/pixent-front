import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, useMatch } from "react-router-dom";
import { Menu } from "./navbar/Menu";
import { TranslateButton } from "./navbar/TranslateButton";
import { BackButton } from "./navbar/BackButton";
import { setCurrentPage } from "../store/userSlice";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prevPath, setPrevPath] = useState(""); // Track the previous path locally

  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.user.currentPage);
  const navigate = useNavigate();
  const location = useLocation();

  const isCollectionPage = useMatch("/secured/Collection/");

  useEffect(() => {
    setPrevPath(currentPage);
    dispatch(setCurrentPage(location.pathname));
  }, [location.pathname, dispatch, currentPage]);

  const isComingFromFeedback = prevPath.startsWith("/feedback/");
  const shouldShowBackButton = !isCollectionPage && !isComingFromFeedback;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleRedirect = () => {
    window.location.href = "/";
  };

  return (
    <div className="max-w-[480px] mx-auto">
      <div className="fixed top-0 left-0 w-full text-black z-30">
        <div className="max-w-[480px] mx-auto bg-white flex items-center justify-between p-5">
          {/* Hide back button if the previous path was /feedback/* or if on /secured/Collection/ */}
          {currentPage === "/" ? (
            <TranslateButton />
          ) : shouldShowBackButton ? (
            <BackButton />
          ) : null}

          <div className="flex-1 text-[24px] font-headerTitle text-center">
            <button onClick={handleRedirect}>AC'SCENT ID</button>
          </div>
          <Menu isOpen={isOpen} toggleMenu={toggleMenu} />
        </div>
      </div>
    </div>
  );
};
