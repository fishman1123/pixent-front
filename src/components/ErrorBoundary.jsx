// src/components/ErrorBoundary.jsx

import React from "react";
import { connect } from "react-redux";
import { openErrorModal } from "../store/errorModalSlice";

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

    // Dispatch the action to open the error modal with the error message
    this.props.openErrorModal({
      message: error.message || "An unexpected error occurred.",
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any fallback UI here if desired
      return null; // Alternatively, return a fallback UI component
    }

    return this.props.children;
  }
}

// Map dispatch to props to provide the openErrorModal action
const mapDispatchToProps = {
  openErrorModal,
};

// Connect the ErrorBoundary component to the Redux store
export default connect(null, mapDispatchToProps)(ErrorBoundary);
