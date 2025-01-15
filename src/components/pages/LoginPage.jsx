import React from 'react';

export const LoginPage = () => {
    const handleLogin = (provider) => {
        switch(provider) {
            case 'Google': {
                // 1) Use your environment variables or hard-coded endpoints
                //    (this is just an example)
                const googleBaseUrl = import.meta.env.VITE_GOOGLE_REQUEST_URL; // ex: "https://accounts.google.com/o/oauth2/v2/auth"
                const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;   // ex: "xxxx.apps.googleusercontent.com"
                const redirectUri = window.location.origin + '/oauth2/google/redirect';

                // 2) Build the Google OAuth URL
                const googleAuthUrl = `${googleBaseUrl}?client_id=${googleClientId}&redirect_uri=${redirectUri}&scope=profile%20email&response_type=code`;

                // 3) Redirect user
                window.location.href = googleAuthUrl;
                break;
            }

            case 'Kakao': {
                // 1) Typically, Kakao OAuth endpoint:
                //    https://kauth.kakao.com/oauth/authorize?client_id=...&redirect_uri=...&response_type=code
                const kakaoBaseUrl = 'https://kauth.kakao.com/oauth/authorize';
                const kakaoClientId = 'YOUR_KAKAO_REST_API_KEY'; // put yours or use env
                const redirectUri = window.location.origin + '/oauth2/kakao/redirect';

                // 2) Construct the Kakao login URL
                const kakaoAuthUrl = `${kakaoBaseUrl}?client_id=${kakaoClientId}&redirect_uri=${redirectUri}&response_type=code`;

                // 3) Redirect user
                window.location.href = kakaoAuthUrl;
                break;
            }

            case 'Naver': {
                // 1) Typically, Naver OAuth endpoint:
                //    https://nid.naver.com/oauth2.0/authorize?client_id=...&redirect_uri=...&response_type=code&state=...
                const naverBaseUrl = 'https://nid.naver.com/oauth2.0/authorize';
                const naverClientId = 'YOUR_NAVER_CLIENT_ID'; // put yours or use env
                const redirectUri = window.location.origin + '/oauth2/naver/redirect';

                // State is optional but recommended for CSRF protection
                const state = 'someRandomState';

                // 2) Construct the Naver login URL
                const naverAuthUrl = `${naverBaseUrl}?client_id=${naverClientId}&redirect_uri=${redirectUri}&response_type=code&state=${state}`;

                // 3) Redirect user
                window.location.href = naverAuthUrl;
                break;
            }

            default:
                console.log(`${provider} is not supported yet.`);
                break;
        }
    };

    return (
        <div className="min-h-screen bg-white flex justify-center p-4">
            <div className="w-full max-w-md min-w-[320px]">
                <div className="space-y-6 p-8">
                    <div className="space-y-2 mb-8">
                        <h1 className="text-2xl font-light tracking-wider text-center">AC'SCENT ID</h1>
                        <p className="text-xs text-center tracking-widest text-gray-500">LOGIN PAGE</p>
                    </div>

                    <div className="space-y-6">
                        {/* 구글 로그인 버튼 */}
                        <button
                            onClick={() => handleLogin('Google')}
                            className="group w-full border-2 border-black p-4 hover:bg-black transition-colors duration-300"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-sm tracking-widest group-hover:text-white">GOOGLE</span>
                                <svg className="w-4 h-4 group-hover:text-white" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                            </div>
                        </button>

                        {/* 카카오 로그인 버튼 */}
                        <button
                            onClick={() => handleLogin('Kakao')}
                            className="group w-full border-2 border-black p-4 hover:bg-black transition-colors duration-300"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-sm tracking-widest group-hover:text-white">KAKAO</span>
                                <svg className="w-4 h-4 group-hover:text-white" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M12 3C6.5 3 2 6.5 2 11c0 2.9 1.9 5.4 4.7 6.9-.2.6-.7 2.1-.8 2.5-.1.3.1.6.4.4.3-.1 2.1-1.4 3-2 .8.1 1.7.2 2.7.2 5.5 0 10-3.5 10-8s-4.5-8-10-8z"
                                    />
                                </svg>
                            </div>
                        </button>

                        {/* 네이버 로그인 버튼 */}
                        <button
                            onClick={() => handleLogin('Naver')}
                            className="group w-full border-2 border-black p-4 hover:bg-black transition-colors duration-300"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-sm tracking-widest group-hover:text-white">NAVER</span>
                                <svg className="w-4 h-4 group-hover:text-white" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M16.273 12.845L7.376 0H0v24h7.726V11.155L16.624 24H24V0h-7.727z"
                                    />
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
