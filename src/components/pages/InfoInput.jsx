// src/components/intro/InfoInput.jsx

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Import Redux hooks
import { setCheckboxData } from '../../store/checkboxDataSlice'; // Import Redux actions
import { setCheckboxSelections } from '../../store/checkboxSelectionSlice'; // Corrected import path
import { ProcedureButton } from '../ProcedureButton';
import { useTranslation } from 'react-i18next';

import { InputTextTop } from '../inputInfo/InputTextTop';
import { SelectForm } from '../inputInfo/SelectForm';
import { Checkbox } from '../inputInfo/CheckBox';
import { InputTextCenter } from '../inputInfo/InputTextCenter';

export const InfoInput = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    // Accessing Redux state if needed
    const checkboxData = useSelector((state) => state.checkboxData);
    const checkboxSelections = useSelector((state) => state.checkboxSelection.preferences);

    useEffect(() => {
        const translatedData = [
            {
                id: 1,
                label: t('checkboxData.label1'),
                description: t('checkboxData.description1'),
                additionalInfo: [
                    t('checkboxData.additionalInfo1_1'),
                    t('checkboxData.additionalInfo1_2'),
                    t('checkboxData.additionalInfo1_3'),
                    t('checkboxData.additionalInfo1_4'),
                ],
                chartData: [
                    { name: t('chartData.sweetness'), value: 6 },
                    { name: t('chartData.freshness'), value: 9 },
                    { name: t('chartData.weight'), value: 3 },
                    { name: t('chartData.uniqueness'), value: 6 },
                ],
            },
            {
                id: 2,
                label: t('checkboxData.label2'),
                description: t('checkboxData.description2'),
                additionalInfo: [
                    t('checkboxData.additionalInfo2_1'),
                    t('checkboxData.additionalInfo2_2'),
                    t('checkboxData.additionalInfo2_3'),
                ],
                chartData: [
                    { name: t('chartData.sweetness'), value: 8 },
                    { name: t('chartData.freshness'), value: 5 },
                    { name: t('chartData.weight'), value: 4 },
                    { name: t('chartData.uniqueness'), value: 5 },
                ],
            },
            {
                id: 3,
                label: t('checkboxData.label3'),
                description: t('checkboxData.description3'),
                additionalInfo: [
                    t('checkboxData.additionalInfo3_1'),
                    t('checkboxData.additionalInfo3_2'),
                    t('checkboxData.additionalInfo3_3'),
                ],
                chartData: [
                    { name: t('chartData.sweetness'), value: 3 },
                    { name: t('chartData.freshness'), value: 4 },
                    { name: t('chartData.weight'), value: 9 },
                    { name: t('chartData.uniqueness'), value: 8 },
                ],
            },
            {
                id: 4,
                label: t('checkboxData.label4'),
                description: t('checkboxData.description4'),
                additionalInfo: [
                    t('checkboxData.additionalInfo4_1'),
                    t('checkboxData.additionalInfo4_2'),
                    t('checkboxData.additionalInfo4_3'),
                ],
                chartData: [
                    { name: t('chartData.sweetness'), value: 7 },
                    { name: t('chartData.freshness'), value: 3 },
                    { name: t('chartData.weight'), value: 5 },
                    { name: t('chartData.uniqueness'), value: 6 },
                ],
            },
            {
                id: 5,
                label: t('checkboxData.label5'),
                description: t('checkboxData.description5'),
                additionalInfo: [
                    t('checkboxData.additionalInfo5_1'),
                    t('checkboxData.additionalInfo5_2'),
                    t('checkboxData.additionalInfo5_3'),
                ],
                chartData: [
                    { name: t('chartData.sweetness'), value: 9 },
                    { name: t('chartData.freshness'), value: 7 },
                    { name: t('chartData.weight'), value: 4 },
                    { name: t('chartData.uniqueness'), value: 5 },
                ],
            },
            {
                id: 6,
                label: t('checkboxData.label6'),
                description: t('checkboxData.description6'),
                additionalInfo: [
                    t('checkboxData.additionalInfo6_1'),
                    t('checkboxData.additionalInfo6_2'),
                    t('checkboxData.additionalInfo6_3'),
                ],
                chartData: [
                    { name: t('chartData.sweetness'), value: 4 },
                    { name: t('chartData.freshness'), value: 3 },
                    { name: t('chartData.weight'), value: 8 },
                    { name: t('chartData.uniqueness'), value: 9 },
                ],
            },
        ];

        // Dispatch actions to set checkbox data and initial selections
        dispatch(setCheckboxData(translatedData));

        const initialSelections = {
            preferences: {
                preferred: [],
                disliked: [],
            },
        };
        dispatch(setCheckboxSelections(initialSelections));
    }, [t, i18n.language, dispatch]);

    return (
        // z-0 ensures it's behind higher layers like Navbar (z-10 or z-30) and Modal (z-50).
        <div className="relative z-0 flex-col justify-center items-center min-h-screen w-full text-center">
            <InputTextTop />
            <SelectForm />
            <Checkbox componentId={1} />
            <InputTextCenter />
            <Checkbox componentId={2} />

            <div className="mt-10 mb-5">
                <ProcedureButton
                    text={t('Next')}
                    route="/inputTwo"
                    // subText={t('Test in progress')}
                    confirm={true}
                />
            </div>
        </div>
    );
};
