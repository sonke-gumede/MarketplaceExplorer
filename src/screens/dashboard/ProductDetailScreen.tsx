import { useState, useRef, useCallback } from "react";
import {
  ScrollView,
  FlatList,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Image } from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import styled from "styled-components/native";
import { DashboardStackParamList } from "../../navigation/DashboardNavigator";
import { useProduct, useRelatedProducts } from "../../hooks/useProducts";
import { useCartStore } from "../../store/useCartStore";
import { Review } from "../../api/products";
import { H2, H3, H4, H5, H6 } from "../../components/typography";
import { Container, StateContainer } from "../../components/containers";
import Button from "../../components/buttons/Button";
import IconButton from "../../components/buttons/IconButton";
import BackButton from "../../components/buttons/BackButton";
import ProductCard from "../../containers/products/ProductCard";

const { width: SW } = Dimensions.get("window");

type DetailRoute = RouteProp<DashboardStackParamList, "ProductDetail">;

export default function ProductDetailScreen() {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute<DetailRoute>();
  const { productId } = route.params;

  const { data: product, isLoading, isError } = useProduct(productId);
  const { data: related } = useRelatedProducts(
    product?.category ?? "",
    productId
  );

  const cartItem = useCartStore((s) =>
    s.items.find((i) => i.product.id === productId)
  );
  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const quantity = cartItem?.quantity ?? 0;
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const images =
    product?.images && product.images.length > 0
      ? product.images
      : product
      ? [product.thumbnail]
      : [];

  const handleScroll = useCallback(
    (e: { nativeEvent: { contentOffset: { x: number } } }) => {
      const index = Math.round(e.nativeEvent.contentOffset.x / SW);
      setActiveIndex(index);
    },
    []
  );

  const handleIncrease = useCallback(() => {
    if (product) addItem(product);
  }, [product, addItem]);

  const handleDecrease = useCallback(() => {
    if (!product) return;
    if (quantity === 1) removeItem(product.id);
    else updateQuantity(product.id, quantity - 1);
  }, [product, quantity, removeItem, updateQuantity]);

  if (isLoading) {
    return (
      <Container>
        <StateContainer>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </StateContainer>
      </Container>
    );
  }

  if (isError || !product) {
    return (
      <Container>
        <StateContainer>
          <H5 color="error" weight="semiBold">
            Failed to load product
          </H5>
          <Button label="Go Back" size="sm" onPress={() => navigation.goBack()} />
        </StateContainer>
      </Container>
    );
  }

  const atMax = quantity >= product.stock;
  const originalPrice = product.price / (1 - product.discountPercentage / 100);
  const hasDiscount = product.discountPercentage > 0;

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {/* Image carousel */}
        <CarouselContainer>
          <FlatList
            ref={flatListRef}
            data={images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) => String(i)}
            onMomentumScrollEnd={handleScroll}
            renderItem={({ item }) => (
              <CarouselImage source={{ uri: item }} resizeMode="cover" />
            )}
          />
          {images.length > 1 && (
            <DotsRow>
              {images.map((_, i) => (
                <Dot key={i} active={i === activeIndex} />
              ))}
            </DotsRow>
          )}
          <BackButton onPress={() => navigation.goBack()} />
        </CarouselContainer>

        <ContentPad>
          {/* Category + title */}
          <CategoryLabel color="text">{product.category}</CategoryLabel>
          <H2 weight="bold">{product.title}</H2>
          {product.brand ? <H6 color="text">{product.brand}</H6> : null}

          {/* Price */}
          <PriceRow>
            <H3 weight="bold" color="primary">
              ${product.price.toFixed(2)}
            </H3>
            {hasDiscount && (
              <>
                <OriginalPrice color="text">
                  ${originalPrice.toFixed(2)}
                </OriginalPrice>
                <DiscountBadge>
                  <H6 color="light" weight="semiBold">
                    -{Math.round(product.discountPercentage)}%
                  </H6>
                </DiscountBadge>
              </>
            )}
          </PriceRow>

          {/* Rating + availability */}
          <MetaRow>
            <StarRow rating={product.rating} />
            <H6 color="text"> {product.rating.toFixed(1)}</H6>
            <Separator />
            <AvailabilityBadge status={product.availabilityStatus ?? (product.stock > 0 ? "In Stock" : "Out of Stock")}>
              <H6 color="light" weight="semiBold">
                {product.availabilityStatus ?? (product.stock > 0 ? "In Stock" : "Out of Stock")}
              </H6>
            </AvailabilityBadge>
          </MetaRow>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <TagsRow>
              {product.tags.map((tag) => (
                <Tag key={tag}>
                  <H6 color="text">{tag}</H6>
                </Tag>
              ))}
            </TagsRow>
          )}

          <Divider />

          {/* Description */}
          <SectionTitle weight="semiBold">Description</SectionTitle>
          <H6 color="text">{product.description}</H6>

          {/* Shipping / warranty */}
          {(product.shippingInformation || product.warrantyInformation) && (
            <>
              <Divider />
              {product.shippingInformation && (
                <InfoRow>
                  <Ionicons
                    name="car-outline"
                    size={16}
                    color={theme.colors.text}
                    accessible={false}
                  />
                  <H6 color="text"> {product.shippingInformation}</H6>
                </InfoRow>
              )}
              {product.warrantyInformation && (
                <InfoRow>
                  <Ionicons
                    name="shield-checkmark-outline"
                    size={16}
                    color={theme.colors.text}
                    accessible={false}
                  />
                  <H6 color="text"> {product.warrantyInformation}</H6>
                </InfoRow>
              )}
            </>
          )}

          {/* Reviews */}
          {product.reviews && product.reviews.length > 0 && (
            <>
              <Divider />
              <SectionTitle weight="semiBold">
                Reviews ({product.reviews.length})
              </SectionTitle>
              {product.reviews.map((review, i) => (
                <ReviewCard key={i} review={review} />
              ))}
            </>
          )}

          {/* Related products */}
          {related && related.length > 0 && (
            <>
              <Divider />
              <SectionTitle weight="semiBold">Related Products</SectionTitle>
            </>
          )}
        </ContentPad>

        {related && related.length > 0 && (
          <FlatList
            data={related}
            horizontal
            keyExtractor={(item) => String(item.id)}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 0 }}
            renderItem={({ item }) => (
              <RelatedCardWrapper>
                <ProductCard product={item} />
              </RelatedCardWrapper>
            )}
            scrollEnabled
          />
        )}

        <BottomSpacer />
      </ScrollView>

      {/* Sticky footer */}
      <Footer>
        {quantity > 0 ? (
          <QtyControls>
            <IconButton
              onPress={handleDecrease}
              icon={
                <Ionicons
                  name="remove"
                  size={16}
                  color={theme.colors.black}
                  accessible={false}
                />
              }
            />
            <H4 weight="bold">{quantity}</H4>
            <IconButton
              onPress={handleIncrease}
              disabled={atMax}
              icon={
                <Ionicons
                  name="add"
                  size={16}
                  color={atMax ? theme.colors.lightGrey : theme.colors.black}
                  accessible={false}
                />
              }
            />
          </QtyControls>
        ) : null}
        <Button
          label={quantity > 0 ? `In Cart (${quantity})` : "Add to Cart"}
          onPress={handleIncrease}
          disabled={product.stock === 0}
          style={{ flex: 1 }}
        />
      </Footer>
    </Screen>
  );
}

