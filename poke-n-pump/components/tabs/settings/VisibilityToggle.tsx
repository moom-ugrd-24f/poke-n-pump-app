import { StyleSheet } from 'react-native';
import { ThemedView } from '../../themedComponents/ThemedView';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '../../themedComponents/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function VisibilityToggle({orientation, visibility, setVisibility}) {
    const colorScheme = useColorScheme();

    const themeColor = Colors[colorScheme ?? 'light'];

    const [isPrivate, setIsPrivate] = useState<boolean>(false);

    useEffect(() => {
        setIsPrivate(visibility === 'friend');
    }, [visibility]);

    const updateVisibility = (visibility: string) => {
        setIsPrivate(visibility === 'friend');
        setVisibility(visibility);
    }

    const styles = StyleSheet.create({
        visibilityView: {
            display: 'flex',
            flexDirection: orientation,
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

    return (
        <ThemedView style={styles.visibilityView}>
            <ThemedView 
                style={styles.optionView} 
                lightColor={isPrivate ? themeColor.main : themeColor.default} 
                darkColor={isPrivate ? themeColor.main : themeColor.default}
                lightBorderColor={isPrivate ? themeColor.mainDark : themeColor.default}
                darkBorderColor={isPrivate ? themeColor.mainDark : themeColor.default}
                onPress={() => {
                    updateVisibility('friend');
                }}>
                <Ionicons name="person" size={24} color={themeColor.reverse} />
                <ThemedText lightColor={themeColor.reverse} darkColor={themeColor.reverse}>Friends</ThemedText>
            </ThemedView>
            <ThemedView 
                style={styles.optionView}
                lightColor={!isPrivate ? themeColor.main : themeColor.default} 
                darkColor={!isPrivate ? themeColor.main : themeColor.default}
                lightBorderColor={!isPrivate ? themeColor.mainDark : themeColor.default}
                darkBorderColor={!isPrivate ? themeColor.mainDark : themeColor.default}
                onPress={() => {
                    updateVisibility('global');
                }}>
                <Ionicons name="earth" size={24} color={themeColor.reverse} />
                <ThemedText lightColor={themeColor.reverse} darkColor={themeColor.reverse}>Anyone</ThemedText>
            </ThemedView>
        </ThemedView>
    );
}
