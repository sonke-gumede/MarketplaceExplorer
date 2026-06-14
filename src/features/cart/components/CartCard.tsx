import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import styled from "styled-components/native";
import { CartItem } from "../store/useCartStore";
import { H5, H6 } from "../../../shared/components/typography";
import IconButton from "../../../shared/components/buttons/IconButton";
import { toRand } from "../../../shared/utils/currency";

export interface CartCardProps {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export default function CartCard({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartCardProps) {
  const theme = useTheme();
  const atMax = item.quantity >= item.product.stock;

  return (
    <ItemCard>
      <ItemImage source={{ uri: item.product.thumbnail }} resizeMode="cover" />
      <ItemInfo>
        <H6 weight="semiBold" numberOfLines={2}>
          {item.product.title}
        </H6>
        <H5 weight="bold" color="primary">
          {toRand(item.product.price * item.quantity)}
        </H5>
        <H6 color="text">{toRand(item.product.price)} each</H6>
      </ItemInfo>
      <ItemActions>
        <IconButton
          variant="ghost"
          onPress={onRemove}
          icon={
            <Ionicons
              name="trash-outline"
              size={18}
              color={theme.colors.error}
              accessible={false}
            />
          }
        />
        <QtyRow>
          <IconButton
            onPress={onDecrease}
            icon={
              <Ionicons
                name="remove"
                size={14}
                color={theme.colors.black}
                accessible={false}
              />
            }
          />
          <H6 weight="semiBold">{item.quantity}</H6>
          <IconButton
            onPress={onIncrease}
            disabled={atMax}
            icon={
              <Ionicons
                name="add"
                size={14}
                color={atMax ? theme.colors.lightGrey : theme.colors.black}
                accessible={false}
              />
            }
          />
        </QtyRow>
      </ItemActions>
    </ItemCard>
  );
}

const ItemCard = styled.View`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: 14px;
  margin-bottom: 12px;
  overflow: hidden;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.05;
  shadow-radius: 4px;
`;

const ItemImage = styled(Image)`
  width: 90px;
  height: 90px;
`;

const ItemInfo = styled.View`
  flex: 1;
  padding: 10px 8px;
  gap: 2px;
  justify-content: center;
`;

const ItemActions = styled.View`
  padding: 10px;
  align-items: center;
  justify-content: space-between;
`;

const QtyRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;
