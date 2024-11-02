// src/components/intro/IntroTop.jsx
import React from 'react';
import { ProcedureButton } from '../ProcedureButton.jsx';
import { useTranslation } from 'react-i18next';

export const IntroTop = () => {
    const { t } = useTranslation();

    return (
        <div className="flex-1 content-center h-full min-h-[300px] w-full bg-white text-black mt-[80px] font-introTitle">
            <div className="text-xl">{t('DISCOVER')}</div>
            <div className="text-xl">{t('YOUR_SCENT')}</div>
            <div className="text-[14px] mt-[20px] mb-[48px] text-black">
                {t('Uncover your unique fragrance profile')}
            </div>
            <ProcedureButton
                text={t('Start Analysis')} // Pass translated text
                route="/basic"
                subText={t('Test in progress')} // Pass translated subtext
                confirm={false}
            />
        </div>
    );
};
