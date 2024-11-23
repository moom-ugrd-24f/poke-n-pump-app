import { ThemedView } from "@/components/ThemedView";
import { Image, StyleSheet } from "react-native";
import shamePost from '@/assets/images/shamePost.png';
import shamePostInsta from '@/assets/images/shamePostInsta.png';
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from "@/constants/Colors";
import * as Sharing from 'expo-sharing';
import { Asset } from 'expo-asset';
import Toast from 'react-native-root-toast';

export default function ShamePostScreen() {
    const colorScheme = useColorScheme();

    const themeColor = Colors[colorScheme ?? 'light'];

    const postToast = () => {
        let toast = Toast.show('You earned 50XP by shaming your friend :)', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
            hideOnPress: true,
            shadow: true,
            animation: true,
        });
    }

    const openInstagramStoryWithImage = async () => {
        postToast();
        try {
            const asset = Asset.fromModule(require('@/assets/images/shamePostInsta.png'));
            await asset.downloadAsync();
            const imageUri = asset.localUri || asset.uri;

            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(imageUri, {
                mimeType: 'image/png',
                dialogTitle: 'Share to Instagram',
                });
            } else {
                console.log('Sharing is not available on this device');
            }
            } catch (error) {
          console.error('Error sharing image:', error);
        }
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.backNavigation} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={75} color={themeColor.main} />
                <Image source={shamePost} style={styles.backImage} />
            </ThemedView>
            <Image source={shamePostInsta} style={styles.shamePostInsta}/>
            <Ionicons name="logo-instagram" size={75} color={themeColor.main} onPress={openInstagramStoryWithImage} />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
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
    shamePostInsta: {
        width: 300,
        height: undefined,
        aspectRatio: 494 / 880,
        resizeMode: 'contain'
    },
});
