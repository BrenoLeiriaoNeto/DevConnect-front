import { createFileRoute } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';

import { userAtom } from '@/shared/state/user.atoms';

export const Route = createFileRoute('/protected/dashboard')({
  component: DashboardPage,
});

function DashboardPage() {
  const user = useAtomValue(userAtom);
  console.log(user);

  return (
    <div>
      <h1>Welcome {user?.username ?? 'Guest'}</h1>
    </div>
  );
}
