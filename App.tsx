import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
import AppTheme from './theme';
import RootNavigator from './navigation/RootNavigator';

export default function App() {
  return (
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
  );
}
