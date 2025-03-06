import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Control, ErrorOption, useController } from 'react-hook-form';
import RNPickerSelect from 'react-native-picker-select';
import { IconChevronDown } from '@tabler/icons-react-native';
import {
  controlWidthForSelect,
  ErrorContainer,
  InputContainer,
  InputContainerForIcons,
  LabelContainer,
  StyledText,
} from '@src/components/@styledCommon';
import { COLORS } from '@src/constants';
import { ChevronContainer, StyledView, TextValueContainer } from './style';
import Text from '../Text';

export interface IOptionSelect {
  label: any;
  value: any;
  [x: string]: any;
}

export interface ISelect {
  name?: string;
  label?: string;
  value?: IOptionSelect;
  defaultValue?: IOptionSelect;
  placeholder?: string | undefined;
  error?: ErrorOption;
  options: IOptionSelect[];
  onChange?: (option: IOptionSelect) => void;
  control?: Control | undefined;
}

export interface ISelectRefProps {
  resetField: () => void;
  updateField: (option: IOptionSelect) => void;
}

const Select = forwardRef<ISelectRefProps | undefined, ISelect>(
  (
    {
      name = 'input',
      label = '',
      value,
      defaultValue,
      placeholder = '',
      error,
      options = [],
      onChange = () => {},
      control,
    },
    ref,
  ) => {
    const { field } = useController({ control, defaultValue: null, name });

    const [prepareValue, setPrepareValue] = useState<IOptionSelect | null>(
      value || defaultValue || null,
    );

    useEffect(() => {
      const prepare = value || defaultValue || null;
      setPrepareValue(prepare);
    }, [value, defaultValue]);

    const handleChange = (v: any) => {
      const item = options.filter((elm) => elm.value === v)[0];
      setPrepareValue(item);
      onChange(item);

      if (field?.onChange) {
        field.onChange(item);
      }
    };

    const resetField = () => {
      setPrepareValue(null);
    };

    const updateField = (option: IOptionSelect) => {
      if (option) {
        setPrepareValue(option?.label);
        handleChange(option?.value);
      }
    };

    useImperativeHandle(ref, () => ({
      resetField,
      updateField,
    }));

    return (
      <InputContainer>
        <LabelContainer>
          <StyledText error={error}>{label}</StyledText>
        </LabelContainer>
        <RNPickerSelect
          onValueChange={handleChange}
          useNativeAndroidPickerStyle
          placeholder={{
            label: label ?? 'Selecionar',
          }}
          Icon={() => <IconChevronDown color={COLORS.black} />}
          pickerProps={{
            mode: 'dropdown',
          }}
          items={options}
        >
          <InputContainerForIcons error={error}>
            <StyledView style={controlWidthForSelect}>
              <TextValueContainer>
                <Text color={error ? COLORS.danger : COLORS.black}>
                  {prepareValue?.label || placeholder || ''}
                </Text>
              </TextValueContainer>
              <ChevronContainer>
                <IconChevronDown color={COLORS.black} />
              </ChevronContainer>
            </StyledView>
          </InputContainerForIcons>
        </RNPickerSelect>
        <ErrorContainer>
          {error && (
            <StyledText error={error} fontSize={11}>
              {error?.message || ''}
            </StyledText>
          )}
        </ErrorContainer>
      </InputContainer>
    );
  },
);

export default Select;
