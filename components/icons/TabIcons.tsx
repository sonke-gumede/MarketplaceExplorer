import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface IconProps {
  color?: string;
  size?: number;
}

export const HomeIcon: React.FC<IconProps> = ({ color = "#222", size = 24 }) => (
  <Ionicons name="home-outline" size={size} color={color} accessible={false} />
);

export const SearchIcon: React.FC<IconProps> = ({ color = "#222", size = 24 }) => (
  <Ionicons name="search-outline" size={size} color={color} accessible={false} />
);

export const CartIcon: React.FC<IconProps> = ({ color = "#222", size = 24 }) => (
  <Ionicons name="cart-outline" size={size} color={color} accessible={false} />
);

export const ProfileIcon: React.FC<IconProps> = ({ color = "#222", size = 24 }) => (
  <Ionicons name="person-outline" size={size} color={color} accessible={false} />
);
