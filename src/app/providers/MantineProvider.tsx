import { MantineProvider as MP, createTheme, ColorSchemeScript, Loader } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

const theme = createTheme({
  primaryColor: 'indigo',
  fontFamily: 'Inter, sans-serif',
  defaultRadius: 'md',
  components: {
    Loader: Loader.extend({
      defaultProps: {
        type: 'bars',
        size: 'xl',
        color: 'blue',
      },
    }),
  },
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
