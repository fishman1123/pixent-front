import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { MainLayout } from './MainLayout';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';

export function ProtectedLayout() {
    const { isAuthenticated } = useSelector((state) => state.auth);

    // 1) If not authenticated, go to /login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // 2) Always call the hook once, unconditionally
    const {
        data,
        isLoading,
        isFetching,
        isError,
        error,
        refetch
    } = useGetUserInfo(true); // we enable the query

    // 3) If data is undefined (not cached), do a manual refetch
    useEffect(() => {
        if (!data) {
            refetch();
        }
    }, [data, refetch]);

    // 4) Show loading if still fetching
    if (isLoading || isFetching) {
        return <div style={{ margin: '40px auto', fontSize: '18px' }}>
            Loading your profile...
        </div>;
    }

    // 5) If an error (403, etc.) => go to /login
    if (isError) {
        console.error('ProtectedLayout fetch error:', error);
        return <Navigate to="/login" replace />;
    }

    // 6) If user data has no username => they haven’t set nickname => /login/nickname
    if (!data?.username) {
        return <Navigate to="/login/nickname" replace />;
    }

    // 7) Otherwise => proceed
    return <MainLayout />;
}
