import { memo } from "react";
import ProductCardUI from "../../components/cards/ProductCard";
import { Product } from "../../api/products";
import { useCartStore } from "../../store/useCartStore";
import { isPremium, isLowStock, canAddToCart } from "../../utils/productRules";

const ProductCard = memo(({ product }: { product: Product }) => {
  const addItem = useCartStore((s) => s.addItem);
  const cartQuantity = useCartStore(
    (s) => s.items.find((i) => i.product.id === product.id)?.quantity ?? 0
  );

  return (
    <ProductCardUI
      product={product}
      cartQuantity={cartQuantity}
      premium={isPremium(product)}
      lowStock={isLowStock(product)}
      eligible={canAddToCart(product)}
      onAddToCart={() => addItem(product)}
    />
  );
});

export default ProductCard;
