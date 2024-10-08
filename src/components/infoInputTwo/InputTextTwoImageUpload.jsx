import React, { useState } from 'react';
import imageUploadIcon from '../../assets/upload.svg';
import {ProcedureButton} from "../ProcedureButton.jsx";
import {DataButton} from "../DataButton.jsx";

export const InputTextTwoImageUpload = () => {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const targetOptions = ['Male', 'Female', 'Other'];

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const TempCheckbox = ({ options }) => {
        const [selectedOption, setSelectedOption] = useState('');

        const handleClick = (option) => {
            setSelectedOption(option);
        };

        return (
            <div className="flex w-full max-w-[460px] mt-4 gap-2">
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

    const handleNameTextChange = (event) => {
        // Handle text change (if needed)
    };

    return (
        <div className="mt-5">
            <div className="font-bold text-4xl">USER PROFILE</div>
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
                            <div>UPLOAD YOUR IMAGE</div>
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
                            이미지 업로드
                        </label>
                    </div>
                    <div className="w-full max-w-[460px]">
                        <div className="font-bold text-left mt-6">NAME</div>
                        <input
                            type="text"
                            onChange={handleNameTextChange}
                            className="w-full border border-black p-2 mt-2"
                        />
                        <div className="font-bold text-left mt-6">GENDER</div>
                        <div className="w-full">
                            <TempCheckbox options={targetOptions} />
                        </div>
                        <div>
                            <div className="font-bold text-left mt-6">KEYWORDS</div>
                            <input
                                type="text"
                                onChange={handleNameTextChange}
                                placeholder="키워드를 입력해주세요 (예:따스한)"
                                className="w-full border border-black p-2 mt-2"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-4 w-full max-w-[460px]">
                    <DataButton text="분석하기" apiRoute="/basic" subText="테스트중입니다" confirm={false} />
                </div>
            </div>
        </div>
    );
};
