import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedTextInput } from '../ThemedTextInput';

export default function ProfileInfos() {
    const colorScheme = useColorScheme();
    const [image, setImage] = useState<string | null>(null);

    const themeColor = Colors[colorScheme ?? 'light'];

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
        setImage(result.assets[0].uri);
        }
    };

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
        { image ? <Image source={{ uri: image }} style={styles.image} /> : <Ionicons name="person-circle" size={150} color="white" onPress={pickImage} /> }
        <ThemedView style={styles.username}>
            <ThemedText type='subtitle' lightColor={themeColor.default} darkColor={themeColor.default}>Nickname</ThemedText>
            <ThemedTextInput />
        </ThemedView> 
    </ThemedView>
  );
}

const styles = StyleSheet.create({
    profileView: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20
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
});
