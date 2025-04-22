import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthState } from "../store/authSlice";
import { setUserState } from "../store/userSlice"; // Adjust import path if needed
import PrimeModal from "./PrimeModal"; // or your "GeneralModal"

const SecuredRoute = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const authState = useSelector((state) => state.auth);
  const userState = useSelector((state) => state.user);

  const [showModal, setShowModal] = useState(false);
  const [checked, setChecked] = useState(false); // Have we checked localStorage?
  
  useEffect(() => {
    const token = localStorage.getItem("gToken");
    if (token) {
      dispatch(setAuthState({ isAuthenticated: true }));
    } else {
      dispatch(setAuthState({ isAuthenticated: false }));
    }
    setChecked(true);
  }, [dispatch]);

  useEffect(() => {
    if (checked) {
      if (!authState.isAuthenticated) {
        dispatch(setUserState({ isAuthenticated: false }));
        setShowModal(true);
      } else {
        if (!authState.nickname) {
          // check nickname
          dispatch(setUserState({ isAuthenticated: true }));
          setShowModal(true);
        } else {
          dispatch(setUserState({ isAuthenticated: true }));
          setShowModal(false);
        }
      }
    }
  }, [checked, authState.isAuthenticated, authState.nickname, dispatch]);

  const handleCloseModal = () => {
    setShowModal(false);
    if (!authState.isAuthenticated) {
      navigate("/login", { replace: true });
    } else if (authState.isAuthenticated && !authState.nickname) {
      navigate("/login/nickname", { replace: true });
    }
  };

  if (!checked) {
    return <div style={{ padding: 40 }}>Checking login status...</div>;
  }

  if (!authState.isAuthenticated) {
    return (
      <>
        <PrimeModal
          isOpen={showModal}
          title="Login Required"
          onClose={handleCloseModal}
        >
          <p>로그인이 필요합니다. 로그인 후 이용해주세요.</p>
        </PrimeModal>
        <div style={{ display: "none" }}>{children}</div>
      </>
    );
  }

  if (authState.isAuthenticated && !authState.nickname) {
    return (
      <>
        <PrimeModal
          isOpen={showModal}
          title="Nickname Required"
          onClose={handleCloseModal}
        >
          <p>닉네임이 등록되어 있지 않습니다. 닉네임을 등록 후 이용해주세요.</p>
        </PrimeModal>
        <div style={{ display: "none" }}>{children}</div>
      </>
    );
  }

  return children;
};

export default SecuredRoute;
