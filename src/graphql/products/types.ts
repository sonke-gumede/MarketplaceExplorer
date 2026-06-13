import { Product, ProductDetail } from "../../api/products";

export interface GetProductsVariables {
  first: number;
  after?: string;
}

export interface GetProductsData {
  products: {
    edges: Array<{ node: GQLProductNode }>;
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
  };
}

export interface GQLVariantNode {
  id: string;
  title: string;
  availableForSale: boolean;
  price: { amount: string };
  compareAtPrice: { amount: string } | null;
}

export interface GQLProductNode {
  id: string;
  title: string;
  description: string;
  handle: string;
  productType: string;
  vendor: string;
  tags: string[];
  featuredImage: { url: string } | null;
  priceRange: { minVariantPrice: { amount: string } };
  variants: { edges: Array<{ node: GQLVariantNode }> };
}

export interface GQLProductDetailNode extends GQLProductNode {
  images: { edges: Array<{ node: { url: string } }> };
}

export interface GetProductVariables {
  id: string;
}

export interface GetProductData {
  product: GQLProductDetailNode | null;
}

export interface GetRelatedProductsVariables {
  first: number;
  query: string;
}

export interface GetRelatedProductsData {
  products: {
    edges: Array<{ node: GQLProductNode }>;
  };
}

export const mapGQLToProduct = (node: GQLProductNode): Product => {
  const variant = node.variants.edges[0]?.node;
  const price = parseFloat(
    variant?.price.amount ?? node.priceRange.minVariantPrice.amount,
  );
  const compareAt = variant?.compareAtPrice
    ? parseFloat(variant.compareAtPrice.amount)
    : 0;
  const discountPercentage =
    compareAt > price ? ((compareAt - price) / compareAt) * 100 : 0;
  const stock = node.variants.edges.some((e) => e.node.availableForSale)
    ? 99
    : 0;
  const id = parseInt(node.id.split("/").pop() ?? "0");

  return {
    id,
    title: node.title,
    description: node.description,
    category: node.productType || "General",
    brand: node.vendor || undefined,
    price,
    discountPercentage,
    rating: 4.0,
    stock,
    thumbnail: node.featuredImage?.url ?? "",
    images: node.featuredImage ? [node.featuredImage.url] : [],
  };
};

export const mapGQLToProductDetail = (node: GQLProductDetailNode): ProductDetail => {
  const base = mapGQLToProduct(node);
  const imageUrls = node.images.edges.map((e) => e.node.url);
  return {
    ...base,
    thumbnail: imageUrls[0] ?? node.featuredImage?.url ?? "",
    images: imageUrls.length > 0 ? imageUrls : base.images,
    reviews: [],
    availabilityStatus: base.stock > 0 ? "In Stock" : "Out of Stock",
    tags: node.tags,
  };
};
