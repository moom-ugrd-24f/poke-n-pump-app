import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { setStatusBarStyle } from 'expo-status-bar';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    setTimeout(() => {
      setStatusBarStyle(colorScheme == "light" ? "light" : "dark");
    }, 0);
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen 
          name="(login)/index" 
          options={{ 
            headerShown: false, 
            gestureEnabled: false, 
            contentStyle: { backgroundColor: Colors[colorScheme ?? 'light'].background }
          }} 
        />
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false, 
            gestureEnabled: false, 
            contentStyle: { backgroundColor: Colors[colorScheme ?? 'light'].background } 
          }}
        />
        <Stack.Screen 
          name="(profile)/index" 
          options={{ 
            headerShown: false, 
            gestureEnabled: false, 
            contentStyle: { backgroundColor: Colors[colorScheme ?? 'light'].background } 
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
