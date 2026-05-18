# MarketplaceExplorer

A React Native marketplace app built with Expo SDK 54, featuring product browsing, search, category filtering, sorting, and cart management.

---

## Setup Instructions

**Prerequisites**

- Node.js 22+
- Yarn
- Expo Go app (iOS or Android) — or a simulator/emulator

**Install and run**

```bash
yarn install
yarn start
```

Scan the QR code with Expo Go, or press `a` for Android emulator / `i` for iOS simulator.

---

## Project Structure

```
MarketplaceExplorer/
├── App.tsx                  # Root — provider tree + splash screen control
├── index.ts                 # Expo entry point
├── app.json                 # Expo config — splash, icons, plugins, EAS
├── eas.json                 # EAS build profiles (development / staging / production)
├── .github/workflows/       # GitHub Actions — manual deploy workflow
└── src/
    ├── api/                 # API client & types
    ├── components/
    │   ├── buttons/         # Button, BackButton, IconButton
    │   ├── cards/           # Pure UI card components
    │   ├── chips/           # Chip/pill selector component
    │   ├── containers/      # Reusable layout primitives
    │   ├── icons/           # Tab bar icons
    │   ├── inputs/          # Input component
    │   ├── sort/            # SortPicker bottom-sheet component
    │   └── typography/      # H1–H6 type system
    ├── containers/          # Components with business logic (Container/Presentational pattern)
    │   └── products/
    ├── hooks/               # Custom React hooks
    ├── navigation/          # Stack and tab navigators
    ├── screens/             # Screen-level components
    │   ├── auth/
    │   └── dashboard/
    ├── store/               # Zustand stores
    ├── theme/               # Design tokens + styled-components types
    └── utils/               # Pure business rule functions
```

---

## Features

| Feature | Details |
|---------|---------|
| **Product grid** | Infinite-scroll 2-column grid powered by FlashList |
| **Search** | Debounced (400 ms) full-text search |
| **Category filter** | Horizontal chip list; tap to toggle |
| **Sorting** | Bottom-sheet picker — Price ↑, Price ↓, Highest Rated; tapping the active option deselects it |
| **Product detail** | Full detail screen with related products |
| **Cart** | Add/remove/update quantity; enforces stock ceiling |
| **Bulk discount** | 10% off when cart subtotal exceeds R5,000 |
| **Auth** | Login screen with auth-gated navigation |

---

## Architectural Decisions

### Container / Presentational Pattern

Components are split into two layers:

- **`src/components/`** — pure UI. Accept only props, no store access, no hooks with side effects. Can be dropped into any context.
- **`src/containers/`** — wire up store selectors, query hooks, and business rules, then pass derived props down to the presentational component.

Example: `containers/products/ProductCard.tsx` reads from `useCartStore` and evaluates product rules, then renders `components/cards/ProductCard.tsx` which knows nothing about either.

### Navigation

Uses `@react-navigation/native-stack` (backed by native UINavigationController / Fragment) rather than the JS-based `@react-navigation/stack`. The JS stack wraps every screen in a `PanGestureHandler` which intercepts subsequent touch events — this caused tab presses to stop responding after the first tap. The native stack has no such wrapping.

`RootNavigator` conditionally renders either the `TabNavigator` (dashboard) or `AuthNavigator` based on auth state, keeping the navigation tree clean with no conditional screens inside a single stack.

The active tab icon and label use `tabBarActiveTintColor` set to the primary theme color (`#1DC5EB`).

### Splash Screen

The splash screen is managed by `expo-splash-screen` configured via the plugin in `app.json`. The full-screen gradient image (primary `#1DC5EB` → secondary `#00FFFF`) is applied with `resizeMode: "cover"`.

In `App.tsx`, `SplashScreen.preventAutoHideAsync()` locks the splash open at module evaluation time. `SplashScreen.setOptions({ fade: true, duration: 400 })` gives a smooth fade-out. The splash is only dismissed in the root `View`'s `onLayout` callback — after the provider tree has rendered and the first layout pass has completed.

### Theming

A single `AppTheme` object (colors, font sizes, font weights, font family) is provided at the root via `styled-components/native`'s `ThemeProvider`. All styled components consume the theme through the `theme` prop — no hardcoded colors or sizes anywhere in the component tree. TypeScript's `DefaultTheme` is extended so every theme access is fully typed.

**Theme colors**

| Token | Value |
|-------|-------|
| `primary` | `#1DC5EB` |
| `secondary` | `#00FFFF` |
| `default` | `#F4F4F4` |
| `text` | `#909090` |
| `lightGrey` | `#DCDCDC` |
| `light` | `#FFFFFF` |
| `black` | `#000000` |

### Business Rules

Product rules are isolated to pure functions in `src/utils/productRules.ts`:

