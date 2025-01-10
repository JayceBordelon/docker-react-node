import { ENDPOINTS } from '../constants/contants';
import { apiGet } from './apiConfig';

export const getServerHealth = async (): Promise<boolean> => {
    return apiGet(ENDPOINTS.health)
        .then(() => true)
        .catch(() => false);
};
