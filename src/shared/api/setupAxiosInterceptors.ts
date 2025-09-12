// eslint-disable-next-line import/no-duplicates
import { AxiosHeaders, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

import { accessTokenAtom } from '../state/auth.atoms';
import { jotaiStore } from '../state/store';

// eslint-disable-next-line import/no-duplicates
import type { AxiosError } from 'axios';

export function setupAxiosInterceptors(apiClient: AxiosInstance) {
  apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = jotaiStore.get(accessTokenAtom);
    if (token) {
      const headers = new AxiosHeaders(config.headers);
      headers.set('Authorization', `Bearer ${token}`);
      config.headers = headers;
    }

    const csrf = Cookies.get('XSRF-TOKEN');
    console.log('CSRF token:', csrf);
    if (csrf) {
      config.headers['X-CSRF-TOKEN'] = csrf;
    }

    return config;
  });

  let isRefreshing = false;
  // eslint-disable-next-line no-unused-vars
  let pendingQueue: Array<(token: string | null) => void> = [];

  apiClient.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      if (!original || !error.response) {
        return Promise.reject(error);
      }

      if (original.url?.includes('/auth/refresh?') || original.url?.endsWith('/auth/refresh')) {
        return Promise.reject(error);
      }

      if (error.response?.status === 401 && !original._retry) {
        original._retry = true;

        if (isRefreshing) {
          return new Promise((resolve) => {
            pendingQueue.push((newToken) => {
              if (newToken) {
                original.headers = new AxiosHeaders(original.headers);
                original.headers.set('Authorization', `Bearer ${newToken}`);
              }
              resolve(apiClient(original));
            });
          });
        }

        isRefreshing = true;
        try {
          const { data } = await apiClient.post('/auth/refresh');
          const newToken = (data as any).accessToken as string;

          jotaiStore.set(accessTokenAtom, newToken);

          pendingQueue.forEach((resolve) => resolve(newToken));
          pendingQueue = [];

          original.headers = new AxiosHeaders(original.headers);
          original.headers.set('Authorization', `Bearer ${newToken}`);

          return apiClient(original);
        } catch (e) {
          jotaiStore.set(accessTokenAtom, null);
          pendingQueue.forEach((resolve) => resolve(null));
          pendingQueue = [];
          return Promise.reject(e);
        } finally {
          isRefreshing = false;
        }
      }
      return Promise.reject(error);
    },
  );
}
