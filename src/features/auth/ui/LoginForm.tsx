import { Button, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import { apiClient } from '@/app/api/axios';

export default function LoginForm() {
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
    console.log('Login:', values);
    try {
      const res = await apiClient.post('/auth/login', values);
      console.log('Login response:', res.data);
    } catch (error) {
      console.error('Login failed:', error);
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
