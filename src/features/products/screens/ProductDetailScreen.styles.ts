import { Dimensions, Image } from "react-native";
import styled from "styled-components/native";
import { H5, H6 } from "../../../shared/components/typography";

export const { width: SW } = Dimensions.get("window");

export const Screen = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.default};
`;

export const CarouselContainer = styled.View`
  position: relative;
`;

export const CarouselImage = styled(Image)`
  width: ${SW}px;
  height: ${SW * 0.85}px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
`;

export const DotsRow = styled.View`
  position: absolute;
  bottom: 12px;
  left: 0;
  right: 0;
  flex-direction: row;
  justify-content: center;
  gap: 6px;
`;

export const Dot = styled.View<{ active: boolean }>`
  width: ${({ active }) => (active ? "20px" : "6px")};
  height: 6px;
  border-radius: 3px;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.lightGrey};
`;

export const ContentPad = styled.View`
  padding: 20px 20px 0;
  gap: 8px;
`;

export const CategoryLabel = styled(H6)`
  text-transform: capitalize;
`;

export const PriceRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
`;

export const OriginalPrice = styled(H5)`
  text-decoration-line: line-through;
`;

export const DiscountBadge = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 2px 8px;
  border-radius: 8px;
`;

export const MetaRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
`;

export const Separator = styled.View`
  width: 1px;
  height: 14px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
`;

export const AvailabilityBadge = styled.View<{ status: string }>`
  padding: 3px 10px;
  border-radius: 8px;
  background-color: ${({ theme, status }) =>
    status === "In Stock"
      ? theme.colors.primary
      : status === "Low Stock"
        ? "orange"
        : theme.colors.error};
`;

export const TagsRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 6px;
`;

export const Tag = styled.View`
  padding: 4px 10px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
`;

export const Divider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  margin: 8px 0;
`;

export const SectionTitle = styled(H5)`
  margin-bottom: 4px;
`;

export const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const ReviewContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: 12px;
  padding: 12px;
  gap: 6px;
  margin-bottom: 8px;
`;

export const ReviewHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BottomSpacer = styled.View`
  height: 100px;
`;

export const Footer = styled.View`
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

export const QtyControls = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  background-color: ${({ theme }) => theme.colors.default};
  padding: 6px 10px;
  border-radius: 12px;
`;
