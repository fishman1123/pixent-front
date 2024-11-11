// src/hooks/ReportSubmit.js

import { useMutation } from '@tanstack/react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { confirmationAtom } from '../recoil/confirmationAtom.jsx';
import { userAtoms } from '../recoil/userAtoms.jsx';
import { responseDataAtom } from '../recoil/responseDataAtom'; // Import the new atom
import AxiosInstance from '../api/axiosInstance'; // Correct Axios import
import { useNavigate } from 'react-router-dom';

// Utility function to convert Data URL to File
const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'application/octet-stream';
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
    const setResponseData = useSetRecoilState(responseDataAtom); // Initialize setter for responseDataAtom
    const navigate = useNavigate();

    const submitData = async () => {
        const formData = new FormData();

        const { preferred, disliked } = confirmationState.preferences;

        const preferences = {
            preferred: preferred.map(pref => ({
                id: pref.id,
                label: pref.label,
                description: pref.description, // Include description
            })),
            disliked: disliked.map(dis => ({
                id: dis.id,
                label: dis.label,
                description: dis.description, // Include description
            })),
        };

        formData.append('preferences', JSON.stringify(preferences));

        // Add Image File and Image Name
        if (userState.userImage) {
            const imageFile = dataURLtoFile(userState.userImage, userState.userImageName);
            formData.append('image', imageFile);
            formData.append('imageName', userState.userImageName); // Append imageName
        }

        // Other User Data
        formData.append('userGender', userState.userGender || '');
        formData.append('username', userState.userName || ''); // Use 'username' instead of 'name'
        formData.append('keyword', userState.keyword || '');
        formData.append('userLanguage', userState.userLanguage || ''); // Use 'userLanguage' instead of 'language'

        // Log the FormData values
        console.log('FormData being sent:', formData);
        for (let [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(`${key}:`, value.name);
            } else {
                console.log(`${key}:`, value);
            }
        }

        // Make the POST request using Axios
        const response = await AxiosInstance.post('/api/image', formData, {
            // Do NOT set 'Content-Type' header manually when sending FormData
            // Let Axios set it automatically, including the boundary
            // headers: {
            //     'Content-Type': 'multipart/form-data',
            // },
            // No credentials or authentication headers needed as per your statement
        });

        return response.data;
    };

    return useMutation({
        mutationFn: submitData,
        onSuccess: (responseData) => {
            console.log('Data submitted successfully:', responseData);
            setResponseData(responseData); // Store response data in Recoil atom
            navigate('/result/final');     // Navigate to the result page
        },
        onError: (mutationError) => {
            if (mutationError.response) {
                console.error('Server Error:', mutationError.response.data);
                alert(mutationError.response.data.message || 'Server Error');
            } else if (mutationError.request) {
                console.error('Network Error:', mutationError.request);
                alert('Network Error: Please check your connection.');
            } else {
                console.error('Error:', mutationError.message);
                alert('An unexpected error occurred.');
            }
            navigate('/result/final');
        },
    });
};
