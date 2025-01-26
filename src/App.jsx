import React, { useEffect } from 'react';
import { Provider } from 'react-redux';             // <-- Redux
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { store } from './store';                    // <-- Your Redux store
import { RouterList } from './RouterList.jsx';
import AuthInitializer from './components/AuthInitializer'; // If still used
import ErrorBoundary from './components/ErrorBoundary';
import ErrorModal from './components/ErrorModal';

import './index.css';
import 'flowbite';
import './i18n'; // Ensure this path is correct

const router = createBrowserRouter(RouterList);
const queryClient = new QueryClient();

function setScreenSize() {
    const vh = window.innerHeight * 0.01;
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
        // 1) Use Redux <Provider> instead of RecoilRoot
        <Provider store={store}>
            {/* 2) Provide React Query */}
            <QueryClientProvider client={queryClient}>
                <ErrorBoundary>
                    {/* 3) If using AuthInitializer, wrap your router here */}
                    <AuthInitializer>
                        <RouterProvider router={router} />
                    </AuthInitializer>
                </ErrorBoundary>
                <ErrorModal />
            </QueryClientProvider>
        </Provider>
    );
}

export default App;
