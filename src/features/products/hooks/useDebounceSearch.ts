import { useEffect } from "react";
import { useFilterStore } from "../store/useFilterStore";

export const useDebounceSearch = (delay = 400) => {
  const search = useFilterStore((s) => s.search);
  const setDebouncedSearch = useFilterStore((s) => s.setDebouncedSearch);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), delay);
    return () => clearTimeout(timer);
  }, [search, delay]);
};
