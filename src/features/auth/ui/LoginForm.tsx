import { Button, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from '@tanstack/react-router';

import { apiClient } from '@/app/api/axios';
import { accessTokenAtom } from '@/shared/state/auth.atoms';
import { jotaiStore } from '@/shared/state/store';
import { userAtom } from '@/shared/state/user.atoms';

export default function LoginForm() {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length >= 6 ? null : 'Password must be at least 6 characters'),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const { data } = await apiClient.post('/auth/login', values);
      console.log('Data -> ', data);

      jotaiStore.set(accessTokenAtom, data.accessToken);

      if (data.user) {
        jotaiStore.set(userAtom, data.user);
      }

      navigate({ to: '/protected/dashboard' });
    } catch (error) {
      console.error('Login failed:', error);
      form.setErrors({
        email: '',
        password: 'Invalid credentials or account issue',
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput label="Email" size="md" placeholder="Email" {...form.getInputProps('email')} />
      <PasswordInput
        label="Password"
        placeholder="***********"
        size="md"
        mt="md"
        {...form.getInputProps('password')}
      />
      <Button type="submit" fullWidth mt="xl">
        Login
      </Button>
    </form>
  );
}
