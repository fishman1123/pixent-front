// src/components/pages/LoginRedirectPage.jsx

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePostToken } from '../../hooks/usePostToken';
import { useGetNickNameValidation } from '../../hooks/useGetNickNameValidation';

export const LoginRedirectPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // We'll store the token in state once we get it
    const [accessToken, setAccessToken] = useState(null);

    const { mutateAsync: postToken } = usePostToken();

    const {
        data: nicknameData,
        isSuccess: nicknameSuccess,
        isError: nicknameError,
    } = useGetNickNameValidation(accessToken, Boolean(accessToken));

    useEffect(() => {
        // (Optional) Grab query params or detect provider
        // this doesnt work as fuck
        // const queryParams = new URLSearchParams(location.search);
        // const code = queryParams.get('code');
        //
        // let provider = 'unknown';
        // if (location.pathname.includes('google')) {
        //     provider = 'google';
        // } else if (location.pathname.includes('kakao')) {
        //     provider = 'kakao';
        // } else if (location.pathname.includes('naver')) {
        //     provider = 'naver';
        // }
        //
        // console.log(`Provider: ${provider}, code: ${code}`);
        // console.log('Redirected from backend, now requesting tokens...');

        const refreshTokenFlow = async () => {
            try {
                const token = await postToken();
                console.log('Received token from refresh endpoint:', token);
                if (token) {
                    // Store token + set local state
                    localStorage.setItem('gToken', token);
                    setAccessToken(token);
                } else {
                    // If no token, redirect to login
                    console.warn('No access token found!');
                    navigate('/login');
                }
            } catch (err) {
                console.error('Error fetching tokens:', err);
                navigate('/login');
            }
        };
        refreshTokenFlow();
    }, [location, navigate, postToken]);

    useEffect(() => {
        if (nicknameSuccess && nicknameData) {
            console.log('Received nickname: ', nicknameData);
            if (nicknameData) {
                console.log('Nickname is valid -> redirecting to "/"');
                navigate('/');
            } else {
                console.log('Nickname not valid -> redirecting to "/login/nickname"');
                navigate('/login/nickname');
            }
        } else if (nicknameError) {
            console.error('Error checking nickname. Possibly redirect or show error.');
        }
    }, [nicknameSuccess, nicknameData, nicknameError, navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-xl mb-4">
                Handling {location.pathname.includes('google') && 'Google'}
                {location.pathname.includes('kakao') && 'Kakao'}
                {location.pathname.includes('naver') && 'Naver'} Redirect...
            </h2>
            <p className="text-sm text-gray-600">
                Please wait while we process your login.
            </p>
        </div>
    );
};
