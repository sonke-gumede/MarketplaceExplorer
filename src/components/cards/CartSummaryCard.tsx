import styled from "styled-components/native";
import { H4, H5, H6 } from "../typography";
import Button from "../buttons/Button";
import { toRand } from "../../utils/currency";

export interface CartSummaryCardProps {
  subtotal: number;
  total: number;
  hasDiscount: boolean;
  discountAmount: number;
  onCheckout: () => void;
}

export default function CartSummaryCard({
  subtotal,
  total,
  hasDiscount,
  discountAmount,
  onCheckout,
}: CartSummaryCardProps) {
  return (
    <SummaryCard>
      <SummaryRow>
        <H5>Subtotal</H5>
        <H5>{toRand(subtotal)}</H5>
      </SummaryRow>
      {hasDiscount && (
        <SummaryRow>
          <H6 color="primary">Bulk discount (10%)</H6>
          <H6 color="primary">-{toRand(discountAmount)}</H6>
        </SummaryRow>
      )}
      <Divider />
      <SummaryRow>
        <H4 weight="bold">Total</H4>
        <H4 weight="bold" color="primary">
          {toRand(total)}
        </H4>
      </SummaryRow>
      <Button label="Checkout" onPress={onCheckout} />
    </SummaryCard>
  );
}

const SummaryCard = styled.View`
  background-color: ${({ theme }) => theme.colors.light};
  padding: 20px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  gap: 10px;
  shadow-color: #000;
  shadow-offset: 0px -2px;
  shadow-opacity: 0.06;
  shadow-radius: 8px;
  elevation: 8;
`;

const SummaryRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  margin: 4px 0;
`;
