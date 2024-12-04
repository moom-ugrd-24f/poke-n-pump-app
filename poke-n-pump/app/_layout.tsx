import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/useColorScheme';
import { setStatusBarStyle } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import firebaseApp from "../constants/firebaseConfig"; // Firebase 초기화 가져오기

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
    });

    const [isLoading, setIsLoading] = useState(true);
    const [isFirstTimeLoad, setIsFirstTimeLoad] = useState(false);
    useEffect(() => {
        console.log("Firebase Initialized:", firebaseApp.name);
    }, []);

    // Hide splash screen once fonts are loaded
    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    // Set status bar style based on the theme
    useEffect(() => {
        setTimeout(() => {
          setStatusBarStyle(colorScheme === 'light' ? 'light' : 'dark');
        }, 0);
    }, []);

    // Check AsyncStorage for the username
    useEffect(() => {
        const checkFirstTimeLoaded = async () => {
            try {
                const username = await AsyncStorage.getItem('username');
                setIsFirstTimeLoad(username === null);
            } catch (e) {
                console.error('Error reading AsyncStorage:', e);
                setIsFirstTimeLoad(false); // Assume not first time on error
            } finally {
                setIsLoading(false);
            }
        };

        checkFirstTimeLoaded();
    }, []);

    // Show nothing or a loading spinner while determining the load state
    if (isLoading) {
        return null; // Replace with a spinner if desired
    }

    // Render appropriate stack based on `isFirstTimeLoad`
    return (
        <RootSiblingParent>
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors[colorScheme ?? 'light'].background }}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack
                initialRouteName={isFirstTimeLoad ? '(login)/index' : '(tabs)'}
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: Colors[colorScheme ?? 'light'].background },
                }}
            >
                <Stack.Screen name="(login)/index" />
                <Stack.Screen name="(tabs)" options={{ animation: 'none' }}/>
                <Stack.Screen name="(profile)/index" />
                <Stack.Screen name="(shamePost)/index" />
                <Stack.Screen name="(notifications)/index" />
                <Stack.Screen name="(profile)/(friends)/index" />
            </Stack>
        </ThemeProvider>
        </SafeAreaView>
        </RootSiblingParent>
    );
}