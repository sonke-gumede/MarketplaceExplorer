import { ReactNode } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";

export interface IconButtonProps
  extends Pick<TouchableOpacityProps, "onPress" | "disabled"> {
  icon: ReactNode;
  size?: "sm" | "md";
  variant?: "default" | "primary" | "ghost";
}

export default function IconButton({
  icon,
  size = "sm",
  variant = "default",
  disabled = false,
  onPress,
}: IconButtonProps) {
  if (variant === "ghost") {
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.7}>
        {icon}
      </TouchableOpacity>
    );
  }

  return (
    <StyledButton
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      size={size}
      $variant={variant}
    >
      {icon}
    </StyledButton>
  );
}

const StyledButton = styled.TouchableOpacity<{
  size: "sm" | "md";
  $variant: "default" | "primary";
}>`
  width: ${({ size }) => (size === "sm" ? "26px" : "48px")};
  height: ${({ size }) => (size === "sm" ? "26px" : "48px")};
  border-radius: ${({ size }) => (size === "sm" ? "8px" : "12px")};
  background-color: ${({ theme, $variant }) =>
    $variant === "primary" ? theme.colors.primary : theme.colors.default};
  align-items: center;
  justify-content: center;
`;
