import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { APIErrorResponse } from '../types/errors';

// Create an instance of Axios
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '5000'), // Default timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

// Base API request function
export const apiRequest = async <T>(
    method: Method,
    endpoint: string,
    data?: Record<string, unknown>,
    customHeaders?: Record<string, string>,
): Promise<AxiosResponse<T>> => {
    try {
        const config: AxiosRequestConfig = {
            method,
            url: endpoint,
            data,
            headers: customHeaders,
        };

        return await api.request<T>(config);
    } catch (error: any) {
        if (error.response) {
            throw new APIErrorResponse(
                error.response.data.message,
                error.response.status,
                error.response.data.errors,
            );
        } else if (error.request) {
            throw new APIErrorResponse('No response from server', 500, []);
        } else {
            throw new APIErrorResponse(
                error.message || 'An unknown error occurred',
                500,
                [],
            );
        }
    }
};

// Specific API methods
export const apiGet = async <T>(
    endpoint: string,
    customHeaders?: Record<string, string>,
): Promise<T> => {
    const response = await apiRequest<T>(
        'GET',
        endpoint,
        undefined,
        customHeaders,
    );
    return response.data;
};

export const apiPost = async <T>(
    endpoint: string,
    data?: Record<string, unknown>,
    customHeaders?: Record<string, string>,
): Promise<T> => {
    const response = await apiRequest<T>('POST', endpoint, data, customHeaders);
    return response.data;
};

export const apiPut = async <T>(
    endpoint: string,
    data?: Record<string, unknown>,
    customHeaders?: Record<string, string>,
): Promise<T> => {
    const response = await apiRequest<T>('PUT', endpoint, data, customHeaders);
    return response.data;
};

export const apiDelete = async <T>(
    endpoint: string,
    customHeaders?: Record<string, string>,
): Promise<T> => {
    const response = await apiRequest<T>(
        'DELETE',
        endpoint,
        undefined,
        customHeaders,
    );
    return response.data;
};

export default api;
