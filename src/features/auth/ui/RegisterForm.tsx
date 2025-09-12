import { Button, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import { apiClient } from '@/app/api/axios';

export default function RegisterForm() {
  const form = useForm({
    initialValues: {
      username: '',
      email: '',
      passwordHash: '',
      confirmPassword: '',
    },
    validate: {
      username: (value) => (value.length > 1 ? null : 'Name must have at least 2 letters'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      passwordHash: (value) =>
        value.length >= 6 ? null : 'Password must have at least 6 characters',
      confirmPassword: (value, values) =>
        value === values.passwordHash ? null : 'Passwords do not match',
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    console.log(values);
    try {
      const payload = {
        input: {
          username: values.username,
          email: values.email,
          passwordHash: values.passwordHash,
        },
      };
      await apiClient.post('/auth/register', payload);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput label="Name" size="md" {...form.getInputProps('username')} />
      <TextInput label="Email" mt="md" size="md" {...form.getInputProps('email')} />
      <PasswordInput label="Password" mt="md" size="md" {...form.getInputProps('passwordHash')} />
      <PasswordInput
        label="Confirm Password"
        mt="md"
        size="md"
        {...form.getInputProps('confirmPassword')}
      />
      <Button type="submit" fullWidth mt="xl">
        Register
      </Button>
    </form>
  );
}
