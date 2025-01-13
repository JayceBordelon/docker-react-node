import { ENDPOINTS } from '../constants/contants';
import { Poem } from '../types/poem';
import { PoemsResponse } from '../types/responses';
import { apiGet } from './apiConfig';

export const fetchAllPoems = async (): Promise<Poem[]> => {
    const poems: PoemsResponse = await apiGet(ENDPOINTS.poems);
    return poems.success ? poems.data : [];
};

export const fetchPoemsForCurrentUser = async (): Promise<Poem[]> => {
    const poems: PoemsResponse = await apiGet(ENDPOINTS.userPoems);
    return poems.success ? poems.data : [];
};
