import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./introLanding.css";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const IntroLanding = () => {
  const navigate = useNavigate();
  
  // State to track if header should be visible
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // State for background image
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState([false, false]);
  const backgroundImages = ['/landingOne.jpeg', '/landingTwo.jpeg'];
  
  // Animation controls for different sections
  const heroControls = useAnimation();
  const statsControls = useAnimation();
  const footerControls = useAnimation();
  
  // Set up refs for detecting when elements are in viewport
  const [heroRef, heroInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [footerRef, footerInView] = useInView({ threshold: 0.2, triggerOnce: true });
  
  // Parallax scroll effect
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  
  // Lazy load images
  const loadImage = useCallback((imageUrl, index) => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setImagesLoaded(prev => {
        const newState = [...prev];
        newState[index] = true;
        return newState;
      });
    };
  }, []);
  
  // Start loading first image immediately, load second image after first is loaded
  useEffect(() => {
    // Load first image immediately
    loadImage(backgroundImages[0], 0);
    
    // After a short delay, start loading the second image
    const timer = setTimeout(() => {
      loadImage(backgroundImages[1], 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [loadImage, backgroundImages]);
  
  // Track scroll position to show/hide header and change background
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const halfwayPoint = documentHeight / 2;
      
      // Show header if scrolling up or at the top, hide if scrolling down
      if (currentScrollY <= 10) {
        setIsHeaderVisible(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsHeaderVisible(true);
      } else {
        // Scrolling down
        setIsHeaderVisible(false);
      }
      
      // Change background image based on scroll position
      if (currentScrollY < halfwayPoint) {
        setCurrentBgIndex(0); // First image
      } else {
        setCurrentBgIndex(1); // Second image
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);
  
  // Animate sections when they come into view
  useEffect(() => {
    if (heroInView) {
      heroControls.start("visible");
    }
    if (statsInView) {
      statsControls.start("visible");
    }
    if (footerInView) {
      footerControls.start("visible");
    }
  }, [heroControls, heroInView, statsControls, statsInView, footerControls, footerInView]);

  // Handler for navigation with scroll to top
  const handleNavigateToHome = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    navigate("/");
  };

  // Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100 
      }
    }
  };
  
  const metricVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 70,
        delay: 0.4
      }
    }
  };

  // Header animation variants
  const headerVariants = {
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    hidden: { 
      y: -50, 
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };

  return (
    <div className="min-h-screen text-white overflow-hidden relative">
      {/* Background Images with Transition */}
      <div className="fixed inset-0 w-full h-full z-0">
        {/* Initial placeholder background - black with gradient */}
        <div 
          className="absolute inset-0 w-full h-full bg-gradient-to-b from-gray-900 to-black"
          style={{
            opacity: (!imagesLoaded[0] && !imagesLoaded[1]) ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out',
            zIndex: 0
          }}
        />
        
        {/* Background images that load progressively */}
        {backgroundImages.map((img, index) => (
          <div
            key={index}
            className="absolute inset-0 w-full h-full bg-center bg-cover transition-opacity duration-1500"
            style={{
              backgroundImage: imagesLoaded[index] ? `url(${img})` : 'none',
              opacity: (imagesLoaded[index] && index === currentBgIndex) ? 1 : 0,
              zIndex: index === currentBgIndex ? 1 : 0
            }}
          />
        ))}
        
        {/* Loading indicator (only shown before the current image is loaded) */}
        {!imagesLoaded[currentBgIndex] && (
          <div className="absolute inset-0 flex items-center justify-center z-[5]">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
      </div>
      
      {/* Header Bar */}
      <motion.div 
        className="fixed top-0 left-0 w-full py-4 px-6 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex justify-between items-center"
        initial="visible"
        animate={isHeaderVisible ? "visible" : "hidden"}
        variants={headerVariants}
      >
        <div className="text-2xl font-bold">PIXENT</div>
        <div className="w-12"></div> {/* Placeholder for balance, keeping the PIXENT text on the far left */}
      </motion.div>
      
      {/* Hero Section */}
      <motion.section 
        className="py-20 px-6 min-h-[90vh] flex flex-col justify-center relative z-20"
        ref={heroRef}
        initial="hidden"
        animate={heroControls}
        variants={containerVariants}
      >
        <div className="container mx-auto">
          <motion.div 
            variants={itemVariants}
            className="mb-6"
          >
            <span className="section-title">WE ARE PIXENT</span>
          </motion.div>
          
          <motion.h1 
            className="massive-heading mb-10 max-w-5xl"
            variants={itemVariants}
          >
            We Craft Innovative Perfume Experiences, Driven By AI Technology And Data.
          </motion.h1>

          <motion.div 
            className="mt-16"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="/"
                className="button-outline inline-block"
                onClick={handleNavigateToHome}
              >
                분석하기
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Company Information & Stats Section */}
      <motion.section
        className="py-20 px-6 border-t border-gray-800 relative z-20 bg-black bg-opacity-80"
        ref={statsRef}
        initial="hidden"
        animate={statsControls}
        variants={containerVariants}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div variants={itemVariants}>
              <div className="mb-6">
                <span className="section-title">Company Information</span>
              </div>
              <h2 className="text-3xl font-bold max-w-md mb-6">
                Since Its Founding In 2023, Pixent Has Experienced Remarkable Growth.
              </h2>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-10"
            >
              <motion.div 
                className="animated-border pt-6" 
                variants={metricVariants}
              >
                <div className="text-lg font-bold">AC'SCENT ID</div>
                <div className="flex justify-between items-baseline">
                  <span className="metric-label">OFFLINE STORE</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="animated-border pt-6" 
                variants={metricVariants}
              >
                <div className="text-lg font-semibold mb-2">→ 예약 후 오프라인 방문 시 직접 퍼스널 센트 조향 가능</div>
                <div className="text-sm">
                  오프라인 공간에서는 직접 추천받은 향을 맡아보고, 나의 취향을 반영하여 퍼스널 센트로 만들어가실 수 있습니다.
                </div>
              </motion.div>
              
              <motion.div 
                className="animated-border pt-6" 
                variants={metricVariants}
              >
                <div className="text-lg font-semibold mb-2">→ 50ML 구매 시 1회 무료 A/S 제공</div>
                <div className="text-sm">
                  기존 구매하신 50ml 퍼품을 가져오시면 퍼드백을 반영하여 더 개선된 향으로 무료 교체해드립니다.
                </div>
              </motion.div>
              
              <motion.div 
                className="animated-border pt-6" 
                variants={metricVariants}
              >
                <div className="text-lg font-semibold mb-2">→ 얼마나 사용했는지와 무관하게, 100% 무료 애프터 서비스</div>
                <div className="text-sm">
                  2025년 1월부터 구매하신 모든 고객님께 1회 무료로 AS 서비스를 제공해드리고 있습니다. [오프라인 예약 필수]
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer Call to Action */}
      <motion.section
        className="py-20 px-6 min-h-[50vh] flex items-center relative z-20 bg-black bg-opacity-90"
        ref={footerRef}
        initial="hidden"
        animate={footerControls}
        variants={containerVariants}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <motion.h2 
              className="massive-heading mb-10"
              variants={itemVariants}
            >
              We Can Create Some Perfume, Together.
            </motion.h2>
            
            <motion.div 
              className="flex flex-col justify-end"
              variants={itemVariants}
            >
              <div className="mb-10">
                <div className="text-xl mb-4">서울특별시 마포구 와우산로29라길 22 지하 1층</div>
                <div className="text-xl">02-336-3368</div>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <a
                  href="/"
                  className="button-outline inline-block"
                  onClick={handleNavigateToHome}
                >
                  향수한잔 하러가기
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Scroll to top button */}
      <motion.div 
        className="fixed bottom-10 right-10 w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer z-50"
        whileHover={{ y: -5 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </motion.div>
    </div>
  );
}; 