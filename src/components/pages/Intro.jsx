import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthState } from '../../store/authSlice';
import { setUserState } from '../../store/userSlice';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import PrimeModal from '../PrimeModal';
import { IntroTop } from '../intro/IntroTop';
import { IntroCenter } from "../intro/IntroCenter";
import { IntroBottom } from "../intro/IntroBottom.jsx";
import { ProcedureButton } from "../ProcedureButton";
import { useTranslation } from "react-i18next";
import { useLocation } from 'react-router-dom';

export const Intro = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const location = useLocation();

    const authState = useSelector((state) => state.auth);

    // Check if user arrived from "/login/nickname"
    const nicknameUpdated = location.state?.from === "/login/nickname";

    // Local modal for "expired token"
    const [showExpiredModal, setShowExpiredModal] = useState(false);

    // 1) On mount, set isAuthenticated if localStorage has a token
    useEffect(() => {
        const token = localStorage.getItem('gToken');
        dispatch(setAuthState({ isAuthenticated: !!token }));
    }, [dispatch]);

    // 2) Use React Query for user info, if we’re authenticated
    //    This uses the cached data if it already exists
    const {
        data: userInfo,
        error,
        isError,
        refetch
    } = useGetUserInfo(authState.isAuthenticated);

    // 3) If the user came from "/login/nickname", force a fresh fetch
    //    so we ensure we get the updated nickname from the server
    useEffect(() => {
        if (nicknameUpdated) {
            refetch();
        }
    }, [nicknameUpdated, refetch]);

    // 4) If user info arrives, store it in Redux
    //    (only if we actually have data)
    useEffect(() => {
        if (userInfo) {
            // Update user slice
            dispatch(setUserState({ userName: userInfo.username }));

            // Update auth slice
            dispatch(setAuthState({
                isAuthenticated: true,
                nickname: userInfo.username,
                email: userInfo.email,
                provider: userInfo.provider,
            }));
        }
    }, [userInfo, dispatch]);

    // 5) If the query fails with 403 => show "expired" modal
    useEffect(() => {
        if (isError && error?.response?.status === 403) {
            setShowExpiredModal(true);
        }
    }, [isError, error]);

    const handleCloseExpiredModal = () => {
        setShowExpiredModal(false);
        // e.g. navigate('/login');
    };

    return (
        <div className="flex-col justify-center items-center min-h-screen w-full text-center">
            {/* Example UI */}
            <IntroTop>
                <div className="mt-[120px] mb-[40px]">
                    <div className="text-[40px] font-extralight">{t('DISCOVER')}</div>
                    <div className="text-[40px] font-extralight">{t('YOUR_SCENT')}</div>
                    <div className="text-[14px] mt-[40px] text-black">
                        {t('Uncover your unique fragrance profile')}
                    </div>
                </div>
            </IntroTop>

            <div className="mb-[48px]">
                <div className="mx-20">
                    <ProcedureButton
                        text={t('Start Analysis')}
                        route="/which"
                        confirm={false}
                    />
                </div>
            </div>

            {/* Show user info if authenticated */}
            {authState.isAuthenticated ? (
                <div className="flex flex-col">
                    <div>
                        login is done (nickname: {authState.nickname || 'N/A'})
                    </div>
                    <div>
                        view amount left: {authState.viewChance || 'N/A'}
                    </div>
                    <div>
                        user email: {authState.userEmail || 'N/A'}
                    </div>
                    <div>
                        user provider: {authState.userProvider || 'N/A'}
                    </div>
                </div>
            ) : (
                <div>login is not done</div>
            )}

            <IntroCenter />

            <IntroTop>
                <div className="mt-[20px] mb-[40px]">
                    <div className="text-[40px] font-extralight">{t('REFINE')}</div>
                    <div className="text-[40px] font-extralight">{t('YOUR_SCENT')}</div>
                    <div className="text-[14px] mt-[40px] text-black">
                        {t('COMPLETE WITH OUR EXPERTS')}
                    </div>
                </div>
            </IntroTop>

            <div className="mb-[48px]">
                <div className="mx-20">
                    <ProcedureButton
                        text={t('Get A/S')}
                        route="/which"

                        confirm={false}
                    />
                </div>
            </div>

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
