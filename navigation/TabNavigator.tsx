import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/dashboard/HomeScreen";
import SearchScreen from "../screens/dashboard/SearchScreen";
import CartScreen from "../screens/dashboard/CartScreen";
import ProfileScreen from "../screens/dashboard/ProfileScreen";

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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
