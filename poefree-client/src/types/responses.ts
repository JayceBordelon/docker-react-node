import { AuthServerSession } from '../util/sessionHandler';
import { Poem } from './poem';

export type UserAuthResponse = {
    success: boolean;
    message: string;
    data: AuthServerSession;
};

export type PoemsResponse = {
    success: boolean;
    message: string;
    data: Poem[];
};
