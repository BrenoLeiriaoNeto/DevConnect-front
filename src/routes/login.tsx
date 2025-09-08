import { createFileRoute, redirect } from '@tanstack/react-router';

import LoginPage from '@/features/auth/pages/LoginPage';

export const Route = createFileRoute('/login')({
  loader: () => {
    const token = localStorage.getItem('jwt');
    if (token) {
      throw redirect({ to: '/dashboard' });
    }
    return null;
  },
  component: LoginPage,
});
