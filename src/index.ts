// Context
import { Provider, ThemeContext } from './provider';

// Constants
import { DEFAULT_THEME } from './constants';

// Hooks
import { useTheme } from './hooks';

// Components
import Button from './components/Button';
import Text from './components/Text';

export * from './constants';

export {
  // Components
  Button,
  Text,
  // Context
  Provider,
  ThemeContext,
  // Hooks
  useTheme,
  // Constants
  DEFAULT_THEME,
};
