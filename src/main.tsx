import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './index.css';

import { RouterProvider } from './app/providers/RouterProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider />
  </StrictMode>,
);
