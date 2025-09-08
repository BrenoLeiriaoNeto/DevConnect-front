import type { ReactNode } from 'react';
import { Suspense } from 'react';

import { Center, Loader } from '@mantine/core';
import { RouterProvider as TanStackRouterProvider } from '@tanstack/react-router';

import { JotaiProvider } from './JotaiProvider';
import MantineProvider from './MantineProvider';
import { router } from '../../router';

export function RouterProvider({ children }: { children?: ReactNode }) {
  return (
    <JotaiProvider>
      <MantineProvider>
        <Suspense
          fallback={
            <Center style={{ height: '100vh' }}>
              <Loader size="xl" />
            </Center>
          }
        >
          <TanStackRouterProvider router={router} />
          {children}
        </Suspense>
      </MantineProvider>
    </JotaiProvider>
  );
}
