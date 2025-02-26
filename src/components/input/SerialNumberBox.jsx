import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserState } from "../../store/userSlice";
import { setAuthState } from "../../store/authSlice";
import { useTranslation } from "react-i18next";
import { openErrorModal } from "../../store/errorModalSlice";
import { usePostCreateVariant } from "../../hooks/usePostCreateVaraint";
import AxiosInstance from "../../api/axiosInstance";

export const SerialNumberBox = ({
  path,
  isViewer,
  status,
  isFromCollection,
  reportId,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [serialNumber, setSerialNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(setUserState({ currentPage: "input" }));
  }, [dispatch]);

  // ✅ Use the mutation hook
  const postFeedback = usePostCreateVariant();

  // ✅ Debugging Log
  console.log(
    "✅ Received isFromCollection in SerialNumberBox:",
    isFromCollection,
  );

  const getPlaceholderText = (pathname) => {
    switch (pathname) {
      case "/collection/add":
        return "관리자번호를 입력해주세요";
      case "/charge":
        return "ex) 추가구매";
      default:
        return "닉네임을 입력해주세요";
    }
  };

  const placeholderText = getPlaceholderText(location.pathname);

  const handleSerialNumberChange = (e) => {
    const value = e.target.value;
    setSerialNumber(value);

    const sqlInjectionPattern =
      /('|"|;|--|\b(SELECT|UPDATE|DELETE|INSERT|WHERE|DROP|EXEC)\b)/i;
    if (sqlInjectionPattern.test(value)) {
      setErrorMessage("특수 문자는 허용되지 않습니다.");
    } else if (value.length > 10) {
      setErrorMessage("10자 초과하는 아이디는 허용되지 않습니다.");
    } else {
      setErrorMessage("");
    }
  };

  const handleSubmit = async () => {
    if (!serialNumber) {
      setErrorMessage("공란은 허용하지 않습니다.");
      return;
    }
    if (errorMessage || isSubmitting) return;

    setIsSubmitting(true);

    try {
      console.log("🚀 isFromCollection:", isFromCollection); // Debug log before the condition

      if (isFromCollection) {
        postFeedback.mutate(
          { adminPW: serialNumber, reportId },
          {
            onSuccess: () => {
              console.log("✅ Feedback submitted successfully.");
              navigate("/collection");
            },
            onError: (err) => {
              console.error("❌ Feedback submission failed:", err);
              const msg = err.response?.data?.message || "피드백 제출 실패";
              setErrorMessage(msg);
              dispatch(openErrorModal({ message: msg }));
            },
            onSettled: () => {
              setIsSubmitting(false);
            },
          },
        );
      } else {
        console.log("POST to", path, "with:", { username: serialNumber });
        const response = await AxiosInstance.post(path, {
          username: serialNumber,
        });

        dispatch(
          setAuthState({ isAuthenticated: true, nickname: response.data }),
        );

        if (status) {
          navigate("/");
          return;
        }

        switch (location.pathname) {
          case "/collection/add":
            navigate("/collection");
            break;
          case "/login/nickname":
            window.location.href = "/";
            break;
          default:
            window.location.href = "/user";
            break;
        }
      }
    } catch (err) {
      console.error("Error in POST:", err);
      const msg = err.response?.data?.message || "닉네임 변경 실패";
      setErrorMessage(msg);
      dispatch(openErrorModal({ message: msg }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`mt-6 pl-5 pr-5 ${!errorMessage ? "mb-[51px]" : ""}`}>
      <div className="flex items-center">
        <input
          type="text"
          value={serialNumber}
          onChange={handleSerialNumberChange}
          className={`border ${
            errorMessage ? "border-red-500 border-2" : "border-black border-2"
          } p-2.5 w-full text-gray-700 placeholder-gray-500 focus:outline-none`}
          placeholder={placeholderText}
          disabled={isSubmitting}
        />
        <button
          onClick={handleSubmit}
          className={`bg-black text-white p-[16px] focus:outline-none ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!!errorMessage || isSubmitting}
        >
          <FaArrowRight />
        </button>
      </div>
      {errorMessage && (
        <p className="mt-2 text-[10px] text-red-600 mb-7">{errorMessage}</p>
      )}
    </div>
  );
};
