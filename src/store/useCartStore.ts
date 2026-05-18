import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "../api/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getFinalTotal: () => number;
  getItemCount: () => number;
}

const BULK_DISCOUNT_THRESHOLD = 5000;
const BULK_DISCOUNT_RATE = 0.1;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const { items } = get();
        const existing = items.find((i) => i.product.id === product.id);
        if (existing) {
          if (existing.quantity >= product.stock) return;
          set({
            items: items.map((i) =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({ items: [...items, { product, quantity: 1 }] });
        }
      },

      removeItem: (productId) =>
        set({ items: get().items.filter((i) => i.product.id !== productId) }),

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        const item = get().items.find((i) => i.product.id === productId);
        if (item && quantity > item.product.stock) return;
        set({
          items: get().items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getSubtotal: () =>
        get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),

      // 10% discount when subtotal > $5000
      getFinalTotal: () => {
        const subtotal = get().getSubtotal();
        return subtotal > BULK_DISCOUNT_THRESHOLD
          ? subtotal * (1 - BULK_DISCOUNT_RATE)
          : subtotal;
      },

      getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
