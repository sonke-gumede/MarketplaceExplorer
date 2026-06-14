import { memo } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ProductCardUI from "./ProductCardUI";
import type { Product } from "../types";

import { useCartStore } from "../../cart/store/useCartStore";
import {
  isPremium,
  isLowStock,
  canAddToCart,
} from "../../cart/utils/productRules";
import { DashboardStackParamList } from "../../../navigation/DashboardNavigator";

type Nav = NativeStackNavigationProp<DashboardStackParamList>;

const ProductCard = memo(({ product }: { product: Product }) => {
  const navigation = useNavigation<Nav>();
  const addItem = useCartStore((s) => s.addItem);
  const cartQuantity = useCartStore(
    (s) => s.items.find((i) => i.product.id === product.id)?.quantity ?? 0,
  );

  return (
    <ProductCardUI
      product={product}
      cartQuantity={cartQuantity}
      premium={isPremium(product)}
      lowStock={isLowStock(product)}
      eligible={canAddToCart(product)}
      onAddToCart={() => addItem(product)}
      onPress={() =>
        navigation.navigate("ProductDetail", { productId: product.id })
      }
    />
  );
});

export default ProductCard;
