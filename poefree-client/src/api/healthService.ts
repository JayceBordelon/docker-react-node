import { apiPost } from './apiConfig';
import { ENDPOINTS } from './endpoints';

export const getServerHealth = async (): Promise<boolean> => {
    return apiPost(ENDPOINTS.health)
        .then((res) => {
            console.log(res);
            return true;
        })
        .catch((err) => {
            console.error(err);
            return false;
        });
};
