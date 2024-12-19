import React, { useState, useEffect } from 'react';
import { AlertCircle, Loader, Globe2 } from 'lucide-react';

const translations = {
    ko: {
        loading: "로딩중",
        processingTime: "맞춤형 향 분석은 1~3분 정도 소요될 수 있습니다.",
        caution: "주의사항",
        followGuide: "아래 안내에 따라 진행해 주시기 바랍니다.",
        notices: [
            {
                title: "맞춤형 향수 추천",
                step: "01",
                mainText: "분석 보고서 상단의",
                highlight: "AC'SCENT 22",
                subText: "를 확인해주세요.",
                description: "고객님께 추천된 맞춤형 향수입니다.",
                note: "상단의 이미지는 고객님께서 앞서 입력하신 사진입니다."
            },
            {
                title: "분석 보고서 저장",
                step: "02",
                mainText: "",
                highlight: "페이지 새로고침 시\n분석 결과가 초기화",
                subText: "됩니다.",
                description: "분석 보고서 하단의 링크를 반드시 복사해두시기\n바랍니다.",
                note: "카카오톡 나에게 보내기로 링크를 저장하시면 편리합니다."
            },
            {
                title: "구매하기",
                step: "03",
                mainText: "",
                highlight: "→ '구매하러 가기'\n→ 복사한 링크 붙여넣기\n→ 향수 번호 선택",
                subText: "",
                description: "순서로 진행해 주세요.",
                note: "반드시 이미지와 같이 표시된 입력창에 앞서 복사한\n분석 링크를 붙여넣어 주셔야 정확한 주문이 가능합니다."
            }
        ]
    },
    en: {
        loading: "LOADING",
        processingTime: "Custom fragrance analysis may take 1-3 minutes.",
        caution: "Caution",
        followGuide: "Please follow the instructions below.",
        notices: [
            {
                title: "Custom Fragrance Recommendation",
                step: "01",
                mainText: "Please check",
                highlight: "AC'SCENT 22",
                subText: "at the top of the analysis report.",
                description: "This is your recommended custom fragrance.",
                note: "The image above is the photo you previously uploaded."
            },
            {
                title: "Save Analysis Report",
                step: "02",
                mainText: "",
                highlight: "Analysis results will\nbe reset upon\npage refresh",
                subText: "",
                description: "Please make sure to copy the link at the bottom\nof the analysis report.",
                note: "It's convenient to save the link using KakaoTalk's\n'Send to Myself' feature."
            },
            {
                title: "Purchase",
                step: "03",
                mainText: "",
                highlight: "→ 'Go to Purchase'\n→ Paste copied link\n→ Select fragrance number",
                subText: "",
                description: "Please proceed in this order.",
                note: "You must paste the analysis link you copied earlier into\nthe input field shown in the image for accurate ordering."
            }
        ]
    },
    zh: {
        loading: "加载中",
        processingTime: "定制香水分析可能需要1-3分钟。",
        caution: "注意事项",
        followGuide: "请按照以下说明进行操作。",
        notices: [
            {
                title: "定制香水推荐",
                step: "01",
                mainText: "请在分析报告顶部查看",
                highlight: "AC'SCENT 22",
                subText: "。",
                description: "这是为您推荐的定制香水。",
                note: "上方图片是您之前输入的照片。"
            },
            {
                title: "保存分析报告",
                step: "02",
                mainText: "",
                highlight: "页面刷新时\n分析结果将被初始化",
                subText: "",
                description: "请务必复制分析报告底部的链接。",
                note: "建议使用KakaoTalk的发送给自己功能保存链接。"
            },
            {
                title: "购买",
                step: "03",
                mainText: "",
                highlight: "→ '前往购买'\n→ 粘贴复制的链接\n→ 选择香水编号",
                subText: "",
                description: "请按此顺序进行。",
                note: "必须将之前复制的分析链接粘贴到图示输入框中，\n才能准确下单。"
            }
        ]
    },
    ja: {
        loading: "読み込み中",
        processingTime: "カスタム香水の分析には1-3分程度かかる場合があります。",
        caution: "注意事項",
        followGuide: "以下の案内に従って進めてください。",
        notices: [
            {
                title: "カスタム香水のお勧め",
                step: "01",
                mainText: "分析レポートの上部で",
                highlight: "AC'SCENT 22",
                subText: "をご確認ください。",
                description: "これはお客様に推奨されたカスタム香水です。",
                note: "上部の画像はお客様が先ほど入力された写真です。"
            },
            {
                title: "分析レポートの保存",
                step: "02",
                mainText: "",
                highlight: "ページの更新時に\n分析結果が初期化",
                subText: "されます。",
                description: "分析レポート下部のリンクを必ずコピーして\nください。",
                note: "KakaoTalkの「自分へ送信」機能でリンクを\n保存すると便利です。"
            },
            {
                title: "購入",
                step: "03",
                mainText: "",
                highlight: "→ '購入する'\n→ コピーしたリンクを貼り付け\n→ 香水番号を選択",
                subText: "",
                description: "順で進めてください。",
                note: "画像のように表示された入力欄に先ほどコピーした\n分析リンクを必ず貼り付けていただく必要があります。"
            }
        ]
    }
};

