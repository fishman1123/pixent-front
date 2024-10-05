import React from 'react';
import { useSetRecoilState } from 'recoil';
import { userAtoms } from '../recoil/userAtoms';
import { useNavigate } from 'react-router-dom';
import './ProcedureButton.css';

export const ProcedureButton = ({ text, route, subText }) => {
    const setUserState = useSetRecoilState(userAtoms);
    const navigate = useNavigate();

    const handleButtonClick = () => {

        // Delay navigation by 900ms
        setTimeout(() => {
            setUserState((prevState) => ({
                ...prevState,
                currentPage: route, // Adjust to your state structure
            }));
            navigate(route);
        }, 900);
    };

    return (
        <div>
            <button className="defaultButton" role="button" onClick={handleButtonClick}>
                <span className="text">{text}</span>
                <span>{subText}</span>
            </button>
        </div>
    );
};
