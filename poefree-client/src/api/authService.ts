import { apiPost } from './apiConfig';
import { UserRegistrationPayload, UserLoginPayload } from '../types/payloads';
import { UserAuthResponse } from '../types/responses';
import { ENDPOINTS } from './endpoints';

export const registerUser = async (
    payload: UserRegistrationPayload,
): Promise<UserAuthResponse> => {
    return await apiPost<UserAuthResponse>(ENDPOINTS.register, payload);
};

export const loginUser = async (
    payload: UserLoginPayload,
): Promise<UserAuthResponse> => {
    return await apiPost<UserAuthResponse>(ENDPOINTS.login, payload);
};
