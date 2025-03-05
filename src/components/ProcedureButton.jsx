// ProcedureButton.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserState } from "../store/userSlice";
import {
  openConfirmationModal,
  closeConfirmationModal,
  setIsConfirm,
} from "../store/confirmationSlice";
import {
  openModalTrigger,
  closeModalTrigger,
} from "../store/modalTriggerSlice";
import { useNavigate } from "react-router-dom";
import "../components/intro/IntroButton.css";
import { useTranslation } from "react-i18next";
import { PortalModal } from "./PortalModal.jsx";
import PrimeModal from "./PrimeModal";
import ToastModal from "./ToastModal";
import { ViewCountInfo } from "./ViewCountInfo.jsx";

export const ProcedureButton = ({ text, route, subText, confirm }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const confirmationState = useSelector((state) => state.confirmation);
  const checkboxSelections = useSelector(
    (state) => state.checkboxSelection.preferences,
  );
  const checkboxData = useSelector((state) => state.checkboxData);

  // --- Local state ---
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [loginNeededModalOpen, setLoginNeededModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false); // controls ToastModal

  const handleButtonClick = () => {
    if (isButtonDisabled) return;

    const token = localStorage.getItem("gToken");
    const isAuth = !!token; // true if token exists, false otherwise

    // Update Redux user state
    dispatch(setUserState({ isAuthenticated: isAuth }));

    if (!isAuth) {
      setLoginNeededModalOpen(true);
      return;
    }

    setButtonDisabled(true);

    if (confirm) {
      const mappedPreferred = checkboxSelections.preferred
        .map((id) => {
          const option = checkboxData.find((opt) => opt.id === id);
          return option
            ? {
                id: option.id,
                label: option.label,
                description: option.description,
              }
            : null;
        })
        .filter((item) => item !== null);

      const mappedDisliked = checkboxSelections.disliked
        .map((id) => {
          const option = checkboxData.find((opt) => opt.id === id);
          return option
            ? {
                id: option.id,
                label: option.label,
                description: option.description,
              }
            : null;
        })
        .filter((item) => item !== null);

      dispatch(
        openConfirmationModal({
          preferences: {
            preferred: mappedPreferred,
            disliked: mappedDisliked,
          },
        }),
      );
    } else {
      // If confirm=false AND route="/which", show Toast instead of navigating
      if (route === "/secured/which") {
        setShowToast(true);
        setButtonDisabled(false);
      } else {
        setTimeout(() => {
          dispatch(setUserState({ currentPage: route }));
          navigate(route);
          setButtonDisabled(false);
        }, 700);
      }
    }
  };

  const handleConfirm = () => {
    dispatch(setIsConfirm(true));
    dispatch(closeConfirmationModal());
    dispatch(closeModalTrigger());

    setTimeout(() => {
      dispatch(setUserState({ currentPage: route }));
      navigate(route);
      setButtonDisabled(false);
    }, 200);
  };

  const handleCancel = () => {
    dispatch(setIsConfirm(false));
    dispatch(closeConfirmationModal());
    dispatch(closeModalTrigger());
    setButtonDisabled(false);
  };

  const handleCloseLoginNeededModal = () => {
    setLoginNeededModalOpen(false);
    navigate("/login");
  };

  // Close ToastModal
  const handleCloseToast = () => {
    setShowToast(false);
  };

  const handleCharge = () => {
    navigate("/secured/charge");
    handleCloseToast();
  };

  const handleAnalysis = () => {
    navigate("/secured/which");
    handleCloseToast();
  };

  return (
    <div className="flex justify-center">
      {/* Main button (only shown if confirmation modal isn't open) */}
      {!confirmationState.isOpen && (
        <button
          className="noanimationbutton"
          role="button"
          onClick={handleButtonClick}
          disabled={isButtonDisabled}
        >
          <span className="text">{text}</span>
          <span>{subText}</span>
        </button>
      )}

      {/* Confirmation Modal */}
      <PortalModal
        isOpen={confirmationState.isOpen}
        onClose={handleCancel}
        title={t("confirmationModal.title")}
        showConfirmButtons
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        confirmText={t("confirmationModal.confirm")}
        cancelText={t("confirmationModal.cancel")}
      >
        <p>{t("confirmationModal.proceedQuestion")}</p>
        <div className="mt-4">
          <h3 className="text-lg font-bold">
            {t("confirmationModal.preferredScents")}
          </h3>
          {confirmationState.preferences.preferred.length > 0 ? (
            confirmationState.preferences.preferred.map((scent, index) => (
              <div key={index} className="mb-4">
                <p className="font-semibold">{t(scent.label)}</p>
                <p className="text-gray-600">{t(scent.description)}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">
              {t("confirmationModal.noPreferredScents")}
            </p>
          )}
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-bold">
            {t("confirmationModal.dislikedScents")}
          </h3>
          {confirmationState.preferences.disliked.length > 0 ? (
            confirmationState.preferences.disliked.map((scent, index) => (
              <div key={index} className="mb-4">
                <p className="font-semibold">{t(scent.label)}</p>
                <p className="text-gray-600">{t(scent.description)}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">
              {t("confirmationModal.noDislikedScents")}
            </p>
          )}
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-bold">
            {t("confirmationModal.howWeUsePreferences")}
          </h3>
          <ul className="list-disc pl-5 text-[14px]">
            <li>{t("confirmationModal.usePreference1")}</li>
            <li>{t("confirmationModal.usePreference2")}</li>
          </ul>
        </div>

        {/* ... confirmation content ... */}
      </PortalModal>

      {/* "Login needed" Modal using PrimeModal */}
      {loginNeededModalOpen && (
        <PrimeModal
          isOpen={loginNeededModalOpen}
          onClose={handleCloseLoginNeededModal}
          title="Login Required"
        >
          <p className="my-2">로그인이 필요합니다. 로그인 후 이용해주세요.</p>
        </PrimeModal>
      )}

      {/* ToastModal */}
      {showToast && (
        <ToastModal onClose={handleCloseToast}>
          <ViewCountInfo
            onCharge={handleCharge}
            startAnalysis={handleAnalysis}
          />
        </ToastModal>
      )}
    </div>
  );
};
