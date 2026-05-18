import { memo } from "react";
import styled from "styled-components/native";
import { H6 } from "../typography";

interface Props {
  label: string;
  selected: boolean;
  onPress: () => void;
}

const Chip = memo(({ label, selected, onPress }: Props) => (
  <ChipButton onPress={onPress} selected={selected} activeOpacity={0.75}>
    <H6
      color={selected ? "light" : "black"}
      weight={selected ? "semiBold" : "regular"}
    >
      {label}
    </H6>
  </ChipButton>
));

export default Chip;

const ChipButton = styled.TouchableOpacity<{ selected: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.primary : theme.colors.light};
  border-width: 1px;
  border-color: ${({ theme, selected }) =>
    selected ? theme.colors.primary : theme.colors.lightGrey};
`;
