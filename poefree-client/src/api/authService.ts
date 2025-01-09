import { apiPost } from './apiConfig';
import { UserRegistrationPayload, UserLoginPayload } from '../types/payloads';

const ENDPOINTS = {
    register: '/user/register',
    login: '/user/login',
};

export const registerUser = async <T>(
    payload: UserRegistrationPayload,
): Promise<T> => {
    return await apiPost<T>(ENDPOINTS.register, payload);
};

export const loginUser = async <T>(payload: UserLoginPayload): Promise<T> => {
    return await apiPost<T>(ENDPOINTS.login, payload);
};
