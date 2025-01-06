import axios, { Method, AxiosResponse, AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Base URL from environment variables
});

/**
 * Generalized API request function.
 * 
 * @param endpoint - The API endpoint (relative to baseURL).
 * @param method - The HTTP method (GET, POST, PUT, DELETE, etc.).
 * @param data - The request payload (for POST, PUT, etc.).
 * @param headers - Additional headers for the request.
 * @param params - Query parameters for the request.
 * @returns A promise that resolves with the AxiosResponse.
 */
export const request = async <T = any>(
  endpoint: string,
  method: Method = "GET",
  data?: any,
  headers?: Record<string, string>,
  params?: Record<string, any>
): Promise<AxiosResponse<T>> => {
  const config: AxiosRequestConfig = {
    url: endpoint,
    method,
    data,
    headers,
    params,
  };

  try {
    const response = await api.request<T>(config);
    return response;
  } catch (error: any) {
    console.error("API Request Error:", error.response || error.message);
    throw error;
  }
};

export default api;
