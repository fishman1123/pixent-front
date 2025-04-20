// src/hooks/useReportSubmit.js

import { useMutation } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { setResponseData } from '../store/responseDataSlice';
import { closeConfirmationModal, setIsConfirm } from '../store/confirmationSlice';
import { openErrorModal } from '../store/errorModalSlice';
import { setUserState } from '../store/userSlice';
import AxiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

export const useReportSubmit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state selectors
  const userState = useSelector(state => state.user);
  const confirmationState = useSelector(state => state.checkboxSelection.preferences);
  const checkboxData = useSelector(state => state.checkboxData);

  const submitData = useCallback(async () => {
    const formData = new FormData();

    const { preferred, disliked } = confirmationState;

    // Map selected IDs to their corresponding data from checkboxData
    const mappedPreferred = preferred
      .map(id => {
        const option = checkboxData.find(opt => opt.id === id);
        if (!option) {
          console.warn(`Preferred option with id ${id} not found in checkboxData.`);
          return null;
        }
        return { id: option.id, label: option.label };
      })
      .filter(item => item !== null); // Remove any null entries

    const mappedDisliked = disliked
      .map(id => {
        const option = checkboxData.find(opt => opt.id === id);
        if (!option) {
          console.warn(`Disliked option with id ${id} not found in checkboxData.`);
          return null;
        }
        return { id: option.id, label: option.label };
      })
      .filter(item => item !== null); // Remove any null entries

    const preferences = {
      preferred: mappedPreferred,
      disliked: mappedDisliked,
    };

    formData.append('preference', JSON.stringify(preferences));

    // Add Image File directly
    if (userState.userImage) {
      formData.append('image', userState.userImage, userState.userImage.name);
    }

    // Other User Data
    formData.append('gender', userState.userGender || '');
    formData.append('name', userState.userName || '');
    formData.append('keyword', userState.keyword || '');
    formData.append('language', userState.userLanguage || '');

    // Log the FormData values for debugging
    // console.log('FormData being sent:', formData);
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        // console.log(`${key}:`, value.name);
      } else {
        // console.log(`${key}:`, value);
      }
    }
    // console.log('--- FormData being prepared for submission ---');
    const loggedData = {};
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        // console.log(`${key}: (File) ${value.name}`); // Log file name
        loggedData[key] = `(File) ${value.name}`;
      } else {
        console.log(`${key}: ${value}`); // Log other values
        loggedData[key] = value;
      }
    }
    // console.log('Combined FormData:', loggedData);
    // console.log('--- End of FormData log ---');

    const response = await AxiosInstance.post('/api/imagebyGemini', formData);

    return response.data;
  }, [confirmationState, userState, checkboxData]);

  const mutation = useMutation({
    mutationFn: submitData,
    onSuccess: responseData => {
      // Store response data in Redux slice
      dispatch(setResponseData(responseData));

      // Optionally, close the confirmation modal if it's open
      dispatch(closeConfirmationModal());

      // Navigate to the result page
      navigate('/result');
    },
    onError: mutationError => {
      let errorMessage = '';
      if (mutationError.response) {
        console.error('Server Error:', mutationError.response.data);
        errorMessage = mutationError.response.data.message || 'Server Error';
      } else if (mutationError.request) {
        console.error('Network Error:', mutationError.request);
        errorMessage = 'Network Error: Please check your connection.';
      } else {
        console.error('Error:', mutationError.message);
        errorMessage = 'An unexpected error occurred.';
      }

      // Dispatch an action to open the error modal with the message
      dispatch(openErrorModal({ message: errorMessage }));
    },
  });

  return mutation;
};
