import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthState } from '../../store/authSlice';
import { setUserState } from '../../store/userSlice';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import PrimeModal from '../PrimeModal';  // your existing modal component
import { IntroTop } from '../intro/IntroTop';
import {IntroCenter} from "../intro/IntroCenter.jsx";
import {IntroBottom} from "../intro/IntroBotttom.jsx";
import {ProcedureButton} from "../ProcedureButton.jsx";
import {useTranslation} from "react-i18next";

export const Intro = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();


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
                <div className="mx-10">
                    <ProcedureButton
                        text={t('Start Analysis')} // Pass translated text
                        route="/which"
                        // subText={t('Test in progress')} // Pass translated subtext
                        confirm={false}
                    />
                </div>

            </div>

            {authState.isAuthenticated ? (
                <div className="flex flex-col ">
                    <div>
                        login is done (nickname: {authState.nickname || 'N/A'})
                    </div>
                    <div>
                        view amount left: {authState.viewChance || 'N/A'} left to use analysis
                    </div>
                </div>

            ) : (
                <div>login is not done</div>
            )}

            <IntroCenter/>
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
                <div className="mx-10">
                    <ProcedureButton
                        text={t('Get A/S')} // Pass translated text
                        route="/which"
                        subText={t('Test in progress')} // Pass translated subtext
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
