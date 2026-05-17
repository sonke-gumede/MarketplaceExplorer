import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  fetchProducts,
  fetchCategories,
  PAGE_LIMIT,
  SortBy,
  SortOrder,
} from "../api/products";
import { useFilterStore } from "../store/useFilterStore";

const sortParams = (
  sort: string
): { sortBy: SortBy; order: SortOrder } => {
  if (sort === "price_asc") return { sortBy: "price", order: "asc" };
  if (sort === "price_desc") return { sortBy: "price", order: "desc" };
  if (sort === "rating_desc") return { sortBy: "rating", order: "desc" };
  return { sortBy: "", order: "asc" };
};

export const useProducts = () => {
  const debouncedSearch = useFilterStore((s) => s.debouncedSearch);
  const category = useFilterStore((s) => s.category);
  const sort = useFilterStore((s) => s.sort);
  const { sortBy, order } = sortParams(sort);

  return useInfiniteQuery({
    queryKey: ["products", debouncedSearch, category, sort],
    queryFn: ({ pageParam }) =>
      fetchProducts({
        pageParam: pageParam as number,
        search: debouncedSearch,
        category,
        sortBy,
        order,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + PAGE_LIMIT;
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: Infinity,
  });
