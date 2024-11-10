import { StyleSheet, Image } from 'react-native';
import avatar from '../../../assets/images/avatar.jpeg';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function ProfileContainer() {
  const colorScheme = useColorScheme();
  
  return (
    <ThemedView style={styles.profileView}>
        <ThemedView style={styles.userContainer}>
            <Image source={avatar} style={styles.avatar} />
            <ThemedText
              style={styles.text}
              lightColor={Colors[colorScheme ?? 'light'].textLight}
              darkColor={Colors[colorScheme ?? 'light'].textLight}
            >Jane Fonda</ThemedText>
        </ThemedView>
        <Ionicons name="notifications-outline" size={24} color={Colors[colorScheme ?? 'light'].icon} />
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
  text: {
    fontSize: 20,
  },
});
