import { Image, StyleSheet } from "react-native";
import avatar from '@/assets/images/avatar.jpeg';
import { ThemedView } from "@/components/ThemedView"
import { ThemedText } from "@/components/ThemedText";
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from "@/constants/Colors";

export default function ProfileInfos() {
    const colorScheme = useColorScheme();
    const themeColor = Colors[colorScheme ?? 'light'];

    return (
        <ThemedView style={styles.profileView}>
            <Image source={avatar} style={styles.avatar} />
            <ThemedText type='subtitle' lightColor={themeColor.main}>Jane Fonda</ThemedText>
            <ThemedText type="default" lightColor={themeColor.mainLight}>Invitation Code 
                <ThemedText type="default" lightColor={themeColor.default}>AG3Hj7</ThemedText>
            </ThemedText>
            <ThemedView style={styles.stats} lightColor={themeColor.mainDark} darkColor={themeColor.mainDark}>
                <ThemedView lightColor={themeColor.mainDark} darkColor={themeColor.mainDark}>
                    <ThemedText type="defaultSemiBold" lightColor={themeColor.default}>21</ThemedText>
                    <ThemedText type="default" lightColor={themeColor.default}>Streaks</ThemedText>
                </ThemedView>
                <ThemedView style={styles.separator} lightColor={themeColor.default} darkColor={themeColor.default} />
                <ThemedView lightColor={themeColor.mainDark} darkColor={themeColor.mainDark}>
                    <ThemedText type="defaultSemiBold" lightColor={themeColor.default}>280</ThemedText>
                    <ThemedText type="default" lightColor={themeColor.default}>XP</ThemedText>
                </ThemedView>
                <ThemedView style={styles.separator} lightColor={themeColor.default} darkColor={themeColor.default} />
                <ThemedView lightColor={themeColor.mainDark} darkColor={themeColor.mainDark}>
                    <ThemedText type="defaultSemiBold" lightColor={themeColor.default}>5</ThemedText>
                    <ThemedText type="default" lightColor={themeColor.default}>Friends</ThemedText>
                </ThemedView>
            </ThemedView>
        </ThemedView>
    );
} 

const styles = StyleSheet.create({
    profileView: {
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 100,
        resizeMode: 'cover',
    },
    stats: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
        padding: 10,
        borderRadius: 10,
    },
    separator: {
        width: 1,
        height: '100%',
    }
});
