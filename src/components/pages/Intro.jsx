// src/components/intro/Intro.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import PrimeModal from "../PrimeModal";
import { IntroTop } from "../intro/IntroTop";
import { IntroCenter } from "../intro/IntroCenter";
import { IntroBottom } from "../intro/IntroBottom";
import { ProcedureButton } from "../ProcedureButton";
import { isFeedbackEmpty } from "../isFeedbackEmpty"; // helper to check empty feedback

// For the feedback toast
import ToastModal from "../ToastModal";
import FeedBackFinal from "../feedback/FeedBackFinal";

export const Intro = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const authState = useSelector((state) => state.auth);
  const feedbackPost = useSelector((state) => state.feedbackPost);

  // Session expired modal (optional)
  const [showExpiredModal, setShowExpiredModal] = useState(false);

  // Feedback toast
  const [showFeedbackToast, setShowFeedbackToast] = useState(false);

  useEffect(() => {
    if (location.state?.from === "/feedback") {
      if (!isFeedbackEmpty(feedbackPost)) {
        setShowFeedbackToast(true);
        navigate(location.pathname, { replace: true, state: {} });
      }
    }
  }, [location, feedbackPost, navigate]);

  // Close the feedback toast
  const handleCloseFeedbackToast = () => {
    setShowFeedbackToast(false);
  };

  // Close the session expired modal
  const handleCloseExpiredModal = () => {
    setShowExpiredModal(false);
  };

  return (
    <div className="flex-col justify-center items-center min-h-screen w-full text-center">
      <IntroTop>
        <div className="mt-[120px] mb-[40px]">
          <div className="text-[40px] font-extralight">{t("DISCOVER")}</div>
          <div className="text-[40px] font-extralight">{t("YOUR_SCENT")}</div>
          <div className="text-[14px] mt-[40px] text-black">
            {t("Uncover your unique fragrance profile")}
          </div>
        </div>
      </IntroTop>

      <div className="mb-[48px]">
        <div className="mx-20">
          <ProcedureButton
            text={t("Start Analysis")}
            route="/which"
            confirm={false}
          />
        </div>
      </div>

      {/* Show user info if authenticated */}
      {authState.isAuthenticated ? (
        <div className="flex flex-col">
          <div>login is done (nickname: {authState.nickname || "N/A"})</div>
          <div>view amount left: {authState.viewChance || "N/A"}</div>
          <div>user email: {authState.userEmail || "N/A"}</div>
          <div>user provider: {authState.userProvider || "N/A"}</div>
        </div>
      ) : (
        <div>login is not done</div>
      )}

      <IntroCenter />

      <IntroTop>
        <div className="mt-[20px] mb-[40px]">
          <div className="text-[40px] font-extralight">{t("REFINE")}</div>
          <div className="text-[40px] font-extralight">{t("YOUR_SCENT")}</div>
          <div className="text-[14px] mt-[40px] text-black">
            {t("COMPLETE WITH OUR EXPERTS")}
          </div>
        </div>
      </IntroTop>

      <div className="mb-[48px]">
        <div className="mx-20">
          <ProcedureButton text={t("Get A/S")} route="/which" confirm={false} />
        </div>
      </div>

      {/* Session expired modal (triggered externally if needed) */}
      <PrimeModal
        isOpen={showExpiredModal}
        onClose={handleCloseExpiredModal}
        title="Session Expired"
      >
        <p>the login time is expired, login again</p>
      </PrimeModal>

      {/* Feedback toast */}
      {showFeedbackToast && (
        <ToastModal onClose={handleCloseFeedbackToast}>
          <FeedBackFinal />
        </ToastModal>
      )}
    </div>
  );
};
