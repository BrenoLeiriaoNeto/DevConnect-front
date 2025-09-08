import axios, { AxiosHeaders } from 'axios';

import type { InternalAxiosRequestConfig } from 'axios';

const PUBLIC_PATHS = ['/login', '/register'];

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof config.url === 'string' && PUBLIC_PATHS.some((path) => config.url?.endsWith(path))) {
    return config;
  }

  const token = localStorage.getItem('jwt');
  if (token) {
    const headers = new AxiosHeaders(config.headers);

    headers.set('Authorization', `Bearer ${token}`);

    config.headers = headers;
  }

  return config;
});
