// src/components/layout/ProtectedLayout.jsx

import React from 'react';
import { useSelector } from 'react-redux'; // Import useSelector from react-redux
import { Navigate } from 'react-router-dom';
import { MainLayout } from './MainLayout';

export function ProtectedLayout() {
    // Use useSelector to access auth state from Redux store
    const { isAuthenticated, nickname } = useSelector((state) => state.auth);

    // If user is NOT logged in => go to /login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    console.log("nickname status: ", nickname);

    // If user IS logged in but no nickname => go to /login/nickname
    if (!nickname) {
        return <Navigate to="/login/nickname" replace />;
    }

    // Otherwise, render the main layout and the rest of the protected pages
    return <MainLayout />;
}
