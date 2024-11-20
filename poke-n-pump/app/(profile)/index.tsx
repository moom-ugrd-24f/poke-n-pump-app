import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet } from "react-native";
import { useColorScheme } from '@/hooks/useColorScheme';
import profile from '@/assets/images/profile.png';
import ProfileInfos from "@/components/profile/ProfileInfos";
import ProfileStats from "@/components/profile/ProfileStats";
import FriendRequest from "@/components/profile/FriendRequest";
import { router } from "expo-router";

export default function ProfileScreen() {
    const colorScheme = useColorScheme();

    const themeColor = Colors[colorScheme ?? 'light'];

    return (
        <ThemedView style={styles.profileView}>
            <ThemedView style={styles.backNavigation} onPress={() => router.navigate('/(tabs)')}>
                <Ionicons name="arrow-back" size={75} color={themeColor.main} />
                <Image source={profile} style={styles.backImage} />
            </ThemedView>
            <ProfileInfos />
            <ProfileStats />
            <FriendRequest />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    profileView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 50,
    },
    backNavigation: {
        width: '100%',
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    backImage: {
        width: 200,
        height: undefined,
        aspectRatio: 272 / 130,
        resizeMode: 'contain',
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 100,
        resizeMode: 'cover',
    },
});
