import { AuthServerSession } from '../util/sessionHandler';

export type UserAuthResponse = {
    success: boolean;
    message: string;
    data: AuthServerSession;
};
