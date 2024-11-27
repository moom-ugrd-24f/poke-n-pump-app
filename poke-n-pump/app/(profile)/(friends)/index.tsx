import { ThemedView } from "@/components/themedComponents/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ActivityIndicator, RefreshControl, StyleSheet } from "react-native";
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedText } from "@/components/themedComponents/ThemedText";
import { getUserInfo, removeFriend } from "@/hooks/useAPI";
import { ThemedScrollView } from "@/components/themedComponents/ThemedScrollView";

export default function FriendsScreen() {
    const colorScheme = useColorScheme();
    const themeColor = Colors[colorScheme ?? 'light'];

    const [friends, setFriends] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchFriends = () => {
        AsyncStorage.getItem('id').then((userId) => {
            if (!userId) return;
            getUserInfo(userId).then((res) => {
                if (!res.data.friends) return;
                Promise.all(res.data.friends.map((friend: string) => getUserInfo(friend).then((res) => res.data)))
                .then((results) => {
                    setFriends(results.filter((friend) => friend._id !== userId));
                    setIsLoading(false);
                });
            });
        });
    };

    const handleRemoveFriend = (id: string) => {
        AsyncStorage.getItem('id').then((userId) => {
            if (!userId) return;
            removeFriend(userId, id).then((res) => setFriends(friends.filter((friend) => friend._id !== id)) );
        });
    }

    useEffect(() => {
        fetchFriends();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchFriends();
        setRefreshing(false);
    };

    return (
        <ThemedView style={styles.friendsView}>
            <ThemedView style={styles.backNavigation} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={75} color={themeColor.main} />
                {/* <Image source={friends} style={styles.backImage} /> */}
            </ThemedView>
            { isLoading ? <ActivityIndicator color={themeColor.default} style={{ height: "70%" }} /> : (
                <ThemedScrollView
                showsVerticalScrollIndicator={false} 
                refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={themeColor.default}/> }>
                { friends.length ? friends.map((friend, index) => (
                    <ThemedView 
                    lightColor={themeColor.default}
                    darkColor={themeColor.default} 
                    style={styles.friend}
                    key={index}>
                        <ThemedText 
                        type="default"
                        style={{textAlign: 'left'}}
                        lightColor={themeColor.reverse}
                        darkColor={themeColor.reverse}>
                            {friend.nickname}
                        </ThemedText>
                        <Ionicons name="remove-circle" size={25} color="#FF0000" onPress={() => handleRemoveFriend(friend._id)} />
                    </ThemedView> )) : <ThemedText type="default" lightColor={themeColor.default} darkColor={themeColor.default}>You have no friends yet</ThemedText> }
                </ThemedScrollView>
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    friendsView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
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
    friend: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 300,
        padding: 10,
        borderRadius: 10,
        margin: 5,
    },
});