// src/components/ErrorBoundary.jsx

import React from "react";
import { connect } from "react-redux";
import { openErrorModal } from "../store/errorModalSlice";
import { useLocation } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error details for debugging
    console.error("Uncaught error:", error, errorInfo);

    // Skip if we're already showing an error modal
    if (this.props.errorModal?.isOpen) {
      return;
    }

    // Handle authentication errors
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      this.handleAuthError();
      return;
    }

    // Handle undefined/null data errors
    if (error?.message?.includes("undefined") || error?.message?.includes("null")) {
      this.handleDataError();
      return;
    }

    // Handle API errors
    if (error?.response) {
      this.handleApiError(error);
      return;
    }
  }

  handleAuthError = () => {
    // Remove token and dispatch logout
    localStorage.removeItem("gToken");
    this.props.dispatch({ type: "auth/logout" });

    // Show error modal with appropriate message
    this.props.openErrorModal({
      message: "세션이 만료되었습니다. 다시 로그인해주세요.",
      redirectTo: "/login"
    });
  }

  handleDataError = () => {
    const token = localStorage.getItem("gToken");
    if (!token) {
      // If no token exists, show login required message
      this.props.openErrorModal({
        message: "로그인이 필요합니다. 로그인 후 이용해주세요.",
        redirectTo: "/login"
      });
    } else {
      // For other undefined/null errors, show a generic error message
      this.props.openErrorModal({
        message: "데이터를 불러오는 중 오류가 발생했습니다.",
        redirectTo: null
      });
    }
  }

  handleApiError = (error) => {
    this.props.openErrorModal({
      message: "서버와의 통신 중 오류가 발생했습니다.",
      redirectTo: null
    });
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

const mapStateToProps = (state) => ({
  errorModal: state.errorModal
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  openErrorModal: (payload) => dispatch(openErrorModal(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary);
