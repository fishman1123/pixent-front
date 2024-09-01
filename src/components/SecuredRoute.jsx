import React from 'react';
import { useRecoilValue } from 'recoil';
import { Navigate } from 'react-router-dom';
import { userAtoms } from '../recoil/userAtoms';

const SecuredRoute = ({ children }) => {
    const userState = useRecoilValue(userAtoms);

    if (!userState.isAuthenticated) {
        // If the user is not authenticated, redirect to the homepage or a login page
        return <Navigate to="/" />;
    }

    // If the user is authenticated, render the children components
    return children;
};

export default SecuredRoute;
