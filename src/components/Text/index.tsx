import React, { useContext } from 'react';
import { Text as RNText } from 'react-native';
import { Style } from './style';
import { IPaletteState, ThemeContext } from '../../provider';

export interface IText {
  variant?: IPaletteState;
  bold?: boolean;
  center?: boolean;
  justify?: boolean;
  fontSize?: number;
  children: any;
  style?: object;
  [x: string]: any;
}

const Text = ({
  bold = false,
  center = false,
  justify = false,
  fontSize = 14,
  variant = 'black',
  children,
  style,
  ...rest
}: IText) => {
  const {
    theme: { palette, font },
  } = useContext(ThemeContext);

  const prepareFontFamily = bold ? font.bold : font.regular;

  const { textStyle } = Style({
    variant,
    palette,
    bold,
    fontSize,
    center,
    justify,
    fontFamily: prepareFontFamily,
  });

  return (
    <RNText style={{ ...textStyle, ...style }} {...rest}>
      {children}
    </RNText>
  );
};

export default Text;
