import { StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VisibilityToggle() {
    const colorScheme = useColorScheme();

    const themeColor = Colors[colorScheme ?? 'light'];

    const [isPrivate, setIsPrivate] = useState<boolean>(false);

    useEffect(() => {
        loadVisibility();
    }, []);

    const loadVisibility = async () => {
        try {
            const visibilityString = await AsyncStorage.getItem('visibility');
            const visibility = visibilityString !== null ? JSON.parse(visibilityString) : false;
            setIsPrivate(visibility);
        } catch (e) {
            console.error(e);
        }
    }

    const storeVisibility = async (value: boolean) => {
        try {
            await AsyncStorage.setItem('visibility', JSON.stringify(value));
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <ThemedView style={styles.visibilityView}>
            <ThemedView 
            style={styles.optionView} 
            lightColor={themeColor.default} 
            darkColor={themeColor.default}
            lightBorderColor={isPrivate ? themeColor.main : themeColor.default}
            darkBorderColor={isPrivate ? themeColor.main : themeColor.default}
            onPress={() => {
                setIsPrivate(true);
                storeVisibility(true);
            }}>
                <Ionicons name="person" size={24} color={themeColor.reverse} />
                <ThemedText lightColor={themeColor.reverse} darkColor={themeColor.reverse}>Friends</ThemedText>
            </ThemedView>
            <ThemedView 
            style={styles.optionView}
            lightColor={themeColor.default}
            darkColor={themeColor.default}
            lightBorderColor={!isPrivate ? themeColor.main : themeColor.default}
            darkBorderColor={!isPrivate ? themeColor.main : themeColor.default}
            onPress={() => {
                setIsPrivate(false);
                storeVisibility(false);
            }}>
                <Ionicons name="earth" size={24} color={themeColor.reverse} />
                <ThemedText lightColor={themeColor.reverse} darkColor={themeColor.reverse}>Anyone</ThemedText>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    visibilityView: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
    },
    optionView: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        padding: 10,
        width: 150,
        borderWidth: 2.5,
        borderRadius: 10,
    }
});
