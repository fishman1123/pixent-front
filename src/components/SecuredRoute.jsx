import React from 'react';
import { useRecoilValue } from 'recoil';
import { Navigate } from 'react-router-dom';
import { userAtoms } from '../recoil/userAtoms';
import { adminAtoms } from '../recoil/adminAtoms';

const SecuredRoute = ({ children }) => {
    const userState = useRecoilValue(userAtoms);

    if (!userState.isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export const AdminRoute = ({ children }) => {
    const userState = useRecoilValue(adminAtoms);

    if (!userState.isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
};






export default SecuredRoute;
