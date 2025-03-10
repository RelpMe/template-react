import styled from 'styled-components/native';
import MaskInput from 'react-native-mask-input';
import { ErrorOption } from 'react-hook-form';
import { COLORS } from '@src/constants';
import Text from '@src/components/atoms/Text';
import { StyleSheet } from 'react-native';

interface IError {
  error?: ErrorOption;
  disabled?: boolean;
}

interface IStyledText extends IError {
  fillColor?: string;
  labelColor?: string;
}

interface IInputContainer extends IError {
  customBorderColor?: string;
}

interface IInputMask extends IError {
  style?: object;
}

export const InputContainer = styled.View`
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 5px;
`;

export const LabelContainer = styled.View`
  width: 100%;
  margin: 0 0 5px 10px;
`;

export const StyledText = styled(Text)<IStyledText>`
  color: ${({ error, fillColor, labelColor }) =>
    error ? fillColor || COLORS.danger : labelColor || COLORS.black};
`;

export const InputContainerForIcons = styled.View<IInputContainer>`
  width: 100%;
  flex-direction: row;
  height: 50px;
  border-color: ${({ error, customBorderColor }) =>
    error ? COLORS.danger : customBorderColor ? customBorderColor : COLORS.black};
  border-width: 1px;
  border-radius: 10px;
  overflow: hidden;
`;

export const InputMask = styled(MaskInput)<IInputMask>`
  flex-direction: row;
  flex: 1;
  height: 50px;
  padding-left: 15px;
  padding-right: 15px;
  color: ${({ error }) => (error ? COLORS.danger : COLORS.black)};
  background-color: ${({ disabled }) => (disabled ? COLORS.grayLight : COLORS.white)};
  font-size: 15px;
`;

export const IconTouch = styled.TouchableOpacity`
  background-color: ${COLORS.white};
  width: 50px;
  justify-content: center;
  align-items: center;
`;

export const TextArea = styled.TextInput<IError>`
  width: 100%;
  height: 180px;
  padding: 20px;
  color: ${({ error }) => (error ? COLORS.danger : COLORS.black)};
  border-width: 1px;
  border-color: ${({ error }) => (error ? COLORS.danger : COLORS.black)};
  border-radius: 20px;
  background-color: ${({ disabled }) => (disabled ? COLORS.grayLight : COLORS.white)};
  font-size: 15px;
`;

export const ErrorContainer = styled.View`
  width: 100%;
  height: 15px;
  padding-left: 10px;
  margin-top: 2px;
`;

export const controlWidthForSelect = {
  width: '100%',
};

export const styleSheet = StyleSheet.create({
  shadow: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 0,
    elevation: 2,
  },
});
