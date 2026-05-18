import { memo, useState } from "react";
import { Modal, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled, { useTheme } from "styled-components/native";
import { H5, H6 } from "../typography";
import { SortOption } from "../../store/useFilterStore";

interface Option {
  value: SortOption;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const OPTIONS: Option[] = [
  { value: "price_asc", label: "Price: Low to High", icon: "arrow-up-outline" },
  { value: "price_desc", label: "Price: High to Low", icon: "arrow-down-outline" },
  { value: "rating_desc", label: "Highest Rated", icon: "star-outline" },
];

interface Props {
  sort: SortOption;
  onSelect: (sort: SortOption) => void;
}

const SortPicker = memo(({ sort, onSelect }: Props) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleSelect = (value: SortOption) => {
    onSelect(sort === value ? "" : value);
    setOpen(false);
  };

  return (
    <>
      <SortButton onPress={() => setOpen(true)} activeOpacity={0.75} active={!!sort}>
        <Ionicons
          name="funnel-outline"
          size={18}
          color={sort ? theme.colors.primary : theme.colors.text}
        />
      </SortButton>

      <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <Backdrop />
        </TouchableWithoutFeedback>

        <Sheet>
          <Handle />
          <H5 weight="semiBold" style={{ marginBottom: 8 }}>Sort By</H5>

          {OPTIONS.map((opt) => {
            const active = sort === opt.value;
            return (
              <OptionRow key={opt.value} onPress={() => handleSelect(opt.value)} activeOpacity={0.7} active={active}>
                <Ionicons
                  name={opt.icon}
                  size={18}
                  color={active ? theme.colors.primary : theme.colors.text}
                />
                <H6
                  color={active ? "primary" : "text"}
                  weight={active ? "semiBold" : "regular"}
                  style={{ flex: 1 }}
                >
                  {opt.label}
                </H6>
                {active && (
                  <Ionicons name="checkmark" size={18} color={theme.colors.primary} />
                )}
              </OptionRow>
            );
          })}
        </Sheet>
      </Modal>
    </>
  );
});

export default SortPicker;

const SortButton = styled.TouchableOpacity<{ active: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: ${({ theme, active }) => active ? theme.colors.primary + "1A" : theme.colors.default};
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.lightGrey};
`;

const Backdrop = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.35);
`;

const Sheet = styled.View`
  background-color: ${({ theme }) => theme.colors.light};
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: 16px 20px 36px;
  gap: 4px;
`;

const Handle = styled.View`
  width: 40px;
  height: 4px;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  align-self: center;
  margin-bottom: 16px;
`;

const OptionRow = styled.TouchableOpacity<{ active: boolean }>`
  flex-direction: row;
  align-items: center;
  gap: 14px;
  padding: 14px 12px;
  border-radius: 12px;
  background-color: ${({ theme, active }) => active ? theme.colors.primary + "0F" : "transparent"};
`;
