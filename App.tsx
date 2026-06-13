import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components/native";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import AppTheme from "./src/theme";
import RootNavigator from "./src/navigation/RootNavigator";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "./src/graphql";

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ fade: true, duration: 400 });

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const onLayout = useCallback(async () => {
    if (ready) await SplashScreen.hideAsync();
  }, [ready]);

  if (!ready) return null;

  return (
    <View style={{ flex: 1 }} onLayout={onLayout}>
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <ThemeProvider theme={AppTheme}>
            <SafeAreaView
              style={{ flex: 1, backgroundColor: AppTheme.colors.default }}
              edges={["top", "left", "right"]}
            >
              <NavigationContainer>
                <RootNavigator />
              </NavigationContainer>
            </SafeAreaView>
            <StatusBar style="auto" />
          </ThemeProvider>
        </SafeAreaProvider>
      </ApolloProvider>
    </View>
  );
}
