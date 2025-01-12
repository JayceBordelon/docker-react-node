import { ENDPOINTS, RANDOM_IMAGE_FILE_OPTIONS } from '../constants/contants';
import { apiPost } from './apiConfig';

export const getRandomProfileImage = (): string => {
    return RANDOM_IMAGE_FILE_OPTIONS[
        Math.floor(RANDOM_IMAGE_FILE_OPTIONS.length * Math.random())
    ];
};

export const uploadUserProfileImage = async (
    payload: FormData,
): Promise<any> => {
    return await apiPost<any>(ENDPOINTS.uploadProfilePic, payload, {
        withCredentials: 'true',
    });
};
