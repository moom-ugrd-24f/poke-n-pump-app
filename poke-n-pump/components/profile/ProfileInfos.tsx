import { Image, StyleSheet } from "react-native";
import avatar from '@/assets/images/avatar.jpeg';
import { ThemedView } from "@/components/themedComponents/ThemedView"
import { ThemedText } from "@/components/themedComponents/ThemedText";
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";

export default function ProfileInfos() {
    const colorScheme = useColorScheme();
    const themeColor = Colors[colorScheme ?? 'light'];
    const [username, setUsername] = useState('');
    const [numStreak, setNumStreak] = useState(0);
    const [xp, setXp] = useState(0);
    const [numFriend, setNumFriend] = useState(0);
    const [invitationCode, setInvitationCode] = useState('');
    const [profilePicture, setProfilePicture] = useState('');

    useEffect(() => {
        AsyncStorage.multiGet(['nickname', 'xp', 'friends', 'inviteCode', 'profilePicture']).then((res) => {
            const nickname = res[0][1] || '';
            const xp = parseInt(res[1][1] || '0');
            const friends = JSON.parse(res[2][1] || "[]");
            const inviteCode = res[3][1] || '';
            const profilePicture = res[4][1] || '';

            setUsername(nickname);
            setXp(xp);
            setNumFriend(friends.length);
            setInvitationCode(inviteCode);
            setProfilePicture(profilePicture);
        });
    }, []);

    return (
        <ThemedView style={styles.profileView}>
            <Image source={profilePicture ? { uri: profilePicture } : avatar} style={styles.avatar} />
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
                <ThemedView lightColor={themeColor.mainDark} darkColor={themeColor.mainDark} onPress={() => router.navigate('/(profile)/(friends)')}>
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
