import styled from 'styled-components/native';
import { ErrorOption } from 'react-hook-form';
import { COLORS } from '@src/constants';

interface IStyledView {
  style?: object;
}

interface ITextValueContainer {
  error?: ErrorOption;
}

export const ChevronContainer = styled.View`
  margin: auto 10px auto auto;
`;

export const StyledView = styled.View<IStyledView>`
  width: 100%;
  flex-direction: row;
`;

export const TextValueContainer = styled.View<ITextValueContainer>`
  height: 50px;
  padding-left: 15px;
  padding-right: 15px;
  justify-content: center;
  color: ${({ error }) => (error ? COLORS.danger : COLORS.black)};
`;
