import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { authAtom } from '../../recoil/authAtoms';
import { userAtoms } from '../../recoil/userAtoms';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import PrimeModal from '../PrimeModal';  // your existing modal component
import { IntroTop } from '../intro/IntroTop';

export const Intro = () => {
    const [authState, setAuthState] = useRecoilState(authAtom);
    const [userState, setUserState] = useRecoilState(userAtoms);

    // Local state to handle "expired token" modal
    const [showExpiredModal, setShowExpiredModal] = useState(false);

    /**
     * 1) On mount, decide if user is "authenticated" by checking localStorage.
     */
    useEffect(() => {
        const token = localStorage.getItem('gToken');
        setAuthState((prev) => ({
            ...prev,
            isAuthenticated: !!token,
        }));
    }, [setAuthState]);

    /**
     * 2) Fetch user info (with React Query) if isAuthenticated is true.
     *    The query won't even run if enabled = false.
     */
    const { data: userInfo, error, isError } = useGetUserInfo(authState.isAuthenticated);

    /**
     * 3) If user info is successfully retrieved, store it in Recoil.
     *    - authAtom.nickname
     *    - userAtoms.userName (if you still want it there)
     */
    useEffect(() => {
        if (userInfo) {
            setUserState((prev) => ({
                ...prev,
                userName: userInfo.username,
            }));
            setAuthState((prev) => ({
                ...prev,
                nickname: userInfo.username,
            }));
        }
    }, [userInfo, setUserState, setAuthState]);

    /**
     * 4) If the query fails with 403, show the "token expired" modal.
     *    (Your global axios interceptor also removes localStorage token
     *     and sets authAtom.isAuthenticated = false.)
     */
    useEffect(() => {
        if (isError && error?.response?.status === 403) {
            setShowExpiredModal(true);
        }
    }, [isError, error]);

    /**
     * 5) Handle closing the "expired" modal (and optionally navigate to /login).
     */
    const handleCloseExpiredModal = () => {
        setShowExpiredModal(false);
        // e.g. navigate('/login');
    };

    return (
        <div className="flex-col justify-center items-center min-h-screen w-full text-center">
            <IntroTop />

            {authState.isAuthenticated ? (
                <div>login is done (nickname: {authState.nickname || 'N/A'})</div>
            ) : (
                <div>login is not done</div>
            )}

            <PrimeModal
                isOpen={showExpiredModal}
                onClose={handleCloseExpiredModal}
                title="Session Expired"
            >
                <p>the login time is expired, login again</p>
            </PrimeModal>
        </div>
    );
};
