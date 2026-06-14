import { create } from "zustand";
import type { SortOption } from "../types";

interface FilterState {
  search: string;
  debouncedSearch: string;
  category: string;
  sort: SortOption;
  setSearch: (search: string) => void;
  setDebouncedSearch: (search: string) => void;
  setCategory: (category: string) => void;
  setSort: (sort: SortOption) => void;
  reset: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  search: "",
  debouncedSearch: "",
  category: "",
  sort: "",
  setSearch: (search) => set({ search }),
  setDebouncedSearch: (debouncedSearch) => set({ debouncedSearch }),
  setCategory: (category) => set({ category }),
  setSort: (sort) => set({ sort }),
  reset: () => set({ search: "", debouncedSearch: "", category: "", sort: "" }),
}));
