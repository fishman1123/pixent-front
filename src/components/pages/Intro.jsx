import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { userAtoms } from '../../recoil/userAtoms';
import { IntroTop } from '../intro/IntroTop.jsx';
import { IntroBottom } from '../intro/IntroBotttom.jsx';
import { IntroCenter } from '../intro/IntroCenter.jsx';

export const Intro = () => {
    const setUserState = useSetRecoilState(userAtoms);

    useEffect(() => {
        setUserState((prevState) => ({
            ...prevState,
            isAuthenticated: false,
            currentPage: '/intro',
        }));
    }, [setUserState]);

    return (
        <div className="flex-col justify-center items-center min-h-screen w-full text-center">
            <IntroTop />
            <IntroCenter />
            <IntroBottom />
        </div>
    );
};
