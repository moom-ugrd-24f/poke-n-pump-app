import { ThemedView } from "@/components/themedComponents/ThemedView";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Image, RefreshControl, StyleSheet } from "react-native";
import { useColorScheme } from '@/hooks/useColorScheme';
import profile from '@/assets/images/profile.png';
import ProfileInfos from "@/components/profile/ProfileInfos";
import ProfileStats from "@/components/profile/ProfileStats";
import FriendRequest from "@/components/profile/FriendRequest";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserInfo } from "@/hooks/useAPI";
import { ThemedScrollView } from "@/components/themedComponents/ThemedScrollView";

export default function ProfileScreen() {
    const colorScheme = useColorScheme();
    const themeColor = Colors[colorScheme ?? 'light'];

    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchProfile = () => {
        AsyncStorage.getItem('id').then((userId) => {
            if (!userId) return;
            getUserInfo(userId).then((res) => {
                AsyncStorage.setItem('xp', res.data.xp.toString());
                AsyncStorage.setItem('friends', JSON.stringify(res.data.friends));
                AsyncStorage.setItem('inviteCode', res.data.inviteCode);
                AsyncStorage.setItem('visibility', res.data.visibility);
                AsyncStorage.setItem('profilePicture', res.data.profilePicture);
                setIsLoading(false);
            });
        });
    }

    useEffect(() => {
        fetchProfile();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchProfile();
        setRefreshing(false);
    };

    return (
        <ThemedView>
            <ThemedView style={styles.backNavigation} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={75} color={themeColor.main} />
                <Image source={profile} style={styles.backImage} />
            </ThemedView>
            { isLoading ? <ActivityIndicator color={themeColor.default} style={{ height: "70%" }} /> : <ThemedScrollView style={{ height: '100%' }} contentContainerStyle={{ alignItems: 'center', gap: 50 }} showsVerticalScrollIndicator={false} refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={themeColor.default}/> }>
                <ProfileInfos />
                <ProfileStats />
                <FriendRequest />
            </ThemedScrollView> }
        </ThemedView>
    );
}

const styles = StyleSheet.create({
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
