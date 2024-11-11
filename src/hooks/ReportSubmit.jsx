// src/hooks/ReportSubmit.js

import { useMutation } from '@tanstack/react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { confirmationAtom } from '../recoil/confirmationAtom.jsx';
import { userAtoms } from '../recoil/userAtoms.jsx';
import { responseDataAtom } from '../recoil/responseDataAtom'; // Import the new atom
import AxiosInstance from '../api/axiosInstance'; // Correct Axios import
import { useNavigate } from 'react-router-dom';

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
            })),
            disliked: disliked.map(dis => ({
                id: dis.id,
                label: dis.label,
            })),
        };

        formData.append('preferences', JSON.stringify(preferences));

        // Add Image File directly
        if (userState.userImage) {
            formData.append('image', userState.userImage, userState.userImage.name);
        }

        // Other User Data
        formData.append('gender', userState.userGender || '');
        formData.append('name', userState.userName || ''); // Use 'username' instead of 'name'
        formData.append('keyword', userState.keyword || '');
        formData.append('language', userState.userLanguage || ''); // Use 'userLanguage' instead of 'language'

        // Log the FormData values for debugging
        console.log('FormData being sent:', formData);
        for (let [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(`${key}:`, value.name);
            } else {
                console.log(`${key}:`, value);
            }
        }

        // Make the POST request using Axios
        const response = await AxiosInstance.post('/api/image', formData);

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
