import { ENDPOINTS, RANDOM_IMAGE_FILE_OPTIONS } from '../constants/contants';
import { UserSession, populateUserSession } from '../session/sessionHandler';
import { apiPost } from './apiConfig';

export const getRandomProfileImage = (): string => {
    return RANDOM_IMAGE_FILE_OPTIONS[
        Math.floor(RANDOM_IMAGE_FILE_OPTIONS.length * Math.random())
    ];
};

export const uploadUserProfileImage = async (
    payload: FormData,
): Promise<any> => {
    const res = await apiPost<any>(ENDPOINTS.uploadProfilePic, payload);
    if (res.data) {
        const updatedUserSessionData: UserSession = res.data as UserSession;
        populateUserSession(updatedUserSessionData);
    }
    return res;
};
