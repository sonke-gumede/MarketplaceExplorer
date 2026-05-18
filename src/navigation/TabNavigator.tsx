import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/dashboard/HomeScreen";
import CartScreen from "../screens/dashboard/CartScreen";
import ProfileScreen from "../screens/dashboard/ProfileScreen";
import { HomeIcon, CartIcon, ProfileIcon } from "../components/icons/TabIcons";
import { useCartStore } from "../store/useCartStore";
import AppTheme from "../theme";

export type TabParamList = {
  Home: undefined;
  Cart: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  const itemCount = useCartStore((s) => s.getItemCount());

  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: AppTheme.colors.primary }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <HomeIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <CartIcon color={color} size={size} />
          ),
          tabBarBadge: itemCount > 0 ? itemCount : undefined,
          tabBarBadgeStyle: { fontSize: 9, minWidth: 16, height: 16, lineHeight: 16, top: 4 },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ProfileIcon color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
