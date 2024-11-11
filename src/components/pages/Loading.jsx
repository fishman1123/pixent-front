// src/components/LoadingAnimation.jsx

import React, { useEffect, useState, useRef } from 'react';

const TypewriterEffect = ({ text, onComplete }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, 100);

            return () => clearTimeout(timer);
        } else if (onComplete) {
            const fadeOutTimer = setTimeout(() => {
                setOpacity(0);
            }, 2000);

            const completeTimer = setTimeout(() => {
                onComplete();
            }, 3000);

            return () => {
                clearTimeout(fadeOutTimer);
                clearTimeout(completeTimer);
            };
        }
    }, [currentIndex, text, onComplete]);

    return (
        <div
            className="h-20 flex items-center justify-center transition-opacity duration-1000"
            style={{ opacity }}
        >
            {displayedText}
        </div>
    );
};

const SmokeEffect = () => {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const createSmoke = (x, y) => {
            for (let i = 0; i < 50; i++) {
                particlesRef.current.push({
                    x,
                    y,
                    radius: Math.random() * 20 + 5,
                    color: `rgba(200, 200, 200, ${Math.random() * 0.3})`,
                    velocity: {
                        x: Math.random() * 6 - 3,
                        y: Math.random() * 6 - 3
                    },
                    life: 100
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((particle, index) => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();

                particle.x += particle.velocity.x;
                particle.y += particle.velocity.y;
                particle.radius *= 0.99;
                particle.life--;

                if (particle.life <= 0 || particle.radius < 0.1) {
                    particlesRef.current.splice(index, 1);
                }
            });

            requestAnimationFrame(animate);
        };

        animate();

        const handleTouch = (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.touches[0].clientX - rect.left;
            const y = e.touches[0].clientY - rect.top;
            createSmoke(x, y);
        };

        canvas.addEventListener('touchstart', handleTouch);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('touchstart', handleTouch);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />;
};

const Loading = () => {
    const [quoteIndex, setQuoteIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);

    const quotes = [
        "향기는 보이지 않는 옷이다.\n - C.N. 릴란드 -",
        "향수는 말보다 더 설득력 있게 말한다.\n - 패트릭 쥐스킨트 -",
        "향기는 기억의 가장 확실한 방아쇠다.\n - 다이앤 애커먼 -",
        "좋은 향수는 우리의 영혼을 달래고\n상상력을 자극한다.",
        "당신의 향기는 당신의 서명이\n되어야 한다.",
        "향수는 침묵의 언어다.\n - 장 폴 게를랭 -",
        "향기로운 삶을 살아라.\n그것이 곧 당신의 유산이 될 것이다.",
        "향수는 기억의 풍경을 그린다.",
        "당신의 향기가 당신의 존재를\n알리게 하라.",
        "향기는 시간을 초월하는 마법이다."
    ];

    const handleTypingComplete = () => {
        setIsTyping(false);
        setTimeout(() => {
            setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
            setIsTyping(true);
        }, 1000);
    };

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-white text-black font-serif p-4 overflow-hidden">
            <SmokeEffect />
            <div className="text-4xl font-bold mt-8 z-10" style={{ fontFamily: 'Times New Roman, serif' }}>AC'SCENT</div>
            <div className="flex flex-col items-center z-10">
                <div className="w-24 h-24 mb-8 flex items-center justify-center">
                    <div className="w-full h-full border-t-4 border-r-4 border-black rounded-full animate-spin"></div>
                </div>
                <div className="text-xl mb-4">ANALYZING...</div>
            </div>
            <div className="text-center text-sm text-gray-600 mb-8 w-full z-10">
                {!isTyping && (
                    <div className="h-[80px] w-full"></div>
                )}
                {isTyping && (
                    <TypewriterEffect
                        key={quoteIndex}
                        text={quotes[quoteIndex]}
                        onComplete={handleTypingComplete}
                    />
                )}
            </div>
        </div>
    );
};

export default Loading;
