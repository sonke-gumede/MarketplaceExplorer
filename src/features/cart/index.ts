// Screens
export { default as CartScreen } from "./screens/CartScreen";

// Components
export { default as CartCard } from "./components/CartCard";
export type { CartCardProps } from "./components/CartCard";
export { default as CartSummaryCard } from "./components/CartSummaryCard";
export type { CartSummaryCardProps } from "./components/CartSummaryCard";

// Store (cart ID persistence only)
export { useCartStore } from "./store/useCartStore";

// GraphQL hooks
export {
  useCart,
  useAddToCart,
  useUpdateCartLine,
  useRemoveCartLine,
  useClearCart,
} from "./graphql";

// GraphQL types
export type { Cart, CartLine } from "./graphql/types";

// Product rules
export {
  isPremium,
  isLowStock,
  canAddToCart,
  BULK_DISCOUNT_THRESHOLD,
  BULK_DISCOUNT_RATE,
} from "./utils/productRules";
