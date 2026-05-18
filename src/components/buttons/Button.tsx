import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";
import { H5, H6 } from "../typography";

export interface ButtonProps
  extends Pick<TouchableOpacityProps, "onPress" | "disabled"> {
  label: string;
  variant?: "primary" | "ghost";
  size?: "md" | "sm";
  danger?: boolean;
}

export default function Button({
  label,
  variant = "primary",
  size = "md",
  danger = false,
  disabled = false,
  onPress,
}: ButtonProps) {
  if (variant === "ghost") {
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.7}>
        <H6 color={danger ? "error" : "primary"}>{label}</H6>
      </TouchableOpacity>
    );
  }

  const Label = size === "sm" ? H6 : H5;

  return (
    <PrimaryButton
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      size={size}
      $disabled={disabled}
    >
      <Label color="light" weight="semiBold">
        {label}
      </Label>
    </PrimaryButton>
  );
}

const PrimaryButton = styled.TouchableOpacity<{
  size: "md" | "sm";
  $disabled: boolean;
}>`
  align-items: center;
  border-radius: ${({ size }) => (size === "sm" ? "12px" : "14px")};
  padding: ${({ size }) => (size === "sm" ? "12px 32px" : "16px")};
  background-color: ${({ theme, $disabled }) =>
    $disabled ? theme.colors.lightGrey : theme.colors.primary};
`;
