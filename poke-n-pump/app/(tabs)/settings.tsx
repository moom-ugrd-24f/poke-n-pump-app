import { ThemedButton } from '@/components/themedComponents/ThemedButton';
import { ThemedText } from '@/components/themedComponents/ThemedText';
import { ThemedScrollView } from '@/components/themedComponents/ThemedScrollView';
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
import { getUserInfo, updateAndStoreUser } from '@/hooks/useAPI';
import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import Toast from 'react-native-root-toast';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const themeColor = Colors[colorScheme ?? 'light'];
  const [userId, setUserId] = useState('');
  const [visibility, setVisibility] = useState('friend');
  const [workoutDays, setWorkoutDays] = useState([]);
  const [shame, setShame] = useState(false);
  const [noGymStreakLimit, setNoGymStreakLimit] = useState(1);

  useFocusEffect(
    useCallback(() => {
      if (userId === '') {
        getUserId().then((res) => {
          console.log('User id: ', res);
          setUserId(res || '');
          fetchUserInfo(res);
        });
      } else {
        fetchUserInfo(userId);
      }
    }, [])
  );

  useEffect(() => {
    console.log("WorkoutDays: ", workoutDays);
  }, [workoutDays]);

  const fetchUserInfo = async (userId: string) => {
    const userInfo = await getUserInfo(userId);
    setVisibility(userInfo.data.visibility);
    setWorkoutDays(userInfo.data.workoutPlan.daysOfWeek);
    setShame(userInfo.data.shamePostSettings.isEnabled);
    setNoGymStreakLimit(userInfo.data.shamePostSettings.noGymStreakLimit);
  }

  const deleteUserData = async () => {
    await AsyncStorage.clear();
    if (userId === '') return;
    deleteUser(userId);
  }

  const createApplyChangesAlert = () =>
    Alert.alert('Apply Changes', 'Are you sure to apply changes?', [
      {
        text: 'OK',
        onPress: () => {
          updateAndStoreUser(
            { 
              visibility: visibility,
              workoutPlan: { daysOfWeek: workoutDays },
              shamePostSettings: { isEnabled: shame, noGymStreakLimit: noGymStreakLimit }
            }, userId);
          Toast.show('Changes applied!', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
            hideOnPress: true,
            shadow: true,
            animation: true,
          });
        }
      },
      {
        text: 'Cancel',
      },
    ]);

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
      <ThemedText type='header'>
        Settings
      </ThemedText>
      <ThemedScrollView 
        style={styles.scrollView}
        // contentContainerStyle={{ flex: 2, justifyContent: 'space-between' }}  
      >
        <VisibilityOption 
          visibility={visibility}
          setVisibility={setVisibility} 
        />
        <ThemedView style={styles.workoutSchedule}>
          <WorkoutSchedule 
            workoutDays={workoutDays} 
            setWorkoutDays={setWorkoutDays} 
          />
        </ThemedView>
        <ThemedView style={styles.shameOption}>
          <ShameOption 
            shame={shame} 
            setShame={setShame} 
            noGymStreakLimit={noGymStreakLimit} 
            setNoGymStreakLimit={setNoGymStreakLimit} 
          />
        </ThemedView>
        <ThemedButton
          style={styles.applyChangeButton} 
          title="Apply Changes"
          lightColor={themeColor.sub}
          darkColor={themeColor.sub}
          lightBorderColor={themeColor.subDark}
          darkBorderColor={themeColor.subDark}
          lightTextColor={themeColor.reverse}
          darkTextColor={themeColor.reverse}
          onPress={createApplyChangesAlert}
        />
        <ThemedButton 
          style={styles.deleteAccountButton}
          title="Delete Account"
          lightColor={themeColor.alert}
          darkColor={themeColor.alert}
          lightBorderColor={themeColor.alert}
          darkBorderColor={themeColor.alert}
          lightTextColor={themeColor.white}
          darkTextColor={themeColor.white}
          onPress={createDeleteAccountAlert}
        />
      </ThemedScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  settingsView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '5%',
  },
  scrollView: {
    width: '100%',
    height: '80%',
    paddingTop: 20,
  },
  visibilityOption: {
    paddingTop: 20,
  },
  workoutSchedule: {
    paddingTop: 20,
  },
  shameOption: {
    paddingTop: 20,
  },
  applyChangeButton: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  deleteAccountButton: {
    paddingHorizontal: 10,
    paddingTop: 15,
  },
});
