import { Center, Loader } from '@mantine/core';
import { Outlet, createFileRoute } from '@tanstack/react-router';

import { useAuth } from '@/shared/hooks/useAuth';

export const Route = createFileRoute('/protected')({
  component: ProtectedLayout,
});

function ProtectedLayout() {
  const { isLoading } = useAuth({ redirectToLogin: true });

  if (isLoading) {
    return (
      <Center style={{ height: '100vh' }}>
        <Loader />
      </Center>
    );
  }

  return <Outlet />;
}
