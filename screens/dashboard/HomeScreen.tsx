import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

import {
  Header,
  SearchRow,
  SearchBar,
  SearchInput,
  FilterButton,
  Container,
} from "../../components/containers";

export default function HomeScreen() {
  const theme = useTheme();
  const [search, setSearch] = useState("");

  return (
    <Container>
      <Header>
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
    </Container>
  );
}
