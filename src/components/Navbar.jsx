import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch and useSelector
import { Menu } from './navbar/Menu';
import { TranslateButton } from './navbar/TranslateButton';
import { BackButton } from './navbar/BackButton.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import { setCurrentPage } from '../store/userSlice'; // Import the Redux action for updating currentPage

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.user.currentPage); // Get currentPage from Redux
    const navigate = useNavigate();
    const location = useLocation(); // Hook to track location changes

    // Update currentPage whenever the location changes
    useEffect(() => {
        dispatch(setCurrentPage(location.pathname)); // Dispatch the new path to Redux
    }, [location.pathname, dispatch]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="max-w-[480px] mx-auto">
            <div className="fixed top-0 left-0 w-full text-black z-30">
                <div className="max-w-[480px] mx-auto bg-white flex items-center justify-between p-5">
                    {currentPage === '/' ? <TranslateButton /> : <BackButton />}
                    <div className="flex-1 text-[24px] font-headerTitle text-center">
                        <button onClick={() => navigate("/")}>DEV MODE</button>
                    </div>
                    <Menu isOpen={isOpen} toggleMenu={toggleMenu} />
                </div>
            </div>
        </div>
    );
};
