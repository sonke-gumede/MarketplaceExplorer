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

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
}

export interface ProductDetail extends Product {
  reviews: Review[];
  availabilityStatus: string;
  warrantyInformation?: string;
  shippingInformation?: string;
  returnPolicy?: string;
  tags?: string[];
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export type SortBy = "price" | "rating" | "";
export type SortOrder = "asc" | "desc";
export type SortOption = "price_asc" | "price_desc" | "rating_desc" | "";
