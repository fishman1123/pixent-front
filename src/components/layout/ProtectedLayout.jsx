// src/components/layout/ProtectedLayout.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { MainLayout } from "./MainLayout";

export function ProtectedLayout() {
  const { isAuthenticated, nickname } = useSelector((state) => state.auth);

  // // 1) If user is not authenticated => go to /login
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }
  //
  // // 2) If user is authenticated but no nickname => go to /login/nickname
  // if (!nickname) {
  //   return <Navigate to="/login/nickname" replace />;
  // }

  // 3) Otherwise, render your main layout
  return <MainLayout />;
}
