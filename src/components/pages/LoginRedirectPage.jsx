// src/components/pages/LoginRedirectPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePostToken } from "../../hooks/usePostToken";
import { useGetNickNameValidation } from "../../hooks/useGetNickNameValidation";

export const LoginRedirectPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState(null);

  // 1) A custom hook that calls your back-end to get a new token
  const { mutateAsync: postToken } = usePostToken();

  // 2) Check if the user already has a nickname
  //    The server returns { isValid: true/false } or something similar
  //    We only call it if we actually have an accessToken
  const {
    data: nicknameData,
    isSuccess: nicknameSuccess,
    isError: nicknameError,
  } = useGetNickNameValidation(accessToken, Boolean(accessToken));

  // 3) On mount, request the token from the server
  useEffect(() => {
    const refreshTokenFlow = async () => {
      try {
        const token = await postToken();
        if (token) {
          localStorage.setItem("gToken", token);
          setAccessToken(token);
        } else {
          console.warn("No access token found!");
          navigate("/login");
        }
      } catch (err) {
        console.error("Error fetching tokens:", err);
        navigate("/login");
      }
    };
    refreshTokenFlow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 4) Once nicknameData is fetched, decide route
  useEffect(() => {
    if (nicknameSuccess && nicknameData !== undefined) {
      console.log("nicknameData from server:", nicknameData);
      // If the server says { isValid: true }, user has a nickname => go "/"
      if (nicknameData?.isValid === true) {
        window.location.href = "/";
      } else {
        // isValid is false => nickname is not set => go to "/login/nickname"
        navigate("/login/nickname");
      }
    } else if (nicknameError) {
      console.error("Error checking nickname");
      navigate("/login");
    }
  }, [nicknameSuccess, nicknameData, nicknameError, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-xl mb-4">Handling Redirect...</h2>
      <p className="text-sm text-gray-600">
        Please wait while we process your login.
      </p>
    </div>
  );
};
