import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import styled from "styled-components/native";
import { H2, H4, H6 } from "../../components/typography";
import {
  Header,
  SearchRow,
  SearchBar,
  SearchInput,
  FilterButton,
} from "../../components/containers";

export default function HomeScreen() {
  const theme = useTheme();
  const [search, setSearch] = useState("");

  return (
    <Screen>
      <Header>
        <Greeting>
          <H4 weight="bold">Find your perfect product</H4>
        </Greeting>

        <SearchRow>
          <SearchBar>
            <Ionicons
              name="search-outline"
              size={18}
              color={theme.colors.text}
              accessible={false}
            />
            <SearchInput
              placeholder="Search products..."
              placeholderTextColor={theme.colors.text}
              value={search}
              onChangeText={setSearch}
              returnKeyType="search"
            />
          </SearchBar>

          <FilterButton>
            <Ionicons
              name="options-outline"
              size={20}
              color={theme.colors.light}
              accessible={false}
            />
          </FilterButton>
        </SearchRow>
      </Header>
    </Screen>
  );
}

const Screen = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.default};
`;

const Greeting = styled.View`
  gap: 4px;
`;
