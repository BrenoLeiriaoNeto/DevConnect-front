import type { ReactNode } from 'react';

import { Provider } from 'jotai';

import { jotaiStore } from '@/shared/state/store';

export function JotaiProvider({ children }: { children: ReactNode }) {
  return <Provider store={jotaiStore}>{children}</Provider>;
}
