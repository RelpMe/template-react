import React, { createContext, useMemo, useState, ReactNode, useEffect } from 'react';
import { DEFAULT_THEME } from '../constants';

export interface IPalette {
  primary?: string;
  primaryDark?: string;
  secondary?: string;
  secondaryDark?: string;
  ternary?: string;
  ternaryDark?: string;
  success?: string;
  warning?: string;
  danger?: string;
  info?: string;
  black?: string;
  gray?: string;
  grayDark?: string;
  grayLight?: string;
  light?: string;
  white?: string;
  transparent?: string;
}

export interface IFont {
  light: string;
  regular: string;
  bold: string;
}

export interface ICustomTheme {
  palette: IPalette;
  font: IFont;
}

export type IPaletteState =
  | 'primary'
  | 'primaryDark'
  | 'secondary'
  | 'secondaryDark'
  | 'ternary'
  | 'ternaryDark'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'black'
  | 'gray'
  | 'grayDark'
  | 'grayLight'
  | 'light'
  | 'white'
  | 'transparent';

export interface ThemeProviderProps {
  palette: IPalette;
  font: IFont;
  children: ReactNode;
}

interface ThemeContextProps {
  theme: ICustomTheme;
  setTheme: (theme: ICustomTheme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
});

export function Provider({ palette = {}, font, children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ICustomTheme>({
    palette: {
      ...DEFAULT_THEME.palette,
      ...palette,
    },
    font: {
      ...DEFAULT_THEME.font,
      ...font,
    },
  });

  useEffect(() => {
    setTheme({
      palette: {
        ...DEFAULT_THEME.palette,
        ...palette,
      },
      font: {
        ...DEFAULT_THEME.font,
        ...font,
      },
    });
  }, [palette, font]);

  const memo = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme, setTheme],
  );

  return <ThemeContext.Provider value={memo}>{children}</ThemeContext.Provider>;
}
