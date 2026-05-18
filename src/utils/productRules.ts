import { Product } from "../api/products";

// Rule A: Premium if rating >= 4.5 AND price >= $1000
export const isPremium = (p: Product) => p.rating >= 4.5 && p.price >= 1000;

// Rule B: Low stock if 0 < stock < 10
export const isLowStock = (p: Product) => p.stock > 0 && p.stock < 10;

// Rule C: Cannot add to cart if out of stock OR rating < 3
export const canAddToCart = (p: Product) => p.stock > 0 && p.rating >= 3;

// Rule D: 10% bulk discount when cart subtotal > $5000 (handled in useCartStore)
export const BULK_DISCOUNT_THRESHOLD = 5000;
export const BULK_DISCOUNT_RATE = 0.1;
