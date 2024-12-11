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
import { getUserInfo } from "@/hooks/useAPI";
import { ThemedScrollView } from "@/components/themedComponents/ThemedScrollView";
import { getUserId } from "@/hooks/useAsyncStorage";
import { KeyboardAwareScrollView, KeyboardToolbar } from 'react-native-keyboard-controller';

export default function ProfileScreen() {
    const colorScheme = useColorScheme();
    const themeColor = Colors[colorScheme ?? 'light'];

    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const [xp, setXp] = useState(0);
    const [numFriend, setNumFriend] = useState(0);
    const [invitationCode, setInvitationCode] = useState('');
    const [gymStreak, setGymStreak] = useState(0);
    const [pokeCount, setPokeCount] = useState(0);
    const [shamePostCount, setShamePostCount] = useState(0);

    const fetchProfile = () => {
        getUserId().then((userId) => {
            if (!userId) return;
            getUserInfo(userId).then((res) => {
                setXp(res.data.xp);
                setNumFriend(res.data.friends.length);
                setInvitationCode(res.data.inviteCode);
                setGymStreak(res.data.gymStreak);
                setPokeCount(res.data.pokeCount);
                setShamePostCount(res.data.shamePostCount);
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
                { isLoading 
                ? <ActivityIndicator color={themeColor.default} style={{ height: "70%" }} /> 
                : <KeyboardAwareScrollView 
                    bottomOffset={100}
                    contentContainerStyle={styles.scrollContainer} 
                    showsVerticalScrollIndicator={false} 
                    refreshControl={ 
                        <RefreshControl 
                            refreshing={refreshing} 
                            onRefresh={onRefresh} 
                            tintColor={themeColor.default}/> 
                    }>
                    <ProfileInfos xp={xp} numFriend={numFriend} invitationCode={invitationCode} />
                    <ProfileStats gymStreak={gymStreak} pokeCount={pokeCount} shamePostCount={shamePostCount} />
                    <FriendRequest />
                </KeyboardAwareScrollView>}
            </ThemedView>
    );
}

const styles = StyleSheet.create({
    backNavigation: {
        width: '100%',
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
    scrollContainer: { 
        alignItems: 'center', 
        gap: 50,
    },
});
