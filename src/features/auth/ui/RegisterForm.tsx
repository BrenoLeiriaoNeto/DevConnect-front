import { Button, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function RegisterForm() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      name: (value) => (value.length > 1 ? null : 'Name must have at least 2 letters'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length >= 6 ? null : 'Password must have at least 6 characters'),
      confirmPassword: (value, values) =>
        value === values.password ? null : 'Passwords do not match',
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log(values);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput label="Name" size="md" {...form.getInputProps('name')} />
      <TextInput label="Email" mt="md" size="md" {...form.getInputProps('email')} />
      <PasswordInput label="Password" mt="md" size="md" {...form.getInputProps('password')} />
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
