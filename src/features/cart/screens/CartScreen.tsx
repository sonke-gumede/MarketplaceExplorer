import { useCallback } from "react";
import { ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import styled from "styled-components/native";
import { FlashList } from "@shopify/flash-list";
import {
  useCart,
  useAddToCart,
  useUpdateCartLine,
  useRemoveCartLine,
  useClearCart,
} from "../graphql";
import { CartLine } from "../graphql/types";
import { Container, Header, StateContainer } from "../../../shared/components/containers";
import { H2, H5, H6 } from "../../../shared/components/typography";
import Button from "../../../shared/components/buttons/Button";
import CartCard from "../components/CartCard";
import CartSummaryCard from "../components/CartSummaryCard";

export default function CartScreen() {
  const theme = useTheme();
  const { cart, isLoading } = useCart();
  const { addToCart } = useAddToCart();
  const { updateLine } = useUpdateCartLine();
  const { removeLine } = useRemoveCartLine();
  const { clearCart } = useClearCart();

  const lines = cart?.lines ?? [];
  const subtotal = cart?.subtotal ?? 0;
  const total = cart?.total ?? 0;
  const totalQuantity = cart?.totalQuantity ?? 0;
  const hasDiscount = subtotal !== total;
  const discountAmount = subtotal - total;

  const renderItem = useCallback(
    ({ item }: { item: CartLine }) => (
      <CartCard
        item={item}
        onIncrease={() => addToCart(item.variantId)}
        onDecrease={() => updateLine(item.id, item.quantity - 1)}
        onRemove={() => removeLine(item.id)}
      />
    ),
    [addToCart, updateLine, removeLine],
  );

  if (isLoading) {
    return (
      <Container>
        <Header>
          <H2 weight="bold">My Cart</H2>
        </Header>
        <StateContainer>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </StateContainer>
      </Container>
    );
  }

  if (lines.length === 0) {
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
          {totalQuantity} item{totalQuantity !== 1 ? "s" : ""}
        </H6>
      </Header>

      <FlashList
        data={lines}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
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
