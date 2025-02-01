// src/components/intro/IntroTop.jsx
import React from 'react';
import { ProcedureButton } from '../ProcedureButton.jsx';
import { useTranslation } from 'react-i18next';

export const IntroTop = ({ children }) => {
    const { t } = useTranslation();

    return (
        <div className="flex-1 content-center h-full min-h-[200px] w-full bg-white text-black ">
            {children}
        </div>
    );
};
