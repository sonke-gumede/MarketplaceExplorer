// ─── Shopify GQL shapes ───────────────────────────────────────────────────────

export interface GQLMoneyV2 {
  amount: string;
  currencyCode: string;
}

export interface GQLCartLineNode {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    availableForSale: boolean;
    quantityAvailable: number | null;
    price: GQLMoneyV2;
    image: { url: string } | null;
    product: {
      id: string;
      title: string;
      featuredImage: { url: string } | null;
    };
  };
  cost: {
    totalAmount: GQLMoneyV2;
    amountPerQuantity: GQLMoneyV2;
  };
}

export interface GQLCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: { edges: Array<{ node: GQLCartLineNode }> };
  cost: {
    subtotalAmount: GQLMoneyV2;
    totalAmount: GQLMoneyV2;
  };
}

// ─── Operation variable / data shapes ────────────────────────────────────────

export interface GetCartData {
  cart: GQLCart | null;
}
export interface GetCartVariables {
  cartId: string;
}

export interface CartCreateData {
  cartCreate: { cart: GQLCart | null; userErrors: Array<{ field: string[]; message: string }> };
}
export interface CartCreateVariables {
  input: { lines?: Array<{ merchandiseId: string; quantity: number }> };
}

export interface CartLinesAddData {
  cartLinesAdd: { cart: GQLCart | null; userErrors: Array<{ field: string[]; message: string }> };
}
export interface CartLinesAddVariables {
  cartId: string;
  lines: Array<{ merchandiseId: string; quantity: number }>;
}

export interface CartLinesUpdateData {
  cartLinesUpdate: { cart: GQLCart | null; userErrors: Array<{ field: string[]; message: string }> };
}
export interface CartLinesUpdateVariables {
  cartId: string;
  lines: Array<{ id: string; quantity: number }>;
}

export interface CartLinesRemoveData {
  cartLinesRemove: { cart: GQLCart | null; userErrors: Array<{ field: string[]; message: string }> };
}
export interface CartLinesRemoveVariables {
  cartId: string;
  lineIds: string[];
}

// ─── Domain types ─────────────────────────────────────────────────────────────

export interface CartLine {
  id: string;
  variantId: string;
  productId: number;
  title: string;
  thumbnail: string;
  price: number;
  quantity: number;
  stock: number;
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  lines: CartLine[];
  subtotal: number;
  total: number;
  totalQuantity: number;
}

// ─── Mappers ──────────────────────────────────────────────────────────────────

const BULK_DISCOUNT_THRESHOLD = 5000;
const BULK_DISCOUNT_RATE = 0.1;

export const mapGQLCartLine = (node: GQLCartLineNode): CartLine => ({
  id: node.id,
  variantId: node.merchandise.id,
  productId: parseInt(node.merchandise.product.id.split("/").pop() ?? "0"),
  title: node.merchandise.product.title,
  thumbnail:
    node.merchandise.image?.url ??
    node.merchandise.product.featuredImage?.url ??
    "",
  price: parseFloat(node.cost.amountPerQuantity.amount),
  quantity: node.quantity,
  stock: node.merchandise.quantityAvailable ?? 99,
});

export const mapGQLCart = (raw: GQLCart): Cart => {
  const lines = raw.lines.edges.map((e) => mapGQLCartLine(e.node));
  const subtotal = parseFloat(raw.cost.subtotalAmount.amount);
  const total =
    subtotal > BULK_DISCOUNT_THRESHOLD
      ? subtotal * (1 - BULK_DISCOUNT_RATE)
      : parseFloat(raw.cost.totalAmount.amount);
  return {
    id: raw.id,
    checkoutUrl: raw.checkoutUrl,
    lines,
    subtotal,
    total,
    totalQuantity: raw.totalQuantity,
  };
};
