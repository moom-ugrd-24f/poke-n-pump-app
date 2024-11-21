import { StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import ProfileInfos from '@/components/login/ProfileInfos';
import VisibilityOption from '@/components/login/VisibilityOption';
import WorkoutInfos from '@/components/login/WorkoutInfos';
import ThemedButton from '@/components/ThemedButton';
import { ThemedView } from '@/components/ThemedView';
import ShameOption from '@/components/login/ShameOption';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addUser } from '@/hooks/useAPI';
import usePushNotifications from '@/hooks/usePushNotifications';

enum LOGIN_STAGE {
  PROFILE = 'PROFILE',
  VISIBILITY = 'VISIBILITY',
  WORKOUT = 'WORKOUT',
  SHAME = 'SHAME'
}

export default function LoginScreen() {
  const [stage, setStage] = useState<LOGIN_STAGE>(LOGIN_STAGE.PROFILE);

  const [ isLoading, setIsLoading ] = useState(true);
  const notificationToken = usePushNotifications().expoPushToken;

  function finishOnboarding() {
    router.replace('/(tabs)')

    AsyncStorage.multiGet(['username', 'workout-schedule', 'shame-toggle', 'shame-streak']).then((res) => {
      const nickname = res[0][1] || '';
      const shameToggle = res[2][1];
      const shameStreak = res[3][1];
      const workoutPlan = { "daysOfWeek": [ 1, 3, 5 ]}
      
      const data = {
        nickname,
        shamePostSettings: {
          isEnabled: shameToggle === 'true',
          noGymStreakLimit: shameStreak
        },
        workoutPlan,
        expoPushToken: notificationToken
      };

      addUser(data).then((res) => {
        AsyncStorage.multiSet([
          ["nickname", res.data.nickname],
          ["inviteCode", res.data.inviteCode],
          ["xp", JSON.stringify(res.data.xp)],
          ["profilePicture", res.data.profilePicture],
          ["shamePostSettings", JSON.stringify(res.data.shamePostSettings)],
          ["workoutPlan", JSON.stringify(res.data.workoutPlan)],
          ["todayAttendance", JSON.stringify(res.data.todayAttendance)],
          ["noGymStreak", JSON.stringify(res.data.noGymStreak)],
          ["friends", JSON.stringify(res.data.friends)],
          ["id", res.data._id],
        ]);
      });
    });
  }

  useEffect(() => {
    AsyncStorage.getItem('username').then((res) => {
      if (res) {
        router.replace('/(tabs)');
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <ThemedView style={styles.container}  >
      {
        stage === LOGIN_STAGE.PROFILE ? 
        <ProfileInfos /> : 
        stage === LOGIN_STAGE.VISIBILITY ? 
        <VisibilityOption /> : 
        stage === LOGIN_STAGE.WORKOUT ? 
        <WorkoutInfos /> : <ShameOption />
      }
      <ThemedButton 
        title="Complete" 
        onPress={() => {
          stage === LOGIN_STAGE.PROFILE ? setStage(LOGIN_STAGE.VISIBILITY) :
          stage === LOGIN_STAGE.VISIBILITY ? setStage(LOGIN_STAGE.WORKOUT) :
          stage === LOGIN_STAGE.WORKOUT ? setStage(LOGIN_STAGE.SHAME) :
          finishOnboarding();
        }} 
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
