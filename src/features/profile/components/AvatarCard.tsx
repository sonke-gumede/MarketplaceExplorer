import styled from "styled-components/native";
import { H3, H4, H6 } from "../../../shared/components/typography";

export interface AvatarCardProps {
  initials: string;
  name: string;
  email: string;
  memberSince: string;
}

export default function AvatarCard({
  initials,
  name,
  email,
  memberSince,
}: AvatarCardProps) {
  return (
    <Card>
      <Avatar>
        <H3 weight="bold" color="light">
          {initials}
        </H3>
      </Avatar>
      <UserInfo>
        <H4 weight="bold">{name}</H4>
        <H6 color="text">{email}</H6>
        <H6 color="text">{memberSince}</H6>
      </UserInfo>
    </Card>
  );
}

const Card = styled.View`
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: 20px;
  padding: 20px;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.05;
  shadow-radius: 6px;
`;

const Avatar = styled.View`
  width: 72px;
  height: 72px;
  border-radius: 36px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
`;

const UserInfo = styled.View`
  gap: 3px;
`;
