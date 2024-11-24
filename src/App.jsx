// src/App.jsx

import React, { useEffect } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { RouterList } from './RouterList.jsx';
import './index.css';
import 'flowbite';

import './i18n'; // Ensure this path is correct
import { userAtoms, defaultUserState } from './recoil/userAtoms';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RecoilNexus from 'recoil-nexus';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorModal from './components/ErrorModal';

const router = createBrowserRouter(RouterList);
const queryClient = new QueryClient();

const savedLanguage =
    localStorage.getItem('language') || defaultUserState.userLanguage;

const initializeUserState = ({ set }) => {
    set(userAtoms, { ...defaultUserState, userLanguage: savedLanguage });
};

function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
}

function App() {
    useEffect(() => {
        setScreenSize();

        window.addEventListener("resize", setScreenSize);

        return () => {
            window.removeEventListener("resize", setScreenSize);
        };
    }, []);

    return (
        <RecoilRoot initializeState={initializeUserState}>
            <RecoilNexus />
            <QueryClientProvider client={queryClient}>
                <ErrorBoundary>
                    <RouterProvider router={router} />
                </ErrorBoundary>
                <ErrorModal />
            </QueryClientProvider>
        </RecoilRoot>
    );
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
);
