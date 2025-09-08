import { createFileRoute, redirect } from '@tanstack/react-router';

import { apiClient } from '@/app/api/axios';

export const Route = createFileRoute('/dashboard')({
  loader: async () => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw redirect({ to: '/login' });
    }

    const { data: user } = await apiClient.get('/user/profile');
    return { user };
  },
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = Route.useLoaderData() as { user: { name: string } };
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
    </div>
  );
}
