// src/components/ErrorBoundary.jsx

import React from 'react';
import { setRecoil } from 'recoil-nexus';
import { errorModalAtom } from '../recoil/errorModalAtom';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Optional: Update state so the next render shows the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log the error
        console.error('Uncaught error:', error, errorInfo);

        // Set the error message in Recoil state
        setRecoil(errorModalAtom, {
            isOpen: true,
            message: error.message || 'An unexpected error occurred.',
        });
    }

    render() {
        return this.props.children;
    }
}

export default ErrorBoundary;