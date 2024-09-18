import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { userAtoms } from '../../recoil/userAtoms';

export const Input = () => {
    const setUserState = useSetRecoilState(userAtoms);

    useEffect(() => {
        setUserState((prevState) => ({
            ...prevState,
            currentPage: 'input',
        }));
    }, [setUserState]);

    return (
        <div className="flex-col justify-center items-center min-h-screen w-full text-center">
            Input page
        </div>
    );
};
