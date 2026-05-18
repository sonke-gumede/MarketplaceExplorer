import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import AppTheme from './src/theme';
import RootNavigator from './src/navigation/RootNavigator';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000,
    },
  },
});

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const overlayOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    setAppReady(true);
  }, []);

  useEffect(() => {
    if (!appReady) return;
    Animated.timing(overlayOpacity, {
      toValue: 0,
      duration: 500,
      delay: 200,
      useNativeDriver: true,
    }).start(() => setOverlayVisible(false));
  }, [appReady, overlayOpacity]);

  // Hide the native splash once the JS overlay is rendered — the overlay
  // covers it so the transition is invisible to the user.
  const onOverlayLayout = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <ThemeProvider theme={AppTheme}>
            <SafeAreaView
              style={{ flex: 1, backgroundColor: AppTheme.colors.default }}
              edges={['top', 'left', 'right']}
            >
              <NavigationContainer>
                <RootNavigator />
              </NavigationContainer>
            </SafeAreaView>
            <StatusBar style="auto" />
          </ThemeProvider>
        </SafeAreaProvider>
      </QueryClientProvider>

      {overlayVisible && (
        <Animated.View
          style={[StyleSheet.absoluteFill, { opacity: overlayOpacity }]}
          onLayout={onOverlayLayout}
          pointerEvents="none"
        >
          <Image
            source={require('./assets/splash-icon.png')}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />
        </Animated.View>
      )}
    </View>
  );
}
