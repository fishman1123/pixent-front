import { useState, useEffect } from 'react';

const Loading = () => {
    const [currentLang, setCurrentLang] = useState('ko');
    const [animate, setAnimate] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        setAnimate(false);
        const timeout = setTimeout(() => setAnimate(true), 100);
        return () => clearTimeout(timeout);
    }, [currentLang]);

    const notices = {
        ko: [
            '반드시 사람 이미지를 업로드하세요',
            '한 명만 나온 이미지만 가능합니다',
            '새로고침 시 분석 결과 삭제됨',
            '분석 결과는 반드시 캡쳐 저장'
        ],
        en: [
            'Must upload a human photo',
            'Only one person per image allowed',
            'Results deleted upon refresh',
            'Please capture the results'
        ],
        jp: [
            '必ず人物の画像をアップロード',
            '一人のみの画像が必要です',
            '更新すると結果は削除されます',
            '結果を必ずキャプチャしてください'
        ],
        ch: [
            '必须上传人物图片',
            '仅限一人的图片',
            '刷新页面将删除分析结果',
            '请务必截图保存分析结果'
        ]
    };

    return (
        <div className="w-full max-w-lg mx-auto p-5 min-h-screen">
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-2xl md:text-3xl font-bold tracking-wider">
                    ANALYZING
                </h1>
                <div className="flex gap-1">
                    {['ko', 'en', 'jp', 'ch'].map((lang) => (
                        <button
                            key={lang}
                            onClick={() => setCurrentLang(lang)}
                            className={`px-2 py-1 text-xs border border-black transition-colors duration-300
                ${currentLang === lang ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}
                        >
                            {lang.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative w-full h-px bg-gray-200 mb-8 overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-1/3 bg-black loading-bar" />
            </div>

            <div className="relative border-2 border-black p-4 mt-8">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                    <div className="bg-white px-3 py-1 text-xs tracking-widest uppercase font-bold">
                        Important Notice
                    </div>
                    <div className="w-8 h-px bg-black mt-2" />
                </div>

                <div className="mt-6 space-y-4">
                    {animate && notices[currentLang].map((notice, index) => (
                        <div
                            key={`${currentLang}-${index}`}
                            className="notice-item relative bg-gray-50 p-3 pl-6"
                            style={{
                                opacity: 0,
                                animation: `fadeIn 0.8s ease-out forwards ${index * 0.4}s`
                            }}
                        >
                            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black text-white rounded-full flex items-center justify-center text-xs">
                                !
                            </div>
                            <p className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                                {notice}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx global>{`
                @keyframes loading {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(400%);
                    }
                }

                .loading-bar {
                    animation: loading 2.5s infinite linear;
                    will-change: transform;
                    backface-visibility: hidden;
                }

                @keyframes fadeIn {
                    0% {
                        opacity: 0;
                        transform: translateY(15px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .notice-item {
                    will-change: transform, opacity;
                    backface-visibility: hidden;
                }
            `}</style>
        </div>
    );
};

export default Loading;
