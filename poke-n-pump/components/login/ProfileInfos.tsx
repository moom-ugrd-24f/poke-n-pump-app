import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedButton } from '@/components/ThemedButton';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { checkUsername } from '@/hooks/useAPI';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';

interface ProfileInfosProps {
    enableCompleteButton: (enabled: boolean) => void;
}

export default function ProfileInfos({ enableCompleteButton }: ProfileInfosProps) {
    const colorScheme = useColorScheme();
    const [image, setImage] = useState<string | null>(null);
    const [username, setUsername] = useState('');	

    const themeColor = Colors[colorScheme ?? 'light'];

    useEffect(() => {
        enableCompleteButton(false)
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const onCheckButtonPressed = async () => {
        enableCompleteButton(true);
        saveUsername();
        let toast = Toast.show('Username is available', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
            hideOnPress: true,
            shadow: true,
            animation: true,
        });
        return;

        // API call to check if username is already taken
        const res = await checkUsername(username);
        if (res.status === 400) {
            console.log(res.data);
            // Show server error toast
            return;
        }
        if (res.data.exists === false) {
            console.log('Username is available');
            enableCompleteButton(true);
            saveUsername();
        } else {
            console.log('Username is taken');
            // Show duplicate alert toast
        }
    }

    const saveUsername = async () => {
        console.log("Username : " + username);

        if (username === null || username === '') {
            return;
        }

        try {
            await AsyncStorage.setItem('username', username);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <ThemedView style={styles.profileView}>
            <ThemedText type="title">Welcome to{" "}
                <ThemedText 
                    type="title" 
                    lightColor={themeColor.sub} 
                    darkColor={themeColor.sub}>
                    Poke
                </ThemedText>
                &
                <ThemedText
                    type="title" 
                    lightColor={themeColor.sub} 
                    darkColor={themeColor.sub}>
                    Pump
                </ThemedText>
                !
            {"\n"}Let me know about you.</ThemedText>
            { image ? 
            <Image 
                source={{ uri: image }} 
                style={styles.image} 
            /> : 
            <Ionicons 
                name="person-circle" 
                size={150} 
                color="white" 
                onPress={pickImage} 
            /> 
            }
            <ThemedView style={styles.username}>
                <ThemedText type='subtitle' lightColor={themeColor.default} darkColor={themeColor.default}>Nickname</ThemedText>
                <ThemedView style={styles.usernameInput}>
                    <ThemedTextInput onChangeText={setUsername} />
                    <ThemedButton 
                        title="Check"
                        style={styles.checkButton}
                        onPress={onCheckButtonPressed} 
                    />
                </ThemedView>
            </ThemedView> 
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    profileView: {
        height: '40%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    image: {
        width: 125,
        height: 125,
        borderRadius: 100,
    },
    username: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        alignItems: 'center',
    },
    usernameInput: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        alignItems: 'center',
    },
    checkButton: {
        width: 100
    }
});
