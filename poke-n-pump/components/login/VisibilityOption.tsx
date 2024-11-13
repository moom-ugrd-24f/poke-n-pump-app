import { StyleSheet } from 'react-native';
import { ThemedView } from '../ThemedView';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '../ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function ProfileInfos() {
  const colorScheme = useColorScheme();
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  const themeColor = Colors[colorScheme ?? 'light'];

  return (
    <ThemedView style={styles.visibilityView}>
        <ThemedText type='title'>Choose your visibility setting</ThemedText>
        <ThemedText type='subtitle' lightColor={themeColor.default} darkColor={themeColor.default}>You can change your setting anytime</ThemedText>
        <ThemedView 
        style={styles.optionView} 
        lightColor={themeColor.default} 
        darkColor={themeColor.default}
        lightBorderColor={isPrivate ? themeColor.main : themeColor.default}
        darkBorderColor={isPrivate ? themeColor.main : themeColor.default}
        onPress={() => setIsPrivate(true)}>
            <Ionicons name="person" size={24} color={themeColor.reverse} />
            <ThemedText lightColor={themeColor.reverse} darkColor={themeColor.reverse}>Friends</ThemedText>
        </ThemedView>
        <ThemedView 
        style={styles.optionView}
        lightColor={themeColor.default}
        darkColor={themeColor.default}
        lightBorderColor={!isPrivate ? themeColor.main : themeColor.default}
        darkBorderColor={!isPrivate ? themeColor.main : themeColor.default}
        onPress={() => setIsPrivate(false)}>
            <Ionicons name="earth" size={24} color={themeColor.reverse} />
            <ThemedText lightColor={themeColor.reverse} darkColor={themeColor.reverse}>Anyone</ThemedText>
        </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
    visibilityView: {
        height: '40%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
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
