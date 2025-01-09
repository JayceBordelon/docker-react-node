import axios, { Method, AxiosRequestConfig, AxiosResponse } from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: import.meta.env.VITE_API_TIMEOUT,
    headers: {
        'Content-Type': 'application/json', // Default content type
    },
});

export const apiRequest = async <T>(
    method: Method,
    endpoint: string,
    data?: any,
    customHeaders?: Record<string, string>,
): Promise<AxiosResponse<T>> => {
    try {
        const config: AxiosRequestConfig = {
            method,
            url: endpoint,
            data,
            headers: customHeaders,
        };

        const response = await api.request<T>(config);
        return response;
    } catch (error: any) {
        if (error.response) {
            console.error(
                `API Error [${error.response.status}]:`,
                error.response.data,
            );
            throw error.response.data;
        } else if (error.request) {
            console.error('API Error: No response from server:', error.request);
            throw new Error('No response from server');
        } else {
            console.error('API Error:', error.message);
            throw new Error(error.message);
        }
    }
};

export const apiGet = <T>(
    endpoint: string,
    customHeaders?: Record<string, string>,
) => apiRequest<T>('GET', endpoint, null, customHeaders);

export const apiPost = <T>(
    endpoint: string,
    data?: any,
    customHeaders?: Record<string, string>,
) => apiRequest<T>('POST', endpoint, data, customHeaders);

export const apiPut = <T>(
    endpoint: string,
    data?: any,
    customHeaders?: Record<string, string>,
) => apiRequest<T>('PUT', endpoint, data, customHeaders);

export const apiDelete = <T>(
    endpoint: string,
    customHeaders?: Record<string, string>,
) => apiRequest<T>('DELETE', endpoint, null, customHeaders);

export default api;
