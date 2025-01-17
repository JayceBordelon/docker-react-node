import { useNavigate } from 'react-router-dom';
import { userIsLoggedIn } from '../util/sessionHandler';
import { PAGE_ROUTES } from '../constants/contants';
import { useEffect } from 'react';

export const useAuthValidation = (): void => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!userIsLoggedIn()) {
            navigate(PAGE_ROUTES.auth);
        }
    }, []);
};
