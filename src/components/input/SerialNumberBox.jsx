import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUserState } from "../../store/userSlice";
import { setAuthState } from "../../store/authSlice";
import { useTranslation } from "react-i18next";
import AxiosInstance from "../../api/axiosInstance";
import { openErrorModal } from "../../store/errorModalSlice";

export const SerialNumberBox = ({ path, isViewer }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [serialNumber, setSerialNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevents double-clicking

  useEffect(() => {
    dispatch(setUserState({ currentPage: "input" }));
  }, [dispatch]);

  const handleSerialNumberChange = (e) => {
    const value = e.target.value;
    setSerialNumber(value);

    // Basic validations
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
    if (errorMessage || isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true); // Disable button to prevent double-clicks

    try {
      console.log("POST to", path, "with:", { username: serialNumber });

      const response = await AxiosInstance.post(path, {
        username: serialNumber,
      });

      console.log("Response data:", response.data);
      dispatch(
        setAuthState({ isAuthenticated: true, nickname: response.data }),
      );

      // Redirect user after successful request
      if (location.pathname === "/login/nickname") {
        navigate("/", { state: { from: "/login/nickname" } });
      } else {
        navigate("/user", { state: { from: "/" } });
      }
    } catch (err) {
      console.error("Error in POST:", err);
      const msg = err.response?.data?.message || "닉네임 변경 실패";
      setErrorMessage(msg);
      dispatch(openErrorModal({ message: msg }));
    } finally {
      setIsSubmitting(false); // Re-enable button after request completes
    }
  };

  return (
    <div className={`mt-6 pl-5 pr-5 ${!errorMessage ? "mb-[51px]" : ""}`}>
      <div className="flex items-center">
        <input
          type="text"
          value={serialNumber}
          onChange={handleSerialNumberChange}
          className={`border ${errorMessage ? "border-red-500 border-2" : "border-black border-2"} 
            p-2.5 w-full text-gray-700 placeholder-gray-500 focus:outline-none`}
          placeholder="닉네임을 입력해주세요"
          disabled={isSubmitting} // Disable input while submitting
        />
        <button
          onClick={handleSubmit}
          className={`bg-black text-white p-[16px] focus:outline-none ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={!!errorMessage || isSubmitting} // Prevents double clicks
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
