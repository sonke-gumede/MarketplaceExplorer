import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import styled from "styled-components/native";
import { Container } from "../../components/containers";
import { H1, H6 } from "../../components/typography";
import Button from "../../components/buttons/Button";
import LoginFormCard from "../../components/cards/LoginFormCard";
import { useAuthStore } from "../../store/useAuthStore";

export default function LoginScreen() {
  const theme = useTheme();
  const login = useAuthStore((s) => s.login);

  return (
    <Container>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <BrandArea>
            <LogoCircle>
              <Ionicons
                name="storefront"
                size={36}
                color={theme.colors.light}
                accessible={false}
              />
            </LogoCircle>
            <H1 weight="bold" color="primary">
              Marketplace
            </H1>
            <H6 color="text">Discover products you'll love</H6>
          </BrandArea>

          <LoginFormCard
            onLogin={login}
            onForgotPassword={() => {}}
          />

          <SignUpRow>
            <H6 color="text">Don't have an account?</H6>
            <Button label="Sign Up" variant="ghost" onPress={() => {}} />
          </SignUpRow>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}

const BrandArea = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 48px 24px 32px;
  gap: 8px;
`;

const LogoCircle = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

const SignUpRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 24px;
  gap: 4px;
`;
