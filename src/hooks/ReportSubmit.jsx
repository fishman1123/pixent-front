// src/hooks/ReportSubmit.js

import { useMutation } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { confirmationAtom } from '../recoil/confirmationAtom.jsx';
import { userAtoms } from '../recoil/userAtoms.jsx';
import AxiosInstance from '../api/axiosInstance'; // Correct Axios import
import { useNavigate } from 'react-router-dom';

// Utility function to convert Data URL to File
const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
};

export const useReportSubmit = () => {
    const userState = useRecoilValue(userAtoms);
    const confirmationState = useRecoilValue(confirmationAtom);
    const navigate = useNavigate();

    const submitData = async () => {
        const formData = new FormData();

        const { preferred, disliked } = confirmationState.preferences;

        const preferences = {
            preferred: preferred.map(pref => ({
                id: pref.id,
                label: pref.label,
            })),
            disliked: disliked.map(dis => ({
                id: dis.id,
                label: dis.label,
            })),
        };

        formData.append('preferences', JSON.stringify(preferences));

        // Add Image File and Image Name
        if (userState.userImage) {
            const imageFile = dataURLtoFile(userState.userImage, userState.userImageName);
            formData.append('image', imageFile);
        }

        // Other User Data
        formData.append('gender', userState.userGender || '');
        formData.append('name', userState.userName || '');
        formData.append('keyword', userState.keyword || '');
        formData.append('language', userState.userLanguage || '');

        // Log the FormData values
        console.log('FormData being sent:');
        for (let [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(`${key}:`, value.name);
            } else {
                console.log(`${key}:`, value);
            }
        }

        // Make the POST request using Axios
        const response = await AxiosInstance.post('/example', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Axios sets the correct headers for FormData
            },
        });

        return response.data;
    };

    return useMutation({
        mutationFn: submitData,
        onSuccess: (responseData) => {
            console.log('Data submitted successfully:', responseData);
            navigate('/result/final');
        },
        onError: (mutationError) => {
            if (mutationError.response) {
                // Server responded with a status other than 2xx
                console.error('Server Error:', mutationError.response.data);
                alert(mutationError.response.data.message || 'Server Error');
            } else if (mutationError.request) {
                // Request was made but no response received
                console.error('Network Error:', mutationError.request);
                alert('Network Error: Please check your connection.');
            } else {
                // Something else caused the error
                console.error('Error:', mutationError.message);
                alert('An unexpected error occurred.');
            }
        },
    });
};
