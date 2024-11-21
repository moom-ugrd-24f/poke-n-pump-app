import { StyleSheet, Image, Pressable } from 'react-native';
import avatar from '@/assets/images/avatar.jpeg';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileContainer() {
  const colorScheme = useColorScheme();
  const [username, setUsername] = useState('Jane Fonda');

  useEffect(() => {
    loadUsername();
  }, []);

  const loadUsername = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername !== null) {
        setUsername(storedUsername);
      }
    } catch (e) {
      console.error(e);
    }
  }
  
  return (
    <ThemedView style={styles.profileView}>
        <ThemedView style={styles.userContainer}>
            <Pressable onPress={() => router.navigate('/(profile)')}><Image source={avatar} style={styles.avatar} /></Pressable>
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
