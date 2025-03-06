import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Mask, Masks } from 'react-native-mask-input';
import { Control, ErrorOption, useController } from 'react-hook-form';
import { IconEyeOff, IconEyeCheck } from '@tabler/icons-react-native';
import {
  ErrorContainer,
  IconTouch,
  InputContainer,
  InputContainerForIcons,
  InputMask,
  LabelContainer,
  StyledText,
  TextArea,
} from '@src/components/@styledCommon';
import { COLORS } from '@src/constants';

export interface IInputRefProps {
  resetField: () => void;
  updateField: (v: string) => void;
}

export interface IField {
  onChange: (v: any) => void;
}

export interface IInput {
  name?: string;
  label?: string;
  labelColor?: string;
  value?: string | undefined | null;
  defaultValue?: string;
  mask?: Mask | undefined;
  textArea?: boolean;
  error?: ErrorOption;
  onChange?: (text: string) => void;
  control?: Control | undefined;
  placeholder?: string | undefined;
  autoCapitalize?: 'characters' | 'words' | 'sentences' | 'none';
  customStylesContainer?: object;
  customBorderColor?: string;
  secureTextEntry?: boolean;
  disabled?: boolean;
  hasErrorMessage?: boolean;
  customStyle?: {
    container: {};
    input: {};
  };
  [x: string]: any;
  keyboardType?:
    | 'decimal-pad'
    | 'default'
    | 'email-address'
    | 'name-phone-pad'
    | 'number-pad'
    | 'numbers-and-punctuation'
    | 'numeric'
    | 'phone-pad'
    | 'twitter'
    | 'url'
    | 'visible-password'
    | 'web-search';
}

interface IInputDefault extends Omit<IInput, 'control' | 'name'> {
  field: IField;
}

interface IInputValidation extends IInput {}

const InputDefault = forwardRef<IInputRefProps | undefined, IInputDefault>(
  (
    {
      label = '',
      labelColor = null,
      value = '',
      defaultValue,
      mask,
      textArea = false,
      error,
      onChange = () => {},
      field,
      placeholder,
      autoCapitalize = 'none',
      keyboardType = KEYBOARD_TYPE.TEXT,
      customStylesContainer = {},
      customBorderColor,
      secureTextEntry = false,
      disabled = false,
      hasErrorMessage,
      customStyle = {
        container: {},
        input: {},
      },
      ...rest
    },
    ref,
  ) => {
    const [prepareValue, setPrepareValue] = useState<string>(value || defaultValue || '');
    const [timerId, setTimerId] = useState<ReturnType<typeof setTimeout>>();
    const [hidePass, setHidePass] = useState(secureTextEntry);

    useEffect(() => {
      const prepare = value || defaultValue || '';
      setPrepareValue(prepare);
    }, [value, defaultValue]);

    const handleChange = (event: string) => {
      setPrepareValue(event);
      if (field?.onChange) {
        if (timerId) {
          clearTimeout(timerId);
        }
        const timer = setTimeout(() => {
          field.onChange(event);
        }, 500);

        setTimerId(timer);
      }
      onChange(event);
    };

    const resetField = () => {
      setPrepareValue('');
    };

    const updateField = (v: string) => {
      handleChange(v);
    };

    useImperativeHandle(ref, () => ({
      resetField,
      updateField,
    }));

    return (
      <InputContainer style={customStylesContainer}>
        {label && (
          <LabelContainer>
            <StyledText error={error} labelColor={labelColor}>
              {label}
            </StyledText>
          </LabelContainer>
        )}
        {!textArea ? (
          <InputContainerForIcons
            error={error}
            customBorderColor={customBorderColor}
            style={customStyle.container}
          >
            <InputMask
              mask={mask}
              error={error}
              value={prepareValue}
              placeholder={placeholder}
              textContentType="oneTimeCode"
              placeholderTextColor={
                error ? COLORS.danger : customBorderColor ? customBorderColor : COLORS.black
              }
              disabled={disabled}
              editable={!disabled}
              onChangeText={handleChange}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
              secureTextEntry={secureTextEntry && hidePass}
              style={customStyle.input}
              {...rest}
            />
            {secureTextEntry ? (
              <IconTouch onPress={() => setHidePass(!hidePass)}>
                {hidePass ? (
                  <IconEyeOff color={COLORS.black} size={28} />
                ) : (
                  <IconEyeCheck color={COLORS.black} size={28} />
                )}
              </IconTouch>
            ) : null}
          </InputContainerForIcons>
        ) : (
          <TextArea
            error={error}
            value={prepareValue}
            placeholderTextColor={error ? COLORS.danger : COLORS.black}
            onChangeText={handleChange}
            keyboardType={KEYBOARD_TYPE.TEXT}
            disabled={disabled}
            editable={!disabled}
            multiline
            style={customStyle.input}
            {...rest}
          />
        )}
        {hasErrorMessage && (
          <ErrorContainer>
            {error && (
              <StyledText error={error} fontSize={11}>
                {error?.message || ''}
              </StyledText>
            )}
          </ErrorContainer>
        )}
      </InputContainer>
    );
  },
);

