import { StyleSheet } from 'react-native';
import { IPalette, IPaletteState } from '../../provider';

interface IStyledText {
  variant: IPaletteState;
  bold: boolean;
  center: boolean;
  justify: boolean;
  fontSize: number;
  fontFamily: string;
  palette: IPalette;
}

export const Style = ({
  variant,
  center,
  justify,
  fontSize,
  palette,
  bold,
  fontFamily,
}: IStyledText) => {
  return StyleSheet.create({
    textStyle: {
      color: palette[variant],
      textAlign: center ? 'center' : justify ? 'justify' : 'left',
      fontSize,
      fontWeight: bold ? '700' : '400',
      fontFamily,
    },
  });
};
