import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserSession } from '../session/sessionHandler';

export const useAuthValidation = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const userSession = getUserSession();
        if (!userSession) {
            navigate('/auth');
        }
    }, [navigate]);
};
