import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';

addons.setConfig({
    theme: {
        ...themes.light,
        ...themes.dark,
        brandTitle: 'My Lib',
        // brandUrl: 'https://link.com',
        brandImage: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png',
    },
});
