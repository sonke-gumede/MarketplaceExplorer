import { memo } from "react";
import { Image } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { Product } from "../../api/products";
import { H4, H5, H6 } from "../typography";
import Button from "../buttons/Button";
import { toRand } from "../../utils/currency";

export interface ProductCardProps {
  product: Product;
  cartQuantity: number;
  premium: boolean;
  lowStock: boolean;
  eligible: boolean;
  onAddToCart: () => void;
  onPress?: () => void;
}

const ProductCard = memo(({ product, cartQuantity, premium, lowStock, eligible, onAddToCart, onPress }: ProductCardProps) => {
  const theme = useTheme();

  return (
    <Card onPress={onPress} activeOpacity={0.95}>
      <ImageContainer>
        <ProductImage source={{ uri: product.thumbnail }} resizeMode="cover" />
        {premium && (
          <PremiumBadge>
            <H6 color="light" weight="semiBold">
              ✦ Premium
            </H6>
          </PremiumBadge>
        )}
        {lowStock && (
          <LowStockBadge>
            <H6 color="light" weight="semiBold">
              Almost Sold Out
            </H6>
          </LowStockBadge>
        )}
      </ImageContainer>

      <CardBody>
        <CategoryLabel color="text">{product.category}</CategoryLabel>
        <H5 weight="semiBold" numberOfLines={2}>
          {product.title}
        </H5>
        {product.brand ? <H6 color="text">{product.brand}</H6> : null}

        <PriceRow>
          <H4 weight="bold" color="primary">
            {toRand(product.price)}
          </H4>
          {product.discountPercentage > 0 && (
            <DiscountBadge>
              <H6 color="light" weight="semiBold">
                -{Math.round(product.discountPercentage)}%
              </H6>
            </DiscountBadge>
          )}
        </PriceRow>

        <RatingRow>
          <Ionicons
            name="star"
            size={12}
            color={theme.colors.primary}
            accessible={false}
          />
          <H6 color="text"> {product.rating.toFixed(1)}</H6>
          <H6 color="text">  ·  </H6>
          <H6 color={product.stock === 0 ? "error" : "text"}>
            {product.stock === 0 ? "Out of stock" : `${product.stock} left`}
          </H6>
        </RatingRow>

        {!eligible && (
          <H6 color="error">
            {product.stock === 0 ? "Out of stock" : "Low rating — unavailable"}
          </H6>
        )}

        <Button
          label={cartQuantity > 0 ? `In Cart (${cartQuantity})` : "Add to Cart"}
          onPress={onAddToCart}
          disabled={!eligible}
          size="sm"
        />
      </CardBody>
    </Card>
  );
});

export default ProductCard;

const Card = styled.TouchableOpacity`
  flex: 1;
  margin: 6px;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: 16px;
  overflow: hidden;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.06;
  shadow-radius: 8px;
  elevation: 3;
`;

const ImageContainer = styled.View`
  position: relative;
`;

const ProductImage = styled(Image)`
  width: 100%;
  height: 150px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
`;

const PremiumBadge = styled.View`
  position: absolute;
  top: 8px;
  left: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 3px 8px;
  border-radius: 8px;
`;

const LowStockBadge = styled.View`
  position: absolute;
  bottom: 8px;
  left: 8px;
  background-color: ${({ theme }) => theme.colors.error};
  padding: 3px 8px;
  border-radius: 8px;
`;

const CardBody = styled.View`
  padding: 10px;
  gap: 4px;
`;

const CategoryLabel = styled(H6)`
  text-transform: capitalize;
`;

const PriceRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  margin-top: 2px;
`;

const DiscountBadge = styled.View`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 2px 6px;
  border-radius: 6px;
`;

const RatingRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

