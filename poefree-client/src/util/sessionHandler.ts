import { NavigateFunction } from 'react-router-dom';
import { ENDPOINTS, PAGE_ROUTES } from '../constants/contants';
import { apiPost } from '../api/apiConfig';

export type AuthServerSession = {
    uid: string;
    username: string;
    profileImage?: string;
};

export const handleSessionLogin = (
    serverSession: AuthServerSession,
    navigate: NavigateFunction,
): void => {
    localStorage.setItem('user', JSON.stringify(serverSession));
    navigate(PAGE_ROUTES.feed);
};

export const getUserFromSession = (): AuthServerSession | null => {
    try {
        const user = localStorage.getItem('user');
        if (!user) {
            return null;
        }
        return JSON.parse(user) as AuthServerSession;
    } catch (error) {
        console.error('Failed to parse user from session:', error);
        return null;
    }
};

export const userIsLoggedIn = (): boolean => {
    return localStorage.getItem('user') ? true : false;
};

export const updateUserSession = (
    updatedSessionFromServer: AuthServerSession,
): void => {
    localStorage.setItem('user', JSON.stringify(updatedSessionFromServer));
};

export const handleSessionLogout = (navigate: NavigateFunction): void => {
    localStorage.clear();
    apiPost(ENDPOINTS.logout).catch(
        () => 'Error clearing out session on server.',
    );
    navigate(PAGE_ROUTES.auth);
};
