import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserSession, getUserSession } from '../session/sessionHandler';

export const useAuthValidation = (): UserSession | null => {
    const navigate = useNavigate();
    const [session, setSession] = useState<UserSession | null>(null);

    useEffect(() => {
        const userSession = getUserSession();
        if (!userSession) {
            navigate('/auth');
        } else {
            setSession(userSession);
        }
    }, [navigate]);

    return session;
};
