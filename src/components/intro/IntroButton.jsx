import React from 'react';
import { useDispatch } from 'react-redux';
import { setUserState } from '../../store/userSlice'; // Update path as needed
import { useNavigate } from 'react-router-dom';
import './IntroButton.css';

export const IntroButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleButtonClick = () => {
        // Update user state immediately
        dispatch(setUserState({
            currentPage: 'input',
        }));

        // Delay navigation by 900ms
        setTimeout(() => {
            navigate('/basic');
        }, 900);
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
