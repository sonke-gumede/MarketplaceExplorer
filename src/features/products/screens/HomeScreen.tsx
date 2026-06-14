import { useCallback, useMemo } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { H5, H6 } from "../../../shared/components/typography";
import {
  Container,
  Header,
  SearchRow,
  SearchBar,
  SearchInput,
  SkeletonGrid,
  StateContainer,
  FooterContainer,
} from "../../../shared/components/containers";
import Button from "../../../shared/components/buttons/Button";
import Chip from "../../../shared/components/chips/Chip";
import CardSkeleton from "../components/CardSkeleton";
import ProductCard from "../components/ProductCard";
import { useFilterStore } from "../store/useFilterStore";
import { useDebounceSearch } from "../hooks/useDebounceSearch";
import SortPicker from "../components/SortPicker";
import { useGetProducts } from "../graphql";
import type { Product } from "../types";

export default function HomeScreen() {
  const theme = useTheme();
  const search = useFilterStore((s) => s.search);
  const setSearch = useFilterStore((s) => s.setSearch);
  const debouncedSearch = useFilterStore((s) => s.debouncedSearch);
  const category = useFilterStore((s) => s.category);
  const setCategory = useFilterStore((s) => s.setCategory);
  const sort = useFilterStore((s) => s.sort);
  const setSort = useFilterStore((s) => s.setSort);

  useDebounceSearch();

  const {
    data: allProducts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useGetProducts(20);

  const allCategories = useMemo(() => {
    const types = Array.from(
      new Set(allProducts.map((p) => p.category).filter(Boolean)),
    );
    return [
      { slug: "", name: "All" },
      ...types.map((t) => ({ slug: t, name: t })),
    ];
  }, [allProducts]);

  const products = useMemo(() => {
    let filtered = allProducts;
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      filtered = filtered.filter((p) => p.title.toLowerCase().includes(q));
    }
    if (category) {
      filtered = filtered.filter((p) => p.category === category);
    }
    if (sort === "price_asc") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sort === "price_desc") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sort === "rating_desc") {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }
    return filtered;
  }, [allProducts, debouncedSearch, category, sort]);

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderProduct = useCallback(
    ({ item }: { item: Product }) => <ProductCard product={item} />,
    [],
  );

  const ListHeader = useCallback(
    () => (
      <FlatList
        horizontal
        data={allCategories}
        keyExtractor={(item) => item.slug}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingVertical: 12,
          gap: 8,
        }}
        renderItem={({ item }) => (
          <Chip
            label={item.name}
            selected={category === item.slug}
            onPress={() => setCategory(item.slug === category ? "" : item.slug)}
          />
        )}
      />
    ),
    [allCategories, category, setCategory],
  );

  const ListEmpty = useCallback(
    () =>
      isLoading ? (
        <SkeletonGrid>
          {Array.from({ length: 2 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </SkeletonGrid>
      ) : isError ? (
        <StateContainer>
          <H5 color="error" weight="semiBold">
            Something went wrong
          </H5>
          <Button label="Retry" size="sm" onPress={() => refetch()} />
        </StateContainer>
      ) : (
        <StateContainer>
          <H5 color="text">No products found</H5>
        </StateContainer>
      ),
    [isLoading, isError, refetch],
  );

  const ListFooter = useCallback(
    () =>
      isFetchingNextPage ? (
        <FooterContainer>
          <ActivityIndicator color={theme.colors.primary} />
        </FooterContainer>
      ) : !hasNextPage && products.length > 0 ? (
        <FooterContainer>
          <H6 color="text">You've seen all products</H6>
        </FooterContainer>
      ) : null,
    [isFetchingNextPage, hasNextPage, products.length, theme.colors.primary],
  );

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
          <SortPicker sort={sort} onSelect={setSort} />
        </SearchRow>
      </Header>

      <FlashList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderProduct}
        numColumns={2}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={ListEmpty}
        ListFooterComponent={ListFooter}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        onRefresh={refetch}
        refreshing={isRefetching && !isLoading}
        contentContainerStyle={{ paddingHorizontal: 6, paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}
