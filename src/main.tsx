import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './index.css';
import LoginPage from '@/features/auth/pages/LoginPage';

import MantineProvider from './app/providers/MantineProvider';

createRoot(document.getElementById('root')!).render(
  <MantineProvider>
    <StrictMode>
      <LoginPage />
    </StrictMode>
  </MantineProvider>,
);
