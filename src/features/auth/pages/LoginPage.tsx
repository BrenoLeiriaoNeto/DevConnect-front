import { Flex, Stack, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import styles from '@/shared/styles/BackGround.module.css';

import AuthCard from '../ui/AuthCard';

export default function LoginPage() {
  const isMobile = useMediaQuery('(max-width: 36em)');
  return (
    <Flex
      className={styles.nebula!}
      justify="center"
      align="center"
      direction="column"
      h="100vh"
      w="100vw"
      px={{ base: 'md', sm: 'xl' }}
    >
      <Stack align="center" gap={isMobile ? 'md' : 'xl'}>
        <Title order={2} size={isMobile ? 'lg' : 'xl'}>
          Welcome to DevConnect
        </Title>
        <AuthCard />
      </Stack>
    </Flex>
  );
}
