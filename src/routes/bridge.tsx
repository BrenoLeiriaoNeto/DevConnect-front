import { createFileRoute } from '@tanstack/react-router';

import BridgeTest from '@/features/auth/ui/BridgeTest';

export const Route = createFileRoute('/bridge')({
  component: RouteComponent,
});

function RouteComponent() {
  return <BridgeTest />;
}
