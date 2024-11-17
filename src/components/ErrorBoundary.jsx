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
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Uncaught error:', error, errorInfo);
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