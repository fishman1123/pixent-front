// src/components/InputTextTwoCombineUpload.jsx

import React, { useState } from 'react';
import imageUploadIcon from '../../assets/upload.svg';
import { DataButton } from "../DataButton.jsx";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userAtoms } from "../../recoil/userAtoms.jsx";
import { confirmationAtom } from "../../recoil/confirmationAtom.jsx";
import { useTranslation } from "react-i18next";
import { useReportSubmit } from '../../hooks/ReportSubmit';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';

export const InputTextTwoCombineUpload = () => {
    const { t } = useTranslation();
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const targetOptions = [t('genderOptions.male'), t('genderOptions.female'), t('genderOptions.other')];
    const setUserState = useSetRecoilState(userAtoms);
    const confirmationState = useRecoilValue(confirmationAtom);
    const [keyword, setKeyword] = useState('');
    const [userName, setUserName] = useState('');
    const [userGender, setUserGender] = useState('');
    const navigate = useNavigate();

    // Use the custom React Query hook
    const { mutate, isLoading, isError, error } = useReportSubmit();


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
                setImage(compressedFile);

                // Convert the compressed file to base64
                const reader = new FileReader();
                reader.readAsDataURL(compressedFile);
                reader.onload = () => {
                    const base64Image = reader.result;

                    // Set the image in userAtoms as base64
                    setUserState((prevState) => ({
                        ...prevState,
                        userImage: base64Image, // Store the base64 string in userAtoms
                        userImageName: file.name, // Store image name for reference
                    }));

                    // Update preview
                    setImagePreview(base64Image);
                };
            } catch (error) {
                console.error('Error compressing image:', error);
                alert('Failed to compress image.');
            }
        }
    };

    const handleSubmit = async () => {
        if (isLoading) return;

        // Prepare the form data
        const formData = new FormData();
        formData.append("userName", userName.trim() !== '' ? userName : null);
        formData.append("userGender", userGender !== '' ? userGender : null);
        formData.append("keyword", keyword.trim() !== '' ? keyword : null);
        if (image) {
            formData.append("userImage", image, image.name); // Add the image directly
        }

        const updatedUserState = {
            userName: userName.trim() !== '' ? userName : null,
            userGender: userGender !== '' ? userGender : null,
            keyword: keyword.trim() !== '' ? keyword : null,
            userImageName: image ? image.name : null,
            isAuthenticated: true,
        };

        // Log updated user data before updating Recoil state
        console.log("User data being sent to Recoil state:", updatedUserState);

        setUserState(prevState => ({
            ...prevState,
            ...updatedUserState,
        }));

        mutate(formData); // Pass formData to the mutation function
    };

    const TempCheckbox = ({ options, selectedOption, onSelect }) => {
        const handleClick = (option) => {
            const newSelection = selectedOption === option ? '' : option;
            onSelect(newSelection);
        };

        return (
            <div className="flex justify-center w-full max-w-[460px] mt-4 gap-2">
                {options.map((option) => (
                    <button
                        key={option}
                        className={`flex-1 p-3 text-center border border-black transition-all duration-300 ${
                            selectedOption === option ? 'bg-black text-white' : 'bg-gray-100 text-black'
                        }`}
                        onClick={() => handleClick(option)}
                    >
                        {option}
                    </button>
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

    return (
        <div className="mt-5">
            <div className="font-bold text-4xl">{t('userProfile.title')}</div>
            <div className="mt-4 flex flex-col justify-center items-center">
                <div
                    className="w-full max-w-[460px] h-[240px] border border-black flex justify-center items-center bg-gray-100">
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
                        <div className="font-bold text-left mt-6">{t('userProfile.name')}</div>
                        <input
                            type="text"
                            onChange={handleNameChange}
                            value={userName}
                            className="w-full border border-black p-2 mt-2"
                        />
                        <div className="font-bold text-left mt-6">{t('userProfile.gender')}</div>
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
                <div className="mt-4 w-full max-w-[460px]">
                    <DataButton
                        text={t('userProfile.submitButton')}
                        subText={isLoading ? t('userProfile.submitting') : ''}
                        onClick={handleSubmit}
                        disabled={isLoading}
                    />
                </div>
                {isError && (
                    <div className="mt-2 text-red-500">
                        {error.message || 'An error occurred during submission.'}
                    </div>
                )}
            </div>
        </div>
    );
};
