import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthState } from '../../store/authSlice';
import { setUserState } from '../../store/userSlice';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import PrimeModal from '../PrimeModal';  // your existing modal component
import { IntroTop } from '../intro/IntroTop';

export const Intro = () => {
    const dispatch = useDispatch();

    // Pulling these from Redux store instead of Recoil
    const authState = useSelector((state) => state.auth);

    // Local state to handle "expired token" modal
    const [showExpiredModal, setShowExpiredModal] = useState(false);

    /**
     * 1) On mount, decide if user is "authenticated" by checking localStorage.
     */
    useEffect(() => {
        const token = localStorage.getItem('gToken');
        dispatch(setAuthState({
            isAuthenticated: !!token,
        }));
    }, [dispatch]);

    /**
     * 2) Fetch user info (with React Query) if isAuthenticated is true.
     *    The query won't run if enabled=false.
     */
    const { data: userInfo, error, isError } = useGetUserInfo(authState.isAuthenticated);

    /**
     * 3) If user info is successfully retrieved, store it in Redux.
     *    - authSlice => nickname
     *    - userSlice => userName
     */
    useEffect(() => {
        if (userInfo) {
            // Update user slice
            dispatch(setUserState({ userName: userInfo.username }));

            // Update auth slice
            dispatch(
                setAuthState({
                    isAuthenticated: true,
                    nickname: userInfo.username,
                })
            );
        }
    }, [userInfo, dispatch]);

    /**
     * 4) If the query fails with 403, show the "token expired" modal.
     *    (Axios interceptor also removes the token & sets auth.isAuthenticated=false.)
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
                <div>
                    login is done (nickname: {authState.nickname || 'N/A'})
                </div>
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
