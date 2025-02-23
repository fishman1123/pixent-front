import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { MainLayout } from "./MainLayout";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";

export function ProtectedLayout() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Always call the hook unconditionally
  // but pass `enabled: isAuthenticated` so it doesn't fetch when false.
  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetUserInfo(isAuthenticated);

  // 1) If not authenticated, go to /login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 2) If data is undefined (not cached), do a manual refetch
  useEffect(() => {
    if (!data) {
      refetch();
    }
  }, [data, refetch]);

  // 3) Show loading if still fetching
  if (isLoading || isFetching) {
    return (
      <div style={{ margin: "40px auto", fontSize: "18px" }}>
        Loading your profile...
      </div>
    );
  }

  // 4) If an error (403, etc.) => go to /login
  if (isError) {
    console.error("ProtectedLayout fetch error:", error);
    return <Navigate to="/login" replace />;
  }

  // 5) If user data has no username => user hasn’t set nickname => /login/nickname
  if (!data?.username) {
    return <Navigate to="/login/nickname" replace />;
  }

  // 6) Otherwise => proceed
  return <MainLayout />;
}
