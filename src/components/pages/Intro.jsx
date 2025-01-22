import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userAtoms } from '../../recoil/userAtoms';
import { authAtom } from '../../recoil/authAtoms';
import { IntroTop } from '../intro/IntroTop.jsx';

export const Intro = () => {
    const [authState, setAuthState] = useRecoilState(authAtom);
    const setUserState = useSetRecoilState(userAtoms);

    /**
     * 1) On mount, check localStorage for 'gToken'.
     *    If present => authAtom.isAuthenticated = true
     *    else => false
     */
    useEffect(() => {
        const token = localStorage.getItem('gToken');
        if (token) {
            setAuthState((prev) => ({ ...prev, isAuthenticated: true }));
        } else {
            setAuthState((prev) => ({ ...prev, isAuthenticated: false }));
        }
        // Runs only once on mount
    }, [setAuthState]);

    /**
     * 2) Log the auth status, update userAtoms.currentPage
     */
    useEffect(() => {
        console.log("Arrived at '/', rendering Intro page...");
        console.log("authAtom.isAuthenticated:", authState.isAuthenticated);

        setUserState((prevState) => ({
            ...prevState,
            currentPage: '/intro',
        }));
    }, [authState.isAuthenticated, setUserState]);

    return (
        <div className="flex-col justify-center items-center min-h-screen w-full text-center">
            <IntroTop />
            {authState.isAuthenticated && <div className="text-center">login is done</div>}
            {!authState.isAuthenticated && <div className="text-center">login is not done</div>}
            {/* <IntroCenter /> */}
            {/* <IntroBottom /> */}
        </div>
    );
};
