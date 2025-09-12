import { apiClient } from '@/app/api/axios';

import { refreshAccessToken } from './refreshAccessToken';
import { accessTokenAtom } from '../state/auth.atoms';
import { jotaiStore } from '../state/store';
import { userAtom } from '../state/user.atoms';

export async function validateAuth(): Promise<boolean> {
  let token = jotaiStore.get(accessTokenAtom);
  console.log('[validateAuth] Token in memory:', token ? 'present' : 'missing');

  if (!token) {
    console.log('[validateAuth] No token — attempting refresh…');
    const refreshed = await refreshAccessToken();
    if (!refreshed) {
      console.log('[validateAuth] Refresh failed — returning false');
      jotaiStore.set(accessTokenAtom, null);
      jotaiStore.set(userAtom, null);
      return false;
    }
    token = jotaiStore.get(accessTokenAtom);
    console.log('[validateAuth] Refresh succeeded — new token set');
  }

  if (!token) {
    console.log('[validateAuth] Still no token after refresh — returning false');
    return false;
  }

  try {
    const res = await apiClient.get('/auth/me');
    console.log('[validateAuth] /auth/me succeeded — user loaded:', res.data);
    jotaiStore.set(userAtom, res.data);
    return true;
  } catch (err) {
    console.error('[validateAuth] /auth/me failed:', err);
    jotaiStore.set(accessTokenAtom, null);
    jotaiStore.set(userAtom, null);
    return false;
  }
}
