import { UserSession } from '../session/sessionHandler';

export type UserAuthResponse = {
    success: boolean;
    message: string;
    data: UserSession;
};
