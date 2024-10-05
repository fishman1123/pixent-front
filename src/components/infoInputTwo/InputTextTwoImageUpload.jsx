import React, { useState } from 'react';
import imageUploadIcon from '../../assets/upload.svg';

export const InputTextTwoImageUpload = () => {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            // Create a preview URL
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    return (
        <div className="mt-5">
            <div className="font-bold text-4xl">USER PROFILE</div>
            <div className="mt-4 flex flex-col justify-center items-center">
                <div className="w-full max-w-[460px] h-[240px] border border-black flex justify-center items-center bg-gray-100">
                    {/* Image preview */}
                    {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="max-w-full max-h-full" />
                    ) : (
                        <div className="text-center text-gray-500">
                            <div className="flex justify-center">
                                <img src={imageUploadIcon} alt="Upload icon" className="w-[50px] h-[50px] mb-2"/>
                            </div>
                            <div>UPLOAD YOUR IMAGE</div>
                        </div>
                    )}
                </div>

                <div className="mt-4 w-full max-w-[460px]">
                    {/* Image upload button */}
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
            </div>
        </div>
    );
};
