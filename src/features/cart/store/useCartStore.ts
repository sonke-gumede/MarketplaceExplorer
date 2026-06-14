import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface CartState {
  cartId: string | null;
  setCartId: (id: string) => void;
  clearCartId: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartId: null,
      setCartId: (cartId) => set({ cartId }),
      clearCartId: () => set({ cartId: null }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
