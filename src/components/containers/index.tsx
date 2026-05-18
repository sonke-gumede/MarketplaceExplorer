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


export const SkeletonGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 6px;
`;

export const StateContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  gap: 16px;
`;


export const FooterContainer = styled.View`
  align-items: center;
  padding: 20px;
`;

export const Section = styled.View`
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: 20px;
  padding: 16px;
  gap: 12px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.05;
  shadow-radius: 6px;
`;

export const SectionHeader = styled.View`
  flex-direction: row;
  align-items: center;
  padding-bottom: 4px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.lightGrey};
`;

export const InfoRowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const IconBox = styled.View`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.default};
  align-items: center;
  justify-content: center;
`;

export const InfoText = styled.View`
  gap: 1px;
`;
