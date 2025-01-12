import { useNavigate } from 'react-router-dom';
import { userIsLoggedIn } from '../util/sessionHandler';
import { PAGE_ROUTES } from '../constants/contants';

export const useAuthValidation = (): boolean => {
    const navigate = useNavigate();
    if (!userIsLoggedIn()) {
        navigate(PAGE_ROUTES.auth);
        return false;
    }
    return true;
};