| Rule | Condition |
|------|-----------|
| **Premium badge** | `rating >= 4.5` AND `price >= $1000` |
| **Low stock badge** | `0 < stock < 10` |
| **Cart eligibility** | `stock > 0` AND `rating >= 3` |
| **Bulk discount** | 10% off when cart subtotal exceeds $5,000 |

Keeping rules as pure functions makes them independently testable and decoupled from any component or store.

---

## State Management

Three Zustand stores handle all client state:

### `useFilterStore`

Manages the product list filter state: `search`, `debouncedSearch`, `category`, and `sort`. The raw `search` value updates instantly on each keystroke (for the input UI), while `debouncedSearch` is updated 400 ms later via `useDebounceSearch`. Only `debouncedSearch` is included in the React Query key, so the API is not called on every keystroke.

`sort` accepts one of `"price_asc" | "price_desc" | "rating_desc" | ""`. The `useProducts` hook maps this to `sortBy`/`order` params before passing them to the API. Changing sort resets pagination to page 0.

### `useCartStore`

Manages cart items with actions for add, remove, and quantity update. `addItem` enforces the stock ceiling (quantity cannot exceed `product.stock`). `getFinalTotal` applies the bulk discount rule — 10% off when the subtotal exceeds $5,000.

### `useAuthStore`

Manages authentication state. `RootNavigator` subscribes to this store to conditionally render the `AuthNavigator` or `TabNavigator`.

Zustand was chosen over Context + useReducer because:
- Subscriptions are selector-based: a component re-renders only when the slice of state it selects changes.
- No provider wrapping required.
- Computed values (`getSubtotal`, `getFinalTotal`, `getItemCount`) live inside the store alongside the state they derive from.

---

## Performance Optimizations

### FlashList over FlatList

The product grid uses `@shopify/flash-list` with `numColumns={2}` and `estimatedItemSize={310}`. FlashList recycles a fixed pool of item views (like `RecyclerView` on Android / `UICollectionView` on iOS) instead of creating and destroying them as the user scrolls. For a long product catalogue this is substantially cheaper than `FlatList`.

### React Query caching + infinite pagination

`useProducts` uses `useInfiniteQuery` with a query key of `["products", debouncedSearch, category, sort]`. React Query caches each unique combination, so switching back to a previously viewed filter set restores data instantly without a network request. `staleTime: 5 min` prevents background refetches while the data is fresh. Category slugs are cached indefinitely (`staleTime: Infinity`) as they rarely change.

### Debounced search

A 400 ms debounce sits between the text input and the query key. Without it, every keystroke would invalidate the cache and fire a new request. The raw input value is stored separately in Zustand so the input field stays responsive while the API call is deferred.

### Memoization

- `renderItem`, `ListHeaderComponent`, `ListEmptyComponent`, and `ListFooterComponent` are all wrapped in `useCallback` to prevent FlashList from discarding its view pool on parent re-renders.
- The flattened `products` array and `allCategories` array are derived with `useMemo` to avoid recalculating on every render.
- `ProductCard` is wrapped in `React.memo` so individual cards only re-render when their own product prop or cart quantity changes.

---

## CI / CD

Builds and deployments are **manually triggered** via GitHub Actions (`workflow_dispatch`). There are no automatic builds on push.

**To deploy:**
1. Go to **Actions → 🚀 EAS Update (CI)** in the GitHub UI
2. Click **Run workflow**
3. Select the target environment: `development`, `staging`, or `production`
4. Click **Run workflow**

The workflow runs `eas update` (OTA JS bundle) followed by `eas build` (native binary) for the selected channel, then runs `semantic-release` to cut a versioned release.

**EAS build profiles** (`eas.json`):

| Profile | Distribution | Channel |
|---------|-------------|---------|
| `development` | Internal | `development` |
| `staging` | Internal | `staging` |
| `production` | Store | `production` |

**Required secrets:** `EXPO_TOKEN`

---

## Tradeoffs

**Zustand over Redux / Context**
Zustand has a minimal API and no boilerplate, which suits a project of this scope. Redux would offer better devtools and a stricter action-based model but adds significant ceremony for little benefit at this scale.

**No persistence**
Cart and filter state live in memory only — they reset on app restart. Adding `zustand/middleware`'s `persist` with `AsyncStorage` would fix this but was not in scope.

**DummyJSON API limitations**
The API does not support combined search + category filtering in a single request. Filtering is applied server-side by category only; search queries ignore the active category filter. A production API would expose compound query parameters.

**FlashList `estimatedItemSize`**
The value of `310` is an approximation of card height. Cards with long titles or missing brands will differ. An inaccurate estimate causes FlashList to miscalculate initial scroll position but does not affect correctness — items still render and recycle correctly.

**No offline support**
React Query's stale cache provides some resilience (stale data is shown while refetching fails) but there is no explicit offline mode, background sync, or `NetInfo`-based retry strategy.
