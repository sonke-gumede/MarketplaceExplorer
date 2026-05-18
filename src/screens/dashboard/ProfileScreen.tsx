import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import styled from "styled-components/native";
import { H2, H4, H5, H6 } from "../../components/typography";
import {
  Container,
  Header,
  Section,
  SectionHeader,
  InfoRowContainer,
  IconBox,
  InfoText,
} from "../../components/containers";
import Button from "../../components/buttons/Button";
import AvatarCard from "../../components/cards/AvatarCard";
import { useAuthStore } from "../../store/useAuthStore";

const USER = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+27 78 842 3910",
  member: "Member since Jan 2023",
  avatar: "JD",
};

const BILLING = {
  cardHolder: "John Doe",
  cardNumber: "**** **** **** 4821",
  expiry: "08 / 27",
  cardType: "Visa",
  billingAddress: "742 Evergreen Terrace",
  city: "Johannesburg",
  state: " Gauteng",
  zip: "2001",
  country: "South Africa",
};

const ORDERS = { total: 34, pending: 2, delivered: 31, cancelled: 1 };

export default function ProfileScreen() {
  const theme = useTheme();
  const logout = useAuthStore((s) => s.logout);

  return (
    <Container>
      <Header>
        <H2 weight="bold">Profile</H2>
      </Header>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, gap: 16, paddingBottom: 40 }}
      >
        <AvatarCard
          initials={USER.avatar}
          name={USER.name}
          email={USER.email}
          memberSince={USER.member}
        />

        {/* Order stats */}
        <Section>
          <SectionHeader>
            <Ionicons
              name="bag-outline"
              size={18}
              color={theme.colors.primary}
              accessible={false}
            />
            <H5 weight="semiBold"> Orders</H5>
          </SectionHeader>
          <StatsRow>
            <StatBox>
              <H4 weight="bold" color="primary">
                {ORDERS.total}
              </H4>
              <H6 color="text">Total</H6>
            </StatBox>
            <StatDivider />
            <StatBox>
              <H4 weight="bold">{ORDERS.pending}</H4>
              <H6 color="text">Pending</H6>
            </StatBox>
            <StatDivider />
            <StatBox>
              <H4 weight="bold">{ORDERS.delivered}</H4>
              <H6 color="text">Delivered</H6>
            </StatBox>
            <StatDivider />
            <StatBox>
              <H4 weight="bold">{ORDERS.cancelled}</H4>
              <H6 color="text">Cancelled</H6>
            </StatBox>
          </StatsRow>
        </Section>

        {/* Personal info */}
        <Section>
          <SectionHeader>
            <Ionicons
              name="person-outline"
              size={18}
              color={theme.colors.primary}
              accessible={false}
            />
            <H5 weight="semiBold"> Personal Information</H5>
          </SectionHeader>
          <InfoRow label="Full Name" value={USER.name} icon="person-outline" />
          <InfoRow label="Email" value={USER.email} icon="mail-outline" />
          <InfoRow label="Phone" value={USER.phone} icon="call-outline" />
        </Section>

        {/* Billing */}
        <Section>
          <SectionHeader>
            <Ionicons
              name="card-outline"
              size={18}
              color={theme.colors.primary}
              accessible={false}
            />
            <H5 weight="semiBold"> Billing</H5>
          </SectionHeader>

          <CardPreview>
            <CardTop>
              <H6 color="light">{BILLING.cardType}</H6>
              <Ionicons
                name="card"
                size={22}
                color="rgba(255,255,255,0.8)"
                accessible={false}
              />
            </CardTop>
            <H5 weight="semiBold" color="light">
              {BILLING.cardNumber}
            </H5>
            <CardBottom>
              <CardField>
                <H6 color="light" weight="semiBold">
                  {BILLING.cardHolder}
                </H6>
                <H6 color="light">Card Holder</H6>
              </CardField>
              <CardField>
                <H6 color="light" weight="semiBold">
                  {BILLING.expiry}
                </H6>
                <H6 color="light">Expires</H6>
              </CardField>
            </CardBottom>
          </CardPreview>

          <InfoRow
            label="Billing Address"
            value={BILLING.billingAddress}
            icon="location-outline"
          />
          <InfoRow
            label="City"
            value={`${BILLING.city}, ${BILLING.state} ${BILLING.zip}`}
            icon="business-outline"
          />
          <InfoRow
            label="Country"
            value={BILLING.country}
            icon="globe-outline"
          />
        </Section>

        <Button
          label="Log Out"
          variant="ghost"
          danger
          onPress={logout}
          style={{ alignSelf: "stretch", alignItems: "center", paddingVertical: 12 }}
        />
      </ScrollView>
    </Container>
  );
}

function InfoRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  const theme = useTheme();
  return (
    <InfoRowContainer>
      <IconBox>
        <Ionicons
          name={icon as any}
          size={16}
          color={theme.colors.primary}
          accessible={false}
        />
      </IconBox>
      <InfoText>
        <H6 color="text">{label}</H6>
        <H6 weight="semiBold">{value}</H6>
      </InfoText>
    </InfoRowContainer>
  );
}

const StatsRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const StatBox = styled.View`
  flex: 1;
  align-items: center;
  gap: 2px;
`;

const StatDivider = styled.View`
  width: 1px;
  height: 32px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
`;

const CardPreview = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 16px;
  padding: 20px;
  gap: 14px;
`;

const CardTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CardBottom = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const CardField = styled.View`
  gap: 2px;
`;
