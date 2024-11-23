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

  const [isLoading, setIsLoading] = useState(true);

  const [enableCompleteButton, setEnableCompleteButton] = useState(true);
  const notificationToken = usePushNotifications().expoPushToken;

  function finishOnboarding() {
    router.replace('/(tabs)')

    AsyncStorage.multiGet(['username', 'workout-schedule', 'shame-toggle', 'shame-streak', 'visibility']).then((res) => {
      const nickname = res[0][1] || 'John Doe';
      const shameToggle = res[2][1] || 'false';
      const shameStreak = res[3][1] || '1';
      const workoutPlan = { "daysOfWeek": [ 1, 3, 5 ]};
      const visibility = res[4][1] || 'friend';
      // console.log(nickname, shameToggle, shameStreak, workoutPlan, visibility);

      const data = {
        nickname: nickname,
        shamePostSettings: {
          isEnabled: shameToggle === 'true',
          noGymStreak: shameStreak
        },
        workoutPlan: workoutPlan,
        expoPushToken: notificationToken,
        visibility: visibility
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
          ["visibility", res.data.visibility],
          ["expoPushToken", notificationToken],
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
        <ProfileInfos enableCompleteButton={setEnableCompleteButton}/> : 
        stage === LOGIN_STAGE.VISIBILITY ? 
        <VisibilityOption /> : 
        stage === LOGIN_STAGE.WORKOUT ? 
        <WorkoutInfos /> : <ShameOption />
      }
      <ThemedButton 
        title="Complete"
        disabled={!enableCompleteButton}
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
