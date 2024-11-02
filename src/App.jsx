// src/index.js
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { RouterList } from './RouterList.jsx';
import './index.css';
import 'flowbite';

// Import your i18n configuration
import './i18n'; // Ensure this path is correct
import { userAtoms, defaultUserState } from './recoil/userAtoms'; // Import the atom and default state

const router = createBrowserRouter(RouterList);

// Retrieve the saved language from localStorage or default to 'ko'
const savedLanguage = localStorage.getItem('language') || defaultUserState.userLanguage;

// Initialize the userAtoms with the saved language
const initializeUserState = ({ set }) => {
    set(userAtoms, { ...defaultUserState, userLanguage: savedLanguage });
};

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RecoilRoot initializeState={initializeUserState}>
            {/* Remove LanguageSynchronizer if previously added */}
            <RouterProvider router={router} />
        </RecoilRoot>
    </StrictMode>
);
