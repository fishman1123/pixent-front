// src/components/intro/TipBox.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

export const TipBox = () => {
    const { t } = useTranslation();

    return (
        <>
            <div className="text-left text-[14px] ml-5 mr-5 pl-2 pr-2 pt-4 pb-4 bg-[#F8F8F8]">
                <div className="font-bold ">{t('tipbox.serialCodeOneTimeUse')}</div>
                <div className="mt-3">
                    <div>{t('tipbox.noSerialCode')}</div>
                    <div>{t('tipbox.contactStaff')}</div>
                </div>
            </div>
            <div className="text-left text-[14px] mt-4 ml-5 mr-5 pl-2 pr-2 pt-4 pb-4 bg-[#F8F8F8]">
                <div className="font-bold ">{t('tipbox.doNotRefresh')}</div>
                <div className="mt-3">
                    <div>{t('tipbox.accidentalRefresh')}</div>
                    <div>{t('tipbox.contactStaff')}</div>
                </div>
            </div>
            <div className="text-left text-[14px] mt-4 ml-5 mr-5 mb-2 pl-2 pr-2 pt-4 pb-4 bg-[#F8F8F8]">
                <div className="font-bold ">{t('tipbox.referToFollowing')}</div>
                <div className="mt-3">
                    <div>{t('tipbox.orderInfo')}</div>
                    <div>{t('tipbox.assistanceContactStaff')}</div>
                </div>
            </div>
        </>
    );
};
