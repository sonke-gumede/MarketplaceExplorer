import { ReactNode } from "react";
import { TextInputProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import styled from "styled-components/native";
import { H6 } from "../typography";

export interface InputProps
  extends Pick<
    TextInputProps,
    | "value"
    | "onChangeText"
    | "placeholder"
    | "secureTextEntry"
    | "keyboardType"
    | "autoCapitalize"
    | "autoCorrect"
  > {
  label: string;
  icon?: string;
  rightElement?: ReactNode;
}

export default function Input({
  label,
  icon,
  rightElement,
  ...rest
}: InputProps) {
  const theme = useTheme();
  return (
    <FieldGroup>
      <H6 color="text">{label}</H6>
      <InputRow>
        {icon && (
          <Ionicons
            name={icon as any}
            size={18}
            color={theme.colors.text}
            accessible={false}
          />
        )}
        <StyledInput placeholderTextColor={theme.colors.text} {...rest} />
        {rightElement}
      </InputRow>
    </FieldGroup>
  );
}

const FieldGroup = styled.View`
  gap: 6px;
`;

const InputRow = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.default};
  border-radius: 12px;
  padding: 0 14px;
  height: 50px;
  gap: 10px;
`;

const StyledInput = styled.TextInput`
  flex: 1;
  font-size: ${({ theme }) => theme.fonts.size.medium}px;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.family};
`;
