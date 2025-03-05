import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../api/axiosInstance";

export const StatusInputBox = ({ path, status, count }) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("");

  // 🔹 useEffect 추가 → status가 변경될 때 placeholder 업데이트
  useEffect(() => {
    switch (status) {
      case "request":
        setPlaceholderText("요청사항을 입력해주세요.");
        break;
      case "validation":
        setPlaceholderText("관리자 승인번호를 입력해주세요.");
        break;
      case "addOrigin":
        setPlaceholderText("사용자 ID를 입력해주세요.");
        break;
      default:
        setPlaceholderText("입력해주세요.");
    }
  }, [status]); // status 변경 시 실행

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (
      /('|"|;|--|\b(SELECT|UPDATE|DELETE|INSERT|WHERE|DROP|EXEC)\b)/i.test(
        value,
      )
    ) {
      setErrorMessage("특수 문자는 허용되지 않습니다.");
    } else if (value.length > 10) {
      setErrorMessage("10자 초과하는 값은 허용되지 않습니다.");
    } else {
      setErrorMessage("");
    }
  };

  const handleSubmit = async () => {
    if (!inputValue && status === "test") {
      setErrorMessage("공란은 허용하지 않습니다.");
      return;
    }
    if (errorMessage || isSubmitting) return;

    setIsSubmitting(true);

    try {
      let requestBody;
      switch (status) {
        case "request":
          requestBody = { amount: count ?? 0 };
          break;
        case "validation":
          requestBody = { adminPW: inputValue };
          break;
        case "addOrigin":
          requestBody = { userId: inputValue };
          break;
        default:
          requestBody = { inputValue };
      }

      const response = await AxiosInstance.post(path, requestBody);

      switch (status) {
        case "request":
          navigate("/");
          break;
        case "validation":
          if (response.data === true) {
            navigate("/secured/collection/addOrigin", {
              state: { isValid: true },
            });
          } else {
            alert("wrong pw");
            window.location.reload();
          }
          break;
        case "addOrigin":
          requestBody = { userId: inputValue };
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      console.error("❌ Error in POST:", err);
      const msg = err.response?.data?.message || "요청 실패";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-6 pl-5 pr-5">
      <div className="flex items-center">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className={`border ${
            errorMessage ? "border-red-500 border-2" : "border-black border-2"
          } p-2.5 w-full text-gray-700 placeholder-gray-500 focus:outline-none`}
          placeholder={placeholderText} // ✅ placeholder 정상 작동
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
