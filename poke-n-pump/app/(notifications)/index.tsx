import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Image, StyleSheet } from "react-native";
import notification from '@/assets/images/notification.png';
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

export default function NotificationsScreen() {
    const colorScheme = useColorScheme();

    const themeColor = Colors[colorScheme ?? 'light'];

    const notifications = [
        {
            user: 'Paul',
            message: 'poked you ;)',
            type: 'poke'
        },
        {
            user: 'Paul',
            message: 'poked you to Join',
            type: 'join'
        },
        {
            user: 'Paul',
            message: 'shame posted you',
            type: 'shame'
        },
        {
            user: 'Paul',
            message: 'looks down on ya',
            type: 'poke'
        },
        {
            user: 'Paul',
            message: 'poked you ;)',
            type: 'poke'
        },
        {
            user: 'Paul',
            message: 'shame posted you',
            type: 'shame'
        },
    ]

    const determineColor = (type: String) => {
        switch (type) {
            case 'poke':
                return themeColor.default;
            case 'join':
                return themeColor.subLight;
            case 'shame':
                return themeColor.mainLight;
            default:
                return themeColor.default;
        }
    }

    return (
        <ThemedView style={styles.notificationsView}>
            <ThemedView style={styles.backNavigation} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={75} color={themeColor.main} />
                <Image source={notification} style={styles.backImage} />
            </ThemedView>
            <ThemedView style={styles.notificationsContainer}>
                {notifications.map((notification, index) => (
                    <ThemedView 
                    key={index} 
                    lightColor={determineColor(notification.type)}
                    darkColor={determineColor(notification.type)}
                    style={styles.notification}
                    >
                        <ThemedText style={{textAlign: 'left'}} lightColor={themeColor.reverse} darkColor={themeColor.reverse}>
                            {notification.user} {notification.message}
                        </ThemedText>
                    </ThemedView>
                ))}
            </ThemedView>
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
    notificationsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notification: {
        width: 300,
        padding: 10,
        borderRadius: 10,
    }
});
