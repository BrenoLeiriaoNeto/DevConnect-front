import { Button, Center, Stack, Text } from '@mantine/core';
import { useRouter } from '@tanstack/react-router';

type GlobalErrorProps = {
  error: unknown;
};

export default function GlobalError({ error }: GlobalErrorProps) {
  const router = useRouter();

  const message =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : 'An unknown error occurred';

  return (
    <Center style={{ height: '100vh' }}>
      <Stack align="center">
        <Text size="xl" c="red">
          Oops! Something went wrong.
        </Text>
        <Text c="dimmed">{message}</Text>
        <Button variant="light" onClick={() => router.invalidate()}>
          Try again
        </Button>
      </Stack>
    </Center>
  );
}
