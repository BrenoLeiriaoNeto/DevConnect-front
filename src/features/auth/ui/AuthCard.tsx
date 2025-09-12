import { useState } from 'react';

import { Button, Center, Paper, Stack, Text } from '@mantine/core';

import classes from './AuthCard.module.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthCard() {
  const [flipped, setFlipped] = useState(false);

  return (
    <Center>
      <div className={classes.cardWrapper}>
        <div className={`${classes.card} ${flipped ? classes.flipped : ''}`}>
          <div className={classes.front}>
            <Paper shadow="md" radius="md" p="xl" withBorder>
              <Stack>
                <Text size="lg" fw={500}>
                  Login
                </Text>
                <LoginForm />
                <Button variant="subtle" onClick={() => setFlipped(true)}>
                  Don't have an account? Sign up
                </Button>
              </Stack>
            </Paper>
          </div>
          <div className={classes.back}>
            <Paper shadow="md" radius="md" p="xl" withBorder>
              <Stack>
                <Text size="lg" fw={500}>
                  Sign Up
                </Text>
                <RegisterForm />
                <Button variant="subtle" onClick={() => setFlipped(false)}>
                  Already have an account? Login
                </Button>
              </Stack>
            </Paper>
          </div>
        </div>
      </div>
    </Center>
  );
}
