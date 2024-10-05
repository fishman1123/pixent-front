import React from 'react';
import { useRecoilValue } from 'recoil';
import { Navigate } from 'react-router-dom';
import { userAtoms } from '../recoil/userAtoms';

const SecuredRoute = ({ children }) => {
    const userState = useRecoilValue(userAtoms);

    if (!userState.isAuthenticated) {
        return <Navigate to="/" />;
    }

    return children;
};

export default SecuredRoute;
