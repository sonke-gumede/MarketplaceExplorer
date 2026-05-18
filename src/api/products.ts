const BASE_URL = "https://dummyjson.com";
export const PAGE_LIMIT = 20;

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export interface Product {
  id: number;
  title: string;
  brand?: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images: string[];
  description: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export type SortBy = "price" | "rating" | "";
export type SortOrder = "asc" | "desc";

interface FetchProductsParams {
  pageParam?: number;
  search?: string;
  category?: string;
  sortBy?: SortBy;
  order?: SortOrder;
}

export const fetchProducts = async ({
  pageParam = 0,
  search = "",
  category = "",
  sortBy = "",
  order = "asc",
}: FetchProductsParams): Promise<ProductsResponse> => {
  const params: Record<string, string> = {
    limit: String(PAGE_LIMIT),
    skip: String(pageParam),
  };
  if (sortBy) {
    params.sortBy = sortBy;
    params.order = order;
  }
  const query = new URLSearchParams(params).toString();

  let url: string;
  if (search) {
    url = `${BASE_URL}/products/search?q=${encodeURIComponent(search)}&${query}`;
  } else if (category) {
    url = `${BASE_URL}/products/category/${encodeURIComponent(category)}?${query}`;
  } else {
    url = `${BASE_URL}/products?${query}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export const fetchCategories = async (): Promise<Category[]> => {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};
