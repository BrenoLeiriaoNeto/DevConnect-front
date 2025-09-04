import { MantineProvider as MP, createTheme, ColorSchemeScript } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

const theme = createTheme({
  primaryColor: 'indigo',
  fontFamily: 'Inter, sans-serif',
  defaultRadius: 'md',
});

export default function MantineProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ColorSchemeScript />
      <MP theme={theme} defaultColorScheme="dark">
        <Notifications position="top-right" />
        {children}
      </MP>
    </>
  );
}
