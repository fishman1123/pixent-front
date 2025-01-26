// src/components/AuthInitializer.jsx

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthState } from '../store/authSlice';

/**
 * AuthInitializer:
 * - Checks localStorage for 'gToken'
 * - Sets auth.isAuthenticated accordingly (Redux Toolkit)
 * - Shows a small loading fallback until the check is complete
 */
function AuthInitializer({ children }) {
    const [initialized, setInitialized] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('gToken');
        dispatch(setAuthState({ isAuthenticated: !!token }));
        setInitialized(true);
    }, [dispatch]);

    if (!initialized) {
        // Could be a spinner, skeleton, or just null
        return <div>Checking login...</div>;
    }

    return children;
}

export default AuthInitializer;
