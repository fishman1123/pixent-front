import React from 'react';
import { useDispatch } from 'react-redux';
import { setUserState } from '../../store/userSlice'; // Update path as needed
import { useNavigate } from 'react-router-dom';
import '../intro/IntroButton.css';

export const InputInfoButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleButtonClick = () => {
        dispatch(setUserState({
            currentPage: 'input',
        }));
        navigate('/inputTwo');
    };

    return (
        <div className='mt-7'>
            <button className="defaultButton" role="button" onClick={handleButtonClick}>
                <span className="text">ANALYZE</span>
                <span>미구현입니다</span>
            </button>
        </div>
    );
};
