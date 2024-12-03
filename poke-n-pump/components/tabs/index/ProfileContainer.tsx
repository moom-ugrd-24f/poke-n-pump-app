import { StyleSheet, Image, Pressable } from 'react-native';
import avatar from '@/assets/images/avatar.jpeg';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/themedComponents/ThemedView';
import { ThemedText } from '@/components/themedComponents/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileContainer() {
  const colorScheme = useColorScheme();
  const [username, setUsername] = useState('Jane Fonda');
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  useEffect(() => {
    loadUserInfos();
  }, []);

  const loadUserInfos = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('username');
      const storedProfilePicture = await AsyncStorage.getItem('profilePicture');
      if (storedUsername !== null) {
        setUsername(storedUsername);
      }
      if (storedProfilePicture !== null) {
        setProfilePicture(storedProfilePicture);
      }
    } catch (e) {
      console.error(e);
    }
  }
  
  return (
    <ThemedView style={styles.profileView}>
        <ThemedView style={styles.userContainer}>
            <Pressable onPress={() => router.navigate('/(profile)')}><Image source={profilePicture ? { uri: profilePicture } : avatar} style={styles.avatar} /></Pressable>
            <ThemedText type='default' lightColor={Colors[colorScheme ?? 'light'].default}>{username}</ThemedText>
        </ThemedView>
        <Ionicons name="notifications-outline" size={24} color={Colors[colorScheme ?? 'light'].icon} onPress={() => router.navigate('/(notifications)')} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  profileView: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  userContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
