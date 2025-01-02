import { useFonts } from 'expo-font';

import type { Preview } from '@storybook/react';

const CustomFontDecorator = (Story: any) => {
  const [fontsLoaded] = useFonts({
    'Nunito-Light': require('../assets/fonts/Nunito-Light.ttf'),
    'Nunito-Regular': require('../assets/fonts/Nunito-Regular.ttf'),
    'Nunito-Medium': require('../assets/fonts/Nunito-Medium.ttf'),
    'Nunito-Bold': require('../assets/fonts/Nunito-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <Story />;
};

const preview: Preview = {
  parameters: {
    // actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  // @ts-ignore
  decorators: [CustomFontDecorator],
  tags: ['autodocs'],
};

export default preview;
