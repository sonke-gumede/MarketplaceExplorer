import { useCallback, useMemo } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { H5, H6 } from "../../components/typography";
import {
  Container,
  Header,
  SearchRow,
  SearchBar,
  SearchInput,
  SkeletonGrid,
  StateContainer,
  FooterContainer,
} from "../../components/containers";
import Button from "../../components/buttons/Button";
import Chip from "../../components/chips/Chip";
import CardSkeleton from "../../components/cards/CardSkeleton";
import ProductCard from "../../containers/products/ProductCard";
import { useProducts, useCategories } from "../../hooks/useProducts";
import { useFilterStore } from "../../store/useFilterStore";
import { useDebounceSearch } from "../../hooks/useDebounceSearch";
import SortPicker from "../../components/sort/SortPicker";
import { Product } from "../../api/products";

export default function HomeScreen() {
  const theme = useTheme();
  const search = useFilterStore((s) => s.search);
  const setSearch = useFilterStore((s) => s.setSearch);
  const category = useFilterStore((s) => s.category);
  const setCategory = useFilterStore((s) => s.setCategory);
  const sort = useFilterStore((s) => s.sort);
  const setSort = useFilterStore((s) => s.setSort);

  useDebounceSearch();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useProducts();

  const { data: categoriesData } = useCategories();

  const products = useMemo(
    () => data?.pages.flatMap((p) => p.products) ?? [],
    [data],
  );

  const allCategories = useMemo(
    () => [{ slug: "", name: "All" }, ...(categoriesData ?? [])],
    [categoriesData],
  );

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
        estimatedItemSize={310}
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
