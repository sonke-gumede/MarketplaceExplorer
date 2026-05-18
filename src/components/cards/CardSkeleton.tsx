import { memo } from "react";
import styled from "styled-components/native";

const CardSkeleton = memo(() => (
  <Card>
    <ImagePlaceholder />
    <Body>
      <Line width="45%" height={10} />
      <Line width="85%" height={14} />
      <Line width="60%" height={10} />
      <Line width="50%" height={18} />
      <Line width="100%" height={34} borderRadius={10} />
    </Body>
  </Card>
));

export default CardSkeleton;

const Card = styled.View`
  flex: 1;
  margin: 6px;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: 16px;
  overflow: hidden;
`;

const ImagePlaceholder = styled.View`
  width: 100%;
  height: 150px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
`;

const Body = styled.View`
  padding: 10px;
  gap: 8px;
`;

const Line = styled.View<{ width: string; height: number; borderRadius?: number }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height}px;
  border-radius: ${({ borderRadius }) => borderRadius ?? 4}px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
`;
