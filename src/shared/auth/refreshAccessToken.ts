import { apiClient } from '@/app/api/axios';

import { accessTokenAtom } from '../state/auth.atoms';
import { jotaiStore } from '../state/store';
import { userAtom } from '../state/user.atoms';

export async function refreshAccessToken(): Promise<boolean> {
  try {
    const { data } = await apiClient.post('/auth/refresh');
    jotaiStore.set(accessTokenAtom, data.accessToken);
    jotaiStore.set(userAtom, data.user);
    return true;
  } catch {
    jotaiStore.set(accessTokenAtom, null);
    jotaiStore.set(userAtom, null);
    return false;
  }
}
