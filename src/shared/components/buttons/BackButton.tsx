import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import styled from "styled-components/native";

interface BackButtonProps extends Pick<TouchableOpacityProps, "onPress"> {}

export default function BackButton({ onPress }: BackButtonProps) {
  const theme = useTheme();
  return (
    <Circle onPress={onPress} activeOpacity={0.8}>
      <Ionicons
        name="arrow-back"
        size={20}
        color={theme.colors.black}
        accessible={false}
      />
    </Circle>
  );
}

const Circle = styled.TouchableOpacity`
  position: absolute;
  top: 16px;
  left: 16px;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: rgba(255, 255, 255, 0.92);
  align-items: center;
  justify-content: center;
  z-index: 10;
`;
