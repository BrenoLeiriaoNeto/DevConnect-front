import { createFileRoute, redirect } from '@tanstack/react-router';

import LoginPage from '@/features/auth/pages/LoginPage';
import { validateAuth } from '@/shared/auth/validateAuth';

export const Route = createFileRoute('/login')({
  beforeLoad: async () => {
    console.log('[beforeLoad:/login] Starting auth validation...');

    const valid = await validateAuth();
    if (valid) {
      console.log('[beforeLoad:/login] ✅ Auth valid — redirecting to dashboard');
      throw redirect({ to: '/protected/dashboard' });
    } else {
      console.log('[beforeLoad:/login] ❌ Auth invalid — redirecting to login');
    }
  },
  component: LoginPage,
});
