import { ThemedText } from "@/components/themedComponents/ThemedText";
import { ThemedView } from "@/components/themedComponents/ThemedView";
import { ActivityIndicator, Image, RefreshControl, StyleSheet } from "react-native";
import notification from '@/assets/images/notification.png';
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { acceptFriendRequest, getReceivedRequests } from "@/hooks/useAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import usePushNotifications from "@/hooks/usePushNotifications";
import { ThemedScrollView } from "@/components/themedComponents/ThemedScrollView";

export default function NotificationsScreen() {
    const colorScheme = useColorScheme();
    const themeColor = Colors[colorScheme ?? 'light'];

    const { expoPushToken, sendNotification } = usePushNotifications();

    const [refreshing, setRefreshing] = useState(false);
    const [receivedRequests, setReceivedRequests] = useState<any[]>([]);
    const [ notifications, setNotifications ] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchNotifications = async () => {
        AsyncStorage.getItem('id').then((userId) => {
            if (userId) {
                getReceivedRequests(userId).then((res) => {
                    if (Array.isArray(res.data)) {
                        setReceivedRequests(res.data.filter((request) => request.status === 'pending'));
                        setIsLoading(false);
                    } else {
                        console.error("Unexpected data format:", res.data);
                    }
                });
            }
        });
        AsyncStorage.getItem('notifications').then((notifications) => {
            if (notifications) {
                setNotifications(JSON.parse(notifications));
            }
        });
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleAccept = (requestId: string, nickname: string) => {
        acceptFriendRequest(requestId).then((res) => {
            if (res.status === 200) {
                setReceivedRequests(receivedRequests.filter((request) => request.id !== requestId));
                sendNotification(expoPushToken, { title: 'Friend Request Accepted', body: `${nickname} is now your friend!` });
            }
        });
    }

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchNotifications();
        setRefreshing(false);
    };

    return (
        <ThemedView style={styles.notificationsView}>
            <ThemedView style={styles.backNavigation} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={75} color={themeColor.main} />
                <Image source={notification} style={styles.backImage} />
            </ThemedView>
            { isLoading ? <ActivityIndicator color={themeColor.default} style={{ height: "70%" }} /> : <ThemedScrollView 
            showsVerticalScrollIndicator={false} 
            refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={themeColor.default}/> }
            >
                {receivedRequests.length === 0 && notifications.length === 0 && (
                    <ThemedText lightColor={themeColor.default} darkColor={themeColor.default}>No notifications</ThemedText>
                )}
                {receivedRequests.map((request, index) => (
                    <ThemedView 
                    key={index} 
                    lightColor={themeColor.default}
                    darkColor={themeColor.default}
                    style={styles.notification}>
                        <ThemedText style={{textAlign: 'left'}} lightColor={themeColor.reverse} darkColor={themeColor.reverse}>
                            {request.senderNickname} sent you a friend request
                        </ThemedText>
                        <ThemedView 
                        lightColor={themeColor.default}
                        darkColor={themeColor.default}
                        style={styles.friendRequestButtons}>
                            <ThemedText 
                            type='default' 
                            lightColor={themeColor.reverse} 
                            darkColor={themeColor.reverse}
                            onPress={() => { handleAccept(request.id, request.senderNickname)}}>
                                Accept
                            </ThemedText>
                            <ThemedText type='default' lightColor={themeColor.reverse} onPress={() => {}}>Reject</ThemedText>
                        </ThemedView>
                    </ThemedView>
                ))}
                {notifications.map((notification, index) => (
                    <ThemedView 
                    key={index} 
                    lightColor={themeColor.default}
                    darkColor={themeColor.default}
                    style={styles.notification}
                    >
                        <ThemedText style={{textAlign: 'left'}} lightColor={themeColor.reverse} darkColor={themeColor.reverse}>
                            {notification}
                        </ThemedText>
                    </ThemedView>
                ))}
            </ThemedScrollView> }
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    notificationsView: {
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
    notification: {
        width: 300,
        padding: 10,
        borderRadius: 10,
        margin: 5,
    },
    friendRequestButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
});
