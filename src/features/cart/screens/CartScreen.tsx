import { useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import styled from "styled-components/native";
import { FlashList } from "@shopify/flash-list";
import { useCartStore, CartItem } from "../store/useCartStore";
import { Container, Header, StateContainer } from "../../../shared/components/containers";
import { H2, H5, H6 } from "../../../shared/components/typography";
import Button from "../../../shared/components/buttons/Button";
import CartCard from "../components/CartCard";
import CartSummaryCard from "../components/CartSummaryCard";

const BULK_DISCOUNT_THRESHOLD = 5000;

export default function CartScreen() {
  const theme = useTheme();
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);
  const subtotal = useCartStore((s) => s.getSubtotal());
  const total = useCartStore((s) => s.getFinalTotal());
  const itemCount = useCartStore((s) => s.getItemCount());

  const hasDiscount = subtotal > BULK_DISCOUNT_THRESHOLD;
  const discountAmount = subtotal - total;

  const renderItem = useCallback(
    ({ item }: { item: CartItem }) => (
      <CartCard
        item={item}
        onIncrease={() => addItem(item.product)}
        onDecrease={() => updateQuantity(item.product.id, item.quantity - 1)}
        onRemove={() => removeItem(item.product.id)}
      />
    ),
    [addItem, updateQuantity, removeItem]
  );

  if (items.length === 0) {
    return (
      <Container>
        <Header>
          <H2 weight="bold">My Cart</H2>
        </Header>
        <StateContainer>
          <Ionicons
            name="cart-outline"
            size={64}
            color={theme.colors.lightGrey}
            accessible={false}
          />
          <H5 color="text">Your cart is empty</H5>
          <H6 color="text">Add some products to get started</H6>
        </StateContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <TitleRow>
          <H2 weight="bold">My Cart</H2>
          <Button label="Clear All" variant="ghost" danger onPress={clearCart} />
        </TitleRow>
        <H6 color="text">
          {itemCount} item{itemCount !== 1 ? "s" : ""}
        </H6>
      </Header>

      <FlashList
        data={items}
        keyExtractor={(item) => String(item.product.id)}
        renderItem={renderItem}
        estimatedItemSize={102}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />

      <CartSummaryCard
        subtotal={subtotal}
        total={total}
        hasDiscount={hasDiscount}
        discountAmount={discountAmount}
        onCheckout={() => {}}
      />
    </Container>
  );
}

const TitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