const NewLoading = ({ onLoadingComplete }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loadingPosition, setLoadingPosition] = useState(-100);
    const [language, setLanguage] = useState('ko');

    useEffect(() => {
        let position = -100;
        let animationFrame;

        const animate = () => {
            position += 0.5;
            if (position > 100) {
                position = -100;
            }
            setLoadingPosition(position);
            animationFrame = requestAnimationFrame(animate);
        };

        animationFrame = requestAnimationFrame(animate);

        const slideTimer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % translations[language].notices.length);
        }, 8000);

        return () => {
            cancelAnimationFrame(animationFrame);
            clearInterval(slideTimer);
        };
    }, [language]);

    const t = translations[language];

    // Array of warning image filenames corresponding to each notice
    const warningImages = ['/warningOne.png', '/warningTwo.png', '/warningThree.png'];

    return (
        <div className="min-h-screen bg-white text-black flex flex-col p-6 pt-8">
            <div
                className="w-full flex flex-col items-start relative mx-auto overflow-hidden"
                style={{
                    minWidth: '320px',
                    maxWidth: '480px',
                    width: '100%',
                }}
            >
                {/* Language Selector */}
                <div className="w-full flex justify-end mb-4">
                    <div className="flex items-center gap-2">
                        <Globe2 className="w-4 h-4" />
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="border border-gray-200 rounded px-2 py-1 text-sm"
                        >
                            <option value="ko">한국어</option>
                            <option value="en">English</option>
                            <option value="zh">中文</option>
                            <option value="ja">日本語</option>
                        </select>
                    </div>
                </div>

                {/* Loading Section */}
                <div className="mb-8 flex flex-col items-start w-full">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-xl tracking-[.4em] font-light">{t.loading}</span>
                        <Loader className="w-5 h-5 animate-spin" />
                    </div>
                    <p className="text-sm font-light tracking-wide text-gray-500 mb-4">
                        {t.processingTime}
                    </p>
                    <div className="w-full h-[1px] bg-gray-100 relative overflow-hidden">
                        <div
                            className="absolute top-0 h-full w-full bg-black transition-transform duration-200 ease-linear"
                            style={{ transform: `translateX(${loadingPosition}%)` }}
                        />
                    </div>
                </div>

                {/* Transition Container */}
                <div className="w-full overflow-hidden relative items-start">
                    <div
                        className="transition-transform duration-700 ease-in-out flex"
                        style={{
                            transform: `translateX(-${currentSlide * 100}%)`,
                            width: `${t.notices.length * 100}%`,
                        }}
                    >
                        {t.notices.map((notice, index) => (
                            <div
                                key={`content-${index}`}
                                className="w-full flex-shrink-0 px-0.5 flex flex-col items-start"
                            >
                                {/* Warning Image */}
                                <div className="w-full mb-4 flex">
                                    <img
                                        src={warningImages[index]}
                                        alt={`Warning ${index + 1}`}
                                        className="max-w-[260px] w-auto h-auto"
                                    />
                                </div>

                                {/* Caution Section */}
                                <div className="mb-4 flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-500" />
                                    <div className="space-y-1">
                                        <p className="text-base tracking-wide">{t.caution}</p>
                                        <p className="text-[13px] leading-tight text-gray-600 font-light tracking-wide">
                                            {t.followGuide}
                                        </p>
                                    </div>
                                </div>

                                {/* Notice Content */}
                                <div className="border border-gray-200 p-6 w-full items-start">
                                    <div className="flex items-baseline gap-3 mb-6">
                                        <span className="text-base tracking-[.3em] font-light">{notice.step}</span>
                                        <h3 className="text-lg font-bold tracking-wide">{notice.title}</h3>
                                    </div>

                                    <div className="space-y-4 w-[280px]">
                                        <div className="w-full break-keep items-start">
                                            {notice.mainText && (
                                                <span className="text-[13px] leading-tight font-light">
                                                    {notice.mainText}{' '}
                                                </span>
                                            )}
                                            {notice.highlight && (
                                                <span className="text-[13px] leading-tight font-medium border-b-2 border-black whitespace-pre-line">
                                                    {notice.highlight}
                                                </span>
                                            )}
                                            {notice.subText && (
                                                <span className="text-[13px] leading-tight font-light">
                                                    {' '}{notice.subText}
                                                </span>
                                            )}
                                        </div>

                                        {notice.description && (
                                            <p className="text-[13px] leading-tight font-light text-black whitespace-pre-line break-keep mt-2">
                                                {notice.description}
                                            </p>
                                        )}

                                        <p className="text-[13px] leading-tight font-light text-gray-600 mt-2 break-keep whitespace-pre-line">
                                            {notice.note}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Slide Indicators */}
                    <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-2 mt-4">
                        {t.notices.map((_, index) => (
                            <button
                                key={`indicator-${index}`}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    currentSlide === index ? 'bg-black w-4' : 'bg-gray-300'
                                }`}
                                onClick={() => setCurrentSlide(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewLoading;
