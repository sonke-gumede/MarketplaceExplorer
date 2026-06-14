import { useQuery, useMutation } from "@apollo/client/react";
import { useCartStore } from "../store/useCartStore";
import { GET_CART } from "./queries";
import {
  CART_CREATE,
  CART_LINES_ADD,
  CART_LINES_UPDATE,
  CART_LINES_REMOVE,
} from "./mutations";
import { mapGQLCart, Cart } from "./types";

// ─── Read ─────────────────────────────────────────────────────────────────────

export const useCart = (): {
  cart: Cart | null;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
} => {
  const cartId = useCartStore((s) => s.cartId);
  const result = useQuery(GET_CART, {
    variables: { cartId: cartId! },
    skip: !cartId,
  });
  return {
    cart: result.data?.cart ? mapGQLCart(result.data.cart) : null,
    isLoading: result.loading,
    isError: !!result.error,
    refetch: result.refetch,
  };
};

// ─── Add to cart (creates cart on first add) ──────────────────────────────────

export const useAddToCart = () => {
  const cartId = useCartStore((s) => s.cartId);
  const setCartId = useCartStore((s) => s.setCartId);

  const [createCart, { loading: creating }] = useMutation(CART_CREATE);
  const [addLines, { loading: adding }] = useMutation(CART_LINES_ADD, {
    refetchQueries: cartId
      ? [{ query: GET_CART, variables: { cartId } }]
      : [],
  });

  const addToCart = async (variantId: string, quantity = 1) => {
    if (!cartId) {
      const { data } = await createCart({
        variables: { input: { lines: [{ merchandiseId: variantId, quantity }] } },
      });
      const newId = data?.cartCreate?.cart?.id;
      if (newId) setCartId(newId);
    } else {
      await addLines({
        variables: { cartId, lines: [{ merchandiseId: variantId, quantity }] },
      });
    }
  };

  return { addToCart, loading: creating || adding };
};

// ─── Update line quantity (removes line when quantity reaches 0) ──────────────

export const useUpdateCartLine = () => {
  const cartId = useCartStore((s) => s.cartId);
  const refetchVars = cartId ? [{ query: GET_CART, variables: { cartId } }] : [];

  const [updateLines, { loading: updating }] = useMutation(CART_LINES_UPDATE, {
    refetchQueries: refetchVars,
  });
  const [removeLines, { loading: removing }] = useMutation(CART_LINES_REMOVE, {
    refetchQueries: refetchVars,
  });

  const updateLine = async (lineId: string, quantity: number) => {
    if (!cartId) return;
    if (quantity <= 0) {
      await removeLines({ variables: { cartId, lineIds: [lineId] } });
    } else {
      await updateLines({ variables: { cartId, lines: [{ id: lineId, quantity }] } });
    }
  };

  return { updateLine, loading: updating || removing };
};

// ─── Remove a single line ─────────────────────────────────────────────────────

export const useRemoveCartLine = () => {
  const cartId = useCartStore((s) => s.cartId);
  const [removeLines, { loading }] = useMutation(CART_LINES_REMOVE, {
    refetchQueries: cartId
      ? [{ query: GET_CART, variables: { cartId } }]
      : [],
  });

  const removeLine = async (lineId: string) => {
    if (!cartId) return;
    await removeLines({ variables: { cartId, lineIds: [lineId] } });
  };

  return { removeLine, loading };
};

// ─── Clear all lines and forget the cart ID ───────────────────────────────────

export const useClearCart = () => {
  const cartId = useCartStore((s) => s.cartId);
  const clearCartId = useCartStore((s) => s.clearCartId);
  const { cart } = useCart();
  const [removeLines, { loading }] = useMutation(CART_LINES_REMOVE);

  const clearCart = async () => {
    if (cartId && cart && cart.lines.length > 0) {
      await removeLines({
        variables: { cartId, lineIds: cart.lines.map((l) => l.id) },
      });
    }
    clearCartId();
  };

  return { clearCart, loading };
};
