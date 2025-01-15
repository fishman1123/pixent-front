import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const LoginRedirectPage = () => {
    const location = useLocation();

    useEffect(() => {
        // Extract "code" from the query string
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get('code');

        // Determine which provider (Google, Kakao, Naver) based on the path
        let provider = 'unknown';
        if (location.pathname.includes('google')) {
            provider = 'google';
        } else if (location.pathname.includes('kakao')) {
            provider = 'kakao';
        } else if (location.pathname.includes('naver')) {
            provider = 'naver';
        }

        console.log(`Provider: ${provider}, code: ${code}`);

        // TODO:
        //  1. Send this "code" to your backend endpoint (once it’s ready)
        //     fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/${provider}?code=${code}`)
        //  2. Handle success/failure, store tokens, etc.
        //  3. Redirect user to next page (if needed)

    }, [location]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-xl mb-4">
                Handling {location.pathname.includes('google') && 'Google'}
                {location.pathname.includes('kakao') && 'Kakao'}
                {location.pathname.includes('naver') && 'Naver'}
                &nbsp;Redirect...
            </h2>
            <p className="text-sm text-gray-600">Please wait while we process your login.</p>
        </div>
    );
};