const ValidationInput = forwardRef<IInputRefProps | undefined, IInputValidation>(
  (
    {
      name = 'input',
      label = '',
      labelColor = null,
      value = '',
      defaultValue,
      mask,
      textArea = false,
      error,
      onChange = () => {},
      control,
      placeholder,
      autoCapitalize = 'none',
      keyboardType = KEYBOARD_TYPE.TEXT,
      customStylesContainer = {},
      customBorderColor,
      secureTextEntry = false,
      disabled = false,
      hasErrorMessage = true,
      customStyle = {
        container: {},
        input: {},
      },
      ...rest
    },
    ref,
  ) => {
    const { field } = useController({ control, defaultValue: '', name });

    return (
      <InputDefault
        ref={ref}
        label={label}
        labelColor={labelColor}
        value={value}
        field={field}
        defaultValue={defaultValue}
        mask={mask}
        textArea={textArea}
        error={error}
        onChange={onChange}
        placeholder={placeholder}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        customStylesContainer={customStylesContainer}
        customBorderColor={customBorderColor}
        secureTextEntry={secureTextEntry}
        disabled={disabled}
        editable={!disabled}
        hasErrorMessage={hasErrorMessage}
        customStyle={customStyle}
        {...rest}
      />
    );
  },
);

const InputWrapper = forwardRef<IInputRefProps | undefined, IInput>(
  (
    {
      name = 'input',
      label = '',
      labelColor = null,
      value = '',
      defaultValue,
      mask,
      textArea = false,
      error,
      onChange = () => {},
      control,
      placeholder,
      autoCapitalize = 'none',
      keyboardType = KEYBOARD_TYPE.TEXT,
      customStylesContainer = {},
      customBorderColor,
      secureTextEntry = false,
      disabled = false,
      hasErrorMessage = true,
      customStyle = {
        container: {},
        input: {},
      },
      ...rest
    },
    ref,
  ) => {
    return control ? (
      <ValidationInput
        ref={ref}
        name={name}
        label={label}
        labelColor={labelColor}
        value={value}
        defaultValue={defaultValue}
        mask={mask}
        textArea={textArea}
        error={error}
        onChange={onChange}
        control={control}
        placeholder={placeholder}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        customStylesContainer={customStylesContainer}
        customBorderColor={customBorderColor}
        secureTextEntry={secureTextEntry}
        disabled={disabled}
        hasErrorMessage={hasErrorMessage}
        customStyle={customStyle}
        {...rest}
      />
    ) : (
      <InputDefault
        ref={ref}
        label={label}
        labelColor={labelColor}
        value={value}
        field={{ onChange: () => {} }}
        defaultValue={defaultValue}
        mask={mask}
        textArea={textArea}
        error={error}
        onChange={onChange}
        placeholder={placeholder}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        customStylesContainer={customStylesContainer}
        customBorderColor={customBorderColor}
        secureTextEntry={secureTextEntry}
        disabled={disabled}
        hasErrorMessage={hasErrorMessage}
        customStyle={customStyle}
        {...rest}
      />
    );
  },
);

export const KEYBOARD_TYPE = {
  DECIMAL: 'decimal-pad',
  TEXT: 'default',
  EMAIL: 'email-address',
  NAME_PHONE: 'name-phone-pad',
  NUMBER_PAD: 'number-pad',
  NUMBERS_AND_PUNCTUATION: 'numbers-and-punctuation',
  NUMERIC: 'numeric',
  PHONE: 'phone-pad',
  TWITTER: 'twitter',
  URL: 'url',
  VISIBLE_PASSWORD: 'visible-password',
  WEB_SEARCH: 'web-search',
} as const;

const DATE_MMYYYY = (text = '') => {
  const cleanText = text.replace(/\D+/g, '');

  let secondDigitMonthMask = /\d/;

  if (cleanText.charAt(0) === '0') {
    secondDigitMonthMask = /[1-9]/;
  }
  if (cleanText.charAt(0) === '1') {
    secondDigitMonthMask = /[012]/;
  }

  return [/[0-1]/, secondDigitMonthMask, '/', /\d/, /\d/, /\d/, /\d/];
};

const DATE_MMYY = (text = '') => {
  const cleanText = text.replace(/\D+/g, '');

  let secondDigitMonthMask = /\d/;

  if (cleanText.charAt(0) === '0') {
    secondDigitMonthMask = /[1-9]/;
  }
  if (cleanText.charAt(0) === '1') {
    secondDigitMonthMask = /[012]/;
  }

  return [/[0-1]/, secondDigitMonthMask, '/', /\d/, /\d/];
};

const CVC = [/[0-9]/, /[0-9]/, /[0-9]/];

const PROCESS_NUMBER_MASK = [
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/, // número sequencial do processo por unidade de origem. É reiniciado a cada ano.
  '-',
  /\d/,
  /\d/, // dígito verificador
  '.',
  /\d/,
  /\d/,
  /\d/,
  /\d/, // ano do ajuizamento do processo
  '.',
  /\d/, // órgão ou segmento do Poder Judiciário.
  '.',
  /\d/,
  /\d/, // tribunal do respectivo segmento do Poder Judiciário e, na Justiça Militar da União, a Circunscrição Judiciária
  '.',
  /\d/,
  /\d/,
  /\d/,
  /\d/, // unidade de origem do processo
];

export const MASKS = { DATE_MMYYYY, DATE_MMYY, CVC, PROCESS_NUMBER_MASK, ...Masks };

export default InputWrapper;
