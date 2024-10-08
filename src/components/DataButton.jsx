import {useRecoilState, useSetRecoilState} from "recoil";
import {userAtoms} from "../recoil/userAtoms.jsx";
import {useNavigate} from "react-router-dom";
import {confirmationAtom} from "../recoil/confirmationAtom.jsx";
import {modalTriggerAtom} from "../recoil/modalTriggerAtom.jsx";
import {Modal} from "./Modal.jsx";
import React from "react";

export const DataButton = ({ text, apiRoute, subText, confirm }) => {
    const setUserState = useSetRecoilState(userAtoms);
    const navigate = useNavigate();
    const [confirmationState, setConfirmationState] = useRecoilState(confirmationAtom);
    const [modalState, setModalState] = useRecoilState(modalTriggerAtom);

    const handleButtonClick = () => {
        if (confirm) {
            setConfirmationState((prevState) => ({
                ...prevState,
                isOpen: true, // Open the confirmation modal
            }));
        } else {
            setTimeout(() => {
                setUserState((prevState) => ({
                    ...prevState,
                    currentPage: apiRoute, // Update the state
                }));
                navigate(apiRoute); // Navigate after the delay
            }, 900);
        }
    };

    return (
        <div className="w-full">
            <button className="defaultButton" role="button" onClick={handleButtonClick}>
                <span className="text">{text}</span>
                <span>{subText}</span>
            </button>
        </div>
    );
};
