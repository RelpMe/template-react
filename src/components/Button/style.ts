import { StyleSheet } from 'react-native';
import { IPalette, IPaletteState } from '../../provider';

type TButtonTypes = 'FILLED' | 'OUTLINE' | 'LINK';

type TButtonSizes = 'NORMAL' | 'SMALL';

interface IStyledText {
  variant: IPaletteState;
  type: TButtonTypes;
  size: TButtonSizes;
  disabled: boolean;
  palette: IPalette;
}

export const Style = ({ variant, type, size, disabled, palette }: IStyledText) => {
  const backgroundColor =
    type === 'FILLED' ? (disabled ? palette.grayLight : palette[variant]) : palette.transparent;

  const borderDetails =
    type === 'OUTLINE'
      ? {
          borderWidth: 1,
          borderColor: palette[variant],
        }
      : {};

  return StyleSheet.create({
    buttonStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      borderRadius: 50,
      width: '100%',
      height: size === 'NORMAL' ? 40 : 30,
      backgroundColor,
      ...borderDetails,
    },
  });
};
