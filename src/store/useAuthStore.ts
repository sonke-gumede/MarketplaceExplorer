import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface AuthUser {
  email: string;
  name: string;
}

interface AuthState {
  user: AuthUser | null;
  hydrated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  _setHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      hydrated: false,

      login: (email, _password) => {
        const name = email.split("@")[0].replace(/[._]/g, " ");
        set({ user: { email, name } });
      },

      logout: () => set({ user: null }),

      _setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ user: state.user }),
      onRehydrateStorage: () => (state) => state?._setHydrated(),
    }
  )
);
