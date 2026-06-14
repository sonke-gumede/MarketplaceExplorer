import { memo } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ProductCardUI from "./ProductCardUI";
import type { Product } from "../types";
import { useAddToCart, useCart } from "../../cart/graphql";
import { isPremium, isLowStock, canAddToCart } from "../../cart/utils/productRules";
import { DashboardStackParamList } from "../../../navigation/DashboardNavigator";

type Nav = NativeStackNavigationProp<DashboardStackParamList>;

const ProductCard = memo(({ product }: { product: Product }) => {
  const navigation = useNavigation<Nav>();
  const { addToCart } = useAddToCart();
  const { cart } = useCart();

  const cartQuantity =
    cart?.lines.find((l) => l.productId === product.id)?.quantity ?? 0;

  return (
    <ProductCardUI
      product={product}
      cartQuantity={cartQuantity}
      premium={isPremium(product)}
      lowStock={isLowStock(product)}
      eligible={canAddToCart(product)}
      onAddToCart={() => addToCart(product.variantId)}
      onPress={() =>
        navigation.navigate("ProductDetail", { productId: product.id })
      }
    />
  );
});

export default ProductCard;
