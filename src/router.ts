import { createRouter } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';
import GlobalError from './shared/ui/GlobalError';
import GlobalPending from './shared/ui/GlobalPending';

export const router = createRouter({
  routeTree,
  defaultPendingComponent: GlobalPending,
  defaultErrorComponent: GlobalError,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
