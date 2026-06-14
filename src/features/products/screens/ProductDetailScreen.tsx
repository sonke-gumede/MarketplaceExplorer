import { useState, useRef, useCallback } from "react";
import { ScrollView, FlatList, View, ActivityIndicator } from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { DashboardStackParamList } from "../../../navigation/DashboardNavigator";
import { useGetProduct } from "../graphql";
import { useCartStore } from "../../cart/store/useCartStore";
import { Review } from "../types";
import { toRand } from "../../../shared/utils/currency";
import { H2, H3, H4, H5, H6 } from "../../../shared/components/typography";
import {
  Container,
  StateContainer,
} from "../../../shared/components/containers";
import Button from "../../../shared/components/buttons/Button";
import IconButton from "../../../shared/components/buttons/IconButton";
import BackButton from "../../../shared/components/buttons/BackButton";
import {
  SW,
  Screen,
  CarouselContainer,
  CarouselImage,
  DotsRow,
  Dot,
  ContentPad,
  CategoryLabel,
  PriceRow,
  OriginalPrice,
  DiscountBadge,
  MetaRow,
  Separator,
  AvailabilityBadge,
  TagsRow,
  Tag,
  Divider,
  SectionTitle,
  InfoRow,
  ReviewContainer,
  ReviewHeader,
  BottomSpacer,
  Footer,
  QtyControls,
} from "./ProductDetailScreen.styles";

type DetailRoute = RouteProp<DashboardStackParamList, "ProductDetail">;

export default function ProductDetailScreen() {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute<DetailRoute>();
  const { productId } = route.params;

  const { data: product, isLoading, isError } = useGetProduct(productId);

  const cartItem = useCartStore((s) =>
    s.items.find((i) => i.product.id === productId),
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
    [],
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
          <Button
            label="Go Back"
            size="sm"
            onPress={() => navigation.goBack()}
          />
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
        <CarouselContainer>
          <FlatList
            ref={flatListRef}
            data={images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_: string, i: number) => String(i)}
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
          <CategoryLabel color="text">{product.category}</CategoryLabel>
          <H2 weight="bold">{product.title}</H2>
          {product.brand ? <H6 color="text">{product.brand}</H6> : null}

          <PriceRow>
            <H3 weight="bold" color="primary">
              {toRand(product.price)}
            </H3>
            {hasDiscount && (
              <>
                <OriginalPrice color="text">
                  {toRand(originalPrice)}
                </OriginalPrice>
                <DiscountBadge>
                  <H6 color="light" weight="semiBold">
                    -{Math.round(product.discountPercentage)}%
                  </H6>
                </DiscountBadge>
              </>
            )}
          </PriceRow>

          <MetaRow>
            <StarRow rating={product.rating} />
            <H6 color="text"> {product.rating.toFixed(1)}</H6>
            <Separator />
            <AvailabilityBadge
              status={
                product.availabilityStatus ??
                (product.stock > 0 ? "In Stock" : "Out of Stock")
              }
            >
              <H6 color="light" weight="semiBold">
                {product.availabilityStatus ??
                  (product.stock > 0 ? "In Stock" : "Out of Stock")}
              </H6>
            </AvailabilityBadge>
          </MetaRow>

          {product.tags && product.tags.length > 0 && (
            <TagsRow>
              {product.tags.map((tag: string) => (
                <Tag key={tag}>
                  <H6 color="text">{tag}</H6>
                </Tag>
              ))}
            </TagsRow>
          )}

          <Divider />

          <SectionTitle weight="semiBold">Description</SectionTitle>
          <H6 color="text">{product.description}</H6>

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

          {product.reviews && product.reviews.length > 0 && (
            <>
              <Divider />
              <SectionTitle weight="semiBold">
                Reviews ({product.reviews.length})
              </SectionTitle>
              {product.reviews.map((review: Review, i: number) => (
                <ReviewCard key={i} review={review} />
              ))}
            </>
          )}
        </ContentPad>

        <BottomSpacer />
      </ScrollView>

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
