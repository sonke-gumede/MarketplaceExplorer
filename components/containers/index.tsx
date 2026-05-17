import { TextInput } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.default};
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.light};
  padding: 20px 20px 24px;
  gap: 20px;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
`;

export const SearchRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const SearchBar = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.default};
  border-radius: 12px;
  padding: 0 14px;
  height: 48px;
  gap: 10px;
`;

export const SearchInput = styled(TextInput)`
  flex: 1;
  font-size: ${({ theme }) => theme.fonts.size.medium}px;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.family};
`;

export const FilterButton = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
`;
