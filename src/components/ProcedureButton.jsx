import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userAtoms } from '../recoil/userAtoms';
import { confirmationAtom } from '../recoil/confirmationAtom';
import { useNavigate } from 'react-router-dom';
import { Modal } from './Modal.jsx';
import './ProcedureButton.css';
import {modalTriggerAtom} from "../recoil/modalTriggerAtom.jsx";

export const ProcedureButton = ({ text, route, subText, confirm }) => {
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
                    currentPage: route, // Update the state
                }));
                navigate(route); // Navigate after the delay
            }, 900);
        }
    };

    const handleConfirm = () => {
        // Close the modal first, then navigate
        setConfirmationState((prevState) => ({
            ...prevState,
            isOpen: false, // Close the modal before navigating
            isConfirm: true,
        }));
        setModalState({ isOpen: false });

        // Add a slight delay before navigating to ensure the modal closes properly
        setTimeout(() => {
            setUserState((prevState) => ({
                ...prevState,
                currentPage: route,
            }));
            navigate(route);
        }, 400);
    };

    const handleCancel = () => {
        // Close the modal without confirming
        setConfirmationState((prevState) => ({
            ...prevState,
            isOpen: false,
            isConfirm: false,
        }));
        setModalState({ isOpen: false });

    };

    return (
        <div>
            <button className="defaultButton" role="button" onClick={handleButtonClick}>
                <span className="text">{text}</span>
                <span>{subText}</span>
            </button>
            {confirmationState.isOpen && (
                <Modal title="Confirm Your Choices" onClose={handleCancel}>
                    <p>Do you want to proceed with the current selections?</p>
                    <div className="flex flex-col justify-between mt-4">
                        <div>
                            <button onClick={handleConfirm} className="defaultButton mb-4">
                                Confirm
                            </button>
                        </div>
                        <div>
                            <button onClick={handleCancel} className="defaultButton">
                                Cancel
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};
