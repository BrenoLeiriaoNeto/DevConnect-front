import { atom } from 'jotai';

import type { UserInfo } from '../models/user-info';

export const userAtom = atom<UserInfo | null>(null);
