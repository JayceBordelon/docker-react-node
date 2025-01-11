import { PAGE_ROUTES } from '../constants/contants';

export type UserSession = {
    id: string;
    username: string;
    profileImage: string | undefined;
};

export const populateUserSession = async (userInfo: UserSession) => {
    localStorage.setItem('user', JSON.stringify(userInfo));
};

export const getUserSession = (): UserSession | null => {
    const user = localStorage.getItem('user');
    if (!user) return null;

    try {
        const parsed = JSON.parse(user) as Partial<UserSession>;
        if (parsed.id && parsed.username) {
            return parsed as UserSession;
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = PAGE_ROUTES.auth;
};