function StarRow({ rating }: { rating: number }) {
  const theme = useTheme();
  return (
    <View style={{ flexDirection: "row" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Ionicons
          key={star}
          name={
            rating >= star
              ? "star"
              : rating >= star - 0.5
              ? "star-half"
              : "star-outline"
          }
          size={14}
          color={theme.colors.primary}
          accessible={false}
        />
      ))}
    </View>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const theme = useTheme();
  return (
    <ReviewContainer>
      <ReviewHeader>
        <H6 weight="semiBold">{review.reviewerName}</H6>
        <H6 color="text">
          {new Date(review.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </H6>
      </ReviewHeader>
      <StarRow rating={review.rating} />
      <H6 color="text">{review.comment}</H6>
    </ReviewContainer>
  );
}

const Screen = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.default};
`;

const CarouselContainer = styled.View`
  position: relative;
`;

const CarouselImage = styled(Image)`
  width: ${SW}px;
  height: ${SW * 0.85}px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
`;


const DotsRow = styled.View`
  position: absolute;
  bottom: 12px;
  left: 0;
  right: 0;
  flex-direction: row;
  justify-content: center;
  gap: 6px;
`;

const Dot = styled.View<{ active: boolean }>`
  width: ${({ active }) => (active ? "20px" : "6px")};
  height: 6px;
  border-radius: 3px;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.lightGrey};
`;

const ContentPad = styled.View`
  padding: 20px 20px 0;
  gap: 8px;
`;

const CategoryLabel = styled(H6)`
  text-transform: capitalize;
`;

const PriceRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
`;

const OriginalPrice = styled(H5)`
  text-decoration-line: line-through;
`;

const DiscountBadge = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 2px 8px;
  border-radius: 8px;
`;

const MetaRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
`;

const Separator = styled.View`
  width: 1px;
  height: 14px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
`;

const AvailabilityBadge = styled.View<{ status: string }>`
  padding: 3px 10px;
  border-radius: 8px;
  background-color: ${({ theme, status }) =>
    status === "In Stock"
      ? theme.colors.primary
      : status === "Low Stock"
      ? "orange"
      : theme.colors.error};
`;

const TagsRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 6px;
`;

const Tag = styled.View`
  padding: 4px 10px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  margin: 8px 0;
`;

const SectionTitle = styled(H5)`
  margin-bottom: 4px;
`;

const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const ReviewContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: 12px;
  padding: 12px;
  gap: 6px;
  margin-bottom: 8px;
`;

const ReviewHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const RelatedCardWrapper = styled.View`
  width: 180px;
`;

const BottomSpacer = styled.View`
  height: 100px;
`;

const Footer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.light};
  padding: 12px 20px 28px;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  shadow-color: #000;
  shadow-offset: 0px -2px;
  shadow-opacity: 0.06;
  shadow-radius: 8px;
  elevation: 10;
`;

const QtyControls = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  background-color: ${({ theme }) => theme.colors.default};
  padding: 6px 10px;
  border-radius: 12px;
`;

