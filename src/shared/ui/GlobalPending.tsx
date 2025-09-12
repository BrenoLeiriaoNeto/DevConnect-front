import { Center, Loader } from '@mantine/core';

export default function GlobalPending() {
  return (
    <Center style={{ height: '100vh' }}>
      <Loader size="xl" />
    </Center>
  );
}
