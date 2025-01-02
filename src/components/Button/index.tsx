import { ReactNode, useContext } from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';

import { IPaletteState, ThemeContext } from '../../provider';
import Text from '../Text';
import { Style } from './style';

export type TButtonVariants = IPaletteState;

export type TButtonTypes = 'FILLED' | 'OUTLINE' | 'LINK';

export type TButtonSizes = 'NORMAL' | 'SMALL';

export interface ICustomStyles {
  button?: object;
  text?: object;
  icon?: object;
}

export interface IButton {
  title?: string;
  accessibilityLabel?: string;
  variant?: TButtonVariants;
  type?: TButtonTypes;
  size?: TButtonSizes;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  customStyles?: ICustomStyles;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

const Button = (props: IButton) => {
  const {
    title,
    accessibilityLabel,
    variant = 'primary',
    type = 'FILLED',
    size = 'NORMAL',
    onPress = () => {},
    disabled = false,
    loading = false,
    customStyles = {
      button: {},
      text: {},
      icon: {},
    },
    iconLeft,
    iconRight,
    ...others
  } = props;

  const {
    theme: { palette },
  } = useContext(ThemeContext);

  const isDisabled = disabled || loading;

  const getAccessibilityLabel = () => {
    if (accessibilityLabel) {
      return accessibilityLabel;
    }
    return `${title}`;
  };

  const getLoadingColor = () => {
    switch (type) {
      case 'FILLED':
        return palette.white;
      case 'OUTLINE':
      case 'LINK':
        return palette[variant];
      default:
        return palette.white;
    }
  };

  const { buttonStyle } = Style({ variant, palette, disabled, type, size });

  return (
    <TouchableOpacity
      style={{ ...buttonStyle, ...customStyles.button }}
      onPress={isDisabled ? () => {} : onPress}
      accessibilityLabel={getAccessibilityLabel()}
      accessibilityRole={type === 'LINK' ? 'link' : 'button'}
      accessibilityHint="Press here"
      accessibilityState={{ disabled: isDisabled }}
      {...others}
    >
      {iconLeft && iconLeft}
      {!loading ? (
        <Text variant={type === 'FILLED' ? 'white' : variant} style={{ ...customStyles.text }}>
          {title || ''}
        </Text>
      ) : (
        <ActivityIndicator color={getLoadingColor()} size={size === 'SMALL' ? 'small' : 'large'} />
      )}
      {iconRight && iconRight}
    </TouchableOpacity>
  );
};

export default Button;
