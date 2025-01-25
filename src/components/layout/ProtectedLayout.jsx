// src/components/layout/ProtectedLayout.jsx

import React from 'react';
import { useRecoilValue } from 'recoil';
import { Navigate } from 'react-router-dom';
import { authAtom } from '../../recoil/authAtoms';
import { MainLayout } from './MainLayout';

export function ProtectedLayout() {
    const { isAuthenticated, nickname } = useRecoilValue(authAtom);

    // If user is NOT logged in => go to /login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // If user IS logged in but no nickname => go to /login/nickname
    if (!nickname) {
        return <Navigate to="/login/nickname" replace />;
    }

    // Otherwise, render the main layout and the rest of the protected pages
    return <MainLayout />;
}
