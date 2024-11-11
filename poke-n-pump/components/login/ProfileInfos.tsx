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
        { image ? <Image source={{ uri: image }} style={styles.image} /> : <Ionicons name="person-circle" size={150} color="white" onPress={pickImage} /> }
        <ThemedView style={styles.username}>
            <ThemedText type='subtitle' lightColor={Colors[colorScheme ?? 'light'].default} darkColor={Colors[colorScheme ?? 'light'].default}>Nickname</ThemedText>
            <ThemedTextInput />
        </ThemedView> 
    </ThemedView>
  );
}

const styles = StyleSheet.create({
    profileView: {
        height: '25%',
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
});