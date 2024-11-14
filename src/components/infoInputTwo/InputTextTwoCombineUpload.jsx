// src/components/InputTextTwoCombineUpload.jsx

import React, { useState } from 'react';
import imageUploadIcon from '../../assets/upload.svg';
import { DataButton } from "../DataButton.jsx";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userAtoms } from "../../recoil/userAtoms.jsx";
import { confirmationAtom } from "../../recoil/confirmationAtom.jsx";
import { useTranslation } from "react-i18next";
import { useReportSubmit } from '../../hooks/ReportSubmit';
import LoadingAnimation from '../pages/Loading.jsx';
import imageCompression from 'browser-image-compression';

export const InputTextTwoCombineUpload = () => {
    const { t } = useTranslation();
    const [imagePreview, setImagePreview] = useState(null);
    const targetOptions = [t('genderOptions.male'), t('genderOptions.female'), t('genderOptions.other')];
    const setUserState = useSetRecoilState(userAtoms);
    const confirmationState = useRecoilValue(confirmationAtom);
    const [keyword, setKeyword] = useState('');
    const [userName, setUserName] = useState('');
    const [userGender, setUserGender] = useState('');
    const [errors, setErrors] = useState({ userName: false, userGender: false, imageError: false });
    const [isSubmitting, setIsSubmitting] = useState(false); // Added this line

    const { mutate, isError, error } = useReportSubmit();

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1024,
                    useWebWorker: true,
                };
                const compressedFile = await imageCompression(file, options);

                setUserState((prevState) => ({
                    ...prevState,
                    userImage: compressedFile,
                    userImageName: compressedFile.name,
                }));

                const reader = new FileReader();
                reader.readAsDataURL(compressedFile);
                reader.onload = () => {
                    const base64Image = reader.result;
                    setImagePreview(base64Image);
                    setErrors((prevErrors) => ({ ...prevErrors, imageError: false }));
                };
            } catch (error) {
                console.error('Error compressing image:', error);
                alert('Failed to compress image.');
            }
        }
    };

    const handleSubmit = async () => {
        // Check for validation errors
        const newErrors = {
            userName: userName.trim() === '',
            userGender: userGender === '',
            imageError: !imagePreview,
        };
        setErrors(newErrors);

        // If any field is invalid, stop submission
        if (newErrors.userName || newErrors.userGender || newErrors.imageError) {
            return;
        }

        const updatedUserState = {
            userName: userName.trim(),
            userGender: userGender,
            keyword: keyword.trim() !== '' ? keyword : null,
            isAuthenticated: true,
        };

        setUserState(prevState => ({
            ...prevState,
            ...updatedUserState,
        }));

        setIsSubmitting(true); // Set isSubmitting to true immediately

        mutate(undefined, {
            onError: () => {
                setIsSubmitting(false); // Reset isSubmitting if there's an error
            },
        });
    };

    const TempCheckbox = ({ options, selectedOption, onSelect }) => {
        const handleClick = (option) => {
            const newSelection = selectedOption === option ? '' : option;
            onSelect(newSelection);
        };

        return (
            <div className="flex justify-center w-full max-w-[460px] mt-4 gap-2">
                {options.map((option) => (
                    <div key={option} className="group flex-1">
                        <button
                            className={`p-3 min-w-[100px] w-full h-[50px] text-center border border-black transition-colors duration-500 ease-out focus:bg-black focus:text-white ${
                                selectedOption === option ? 'bg-black text-white' : 'bg-gray-100 text-black'
                            } group-focus:bg-black group-focus:text-white`}
                            onClick={() => handleClick(option)}
                        >
                            {option}
                        </button>
                    </div>
                ))}
            </div>
        );
    };

    const handleNameChange = (event) => {
        setUserName(event.target.value);
    };

    const handleKeywordChange = (event) => {
        setKeyword(event.target.value);
    };

    const handleGenderSelect = (selectedGender) => {
        setUserGender(selectedGender);
    };

    const isLoading = isSubmitting; // Use isSubmitting to control loading state

    return (
        <>
            {isLoading && <LoadingAnimation />}
            {!isLoading && (
                <div className="pt-4">
                    <div className="font-bold text-4xl">{t('userProfile.title')}</div>
                    <div className="mt-4 flex flex-col justify-center items-center">
                        <div className="w-full max-w-[460px] h-[240px] border border-black flex justify-center items-center bg-gray-100">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="max-w-full max-h-full" />
                            ) : (
                                <div className="text-center text-gray-500">
                                    <div className="flex justify-center">
                                        <img src={imageUploadIcon} alt="Upload icon" className="w-[50px] h-[50px] mb-2" />
                                    </div>
                                    <div>{t('userProfile.uploadYourImage')}</div>
                                </div>
                            )}
                        </div>
                        {!errors.imageError && <span className="h-[24px]"></span>}
                        {errors.imageError && <span className="text-red-700 font-bold">* Please upload an image</span>}
                        <div className="mt-4 w-full max-w-[460px]">
                            <div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="image-upload"
                                />
                                <label
                                    htmlFor="image-upload"
                                    className="bg-black text-white text-center py-2 px-4 cursor-pointer block"
                                >
                                    {t('userProfile.uploadButton')}
                                </label>
                            </div>
                            <div className="w-full max-w-[460px]">
                                <div className="font-bold text-left mt-6">
                                    {t('userProfile.name')}
                                    {errors.userName && <span className="text-red-700"> *Required</span>}
                                </div>
                                <input
                                    type="text"
                                    onChange={handleNameChange}
                                    value={userName}
                                    className="w-full border border-black p-2 mt-2"
                                />
                                <div className="font-bold text-left mt-6">
                                    {t('userProfile.gender')}
                                    {errors.userGender && <span className="text-red-700"> *Required</span>}
                                </div>
                                <div className="w-full">
                                    <TempCheckbox
                                        options={targetOptions}
                                        selectedOption={userGender}
                                        onSelect={handleGenderSelect}
                                    />
                                </div>
                                <div>
                                    <div className="font-bold text-left mt-6">{t('userProfile.keywords')}</div>
                                    <input
                                        type="text"
                                        value={keyword}
                                        onChange={handleKeywordChange}
                                        placeholder={t('userProfile.keywordsPlaceholder')}
                                        className="w-full border border-black p-2 mt-2"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 w-full max-w-[460px] mb-10">
                            <DataButton
                                text={t('userProfile.submitButton')}
                                subText={isLoading ? t('userProfile.submitting') : ''}
                                onClick={handleSubmit}
                                disabled={isLoading}
                            />
                        </div>
                        {isError && (
                            <div className="mt-2 text-red-500">
                                {error?.message || 'An error occurred during submission.'}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
