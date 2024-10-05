import React from 'react';
import { useSetRecoilState } from 'recoil';
import { userAtoms } from '../../recoil/userAtoms';
import { useNavigate } from 'react-router-dom';
import '../intro/IntroButton.css';

export const InputInfoButton = () => {
    const setUserState = useSetRecoilState(userAtoms);
    const navigate = useNavigate();

    const handleButtonClick = () => {
        setUserState((prevState) => ({
            ...prevState,
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
