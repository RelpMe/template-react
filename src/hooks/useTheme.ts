import { useContext } from 'react';
import { ThemeContext } from '../provider';

export const useTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return { theme, setTheme };
};
