import { useCallback } from "react";
import { useQuery } from "@apollo/client/react";
import { NetworkStatus } from "@apollo/client";
import { GET_PRODUCTS, GET_PRODUCT, GET_RELATED_PRODUCTS } from "./queries";
import { mapGQLToProduct, mapGQLToProductDetail } from "./types";

export const useGetProducts = (first: number) => {
  const result = useQuery(GET_PRODUCTS, {
    variables: { first },
    notifyOnNetworkStatusChange: true,
  });

  const fetchNextPage = useCallback(async () => {
    const endCursor = result.data?.products.pageInfo.endCursor;
    if (!endCursor) return;
    await result.fetchMore({ variables: { first, after: endCursor } });
  }, [result, first]);

  return {
    data: result.data?.products.edges.map((e) => mapGQLToProduct(e.node)) ?? [],
    isLoading: result.networkStatus === NetworkStatus.loading,
    isError: !!result.error,
    isRefetching: result.networkStatus === NetworkStatus.refetch,
    isFetchingNextPage: result.networkStatus === NetworkStatus.fetchMore,
    hasNextPage: result.data?.products.pageInfo.hasNextPage ?? false,
    fetchNextPage,
    refetch: result.refetch,
  };
};

export const useGetProduct = (productId: number) => {
  const id = `gid://shopify/Product/${productId}`;
  const result = useQuery(GET_PRODUCT, { variables: { id } });

  return {
    data: result.data?.product
      ? mapGQLToProductDetail(result.data.product)
      : undefined,
    isLoading: result.loading,
    isError: !!result.error,
    refetch: result.refetch,
  };
};

export const useGetRelatedProducts = (productType: string, excludeId: number) => {
  const result = useQuery(GET_RELATED_PRODUCTS, {
    variables: { first: 5, query: `product_type:${productType}` },
    skip: !productType,
  });

  return {
    data:
      result.data?.products.edges
        .map((e) => mapGQLToProduct(e.node))
        .filter((p) => p.id !== excludeId) ?? [],
  };
};
