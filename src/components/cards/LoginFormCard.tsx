import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import styled from "styled-components/native";
import { H3, H6 } from "../typography";
import Button from "../buttons/Button";
import IconButton from "../buttons/IconButton";
import Input from "../inputs/Input";

export interface LoginFormCardProps {
  onLogin: (email: string, password: string) => void;
  onForgotPassword: () => void;
}

export default function LoginFormCard({
  onLogin,
  onForgotPassword,
}: LoginFormCardProps) {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card>
      <H3 weight="bold">Welcome back</H3>
      <H6 color="text">Sign in to your account</H6>

      <Input
        label="Email"
        icon="mail-outline"
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Input
        label="Password"
        icon="lock-closed-outline"
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••"
        secureTextEntry={!showPassword}
        autoCapitalize="none"
        rightElement={
          <IconButton
            variant="ghost"
            onPress={() => setShowPassword((v) => !v)}
            icon={
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={18}
                color={theme.colors.text}
                accessible={false}
              />
            }
          />
        }
      />

      <Button
        label="Forgot password?"
        variant="ghost"
        onPress={onForgotPassword}
        style={{ alignSelf: "flex-end" }}
      />

      <Button label="Log In" onPress={() => onLogin(email, password)} />
    </Card>
  );
}

const Card = styled.View`
  background-color: ${({ theme }) => theme.colors.light};
  margin: 0 20px;
  border-radius: 24px;
  padding: 28px 24px;
  gap: 16px;
  elevation: 4;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.08;
  shadow-radius: 12px;
`;
