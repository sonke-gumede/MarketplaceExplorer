import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/dashboard/HomeScreen";
import SearchScreen from "../screens/dashboard/SearchScreen";
import CartScreen from "../screens/dashboard/CartScreen";
import ProfileScreen from "../screens/dashboard/ProfileScreen";
import {
  HomeIcon,
  SearchIcon,
  CartIcon,
  ProfileIcon,
} from "../components/icons/TabIcons";

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Cart: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
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
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <SearchIcon color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
