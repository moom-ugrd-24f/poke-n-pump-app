import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { setStatusBarStyle } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
      SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
    });

    const [isFirstTimeLoad, setIsFirstTimeLoad] = useState(false) 

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

    useEffect(() => {
        checkFirstTimeLoaded();
    }, []);

    const checkFirstTimeLoaded = async () => {
        try {
            const username = await AsyncStorage.getItem('username');
            console.log("Stored username: " + username);
            if (username === null) {
                setIsFirstTimeLoad(true);
            } else {
                setIsFirstTimeLoad(false);
            }
        } catch (e) {
            console.error(e);
        }
    }

    if (!loaded) {
        return null;
    }

    console.log("First time load: " + isFirstTimeLoad);

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Colors[colorScheme ?? 'light'].background }}}>
                { isFirstTimeLoad ? (
                    <>
                    <Stack.Screen name="(login)/index" />
                    <Stack.Screen name="(tabs)" />
                    <Stack.Screen name="(profile)/index" />
                    </>
                ) : (
                    <>
                    <Stack.Screen name="(tabs)" />
                    <Stack.Screen name="(profile)/index" />
                    </>
                )}
            </Stack>
        </ThemeProvider>
    );
}
