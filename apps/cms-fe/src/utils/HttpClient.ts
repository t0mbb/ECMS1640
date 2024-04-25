import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

export const httpClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'https://cms1640-be.azurewebsites.net',
});

httpClient.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${sessionStorage.getItem('accessToken')}`;
  return config;
});

httpClient.interceptors.response.use(
  (data: AxiosResponse) => {
    return data;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
