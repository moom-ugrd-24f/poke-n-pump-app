import { ThemedButton } from '@/components/themedComponents/ThemedButton';
import { StyleSheet, Alert } from 'react-native';
import VisibilityOption from '@/components/tabs/settings/VisibilityOption';
import WorkoutSchedule from '@/components/tabs/settings/WorkoutSchedule';
import ShameOption from '@/components/tabs/settings/ShameOption';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { ThemedView } from '@/components/themedComponents/ThemedView';
import { deleteUser } from '@/hooks/useAPI';
import { getUserId } from '@/hooks/useAsyncStorage';
import { useState, useEffect } from 'react';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const themeColor = Colors[colorScheme ?? 'light'];
  const [userId, setUserId] = useState('');

  useEffect(() => {
    getUserId().then((res) => {
      setUserId(res || '');
    });
  });

  const deleteUserData = async () => {
    if (userId === '') return;
    deleteUser(userId);
    AsyncStorage.clear();
  }

  const createDeleteAccountAlert = () => 
    Alert.alert('Delete Account', 'Your data will be deleted. Are you sure to proceed?', [
      {
        text: 'OK', 
        onPress: () => {
          deleteUserData();
          router.replace('/(login)');
        }
      },
      {
        text: 'Cancel',
      },
    ]);


  return (
    <ThemedView style={styles.settingsView} >
      <VisibilityOption />
      <WorkoutSchedule />
      <ShameOption />
      <ThemedButton 
      title="Reset"
      lightColor={themeColor.alert}
      darkColor={themeColor.alert}
      lightBorderColor={themeColor.alert}
      darkBorderColor={themeColor.alert}
      lightTextColor={themeColor.white}
      darkTextColor={themeColor.white}
      onPress={createDeleteAccountAlert} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  settingsView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '15%',
    paddingBottom: '5%',
  }
});
