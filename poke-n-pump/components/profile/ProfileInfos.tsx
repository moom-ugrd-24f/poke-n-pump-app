import { Image, StyleSheet } from "react-native";
import avatar from '@/assets/images/avatar.jpeg';
import { ThemedView } from "@/components/ThemedView"
import { ThemedText } from "@/components/ThemedText";
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileInfos() {
    const colorScheme = useColorScheme();
    const themeColor = Colors[colorScheme ?? 'light'];
    const [username, setUsername] = useState('Jane Fonda');
    const [numStreak, setNumStreak] = useState(0);
    const [xp, setXp] = useState(0);
    const [numFriend, setNumFriend] = useState(0);
    const [invitationCode, setInvitationCode] = useState('AG3Hj7');

    useEffect(() => {
        loadUsername();
    }, []);

    const loadUsername = async () => {
        try {
            const storedUsername = await AsyncStorage.getItem('username');
            if (storedUsername !== null) {
                setUsername(storedUsername);
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <ThemedView style={styles.profileView}>
            <Image source={avatar} style={styles.avatar} />
            <ThemedText type='subtitle' lightColor={themeColor.main}>{username}</ThemedText>
            <ThemedText type="default" lightColor={themeColor.mainLight}>Invitation Code
                <ThemedText type="default" lightColor={themeColor.default}>  {invitationCode}</ThemedText>
            </ThemedText>
            <ThemedView style={styles.stats} lightColor={themeColor.mainDark} darkColor={themeColor.mainDark}>
                <ThemedView lightColor={themeColor.mainDark} darkColor={themeColor.mainDark}>
                    <ThemedText type="defaultSemiBold" lightColor={themeColor.default}>{numStreak}</ThemedText>
                    <ThemedText type="default" lightColor={themeColor.default}>Streaks</ThemedText>
                </ThemedView>
                <ThemedView style={styles.separator} lightColor={themeColor.default} darkColor={themeColor.default} />
                <ThemedView lightColor={themeColor.mainDark} darkColor={themeColor.mainDark}>
                    <ThemedText type="defaultSemiBold" lightColor={themeColor.default}>{xp}</ThemedText>
                    <ThemedText type="default" lightColor={themeColor.default}>XP</ThemedText>
                </ThemedView>
                <ThemedView style={styles.separator} lightColor={themeColor.default} darkColor={themeColor.default} />
                <ThemedView lightColor={themeColor.mainDark} darkColor={themeColor.mainDark}>
                    <ThemedText type="defaultSemiBold" lightColor={themeColor.default}>{numFriend}</ThemedText>
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
