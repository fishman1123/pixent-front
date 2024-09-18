import React from 'react';
import { useRecoilState } from 'recoil';
import { userAtoms } from '../../recoil/userAtoms';
import { useNavigate } from 'react-router-dom';
import './IntroButton.css'; // Import your CSS

export const IntroButton = () => {
    const [userState, setUserState] = useRecoilState(userAtoms); // Get the Recoil state
    const navigate = useNavigate();

    // Handle button click
    const handleButtonClick = () => {
        // Update the current page to "input"
        setUserState((prevState) => ({
            ...prevState,
            currentPage: 'input',
        }));

        // Redirect to "/basic"
        navigate('/basic');
    };

    return (
        <div>
            <button className="defaultButton" role="button" onClick={handleButtonClick}>
                <span className="text">ANALYZE</span>
                <span>미구현입니다</span>
            </button>
        </div>
    );
};
