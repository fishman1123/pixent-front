import { useEffect } from "react";
import mainImage from "../assets/mainImage.png";
import kakaoIcon from "../assets/kakao.svg";
import config from "../config.jsx";

// Kakao SDK needs to be accessed from the global window object
const { Kakao } = window;

export const KakaoShareButton = ({ uuid }) => {
  const kakaoKey = config.API_KAKAO_KEY;
  console.log("Kakao button UUID:", uuid);
  console.log(kakaoKey);

  useEffect(() => {
    // Clean up first in case Kakao was already initialized
    Kakao.cleanup();
    // Initialize with your Kakao JavaScript Key
    Kakao.init(kakaoKey);
    console.log("Kakao init: ", Kakao.isInitialized());
  }, [kakaoKey]);

  const shareKakao = () => {
    // Check if UUID is defined before sharing
    if (!uuid) {
      console.error("Cannot share: UUID is undefined");
      return;
    }
    
    // Ensure we're using a clean UUID without any problematic characters
    const cleanUuid = uuid.toString().trim();
    
    // Use explicit URL construction with full domain and proper encoding
    const reportUrl = `https://www.pixent.co.kr/report/${encodeURIComponent(cleanUuid)}`;
    
    console.log("Kakao sharing URL:", reportUrl);
    
    try {
      Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: "왓 얼유 두잉 향삣삐.",
          description: "기적 같은 하루가 널 기다리고 있어. 그러니 구매좀 해줘, 향 삣삐",
          imageUrl: "https://www.pixent.co.kr/header.png",
          link: {
            mobileWebUrl: reportUrl,
            webUrl: reportUrl,
          },
        },
        buttons: [
          {
            title: "Let's Go Pixent chad",
            link: {
              mobileWebUrl: reportUrl,
              webUrl: reportUrl,
            },
          },
        ],
        serverCallbackArgs: {
          key: 'value', // This can be useful for tracking
        },
      });
    } catch (error) {
      console.error("Kakao share error:", error);
    }
  };

  return (
    <button
      onClick={shareKakao}
      className="text-[#000000] hover:bg-[#FAE300] rounded-lg p-2 px-4 h-full flex items-center justify-center"
    >
      <img src={kakaoIcon} alt="Kakao Share" className="w-6 h-6 mr-2" />
    </button>
  );
};
