import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authAtom } from '../recoil/authAtoms';

/**
 * AuthInitializer:
 * - Checks localStorage for 'gToken'
 * - Sets authAtom.isAuthenticated accordingly
 * - Shows a small loading fallback until the check is complete
 */
function AuthInitializer({ children }) {
    const [initialized, setInitialized] = useState(false);
    const setAuthState = useSetRecoilState(authAtom);

    useEffect(() => {
        const token = localStorage.getItem('gToken');
        setAuthState((prev) => ({
            ...prev,
            isAuthenticated: !!token,
        }));
        setInitialized(true);
    }, [setAuthState]);

    if (!initialized) {
        // Could be a spinner, skeleton, or just null
        return <div>Checking login...</div>;
    }

    return children;
}

export default AuthInitializer;
