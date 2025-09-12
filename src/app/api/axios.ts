import axios from 'axios';

import { setupAxiosInterceptors } from '@/shared/api/setupAxiosInterceptors';

export const apiClient = axios.create({
  baseURL: import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_URL,
  withCredentials: true,
});

setupAxiosInterceptors(apiClient);
