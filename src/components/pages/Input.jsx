import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { userAtoms } from '../../recoil/userAtoms';
import {CenterLine} from "../input/CenterLine.jsx";
import {TopTextBox} from "../input/TopTextBox.jsx";
import {SerialNumberBox} from "../input/SerialNumberBox.jsx";
import {TipBox} from "../input/TipBox.jsx";

export const Input = () => {
    const setUserState = useSetRecoilState(userAtoms);

    useEffect(() => {
        setUserState((prevState) => ({
            ...prevState,
            currentPage: 'input',
        }));
    }, [setUserState]);

    return (
        <div className="flex-col justify-center items-center min-h-screen w-full text-center" >
            <TopTextBox/>
            <CenterLine/>
            <SerialNumberBox/>
            <TipBox/>
        </div>
    );
};
